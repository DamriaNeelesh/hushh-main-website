# Plaid Production Demo Runbook

Use this as your exact video script for a production-only demo.

## 1) Pre-check (terminal)

Run from project root:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/plaid/verify-dashboard-mcp.ps1 -ClientId "6934322f139fbf00216faf36" -ClientSecret "3800cc352586fd410bb82f63ab020f"
```

Expected:
- `"oauth_ok": true`
- `"mcp_status_line": "HTTP/1.1 200 OK"`
- `"verified": true`

Optional full smoke test:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/plaid/production-demo-smoke.ps1 -ClientId "<PLAID_CLIENT_ID>" -ClientSecret "<PLAID_PRODUCTION_SECRET>"
```

This verifies:
- Dashboard OAuth token creation
- Dashboard MCP SSE handshake
- Link token creation directly on Plaid production API

## 2) Start app (terminal)

```powershell
$env:PLAID_CLIENT_ID_PRODUCTION="<PLAID_CLIENT_ID>"
$env:PLAID_SECRET_PRODUCTION="<PLAID_PRODUCTION_SECRET>"
npm run dev
```

Open:
- `http://localhost:3000/plaid-integration`

## 3) Record video flow (screen)

1. Show `Active Environment = Production (Live)`.
2. Show `Credentials: Configured`.
3. Show selected Link products (`auth`, `identity`, `signal`) in the UI.
4. Click `Connect bank account`.
5. Complete Plaid Link with a production-supported institution.
6. Show log entry: `Plaid Link Success`.
7. Show `Exchange Public Token` success log.
8. Click `Fetch Account Details`.
9. Show `/accounts/get` response in `Response Console`.
10. Click `Fetch Consolidated Data (MuleSoft)` (optional but recommended).
11. Click `Push Data to Supabase`.
12. Show final success logs in `Response Console`.

## 4) Recording tip (Windows)

- Start/stop recording with `Win + Alt + R` (Xbox Game Bar).
- Keep terminal + browser both visible in the video.

## 5) Demo close statement

Use this line at the end:
- "This run is production-only: server-side production credentials, production Plaid endpoints, live Link flow, accounts retrieval, and Supabase push completed."
