import { s } from "./styles";

export default function ArchitectureTab() {
  return (
    <>
      <h2 style={{ ...s.h1, fontSize: 28 }}>
        Architecture
      </h2>
      <p style={{ ...s.desc, marginBottom: 24 }}>
        The Plaid Balance integration is designed as a completely isolated, security-first system.
        No Plaid secrets touch the client. All sensitive operations run in Supabase Edge Functions.
      </p>

      {/* System Diagram */}
      <div style={s.card}>
        <h3 style={s.h2}>System Architecture</h3>
        <pre style={{ ...s.code, fontSize: 13, lineHeight: 1.8 }}>{`
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT (Browser)                         │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────────────┐ │
│  │  Plaid Link  │  │  Balance UI  │  │  API Tester Console   │ │
│  │   (SDK)      │  │  (React)     │  │  (Dev Portal)         │ │
│  └──────┬───────┘  └──────┬───────┘  └───────────┬───────────┘ │
└─────────┼─────────────────┼──────────────────────┼─────────────┘
          │ public_token     │ JWT                   │
          ▼                  ▼                       ▼
┌─────────────────────────────────────────────────────────────────┐
│               SUPABASE EDGE FUNCTIONS (Deno)                    │
│  ┌─────────────────┐ ┌──────────────────┐ ┌──────────────────┐ │
│  │ create-link-    │ │ exchange-public- │ │  get-balance     │ │
│  │ token           │ │ token            │ │                  │ │
│  └────────┬────────┘ └────────┬─────────┘ └────────┬─────────┘ │
│           │                   │                     │           │
│  ┌────────┴───────────────────┴─────────────────────┘         │ │
│  │  _shared/plaid-client.ts (injects client_id + secret)      │ │
│  │  _shared/auth.ts (JWT verification)                         │ │
│  │  _shared/cors.ts (CORS headers)                             │ │
│  └────────────────────────────┬──────────────────────────────┘ │
└───────────────────────────────┼─────────────────────────────────┘
                                │
          ┌─────────────────────┼─────────────────────┐
          ▼                     ▼                     ▼
┌──────────────────┐  ┌──────────────┐  ┌───────────────────────┐
│  PLAID API       │  │  SUPABASE    │  │  NEXT.JS API ROUTES   │
│  (Production)    │  │  POSTGRES    │  │  /api/plaid/proxy     │
│                  │  │              │  │  /api/plaid/credentials│
│  /link/token/    │  │  plaid_items │  │  /api/plaid/accounts  │
│    create        │  │  ┌────────┐  │  │                       │
│  /item/public_   │  │  │user_id │  │  │  Server-side cred     │
│    token/exchange│  │  │access_ │  │  │  injection via        │
│  /accounts/      │  │  │ token  │  │  │  resolvePlaidCreds()  │
│    balance/get   │  │  │item_id │  │  │                       │
│                  │  │  └────────┘  │  │                       │
└──────────────────┘  └──────────────┘  └───────────────────────┘
`}</pre>
      </div>

      {/* File Structure */}
      <div style={s.card}>
        <h3 style={s.h2}>File Structure</h3>
        <div style={s.grid2}>
          <div>
            <div style={s.sectionTitle}>Supabase Edge Functions</div>
            <pre style={s.code}>{`hushh-plaid-integration/
└── supabase/
    ├── functions/
    │   ├── _shared/
    │   │   ├── cors.ts          # CORS headers
    │   │   ├── plaid-client.ts  # Plaid API client
    │   │   └── auth.ts          # JWT verification
    │   ├── create-link-token/
    │   │   └── index.ts
    │   ├── exchange-public-token/
    │   │   └── index.ts
    │   └── get-balance/
    │       └── index.ts
    └── migrations/
        └── 20260212_create_plaid_items.sql`}</pre>
          </div>
          <div>
            <div style={s.sectionTitle}>Next.js (hushh.ai-website)</div>
            <pre style={s.code}>{`src/app/
├── plaid-balance/
│   ├── page.js              # Developer portal
│   └── _components/
│       ├── styles.js         # Shared styles
│       ├── OverviewTab.js    # Overview tab
│       ├── LiveTestTab.js    # Live test flow
│       ├── ApiDocsTab.js     # API documentation
│       ├── ApiTesterTab.js   # Interactive tester
│       ├── ArchitectureTab.js# Architecture docs
│       ├── UseCasesTab.js    # Use cases
│       └── ActivityLog.js    # Request log
├── api/plaid/
│   ├── credentials/route.js  # Cred status
│   ├── proxy/route.js        # API proxy
│   └── accounts/route.js     # Accounts fetch
└── lib/plaid/
    └── credentials.js        # Credential resolver`}</pre>
          </div>
        </div>
      </div>

      {/* Data Flow */}
      <div style={s.card}>
        <h3 style={s.h2}>Data Flow</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12 }}>
          {[
            { phase: "Authentication", desc: "Client authenticates with Supabase Auth → receives JWT. All edge function calls include this JWT.", color: "#60a5fa" },
            { phase: "Link Token Creation", desc: "Edge function verifies JWT → extracts user_id → calls Plaid /link/token/create with user_id as client_user_id → returns link_token to client.", color: "#a78bfa" },
            { phase: "Bank Linking", desc: "Client opens Plaid Link SDK with link_token → user selects bank → authenticates → Plaid returns public_token to client.", color: "#f59e0b" },
            { phase: "Token Exchange", desc: "Client sends public_token to edge function → function calls Plaid /item/public_token/exchange → receives access_token → stores in plaid_items table (server-side only) → returns item_id to client.", color: "#22c55e" },
            { phase: "Balance Retrieval", desc: "Edge function queries plaid_items for user's access_tokens → calls Plaid /accounts/balance/get for each → aggregates results → returns balances to client.", color: "#ef4444" },
          ].map((flow, i) => (
            <div key={i} style={{ display: "flex", gap: 16, padding: 12, backgroundColor: "#0a0a0a", borderRadius: 6, border: "1px solid #1a1a1a" }}>
              <div style={{ minWidth: 4, backgroundColor: flow.color, borderRadius: 2 }}></div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: flow.color, marginBottom: 4 }}>{flow.phase}</div>
                <div style={{ fontSize: 12, color: "#888", lineHeight: 1.5 }}>{flow.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Environment Variables */}
      <div style={s.card}>
        <h3 style={s.h2}>Environment Variables</h3>
        <div style={s.grid2}>
          <div>
            <div style={s.sectionTitle}>Supabase Edge Functions (Secrets)</div>
            <pre style={s.code}>{`PLAID_CLIENT_ID     # Plaid client ID
PLAID_SECRET        # Plaid secret key
PLAID_ENV           # "production" or "sandbox"
SUPABASE_URL        # Auto-injected
SUPABASE_ANON_KEY   # Auto-injected
SUPABASE_SERVICE_ROLE_KEY  # Auto-injected`}</pre>
          </div>
          <div>
            <div style={s.sectionTitle}>Next.js (Vercel)</div>
            <pre style={s.code}>{`PLAID_CLIENT_ID_PRODUCTION  # Production client ID
PLAID_SECRET_PRODUCTION    # Production secret
PLAID_CLIENT_ID_SANDBOX    # Sandbox client ID (optional)
PLAID_SECRET_SANDBOX       # Sandbox secret (optional)

# Fallbacks:
PLAID_CLIENT_ID  # Used if env-specific not set
PLAID_SECRET     # Used if env-specific not set`}</pre>
          </div>
        </div>
      </div>
    </>
  );
}
