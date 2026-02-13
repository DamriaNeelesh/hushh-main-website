import { NextResponse } from "next/server";
import { resolvePlaidCredentials } from "../../../../../lib/plaid/credentials";

const PLAID_URLS = {
  production: "https://production.plaid.com/asset_report/audit_copy/create",
  sandbox: "https://sandbox.plaid.com/asset_report/audit_copy/create",
};

export async function POST(request) {
  try {
    const body = await request.json();
    const { asset_report_token, auditor_id, environment = "production" } = body;

    if (!asset_report_token) {
      return NextResponse.json({ error: "asset_report_token is required" }, { status: 400 });
    }

    const { env, clientId, secret } = resolvePlaidCredentials(environment);
    const plaidUrl = env === "sandbox" ? PLAID_URLS.sandbox : PLAID_URLS.production;

    if (!clientId || !secret) {
      return NextResponse.json({ error: `Missing Plaid ${env} credentials.` }, { status: 500 });
    }

    const payload = { client_id: clientId, secret, asset_report_token };
    if (auditor_id) payload.auditor_id = auditor_id;

    const response = await fetch(plaidUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const text = await response.text();
    let data;
    try { data = JSON.parse(text); } catch { data = text; }

    return NextResponse.json({ status: response.status, data }, { status: response.ok ? 200 : response.status });
  } catch (error) {
    return NextResponse.json({ error: error?.message || "Audit copy create error" }, { status: 500 });
  }
}
