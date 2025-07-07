import config from '../config/config';

export default async function googleSignIn(callback) {
  try {
    console.log('Starting Google Sign-In process...');
    const redirectTo = window.location.origin;
    
    if (!config.supabaseClient) {
      console.error('Supabase client is not initialized');
      return;
    }
    
    const { data, error } = await config.supabaseClient.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo,
      },
    });

    if (error) {
      console.error('Error during Google Sign-In:', error.message);
    } else if (callback) {
      // Execute the callback if provided
      callback();
    }
  } catch (error) {
    console.error('Unexpected error during Google Sign-In:', error);
  }
} 