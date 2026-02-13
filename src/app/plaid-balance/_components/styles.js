export const SUPABASE_URL = "https://ibsisfnjxeowvdtvgzff.supabase.co";
export const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlic2lzZm5qeGVvd3ZkdHZnemZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ1NTk1NzgsImV4cCI6MjA4MDEzNTU3OH0.K16sO1R9L2WZGPueDP0mArs2eDYZc-TnIk2LApDw_fs";
export const FUNCTIONS_BASE = `${SUPABASE_URL}/functions/v1`;
export const TEST_EMAIL = "plaid-test@hushh.ai";
export const TEST_PASSWORD = "TestPlaid2026!";

// Apple-style colors
export const colors = {
  blue: "#007AFF",
  green: "#34C759",
  red: "#FF3B30",
  orange: "#FF9500",
  yellow: "#FFCC00",
  purple: "#AF52DE",
  pink: "#FF2D55",
  teal: "#5AC8FA",
  gray: "#8E8E93",
  grayLight: "#F2F2F7",
  grayBorder: "#E5E5EA",
  grayText: "#6E6E73",
  black: "#1D1D1F",
  white: "#FFFFFF",
};

// Professional SVG icons (gray, 16px)
const icon = (path) => `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%238E8E93" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`)}`;

export const TABS = [
  { id: "overview", label: "Overview", icon: icon('<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>') },
  { id: "live-test", label: "Live Test", icon: icon('<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>') },
  { id: "api-docs", label: "API Docs", icon: icon('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>') },
  { id: "api-tester", label: "API Tester", icon: icon('<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>') },
  { id: "architecture", label: "Architecture", icon: icon('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>') },
  { id: "use-cases", label: "Use Cases", icon: icon('<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>') },
];

export const s = {
  // Page
  page: {
    minHeight: "100vh",
    backgroundColor: colors.white,
    color: colors.black,
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
    padding: 0,
    margin: 0,
  },
  // Top bar
  topBar: {
    backgroundColor: colors.black,
    padding: "14px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  // Sidebar
  sidebar: {
    position: "fixed",
    left: 0,
    top: 56,
    bottom: 0,
    width: 220,
    backgroundColor: colors.grayLight,
    borderRight: `1px solid ${colors.grayBorder}`,
    padding: "16px 0",
    overflowY: "auto",
    zIndex: 999,
  },
  sidebarMobile: {
    display: "none",
  },
  navItem: (active) => ({
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "10px 20px",
    fontSize: 14,
    fontWeight: active ? 600 : 400,
    color: active ? colors.blue : colors.black,
    backgroundColor: active ? colors.white : "transparent",
    border: "none",
    borderLeft: active ? `3px solid ${colors.blue}` : "3px solid transparent",
    cursor: "pointer",
    width: "100%",
    textAlign: "left",
    transition: "all 0.15s",
  }),
  // Main content
  main: {
    marginLeft: 220,
    padding: "32px 40px",
    maxWidth: 960,
  },
  mainMobile: {
    marginLeft: 0,
    padding: "20px 16px",
  },
  // Cards
  card: {
    border: `1px solid ${colors.grayBorder}`,
    borderRadius: 12,
    padding: 24,
    marginBottom: 20,
    backgroundColor: colors.white,
    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
  },
  cardActive: {
    border: `1px solid ${colors.green}40`,
    borderRadius: 12,
    padding: 24,
    marginBottom: 20,
    backgroundColor: "#F0FFF4",
    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
  },
  // Typography
  h1: { fontSize: 32, fontWeight: 700, color: colors.black, marginBottom: 8, letterSpacing: -0.5 },
  h2: { fontSize: 20, fontWeight: 600, marginBottom: 12, color: colors.black },
  h3: { fontSize: 16, fontWeight: 600, marginBottom: 8, color: colors.black },
  desc: { fontSize: 15, color: colors.grayText, marginBottom: 16, lineHeight: 1.6 },
  // Buttons
  btn: (disabled) => ({
    padding: "10px 20px",
    backgroundColor: disabled ? colors.grayBorder : colors.blue,
    color: colors.white,
    border: "none",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 600,
    cursor: disabled ? "default" : "pointer",
    opacity: disabled ? 0.5 : 1,
    transition: "all 0.15s",
  }),
  btnGreen: {
    padding: "10px 20px",
    backgroundColor: colors.green,
    color: colors.white,
    border: "none",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 600,
  },
  btnSmall: (color) => ({
    padding: "6px 12px",
    backgroundColor: color || colors.grayLight,
    color: color ? colors.white : colors.black,
    border: color ? "none" : `1px solid ${colors.grayBorder}`,
    borderRadius: 6,
    fontSize: 12,
    fontWeight: 500,
    cursor: "pointer",
  }),
  // Code
  code: {
    backgroundColor: colors.grayLight,
    border: `1px solid ${colors.grayBorder}`,
    borderRadius: 8,
    padding: 16,
    fontSize: 13,
    lineHeight: 1.6,
    overflowX: "auto",
    color: colors.black,
    fontFamily: '"SF Mono", "Fira Code", Menlo, Monaco, monospace',
    whiteSpace: "pre-wrap",
    wordBreak: "break-all",
  },
  // Labels
  label: { fontSize: 11, color: colors.gray, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 4, fontWeight: 600 },
  value: { fontSize: 18, fontWeight: 700, color: colors.black },
  // Grid
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
  grid2Responsive: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 },
  // Inputs
  input: {
    width: "100%",
    padding: "10px 14px",
    backgroundColor: colors.white,
    border: `1px solid ${colors.grayBorder}`,
    borderRadius: 8,
    color: colors.black,
    fontSize: 14,
    fontFamily: '"SF Mono", Menlo, monospace',
    boxSizing: "border-box",
    outline: "none",
  },
  textarea: {
    width: "100%",
    padding: "10px 14px",
    backgroundColor: colors.white,
    border: `1px solid ${colors.grayBorder}`,
    borderRadius: 8,
    color: colors.black,
    fontSize: 13,
    fontFamily: '"SF Mono", Menlo, monospace',
    boxSizing: "border-box",
    minHeight: 100,
    resize: "vertical",
    outline: "none",
  },
  select: {
    padding: "10px 14px",
    backgroundColor: colors.white,
    border: `1px solid ${colors.grayBorder}`,
    borderRadius: 8,
    color: colors.black,
    fontSize: 14,
  },
  // Badges
  badge: (color) => ({
    fontSize: 11,
    padding: "3px 10px",
    borderRadius: 20,
    fontWeight: 600,
    backgroundColor: color + "18",
    color: color,
    display: "inline-block",
  }),
  badgeSolid: (color) => ({
    fontSize: 11,
    padding: "3px 10px",
    borderRadius: 20,
    fontWeight: 600,
    backgroundColor: color,
    color: colors.white,
    display: "inline-block",
  }),
  // Status dot
  dot: (ok) => ({
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: ok ? colors.green : colors.red,
    display: "inline-block",
    marginRight: 6,
  }),
  sectionTitle: { fontSize: 12, fontWeight: 700, color: colors.blue, marginBottom: 10, textTransform: "uppercase", letterSpacing: 1 },
};
