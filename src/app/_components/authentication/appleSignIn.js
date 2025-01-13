import config from "../config/config";
export default async function appleSignIn() {
  try {
    console.log('Starting Google Sign-In process...');
    const { error } = await config.supabaseClient.auth.signInWithOAuth({
      provider: 'apple',
      options: {
        redirectTo: 'http://localhost:3000/developer-Api/on-boarding',
      },
    });

    if (error) {
      console.error('Error during Google Sign-In:', error.message);
    }
  } catch (error) {
    console.error('Unexpected error during Google Sign-In:', error);
  }
}
