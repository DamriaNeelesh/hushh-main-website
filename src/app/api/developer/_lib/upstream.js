import { NextResponse } from "next/server";

const LOCAL_DEFAULT = "http://127.0.0.1:8000";

function normalizeUrl(value) {
  const text = String(value || "").trim();
  if (!text) {
    return null;
  }

  try {
    return new URL(text).origin;
  } catch {
    return null;
  }
}

function resolveConfiguredOrigin(keys) {
  for (const key of keys) {
    const resolved = normalizeUrl(process.env[key]);
    if (resolved) {
      return resolved;
    }
  }
  return null;
}

function isHostedServerRuntime() {
  return Boolean(
    process.env.K_SERVICE ||
      process.env.K_REVISION ||
      process.env.GOOGLE_CLOUD_PROJECT
  );
}

function isLocalhostUrl(value) {
  try {
    const hostname = new URL(value).hostname.toLowerCase();
    return hostname === "localhost" || hostname === "127.0.0.1";
  } catch {
    return false;
  }
}

function canonicalizeLocalOrigin(value) {
  try {
    const url = new URL(value);
    if (url.hostname.toLowerCase() === "localhost") {
      url.hostname = "127.0.0.1";
    }
    return url.origin;
  } catch {
    return value;
  }
}

function getDeveloperApiBaseUrl() {
  const hosted = isHostedServerRuntime();
  const configuredOrigin = resolveConfiguredOrigin([
    "DEVELOPER_API_URL",
    "BACKEND_URL",
    "NEXT_PUBLIC_DEVELOPER_API_URL",
    "NEXT_PUBLIC_BACKEND_URL",
    "HUSHH_API_BASE_URL",
  ]);

  if (configuredOrigin) {
    if (hosted && isLocalhostUrl(configuredOrigin)) {
      throw new Error(
        "[developer-api] Hosted runtime resolved developer backend to localhost. Set DEVELOPER_API_URL or BACKEND_URL explicitly."
      );
    }

    return hosted ? configuredOrigin : canonicalizeLocalOrigin(configuredOrigin);
  }

  if (!hosted) {
    return LOCAL_DEFAULT;
  }

  throw new Error(
    "[developer-api] Missing developer backend origin. Set DEVELOPER_API_URL, BACKEND_URL, NEXT_PUBLIC_DEVELOPER_API_URL, or NEXT_PUBLIC_BACKEND_URL."
  );
}

export function buildDeveloperApiUrl(pathname, params = {}) {
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const url = new URL(normalizedPath, getDeveloperApiBaseUrl());

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  }

  return url;
}

export async function parseUpstreamResponse(response) {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return response.json().catch(() => ({}));
  }

  const text = await response.text().catch(() => "");
  return text ? { detail: text } : {};
}

export function buildForwardHeaders(request, { withJsonBody = false } = {}) {
  const headers = {
    Accept: "application/json",
  };

  if (withJsonBody) {
    headers["Content-Type"] = "application/json";
  }

  const authorization = request.headers.get("authorization");
  if (authorization) {
    headers.Authorization = authorization;
  }

  return headers;
}

export async function proxyDeveloperUpstream(request, pathname, method) {
  try {
    const withJsonBody = method === "POST" || method === "PATCH";
    const query = request.nextUrl?.search || "";
    const targetUrl = new URL(`${buildDeveloperApiUrl(pathname)}${query}`);
    const body = withJsonBody
      ? JSON.stringify(await request.json().catch(() => ({})))
      : undefined;

    const upstreamResponse = await fetch(targetUrl, {
      method,
      headers: buildForwardHeaders(request, { withJsonBody }),
      body,
      cache: "no-store",
    });

    const payload = await parseUpstreamResponse(upstreamResponse);

    return NextResponse.json(payload, {
      status: upstreamResponse.status,
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error(`[developer-api] ${method} ${pathname} proxy_error`, error);
    return NextResponse.json(
      { error: "Failed to proxy developer access request" },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  }
}
