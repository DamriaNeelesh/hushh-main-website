import { s } from "./styles";

export default function LiveTestTab({
  jwt, linkToken, plaidLoading, plaidError, linkSuccess, linkedItemId,
  balanceData, balanceLoading, balanceError,
  onCreateLinkToken, onOpenPlaidLink, onGetBalance,
}) {
  return (
    <>
      <h2 style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 8 }}>
        Live Production Test
      </h2>
      <p style={{ ...s.desc, marginBottom: 24 }}>
        Walk through the full Plaid Balance flow in production. Each step calls real APIs.
      </p>

      {/* Step 1 */}
      <div style={linkToken ? s.cardActive : s.card}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h3 style={s.h2}>Step 1: Create Plaid Link Token</h3>
            <p style={s.desc}>
              Calls <code style={{ color: "#60a5fa" }}>POST /create-link-token</code> on Supabase Edge Functions.
              Generates a link_token from Plaid Production API to initialize the bank linking UI.
            </p>
          </div>
          <button onClick={onCreateLinkToken} disabled={plaidLoading || !!linkToken || !jwt}
            style={linkToken ? s.btnGreen : s.btn(plaidLoading || !!linkToken || !jwt)}>
            {linkToken ? "✅ Created" : plaidLoading ? "Creating..." : "Create Link Token"}
          </button>
        </div>
        {linkToken && (
          <pre style={{ ...s.code, marginTop: 12, fontSize: 11 }}>
            {linkToken}
          </pre>
        )}
      </div>

      {/* Step 2 */}
      <div style={linkSuccess ? s.cardActive : { ...s.card, opacity: linkToken ? 1 : 0.4 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h3 style={s.h2}>Step 2: Link Bank Account</h3>
            <p style={s.desc}>
              Opens Plaid Link UI. User authenticates with their bank. On success, the public_token
              is auto-exchanged for an access_token via <code style={{ color: "#60a5fa" }}>POST /exchange-public-token</code>.
              The access_token is stored server-side only — never exposed to the client.
            </p>
          </div>
          <button onClick={onOpenPlaidLink} disabled={!linkToken || plaidLoading || linkSuccess}
            style={linkSuccess ? s.btnGreen : s.btn(!linkToken || plaidLoading || linkSuccess)}>
            {linkSuccess ? "✅ Linked" : plaidLoading ? "Linking..." : "Open Plaid Link"}
          </button>
        </div>
        {linkedItemId && (
          <pre style={{ ...s.code, marginTop: 12, fontSize: 11 }}>
            {`Item ID: ${linkedItemId}`}
          </pre>
        )}
      </div>

      {/* Step 3 */}
      <div style={balanceData ? s.cardActive : { ...s.card, opacity: linkSuccess ? 1 : 0.4 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h3 style={s.h2}>Step 3: Get Real-Time Balance</h3>
            <p style={s.desc}>
              Calls <code style={{ color: "#60a5fa" }}>POST /get-balance</code>. Fetches real-time balance
              from Plaid Production API via /accounts/balance/get. Latency: p50 ~3s, p95 ~11s.
            </p>
          </div>
          <button onClick={onGetBalance} disabled={!linkSuccess || balanceLoading}
            style={s.btn(!linkSuccess || balanceLoading)}>
            {balanceLoading ? "Fetching..." : "Get Balance"}
          </button>
        </div>

        {balanceData && balanceData.balances && (
          <div style={{ marginTop: 20 }}>
            {balanceData.balances.map((item, idx) => (
              <div key={idx} style={{ ...s.card, backgroundColor: "#0a0a0a" }}>
                <h4 style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 12 }}>
                  🏦 {item.institution_name || "Bank Account"}
                </h4>
                {item.accounts?.map((account, aIdx) => (
                  <div key={aIdx} style={{
                    display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12,
                    padding: "12px 0", borderTop: aIdx > 0 ? "1px solid #222" : "none",
                  }}>
                    <div>
                      <div style={s.label}>Account</div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>{account.name}</div>
                      <div style={{ fontSize: 12, color: "#666" }}>{account.type} • ****{account.mask}</div>
                    </div>
                    <div>
                      <div style={s.label}>Available</div>
                      <div style={{ fontSize: 20, fontWeight: 700, color: "#22c55e" }}>
                        ${account.balances?.available?.toLocaleString() ?? "N/A"}
                      </div>
                    </div>
                    <div>
                      <div style={s.label}>Current</div>
                      <div style={{ fontSize: 20, fontWeight: 700, color: "#fff" }}>
                        ${account.balances?.current?.toLocaleString() ?? "N/A"}
                      </div>
                    </div>
                    <div>
                      <div style={s.label}>Currency</div>
                      <div style={{ fontSize: 14, fontWeight: 500, color: "#888" }}>
                        {account.balances?.currency || "USD"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
            <p style={{ fontSize: 11, color: "#666", marginTop: 8 }}>
              Retrieved at: {balanceData.retrieved_at}
            </p>
          </div>
        )}
        {balanceError && <p style={{ color: "#ef4444", fontSize: 13, marginTop: 8 }}>⚠️ {balanceError}</p>}
      </div>

      {plaidError && (
        <div style={{ padding: 16, backgroundColor: "#1a0505", border: "1px solid #3a0505", borderRadius: 8 }}>
          <p style={{ color: "#ef4444", fontSize: 13, margin: 0 }}>⚠️ {plaidError}</p>
        </div>
      )}
    </>
  );
}
