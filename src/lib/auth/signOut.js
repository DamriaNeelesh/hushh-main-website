import config from '../config/config';

export default async function signOut() {
  try {
    const { error } = await config.supabaseClient.auth.signOut();
    
    if (error) {
      console.error('Error signing out:', error.message);
      return { error };
    }
    
    return { error: null };
  } catch (error) {
    console.error('Unexpected error during sign out:', error);
    return { error };
  }
} 