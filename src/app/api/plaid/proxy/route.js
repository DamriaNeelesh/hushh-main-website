import { NextResponse } from "next/server";
import { resolvePlaidCredentials } from "../../../../lib/plaid/credentials";

const ALLOWED_HOSTS = new Set([
  "production.plaid.com",
  "sandbox.plaid.com",
  "hushh-plaid-api-app-bubqpu.5sc6y6-1.usa-e2.cloudhub.io",
  "hushh-plaid-agent-app-bubqpu.5sc6y6-4.usa-e2.cloudhub.io",
  "hushh-plaid-mcp-server-app-bubqpu.5sc6y6-4.usa-e2.cloudhub.io",
]);

const ALLOWED_METHODS = new Set(["GET", "POST"]);
const CREDENTIAL_HOSTS = new Set([
  "production.plaid.com",
  "sandbox.plaid.com",
  "hushh-plaid-api-app-bubqpu.5sc6y6-1.usa-e2.cloudhub.io",
]);

export async function POST(request) {
  try {
    const {
      endpoint,
      method = "POST",
      payload,
      overrideMethod,
      injectCredentials,
      environment = "production",
    } = await request.json();

    if (!endpoint) {
      return NextResponse.json(
        { error: "Endpoint is required" },
        { status: 400 },
      );
    }

    const normalizedMethod = method?.toUpperCase() || "POST";
    if (!ALLOWED_METHODS.has(normalizedMethod)) {
      return NextResponse.json(
        { error: "HTTP method not allowed" },
        { status: 405 },
      );
    }

    const url = new URL(endpoint);
    if (!ALLOWED_HOSTS.has(url.host) || url.protocol !== "https:") {
      return NextResponse.json(
        { error: "Endpoint host not allowed" },
        { status: 403 },
      );
    }
    if (normalizedMethod === "GET" && payload) {
      Object.entries(payload).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.set(key, value);
        }
      });
    }

    const { env, clientId, secret } = resolvePlaidCredentials(environment);
    const shouldInjectCredentials =
      typeof injectCredentials === "boolean"
        ? injectCredentials
        : CREDENTIAL_HOSTS.has(url.host);

    if (shouldInjectCredentials && (!clientId || !secret)) {
      return NextResponse.json(
        {
          error:
            env === "sandbox"
              ? "Missing Plaid sandbox credentials. Set PLAID_CLIENT_ID_SANDBOX and PLAID_SECRET_SANDBOX (or PLAID_CLIENT_ID/PLAID_SECRET)."
              : "Missing Plaid production credentials. Set PLAID_CLIENT_ID_PRODUCTION and PLAID_SECRET_PRODUCTION (or PLAID_CLIENT_ID/PLAID_SECRET).",
        },
        { status: 500 },
      );
    }

    const finalPayload = shouldInjectCredentials
      ? {
          ...(payload || {}),
          client_id: clientId,
          secret: secret,
        }
      : { ...(payload || {}) };

    const response = await fetch(url.toString(), {
      method: normalizedMethod,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/event-stream",
        ...(overrideMethod ? { "X-HTTP-Method-Override": overrideMethod } : {}),
      },
      ...(normalizedMethod === "GET"
        ? {}
        : { body: JSON.stringify(finalPayload) }),
    });

    const text = await response.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch (error) {
      data = text;
    }

    return NextResponse.json(
      {
        status: response.status,
        methodUsed: normalizedMethod,
        data,
      },
      { status: response.ok ? 200 : response.status },
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Proxy error" },
      { status: 500 },
    );
  }
}
