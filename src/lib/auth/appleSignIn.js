import { signInWithApple } from "../firebase/authService";
import { createWebsiteSession } from "./sessionClient";

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

    const result = await signInWithApple();
    await createWebsiteSession(result.idToken);

    if (callback) {
      await callback(result.user);
    }

    return {
      ...result,
      redirectPath,
    };
  } catch (error) {
    console.error("Unexpected error during Apple Sign-In:", error);
    throw error;
  }
}
