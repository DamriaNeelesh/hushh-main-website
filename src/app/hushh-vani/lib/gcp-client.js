/**
 * Hushh Vani — GCP Client Configuration
 * Centralized GCP auth + project config for all AI services.
 */

export const GCP_CONFIG = {
  projectId: process.env.GCP_PROJECT_ID || "hushone-app",
  location: process.env.GCP_LOCATION || "us-central1",
  // For server-side: uses GOOGLE_APPLICATION_CREDENTIALS env var or
  // Application Default Credentials (ADC) when running on GCP
};

export const SUPPORTED_LANGUAGES = {
  hi: "Hindi",
  ta: "Tamil",
  bn: "Bengali",
  te: "Telugu",
  mr: "Marathi",
  gu: "Gujarati",
  kn: "Kannada",
  ml: "Malayalam",
  pa: "Punjabi",
  or: "Odia",
  as: "Assamese",
  ur: "Urdu",
  en: "English",
};

export const INDIAN_LANGUAGE_CODES = Object.keys(SUPPORTED_LANGUAGES).filter(
  (code) => code !== "en"
);
