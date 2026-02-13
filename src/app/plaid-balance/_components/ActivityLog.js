import { s } from "./styles";

export default function ActivityLog({ logs, onClear }) {
  return (
    <div style={{ ...s.card, marginTop: 30, borderColor: "#1a1a2e" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h2 style={{ ...s.h2, margin: 0 }}>Activity Log</h2>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ fontSize: 11, color: "#666" }}>{logs.length} entries</span>
          <button onClick={onClear} style={{
            padding: "4px 12px", backgroundColor: "#1a1a1a", color: "#888",
            border: "1px solid #333", borderRadius: 4, fontSize: 11, cursor: "pointer",
          }}>
            Clear
          </button>
        </div>
      </div>
      <div style={{ maxHeight: 350, overflowY: "auto", fontFamily: "monospace", fontSize: 12 }}>
        {logs.length === 0 ? (
          <p style={{ color: "#555", textAlign: "center", padding: 20 }}>No activity yet. Use Live Test or API Tester to generate logs.</p>
        ) : (
          logs.map((log, idx) => (
            <div key={idx} style={{
              padding: "8px 12px",
              borderBottom: "1px solid #1a1a1a",
              backgroundColor: log.type === "error" ? "#0a0505" : "#0a0a0a",
            }}>
              <span style={{ color: "#555" }}>{log.timestamp}</span>
              <span style={{
                marginLeft: 8,
                color: log.type === "error" ? "#ef4444" : log.type === "success" ? "#22c55e" : "#888",
                fontWeight: log.type === "error" ? 600 : 400,
              }}>
                {log.type === "error" ? "ERR" : log.type === "success" ? "OK " : "INF"}{" "}
                {log.message}
              </span>
              {log.data && (
                <pre style={{
                  margin: "4px 0 0 28px", fontSize: 11, color: "#555",
                  whiteSpace: "pre-wrap", wordBreak: "break-all",
                }}>
                  {typeof log.data === "string" ? log.data : JSON.stringify(log.data, null, 2)}
                </pre>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
