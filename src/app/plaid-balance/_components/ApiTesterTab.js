"use client";
import { useState } from "react";
import { s, FUNCTIONS_BASE } from "./styles";

const EDGE_ENDPOINTS = [
  { id: "create-link-token", label: "🏦 create-link-token", defaultBody: '{"products": ["auth"], "country_codes": ["US"]}' },
  { id: "exchange-public-token", label: "🏦 exchange-public-token", defaultBody: '{"public_token": "public-production-...", "institution_name": "Chase"}' },
  { id: "get-balance", label: "🏦 get-balance", defaultBody: '{}' },
  { id: "signal-evaluate", label: "📊 signal-evaluate", defaultBody: '{"access_token": "access-production-...", "account_id": "acc_...", "client_transaction_id": "txn12345", "amount": 123.45}' },
  { id: "signal-decision-report", label: "📊 signal-decision-report", defaultBody: '{"client_transaction_id": "txn12345", "initiated": true, "days_funds_on_hold": 3}' },
  { id: "signal-return-report", label: "📊 signal-return-report", defaultBody: '{"client_transaction_id": "txn12345", "return_code": "R01"}' },
  { id: "signal-prepare", label: "📊 signal-prepare", defaultBody: '{"access_token": "access-production-..."}' },
  { id: "asset-report-create", label: "📋 asset-report-create", defaultBody: '{"access_tokens": ["access-production-..."], "days_requested": 90}' },
  { id: "asset-report-get", label: "📋 asset-report-get", defaultBody: '{"asset_report_token": "assets-production-...", "include_insights": true}' },
  { id: "investments-holdings", label: "📈 investments-holdings", defaultBody: '{"access_token": "access-production-..."}' },
  { id: "investments-transactions", label: "📈 investments-transactions", defaultBody: '{"access_token": "access-production-...", "start_date": "2025-01-01", "end_date": "2025-12-31"}' },
];

const PROXY_PRESETS = [
  { label: "List Institutions", endpoint: "https://production.plaid.com/institutions/get", body: '{"count": 5, "offset": 0, "country_codes": ["US"]}' },
  { label: "Get Categories", endpoint: "https://production.plaid.com/categories/get", body: '{}' },
];

const SIGNAL_PRESETS = [
  { id: "signal-evaluate", label: "Signal Evaluate", path: "/api/plaid/signal/evaluate", defaultBody: '{"access_token": "access-production-...", "account_id": "acc_...", "client_transaction_id": "txn12345", "amount": 123.45, "environment": "production"}' },
  { id: "signal-decision", label: "Decision Report", path: "/api/plaid/signal/decision-report", defaultBody: '{"client_transaction_id": "txn12345", "initiated": true, "days_funds_on_hold": 3, "environment": "production"}' },
  { id: "signal-return", label: "Return Report", path: "/api/plaid/signal/return-report", defaultBody: '{"client_transaction_id": "txn12345", "return_code": "R01", "environment": "production"}' },
  { id: "signal-prepare", label: "Signal Prepare", path: "/api/plaid/signal/prepare", defaultBody: '{"access_token": "access-production-...", "environment": "production"}' },
];

const ASSETS_PRESETS = [
  { id: "assets-create", label: "Create Report", path: "/api/plaid/assets/create", defaultBody: '{"access_tokens": ["access-production-..."], "days_requested": 90, "environment": "production"}' },
  { id: "assets-get", label: "Get Report", path: "/api/plaid/assets/get", defaultBody: '{"asset_report_token": "assets-production-...", "include_insights": true, "environment": "production"}' },
  { id: "assets-refresh", label: "Refresh Report", path: "/api/plaid/assets/refresh", defaultBody: '{"asset_report_token": "assets-production-...", "days_requested": 90, "environment": "production"}' },
  { id: "assets-filter", label: "Filter Report", path: "/api/plaid/assets/filter", defaultBody: '{"asset_report_token": "assets-production-...", "account_ids_to_exclude": ["acc_..."], "environment": "production"}' },
  { id: "assets-remove", label: "Remove Report", path: "/api/plaid/assets/remove", defaultBody: '{"asset_report_token": "assets-production-...", "environment": "production"}' },
  { id: "audit-copy-create", label: "Audit Copy Create", path: "/api/plaid/assets/audit-copy-create", defaultBody: '{"asset_report_token": "assets-production-...", "auditor_id": "fannie_mae", "environment": "production"}' },
  { id: "relay-create", label: "Relay Create", path: "/api/plaid/assets/relay-create", defaultBody: '{"report_tokens": ["assets-production-..."], "secondary_client_id": "client_...", "environment": "production"}' },
];

const INVESTMENTS_PRESETS = [
  { id: "inv-holdings", label: "Get Holdings", path: "/api/plaid/investments/holdings", defaultBody: '{"access_token": "access-production-...", "environment": "production"}' },
  { id: "inv-transactions", label: "Get Transactions", path: "/api/plaid/investments/transactions", defaultBody: '{"access_token": "access-production-...", "start_date": "2025-01-01", "end_date": "2025-12-31", "environment": "production"}' },
  { id: "inv-refresh", label: "Refresh", path: "/api/plaid/investments/refresh", defaultBody: '{"access_token": "access-production-...", "environment": "production"}' },
];

export default function ApiTesterTab({ jwt, addLog }) {
  const [edgeEndpoint, setEdgeEndpoint] = useState("create-link-token");
  const [edgeBody, setEdgeBody] = useState(EDGE_ENDPOINTS[0].defaultBody);
  const [edgeResponse, setEdgeResponse] = useState(null);
  const [edgeLoading, setEdgeLoading] = useState(false);

  const [proxyEndpoint, setProxyEndpoint] = useState(PROXY_PRESETS[0].endpoint);
  const [proxyBody, setProxyBody] = useState(PROXY_PRESETS[0].body);
  const [proxyResponse, setProxyResponse] = useState(null);
  const [proxyLoading, setProxyLoading] = useState(false);

  const [credResponse, setCredResponse] = useState(null);

  // Signal state
  const [signalPreset, setSignalPreset] = useState(SIGNAL_PRESETS[0]);
  const [signalBody, setSignalBody] = useState(SIGNAL_PRESETS[0].defaultBody);
  const [signalResponse, setSignalResponse] = useState(null);
  const [signalLoading, setSignalLoading] = useState(false);

  // Assets state
  const [assetsPreset, setAssetsPreset] = useState(ASSETS_PRESETS[0]);
  const [assetsBody, setAssetsBody] = useState(ASSETS_PRESETS[0].defaultBody);
  const [assetsResponse, setAssetsResponse] = useState(null);
  const [assetsLoading, setAssetsLoading] = useState(false);

  // Investments state
  const [invPreset, setInvPreset] = useState(INVESTMENTS_PRESETS[0]);
  const [invBody, setInvBody] = useState(INVESTMENTS_PRESETS[0].defaultBody);
  const [invResponse, setInvResponse] = useState(null);
  const [invLoading, setInvLoading] = useState(false);

  const handleEdgeTest = async () => {
    if (!jwt) { addLog("error", "Not authenticated"); return; }
    setEdgeLoading(true);
    setEdgeResponse(null);
    addLog("info", `API Test: POST /${edgeEndpoint}`);
    try {
      let body = {};
      try { body = JSON.parse(edgeBody); } catch { body = {}; }
      const res = await fetch(`${FUNCTIONS_BASE}/${edgeEndpoint}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${jwt}`, "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      setEdgeResponse({ status: res.status, data });
      addLog(res.ok ? "success" : "error", `Response: ${res.status}`, data);
    } catch (err) {
      setEdgeResponse({ status: "ERR", data: { error: err.message } });
      addLog("error", "Request failed", err.message);
    }
    setEdgeLoading(false);
  };

  const handleProxyTest = async () => {
    setProxyLoading(true);
    setProxyResponse(null);
    addLog("info", `Proxy Test: ${proxyEndpoint}`);
    try {
      let payload = {};
      try { payload = JSON.parse(proxyBody); } catch { payload = {}; }
      const res = await fetch("/api/plaid/proxy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ endpoint: proxyEndpoint, payload, environment: "production" }),
      });
      const data = await res.json();
      setProxyResponse({ status: res.status, data });
      addLog(res.ok ? "success" : "error", `Proxy: ${res.status}`, data);
    } catch (err) {
      setProxyResponse({ status: "ERR", data: { error: err.message } });
      addLog("error", "Proxy failed", err.message);
    }
    setProxyLoading(false);
  };

  const handleCredCheck = async () => {
    try {
      const res = await fetch("/api/plaid/credentials?env=production");
      const data = await res.json();
      setCredResponse(data);
      addLog("success", "Credentials checked", data);
    } catch (err) {
      setCredResponse({ error: err.message });
      addLog("error", "Credentials check failed", err.message);
    }
  };

  return (
    <>
      <h2 style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 8 }}>
        API Tester
      </h2>
      <p style={{ ...s.desc, marginBottom: 24 }}>
        Test any Plaid API endpoint live in production. Responses are logged in the Activity Log.
      </p>

      {/* Edge Function Tester */}
      <div style={s.card}>
        <h3 style={s.h2}>Supabase Edge Functions</h3>
        <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
          <select value={edgeEndpoint} onChange={(e) => {
            setEdgeEndpoint(e.target.value);
            const ep = EDGE_ENDPOINTS.find(x => x.id === e.target.value);
            if (ep) setEdgeBody(ep.defaultBody);
          }} style={s.select}>
            {EDGE_ENDPOINTS.map(ep => <option key={ep.id} value={ep.id}>{ep.label}</option>)}
          </select>
          <button onClick={handleEdgeTest} disabled={edgeLoading || !jwt} style={s.btn(edgeLoading || !jwt)}>
            {edgeLoading ? "Sending..." : "Send Request"}
          </button>
        </div>
        <div style={s.label}>Request Body (JSON)</div>
        <textarea value={edgeBody} onChange={(e) => setEdgeBody(e.target.value)} style={s.textarea} rows={4} />
        {edgeResponse && (
          <div style={{ marginTop: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={s.badge(edgeResponse.status < 300 ? "#22c55e" : "#ef4444")}>
                {edgeResponse.status}
              </span>
              <span style={{ fontSize: 12, color: "#888" }}>Response</span>
            </div>
            <pre style={s.code}>{JSON.stringify(edgeResponse.data, null, 2)}</pre>
          </div>
        )}
      </div>

      {/* Proxy Tester */}
      <div style={s.card}>
        <h3 style={s.h2}>Next.js Plaid Proxy</h3>
        <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
          {PROXY_PRESETS.map((preset, i) => (
            <button key={i} onClick={() => { setProxyEndpoint(preset.endpoint); setProxyBody(preset.body); }}
              style={{ ...s.btn(false), backgroundColor: "#333", fontSize: 11, padding: "6px 12px" }}>
              {preset.label}
            </button>
          ))}
        </div>
        <div style={s.label}>Endpoint URL</div>
        <input value={proxyEndpoint} onChange={(e) => setProxyEndpoint(e.target.value)} style={{ ...s.input, marginBottom: 8 }} />
        <div style={s.label}>Payload (JSON)</div>
        <textarea value={proxyBody} onChange={(e) => setProxyBody(e.target.value)} style={s.textarea} rows={3} />
        <button onClick={handleProxyTest} disabled={proxyLoading} style={{ ...s.btn(proxyLoading), marginTop: 8 }}>
          {proxyLoading ? "Sending..." : "Send via Proxy"}
        </button>
        {proxyResponse && (
          <div style={{ marginTop: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={s.badge(proxyResponse.status < 300 ? "#22c55e" : "#ef4444")}>
                {proxyResponse.status}
              </span>
            </div>
            <pre style={{ ...s.code, maxHeight: 300, overflowY: "auto" }}>
              {JSON.stringify(proxyResponse.data, null, 2)}
            </pre>
          </div>
        )}
      </div>

      {/* Credentials Check */}
      <div style={s.card}>
        <h3 style={s.h2}>Credentials Status</h3>
        <p style={s.desc}>Check if Plaid credentials are configured on the server.</p>
        <button onClick={handleCredCheck} style={s.btn(false)}>Check Credentials</button>
        {credResponse && (
          <pre style={{ ...s.code, marginTop: 12 }}>{JSON.stringify(credResponse, null, 2)}</pre>
        )}
      </div>

      {/* Signal Transaction Scores Tester */}
      <div style={{ ...s.card, borderColor: "#f59e0b30" }}>
        <h3 style={{ ...s.h2, color: "#f59e0b" }}>📊 Signal Transaction Scores</h3>
        <p style={s.desc}>Test ACH return risk evaluation and reporting endpoints.</p>
        <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
          {SIGNAL_PRESETS.map((preset) => (
            <button key={preset.id} onClick={() => { setSignalPreset(preset); setSignalBody(preset.defaultBody); setSignalResponse(null); }}
              style={{ ...s.btn(false), backgroundColor: signalPreset.id === preset.id ? "#f59e0b" : "#333", color: signalPreset.id === preset.id ? "#000" : "#fff", fontSize: 11, padding: "6px 12px" }}>
              {preset.label}
            </button>
          ))}
        </div>
        <div style={s.label}>POST {signalPreset.path}</div>
        <textarea value={signalBody} onChange={(e) => setSignalBody(e.target.value)} style={s.textarea} rows={4} />
        <button onClick={async () => {
          setSignalLoading(true); setSignalResponse(null);
          addLog("info", `Signal Test: POST ${signalPreset.path}`);
          try {
            let body = {}; try { body = JSON.parse(signalBody); } catch { body = {}; }
            const res = await fetch(signalPreset.path, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
            const data = await res.json();
            setSignalResponse({ status: res.status, data });
            addLog(res.ok ? "success" : "error", `Signal: ${res.status}`, data);
          } catch (err) { setSignalResponse({ status: "ERR", data: { error: err.message } }); addLog("error", "Signal failed", err.message); }
          setSignalLoading(false);
        }} disabled={signalLoading} style={{ ...s.btn(signalLoading), marginTop: 8, backgroundColor: signalLoading ? "#555" : "#f59e0b", color: "#000" }}>
          {signalLoading ? "Sending..." : "Send Signal Request"}
        </button>
        {signalResponse && (
          <div style={{ marginTop: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={s.badge(signalResponse.status < 300 ? "#22c55e" : "#ef4444")}>{signalResponse.status}</span>
            </div>
            <pre style={{ ...s.code, maxHeight: 300, overflowY: "auto" }}>{JSON.stringify(signalResponse.data, null, 2)}</pre>
          </div>
        )}
      </div>

      {/* Assets Report Tester */}
      <div style={{ ...s.card, borderColor: "#8b5cf630" }}>
        <h3 style={{ ...s.h2, color: "#8b5cf6" }}>📋 Assets Reports</h3>
        <p style={s.desc}>Test Asset Report creation, retrieval, sharing, and management.</p>
        <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
          {ASSETS_PRESETS.map((preset) => (
            <button key={preset.id} onClick={() => { setAssetsPreset(preset); setAssetsBody(preset.defaultBody); setAssetsResponse(null); }}
              style={{ ...s.btn(false), backgroundColor: assetsPreset.id === preset.id ? "#8b5cf6" : "#333", color: assetsPreset.id === preset.id ? "#fff" : "#fff", fontSize: 11, padding: "6px 12px" }}>
              {preset.label}
            </button>
          ))}
        </div>
        <div style={s.label}>POST {assetsPreset.path}</div>
        <textarea value={assetsBody} onChange={(e) => setAssetsBody(e.target.value)} style={s.textarea} rows={4} />
        <button onClick={async () => {
          setAssetsLoading(true); setAssetsResponse(null);
          addLog("info", `Assets Test: POST ${assetsPreset.path}`);
          try {
            let body = {}; try { body = JSON.parse(assetsBody); } catch { body = {}; }
            const res = await fetch(assetsPreset.path, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
            const data = await res.json();
            setAssetsResponse({ status: res.status, data });
            addLog(res.ok ? "success" : "error", `Assets: ${res.status}`, data);
          } catch (err) { setAssetsResponse({ status: "ERR", data: { error: err.message } }); addLog("error", "Assets failed", err.message); }
          setAssetsLoading(false);
        }} disabled={assetsLoading} style={{ ...s.btn(assetsLoading), marginTop: 8, backgroundColor: assetsLoading ? "#555" : "#8b5cf6" }}>
          {assetsLoading ? "Sending..." : "Send Assets Request"}
        </button>
        {assetsResponse && (
          <div style={{ marginTop: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={s.badge(assetsResponse.status < 300 ? "#22c55e" : "#ef4444")}>{assetsResponse.status}</span>
            </div>
            <pre style={{ ...s.code, maxHeight: 300, overflowY: "auto" }}>{JSON.stringify(assetsResponse.data, null, 2)}</pre>
          </div>
        )}
      </div>

      {/* Investments Tester */}
      <div style={{ ...s.card, borderColor: "#10b98130" }}>
        <h3 style={{ ...s.h2, color: "#10b981" }}>📈 Investments</h3>
        <p style={s.desc}>Test investment holdings, transactions, and refresh endpoints.</p>
        <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
          {INVESTMENTS_PRESETS.map((preset) => (
            <button key={preset.id} onClick={() => { setInvPreset(preset); setInvBody(preset.defaultBody); setInvResponse(null); }}
              style={{ ...s.btn(false), backgroundColor: invPreset.id === preset.id ? "#10b981" : "#333", color: invPreset.id === preset.id ? "#000" : "#fff", fontSize: 11, padding: "6px 12px" }}>
              {preset.label}
            </button>
          ))}
        </div>
        <div style={s.label}>POST {invPreset.path}</div>
        <textarea value={invBody} onChange={(e) => setInvBody(e.target.value)} style={s.textarea} rows={4} />
        <button onClick={async () => {
          setInvLoading(true); setInvResponse(null);
          addLog("info", `Investments Test: POST ${invPreset.path}`);
          try {
            let body = {}; try { body = JSON.parse(invBody); } catch { body = {}; }
            const res = await fetch(invPreset.path, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
            const data = await res.json();
            setInvResponse({ status: res.status, data });
            addLog(res.ok ? "success" : "error", `Investments: ${res.status}`, data);
          } catch (err) { setInvResponse({ status: "ERR", data: { error: err.message } }); addLog("error", "Investments failed", err.message); }
          setInvLoading(false);
        }} disabled={invLoading} style={{ ...s.btn(invLoading), marginTop: 8, backgroundColor: invLoading ? "#555" : "#10b981", color: "#000" }}>
          {invLoading ? "Sending..." : "Send Investments Request"}
        </button>
        {invResponse && (
          <div style={{ marginTop: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={s.badge(invResponse.status < 300 ? "#22c55e" : "#ef4444")}>{invResponse.status}</span>
            </div>
            <pre style={{ ...s.code, maxHeight: 300, overflowY: "auto" }}>{JSON.stringify(invResponse.data, null, 2)}</pre>
          </div>
        )}
      </div>
    </>
  );
}
