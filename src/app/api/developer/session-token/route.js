import { NextResponse } from "next/server";
import {
  buildDeveloperApiUrl,
  buildForwardHeaders,
  parseUpstreamResponse,
} from "../_lib/upstream";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const { mail, apiKey } = await request.json();

    if (!mail || !apiKey) {
      return NextResponse.json({ error: "Missing mail or apiKey" }, { status: 400 });
    }

    const upstreamResponse = await fetch(
      buildDeveloperApiUrl("sessiontoken", { mail, api_key: apiKey }),
      {
        method: "POST",
        headers: buildForwardHeaders(request),
        cache: "no-store",
      }
    );

    const payload = await parseUpstreamResponse(upstreamResponse);
    return NextResponse.json(payload, { status: upstreamResponse.status });
  } catch (error) {
    return NextResponse.json(
      { error: error?.message || "Failed to generate session token" },
      { status: 500 }
    );
  }
}
