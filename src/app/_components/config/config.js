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
  const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_ANON_KEY);
  return supabase;
}

config.supabaseClient = createSupabaseClient();

export default config;
