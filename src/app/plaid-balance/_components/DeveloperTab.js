import { s, colors, FUNCTIONS_BASE } from "./styles";

const CORE_ENDPOINTS = [
  {
    method: "POST", path: "/create-link-token", base: "Edge Function", fullUrl: `${FUNCTIONS_BASE}/create-link-token`,
    purpose: "Initialize Plaid Link", auth: "Bearer JWT (required)",
    description: "Creates a Plaid Link token to launch the bank-linking UI. The token is scoped to the authenticated user and expires in 4 hours.",
    request: `{ "products": ["auth"], "country_codes": ["US"] }`,
    response: `{ "link_token": "link-production-...", "expiration": "..." }`,
    color: colors.blue,
  },
  {
    method: "POST", path: "/exchange-public-token", base: "Edge Function", fullUrl: `${FUNCTIONS_BASE}/exchange-public-token`,
    purpose: "Exchange token after bank link", auth: "Bearer JWT (required)",
    description: "After Plaid Link returns a public_token, exchange it here. The access_token is stored server-side (never returned to client).",
    request: `{ "public_token": "public-production-...", "institution_name": "Chase" }`,
    response: `{ "item_id": "item_...", "message": "Account linked successfully" }`,
    color: colors.purple,
  },
  {
    method: "POST", path: "/get-balance", base: "Edge Function", fullUrl: `${FUNCTIONS_BASE}/get-balance`,
    purpose: "Fetch real-time account balances", auth: "Bearer JWT (required)",
    description: "Retrieves real-time balances for all linked bank accounts from Plaid API.",
    request: `{ "item_id": "item_..." }  // optional`,
    response: `{ "balances": [{ "institution_name": "Chase", "accounts": [...] }] }`,
    color: colors.green,
  },
];

const SIGNAL_ENDPOINTS = [
  {
    method: "POST", path: "/signal-evaluate", base: "Edge Function", fullUrl: `${FUNCTIONS_BASE}/signal-evaluate`,
    altPath: "/api/plaid/signal/evaluate", altBase: "Next.js API",
    purpose: "Evaluate ACH transaction risk", auth: "Bearer JWT (Edge) / None (Next.js)",
    description: "Evaluate a planned ACH transaction for return risk. Returns risk scores, core attributes, and ruleset results.",
    request: `{
  "access_token": "access-production-...",
  "account_id": "acc_...",
  "client_transaction_id": "txn12345",
  "amount": 123.45,
  "client_user_id": "user1234",
  "user": {
    "name": { "given_name": "Jane", "family_name": "Doe" },
    "email_address": "jane@example.com"
  }
}`,
    response: `{
  "scores": {
    "customer_initiated_return_risk": { "score": 9 },
    "bank_initiated_return_risk": { "score": 82 }
  },
  "core_attributes": { "available_balance": 2200 },
  "ruleset": { "result": "ACCEPT" }
}`,
    color: "#f59e0b",
  },
  {
    method: "POST", path: "/signal-decision-report", base: "Edge Function", fullUrl: `${FUNCTIONS_BASE}/signal-decision-report`,
    altPath: "/api/plaid/signal/decision-report", altBase: "Next.js API",
    purpose: "Report ACH transaction decision", auth: "Bearer JWT (Edge) / None (Next.js)",
    description: "Report whether you initiated an ACH transaction. Required for Signal accuracy and rule tuning.",
    request: `{ "client_transaction_id": "txn12345", "initiated": true, "days_funds_on_hold": 3 }`,
    response: `{ "request_id": "mdqfuVxeoza6mhu" }`,
    color: "#f59e0b",
  },
  {
    method: "POST", path: "/signal-return-report", base: "Edge Function", fullUrl: `${FUNCTIONS_BASE}/signal-return-report`,
    altPath: "/api/plaid/signal/return-report", altBase: "Next.js API",
    purpose: "Report ACH return", auth: "Bearer JWT (Edge) / None (Next.js)",
    description: "Report a returned ACH transaction previously sent to /signal/evaluate.",
    request: `{ "client_transaction_id": "txn12345", "return_code": "R01" }`,
    response: `{ "request_id": "mdqfuVxeoza6mhu" }`,
    color: "#f59e0b",
  },
  {
    method: "POST", path: "/signal-prepare", base: "Edge Function", fullUrl: `${FUNCTIONS_BASE}/signal-prepare`,
    altPath: "/api/plaid/signal/prepare", altBase: "Next.js API",
    purpose: "Opt-in Item to Signal", auth: "Bearer JWT (Edge) / None (Next.js)",
    description: "Opt-in an Item to Signal data collection for better score accuracy.",
    request: `{ "access_token": "access-production-..." }`,
    response: `{ "request_id": "mdqfuVxeoza6mhu" }`,
    color: "#f59e0b",
  },
];

const ASSETS_ENDPOINTS = [
  {
    method: "POST", path: "/asset-report-create", base: "Edge Function", fullUrl: `${FUNCTIONS_BASE}/asset-report-create`,
    altPath: "/api/plaid/assets/create", altBase: "Next.js API",
    purpose: "Create Asset Report", auth: "Bearer JWT (Edge) / None (Next.js)",
    description: "Initiates Asset Report creation. Listen for PRODUCT_READY webhook, then call /get.",
    request: `{ "access_tokens": ["access-production-..."], "days_requested": 90 }`,
    response: `{ "asset_report_token": "assets-production-...", "asset_report_id": "..." }`,
    color: "#8b5cf6",
  },
  {
    method: "POST", path: "/asset-report-get", base: "Edge Function", fullUrl: `${FUNCTIONS_BASE}/asset-report-get`,
    altPath: "/api/plaid/assets/get", altBase: "Next.js API",
    purpose: "Retrieve Asset Report", auth: "Bearer JWT (Edge) / None (Next.js)",
    description: "Retrieves the Asset Report in JSON format with balances, transactions, and identity data.",
    request: `{ "asset_report_token": "assets-production-...", "include_insights": true }`,
    response: `{ "report": { "asset_report_id": "...", "items": [...] } }`,
    color: "#8b5cf6",
  },
  {
    method: "POST", path: "/api/plaid/assets/refresh", base: "Next.js API", fullUrl: "/api/plaid/assets/refresh",
    purpose: "Refresh Asset Report", auth: "None (credentials injected)",
    description: "Create a new Asset Report based on an existing one with fresh data.",
    request: `{ "asset_report_token": "assets-production-...", "days_requested": 90 }`,
    response: `{ "asset_report_id": "...", "asset_report_token": "..." }`,
    color: "#8b5cf6",
  },
  {
    method: "POST", path: "/api/plaid/assets/remove", base: "Next.js API", fullUrl: "/api/plaid/assets/remove",
    purpose: "Delete Asset Report", auth: "None (credentials injected)",
    description: "Invalidates the asset_report_token. Linked Items are not affected.",
    request: `{ "asset_report_token": "assets-production-..." }`,
    response: `{ "removed": true }`,
    color: "#8b5cf6",
  },
];

const INVESTMENTS_ENDPOINTS = [
  {
    method: "POST", path: "/investments-holdings", base: "Edge Function", fullUrl: `${FUNCTIONS_BASE}/investments-holdings`,
    altPath: "/api/plaid/investments/holdings", altBase: "Next.js API",
    purpose: "Get investment holdings", auth: "Bearer JWT (Edge) / None (Next.js)",
    description: "Returns holdings (securities, quantities, values) for an investment account.",
    request: `{ "access_token": "access-production-..." }`,
    response: `{ "holdings": [...], "securities": [...], "accounts": [...] }`,
    color: "#10b981",
  },
  {
    method: "POST", path: "/investments-transactions", base: "Edge Function", fullUrl: `${FUNCTIONS_BASE}/investments-transactions`,
    altPath: "/api/plaid/investments/transactions", altBase: "Next.js API",
    purpose: "Get investment transactions", auth: "Bearer JWT (Edge) / None (Next.js)",
    description: "Returns buy/sell/transfer transactions for investment accounts.",
    request: `{ "access_token": "access-production-...", "start_date": "2025-01-01", "end_date": "2025-12-31" }`,
    response: `{ "investment_transactions": [...], "securities": [...] }`,
    color: "#10b981",
  },
  {
    method: "POST", path: "/api/plaid/investments/refresh", base: "Next.js API", fullUrl: "/api/plaid/investments/refresh",
    purpose: "Refresh investment data", auth: "None (credentials injected)",
    description: "Triggers a refresh of investment data for the given access token.",
    request: `{ "access_token": "access-production-..." }`,
    response: `{ "request_id": "..." }`,
    color: "#10b981",
  },
];

const UTILITY_ENDPOINTS = [
  {
    method: "POST", path: "/api/plaid/proxy", base: "Next.js API", fullUrl: "/api/plaid/proxy",
    purpose: "Proxy to any Plaid endpoint", auth: "None (credentials injected)",
    description: "Forwards requests to Plaid's API with credentials auto-injected server-side.",
    request: `{ "endpoint": "https://production.plaid.com/institutions/get", "payload": { "count": 5 } }`,
    response: `{ "status": 200, "data": { ... } }`,
    color: colors.orange,
  },
  {
    method: "GET", path: "/api/plaid/credentials", base: "Next.js API", fullUrl: "/api/plaid/credentials?env=production",
    purpose: "Check credential config", auth: "None",
    description: "Returns whether Plaid credentials are configured. Never exposes actual secrets.",
    request: `GET /api/plaid/credentials?env=production`,
    response: `{ "configured": true, "client_id_last4": "ab12" }`,
    color: colors.teal,
  },
];

const ALL_ENDPOINTS = [...CORE_ENDPOINTS, ...SIGNAL_ENDPOINTS, ...ASSETS_ENDPOINTS, ...INVESTMENTS_ENDPOINTS, ...UTILITY_ENDPOINTS];

function EndpointCard({ ep }) {
  return (
    <div style={{ ...s.card, borderLeft: `3px solid ${ep.color}` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, flexWrap: "wrap" }}>
        <span style={s.badge(ep.method === "GET" ? colors.green : colors.blue)}>{ep.method}</span>
        <code style={{ fontSize: 15, fontWeight: 700, color: colors.black }}>{ep.path}</code>
        <span style={{ ...s.badge(colors.gray), fontSize: 10 }}>{ep.base}</span>
      </div>
      {ep.altPath && (
        <div style={{ fontSize: 12, color: colors.gray, marginBottom: 8 }}>
          Also available: <code style={{ color: colors.grayText }}>{ep.altPath}</code> ({ep.altBase})
        </div>
      )}
      <h3 style={{ fontSize: 15, fontWeight: 600, color: ep.color, marginBottom: 4, marginTop: 0 }}>{ep.purpose}</h3>
      <p style={{ ...s.desc, fontSize: 13 }}>{ep.description}</p>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: colors.orange, textTransform: "uppercase" }}>Auth:</span>
        <code style={{ fontSize: 12, color: colors.grayText }}>{ep.auth}</code>
      </div>
      <div style={s.grid2}>
        <div>
          <div style={s.sectionTitle}>Request</div>
          <pre style={{ ...s.code, fontSize: 12 }}>{ep.request}</pre>
        </div>
        <div>
          <div style={s.sectionTitle}>Response</div>
          <pre style={{ ...s.code, fontSize: 12 }}>{ep.response}</pre>
        </div>
      </div>
      <div style={{ marginTop: 10, padding: "6px 12px", backgroundColor: colors.grayLight, borderRadius: 6, fontSize: 12, color: colors.grayText }}>
        <strong>URL:</strong> <code style={{ color: colors.black }}>{ep.fullUrl}</code>
      </div>
    </div>
  );
}

function SectionHeader({ icon, title, color, count, description }) {
  return (
    <div style={{ ...s.card, borderLeft: `4px solid ${color}`, padding: "16px 24px", marginTop: 32 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 22 }}>{icon}</span>
        <div>
          <h3 style={{ ...s.h2, margin: 0, color }}>{title} <span style={{ fontSize: 13, color: colors.gray }}>({count} endpoints)</span></h3>
          <p style={{ ...s.desc, margin: "4px 0 0", fontSize: 13 }}>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function DeveloperTab() {
  return (
    <>
      <h2 style={{ ...s.h1, fontSize: 28 }}>Developer Reference</h2>
      <p style={{ ...s.desc, marginBottom: 16 }}>
        Complete API reference for the Hushh Plaid integration — Balance, Signal, Assets, and Investments.
        All Edge Functions require JWT authentication. Next.js API routes inject credentials server-side.
      </p>

      {/* ─── AUTH GUIDE ─── */}
      <div style={{ ...s.card, borderLeft: `4px solid ${colors.red}`, background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)" }}>
        <h3 style={{ ...s.h2, color: "#ff6b6b", margin: "0 0 8px" }}>🔐 Authentication — How JWT Works</h3>
        <p style={{ ...s.desc, fontSize: 13 }}>
          All Supabase Edge Functions require a valid JWT token in the <code>Authorization</code> header.
          The dashboard auto-authenticates on page load. For your own integration, follow these steps:
        </p>

        <div style={s.sectionTitle}>Step 1 — Get a JWT Token</div>
        <pre style={{ ...s.code, fontSize: 12 }}>{`// Sign in with Supabase to get a JWT
const SUPABASE_URL = "https://ibsisfnjxeowvdtvgzff.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUz..."; // your anon key

const res = await fetch(SUPABASE_URL + "/auth/v1/token?grant_type=password", {
  method: "POST",
  headers: { apikey: SUPABASE_ANON_KEY, "Content-Type": "application/json" },
  body: JSON.stringify({ email: "your@email.com", password: "yourPassword" })
});
const { access_token } = await res.json();
// access_token is your JWT — valid for ~1 hour`}</pre>

        <div style={s.sectionTitle}>Step 2 — Call Any Edge Function</div>
        <pre style={{ ...s.code, fontSize: 12 }}>{`const FUNCTIONS_BASE = SUPABASE_URL + "/functions/v1";

const response = await fetch(FUNCTIONS_BASE + "/signal-evaluate", {
  method: "POST",
  headers: {
    Authorization: "Bearer " + access_token,  // ← JWT required!
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    access_token: "access-production-...",
    account_id: "acc_...",
    client_transaction_id: "txn123",
    amount: 100.00
  })
});
const data = await response.json();`}</pre>

        <div style={{ display: "flex", gap: 12, marginTop: 16, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 200, padding: 12, backgroundColor: "rgba(34,197,94,0.1)", borderRadius: 8, border: "1px solid rgba(34,197,94,0.3)" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#22c55e", marginBottom: 4 }}>✅ Edge Functions (JWT Required)</div>
            <div style={{ fontSize: 11, color: colors.grayText }}>
              create-link-token, exchange-public-token, get-balance, signal-evaluate, signal-decision-report,
              signal-return-report, signal-prepare, asset-report-create, asset-report-get,
              investments-holdings, investments-transactions
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 200, padding: 12, backgroundColor: "rgba(249,115,22,0.1)", borderRadius: 8, border: "1px solid rgba(249,115,22,0.3)" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#f97316", marginBottom: 4 }}>🔓 Next.js API Routes (No JWT)</div>
            <div style={{ fontSize: 11, color: colors.grayText }}>
              /api/plaid/proxy, /api/plaid/credentials, /api/plaid/signal/*, /api/plaid/assets/*,
              /api/plaid/investments/* — credentials auto-injected server-side
            </div>
          </div>
        </div>
      </div>

      {/* ─── OVERVIEW TABLE ─── */}
      <div style={{ ...s.card, padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "14px 24px", borderBottom: `1px solid ${colors.grayBorder}` }}>
          <h3 style={{ ...s.h2, margin: 0 }}>All Endpoints ({ALL_ENDPOINTS.length} total)</h3>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ backgroundColor: colors.grayLight }}>
                <th style={thStyle}>Method</th>
                <th style={thStyle}>Endpoint</th>
                <th style={thStyle}>Purpose</th>
                <th style={thStyle}>Auth</th>
              </tr>
            </thead>
            <tbody>
              {ALL_ENDPOINTS.map((ep, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${colors.grayBorder}` }}>
                  <td style={tdStyle}>
                    <span style={s.badge(ep.method === "GET" ? colors.green : colors.blue)}>{ep.method}</span>
                  </td>
                  <td style={tdStyle}>
                    <code style={{ fontSize: 12, fontWeight: 600, color: ep.color }}>{ep.path}</code>
                    <div style={{ fontSize: 10, color: colors.gray, marginTop: 2 }}>{ep.base}</div>
                  </td>
                  <td style={tdStyle}><span style={{ color: colors.grayText, fontSize: 12 }}>{ep.purpose}</span></td>
                  <td style={tdStyle}><span style={{ fontSize: 11, color: colors.gray }}>{ep.auth}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ─── CORE BALANCE ─── */}
      <SectionHeader icon="🏦" title="Core Balance" color={colors.blue} count={3}
        description="Link bank accounts and fetch real-time balances." />
      {CORE_ENDPOINTS.map((ep, i) => <EndpointCard key={i} ep={ep} />)}

      {/* ─── SIGNAL ─── */}
      <SectionHeader icon="📊" title="Signal Transaction Scores" color="#f59e0b" count={4}
        description="Evaluate ACH return risk, report decisions and returns for ML model improvement." />
      {SIGNAL_ENDPOINTS.map((ep, i) => <EndpointCard key={i} ep={ep} />)}

      {/* ─── ASSETS ─── */}
      <SectionHeader icon="📋" title="Assets Reports" color="#8b5cf6" count={4}
        description="Create, retrieve, refresh, and delete Asset Reports with balance + transaction history." />
      {ASSETS_ENDPOINTS.map((ep, i) => <EndpointCard key={i} ep={ep} />)}

      {/* ─── INVESTMENTS ─── */}
      <SectionHeader icon="📈" title="Investments" color="#10b981" count={3}
        description="Fetch investment holdings, transactions, and trigger data refreshes." />
      {INVESTMENTS_ENDPOINTS.map((ep, i) => <EndpointCard key={i} ep={ep} />)}

      {/* ─── UTILITY ─── */}
      <SectionHeader icon="🔧" title="Utility" color={colors.orange} count={2}
        description="Proxy to any Plaid endpoint and check credential configuration." />
      {UTILITY_ENDPOINTS.map((ep, i) => <EndpointCard key={i} ep={ep} />)}

      {/* ─── INTEGRATION QUICK START ─── */}
      <div style={{ ...s.card, marginTop: 32, borderLeft: `4px solid ${colors.blue}` }}>
        <h3 style={{ ...s.h2, color: colors.blue }}>🚀 Full Integration Quick Start</h3>
        <p style={{ ...s.desc, fontSize: 13 }}>Copy this complete flow to integrate all Plaid products into your app:</p>
        <pre style={{ ...s.code, fontSize: 12 }}>{`// ============================================
// STEP 1: Authenticate — Get JWT Token
// ============================================
const SUPABASE_URL = "https://ibsisfnjxeowvdtvgzff.supabase.co";
const SUPABASE_ANON_KEY = "your-anon-key";
const FUNCTIONS_BASE = SUPABASE_URL + "/functions/v1";

const authRes = await fetch(SUPABASE_URL + "/auth/v1/token?grant_type=password", {
  method: "POST",
  headers: { apikey: SUPABASE_ANON_KEY, "Content-Type": "application/json" },
  body: JSON.stringify({ email: "user@example.com", password: "password" })
});
const { access_token: jwt } = await authRes.json();

// Helper for Edge Function calls
const callEdge = (fn, body) => fetch(FUNCTIONS_BASE + "/" + fn, {
  method: "POST",
  headers: { Authorization: "Bearer " + jwt, "Content-Type": "application/json" },
  body: JSON.stringify(body)
}).then(r => r.json());

// Helper for Next.js API calls (no JWT needed)
const callApi = (path, body) => fetch(path, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body)
}).then(r => r.json());

// ============================================
// STEP 2: Link a Bank Account
// ============================================
const { link_token } = await callEdge("create-link-token", {
  products: ["auth", "assets", "investments"], country_codes: ["US"]
});
// → Open Plaid Link with link_token → onSuccess gives public_token
const { item_id } = await callEdge("exchange-public-token", {
  public_token: "public-production-...", institution_name: "Chase"
});

// ============================================
// STEP 3: Get Balances
// ============================================
const { balances } = await callEdge("get-balance", {});

// ============================================
// STEP 4: Signal — Evaluate ACH Risk
// ============================================
const riskResult = await callEdge("signal-evaluate", {
  access_token: "access-production-...",
  account_id: "acc_...",
  client_transaction_id: "txn_001",
  amount: 500.00,
  client_user_id: "user_123"
});
console.log("Risk:", riskResult.scores);
console.log("Ruleset:", riskResult.ruleset?.result); // ACCEPT / REROUTE / REVIEW

// Report decision
await callEdge("signal-decision-report", {
  client_transaction_id: "txn_001", initiated: true, days_funds_on_hold: 2
});

// ============================================
// STEP 5: Assets — Create Report
// ============================================
const { asset_report_token } = await callEdge("asset-report-create", {
  access_tokens: ["access-production-..."], days_requested: 90
});
// Wait for PRODUCT_READY webhook, then:
const { report } = await callEdge("asset-report-get", {
  asset_report_token, include_insights: true
});

// ============================================
// STEP 6: Investments — Get Holdings
// ============================================
const holdings = await callEdge("investments-holdings", {
  access_token: "access-production-..."
});
const transactions = await callEdge("investments-transactions", {
  access_token: "access-production-...",
  start_date: "2025-01-01", end_date: "2025-12-31"
});`}</pre>
      </div>

      {/* ─── TWO PATHS ─── */}
      <div style={{ ...s.card, marginTop: 16 }}>
        <h3 style={s.h2}>📡 Two Integration Paths</h3>
        <p style={{ ...s.desc, fontSize: 13, marginBottom: 16 }}>
          Every endpoint is available via <strong>two paths</strong>. Choose based on your architecture:
        </p>
        <div style={s.grid2}>
          <div style={{ padding: 16, backgroundColor: "rgba(34,197,94,0.08)", borderRadius: 8, border: "1px solid rgba(34,197,94,0.2)" }}>
            <h4 style={{ color: "#22c55e", marginTop: 0, fontSize: 15 }}>Path A: Supabase Edge Functions</h4>
            <ul style={{ fontSize: 13, color: colors.grayText, paddingLeft: 20, margin: "8px 0" }}>
              <li><strong>URL:</strong> {FUNCTIONS_BASE}/[function-name]</li>
              <li><strong>Auth:</strong> Bearer JWT (required)</li>
              <li><strong>Best for:</strong> User-scoped operations, production apps</li>
              <li><strong>Security:</strong> JWT identifies user, access_token looked up from DB</li>
            </ul>
            <pre style={{ ...s.code, fontSize: 11 }}>{`fetch("${FUNCTIONS_BASE}/signal-evaluate", {
  headers: { Authorization: "Bearer " + jwt }
})`}</pre>
          </div>
          <div style={{ padding: 16, backgroundColor: "rgba(249,115,22,0.08)", borderRadius: 8, border: "1px solid rgba(249,115,22,0.2)" }}>
            <h4 style={{ color: "#f97316", marginTop: 0, fontSize: 15 }}>Path B: Next.js API Routes</h4>
            <ul style={{ fontSize: 13, color: colors.grayText, paddingLeft: 20, margin: "8px 0" }}>
              <li><strong>URL:</strong> /api/plaid/[product]/[action]</li>
              <li><strong>Auth:</strong> None needed (server-side credentials)</li>
              <li><strong>Best for:</strong> Testing, debugging, admin tools</li>
              <li><strong>Security:</strong> Credentials injected from env vars</li>
            </ul>
            <pre style={{ ...s.code, fontSize: 11 }}>{`fetch("/api/plaid/signal/evaluate", {
  // No auth header needed!
  body: JSON.stringify({ access_token: "...", amount: 100 })
})`}</pre>
          </div>
        </div>
      </div>

      {/* ─── ENV VARS ─── */}
      <div style={{ ...s.card, marginTop: 16 }}>
        <h3 style={s.h2}>⚙️ Required Environment Variables</h3>
        <pre style={{ ...s.code, fontSize: 12 }}>{`# Next.js (.env.local)
PLAID_CLIENT_ID_PRODUCTION=your_client_id
PLAID_SECRET_PRODUCTION=your_secret

# Supabase Edge Functions (secrets)
# Set via: supabase secrets set PLAID_CLIENT_ID=xxx PLAID_SECRET=xxx
PLAID_CLIENT_ID=your_client_id
PLAID_SECRET=your_secret
PLAID_ENV=production
SUPABASE_URL=https://ibsisfnjxeowvdtvgzff.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key`}</pre>
      </div>
    </>
  );
}

const thStyle = { textAlign: "left", padding: "10px 14px", fontSize: 11, fontWeight: 700, color: colors.gray, textTransform: "uppercase", letterSpacing: 0.5 };
const tdStyle = { padding: "10px 14px", verticalAlign: "top" };
