"use client";
import { useState } from "react";
import { s, FUNCTIONS_BASE } from "./styles";

const EDGE_ENDPOINTS = [
  { id: "create-link-token", label: "create-link-token", defaultBody: '{"products": ["auth"], "country_codes": ["US"]}' },
  { id: "exchange-public-token", label: "exchange-public-token", defaultBody: '{"public_token": "public-production-...", "institution_name": "Chase"}' },
  { id: "get-balance", label: "get-balance", defaultBody: '{}' },
];

const PROXY_PRESETS = [
  { label: "List Institutions", endpoint: "https://production.plaid.com/institutions/get", body: '{"count": 5, "offset": 0, "country_codes": ["US"]}' },
  { label: "Get Categories", endpoint: "https://production.plaid.com/categories/get", body: '{}' },
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
    </>
  );
}
