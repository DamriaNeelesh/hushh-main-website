import { signInWithGoogle } from "../firebase/authService";
import { createWebsiteSession } from "./sessionClient";

export default async function googleSignIn(callback, customRedirectPath) {
  try {
    console.log("Starting Google Sign-In process...");

    let redirectPath = "/";

    if (customRedirectPath) {
      redirectPath = customRedirectPath;
    } else if (typeof window !== "undefined") {
      const currentPath = `${window.location.pathname}${window.location.search}`;

      if (currentPath.includes("/developers/on-boarding")) {
        redirectPath = "/developers/on-boarding";
      } else if (currentPath.includes("/developers/getting-started")) {
        redirectPath = "/developers/getting-started";
      } else if (currentPath.includes("/login")) {
        redirectPath = currentPath;
      } else if (window.location.pathname) {
        redirectPath = currentPath || window.location.pathname;
      }
    }

    const result = await signInWithGoogle();
    await createWebsiteSession(result.idToken);

    if (callback) {
      await callback(result.user);
    }

    return {
      ...result,
      redirectPath,
    };
  } catch (error) {
    console.error("Unexpected error during Google Sign-In:", error);
    throw error;
  }
}
