import { NextResponse } from "next/server";
import { resolvePlaidCredentials } from "../../../../../lib/plaid/credentials";

const PLAID_URLS = {
  production: "https://production.plaid.com/signal/return/report",
  sandbox: "https://sandbox.plaid.com/signal/return/report",
};

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      client_transaction_id,
      return_code,
      returned_at,
      environment = "production",
    } = body;

    if (!client_transaction_id || !return_code) {
      return NextResponse.json(
        { error: "client_transaction_id and return_code are required" },
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
      client_transaction_id,
      return_code,
    };

    if (returned_at) payload.returned_at = returned_at;

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
      { error: error?.message || "Signal return report error" },
      { status: 500 }
    );
  }
}
