import { createClient } from "@supabase/supabase-js";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "../../../lib/config/supabaseEnv";

const redirect_urls = {
  development: "http://localhost:3000/developers/on-boarding",
  staging: "https://www.hushh.ai/developers/on-boarding",
  production: "https://www.hushh.ai/developers/on-boarding",
};

const config = {
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  redirect_url: redirect_urls[process.env.NODE_ENV || "development"],
};

function createSupabaseClient() {
  if (!config.SUPABASE_URL || !config.SUPABASE_ANON_KEY) {
    throw new Error(
      "Missing public data Supabase env. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
    );
  }

  const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_ANON_KEY);
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
