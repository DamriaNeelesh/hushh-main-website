import { NextResponse } from "next/server";
import { resolvePlaidCredentials } from "../../../../lib/plaid/credentials";

const PLAID_ACCOUNTS_URL = "https://production.plaid.com/accounts/get";

export async function POST(request) {
  try {
    const { access_token: accessToken } = await request.json();

    if (!accessToken) {
      return NextResponse.json({ error: "access_token is required" }, { status: 400 });
    }

    const { clientId, secret } = resolvePlaidCredentials();

    if (!clientId || !secret) {
      return NextResponse.json(
        {
          error:
            "Missing Plaid production credentials. Set PLAID_CLIENT_ID_PRODUCTION and PLAID_SECRET_PRODUCTION (or PLAID_CLIENT_ID/PLAID_SECRET).",
        },
        { status: 500 }
      );
    }

    const response = await fetch(PLAID_ACCOUNTS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: clientId,
        secret,
        access_token: accessToken,
      }),
    });

    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (error) {
      data = text;
    }

    return NextResponse.json(
      { status: response.status, data },
      { status: response.ok ? 200 : response.status }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error?.message || "Accounts proxy error" },
      { status: 500 }
    );
  }
}
