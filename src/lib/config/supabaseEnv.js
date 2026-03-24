import {
  SUPABASE_ANON_KEY as PUBLIC_SUPABASE_ANON_KEY,
  SUPABASE_URL as PUBLIC_SUPABASE_URL,
} from "@/lib/env/public";

const DATA_PROJECT_REF = "hybqqdphqwkuiwfnbljr";
const DATA_PROJECT_URL = `https://${DATA_PROJECT_REF}.supabase.co`;

const resolveSupabaseUrl = () => {
  const envUrl = PUBLIC_SUPABASE_URL;

  if (!envUrl) return DATA_PROJECT_URL;
  if (envUrl.includes(DATA_PROJECT_REF)) return envUrl;

  console.warn(
    `[supabase] Unexpected project URL '${envUrl}'. Falling back to ${DATA_PROJECT_REF}.`
  );
  return DATA_PROJECT_URL;
};

// Prefer runtime env vars but fall back to the data project defaults.
export const SUPABASE_URL = resolveSupabaseUrl();

export const SUPABASE_ANON_KEY = PUBLIC_SUPABASE_ANON_KEY;
