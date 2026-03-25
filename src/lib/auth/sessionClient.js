export async function createWebsiteSession(idToken) {
  const response = await fetch("/api/auth/session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ idToken }),
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.error || "Failed to create website session");
  }

  return payload;
}

export async function getWebsiteSession() {
  const response = await fetch("/api/auth/session", {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  });

  const payload = await response.json().catch(() => ({}));
  return {
    ok: response.ok,
    status: response.status,
    ...payload,
  };
}

export async function deleteWebsiteSession() {
  const response = await fetch("/api/auth/session", {
    method: "DELETE",
    credentials: "include",
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.error || "Failed to destroy website session");
  }

  return payload;
}
