"use client";

import { useState, useCallback, useEffect } from "react";
import Script from "next/script";
import { s, TABS, colors, SUPABASE_URL, SUPABASE_ANON_KEY, FUNCTIONS_BASE, TEST_EMAIL, TEST_PASSWORD } from "./_components/styles";
import OverviewTab from "./_components/OverviewTab";
import LiveTestTab from "./_components/LiveTestTab";
import ApiDocsTab from "./_components/ApiDocsTab";
import ApiTesterTab from "./_components/ApiTesterTab";
import DeveloperTab from "./_components/DeveloperTab";
import UseCasesTab from "./_components/UseCasesTab";
import ActivityLog from "./_components/ActivityLog";

export default function PlaidBalancePage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [jwt, setJwt] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Endpoint status
  const [endpointStatus, setEndpointStatus] = useState({});

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

  // ─── HIDE MAIN SITE HEADER/FOOTER/BANNER via CSS injection ───
  useEffect(() => {
    // Inject a <style> to nuke everything outside our portal
    const style = document.createElement("style");
    style.id = "plaid-portal-overrides";
    style.textContent = `
      /* Hide specific site chrome — NOT layout wrappers */
      header:not([data-plaid-portal] *),
      footer:not([data-plaid-portal] *) { display: none !important; }
      nav:not([data-plaid-portal] *) { display: none !important; }
      [class*='Banner']:not([data-plaid-portal] *),
      [class*='banner']:not([data-plaid-portal] *),
      [class*='Funding']:not([data-plaid-portal] *),
      [class*='funding']:not([data-plaid-portal] *),
      [class*='marquee']:not([data-plaid-portal] *),
      [class*='Marquee']:not([data-plaid-portal] *),
      [class*='ticker']:not([data-plaid-portal] *),
      [class*='Ticker']:not([data-plaid-portal] *),
      [class*='announcement']:not([data-plaid-portal] *),
      [class*='Announcement']:not([data-plaid-portal] *),
      [class*='Header']:not([data-plaid-portal] *),
      [class*='header']:not([data-plaid-portal] *),
      [class*='Footer']:not([data-plaid-portal] *),
      [class*='footer']:not([data-plaid-portal] *),
      [class*='HushhBot']:not([data-plaid-portal] *),
      [class*='hushhBot']:not([data-plaid-portal] *),
      [class*='TopLoader']:not([data-plaid-portal] *),
      [class*='toploader']:not([data-plaid-portal] *) { display: none !important; }
      /* Reset body */
      body {
        background-color: #fff !important;
        padding: 0 !important;
        margin: 0 !important;
        overflow-x: hidden !important;
      }
      /* Mobile viewport fix */
      html { overflow-x: hidden !important; }
      /* Mobile-first responsive */
      @media (min-width: 768px) {
        [data-plaid-portal] table { font-size: 14px; }
      }
      @media (max-width: 767px) {
        [data-plaid-portal] table { font-size: 12px; }
        [data-plaid-portal] table th,
        [data-plaid-portal] table td { padding: 8px 10px !important; }
        [data-plaid-portal] pre { font-size: 11px !important; }
        [data-plaid-portal] h1 { font-size: 24px !important; }
        [data-plaid-portal] h2 { font-size: 18px !important; }
      }
    `;
    document.head.appendChild(style);

    // Also do JS-based hiding as fallback
    const hidden = [];
    const hideSelectors = [
      "header", "nav", "footer",
      "[class*='Header']", "[class*='header']",
      "[class*='Footer']", "[class*='footer']",
      "[class*='Banner']", "[class*='banner']",
      "[class*='Funding']", "[class*='funding']",
      "[class*='marquee']", "[class*='Marquee']",
      "[class*='HushhBot']", "[class*='hushhBot']",
    ];
    const hideAll = () => {
      hideSelectors.forEach((sel) => {
        document.querySelectorAll(sel).forEach((el) => {
          if (el && !el.closest("[data-plaid-portal]")) {
            el.style.setProperty("display", "none", "important");
            hidden.push(el);
          }
        });
      });
    };
    hideAll();
    // Re-run after a short delay to catch late-rendered elements
    const timer = setTimeout(hideAll, 500);
    const timer2 = setTimeout(hideAll, 1500);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
      const s = document.getElementById("plaid-portal-overrides");
      if (s) s.remove();
      hidden.forEach((el) => { el.style.removeProperty("display"); });
    };
  }, []);

  // ─── RESPONSIVE ───
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
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

  // ─── CHECK ENDPOINT STATUS ───
  useEffect(() => {
    if (!jwt) return;
    const checkEndpoints = async () => {
      const status = {};
      // Check Supabase edge functions
      const edgeFns = ["create-link-token", "exchange-public-token", "get-balance"];
      for (const fn of edgeFns) {
        try {
          const res = await fetch(`${FUNCTIONS_BASE}/${fn}`, {
            method: "OPTIONS",
            headers: { Authorization: `Bearer ${jwt}` },
          });
          status[fn] = res.ok || res.status === 204 || res.status === 200;
        } catch {
          status[fn] = false;
        }
      }
      // Check Next.js API routes
      try {
        const res = await fetch("/api/plaid/credentials?env=production");
        status["credentials"] = res.ok;
      } catch {
        status["credentials"] = false;
      }
      status["proxy"] = true; // Proxy is available if app runs
      status["accounts"] = true;
      setEndpointStatus(status);
    };
    checkEndpoints();
  }, [jwt]);

  // ─── HANDLERS ───
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
      if (data.error) { setPlaidError(data.error); addLog("error", "Create link token failed", data); }
      else {
        setLinkToken(data.link_token);
        addLog("success", "Link token created", { link_token: data.link_token?.substring(0, 40) + "...", expiration: data.expiration });
      }
    } catch (err) { setPlaidError(err.message); addLog("error", "Error", err.message); }
    setPlaidLoading(false);
  };

  const handleOpenPlaidLink = useCallback(() => {
    if (!linkToken || !window.Plaid) { addLog("error", "Plaid Link SDK not loaded"); return; }
    addLog("info", "Opening Plaid Link UI...");
    const handler = window.Plaid.create({
      token: linkToken,
      onSuccess: async (public_token, metadata) => {
        addLog("success", "Plaid Link success", { institution: metadata.institution?.name });
        await handleExchangeToken(public_token, metadata.institution?.name);
      },
      onExit: (err) => {
        if (err) { addLog("error", "Plaid Link exit error", err); setPlaidError(err.display_message || err.error_message); }
        else addLog("info", "Plaid Link closed");
      },
      onEvent: (eventName) => addLog("info", `Plaid event: ${eventName}`),
    });
    handler.open();
  }, [linkToken, addLog]);

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
      if (data.error) { setPlaidError(data.error); addLog("error", "Exchange failed", data); }
      else { setLinkSuccess(true); setLinkedItemId(data.item_id); addLog("success", "Account linked!", { item_id: data.item_id }); }
    } catch (err) { setPlaidError(err.message); addLog("error", "Error", err.message); }
    setPlaidLoading(false);
  };

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
      if (data.error) { setBalanceError(data.error); addLog("error", "Get balance failed", data); }
      else { setBalanceData(data); addLog("success", "Balance retrieved", data); }
    } catch (err) { setBalanceError(err.message); addLog("error", "Error", err.message); }
    setBalanceLoading(false);
  };

  if (!authReady) {
    return (
      <div data-plaid-portal style={{ ...s.page, display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: colors.blue, marginBottom: 8 }}>Hushh Plaid Balance</div>
          <p style={{ color: colors.grayText }}>Initializing session...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Script src="https://cdn.plaid.com/link/v2/stable/link-initialize.js" strategy="afterInteractive" />
      <div data-plaid-portal style={s.page}>
        {/* ─── TOP BAR (Black) ─── */}
        <div style={s.topBar}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {isMobile && (
              <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: "none", border: "none", color: "#fff", fontSize: 20, cursor: "pointer", padding: 0 }}>
                ☰
              </button>
            )}
            <span style={{ fontSize: 18, fontWeight: 700, color: "#fff", letterSpacing: 0.5 }}>Hushh</span>
            <span style={{ color: colors.blue, fontSize: 14, fontWeight: 500 }}>Plaid Balance</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={s.badgeSolid(colors.green)}>Production</span>
            <span style={s.badgeSolid(colors.orange)}>Internal</span>
            <span style={s.dot(!!jwt)}></span>
            <span style={{ fontSize: 12, color: jwt ? colors.green : colors.red }}>
              {jwt ? "Connected" : "Disconnected"}
            </span>
          </div>
        </div>

        {/* ─── SIDEBAR NAVIGATION ─── */}
        {(!isMobile || sidebarOpen) && (
          <div style={isMobile ? {
            ...s.sidebar, position: "fixed", top: 56, left: 0, right: 0, bottom: 0, width: "100%",
            backgroundColor: "rgba(0,0,0,0.5)", zIndex: 999,
          } : s.sidebar}>
            <div style={isMobile ? { width: 260, height: "100%", backgroundColor: colors.grayLight, overflowY: "auto" } : {}}>
              <div style={{ padding: "8px 20px 16px", borderBottom: `1px solid ${colors.grayBorder}` }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: colors.gray, textTransform: "uppercase", letterSpacing: 1.5 }}>
                  Navigation
                </div>
              </div>
              {TABS.map((tab) => (
                <button key={tab.id} style={s.navItem(activeTab === tab.id)} onClick={() => { setActiveTab(tab.id); if (isMobile) setSidebarOpen(false); }}>
                  <img src={tab.icon} alt="" width={16} height={16} style={{ opacity: activeTab === tab.id ? 1 : 0.6 }} />
                  <span>{tab.label}</span>
                </button>
              ))}

              {/* Endpoint Status Section */}
              <div style={{ padding: "20px 20px 8px", borderTop: `1px solid ${colors.grayBorder}`, marginTop: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: colors.gray, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 12 }}>
                  Endpoints
                </div>
                {[
                  { name: "create-link-token", label: "Link Token" },
                  { name: "exchange-public-token", label: "Exchange" },
                  { name: "get-balance", label: "Balance" },
                  { name: "credentials", label: "Credentials" },
                  { name: "proxy", label: "Proxy" },
                  { name: "accounts", label: "Accounts" },
                ].map((ep) => (
                  <div key={ep.name} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", fontSize: 13 }}>
                    <span style={s.dot(endpointStatus[ep.name] !== false)}></span>
                    <span style={{ color: colors.grayText }}>{ep.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─── MAIN CONTENT ─── */}
        <div style={isMobile ? s.mainMobile : s.main}>
          {activeTab === "overview" && <OverviewTab jwt={jwt} endpointStatus={endpointStatus} />}
          {activeTab === "live-test" && (
            <LiveTestTab
              jwt={jwt} linkToken={linkToken} plaidLoading={plaidLoading} plaidError={plaidError}
              linkSuccess={linkSuccess} linkedItemId={linkedItemId} balanceData={balanceData}
              balanceLoading={balanceLoading} balanceError={balanceError}
              onCreateLinkToken={handleCreateLinkToken} onOpenPlaidLink={handleOpenPlaidLink} onGetBalance={handleGetBalance}
            />
          )}
          {activeTab === "api-docs" && <ApiDocsTab />}
          {activeTab === "api-tester" && <ApiTesterTab jwt={jwt} addLog={addLog} />}
          {activeTab === "developer" && <DeveloperTab />}
          {activeTab === "use-cases" && <UseCasesTab />}

          <ActivityLog logs={logs} onClear={() => setLogs([])} />

          <div style={{ marginTop: 40, paddingTop: 20, borderTop: `1px solid ${colors.grayBorder}`, textAlign: "center", fontSize: 12, color: colors.gray }}>
            Hushh Plaid Balance Integration • Production • Internal Use Only
          </div>
        </div>
      </div>
    </>
  );
}
