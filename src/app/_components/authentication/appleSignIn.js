import config from "../config/config";
export default async function appleSignIn() {
  try {
    const redirectTo =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/developer-Api/on-boarding"
        : "https://rpmzykoxqnbozgdoqbpc.supabase.co/auth/v1/callback";

    console.log("Starting Apple Sign-In process...");
    const appleConfig = {
      clientId: process.env.NEXT_PUBLIC_APPLE_CLIENT_ID,
      teamId: process.env.NEXT_PUBLIC_APPLE_TEAM_ID,
      privateKey: process.env.NEXT_PUBLIC_APPLE_PRIVATE_KEY,
      keyId: process.env.NEXT_PUBLIC_APPLE_KEY_ID,
    };

    const { data, error } = await config.supabaseClient.auth.signInWithOAuth({
      provider: "apple",
      options: {
        redirectTo: redirectTo,
        ...appleConfig,
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

