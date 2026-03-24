import { createClient } from '@supabase/supabase-js';
import { SUPABASE_AUTH_ANON_KEY, SUPABASE_AUTH_URL } from '../../../lib/config/supabaseAuthEnv';
import { PUBLIC_SITE_URL } from '@/lib/env/public';

const LOCAL_DEV_SITE_URL = "http://localhost:3001";

// Apple Sign-In Configuration for Supabase
const appleAuthConfig = {
  // Supabase Configuration
  SUPABASE_URL: SUPABASE_AUTH_URL,
  SUPABASE_ANON_KEY: SUPABASE_AUTH_ANON_KEY,
  
  // Redirect URLs Configuration
  redirectUrls: {
    development: `${LOCAL_DEV_SITE_URL}/login/callback`,
    staging: `${PUBLIC_SITE_URL}/login/callback`, 
    production: `${PUBLIC_SITE_URL}/login/callback`
  },
  
  // Apple Sign-In Scope Configuration
  scope: "name email",
  
  // Apple Sign-In Response Type
  responseType: "code id_token",
  
  // Response Mode
  responseMode: "form_post"
};

// Initialize Supabase Client for Apple Auth
function createAppleAuthSupabaseClient() {
  return createClient(appleAuthConfig.SUPABASE_URL, appleAuthConfig.SUPABASE_ANON_KEY, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false, // We'll handle this manually for Apple Sign-In
      flowType: 'pkce' // Use PKCE flow for better security
    }
  });
}

// Get Current Environment Redirect URL
function getRedirectUrl() {
  const environment = process.env.NODE_ENV || 'development';
  return appleAuthConfig.redirectUrls[environment] || appleAuthConfig.redirectUrls.development;
}

// Apple Sign-In Nonce Generation (for security)
function generateNonce() {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...array))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

// Hash Nonce for Apple (SHA-256)
async function hashNonce(nonce) {
  const encoder = new TextEncoder();
  const data = encoder.encode(nonce);
  const hash = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hash));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Validate Apple Auth Configuration
function validateAppleAuthConfig() {
  const missing = [];

  if (!appleAuthConfig.SUPABASE_URL) {
    missing.push('NEXT_PUBLIC_SUPABASE_AUTH_URL or NEXT_PUBLIC_SUPABASE_URL');
  }
  if (!appleAuthConfig.SUPABASE_ANON_KEY) {
    missing.push('NEXT_PUBLIC_SUPABASE_AUTH_ANON_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY');
  }
  
  if (missing.length > 0) {
    console.warn('Missing Apple Auth client configuration:', missing);
    return false;
  }
  
  return true;
}

// Apple Sign-In Button Configuration
const appleSignInButtonConfig = {
  color: "black",
  border: false,
  type: "sign-in",
  borderRadius: 15,
  className: "apple-signin-button"
};

export {
  appleAuthConfig,
  createAppleAuthSupabaseClient,
  getRedirectUrl,
  generateNonce,
  hashNonce,
  validateAppleAuthConfig,
  appleSignInButtonConfig
};

export default appleAuthConfig; 
