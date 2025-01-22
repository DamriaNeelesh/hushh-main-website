import config from "../config/config";

export default async function appleSignIn(setUserEmail) {
  try {
    // const redirectTo =
    //   process.env.NODE_ENV === "development"
    //     ? "https://localhost:3000/auth/v1/callback"
    //     : "https://rpmzykoxqnbozgdoqbpc.supabase.co/auth/v1/callback";
    const redirectTo =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/developer-Api/on-boarding"
      : "https://hushh.ai/developer-Api/on-boarding";

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
      const user = data?.user || (await config.supabaseClient.auth.getUser()).data.user;
      if (user) {
        setUserEmail(user.email); // Capture and set the user's email
      }
      // Handle successful sign-in
    }
  } catch (error) {
    console.error("Unexpected error during Apple Sign-In:", error);
    // Handle unexpected errors
  }
}

