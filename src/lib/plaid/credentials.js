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

const PRODUCTION_ENV = "production";

export const resolvePlaidCredentials = () => {
  const clientId = firstNonEmptyEnv(["PLAID_CLIENT_ID_PRODUCTION", "PLAID_CLIENT_ID", "CLIENT_ID"]);
  const secret = firstNonEmptyEnv(["PLAID_SECRET_PRODUCTION", "PLAID_SECRET", "SECRET"]);

  return {
    env: PRODUCTION_ENV,
    clientId,
    secret,
  };
};
