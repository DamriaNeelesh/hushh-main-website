import { createClient } from "@supabase/supabase-js";
import { SUPABASE_AUTH_ANON_KEY, SUPABASE_AUTH_URL } from "./supabaseAuthEnv";

const authConfig = {
  SUPABASE_URL: SUPABASE_AUTH_URL,
  SUPABASE_ANON_KEY: SUPABASE_AUTH_ANON_KEY,
};

function createSupabaseAuthClient() {
  if (!authConfig.SUPABASE_URL || !authConfig.SUPABASE_ANON_KEY) {
    throw new Error(
      "Missing public auth Supabase env. Set NEXT_PUBLIC_SUPABASE_AUTH_URL/NEXT_PUBLIC_SUPABASE_AUTH_ANON_KEY (or NEXT_PUBLIC_SUPABASE_URL/NEXT_PUBLIC_SUPABASE_ANON_KEY)."
    );
  }

  return createClient(authConfig.SUPABASE_URL, authConfig.SUPABASE_ANON_KEY, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  });
}

let authClient;

Object.defineProperty(authConfig, "supabaseClient", {
  enumerable: true,
  get() {
    if (!authClient) {
      authClient = createSupabaseAuthClient();
    }
    return authClient;
  },
});

export default authConfig;
