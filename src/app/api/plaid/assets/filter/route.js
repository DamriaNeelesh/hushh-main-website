import { NextResponse } from "next/server";
import { resolvePlaidCredentials } from "../../../../../lib/plaid/credentials";

const PLAID_URLS = {
  production: "https://production.plaid.com/asset_report/filter",
  sandbox: "https://sandbox.plaid.com/asset_report/filter",
};

export async function POST(request) {
  try {
    const body = await request.json();
    const { asset_report_token, account_ids_to_exclude, environment = "production" } = body;

    if (!asset_report_token || !account_ids_to_exclude) {
      return NextResponse.json({ error: "asset_report_token and account_ids_to_exclude are required" }, { status: 400 });
    }

    const { env, clientId, secret } = resolvePlaidCredentials(environment);
    const plaidUrl = env === "sandbox" ? PLAID_URLS.sandbox : PLAID_URLS.production;

    if (!clientId || !secret) {
      return NextResponse.json({ error: `Missing Plaid ${env} credentials.` }, { status: 500 });
    }

    const response = await fetch(plaidUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ client_id: clientId, secret, asset_report_token, account_ids_to_exclude }),
    });

    const text = await response.text();
    let data;
    try { data = JSON.parse(text); } catch { data = text; }

    return NextResponse.json({ status: response.status, data }, { status: response.ok ? 200 : response.status });
  } catch (error) {
    return NextResponse.json({ error: error?.message || "Asset report filter error" }, { status: 500 });
  }
}
