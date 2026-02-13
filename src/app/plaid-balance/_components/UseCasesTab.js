import { s } from "./styles";

const USE_CASES = [
  {
    title: "Personal Finance Dashboard",
    desc: "Build a unified dashboard showing all bank account balances across multiple institutions. Users link their banks once, then see real-time balances aggregated in one place.",
    flow: "User signs up → Links bank via Plaid Link → Dashboard shows balances from /get-balance → Auto-refreshes periodically",
    apis: ["create-link-token", "exchange-public-token", "get-balance"],
    color: "#60a5fa",
  },
  {
    title: "Expense Tracking & Budgeting",
    desc: "Monitor account balances to track spending patterns. Compare available vs current balances to detect pending transactions and help users stay within budget.",
    flow: "Link accounts → Fetch balances daily → Compare current vs available → Alert on low balance → Generate spending insights",
    apis: ["get-balance"],
    color: "#22c55e",
  },
  {
    title: "Payment Verification",
    desc: "Before initiating a payment or transfer, verify that the user has sufficient funds in their account. Reduces failed transactions and NSF fees.",
    flow: "User initiates payment → Call get-balance → Check available >= amount → Proceed or show insufficient funds",
    apis: ["get-balance"],
    color: "#f59e0b",
  },
  {
    title: "Financial Data Aggregation",
    desc: "Aggregate financial data across multiple banks for lending decisions, credit scoring, or financial planning. Access account types, names, and balances.",
    flow: "User links multiple banks → Store all items in plaid_items → Fetch all balances in parallel → Aggregate and analyze",
    apis: ["create-link-token", "exchange-public-token", "get-balance"],
    color: "#a78bfa",
  },
  {
    title: "Account Verification for Onboarding",
    desc: "Verify that a user owns a bank account during onboarding. Plaid Link confirms ownership through bank authentication, and the balance check confirms the account is active.",
    flow: "New user onboarding → Link bank account → Verify account exists and is active → Complete registration",
    apis: ["create-link-token", "exchange-public-token", "get-balance"],
    color: "#ef4444",
  },
  {
    title: "Wealth Management Snapshot",
    desc: "Provide high-net-worth clients with a quick snapshot of their liquid assets across all accounts. Useful for financial advisors and wealth management platforms.",
    flow: "Advisor requests snapshot → Fetch all linked account balances → Sum available balances → Display net liquid position",
    apis: ["get-balance"],
    color: "#ec4899",
  },
];

export default function UseCasesTab() {
  return (
    <>
      <h2 style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 8 }}>
        Use Cases
      </h2>
      <p style={{ ...s.desc, marginBottom: 24 }}>
        Real-world applications of the Plaid Balance integration. Each use case shows which APIs
        are involved and the recommended implementation flow.
      </p>

      {USE_CASES.map((uc, idx) => (
        <div key={idx} style={{ ...s.card, borderLeft: `3px solid ${uc.color}` }}>
          <h3 style={{ ...s.h2, color: uc.color }}>{uc.title}</h3>
          <p style={s.desc}>{uc.desc}</p>

          <div style={{ marginBottom: 12 }}>
            <div style={s.sectionTitle}>Implementation Flow</div>
            <pre style={{ ...s.code, fontSize: 12 }}>{uc.flow}</pre>
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontSize: 11, color: "#666", marginRight: 4 }}>APIs used:</span>
            {uc.apis.map((api) => (
              <span key={api} style={s.badge("#2563eb")}>{api}</span>
            ))}
          </div>
        </div>
      ))}

      {/* Integration Guide */}
      <div style={{ ...s.card, marginTop: 12 }}>
        <h3 style={s.h2}>Integration Guide for Developers</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
          <div>
            <div style={s.sectionTitle}>1. Authenticate</div>
            <pre style={s.code}>{`// Get Supabase JWT
const { data } = await supabase.auth.signInWithPassword({
  email: "user@example.com",
  password: "password"
});
const jwt = data.session.access_token;`}</pre>
          </div>
          <div>
            <div style={s.sectionTitle}>2. Create Link Token</div>
            <pre style={s.code}>{`const res = await fetch(FUNCTIONS_BASE + "/create-link-token", {
  method: "POST",
  headers: {
    Authorization: "Bearer " + jwt,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ products: ["auth"], country_codes: ["US"] })
});
const { link_token } = await res.json();`}</pre>
          </div>
          <div>
            <div style={s.sectionTitle}>3. Open Plaid Link</div>
            <pre style={s.code}>{`const handler = Plaid.create({
  token: link_token,
  onSuccess: async (public_token, metadata) => {
    // Exchange the public token
    await fetch(FUNCTIONS_BASE + "/exchange-public-token", {
      method: "POST",
      headers: { Authorization: "Bearer " + jwt, "Content-Type": "application/json" },
      body: JSON.stringify({
        public_token: public_token,
        institution_name: metadata.institution?.name
      })
    });
  }
});
handler.open();`}</pre>
          </div>
          <div>
            <div style={s.sectionTitle}>4. Get Balance</div>
            <pre style={s.code}>{`const res = await fetch(FUNCTIONS_BASE + "/get-balance", {
  method: "POST",
  headers: { Authorization: "Bearer " + jwt, "Content-Type": "application/json" },
  body: JSON.stringify({})  // Empty = all accounts
});
const { balances, retrieved_at } = await res.json();
// balances[0].accounts[0].balances.available → 1000.00`}</pre>
          </div>
        </div>
      </div>
    </>
  );
}
