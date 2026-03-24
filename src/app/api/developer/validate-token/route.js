import { NextResponse } from "next/server";
import {
  buildDeveloperApiUrl,
  buildForwardHeaders,
  parseUpstreamResponse,
} from "../_lib/upstream";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ error: "Missing token" }, { status: 400 });
    }

    const upstreamResponse = await fetch(buildDeveloperApiUrl("validatetoken", { token }), {
      method: "POST",
      headers: buildForwardHeaders(request),
      cache: "no-store",
    });

    const payload = await parseUpstreamResponse(upstreamResponse);
    return NextResponse.json(payload, { status: upstreamResponse.status });
  } catch (error) {
    return NextResponse.json(
      { error: error?.message || "Failed to validate session token" },
      { status: 500 }
    );
  }
}
