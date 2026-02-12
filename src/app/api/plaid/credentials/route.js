import { NextResponse } from "next/server";
import { resolvePlaidCredentials } from "../../../../lib/plaid/credentials";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const requestedEnv = searchParams.get("env") || "production";
  const { env, clientId, secret } = resolvePlaidCredentials(requestedEnv);
  const productionCredentials = resolvePlaidCredentials("production");
  const sandboxCredentials = resolvePlaidCredentials("sandbox");

  const configured = Boolean(clientId && secret);

  return NextResponse.json(
    {
      environment: env,
      configured,
      client_id_last4: clientId ? clientId.slice(-4) : null,
      available_environments: {
        production: Boolean(
          productionCredentials.clientId && productionCredentials.secret,
        ),
        sandbox: Boolean(
          sandboxCredentials.clientId && sandboxCredentials.secret,
        ),
      },
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
