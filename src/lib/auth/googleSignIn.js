import authConfig from '../config/authConfig';

export default async function googleSignIn(callback, customRedirectPath) {
  try {
    console.log('Starting Google Sign-In process...');
    
    let redirectPath = '/';
    
    if (customRedirectPath) {
      redirectPath = customRedirectPath;
    } else if (typeof window !== 'undefined') {
      const currentPath = `${window.location.pathname}${window.location.search}`;
      
      if (currentPath.includes('/developers/on-boarding')) {
        redirectPath = '/developers/on-boarding';
      } else if (currentPath.includes('/developers/getting-started')) {
        redirectPath = '/developers/getting-started';
      } else if (currentPath.includes('/login')) {
        redirectPath = currentPath;
      } else if (window.location.pathname) {
        redirectPath = currentPath || window.location.pathname;
      }
    }
    
    const redirectTo = window.location.origin + redirectPath;
    console.log('Redirecting to:', redirectTo);
    
    if (!authConfig.supabaseClient) {
      console.error('Supabase client is not initialized');
      return;
    }
    
    const { error } = await authConfig.supabaseClient.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo,
      },
    });

    if (error) {
      console.error('Error during Google Sign-In:', error.message);
    }
    // Note: Callback should not be executed here as the OAuth process redirects the user
    // The success handling should be done after the user returns from Google OAuth
  } catch (error) {
    console.error('Unexpected error during Google Sign-In:', error);
  }
} 
