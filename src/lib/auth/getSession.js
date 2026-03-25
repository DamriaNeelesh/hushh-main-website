import { getWebsiteSession } from "./sessionClient";

export default async function getSession() {
  try {
    const result = await getWebsiteSession();

    if (!result.ok) {
      return {
        data: { session: null, user: null, authenticated: false },
        error: result.error || null,
      };
    }

    return {
      data: {
        session: result.user ? { user: result.user } : null,
        user: result.user || null,
        authenticated: result.authenticated === true,
      },
      error: null,
    };
  } catch (error) {
    console.error("Unexpected error getting session:", error);
    return { data: null, error };
  }
}
