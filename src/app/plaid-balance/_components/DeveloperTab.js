import { s, colors, FUNCTIONS_BASE } from "./styles";

const ENDPOINTS = [
  {
    method: "POST",
    path: "/create-link-token",
    base: "Edge Function",
    fullUrl: `${FUNCTIONS_BASE}/create-link-token`,
    purpose: "Initialize Plaid Link",
    description: "Creates a Plaid Link token to launch the bank-linking UI. Call this before opening Plaid Link. The token is scoped to the authenticated user and expires in 4 hours.",
    auth: "Bearer JWT",
    request: `{ "products": ["auth"], "country_codes": ["US"] }`,
    response: `{ "link_token": "link-production-...", "expiration": "..." }`,
    color: colors.blue,
  },
  {
    method: "POST",
    path: "/exchange-public-token",
    base: "Edge Function",
    fullUrl: `${FUNCTIONS_BASE}/exchange-public-token`,
    purpose: "Exchange token after bank link",
    description: "After a user links their bank via Plaid Link, the SDK returns a public_token. Send it here to exchange for an access_token. The access_token is stored server-side (never returned to client).",
    auth: "Bearer JWT",
    request: `{ "public_token": "public-production-...", "institution_name": "Chase" }`,
    response: `{ "item_id": "item_...", "message": "Account linked successfully" }`,
    color: colors.purple,
  },
  {
    method: "POST",
    path: "/get-balance",
    base: "Edge Function",
    fullUrl: `${FUNCTIONS_BASE}/get-balance`,
    purpose: "Fetch real-time account balances",
    description: "Retrieves real-time balances for all linked bank accounts. Looks up stored access_tokens from the database, calls Plaid API, and returns aggregated balances.",
    auth: "Bearer JWT",
    request: `{ "item_id": "item_..." }  // optional — omit for all accounts`,
    response: `{ "balances": [{ "institution_name": "Chase", "accounts": [...] }] }`,
    color: colors.green,
  },
  {
    method: "POST",
    path: "/api/plaid/proxy",
    base: "Next.js API",
    fullUrl: "/api/plaid/proxy",
    purpose: "Proxy requests to Plaid API",
    description: "Forwards requests to Plaid's API with credentials auto-injected server-side. Use this to call any Plaid endpoint without exposing client_id or secret.",
    auth: "None (credentials injected)",
    request: `{ "endpoint": "https://production.plaid.com/institutions/get", "payload": { "count": 5 } }`,
    response: `{ "status": 200, "data": { ... } }`,
    color: colors.orange,
  },
  {
    method: "GET",
    path: "/api/plaid/credentials",
    base: "Next.js API",
    fullUrl: "/api/plaid/credentials?env=production",
    purpose: "Check credential configuration",
    description: "Returns whether Plaid credentials are configured for the specified environment. Never exposes actual secrets — only shows last 4 characters of client_id.",
    auth: "None",
    request: `GET /api/plaid/credentials?env=production`,
    response: `{ "configured": true, "client_id_last4": "ab12", "environment": "production" }`,
    color: colors.teal,
  },
  {
    method: "POST",
    path: "/api/plaid/accounts",
    base: "Next.js API",
    fullUrl: "/api/plaid/accounts",
    purpose: "Fetch accounts with access token",
    description: "Directly fetches account details from Plaid using a known access_token. Primarily used for testing and debugging with existing tokens.",
    auth: "None (access_token in body)",
    request: `{ "access_token": "access-production-...", "environment": "production" }`,
    response: `{ "status": 200, "data": { "accounts": [...] } }`,
    color: colors.pink,
  },
];

export default function DeveloperTab() {
  return (
    <>
      <h2 style={{ ...s.h1, fontSize: 28 }}>Developer Reference</h2>
      <p style={{ ...s.desc, marginBottom: 24 }}>
        All available endpoints for the Plaid Balance integration. Each card shows what the endpoint does,
        how to call it, and what to expect back.
      </p>

      {/* Quick Reference Table */}
      <div style={{ ...s.card, padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "16px 24px", borderBottom: `1px solid ${colors.grayBorder}` }}>
          <h3 style={{ ...s.h2, margin: 0 }}>Endpoint Overview</h3>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ backgroundColor: colors.grayLight }}>
              <th style={thStyle}>Method</th>
              <th style={thStyle}>Endpoint</th>
              <th style={thStyle}>Purpose</th>
              <th style={thStyle}>Auth</th>
            </tr>
          </thead>
          <tbody>
            {ENDPOINTS.map((ep, i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${colors.grayBorder}` }}>
                <td style={tdStyle}>
                  <span style={s.badge(ep.method === "GET" ? colors.green : colors.blue)}>{ep.method}</span>
                </td>
                <td style={tdStyle}>
                  <code style={{ fontSize: 13, fontWeight: 600, color: colors.black }}>{ep.path}</code>
                  <div style={{ fontSize: 11, color: colors.gray, marginTop: 2 }}>{ep.base}</div>
                </td>
                <td style={tdStyle}>
                  <span style={{ color: colors.grayText }}>{ep.purpose}</span>
                </td>
                <td style={tdStyle}>
                  <span style={{ fontSize: 12, color: colors.gray }}>{ep.auth}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detailed Cards */}
      {ENDPOINTS.map((ep, i) => (
        <div key={i} style={{ ...s.card, borderLeft: `3px solid ${ep.color}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <span style={s.badge(ep.method === "GET" ? colors.green : colors.blue)}>{ep.method}</span>
            <code style={{ fontSize: 16, fontWeight: 700, color: colors.black }}>{ep.path}</code>
            <span style={{ ...s.badge(colors.gray), fontSize: 10 }}>{ep.base}</span>
          </div>

          <h3 style={{ fontSize: 16, fontWeight: 600, color: ep.color, marginBottom: 4, marginTop: 0 }}>
            {ep.purpose}
          </h3>
          <p style={s.desc}>{ep.description}</p>

          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: colors.orange, textTransform: "uppercase" }}>Auth:</span>
            <code style={{ fontSize: 12, color: colors.grayText }}>{ep.auth}</code>
          </div>

          <div style={s.grid2}>
            <div>
              <div style={s.sectionTitle}>Request</div>
              <pre style={s.code}>{ep.request}</pre>
            </div>
            <div>
              <div style={s.sectionTitle}>Response</div>
              <pre style={s.code}>{ep.response}</pre>
            </div>
          </div>

          <div style={{ marginTop: 12, padding: "8px 12px", backgroundColor: colors.grayLight, borderRadius: 6, fontSize: 12, color: colors.grayText }}>
            <strong>Full URL:</strong> <code style={{ color: colors.black }}>{ep.fullUrl}</code>
          </div>
        </div>
      ))}

      {/* Quick Start */}
      <div style={s.card}>
        <h3 style={s.h2}>Quick Start</h3>
        <p style={s.desc}>Copy this flow to integrate Plaid Balance into your app:</p>
        <pre style={s.code}>{`// 1. Authenticate with Supabase
const { data } = await supabase.auth.signInWithPassword({ email, password });
const jwt = data.session.access_token;

// 2. Create link token
const { link_token } = await fetch("${FUNCTIONS_BASE}/create-link-token", {
  method: "POST",
  headers: { Authorization: "Bearer " + jwt, "Content-Type": "application/json" },
  body: JSON.stringify({ products: ["auth"], country_codes: ["US"] })
}).then(r => r.json());

// 3. Open Plaid Link → user authenticates → onSuccess gives you public_token

// 4. Exchange public token
await fetch("${FUNCTIONS_BASE}/exchange-public-token", {
  method: "POST",
  headers: { Authorization: "Bearer " + jwt, "Content-Type": "application/json" },
  body: JSON.stringify({ public_token, institution_name: "Chase" })
});

// 5. Get balances
const { balances } = await fetch("${FUNCTIONS_BASE}/get-balance", {
  method: "POST",
  headers: { Authorization: "Bearer " + jwt, "Content-Type": "application/json" },
  body: JSON.stringify({})
}).then(r => r.json());`}</pre>
      </div>
    </>
  );
}

const thStyle = { textAlign: "left", padding: "12px 16px", fontSize: 12, fontWeight: 700, color: colors.gray, textTransform: "uppercase", letterSpacing: 0.5 };
const tdStyle = { padding: "12px 16px", verticalAlign: "top" };
