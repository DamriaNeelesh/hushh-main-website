import { NextResponse } from "next/server";

const LOCAL_DEFAULT = "http://127.0.0.1:8000";
const API_KEY_HEADER = "X-Hushh-API-Key";

function clean(value) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeOrigin(value) {
  const text = clean(value);
  if (!text) {
    return null;
  }

  try {
    return new URL(text).origin;
  } catch {
    return null;
  }
}

function resolveConfiguredOrigin() {
  return (
    normalizeOrigin(process.env.HUSHH_INTELLIGENCE_BACKEND_URL) ||
    normalizeOrigin(process.env.BACKEND_URL) ||
    normalizeOrigin(process.env.NEXT_PUBLIC_BACKEND_URL) ||
    normalizeOrigin(process.env.HUSHH_API_BASE_URL)
  );
}

function isHostedRuntime() {
  return Boolean(
    process.env.K_SERVICE || process.env.K_REVISION || process.env.GOOGLE_CLOUD_PROJECT
  );
}

function getBackendOrigin() {
  const configured = resolveConfiguredOrigin();
  if (configured) {
    return configured;
  }

  if (!isHostedRuntime()) {
    return LOCAL_DEFAULT;
  }

  throw new Error(
    "[hushh-intelligence] Missing backend origin. Set HUSHH_INTELLIGENCE_BACKEND_URL or BACKEND_URL."
  );
}

function getApiKey() {
  return (
    clean(process.env.HUSHH_INTELLIGENCE_API_KEY) ||
    clean(process.env.IDENTITY_BACKEND_API_KEY) ||
    ""
  );
}

function buildHeaders({ withJsonBody = false } = {}) {
  const headers = {
    Accept: "application/json",
  };

  if (withJsonBody) {
    headers["Content-Type"] = "application/json";
  }

  const apiKey = getApiKey();
  if (apiKey) {
    headers[API_KEY_HEADER] = apiKey;
  }

  return headers;
}

async function parseUpstreamResponse(response) {
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return response.json().catch(() => ({}));
  }

  const text = await response.text().catch(() => "");
  return text ? { detail: text } : {};
}

export async function proxyHushhIntelligence(pathname, { method = "GET", body } = {}) {
  try {
    const target = new URL(pathname.startsWith("/") ? pathname : `/${pathname}`, getBackendOrigin());
    const upstream = await fetch(target, {
      method,
      headers: buildHeaders({ withJsonBody: method !== "GET" }),
      body: body ? JSON.stringify(body) : undefined,
      cache: "no-store",
    });

    const payload = await parseUpstreamResponse(upstream);
    return NextResponse.json(payload, {
      status: upstream.status,
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error(`[hushh-intelligence] ${method} ${pathname} proxy_error`, error);
    return NextResponse.json(
      { error: "Failed to reach Hushh Intelligence backend" },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  }
}
