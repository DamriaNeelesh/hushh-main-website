import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function getContactEndpoint() {
  const baseUrl =
    process.env.HUSHH_API_BASE_URL ||
    process.env.NEXT_PUBLIC_HUSHH_API_BASE_URL ||
    "https://hushh-api-53407187172.us-central1.run.app";

  return `${baseUrl.replace(/\/$/, "")}/send-email`;
}

function normalizePayload(body) {
  return {
    full_name: String(body?.full_name || "").trim(),
    email: String(body?.email || "").trim(),
    company: String(body?.company || "").trim(),
    phone: String(body?.phone || "").trim(),
    subject: String(body?.subject || "General Inquiry").trim(),
    message: String(body?.message || "").trim(),
  };
}

export async function POST(request) {
  try {
    const body = await request.json();
    const payload = normalizePayload(body);

    if (!payload.full_name || !payload.email || !payload.message) {
      return NextResponse.json(
        { error: "full_name, email, and message are required." },
        { status: 400 },
      );
    }

    const formData = new FormData();
    formData.set("full_name", payload.full_name);
    formData.set("email", payload.email);
    formData.set("subject", payload.subject);
    formData.set("message", payload.message);

    if (payload.company) {
      formData.set("company", payload.company);
    }

    if (payload.phone) {
      formData.set("phone", payload.phone);
    }

    const upstreamResponse = await fetch(getContactEndpoint(), {
      method: "POST",
      headers: {
        accept: "application/json",
      },
      body: formData,
      cache: "no-store",
    });

    const contentType = upstreamResponse.headers.get("content-type") || "";
    const upstreamPayload = contentType.includes("application/json")
      ? await upstreamResponse.json().catch(() => ({}))
      : { raw: await upstreamResponse.text().catch(() => "") };

    if (!upstreamResponse.ok) {
      return NextResponse.json(
        {
          error:
            upstreamPayload?.error ||
            upstreamPayload?.detail ||
            upstreamPayload?.message ||
            "Failed to send the contact message.",
        },
        { status: upstreamResponse.status || 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Message sent successfully.",
      upstream: upstreamPayload,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error?.message || "Failed to send the contact message." },
      { status: 500 },
    );
  }
}
