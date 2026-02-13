import { NextResponse } from "next/server";
import { resolvePlaidCredentials } from "../../../../../lib/plaid/credentials";

const PLAID_URLS = {
  production: "https://production.plaid.com/credit/relay/get",
  sandbox: "https://sandbox.plaid.com/credit/relay/get",
};

export async function POST(request) {
  try {
    const body = await request.json();
    const { relay_token, report_type, include_insights, environment = "production" } = body;

    if (!relay_token || !report_type) {
      return NextResponse.json({ error: "relay_token and report_type are required" }, { status: 400 });
    }

    const { env, clientId, secret } = resolvePlaidCredentials(environment);
    const plaidUrl = env === "sandbox" ? PLAID_URLS.sandbox : PLAID_URLS.production;

    if (!clientId || !secret) {
      return NextResponse.json({ error: `Missing Plaid ${env} credentials.` }, { status: 500 });
    }

    const payload = { client_id: clientId, secret, relay_token, report_type };
    if (include_insights !== undefined) payload.include_insights = include_insights;

    const response = await fetch(plaidUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const text = await response.text();
    let data;
    try { data = JSON.parse(text); } catch { data = text; }

    return NextResponse.json({ status: response.status, data }, { status: response.ok ? 200 : response.status });
  } catch (error) {
    return NextResponse.json({ error: error?.message || "Relay get error" }, { status: 500 });
  }
}
