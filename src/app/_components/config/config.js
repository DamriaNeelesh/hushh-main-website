import { createClient } from "@supabase/supabase-js";

const redirect_urls = {
  development: "http://localhost:3000/developer-Api/on-boarding",
  staging: "https://hush1one.com/developer-Api/on-boarding",
  production: "https://hush1one.com/developer-Api/on-boarding",
};

const config = {
  SUPABASE_URL: "https://rpmzykoxqnbozgdoqbpc.supabase.co",
  SUPABASE_ANON_KEY:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwbXp5a294cW5ib3pnZG9xYnBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE5Mjc5NzEsImV4cCI6MjAxNzUwMzk3MX0.3GwG8YQKwZSWfGgTBEEA47YZAZ-Nr4HiirYPWiZtpZ0",
  // supabaseClient: null,
  
  
  guestModeAccessToken:
    "P2H8RNXPvIiPoeM0iJEDjJ2Skk37h5pScMQF5oMRUXm3dKoUC2wxrWImx5ccA9VOrOoeaLcMQqn57vYDPucTkYnkkH6icUQy09vtd5eIrAIXhBtmUfAmPI3thD2OoUeF",
    redirect_url: redirect_urls[process.env.NODE_ENV || 'development'],

};

function createSupabaseClient() {
  const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_ANON_KEY);
  return supabase;
}

config.supabaseClient = createSupabaseClient();

export default config;
