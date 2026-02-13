import { NextResponse } from "next/server";
import { resolvePlaidCredentials } from "../../../../../lib/plaid/credentials";

const PLAID_URLS = {
  production: "https://production.plaid.com/signal/evaluate",
  sandbox: "https://sandbox.plaid.com/signal/evaluate",
};

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      access_token,
      account_id,
      client_transaction_id,
      amount,
      client_user_id,
      is_recurring,
      default_payment_method,
      user,
      device,
      ruleset_key,
      environment = "production",
    } = body;

    if (!access_token || !account_id || !client_transaction_id || amount === undefined) {
      return NextResponse.json(
        { error: "access_token, account_id, client_transaction_id, and amount are required" },
        { status: 400 }
      );
    }

    const { env, clientId, secret } = resolvePlaidCredentials(environment);
    const plaidUrl = env === "sandbox" ? PLAID_URLS.sandbox : PLAID_URLS.production;

    if (!clientId || !secret) {
      return NextResponse.json(
        { error: `Missing Plaid ${env} credentials.` },
        { status: 500 }
      );
    }

    const payload = {
      client_id: clientId,
      secret,
      access_token,
      account_id,
      client_transaction_id,
      amount,
    };

    if (client_user_id) payload.client_user_id = client_user_id;
    if (is_recurring !== undefined) payload.is_recurring = is_recurring;
    if (default_payment_method) payload.default_payment_method = default_payment_method;
    if (user) payload.user = user;
    if (device) payload.device = device;
    if (ruleset_key) payload.ruleset_key = ruleset_key;

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
    return NextResponse.json(
      { error: error?.message || "Signal evaluate error" },
      { status: 500 }
    );
  }
}
