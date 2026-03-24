import { NextResponse } from "next/server";
import {
  buildDeveloperApiUrl,
  buildForwardHeaders,
  parseUpstreamResponse,
} from "../_lib/upstream";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const { mail } = await request.json();

    if (!mail) {
      return NextResponse.json({ error: "Missing mail" }, { status: 400 });
    }

    const upstreamResponse = await fetch(buildDeveloperApiUrl("generateapikey", { mail }), {
      method: "POST",
      headers: buildForwardHeaders(request),
      cache: "no-store",
    });

    const payload = await parseUpstreamResponse(upstreamResponse);
    return NextResponse.json(payload, { status: upstreamResponse.status });
  } catch (error) {
    return NextResponse.json(
      { error: error?.message || "Failed to generate API key" },
      { status: 500 }
    );
  }
}
