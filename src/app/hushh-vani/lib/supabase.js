import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_AUTH_URL ||
  "https://ibsisfnjxeowvdtvgzff.supabase.co";

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_AUTH_ANON_KEY || "";

/**
 * Hushh Vani Supabase Client
 * Independent client — does NOT depend on any other hushh.ai module.
 * Uses the same Supabase instance but operates on vani_* tables only.
 * Lazy-initialized to prevent build-time crashes when env vars are missing.
 */
let _vaniSupabase = null;
export function getVaniSupabase() {
  if (!_vaniSupabase) {
    const key = supabaseAnonKey || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!key) throw new Error("Missing NEXT_PUBLIC_SUPABASE_AUTH_ANON_KEY");
    _vaniSupabase = createClient(supabaseUrl, key, {
      auth: { persistSession: true, autoRefreshToken: true },
    });
  }
  return _vaniSupabase;
}
// Keep backward-compat export (lazy getter)
export const vaniSupabase = new Proxy({}, {
  get(_, prop) {
    return getVaniSupabase()[prop];
  },
});

// ── Table helpers ──────────────────────────────────────────────
export const TABLES = {
  CAMPAIGNS: "vani_campaigns",
  TRANSLATIONS: "vani_translations",
  ANALYTICS: "vani_analytics",
  INFLUENCERS: "vani_influencers",
  LEADS: "vani_leads",
};

// ── Query helpers ──────────────────────────────────────────────
export async function fetchCampaigns({ limit = 20, offset = 0 } = {}) {
  const { data, error } = await vaniSupabase
    .from(TABLES.CAMPAIGNS)
    .select("*")
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw error;
  return data;
}

export async function fetchTranslations(campaignId) {
  const { data, error } = await vaniSupabase
    .from(TABLES.TRANSLATIONS)
    .select("*")
    .eq("campaign_id", campaignId);

  if (error) throw error;
  return data;
}

export async function createLead(lead) {
  const { data, error } = await vaniSupabase
    .from(TABLES.LEADS)
    .insert([lead])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function trackAnalytics(event) {
  const { error } = await vaniSupabase
    .from(TABLES.ANALYTICS)
    .insert([{ ...event, timestamp: new Date().toISOString() }]);

  if (error) console.error("Analytics tracking failed:", error);
}
