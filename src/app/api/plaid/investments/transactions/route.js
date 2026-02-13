import { NextResponse } from "next/server";
import { resolvePlaidCredentials } from "../../../../../lib/plaid/credentials";

const PLAID_URLS = {
  production: "https://production.plaid.com/investments/transactions/get",
  sandbox: "https://sandbox.plaid.com/investments/transactions/get",
};

export async function POST(request) {
  try {
    const body = await request.json();
    const { access_token, start_date, end_date, options, environment = "production" } = body;

    if (!access_token || !start_date || !end_date) {
      return NextResponse.json(
        { error: "access_token, start_date, and end_date are required" },
        { status: 400 }
      );
    }

    const { env, clientId, secret } = resolvePlaidCredentials(environment);
    const plaidUrl = env === "sandbox" ? PLAID_URLS.sandbox : PLAID_URLS.production;

    if (!clientId || !secret) {
      return NextResponse.json({ error: `Missing Plaid ${env} credentials.` }, { status: 500 });
    }

    const payload = { client_id: clientId, secret, access_token, start_date, end_date };
    if (options) payload.options = options;

    const response = await fetch(plaidUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const text = await response.text();
    let data;
    try { data = JSON.parse(text); } catch { data = text; }

    return NextResponse.json(
      { status: response.status, data },
      { status: response.ok ? 200 : response.status }
    );
  } catch (error) {
    return NextResponse.json({ error: error?.message || "Investments transactions error" }, { status: 500 });
  }
}
