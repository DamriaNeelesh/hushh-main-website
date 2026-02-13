import { s, colors, FUNCTIONS_BASE } from "./styles";

const API_ENDPOINTS = [
  {
    name: "Create Link Token",
    method: "POST",
    path: "/create-link-token",
    base: "Supabase Edge Function",
    auth: "Bearer <supabase_jwt>",
    desc: "Creates a Plaid Link token for initializing the bank linking UI. The link token is tied to the authenticated user.",
    reqBody: `{
  "products": ["auth"],       // Optional. Default: ["auth"]
  "country_codes": ["US"],    // Optional. Default: ["US"]
  "language": "en"            // Optional. Default: "en"
}`,
    resBody: `{
  "link_token": "link-production-abc123...",
  "expiration": "2026-02-13T12:00:00Z",
  "request_id": "abc123"
}`,
    errors: `401 → Missing/invalid JWT
500 → Plaid API error (missing credentials)`,
  },
  {
    name: "Exchange Public Token",
    method: "POST",
    path: "/exchange-public-token",
    base: "Supabase Edge Function",
    auth: "Bearer <supabase_jwt>",
    desc: "Exchanges the public_token from Plaid Link for an access_token. The access_token is stored in the plaid_items table and NEVER returned to the client.",
    reqBody: `{
  "public_token": "public-production-abc123...",  // Required
  "institution_name": "Chase"                      // Optional
}`,
    resBody: `{
  "item_id": "item_abc123...",
  "request_id": "req_abc123",
  "message": "Account linked successfully"
}`,
    errors: `400 → Missing public_token
401 → Missing/invalid JWT
500 → Plaid API or DB error`,
  },
  {
    name: "Get Balance",
    method: "POST",
    path: "/get-balance",
    base: "Supabase Edge Function",
    auth: "Bearer <supabase_jwt>",
    desc: "Fetches real-time balance for all linked bank accounts (or a specific item). Queries plaid_items table for stored access_tokens, then calls Plaid /accounts/balance/get.",
    reqBody: `{
  "item_id": "item_abc...",     // Optional — filter specific item
  "account_ids": ["acc_abc..."] // Optional — filter specific accounts
}`,
    resBody: `{
  "balances": [{
    "item_id": "item_abc...",
    "institution_name": "Chase",
    "accounts": [{
      "account_id": "acc_abc...",
      "name": "Checking",
      "type": "depository",
      "subtype": "checking",
      "mask": "0000",
      "balances": {
        "available": 1000.00,
        "current": 1100.00,
        "currency": "USD",
        "limit": null
      }
    }]
  }],
  "retrieved_at": "2026-02-13T08:00:00Z"
}`,
    errors: `401 → Missing/invalid JWT
404 → No linked bank accounts
500 → Plaid API or DB error`,
  },
  {
    name: "Plaid Proxy",
    method: "POST",
    path: "/api/plaid/proxy",
    base: "Next.js API Route",
    auth: "None (server-side credentials injected)",
    desc: "Proxies requests to Plaid or MuleSoft APIs. Automatically injects Plaid client_id and secret for allowed hosts. Supports production and sandbox environments.",
    reqBody: `{
  "endpoint": "https://production.plaid.com/institutions/get",
  "method": "POST",           // Optional. Default: "POST"
  "payload": {                // Request body to forward
    "count": 5,
    "offset": 0,
    "country_codes": ["US"]
  },
  "environment": "production", // Optional. Default: "production"
  "injectCredentials": true    // Optional. Auto-detected
}`,
    resBody: `{
  "status": 200,
  "methodUsed": "POST",
  "data": { ... }  // Plaid API response
}`,
    errors: `400 → Missing endpoint
403 → Host not in allowlist
405 → HTTP method not allowed
500 → Missing credentials or proxy error`,
  },
  {
    name: "Get Credentials Status",
    method: "GET",
    path: "/api/plaid/credentials",
    base: "Next.js API Route",
    auth: "None",
    desc: "Returns the current Plaid credential configuration status without exposing secrets.",
    reqBody: `// Query params:
?env=production  // or "sandbox"`,
    resBody: `{
  "environment": "production",
  "configured": true,
  "client_id_last4": "ab12",
  "available_environments": {
    "production": true,
    "sandbox": false
  }
}`,
    errors: `// No errors — always returns status`,
  },
  {
    name: "Get Accounts",
    method: "POST",
    path: "/api/plaid/accounts",
    base: "Next.js API Route",
    auth: "None (requires access_token in body)",
    desc: "Fetches account details directly from Plaid using an access_token. Used for testing with known tokens.",
    reqBody: `{
  "access_token": "access-production-abc...",  // Required
  "environment": "production"                   // Optional
}`,
    resBody: `{
  "status": 200,
  "data": {
    "accounts": [...],
    "item": { "item_id": "...", "institution_id": "..." },
    "request_id": "..."
  }
}`,
    errors: `400 → Missing access_token
500 → Missing credentials or Plaid error`,
  },
];

/* ─── Supabase Edge Functions (Signal/Assets/Investments) ─── */
const EDGE_SIGNAL_ASSETS_INV = [
  {
    name: "Signal Evaluate (Edge)",
    method: "POST",
    path: "/signal-evaluate",
    base: "Supabase Edge Function",
    auth: "Bearer <supabase_jwt>",
    desc: "Evaluate a planned ACH transaction for return risk via Supabase Edge Function. Calls Plaid /signal/evaluate with server-side credentials.",
    reqBody: `{
  "access_token": "access-production-...",
  "account_id": "acc_...",
  "client_transaction_id": "txn12345",
  "amount": 123.45,
  "client_user_id": "user1234"
}`,
    resBody: `{
  "scores": {
    "customer_initiated_return_risk": { "score": 9 },
    "bank_initiated_return_risk": { "score": 82 }
  },
  "core_attributes": { "available_balance": 2200 },
  "request_id": "..."
}`,
    errors: `400 → Missing required fields
401 → Missing/invalid JWT
500 → Plaid API error`,
  },
  {
    name: "Signal Decision Report (Edge)",
    method: "POST",
    path: "/signal-decision-report",
    base: "Supabase Edge Function",
    auth: "Bearer <supabase_jwt>",
    desc: "Report ACH transaction decision via Supabase Edge Function.",
    reqBody: `{
  "client_transaction_id": "txn12345",
  "initiated": true,
  "days_funds_on_hold": 3
}`,
    resBody: `{ "request_id": "..." }`,
    errors: `400 → Missing required fields
401 → Missing/invalid JWT
500 → Plaid API error`,
  },
  {
    name: "Signal Return Report (Edge)",
    method: "POST",
    path: "/signal-return-report",
    base: "Supabase Edge Function",
    auth: "Bearer <supabase_jwt>",
    desc: "Report ACH return via Supabase Edge Function.",
    reqBody: `{
  "client_transaction_id": "txn12345",
  "return_code": "R01"
}`,
    resBody: `{ "request_id": "..." }`,
    errors: `400 → Missing required fields
401 → Missing/invalid JWT
500 → Plaid API error`,
  },
  {
    name: "Signal Prepare (Edge)",
    method: "POST",
    path: "/signal-prepare",
    base: "Supabase Edge Function",
    auth: "Bearer <supabase_jwt>",
    desc: "Opt-in an Item to Signal Transaction Scores via Supabase Edge Function.",
    reqBody: `{
  "access_token": "access-production-..."
}`,
    resBody: `{ "request_id": "..." }`,
    errors: `400 → Missing access_token
401 → Missing/invalid JWT
500 → Plaid API error`,
  },
  {
    name: "Asset Report Create (Edge)",
    method: "POST",
    path: "/asset-report-create",
    base: "Supabase Edge Function",
    auth: "Bearer <supabase_jwt>",
    desc: "Create an Asset Report via Supabase Edge Function.",
    reqBody: `{
  "access_tokens": ["access-production-..."],
  "days_requested": 90,
  "options": { "webhook": "https://..." }
}`,
    resBody: `{
  "asset_report_token": "assets-production-...",
  "asset_report_id": "...",
  "request_id": "..."
}`,
    errors: `400 → Missing required fields
401 → Missing/invalid JWT
500 → Plaid API error`,
  },
  {
    name: "Asset Report Get (Edge)",
    method: "POST",
    path: "/asset-report-get",
    base: "Supabase Edge Function",
    auth: "Bearer <supabase_jwt>",
    desc: "Retrieve an Asset Report via Supabase Edge Function.",
    reqBody: `{
  "asset_report_token": "assets-production-...",
  "include_insights": true
}`,
    resBody: `{
  "report": { "asset_report_id": "...", "items": [...] },
  "warnings": [],
  "request_id": "..."
}`,
    errors: `400 → Missing token
401 → Missing/invalid JWT
500 → PRODUCT_NOT_READY or Plaid error`,
  },
  {
    name: "Investments Holdings (Edge)",
    method: "POST",
    path: "/investments-holdings",
    base: "Supabase Edge Function",
    auth: "Bearer <supabase_jwt>",
    desc: "Get investment holdings via Supabase Edge Function.",
    reqBody: `{
  "access_token": "access-production-...",
  "account_ids": ["acc_..."]   // Optional
}`,
    resBody: `{
  "accounts": [...],
  "holdings": [...],
  "securities": [...],
  "request_id": "..."
}`,
    errors: `400 → Missing access_token
401 → Missing/invalid JWT
500 → Plaid error`,
  },
  {
    name: "Investments Transactions (Edge)",
    method: "POST",
    path: "/investments-transactions",
    base: "Supabase Edge Function",
    auth: "Bearer <supabase_jwt>",
    desc: "Get investment transactions via Supabase Edge Function.",
    reqBody: `{
  "access_token": "access-production-...",
  "start_date": "2025-01-01",
  "end_date": "2025-12-31"
}`,
    resBody: `{
  "accounts": [...],
  "investment_transactions": [...],
  "securities": [...],
  "total_investment_transactions": 42,
  "request_id": "..."
}`,
    errors: `400 → Missing required fields
401 → Missing/invalid JWT
500 → Plaid error`,
  },
];

/* ─── Signal Transaction Scores Endpoints ─── */
const SIGNAL_ENDPOINTS = [
  {
    name: "Signal Evaluate",
    method: "POST",
    path: "/api/plaid/signal/evaluate",
    base: "Next.js API Route",
    auth: "None (server-side credentials)",
    desc: "Evaluate a planned ACH transaction for return risk. Returns risk scores and core attributes. Supports Signal Transaction Scores and Balance-only rulesets.",
    reqBody: `{
  "access_token": "access-production-...",   // Required
  "account_id": "3gE5gnRzNyfX...",           // Required
  "client_transaction_id": "txn12345",       // Required (max 36 chars)
  "amount": 123.45,                          // Required (USD)
  "client_user_id": "user1234",              // Optional
  "is_recurring": false,                     // Optional
  "default_payment_method": "STANDARD_ACH",  // Optional
  "ruleset_key": "default",                  // Optional
  "user": { "name": { "given_name": "Jane", "family_name": "Doe" } },
  "device": { "ip_address": "198.30.2.2" },
  "environment": "production"                // Optional
}`,
    resBody: `{
  "status": 200,
  "data": {
    "scores": {
      "customer_initiated_return_risk": { "score": 9, "risk_tier": 1 },
      "bank_initiated_return_risk": { "score": 82, "risk_tier": 7 }
    },
    "core_attributes": { "available_balance": 2200, "current_balance": 2000 },
    "ruleset": { "ruleset_key": "default", "result": "ACCEPT" },
    "warnings": [],
    "request_id": "mdqfuVxeoza6mhu"
  }
}`,
    errors: `400 → Missing required fields
500 → Missing credentials or Plaid error`,
  },
  {
    name: "Signal Decision Report",
    method: "POST",
    path: "/api/plaid/signal/decision-report",
    base: "Next.js API Route",
    auth: "None (server-side credentials)",
    desc: "Report whether you initiated an ACH transaction. Helps improve Signal accuracy and is needed for rule tuning in the Dashboard.",
    reqBody: `{
  "client_transaction_id": "txn12345",  // Required
  "initiated": true,                     // Required (boolean)
  "days_funds_on_hold": 3,              // Optional
  "decision": "APPROVE",                // Optional: APPROVE|REVIEW|REJECT
  "payment_method": "STANDARD_ACH",     // Optional
  "amount_instantly_available": 50.00,   // Optional
  "environment": "production"            // Optional
}`,
    resBody: `{
  "status": 200,
  "data": { "request_id": "mdqfuVxeoza6mhu" }
}`,
    errors: `400 → Missing required fields
500 → Plaid error`,
  },
  {
    name: "Signal Return Report",
    method: "POST",
    path: "/api/plaid/signal/return-report",
    base: "Next.js API Route",
    auth: "None (server-side credentials)",
    desc: "Report a returned ACH transaction. Feedback is used to improve risk scores and tune rule logic.",
    reqBody: `{
  "client_transaction_id": "txn12345",  // Required
  "return_code": "R01",                  // Required (valid ACH return code)
  "returned_at": "2026-02-13T08:00:00Z", // Optional (ISO 8601)
  "environment": "production"             // Optional
}`,
    resBody: `{
  "status": 200,
  "data": { "request_id": "mdqfuVxeoza6mhu" }
}`,
    errors: `400 → Missing required fields
500 → Plaid error`,
  },
  {
    name: "Signal Prepare",
    method: "POST",
    path: "/api/plaid/signal/prepare",
    base: "Next.js API Route",
    auth: "None (server-side credentials)",
    desc: "Opt-in an existing Item to Signal Transaction Scores data collection. Use when signal was in additional_consented_products but not in products array.",
    reqBody: `{
  "access_token": "access-production-...",  // Required
  "environment": "production"                // Optional
}`,
    resBody: `{
  "status": 200,
  "data": { "request_id": "mdqfuVxeoza6mhu" }
}`,
    errors: `400 → Missing access_token
500 → Plaid error`,
  },
];

/* ─── Assets Report Endpoints ─── */
const ASSETS_ENDPOINTS = [
  {
    name: "Asset Report Create",
    method: "POST",
    path: "/api/plaid/assets/create",
    base: "Next.js API Route",
    auth: "None (server-side credentials)",
    desc: "Create an Asset Report for one or more Items. Returns a token to retrieve the report once ready (listen for PRODUCT_READY webhook).",
    reqBody: `{
  "access_tokens": ["access-production-..."],  // Required (1-99)
  "days_requested": 90,                         // Required (0-731)
  "options": {                                   // Optional
    "client_report_id": "123",
    "webhook": "https://example.com/webhook",
    "user": { "first_name": "Jane", "last_name": "Doe" },
    "add_ons": ["fast_assets"]
  },
  "environment": "production"
}`,
    resBody: `{
  "status": 200,
  "data": {
    "asset_report_token": "assets-production-...",
    "asset_report_id": "1f414183-...",
    "request_id": "Iam3b"
  }
}`,
    errors: `400 → Missing required fields
500 → Plaid error`,
  },
  {
    name: "Asset Report Get",
    method: "POST",
    path: "/api/plaid/assets/get",
    base: "Next.js API Route",
    auth: "None (server-side credentials)",
    desc: "Retrieve an Asset Report in JSON format. Wait for PRODUCT_READY webhook before calling. Optionally include insights.",
    reqBody: `{
  "asset_report_token": "assets-production-...",  // Required
  "include_insights": true,                        // Optional
  "fast_report": false,                            // Optional
  "environment": "production"
}`,
    resBody: `{
  "status": 200,
  "data": {
    "report": { "asset_report_id": "...", "items": [...], "user": {...} },
    "warnings": [],
    "request_id": "..."
  }
}`,
    errors: `400 → Missing token
500 → PRODUCT_NOT_READY or Plaid error`,
  },
  {
    name: "Asset Report PDF",
    method: "POST",
    path: "/api/plaid/assets/pdf",
    base: "Next.js API Route",
    auth: "None (server-side credentials)",
    desc: "Retrieve the Asset Report as a downloadable PDF binary.",
    reqBody: `{
  "asset_report_token": "assets-production-...",
  "environment": "production"
}`,
    resBody: `// Binary PDF data (Content-Type: application/pdf)
// request_id in Plaid-Request-ID header`,
    errors: `400 → Missing token
500 → Plaid error`,
  },
  {
    name: "Asset Report Refresh",
    method: "POST",
    path: "/api/plaid/assets/refresh",
    base: "Next.js API Route",
    auth: "None (server-side credentials)",
    desc: "Create a new Asset Report based on an existing one, with the most recent data.",
    reqBody: `{
  "asset_report_token": "assets-production-...",  // Required
  "days_requested": 90,                            // Optional override
  "environment": "production"
}`,
    resBody: `{
  "status": 200,
  "data": {
    "asset_report_id": "...",
    "asset_report_token": "assets-production-...",
    "request_id": "..."
  }
}`,
    errors: `400 → Missing token
500 → Plaid error`,
  },
  {
    name: "Asset Report Filter",
    method: "POST",
    path: "/api/plaid/assets/filter",
    base: "Next.js API Route",
    auth: "None (server-side credentials)",
    desc: "Create a filtered Asset Report excluding specific accounts. Does not modify the original report.",
    reqBody: `{
  "asset_report_token": "assets-production-...",
  "account_ids_to_exclude": ["acc_abc123"],
  "environment": "production"
}`,
    resBody: `{
  "status": 200,
  "data": {
    "asset_report_token": "assets-production-...",
    "asset_report_id": "...",
    "request_id": "..."
  }
}`,
    errors: `400 → Missing required fields
500 → Plaid error`,
  },
  {
    name: "Asset Report Remove",
    method: "POST",
    path: "/api/plaid/assets/remove",
    base: "Next.js API Route",
    auth: "None (server-side credentials)",
    desc: "Delete an Asset Report and invalidate its token and associated audit copies.",
    reqBody: `{
  "asset_report_token": "assets-production-...",
  "environment": "production"
}`,
    resBody: `{
  "status": 200,
  "data": { "removed": true, "request_id": "..." }
}`,
    errors: `400 → Missing token
500 → Plaid error`,
  },
  {
    name: "Audit Copy Create",
    method: "POST",
    path: "/api/plaid/assets/audit-copy-create",
    base: "Next.js API Route",
    auth: "None (server-side credentials)",
    desc: "Create an Audit Copy token to share an Asset Report with a third party (e.g., Fannie Mae).",
    reqBody: `{
  "asset_report_token": "assets-production-...",
  "auditor_id": "fannie_mae",
  "environment": "production"
}`,
    resBody: `{
  "status": 200,
  "data": { "audit_copy_token": "a-production-...", "request_id": "..." }
}`,
    errors: `400 → Missing token
500 → Plaid error`,
  },
  {
    name: "Audit Copy Remove",
    method: "POST",
    path: "/api/plaid/assets/audit-copy-remove",
    base: "Next.js API Route",
    auth: "None (server-side credentials)",
    desc: "Remove an Audit Copy, invalidating its token.",
    reqBody: `{
  "audit_copy_token": "a-production-...",
  "environment": "production"
}`,
    resBody: `{
  "status": 200,
  "data": { "removed": true, "request_id": "..." }
}`,
    errors: `400 → Missing token
500 → Plaid error`,
  },
  {
    name: "Relay Create",
    method: "POST",
    path: "/api/plaid/assets/relay-create",
    base: "Next.js API Route",
    auth: "None (server-side credentials)",
    desc: "Create a relay token to share an Asset Report with a partner client.",
    reqBody: `{
  "report_tokens": ["assets-production-..."],
  "secondary_client_id": "ce5bd328...",
  "webhook": "https://example.com/hook",
  "environment": "production"
}`,
    resBody: `{
  "status": 200,
  "data": { "relay_token": "credit-relay-production-...", "request_id": "..." }
}`,
    errors: `400 → Missing required fields
500 → Plaid error`,
  },
  {
    name: "Relay Get",
    method: "POST",
    path: "/api/plaid/assets/relay-get",
    base: "Next.js API Route",
    auth: "None (server-side credentials)",
    desc: "Retrieve a report shared via a relay token.",
    reqBody: `{
  "relay_token": "credit-relay-production-...",
  "report_type": "asset",
  "include_insights": true,
  "environment": "production"
}`,
    resBody: `{
  "status": 200,
  "data": { "report": {...}, "warnings": [], "request_id": "..." }
}`,
    errors: `400 → Missing required fields
500 → Plaid error`,
  },
  {
    name: "Relay Refresh",
    method: "POST",
    path: "/api/plaid/assets/relay-refresh",
    base: "Next.js API Route",
    auth: "None (server-side credentials)",
    desc: "Refresh a report associated with a relay token.",
    reqBody: `{
  "relay_token": "credit-relay-production-...",
  "report_type": "asset",
  "webhook": "https://example.com/hook",
  "environment": "production"
}`,
    resBody: `{
  "status": 200,
  "data": { "relay_token": "...", "asset_report_id": "...", "request_id": "..." }
}`,
    errors: `400 → Missing required fields
500 → Plaid error`,
  },
  {
    name: "Relay Remove",
    method: "POST",
    path: "/api/plaid/assets/relay-remove",
    base: "Next.js API Route",
    auth: "None (server-side credentials)",
    desc: "Invalidate a relay token.",
    reqBody: `{
  "relay_token": "credit-relay-production-...",
  "environment": "production"
}`,
    resBody: `{
  "status": 200,
  "data": { "removed": true, "request_id": "..." }
}`,
    errors: `400 → Missing token
500 → Plaid error`,
  },
];

/* ─── Investments Endpoints ─── */
const INVESTMENTS_ENDPOINTS = [
  {
    name: "Investments Holdings",
    method: "POST",
    path: "/api/plaid/investments/holdings",
    base: "Next.js API Route",
    auth: "None (server-side credentials)",
    desc: "Get investment holdings for a linked brokerage/investment account. Returns current positions with quantities, values, and associated security details.",
    reqBody: `{
  "access_token": "access-production-...",  // Required
  "account_ids": ["acc_abc123"],             // Optional filter
  "environment": "production"                // Optional
}`,
    resBody: `{
  "status": 200,
  "data": {
    "accounts": [{
      "account_id": "...", "name": "Brokerage",
      "type": "investment", "balances": { "current": 320.76 }
    }],
    "holdings": [{
      "account_id": "...", "security_id": "...",
      "quantity": 10, "institution_value": 200.00,
      "institution_price": 20.00, "cost_basis": 150.00
    }],
    "securities": [{
      "security_id": "...", "name": "Apple Inc",
      "ticker_symbol": "AAPL", "type": "equity"
    }],
    "request_id": "..."
  }
}`,
    errors: `400 → Missing access_token
500 → Plaid error or product not enabled`,
  },
  {
    name: "Investments Transactions",
    method: "POST",
    path: "/api/plaid/investments/transactions",
    base: "Next.js API Route",
    auth: "None (server-side credentials)",
    desc: "Fetch investment transactions (buys, sells, dividends, fees, etc.) within a date range.",
    reqBody: `{
  "access_token": "access-production-...",  // Required
  "start_date": "2025-01-01",               // Required (YYYY-MM-DD)
  "end_date": "2025-12-31",                 // Required (YYYY-MM-DD)
  "account_ids": ["acc_abc123"],             // Optional
  "count": 100,                              // Optional (default 100)
  "offset": 0,                              // Optional
  "environment": "production"
}`,
    resBody: `{
  "status": 200,
  "data": {
    "accounts": [...],
    "investment_transactions": [{
      "investment_transaction_id": "...",
      "account_id": "...", "security_id": "...",
      "date": "2025-06-15", "name": "Buy AAPL",
      "quantity": 5, "amount": 875.00,
      "price": 175.00, "type": "buy", "subtype": "buy"
    }],
    "securities": [...],
    "total_investment_transactions": 42,
    "request_id": "..."
  }
}`,
    errors: `400 → Missing required fields
500 → Plaid error`,
  },
  {
    name: "Investments Refresh",
    method: "POST",
    path: "/api/plaid/investments/refresh",
    base: "Next.js API Route",
    auth: "None (server-side credentials)",
    desc: "Trigger a refresh of investment data. New data will be available after the HOLDINGS_UPDATE webhook fires.",
    reqBody: `{
  "access_token": "access-production-...",  // Required
  "environment": "production"                // Optional
}`,
    resBody: `{
  "status": 200,
  "data": { "request_id": "..." }
}`,
    errors: `400 → Missing access_token
500 → Plaid error`,
  },
];

export default function ApiDocsTab() {
  return (
    <>
      <h2 style={{ ...s.h1, fontSize: 28 }}>
        API Documentation
      </h2>
      <p style={{ ...s.desc, marginBottom: 8 }}>
        Complete reference for all Plaid Balance API endpoints. Base URL for edge functions:{" "}
        <code style={{ color: "#60a5fa" }}>{FUNCTIONS_BASE}</code>
      </p>
      <p style={{ ...s.desc, marginBottom: 24 }}>
        All Supabase Edge Function endpoints require a valid JWT in the Authorization header.
        Next.js API routes handle credentials server-side.
      </p>

      {[
        { title: "🏦 Balance & Core Endpoints", endpoints: API_ENDPOINTS, color: "#2563eb" },
        { title: "⚡ Edge Functions (Signal/Assets/Investments)", endpoints: EDGE_SIGNAL_ASSETS_INV, color: "#06b6d4" },
        { title: "📊 Signal Transaction Scores", endpoints: SIGNAL_ENDPOINTS, color: "#f59e0b" },
        { title: "📋 Assets Reports", endpoints: ASSETS_ENDPOINTS, color: "#8b5cf6" },
        { title: "📈 Investments", endpoints: INVESTMENTS_ENDPOINTS, color: "#10b981" },
      ].map((section) => (
        <div key={section.title}>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: section.color, margin: "32px 0 16px", borderBottom: `2px solid ${section.color}30`, paddingBottom: 8 }}>
            {section.title}
            <span style={{ fontSize: 12, color: "#888", fontWeight: 400, marginLeft: 12 }}>
              {section.endpoints.length} endpoints
            </span>
          </h3>
          {section.endpoints.map((ep, idx) => (
            <div key={idx} style={{ ...s.card, marginBottom: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <span style={s.badge(ep.method === "GET" ? "#22c55e" : "#2563eb")}>{ep.method}</span>
                <code style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>{ep.path}</code>
                <span style={{ fontSize: 11, color: "#666" }}>({ep.base})</span>
              </div>
              <p style={s.desc}>{ep.desc}</p>

              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <span style={{ fontSize: 11, color: "#f59e0b", fontWeight: 600 }}>AUTH:</span>
                <code style={{ fontSize: 12, color: "#888" }}>{ep.auth}</code>
              </div>

              <div style={s.grid2}>
                <div>
                  <div style={s.sectionTitle}>Request</div>
                  <pre style={s.code}>{ep.reqBody}</pre>
                </div>
                <div>
                  <div style={s.sectionTitle}>Response</div>
                  <pre style={s.code}>{ep.resBody}</pre>
                </div>
              </div>

              <div style={{ marginTop: 12 }}>
                <div style={{ ...s.sectionTitle, color: "#ef4444" }}>Error Codes</div>
                <pre style={{ ...s.code, borderColor: "#3a0505" }}>{ep.errors}</pre>
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  );
}
