/**
 * Hushh Vani — Cloud Speech-to-Text V2 (Chirp 2)
 * Premium voice recognition with Indian language + accent support.
 */
import { SpeechClient } from "@google-cloud/speech";
import { GCP_CONFIG } from "./gcp-client";

let client = null;

function getClient() {
  if (!client) {
    client = new SpeechClient();
  }
  return client;
}

// Chirp 2 model — Google's best ASR model
const CHIRP_MODEL = "chirp_2";

// Language codes for Indian languages (BCP-47)
export const SPEECH_LANGUAGES = {
  "hi-IN": "Hindi (India)",
  "en-IN": "English (India)",
  "ta-IN": "Tamil (India)",
  "bn-IN": "Bengali (India)",
  "te-IN": "Telugu (India)",
  "mr-IN": "Marathi (India)",
  "gu-IN": "Gujarati (India)",
  "kn-IN": "Kannada (India)",
  "ml-IN": "Malayalam (India)",
  "pa-IN": "Punjabi (India)",
  "or-IN": "Odia (India)",
  "ur-IN": "Urdu (India)"
};

/**
 * Transcribe audio using Chirp 2 model.
 * @param {Buffer} audioContent - Raw audio bytes
 * @param {string} languageCode - BCP-47 language code (e.g., "hi-IN")
 * @param {string} encoding - Audio encoding (e.g., "WEBM_OPUS", "LINEAR16")
 * @param {number} sampleRateHertz - Sample rate (e.g., 48000)
 */
export async function transcribeAudio(
audioContent,
languageCode = "hi-IN",
_encoding = "WEBM_OPUS",
_sampleRateHertz = 48000)
{
  const speechClient = getClient();
  const recognizer = `projects/${GCP_CONFIG.projectId}/locations/${GCP_CONFIG.location}/recognizers/_`;

  const [response] = await speechClient.recognize({
    recognizer,
    config: {
      autoDecodingConfig: {},
      languageCodes: [languageCode],
      model: CHIRP_MODEL,
      features: {
        enableAutomaticPunctuation: true,
        enableWordTimeOffsets: true,
        enableWordConfidence: true
      }
    },
    content: audioContent.toString("base64")
  });

  const results = response.results || [];
  const transcript = results.
  map((result) => result.alternatives?.[0]?.transcript || "").
  join(" ").
  trim();

  const confidence =
  results.length > 0 ?
  results[0].alternatives?.[0]?.confidence || 0 :
  0;

  const words = results.flatMap(
    (result) => result.alternatives?.[0]?.words || []
  );

  return {
    transcript,
    confidence,
    languageCode,
    languageName: SPEECH_LANGUAGES[languageCode] || languageCode,
    wordCount: words.length,
    words: words.map((w) => ({
      word: w.word,
      confidence: w.confidence,
      startTime: w.startOffset?.seconds || 0,
      endTime: w.endOffset?.seconds || 0
    })),
    model: CHIRP_MODEL
  };
}