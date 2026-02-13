import { s, SUPABASE_URL, FUNCTIONS_BASE } from "./styles";

export default function OverviewTab({ jwt }) {
  return (
    <>
      <h1 style={{ fontSize: 28, fontWeight: 800, color: "#fff", marginBottom: 8 }}>
        Hushh × Plaid Balance Integration
      </h1>
      <p style={{ ...s.desc, fontSize: 14, marginBottom: 32 }}>
        Internal developer portal for testing, documenting, and integrating the Plaid Balance API.
        This is a production environment connected to live Plaid and Supabase services.
      </p>

      {/* Status Cards */}
      <div style={s.grid2}>
        <div style={s.card}>
          <div style={s.label}>Environment</div>
          <div style={{ ...s.value, color: "#22c55e" }}>Production</div>
          <p style={{ fontSize: 12, color: "#666", marginTop: 4 }}>https://production.plaid.com</p>
        </div>
        <div style={s.card}>
          <div style={s.label}>Supabase Project</div>
          <div style={s.value}>ibsisfnjxeowvdtvgzff</div>
          <p style={{ fontSize: 12, color: "#666", marginTop: 4 }}>{SUPABASE_URL}</p>
        </div>
        <div style={s.card}>
          <div style={s.label}>Auth Status</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={s.dot(!!jwt)}></span>
            <span style={{ ...s.value, color: jwt ? "#22c55e" : "#ef4444" }}>
              {jwt ? "Authenticated" : "Not Authenticated"}
            </span>
          </div>
          <p style={{ fontSize: 12, color: "#666", marginTop: 4 }}>plaid-test@hushh.ai</p>
        </div>
        <div style={s.card}>
          <div style={s.label}>Edge Functions Base</div>
          <div style={{ ...s.value, fontSize: 13 }}>{FUNCTIONS_BASE}</div>
          <p style={{ fontSize: 12, color: "#666", marginTop: 4 }}>3 functions deployed</p>
        </div>
      </div>

      {/* How It Works */}
      <div style={{ ...s.card, marginTop: 12 }}>
        <h2 style={s.h2}>How Plaid Balance Works</h2>
        <p style={s.desc}>
          The Plaid Balance integration allows Hushh to securely retrieve real-time bank account
          balances for authenticated users. The entire flow is server-side secure — access tokens
          are never exposed to the client.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 16, marginTop: 16 }}>
          {[
            { step: "1", title: "Create Link Token", desc: "Server creates a Plaid Link token for the user session" },
            { step: "2", title: "Link Bank Account", desc: "User authenticates with their bank via Plaid Link UI" },
            { step: "3", title: "Exchange Token", desc: "Public token exchanged for access_token (stored server-side)" },
            { step: "4", title: "Get Balance", desc: "Real-time balance fetched via Plaid /accounts/balance/get" },
          ].map((item) => (
            <div key={item.step} style={{ textAlign: "center" }}>
              <div style={{
                width: 40, height: 40, borderRadius: "50%", backgroundColor: "#2563eb",
                color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18, fontWeight: 800, margin: "0 auto 8px",
              }}>{item.step}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{item.title}</div>
              <div style={{ fontSize: 11, color: "#888" }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Reference */}
      <div style={s.card}>
        <h2 style={s.h2}>Quick Reference</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div>
            <div style={s.sectionTitle}>Supabase Edge Functions</div>
            <pre style={s.code}>{`POST /create-link-token
POST /exchange-public-token
POST /get-balance`}</pre>
          </div>
          <div>
            <div style={s.sectionTitle}>Next.js API Routes</div>
            <pre style={s.code}>{`GET  /api/plaid/credentials
POST /api/plaid/proxy
POST /api/plaid/accounts`}</pre>
          </div>
          <div>
            <div style={s.sectionTitle}>Database</div>
            <pre style={s.code}>{`Table: plaid_items
Columns:
  id            UUID (PK)
  user_id       UUID (FK → auth.users)
  access_token  TEXT (encrypted)
  item_id       TEXT (unique)
  institution_name TEXT
  created_at    TIMESTAMPTZ
  updated_at    TIMESTAMPTZ`}</pre>
          </div>
          <div>
            <div style={s.sectionTitle}>Security</div>
            <pre style={s.code}>{`✓ All endpoints require Supabase JWT
✓ access_token never exposed to client
✓ RLS enabled on plaid_items
✓ Service role key in edge functions only
✓ CORS configured for allowed origins`}</pre>
          </div>
        </div>
      </div>
    </>
  );
}
