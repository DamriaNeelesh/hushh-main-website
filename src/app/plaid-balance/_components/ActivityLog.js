import { s, colors } from "./styles";

export default function ActivityLog({ logs, onClear }) {
  return (
    <div style={{ ...s.card, marginTop: 30 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h2 style={{ ...s.h2, margin: 0 }}>Activity Log</h2>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ fontSize: 12, color: colors.gray }}>{logs.length} entries</span>
          <button onClick={onClear} style={s.btnSmall()}>Clear</button>
        </div>
      </div>
      <div style={{
        maxHeight: 350, overflowY: "auto",
        fontFamily: '"SF Mono", Menlo, monospace', fontSize: 12,
        border: `1px solid ${colors.grayBorder}`, borderRadius: 8,
        backgroundColor: colors.grayLight,
      }}>
        {logs.length === 0 ? (
          <p style={{ color: colors.gray, textAlign: "center", padding: 24 }}>
            No activity yet. Use Live Test or API Tester to generate logs.
          </p>
        ) : (
          logs.map((log, idx) => (
            <div key={idx} style={{
              padding: "8px 14px",
              borderBottom: `1px solid ${colors.grayBorder}`,
              backgroundColor: log.type === "error" ? "#FFF5F5" : colors.white,
            }}>
              <span style={{ color: colors.gray }}>{log.timestamp}</span>
              <span style={{
                marginLeft: 8,
                color: log.type === "error" ? colors.red : log.type === "success" ? colors.green : colors.grayText,
                fontWeight: log.type === "error" ? 600 : 400,
              }}>
                {log.type === "error" ? "ERR" : log.type === "success" ? " OK" : "INF"}{" "}
                {log.message}
              </span>
              {log.data && (
                <pre style={{
                  margin: "4px 0 0 28px", fontSize: 11, color: colors.grayText,
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
