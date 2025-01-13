import config from "../config/config";

export default async function appleSignIn() {
  try {
    const redirectURL = process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/developer-Api/on-boarding' // Development URL
      : 'https://hushh.ai/developer-Api/on-boarding'; // Production URL

    console.log('Starting Apple Sign-In process...');
    const { error } = await config.supabaseClient.auth.signInWithOAuth({
      provider: 'apple',
      options: {
        redirectTo: process.env.NODE_ENV === "development"
          ? "http://localhost:3000/developer-Api/on-boarding" // Development URI
          : "https://hushh.ai/developer-Api/on-boarding", // Production URI
        clientId: process.env.APPLE_CLIENT_ID, 
        // redirectURI:'http://localhost:3000/developer-Api/on-boarding',
        clientSecret: process.env.APPLE_CLIENT_SECRET,
      },
    });

    if (error) {
      console.error('Error during Apple Sign-In:', error.message);
    }
  } catch (error) {
    console.error('Unexpected error during Apple Sign-In:', error);
  }
}
