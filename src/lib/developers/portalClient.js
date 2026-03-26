"use client";

export class DeveloperPortalRequestError extends Error {
  constructor(message, options = {}) {
    super(message);
    this.name = "DeveloperPortalRequestError";
    this.status = options.status || 500;
    this.code = options.code;
  }
}

async function requestPortal(path, options = {}) {
  const response = await fetch(path, {
    method: options.method || "GET",
    cache: "no-store",
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(options.idToken ? { Authorization: `Bearer ${options.idToken}` } : {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const payload = await response
    .json()
    .catch(async () => ({ detail: await response.text().catch(() => "") }));

  if (!response.ok) {
    const errorCode =
      typeof payload?.detail?.error_code === "string"
        ? payload.detail.error_code
        : typeof payload?.error_code === "string"
          ? payload.error_code
          : undefined;
    const detail =
      typeof payload?.detail === "string"
        ? payload.detail
        : payload?.detail?.message || payload?.message || "Request failed";

    throw new DeveloperPortalRequestError(detail, {
      status: response.status,
      code: errorCode,
    });
  }

  return payload;
}

export function getDeveloperAccess(idToken) {
  return requestPortal("/api/developer/access", { idToken });
}

export function enableDeveloperAccess(idToken) {
  return requestPortal("/api/developer/access/enable", {
    method: "POST",
    idToken,
  });
}

export function updateDeveloperAccessProfile(idToken, body) {
  return requestPortal("/api/developer/access/profile", {
    method: "PATCH",
    idToken,
    body,
  });
}

export function rotateDeveloperAccessToken(idToken) {
  return requestPortal("/api/developer/access/rotate-key", {
    method: "POST",
    idToken,
  });
}
