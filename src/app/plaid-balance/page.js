"use client";

import { useState, useCallback, useEffect } from "react";
import Script from "next/script";
import { s, TABS, SUPABASE_URL, SUPABASE_ANON_KEY, FUNCTIONS_BASE, TEST_EMAIL, TEST_PASSWORD } from "./_components/styles";
import OverviewTab from "./_components/OverviewTab";
import LiveTestTab from "./_components/LiveTestTab";
import ApiDocsTab from "./_components/ApiDocsTab";
import ApiTesterTab from "./_components/ApiTesterTab";
import ArchitectureTab from "./_components/ArchitectureTab";
import UseCasesTab from "./_components/UseCasesTab";
import ActivityLog from "./_components/ActivityLog";

export default function PlaidBalancePage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [jwt, setJwt] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  // Plaid state
  const [linkToken, setLinkToken] = useState(null);
  const [plaidLoading, setPlaidLoading] = useState(false);
  const [plaidError, setPlaidError] = useState("");
  const [linkSuccess, setLinkSuccess] = useState(false);
  const [linkedItemId, setLinkedItemId] = useState(null);

  // Balance state
  const [balanceData, setBalanceData] = useState(null);
  const [balanceLoading, setBalanceLoading] = useState(false);
  const [balanceError, setBalanceError] = useState("");

  // Logs
  const [logs, setLogs] = useState([]);

  const addLog = useCallback((type, message, data = null) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [{ timestamp, type, message, data }, ...prev.slice(0, 199)]);
  }, []);

  // ─── AUTO AUTH ON MOUNT ───
  useEffect(() => {
    const autoLogin = async () => {
      try {
        const res = await fetch(
          `${SUPABASE_URL}/auth/v1/token?grant_type=password`,
          {
            method: "POST",
            headers: { apikey: SUPABASE_ANON_KEY, "Content-Type": "application/json" },
            body: JSON.stringify({ email: TEST_EMAIL, password: TEST_PASSWORD }),
          }
        );
        const data = await res.json();
        if (data.access_token) {
          setJwt(data.access_token);
          addLog("success", `Session ready — ${TEST_EMAIL}`);
        } else {
          addLog("error", "Auto-auth failed", data);
        }
      } catch (err) {
        addLog("error", "Auth error", err.message);
      }
      setAuthReady(true);
    };
    autoLogin();
  }, [addLog]);

  // ─── STEP 1: Create Link Token ───
  const handleCreateLinkToken = async () => {
    setPlaidLoading(true);
    setPlaidError("");
    addLog("info", "POST /create-link-token");
    try {
      const res = await fetch(`${FUNCTIONS_BASE}/create-link-token`, {
        method: "POST",
        headers: { Authorization: `Bearer ${jwt}`, "Content-Type": "application/json" },
        body: JSON.stringify({ products: ["auth"], country_codes: ["US"] }),
      });
      const data = await res.json();
      if (data.error) {
        setPlaidError(data.error);
        addLog("error", "Create link token failed", data);
      } else {
        setLinkToken(data.link_token);
        addLog("success", "Link token created", {
          link_token: data.link_token?.substring(0, 40) + "...",
          expiration: data.expiration,
          request_id: data.request_id,
        });
      }
    } catch (err) {
      setPlaidError(err.message);
      addLog("error", "Error", err.message);
    }
    setPlaidLoading(false);
  };

  // ─── STEP 2: Open Plaid Link ───
  const handleOpenPlaidLink = useCallback(() => {
    if (!linkToken || !window.Plaid) {
      addLog("error", "Plaid Link SDK not loaded or no link token");
      return;
    }
    addLog("info", "Opening Plaid Link UI...");
    const handler = window.Plaid.create({
      token: linkToken,
      onSuccess: async (public_token, metadata) => {
        addLog("success", "Plaid Link success", {
          institution: metadata.institution?.name,
          accounts: metadata.accounts?.length,
        });
        await handleExchangeToken(public_token, metadata.institution?.name);
      },
      onExit: (err) => {
        if (err) {
          addLog("error", "Plaid Link exit error", err);
          setPlaidError(err.display_message || err.error_message);
        } else {
          addLog("info", "Plaid Link closed by user");
        }
      },
      onEvent: (eventName) => {
        addLog("info", `Plaid event: ${eventName}`);
      },
    });
    handler.open();
  }, [linkToken, addLog]);

  // ─── STEP 3: Exchange Token ───
  const handleExchangeToken = async (publicToken, institutionName) => {
    setPlaidLoading(true);
    addLog("info", "POST /exchange-public-token");
    try {
      const res = await fetch(`${FUNCTIONS_BASE}/exchange-public-token`, {
        method: "POST",
        headers: { Authorization: `Bearer ${jwt}`, "Content-Type": "application/json" },
        body: JSON.stringify({ public_token: publicToken, institution_name: institutionName || "Unknown" }),
      });
      const data = await res.json();
      if (data.error) {
        setPlaidError(data.error);
        addLog("error", "Exchange failed", data);
      } else {
        setLinkSuccess(true);
        setLinkedItemId(data.item_id);
        addLog("success", "Account linked!", { item_id: data.item_id });
      }
    } catch (err) {
      setPlaidError(err.message);
      addLog("error", "Error", err.message);
    }
    setPlaidLoading(false);
  };

  // ─── STEP 4: Get Balance ───
  const handleGetBalance = async () => {
    setBalanceLoading(true);
    setBalanceError("");
    addLog("info", "POST /get-balance");
    try {
      const res = await fetch(`${FUNCTIONS_BASE}/get-balance`, {
        method: "POST",
        headers: { Authorization: `Bearer ${jwt}`, "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      if (data.error) {
        setBalanceError(data.error);
        addLog("error", "Get balance failed", data);
      } else {
        setBalanceData(data);
        addLog("success", "Balance retrieved", data);
      }
    } catch (err) {
      setBalanceError(err.message);
      addLog("error", "Error", err.message);
    }
    setBalanceLoading(false);
  };

  if (!authReady) {
    return (
      <div style={{ ...s.page, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "#60a5fa", fontSize: 16 }}>Initializing session...</p>
      </div>
    );
  }

  return (
    <>
      <Script src="https://cdn.plaid.com/link/v2/stable/link-initialize.js" strategy="afterInteractive" />
      <div style={s.page}>
        {/* ─── TOP BAR ─── */}
        <div style={s.topBar}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ fontSize: 20, fontWeight: 800, color: "#fff", letterSpacing: 1 }}>HUSHH</span>
            <span style={{ color: "#60a5fa", fontSize: 14, fontWeight: 500 }}>Plaid Balance Developer Portal</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={s.badge("#22c55e")}>Production</span>
            <span style={s.badge("#f59e0b")}>Internal</span>
            <span style={s.dot(!!jwt)}></span>
            <span style={{ fontSize: 12, color: jwt ? "#22c55e" : "#ef4444" }}>
              {jwt ? "Authenticated" : "No Auth"}
            </span>
          </div>
        </div>

        {/* ─── TAB BAR ─── */}
        <div style={s.tabBar}>
          {TABS.map((tab) => (
            <button key={tab.id} style={s.tab(activeTab === tab.id)} onClick={() => setActiveTab(tab.id)}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* ─── TAB CONTENT ─── */}
        <div style={s.container}>
          {activeTab === "overview" && <OverviewTab jwt={jwt} />}
          {activeTab === "live-test" && (
            <LiveTestTab
              jwt={jwt}
              linkToken={linkToken}
              plaidLoading={plaidLoading}
              plaidError={plaidError}
              linkSuccess={linkSuccess}
              linkedItemId={linkedItemId}
              balanceData={balanceData}
              balanceLoading={balanceLoading}
              balanceError={balanceError}
              onCreateLinkToken={handleCreateLinkToken}
              onOpenPlaidLink={handleOpenPlaidLink}
              onGetBalance={handleGetBalance}
            />
          )}
          {activeTab === "api-docs" && <ApiDocsTab />}
          {activeTab === "api-tester" && <ApiTesterTab jwt={jwt} addLog={addLog} />}
          {activeTab === "architecture" && <ArchitectureTab />}
          {activeTab === "use-cases" && <UseCasesTab />}

          {/* Activity Log — always visible */}
          <ActivityLog logs={logs} onClear={() => setLogs([])} />

          {/* Footer */}
          <div style={{
            marginTop: 40, paddingTop: 20, borderTop: "1px solid #1a1a1a",
            textAlign: "center", fontSize: 11, color: "#555",
          }}>
            Hushh Plaid Balance Integration • Production Environment • Internal Use Only
          </div>
        </div>
      </div>
    </>
  );
}
