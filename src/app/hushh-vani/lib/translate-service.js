/**
 * Hushh Vani — Cloud Translation V3 (Advanced)
 * Neural Machine Translation for 22+ Indian languages.
 */
import { TranslationServiceClient } from "@google-cloud/translate";
import { GCP_CONFIG, SUPPORTED_LANGUAGES } from "./gcp-client";

let client = null;

function getClient() {
  if (!client) {
    client = new TranslationServiceClient();
  }
  return client;
}

/**
 * Translate text to a single target language.
 */
export async function translateText(text, targetLang, sourceLang = "en") {
  const translationClient = getClient();
  const parent = `projects/${GCP_CONFIG.projectId}/locations/${GCP_CONFIG.location}`;

  const [response] = await translationClient.translateText({
    parent,
    contents: [text],
    mimeType: "text/plain",
    sourceLanguageCode: sourceLang,
    targetLanguageCode: targetLang,
  });

  return {
    translatedText: response.translations[0].translatedText,
    detectedSourceLanguage:
      response.translations[0].detectedLanguageCode || sourceLang,
    targetLanguage: targetLang,
    targetLanguageName: SUPPORTED_LANGUAGES[targetLang] || targetLang,
  };
}

/**
 * Translate text to multiple Indian languages at once.
 */
export async function translateToMultiple(text, targetLangs, sourceLang = "en") {
  const results = await Promise.all(
    targetLangs.map((lang) => translateText(text, lang, sourceLang))
  );
  return results;
}

/**
 * Detect the language of input text.
 */
export async function detectLanguage(text) {
  const translationClient = getClient();
  const parent = `projects/${GCP_CONFIG.projectId}/locations/${GCP_CONFIG.location}`;

  const [response] = await translationClient.detectLanguage({
    parent,
    content: text,
    mimeType: "text/plain",
  });

  const detected = response.languages[0];
  return {
    languageCode: detected.languageCode,
    languageName:
      SUPPORTED_LANGUAGES[detected.languageCode] || detected.languageCode,
    confidence: detected.confidence,
  };
}
