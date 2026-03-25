const { TextDecoder, TextEncoder } = require("util");
const { ReadableStream, TransformStream, WritableStream } = require("stream/web");

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
global.ReadableStream = ReadableStream;
global.TransformStream = TransformStream;
global.WritableStream = WritableStream;

const { fetch, Headers, Request, Response } = require("undici");

global.fetch = fetch;
global.Headers = Headers;
global.Request = Request;
global.Response = Response;

jest.mock("@supabase/supabase-js", () => ({
  createClient: jest.fn(),
}));

jest.mock("@/lib/firebase/admin", () => ({
  createSessionCookie: jest.fn(),
  verifyIdToken: jest.fn(),
  verifySessionCookie: jest.fn(),
}));

const { createClient } = require("@supabase/supabase-js");
const {
  createSessionCookie,
  verifyIdToken,
  verifySessionCookie,
} = require("@/lib/firebase/admin");
const { DELETE, GET, POST } = require("@/app/api/auth/session/route");

function createSupabaseMock() {
  const maybeSingleResults = [
    { data: null, error: null },
    { data: { user_id: "legacy-user-123" }, error: null },
  ];

  return {
    from: jest.fn(() => {
      const chain = {
        select: jest.fn(() => chain),
        update: jest.fn(() => chain),
        eq: jest.fn(() => chain),
        neq: jest.fn(() => chain),
        limit: jest.fn(() => chain),
        maybeSingle: jest.fn(async () => maybeSingleResults.shift() || { data: null, error: null }),
      };

      return chain;
    }),
  };
}

describe("/api/auth/session route", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    createClient.mockReturnValue(createSupabaseMock());
  });

  it("rejects missing id tokens", async () => {
    const request = new Request("http://localhost:3001/api/auth/session", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({}),
    });

    const response = await POST(request);
    const payload = await response.json();

    expect(response.status).toBe(400);
    expect(payload.error).toBe("ID token is required");
  });

  it("creates an authenticated cookie session from a valid Firebase id token", async () => {
    verifyIdToken.mockResolvedValue({
      valid: true,
      decodedToken: {
        uid: "firebase-user-123",
        email: "developer@hushh.ai",
        email_verified: true,
        name: "Developer User",
        picture: "https://example.com/avatar.png",
        firebase: { sign_in_provider: "google.com" },
      },
    });
    createSessionCookie.mockResolvedValue({
      success: true,
      sessionCookie: "session-cookie-value",
    });

    const request = new Request("http://localhost:3001/api/auth/session", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ idToken: "valid-id-token" }),
    });

    const response = await POST(request);
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload.authenticated).toBe(true);
    expect(payload.user.uid).toBe("firebase-user-123");
    expect(payload.user.email).toBe("developer@hushh.ai");
    expect(response.headers.get("set-cookie")).toContain("hushh_session=session-cookie-value");
    expect(createSessionCookie).toHaveBeenCalledWith("valid-id-token", expect.any(Number));
  });

  it("returns unauthenticated when no cookie is present", async () => {
    const response = await GET({
      cookies: {
        get: jest.fn(() => undefined),
      },
    });
    const payload = await response.json();

    expect(response.status).toBe(401);
    expect(payload.authenticated).toBe(false);
  });

  it("returns the authenticated Firebase user for a valid session cookie", async () => {
    verifySessionCookie.mockResolvedValue({
      valid: true,
      decodedClaims: {
        uid: "firebase-user-456",
        email: "kai@hushh.ai",
        email_verified: true,
        name: "Kai Developer",
        picture: "https://example.com/kai.png",
        firebase: { sign_in_provider: "apple.com" },
      },
    });

    const response = await GET({
      cookies: {
        get: jest.fn(() => ({ value: "valid-session-cookie" })),
      },
    });
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload.authenticated).toBe(true);
    expect(payload.user.uid).toBe("firebase-user-456");
    expect(payload.user.providerId).toBe("apple.com");
  });

  it("clears the cookie on logout", async () => {
    const response = await DELETE();
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload.success).toBe(true);
    expect(response.headers.get("set-cookie")).toContain("hushh_session=");
    expect(response.headers.get("set-cookie")).toContain("Max-Age=0");
  });
});
