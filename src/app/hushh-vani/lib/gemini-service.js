/**
 * Hushh Vani — Content Generation via hushh AI Models
 *
 *  hushh.Kavi  (कवि = The Poet)    → Gemini 2.5 Pro
 *  hushh.Rasa  (रस = The Essence)  → Gemini 3 Pro
 *
 * Users can switch between models for different tiers of creative intelligence.
 */
import { GoogleGenAI } from "@google/genai";
import { HUSHH_MODELS, DEFAULT_CONTENT_MODEL } from "./gcp-client";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

let genAI = null;

function getClient() {
  if (!genAI) {
    genAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
  }
  return genAI;
}

/**
 * Resolve hushh model ID → Gemini model string.
 */
function resolveModel(hushhModelId) {
  const model = HUSHH_MODELS[hushhModelId] || HUSHH_MODELS[DEFAULT_CONTENT_MODEL];
  return model;
}

/**
 * Generate Hinglish marketing content.
 * @param {string} hushhModel - "hushh.Kavi" or "hushh.Rasa"
 */
export async function generateHinglishContent({
  brandName,
  topic,
  targetAudience = "Indian millennials and Gen-Z",
  tone = "friendly, relatable, culturally aware",
  format = "social media post",
  hushhModel = DEFAULT_CONTENT_MODEL,
}) {
  const ai = getClient();
  const modelInfo = resolveModel(hushhModel);

  const prompt = `You are India's top vernacular marketing copywriter. Create ${format} content for the brand "${brandName}" about "${topic}".

Requirements:
- Write in Hinglish (natural mix of Hindi + English as spoken in urban India)
- Target audience: ${targetAudience}
- Tone: ${tone}
- Include relevant Indian cultural references, festivals, or idioms where appropriate
- Make it shareable and engaging for social media
- Add relevant hashtags in both Hindi and English
- Keep it authentic — not forced or cringe

Output format:
1. Main copy (Hinglish)
2. English translation
3. Suggested hashtags
4. Best platform for this content (Instagram/WhatsApp/Twitter/YouTube)
5. Cultural notes (why this resonates with Indian audience)`;

  const response = await ai.models.generateContent({
    model: modelInfo.geminiModel,
    contents: prompt,
  });

  return {
    content: response.text,
    model: modelInfo.displayName,
    geminiModel: modelInfo.geminiModel,
    tier: modelInfo.tier,
    badge: modelInfo.badge,
    brandName,
    topic,
  };
}

/**
 * Culturally adapt existing English content for India.
 */
export async function culturallyAdapt({
  originalText,
  targetRegion = "Pan-India",
  targetLanguage = "Hinglish",
  hushhModel = DEFAULT_CONTENT_MODEL,
}) {
  const ai = getClient();
  const modelInfo = resolveModel(hushhModel);

  const prompt = `You are a cultural localization expert for India. Adapt the following English marketing text for ${targetRegion} audience in ${targetLanguage}.

Original text:
"${originalText}"

Requirements:
- Preserve the core message but make it culturally resonant
- Use local idioms, references, or humor where appropriate
- Consider regional sensitivities and cultural nuances
- If Hinglish: naturally mix Hindi and English as spoken in everyday Indian conversations
- Make it feel like it was originally written for an Indian audience, not translated

Output:
1. Adapted text
2. Key cultural adaptations made (explain each change)
3. Regional relevance score (1-10)
4. Suggested visual elements that would resonate with this audience`;

  const response = await ai.models.generateContent({
    model: modelInfo.geminiModel,
    contents: prompt,
  });

  return {
    adaptedContent: response.text,
    model: modelInfo.displayName,
    geminiModel: modelInfo.geminiModel,
    targetRegion,
    targetLanguage,
  };
}

/**
 * Generate festival-specific campaign content.
 */
export async function generateFestivalCampaign({
  brandName,
  festival,
  productCategory = "general",
  hushhModel = DEFAULT_CONTENT_MODEL,
}) {
  const ai = getClient();
  const modelInfo = resolveModel(hushhModel);

  const prompt = `Create a complete marketing campaign for "${brandName}" (${productCategory}) for the Indian festival "${festival}".

Include:
1. Campaign tagline (Hinglish + English)
2. 3 social media posts (Hinglish, platform-optimized)
3. WhatsApp broadcast message
4. SMS text (under 160 chars, Hinglish)
5. Email subject line options (3)
6. Cultural do's and don'ts for this festival
7. Recommended timing for campaign launch
8. Color palette suggestions that align with the festival`;

  const response = await ai.models.generateContent({
    model: modelInfo.geminiModel,
    contents: prompt,
  });

  return {
    campaign: response.text,
    model: modelInfo.displayName,
    geminiModel: modelInfo.geminiModel,
    brandName,
    festival,
  };
}
