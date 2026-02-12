const cleanValue = (value) => (typeof value === "string" ? value.trim() : "");

const firstNonEmptyEnv = (keys) => {
  for (const key of keys) {
    const value = cleanValue(process.env[key]);
    if (value) {
      return value;
    }
  }
  return "";
};

const ALLOWED_ENVS = new Set(["production", "sandbox"]);

const normalizeEnv = (env) => {
  const requested = cleanValue(env).toLowerCase();
  if (ALLOWED_ENVS.has(requested)) {
    return requested;
  }
  return "production";
};

export const resolvePlaidCredentials = (env = "production") => {
  const normalizedEnv = normalizeEnv(env);
  const isProduction = normalizedEnv === "production";

  const clientId = isProduction
    ? firstNonEmptyEnv([
        "PLAID_CLIENT_ID_PRODUCTION",
        "PLAID_CLIENT_ID",
        "CLIENT_ID",
      ])
    : firstNonEmptyEnv([
        "PLAID_CLIENT_ID_SANDBOX",
        "PLAID_CLIENT_ID",
        "CLIENT_ID",
      ]);

  const secret = isProduction
    ? firstNonEmptyEnv(["PLAID_SECRET_PRODUCTION", "PLAID_SECRET", "SECRET"])
    : firstNonEmptyEnv(["PLAID_SECRET_SANDBOX", "PLAID_SECRET", "SECRET"]);

  return {
    env: normalizedEnv,
    clientId,
    secret,
  };
};
