const clean = (value) => (typeof value === "string" ? value.trim() : "");

const firstNonEmpty = (...values) => values.map(clean).find(Boolean) || "";

const normalizeOrigin = (value) => clean(value).replace(/\/$/, "");

export const PUBLIC_SITE_URL = normalizeOrigin(
  firstNonEmpty(process.env.NEXT_PUBLIC_SITE_URL, "https://www.hushh.ai")
);

export const HUSHH_API_BASE_URL = normalizeOrigin(
  firstNonEmpty(
    process.env.NEXT_PUBLIC_HUSHH_API_BASE_URL,
    process.env.HUSHH_API_BASE_URL,
    "https://hushh-api-53407187172.us-central1.run.app"
  )
);

export const HUSHH_API_ANON_KEY = firstNonEmpty(
  process.env.NEXT_PUBLIC_HUSHH_API_ANON_KEY
);

export const SUPABASE_URL = firstNonEmpty(
  process.env.NEXT_PUBLIC_SUPABASE_URL
);

export const SUPABASE_ANON_KEY = firstNonEmpty(
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export const GOOGLE_VERIFICATION = firstNonEmpty(
  process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION
);

export const DEVELOPER_APP_URL = normalizeOrigin(
  firstNonEmpty(process.env.NEXT_PUBLIC_DEVELOPER_APP_URL)
);

export const DEVELOPER_API_URL = normalizeOrigin(
  firstNonEmpty(
    process.env.NEXT_PUBLIC_DEVELOPER_API_URL,
    process.env.NEXT_PUBLIC_BACKEND_URL
  )
);

export const DEVELOPER_MCP_URL = normalizeOrigin(
  firstNonEmpty(process.env.NEXT_PUBLIC_DEVELOPER_MCP_URL)
);
