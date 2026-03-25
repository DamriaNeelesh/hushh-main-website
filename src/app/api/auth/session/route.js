import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  createSessionCookie,
  verifyIdToken,
  verifySessionCookie,
} from "@/lib/firebase/admin";
import { SUPABASE_URL } from "@/lib/config/supabaseEnv";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const SESSION_COOKIE_NAME = "hushh_session";
const SESSION_DURATION_MS = 5 * 24 * 60 * 60 * 1000;

function getSupabaseAdminClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey || !SUPABASE_URL) {
    return null;
  }

  return createClient(SUPABASE_URL, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

function buildPublicUser(decodedClaims) {
  const uid = decodedClaims?.uid || null;
  return {
    uid,
    id: uid,
    email: decodedClaims?.email || null,
    displayName: decodedClaims?.name || null,
    photoURL: decodedClaims?.picture || null,
    emailVerified: decodedClaims?.email_verified === true,
    providerId: decodedClaims?.firebase?.sign_in_provider || null,
    access_token: null,
  };
}

async function reconcileProfileRows(decodedClaims) {
  const email = decodedClaims?.email?.trim();
  const uid = decodedClaims?.uid;
  if (!email || !uid || decodedClaims?.email_verified !== true) {
    return;
  }

  const supabase = getSupabaseAdminClient();
  if (!supabase) return;

  try {
    const { data: byUid } = await supabase
      .from("user_profiles")
      .select("user_id")
      .eq("user_id", uid)
      .maybeSingle();

    if (!byUid) {
      const { data: legacyRow } = await supabase
        .from("user_profiles")
        .select("user_id")
        .eq("email", email)
        .neq("user_id", uid)
        .limit(1)
        .maybeSingle();

      if (legacyRow?.user_id) {
        await supabase
          .from("user_profiles")
          .update({ user_id: uid })
          .eq("user_id", legacyRow.user_id);
      }
    }

    await supabase
      .from("dev_api_userprofile")
      .update({ user_id: uid })
      .eq("mail", email)
      .neq("user_id", uid);
  } catch (error) {
    console.warn("Auth reconciliation failed:", error);
  }
}

function setSessionCookie(response, sessionCookie) {
  response.cookies.set(SESSION_COOKIE_NAME, sessionCookie, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION_MS / 1000,
  });
}

function clearSessionCookie(response) {
  response.cookies.set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export async function POST(request) {
  try {
    const { idToken } = await request.json();

    if (!idToken) {
      return NextResponse.json({ error: "ID token is required" }, { status: 400 });
    }

    const verification = await verifyIdToken(idToken);
    if (!verification.valid || !verification.decodedToken) {
      return NextResponse.json({ error: "Invalid Firebase ID token" }, { status: 401 });
    }

    const { success, sessionCookie } = await createSessionCookie(idToken, SESSION_DURATION_MS);
    if (!success || !sessionCookie) {
      return NextResponse.json({ error: "Failed to create session" }, { status: 401 });
    }

    await reconcileProfileRows(verification.decodedToken);

    const response = NextResponse.json({
      authenticated: true,
      user: buildPublicUser(verification.decodedToken),
    });

    setSessionCookie(response, sessionCookie);
    return response;
  } catch (error) {
    console.error("[Auth Session] POST failed:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    if (!sessionCookie) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const verification = await verifySessionCookie(sessionCookie);
    if (!verification.valid || !verification.decodedClaims) {
      const response = NextResponse.json({ authenticated: false }, { status: 401 });
      clearSessionCookie(response);
      return response;
    }

    return NextResponse.json({
      authenticated: true,
      user: buildPublicUser(verification.decodedClaims),
    });
  } catch (error) {
    console.error("[Auth Session] GET failed:", error);
    return NextResponse.json({ authenticated: false, error: "Verification failed" }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const response = NextResponse.json({
      authenticated: false,
      success: true,
    });

    clearSessionCookie(response);
    return response;
  } catch (error) {
    console.error("[Auth Session] DELETE failed:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
