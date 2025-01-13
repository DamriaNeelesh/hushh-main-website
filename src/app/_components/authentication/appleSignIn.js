import config from "../config/config";
export default async function appleSignIn() {
  try {
    const redirectTo =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/developer-Api/on-boarding"
        : "https://hushh.ai/developer-Api/on-boarding";

    console.log("Starting Apple Sign-In process...");

    const { data, error } = await config.supabaseClient.auth.signInWithOAuth({
      provider: "apple",
      options: {
        redirectTo: redirectTo,
      },
    });

    if (error) {
      console.error("Error during Apple Sign-In:", error.message);
      // Handle the error appropriately
    } else {
      console.log("Apple Sign-In successful:", data);
      // Handle successful sign-in
    }
  } catch (error) {
    console.error("Unexpected error during Apple Sign-In:", error);
    // Handle unexpected errors
  }
}

