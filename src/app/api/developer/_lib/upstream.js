const DEFAULT_HUSHH_API_BASE_URL = "https://hushh-api-53407187172.us-central1.run.app";

function getDeveloperApiBaseUrl() {
  return (process.env.HUSHH_API_BASE_URL || DEFAULT_HUSHH_API_BASE_URL).replace(/\/$/, "");
}

export function buildDeveloperApiUrl(pathname, params = {}) {
  const normalizedPath = pathname.replace(/^\/+/, "");
  const url = new URL(`${getDeveloperApiBaseUrl()}/${normalizedPath}`);

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
  return text ? { message: text } : {};
}

export function buildForwardHeaders(request) {
  const headers = {
    Accept: "application/json",
  };

  const authorization = request.headers.get("authorization");
  if (authorization) {
    headers.Authorization = authorization;
  }

  return headers;
}
