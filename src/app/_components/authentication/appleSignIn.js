import config from "../config/config";

export default async function appleSignIn() {
  try {
    const redirectTo =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/developer-Api/on-boarding"
        : "https://hushh.ai/developer-Api/on-boarding";

    console.log("Starting Apple Sign-In process...");

    const { error } = await config.supabaseClient.auth.signInWithOAuth({
      provider: "apple",
      options: {
        redirectTo: redirectTo, // This is your app's redirect URL
      },
    });

    if (error) {
      console.error("Error during Apple Sign-In:", error.message);
    }
  } catch (error) {
    console.error("Unexpected error during Apple Sign-In:", error);
  }
}
