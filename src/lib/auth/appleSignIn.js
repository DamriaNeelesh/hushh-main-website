import authConfig from "../config/authConfig";

export default async function appleSignIn(callback, customRedirectPath) {
  try {
    console.log("Starting Apple Sign-In process...");

    let redirectPath = "/";

    if (customRedirectPath) {
      redirectPath = customRedirectPath;
    } else if (typeof window !== "undefined") {
      const currentPath = `${window.location.pathname}${window.location.search}`;

      if (currentPath.includes("/developers/login")) {
        redirectPath = currentPath;
      } else if (currentPath.includes("/developers/on-boarding")) {
        redirectPath = "/developers/on-boarding";
      } else if (currentPath.includes("/developers/getting-started")) {
        redirectPath = "/developers/getting-started";
      } else if (currentPath.includes("/login")) {
        redirectPath = currentPath;
      } else if (window.location.pathname) {
        redirectPath = currentPath || window.location.pathname;
      }
    }

    const redirectTo =
      `${window.location.origin}/login/callback?redirect=${encodeURIComponent(redirectPath)}`;
    console.log("Redirecting to:", redirectTo);

    if (!authConfig.supabaseClient) {
      console.error("Supabase client is not initialized");
      return;
    }

    const { error } = await authConfig.supabaseClient.auth.signInWithOAuth({
      provider: "apple",
      options: {
        redirectTo,
        queryParams: {
          response_type: "code",
          response_mode: "query",
          scope: "name email",
        },
      },
    });

    if (error) {
      console.error("Error during Apple Sign-In:", error.message);
    }
  } catch (error) {
    console.error("Unexpected error during Apple Sign-In:", error);
  }
}
