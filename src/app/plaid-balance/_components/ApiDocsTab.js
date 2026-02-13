import { s, FUNCTIONS_BASE } from "./styles";

const API_ENDPOINTS = [
  {
    name: "Create Link Token",
    method: "POST",
    path: "/create-link-token",
    base: "Supabase Edge Function",
    auth: "Bearer <supabase_jwt>",
    desc: "Creates a Plaid Link token for initializing the bank linking UI. The link token is tied to the authenticated user.",
    reqBody: `{
  "products": ["auth"],       // Optional. Default: ["auth"]
  "country_codes": ["US"],    // Optional. Default: ["US"]
  "language": "en"            // Optional. Default: "en"
}`,
    resBody: `{
  "link_token": "link-production-abc123...",
  "expiration": "2026-02-13T12:00:00Z",
  "request_id": "abc123"
}`,
    errors: `401 → Missing/invalid JWT
500 → Plaid API error (missing credentials)`,
  },
  {
    name: "Exchange Public Token",
    method: "POST",
    path: "/exchange-public-token",
    base: "Supabase Edge Function",
    auth: "Bearer <supabase_jwt>",
    desc: "Exchanges the public_token from Plaid Link for an access_token. The access_token is stored in the plaid_items table and NEVER returned to the client.",
    reqBody: `{
  "public_token": "public-production-abc123...",  // Required
  "institution_name": "Chase"                      // Optional
}`,
    resBody: `{
  "item_id": "item_abc123...",
  "request_id": "req_abc123",
  "message": "Account linked successfully"
}`,
    errors: `400 → Missing public_token
401 → Missing/invalid JWT
500 → Plaid API or DB error`,
  },
  {
    name: "Get Balance",
    method: "POST",
    path: "/get-balance",
    base: "Supabase Edge Function",
    auth: "Bearer <supabase_jwt>",
    desc: "Fetches real-time balance for all linked bank accounts (or a specific item). Queries plaid_items table for stored access_tokens, then calls Plaid /accounts/balance/get.",
    reqBody: `{
  "item_id": "item_abc...",     // Optional — filter specific item
  "account_ids": ["acc_abc..."] // Optional — filter specific accounts
}`,
    resBody: `{
  "balances": [{
    "item_id": "item_abc...",
    "institution_name": "Chase",
    "accounts": [{
      "account_id": "acc_abc...",
      "name": "Checking",
      "type": "depository",
      "subtype": "checking",
      "mask": "0000",
      "balances": {
        "available": 1000.00,
        "current": 1100.00,
        "currency": "USD",
        "limit": null
      }
    }]
  }],
  "retrieved_at": "2026-02-13T08:00:00Z"
}`,
    errors: `401 → Missing/invalid JWT
404 → No linked bank accounts
500 → Plaid API or DB error`,
  },
  {
    name: "Plaid Proxy",
    method: "POST",
    path: "/api/plaid/proxy",
    base: "Next.js API Route",
    auth: "None (server-side credentials injected)",
    desc: "Proxies requests to Plaid or MuleSoft APIs. Automatically injects Plaid client_id and secret for allowed hosts. Supports production and sandbox environments.",
    reqBody: `{
  "endpoint": "https://production.plaid.com/institutions/get",
  "method": "POST",           // Optional. Default: "POST"
  "payload": {                // Request body to forward
    "count": 5,
    "offset": 0,
    "country_codes": ["US"]
  },
  "environment": "production", // Optional. Default: "production"
  "injectCredentials": true    // Optional. Auto-detected
}`,
    resBody: `{
  "status": 200,
  "methodUsed": "POST",
  "data": { ... }  // Plaid API response
}`,
    errors: `400 → Missing endpoint
403 → Host not in allowlist
405 → HTTP method not allowed
500 → Missing credentials or proxy error`,
  },
  {
    name: "Get Credentials Status",
    method: "GET",
    path: "/api/plaid/credentials",
    base: "Next.js API Route",
    auth: "None",
    desc: "Returns the current Plaid credential configuration status without exposing secrets.",
    reqBody: `// Query params:
?env=production  // or "sandbox"`,
    resBody: `{
  "environment": "production",
  "configured": true,
  "client_id_last4": "ab12",
  "available_environments": {
    "production": true,
    "sandbox": false
  }
}`,
    errors: `// No errors — always returns status`,
  },
  {
    name: "Get Accounts",
    method: "POST",
    path: "/api/plaid/accounts",
    base: "Next.js API Route",
    auth: "None (requires access_token in body)",
    desc: "Fetches account details directly from Plaid using an access_token. Used for testing with known tokens.",
    reqBody: `{
  "access_token": "access-production-abc...",  // Required
  "environment": "production"                   // Optional
}`,
    resBody: `{
  "status": 200,
  "data": {
    "accounts": [...],
    "item": { "item_id": "...", "institution_id": "..." },
    "request_id": "..."
  }
}`,
    errors: `400 → Missing access_token
500 → Missing credentials or Plaid error`,
  },
];

export default function ApiDocsTab() {
  return (
    <>
      <h2 style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 8 }}>
        API Documentation
      </h2>
      <p style={{ ...s.desc, marginBottom: 8 }}>
        Complete reference for all Plaid Balance API endpoints. Base URL for edge functions:{" "}
        <code style={{ color: "#60a5fa" }}>{FUNCTIONS_BASE}</code>
      </p>
      <p style={{ ...s.desc, marginBottom: 24 }}>
        All Supabase Edge Function endpoints require a valid JWT in the Authorization header.
        Next.js API routes handle credentials server-side.
      </p>

      {API_ENDPOINTS.map((ep, idx) => (
        <div key={idx} style={{ ...s.card, marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <span style={s.badge(ep.method === "GET" ? "#22c55e" : "#2563eb")}>{ep.method}</span>
            <code style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>{ep.path}</code>
            <span style={{ fontSize: 11, color: "#666" }}>({ep.base})</span>
          </div>
          <p style={s.desc}>{ep.desc}</p>

          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <span style={{ fontSize: 11, color: "#f59e0b", fontWeight: 600 }}>AUTH:</span>
            <code style={{ fontSize: 12, color: "#888" }}>{ep.auth}</code>
          </div>

          <div style={s.grid2}>
            <div>
              <div style={s.sectionTitle}>Request</div>
              <pre style={s.code}>{ep.reqBody}</pre>
            </div>
            <div>
              <div style={s.sectionTitle}>Response</div>
              <pre style={s.code}>{ep.resBody}</pre>
            </div>
          </div>

          <div style={{ marginTop: 12 }}>
            <div style={{ ...s.sectionTitle, color: "#ef4444" }}>Error Codes</div>
            <pre style={{ ...s.code, borderColor: "#3a0505" }}>{ep.errors}</pre>
          </div>
        </div>
      ))}
    </>
  );
}
