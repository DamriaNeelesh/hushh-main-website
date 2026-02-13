import { NextResponse } from "next/server";
import { resolvePlaidCredentials } from "../../../../../lib/plaid/credentials";

const PLAID_URLS = {
  production: "https://production.plaid.com/asset_report/audit_copy/remove",
  sandbox: "https://sandbox.plaid.com/asset_report/audit_copy/remove",
};

export async function POST(request) {
  try {
    const body = await request.json();
    const { audit_copy_token, environment = "production" } = body;

    if (!audit_copy_token) {
      return NextResponse.json({ error: "audit_copy_token is required" }, { status: 400 });
    }

    const { env, clientId, secret } = resolvePlaidCredentials(environment);
    const plaidUrl = env === "sandbox" ? PLAID_URLS.sandbox : PLAID_URLS.production;

    if (!clientId || !secret) {
      return NextResponse.json({ error: `Missing Plaid ${env} credentials.` }, { status: 500 });
    }

    const response = await fetch(plaidUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ client_id: clientId, secret, audit_copy_token }),
    });

    const text = await response.text();
    let data;
    try { data = JSON.parse(text); } catch { data = text; }

    return NextResponse.json({ status: response.status, data }, { status: response.ok ? 200 : response.status });
  } catch (error) {
    return NextResponse.json({ error: error?.message || "Audit copy remove error" }, { status: 500 });
  }
}
