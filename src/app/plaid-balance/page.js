"use client";

import { useState, useCallback, useEffect } from "react";
import Script from "next/script";

const SUPABASE_URL = "https://ibsisfnjxeowvdtvgzff.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlic2lzZm5qeGVvd3ZkdHZnemZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ1NTk1NzgsImV4cCI6MjA4MDEzNTU3OH0.K16sO1R9L2WZGPueDP0mArs2eDYZc-TnIk2LApDw_fs";
const FUNCTIONS_BASE = `${SUPABASE_URL}/functions/v1`;

// Auto-login test account
const TEST_EMAIL = "plaid-test@hushh.ai";
const TEST_PASSWORD = "TestPlaid2026!";

export default function PlaidBalancePage() {
  // Auth state (auto-handled)
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

  const addLog = (type, message, data = null) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [{ timestamp, type, message, data }, ...prev]);
  };

  // ─── AUTO AUTH ON MOUNT ───
  useEffect(() => {
    const autoLogin = async () => {
      try {
        const res = await fetch(
          `${SUPABASE_URL}/auth/v1/token?grant_type=password`,
          {
            method: "POST",
            headers: {
              apikey: SUPABASE_ANON_KEY,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: TEST_EMAIL, password: TEST_PASSWORD }),
          }
        );
        const data = await res.json();
        if (data.access_token) {
          setJwt(data.access_token);
          addLog("success", "Session ready");
        } else {
          addLog("error", "Auto-auth failed", data);
        }
      } catch (err) {
        addLog("error", "Auth error", err.message);
      }
      setAuthReady(true);
    };
    autoLogin();
  }, []);

  // ─── STEP 1: Create Link Token ───
  const handleCreateLinkToken = async () => {
    setPlaidLoading(true);
    setPlaidError("");
    addLog("info", "Creating Plaid Link token...");

    try {
      const res = await fetch(`${FUNCTIONS_BASE}/create-link-token`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          products: ["auth"],
          country_codes: ["US"],
        }),
      });
      const data = await res.json();

      if (data.error) {
        setPlaidError(data.error);
        addLog("error", "Create link token failed", data);
      } else {
        setLinkToken(data.link_token);
        addLog("success", "Link token created!", {
          link_token: data.link_token,
          expiration: data.expiration,
          request_id: data.request_id,
        });
      }
    } catch (err) {
      setPlaidError(err.message);
      addLog("error", "Create link token error", err.message);
    }
    setPlaidLoading(false);
  };

  // ─── STEP 2: Open Plaid Link ───
  const handleOpenPlaidLink = useCallback(() => {
    if (!linkToken || !window.Plaid) {
      addLog("error", "Plaid Link SDK not loaded or no link token");
      return;
    }

    addLog("info", "Opening Plaid Link...");

    const handler = window.Plaid.create({
      token: linkToken,
      onSuccess: async (public_token, metadata) => {
        addLog("success", "Plaid Link success!", {
          public_token: public_token.substring(0, 30) + "...",
          institution: metadata.institution?.name,
          accounts: metadata.accounts?.length,
        });
        await handleExchangeToken(public_token, metadata.institution?.name);
      },
      onExit: (err) => {
        if (err) {
          addLog("error", "Plaid Link exited with error", err);
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
  }, [linkToken]);

  // ─── STEP 3: Exchange Public Token ───
  const handleExchangeToken = async (publicToken, institutionName) => {
    setPlaidLoading(true);
    addLog("info", "Exchanging public token...");

    try {
      const res = await fetch(`${FUNCTIONS_BASE}/exchange-public-token`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          public_token: publicToken,
          institution_name: institutionName || "Unknown",
        }),
      });
      const data = await res.json();

      if (data.error) {
        setPlaidError(data.error);
        addLog("error", "Exchange token failed", data);
      } else {
        setLinkSuccess(true);
        setLinkedItemId(data.item_id);
        addLog("success", "Account linked!", {
          item_id: data.item_id,
          message: data.message,
        });
      }
    } catch (err) {
      setPlaidError(err.message);
      addLog("error", "Exchange token error", err.message);
    }
    setPlaidLoading(false);
  };

  // ─── STEP 4: Get Balance ───
  const handleGetBalance = async () => {
    setBalanceLoading(true);
    setBalanceError("");
    addLog("info", "Fetching real-time balance...");

    try {
      const res = await fetch(`${FUNCTIONS_BASE}/get-balance`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      const data = await res.json();

      if (data.error) {
        setBalanceError(data.error);
        addLog("error", "Get balance failed", data);
      } else {
        setBalanceData(data);
        addLog("success", "Balance retrieved!", data);
      }
    } catch (err) {
      setBalanceError(err.message);
      addLog("error", "Get balance error", err.message);
    }
    setBalanceLoading(false);
  };

  if (!authReady) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
      >
        <p style={{ color: "#000", fontSize: 18 }}>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Script
        src="https://cdn.plaid.com/link/v2/stable/link-initialize.js"
        strategy="afterInteractive"
      />

      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#ffffff",
          color: "#000000",
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          padding: "40px 20px",
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          {/* Header */}
          <div style={{ marginBottom: 40, borderBottom: "2px solid #000", paddingBottom: 20 }}>
            <h1 style={{ fontSize: 32, fontWeight: 700, margin: 0, color: "#000" }}>
              Hushh × Plaid Balance Integration
            </h1>
            <p style={{ fontSize: 14, color: "#555", marginTop: 8 }}>
              Production Environment • Supabase Edge Functions • Real-time Balance
            </p>
          </div>

          {/* ─── STEP 1: Create Link Token ─── */}
          <div
            style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: 24,
              marginBottom: 20,
              backgroundColor: linkToken ? "#f8fff8" : "#fafafa",
            }}
          >
            <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12, color: "#000" }}>
              Step 1: Create Plaid Link Token
            </h2>
            <p style={{ fontSize: 14, color: "#555", marginBottom: 16 }}>
              Generates a link_token from Plaid Production API to initialize the bank linking UI.
            </p>
            <button
              onClick={handleCreateLinkToken}
              disabled={plaidLoading || !!linkToken || !jwt}
              style={{
                padding: "10px 24px",
                backgroundColor: linkToken ? "#28a745" : "#000",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                fontSize: 15,
                fontWeight: 600,
                cursor: linkToken ? "default" : "pointer",
                opacity: plaidLoading ? 0.5 : 1,
              }}
            >
              {linkToken
                ? "✅ Link Token Created"
                : plaidLoading
                ? "Creating..."
                : "Create Link Token"}
            </button>
            {linkToken && (
              <p
                style={{
                  fontSize: 12,
                  color: "#555",
                  marginTop: 8,
                  fontFamily: "monospace",
                  wordBreak: "break-all",
                }}
              >
                {linkToken}
              </p>
            )}
          </div>

          {/* ─── STEP 2: Open Plaid Link ─── */}
          <div
            style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: 24,
              marginBottom: 20,
              backgroundColor: linkSuccess ? "#f8fff8" : "#fafafa",
              opacity: linkToken ? 1 : 0.5,
            }}
          >
            <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12, color: "#000" }}>
              Step 2: Link Bank Account
            </h2>
            <p style={{ fontSize: 14, color: "#555", marginBottom: 16 }}>
              Opens Plaid Link UI where you securely connect a bank account. The public_token is
              exchanged for an access_token (stored server-side only).
            </p>
            <button
              onClick={handleOpenPlaidLink}
              disabled={!linkToken || plaidLoading || linkSuccess}
              style={{
                padding: "10px 24px",
                backgroundColor: linkSuccess ? "#28a745" : "#000",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                fontSize: 15,
                fontWeight: 600,
                cursor: !linkToken || linkSuccess ? "default" : "pointer",
                opacity: !linkToken || plaidLoading ? 0.5 : 1,
              }}
            >
              {linkSuccess
                ? "✅ Account Linked"
                : plaidLoading
                ? "Linking..."
                : "Open Plaid Link"}
            </button>
            {linkedItemId && (
              <p style={{ fontSize: 12, color: "#555", marginTop: 8, fontFamily: "monospace" }}>
                Item ID: {linkedItemId}
              </p>
            )}
          </div>

          {/* ─── STEP 3: Get Balance ─── */}
          <div
            style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: 24,
              marginBottom: 20,
              backgroundColor: balanceData ? "#f8fff8" : "#fafafa",
              opacity: linkSuccess ? 1 : 0.5,
            }}
          >
            <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12, color: "#000" }}>
              Step 3: Get Real-Time Balance
            </h2>
            <p style={{ fontSize: 14, color: "#555", marginBottom: 16 }}>
              Fetches real-time balance from Plaid Production API via /accounts/balance/get.
              Latency: p50 ~3s, p95 ~11s.
            </p>
            <button
              onClick={handleGetBalance}
              disabled={!linkSuccess || balanceLoading}
              style={{
                padding: "10px 24px",
                backgroundColor: "#000",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                fontSize: 15,
                fontWeight: 600,
                cursor: !linkSuccess ? "default" : "pointer",
                opacity: !linkSuccess || balanceLoading ? 0.5 : 1,
              }}
            >
              {balanceLoading ? "Fetching Balance..." : "Get Balance"}
            </button>

            {/* Balance Results */}
            {balanceData && balanceData.balances && (
              <div style={{ marginTop: 20 }}>
                {balanceData.balances.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      border: "1px solid #e0e0e0",
                      borderRadius: 6,
                      padding: 16,
                      marginBottom: 12,
                      backgroundColor: "#fff",
                    }}
                  >
                    <h3 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 12px 0", color: "#000" }}>
                      🏦 {item.institution_name || "Bank Account"}
                    </h3>
                    {item.accounts?.map((account, aIdx) => (
                      <div
                        key={aIdx}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr 1fr 1fr",
                          gap: 12,
                          padding: "12px 0",
                          borderTop: aIdx > 0 ? "1px solid #eee" : "none",
                        }}
                      >
                        <div>
                          <div style={{ fontSize: 11, color: "#888", textTransform: "uppercase" }}>
                            Account
                          </div>
                          <div style={{ fontSize: 15, fontWeight: 600, color: "#000" }}>
                            {account.name}
                          </div>
                          <div style={{ fontSize: 12, color: "#666" }}>
                            {account.type} • ****{account.mask}
                          </div>
                        </div>
                        <div>
                          <div style={{ fontSize: 11, color: "#888", textTransform: "uppercase" }}>
                            Available
                          </div>
                          <div style={{ fontSize: 20, fontWeight: 700, color: "#000" }}>
                            ${account.balances?.available?.toLocaleString() ?? "N/A"}
                          </div>
                        </div>
                        <div>
                          <div style={{ fontSize: 11, color: "#888", textTransform: "uppercase" }}>
                            Current
                          </div>
                          <div style={{ fontSize: 20, fontWeight: 700, color: "#333" }}>
                            ${account.balances?.current?.toLocaleString() ?? "N/A"}
                          </div>
                        </div>
                        <div>
                          <div style={{ fontSize: 11, color: "#888", textTransform: "uppercase" }}>
                            Currency
                          </div>
                          <div style={{ fontSize: 15, fontWeight: 500, color: "#555" }}>
                            {account.balances?.currency || "USD"}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
                <p style={{ fontSize: 12, color: "#888", marginTop: 8 }}>
                  Retrieved at: {balanceData.retrieved_at}
                </p>
              </div>
            )}
            {balanceError && (
              <p style={{ color: "#cc0000", fontSize: 14, marginTop: 8 }}>⚠️ {balanceError}</p>
            )}
          </div>

          {plaidError && (
            <div
              style={{
                padding: 16,
                backgroundColor: "#fff5f5",
                border: "1px solid #ffcccc",
                borderRadius: 8,
                marginBottom: 20,
              }}
            >
              <p style={{ color: "#cc0000", fontSize: 14, margin: 0 }}>⚠️ {plaidError}</p>
            </div>
          )}

          {/* ─── ACTIVITY LOG ─── */}
          <div
            style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: 24,
              marginTop: 30,
              backgroundColor: "#fafafa",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <h2 style={{ fontSize: 18, fontWeight: 600, margin: 0, color: "#000" }}>
                📋 Activity Log
              </h2>
              <button
                onClick={() => setLogs([])}
                style={{
                  padding: "4px 12px",
                  backgroundColor: "#fff",
                  color: "#666",
                  border: "1px solid #ccc",
                  borderRadius: 4,
                  fontSize: 12,
                  cursor: "pointer",
                }}
              >
                Clear
              </button>
            </div>
            <div style={{ maxHeight: 300, overflowY: "auto", fontFamily: "monospace", fontSize: 12 }}>
              {logs.length === 0 ? (
                <p style={{ color: "#999", textAlign: "center" }}>No activity yet</p>
              ) : (
                logs.map((log, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: "8px 12px",
                      borderBottom: "1px solid #eee",
                      backgroundColor: "#fff",
                    }}
                  >
                    <span style={{ color: "#888" }}>{log.timestamp}</span>
                    <span
                      style={{
                        marginLeft: 8,
                        color:
                          log.type === "error"
                            ? "#cc0000"
                            : log.type === "success"
                            ? "#28a745"
                            : "#000",
                        fontWeight: log.type === "error" ? 600 : 400,
                      }}
                    >
                      {log.type === "error" ? "❌" : log.type === "success" ? "✅" : "ℹ️"}{" "}
                      {log.message}
                    </span>
                    {log.data && (
                      <pre
                        style={{
                          margin: "4px 0 0 28px",
                          fontSize: 11,
                          color: "#555",
                          whiteSpace: "pre-wrap",
                          wordBreak: "break-all",
                        }}
                      >
                        {JSON.stringify(log.data, null, 2)}
                      </pre>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              marginTop: 40,
              paddingTop: 20,
              borderTop: "1px solid #eee",
              textAlign: "center",
              fontSize: 12,
              color: "#999",
            }}
          >
            Hushh Plaid Integration • Production Environment
          </div>
        </div>
      </div>
    </>
  );
}
