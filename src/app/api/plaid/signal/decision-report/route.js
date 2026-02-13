import { NextResponse } from "next/server";
import { resolvePlaidCredentials } from "../../../../../lib/plaid/credentials";

const PLAID_URLS = {
  production: "https://production.plaid.com/signal/decision/report",
  sandbox: "https://sandbox.plaid.com/signal/decision/report",
};

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      client_transaction_id,
      initiated,
      days_funds_on_hold,
      decision,
      payment_method,
      amount_instantly_available,
      environment = "production",
    } = body;

    if (!client_transaction_id || initiated === undefined) {
      return NextResponse.json(
        { error: "client_transaction_id and initiated are required" },
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
      initiated,
    };

    if (days_funds_on_hold !== undefined) payload.days_funds_on_hold = days_funds_on_hold;
    if (decision) payload.decision = decision;
    if (payment_method) payload.payment_method = payment_method;
    if (amount_instantly_available !== undefined) payload.amount_instantly_available = amount_instantly_available;

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
      { error: error?.message || "Signal decision report error" },
      { status: 500 }
    );
  }
}
