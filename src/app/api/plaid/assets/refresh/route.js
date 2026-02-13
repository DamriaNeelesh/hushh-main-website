import { NextResponse } from "next/server";
import { resolvePlaidCredentials } from "../../../../../lib/plaid/credentials";

const PLAID_URLS = {
  production: "https://production.plaid.com/asset_report/refresh",
  sandbox: "https://sandbox.plaid.com/asset_report/refresh",
};

export async function POST(request) {
  try {
    const body = await request.json();
    const { asset_report_token, days_requested, options, environment = "production" } = body;

    if (!asset_report_token) {
      return NextResponse.json({ error: "asset_report_token is required" }, { status: 400 });
    }

    const { env, clientId, secret } = resolvePlaidCredentials(environment);
    const plaidUrl = env === "sandbox" ? PLAID_URLS.sandbox : PLAID_URLS.production;

    if (!clientId || !secret) {
      return NextResponse.json({ error: `Missing Plaid ${env} credentials.` }, { status: 500 });
    }

    const payload = { client_id: clientId, secret, asset_report_token };
    if (days_requested !== undefined) payload.days_requested = days_requested;
    if (options) payload.options = options;

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
    return NextResponse.json({ error: error?.message || "Asset report refresh error" }, { status: 500 });
  }
}
