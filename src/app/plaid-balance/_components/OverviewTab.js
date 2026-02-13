import { s, colors, SUPABASE_URL, FUNCTIONS_BASE } from "./styles";

export default function OverviewTab({ jwt, endpointStatus = {} }) {
  return (
    <>
      <h1 style={s.h1}>Hushh × Plaid Balance</h1>
      <p style={{ ...s.desc, fontSize: 16, marginBottom: 32 }}>
        Internal developer portal for the Plaid Balance integration.
        Test APIs, read documentation, and integrate with production services.
      </p>

      {/* Status Cards */}
      <div style={s.grid2Responsive}>
        <div style={s.card}>
          <div style={s.label}>Environment</div>
          <div style={{ ...s.value, color: colors.green }}>Production</div>
          <p style={{ fontSize: 13, color: colors.grayText, marginTop: 4 }}>https://production.plaid.com</p>
        </div>
        <div style={s.card}>
          <div style={s.label}>Supabase Project</div>
          <div style={{ ...s.value, fontSize: 15 }}>ibsisfnjxeowvdtvgzff</div>
          <p style={{ fontSize: 13, color: colors.grayText, marginTop: 4 }}>{SUPABASE_URL}</p>
        </div>
        <div style={s.card}>
          <div style={s.label}>Auth Status</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={s.dot(!!jwt)}></span>
            <span style={{ ...s.value, color: jwt ? colors.green : colors.red, fontSize: 16 }}>
              {jwt ? "Connected" : "Disconnected"}
            </span>
          </div>
          <p style={{ fontSize: 13, color: colors.grayText, marginTop: 4 }}>plaid-test@hushh.ai</p>
        </div>
        <div style={s.card}>
          <div style={s.label}>Edge Functions</div>
          <div style={{ ...s.value, fontSize: 15 }}>{FUNCTIONS_BASE.replace("https://", "").split("/")[0].substring(0, 20)}...</div>
          <p style={{ fontSize: 13, color: colors.grayText, marginTop: 4 }}>3 functions deployed</p>
        </div>
      </div>

      {/* Endpoint Status */}
      <div style={{ ...s.card, marginTop: 8 }}>
        <h2 style={s.h2}>Endpoint Status</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 }}>
          {[
            { key: "create-link-token", label: "Link Token", type: "Edge Function", color: colors.blue },
            { key: "exchange-public-token", label: "Exchange Token", type: "Edge Function", color: colors.purple },
            { key: "get-balance", label: "Get Balance", type: "Edge Function", color: colors.green },
            { key: "credentials", label: "Credentials", type: "API Route", color: colors.orange },
            { key: "proxy", label: "Proxy", type: "API Route", color: colors.teal },
            { key: "accounts", label: "Accounts", type: "API Route", color: colors.pink },
          ].map((ep) => {
            const isUp = endpointStatus[ep.key] !== false;
            return (
              <div key={ep.key} style={{
                padding: 16, borderRadius: 10, backgroundColor: colors.grayLight,
                border: `1px solid ${isUp ? colors.grayBorder : colors.red + "40"}`,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                  <span style={s.dot(isUp)}></span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: colors.black }}>{ep.label}</span>
                </div>
                <span style={s.badge(ep.color)}>{ep.type}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* How It Works */}
      <div style={{ ...s.card, marginTop: 8 }}>
        <h2 style={s.h2}>How It Works</h2>
        <p style={s.desc}>
          Secure, server-side Plaid integration. Access tokens never touch the client.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 20, marginTop: 16 }}>
          {[
            { step: "1", title: "Create Link Token", desc: "Server creates a Plaid Link token", color: colors.blue },
            { step: "2", title: "Link Bank", desc: "User authenticates via Plaid Link", color: colors.purple },
            { step: "3", title: "Exchange Token", desc: "Public token → access_token (server-side)", color: colors.orange },
            { step: "4", title: "Get Balance", desc: "Real-time balance from Plaid API", color: colors.green },
          ].map((item) => (
            <div key={item.step} style={{ textAlign: "center" }}>
              <div style={{
                width: 44, height: 44, borderRadius: "50%", backgroundColor: item.color,
                color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 20, fontWeight: 700, margin: "0 auto 10px",
              }}>{item.step}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: colors.black, marginBottom: 4 }}>{item.title}</div>
              <div style={{ fontSize: 12, color: colors.grayText }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Reference */}
      <div style={s.card}>
        <h2 style={s.h2}>Quick Reference</h2>
        <div style={s.grid2Responsive}>
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
            <div style={s.sectionTitle}>Database Schema</div>
            <pre style={s.code}>{`Table: plaid_items
  id            UUID (PK)
  user_id       UUID (FK → auth.users)
  access_token  TEXT (server-only)
  item_id       TEXT (unique)
  institution_name TEXT
  created_at    TIMESTAMPTZ
  updated_at    TIMESTAMPTZ`}</pre>
          </div>
          <div>
            <div style={s.sectionTitle}>Security</div>
            <pre style={s.code}>{`✓ JWT auth on all endpoints
✓ access_token never exposed
✓ RLS on plaid_items table
✓ Service role in edge functions
✓ CORS configured`}</pre>
          </div>
        </div>
      </div>
    </>
  );
}
