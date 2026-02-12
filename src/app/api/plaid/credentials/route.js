import { NextResponse } from "next/server";
import { resolvePlaidCredentials } from "../../../../lib/plaid/credentials";

export async function GET() {
  const { env, clientId, secret } = resolvePlaidCredentials();

  const configured = Boolean(clientId && secret);

  return NextResponse.json(
    {
      environment: env,
      configured,
      client_id_last4: clientId ? clientId.slice(-4) : null,
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}
