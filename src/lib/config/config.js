import { createClient } from "@supabase/supabase-js";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "./supabaseEnv";

const config = {
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  // redirect_url: typeof window !== "undefined" ? window.location.origin : "https://hushh.ai/",
};

function createSupabaseClient() {
  if (!config.SUPABASE_URL || !config.SUPABASE_ANON_KEY) {
    throw new Error(
      "Missing public data Supabase env. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
    );
  }

  const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_ANON_KEY, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    } 
  });
  return supabase;
}

let supabaseClient;

Object.defineProperty(config, "supabaseClient", {
  enumerable: true,
  get() {
    if (!supabaseClient) {
      supabaseClient = createSupabaseClient();
    }
    return supabaseClient;
  },
});

export default config;
