import { createClient } from "@supabase/supabase-js";

const config = {
  SUPABASE_URL: "https://gsqmwxqgqrgzhlhmbscg.supabase.co",
  SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzcW13eHFncXJnemhsaG1ic2NnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg3NTk5ODYsImV4cCI6MjA1NDMzNTk4Nn0.a30I6aLvNNIS6coxJbgTeGBUmKR0NvTkZUDG5uyloFY",
  redirect_url: "https://hushh.ai/",
};

function createSupabaseClient() {
  const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_ANON_KEY, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  });
  return supabase;
}

config.supabaseClient = createSupabaseClient();

export default config; 