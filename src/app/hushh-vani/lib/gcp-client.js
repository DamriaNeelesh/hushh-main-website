/**
 * Hushh Vani — GCP Client Configuration
 * Centralized GCP auth + project config for all AI services.
 *
 * ═══════════════════════════════════════════════════════════
 *  hushh AI Model Registry
 * ═══════════════════════════════════════════════════════════
 *  hushh.Kavi   (कवि = poet)          → Gemini 2.5 Pro — creative content
 *  hushh.Rasa   (रस = essence)         → Gemini 3 Pro  — premium intelligence
 *  hushh.Bhasha (भाषा = language)       → Cloud Translation V3
 *  hushh.Shruti (श्रुति = hearing)       → Chirp 2 Speech-to-Text
 *  hushh.Drishti(दृष्टि = sight)        → Cloud Vision AI
 *  hushh.Bodh   (बोध = understanding)  → Cloud Natural Language V2
 * ═══════════════════════════════════════════════════════════
 */

export const GCP_CONFIG = {
  projectId: process.env.GCP_PROJECT_ID || "hushone-app",
  location: process.env.GCP_LOCATION || "us-central1",
};

// ── hushh AI Model Registry ─────────────────────────────
export const HUSHH_MODELS = {
  "hushh.Kavi": {
    id: "hushh.Kavi",
    geminiModel: "gemini-2.5-pro",
    displayName: "hushh.Kavi",
    hindi: "कवि",
    meaning: "The Poet",
    description: "Creative content generation powered by Gemini 2.5 Pro",
    tier: "pro",
    badge: "🖋️",
  },
  "hushh.Rasa": {
    id: "hushh.Rasa",
    geminiModel: "gemini-3-pro",
    displayName: "hushh.Rasa",
    hindi: "रस",
    meaning: "The Essence",
    description: "Premium creative intelligence powered by Gemini 3 Pro",
    tier: "premium",
    badge: "✨",
  },
  "hushh.Bhasha": {
    id: "hushh.Bhasha",
    displayName: "hushh.Bhasha",
    hindi: "भाषा",
    meaning: "Language",
    description: "Neural translation across 12+ Indian languages",
    service: "Cloud Translation V3",
    badge: "🌐",
  },
  "hushh.Shruti": {
    id: "hushh.Shruti",
    displayName: "hushh.Shruti",
    hindi: "श्रुति",
    meaning: "Hearing",
    description: "Accent-aware voice recognition for Bharat",
    service: "Chirp 2 Speech-to-Text V2",
    badge: "🎙️",
  },
  "hushh.Drishti": {
    id: "hushh.Drishti",
    displayName: "hushh.Drishti",
    hindi: "दृष्टि",
    meaning: "Sight",
    description: "Visual product intelligence & image analysis",
    service: "Cloud Vision AI",
    badge: "👁️",
  },
  "hushh.Bodh": {
    id: "hushh.Bodh",
    displayName: "hushh.Bodh",
    hindi: "बोध",
    meaning: "Understanding",
    description: "Sentiment analysis & content comprehension",
    service: "Cloud Natural Language V2",
    badge: "🧠",
  },
};

// Content generation models (switchable)
export const CONTENT_MODELS = [
  HUSHH_MODELS["hushh.Kavi"],
  HUSHH_MODELS["hushh.Rasa"],
];

export const DEFAULT_CONTENT_MODEL = "hushh.Kavi";

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
