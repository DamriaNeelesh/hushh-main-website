import {
  SUPABASE_AUTH_ANON_KEY as PUBLIC_SUPABASE_AUTH_ANON_KEY,
  SUPABASE_AUTH_URL as PUBLIC_SUPABASE_AUTH_URL,
} from "@/lib/env/public";

const AUTH_PROJECT_URL = "https://ibsisfnjxeowvdtvgzff.supabase.co";

// Auth-only Supabase project configuration.
export const SUPABASE_AUTH_URL = PUBLIC_SUPABASE_AUTH_URL || AUTH_PROJECT_URL;

export const SUPABASE_AUTH_ANON_KEY = PUBLIC_SUPABASE_AUTH_ANON_KEY;
