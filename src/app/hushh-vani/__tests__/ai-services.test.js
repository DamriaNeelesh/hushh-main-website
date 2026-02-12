/**
 * Hushh Vani — GCP AI Service Tests
 * Mocks all GCP client libraries; tests service logic and data shaping.
 */

// ── Mock GCP Clients ────────────────────────────────────────

// Cloud Translation V3
jest.mock("@google-cloud/translate", () => ({
  TranslationServiceClient: jest.fn().mockImplementation(() => ({
    translateText: jest.fn().mockResolvedValue([
      {
        translations: [
          { translatedText: "नमस्ते दुनिया", detectedLanguageCode: "en" },
        ],
      },
    ]),
    detectLanguage: jest.fn().mockResolvedValue([
      {
        languages: [{ languageCode: "hi", confidence: 0.98 }],
      },
    ]),
  })),
}));

// Gemini GenAI
jest.mock("@google/genai", () => ({
  GoogleGenAI: jest.fn().mockImplementation(() => ({
    models: {
      generateContent: jest.fn().mockResolvedValue({
        text: "Yeh toh bahut accha deal hai! 🎉 #DiwaliSale #ShoppingKaMauka",
      }),
    },
  })),
}));

// Cloud Speech-to-Text V2
jest.mock("@google-cloud/speech", () => ({
  SpeechClient: jest.fn().mockImplementation(() => ({
    recognize: jest.fn().mockResolvedValue([
      {
        results: [
          {
            alternatives: [
              {
                transcript: "मुझे एक नया फोन चाहिए",
                confidence: 0.95,
                words: [
                  { word: "मुझे", confidence: 0.96, startOffset: { seconds: 0 }, endOffset: { seconds: 1 } },
                  { word: "एक", confidence: 0.94, startOffset: { seconds: 1 }, endOffset: { seconds: 2 } },
                  { word: "नया", confidence: 0.97, startOffset: { seconds: 2 }, endOffset: { seconds: 3 } },
                  { word: "फोन", confidence: 0.95, startOffset: { seconds: 3 }, endOffset: { seconds: 4 } },
                  { word: "चाहिए", confidence: 0.93, startOffset: { seconds: 4 }, endOffset: { seconds: 5 } },
                ],
              },
            ],
          },
        ],
      },
    ]),
  })),
}));

// Cloud Vision AI
jest.mock("@google-cloud/vision", () => {
  return {
    __esModule: true,
    default: {
      ImageAnnotatorClient: jest.fn().mockImplementation(() => ({
        annotateImage: jest.fn().mockResolvedValue([
          {
            labelAnnotations: [
              { description: "Smartphone", score: 0.95, topicality: 0.9 },
              { description: "Electronics", score: 0.88, topicality: 0.85 },
            ],
            localizedObjectAnnotations: [
              {
                name: "Phone",
                score: 0.92,
                boundingPoly: {
                  normalizedVertices: [
                    { x: 0.1, y: 0.1 },
                    { x: 0.9, y: 0.9 },
                  ],
                },
              },
            ],
            fullTextAnnotation: { text: "Samsung Galaxy S24" },
            imagePropertiesAnnotation: {
              dominantColors: {
                colors: [
                  { color: { red: 0, green: 0, blue: 0 }, score: 0.5, pixelFraction: 0.4 },
                  { color: { red: 255, green: 255, blue: 255 }, score: 0.3, pixelFraction: 0.3 },
                ],
              },
            },
            webDetection: {
              webEntities: [
                { description: "Samsung Galaxy", score: 0.9 },
              ],
            },
            safeSearchAnnotation: {
              adult: "VERY_UNLIKELY",
              violence: "VERY_UNLIKELY",
            },
          },
        ]),
      })),
    },
  };
});

// Cloud Natural Language V2
jest.mock("@google-cloud/language", () => {
  return {
    __esModule: true,
    default: {
      LanguageServiceClient: jest.fn().mockImplementation(() => ({
        analyzeSentiment: jest.fn().mockResolvedValue([
          {
            documentSentiment: { score: 0.8, magnitude: 1.5 },
            sentences: [
              {
                text: { content: "This product is amazing!" },
                sentiment: { score: 0.9, magnitude: 0.9 },
              },
            ],
          },
        ]),
        analyzeEntities: jest.fn().mockResolvedValue([
          {
            entities: [
              {
                name: "Diwali",
                type: "EVENT",
                salience: 0.8,
                sentiment: { score: 0.7, magnitude: 0.5 },
              },
            ],
          },
        ]),
        classifyText: jest.fn().mockResolvedValue([
          {
            categories: [
              { name: "/Shopping/Deals", confidence: 0.85 },
            ],
          },
        ]),
      })),
    },
  };
});

// ── Import services AFTER mocks ─────────────────────────────
const { GCP_CONFIG, SUPPORTED_LANGUAGES, INDIAN_LANGUAGE_CODES, HUSHH_MODELS, CONTENT_MODELS, DEFAULT_CONTENT_MODEL } = require("../lib/gcp-client");
const { translateText, translateToMultiple, detectLanguage } = require("../lib/translate-service");
const { generateHinglishContent, culturallyAdapt, generateFestivalCampaign } = require("../lib/gemini-service");
const { transcribeAudio, SPEECH_LANGUAGES } = require("../lib/speech-service");
const { analyzeImage, detectProducts } = require("../lib/vision-service");
const { analyzeText, analyzeSentiment } = require("../lib/language-service");

// ═══════════════════════════════════════════════════════════════
// GCP Client Config
// ═══════════════════════════════════════════════════════════════
describe("GCP Client Config", () => {
  it("exports GCP_CONFIG with projectId and location", () => {
    expect(GCP_CONFIG).toBeDefined();
    expect(GCP_CONFIG.projectId).toBe("hushone-app");
    expect(GCP_CONFIG.location).toBe("us-central1");
  });

  it("exports SUPPORTED_LANGUAGES with 13 entries", () => {
    expect(Object.keys(SUPPORTED_LANGUAGES).length).toBe(13);
    expect(SUPPORTED_LANGUAGES.hi).toBe("Hindi");
    expect(SUPPORTED_LANGUAGES.en).toBe("English");
    expect(SUPPORTED_LANGUAGES.ta).toBe("Tamil");
    expect(SUPPORTED_LANGUAGES.bn).toBe("Bengali");
  });

  it("exports INDIAN_LANGUAGE_CODES excluding English", () => {
    expect(INDIAN_LANGUAGE_CODES).not.toContain("en");
    expect(INDIAN_LANGUAGE_CODES.length).toBe(12);
    expect(INDIAN_LANGUAGE_CODES).toContain("hi");
    expect(INDIAN_LANGUAGE_CODES).toContain("ta");
  });

  it("exports HUSHH_MODELS registry with 6 models", () => {
    expect(Object.keys(HUSHH_MODELS).length).toBe(6);
    expect(HUSHH_MODELS["hushh.Kavi"]).toBeDefined();
    expect(HUSHH_MODELS["hushh.Rasa"]).toBeDefined();
    expect(HUSHH_MODELS["hushh.Bhasha"]).toBeDefined();
    expect(HUSHH_MODELS["hushh.Shruti"]).toBeDefined();
    expect(HUSHH_MODELS["hushh.Drishti"]).toBeDefined();
    expect(HUSHH_MODELS["hushh.Bodh"]).toBeDefined();
  });

  it("HUSHH_MODELS content models have geminiModel strings", () => {
    expect(HUSHH_MODELS["hushh.Kavi"].geminiModel).toBe("gemini-2.5-pro");
    expect(HUSHH_MODELS["hushh.Rasa"].geminiModel).toBe("gemini-3-pro");
  });

  it("exports CONTENT_MODELS with 2 switchable models", () => {
    expect(CONTENT_MODELS).toHaveLength(2);
    expect(CONTENT_MODELS[0].id).toBe("hushh.Kavi");
    expect(CONTENT_MODELS[1].id).toBe("hushh.Rasa");
  });

  it("exports DEFAULT_CONTENT_MODEL as hushh.Kavi", () => {
    expect(DEFAULT_CONTENT_MODEL).toBe("hushh.Kavi");
  });
});

// ═══════════════════════════════════════════════════════════════
// Translation Service
// ═══════════════════════════════════════════════════════════════
describe("Translate Service", () => {
  it("translateText returns translated text with metadata", async () => {
    const result = await translateText("Hello world", "hi", "en");
    expect(result).toEqual({
      translatedText: "नमस्ते दुनिया",
      detectedSourceLanguage: "en",
      targetLanguage: "hi",
      targetLanguageName: "Hindi",
    });
  });

  it("translateToMultiple returns array of translations", async () => {
    const results = await translateToMultiple("Hello", ["hi", "ta", "bn"]);
    expect(results).toHaveLength(3);
    results.forEach((r) => {
      expect(r).toHaveProperty("translatedText");
      expect(r).toHaveProperty("targetLanguage");
      expect(r).toHaveProperty("targetLanguageName");
    });
  });

  it("detectLanguage returns detected language with confidence", async () => {
    const result = await detectLanguage("नमस्ते");
    expect(result).toEqual({
      languageCode: "hi",
      languageName: "Hindi",
      confidence: 0.98,
    });
  });
});

// ═══════════════════════════════════════════════════════════════
// Gemini Service
// ═══════════════════════════════════════════════════════════════
describe("Gemini Service", () => {
  it("generateHinglishContent returns content with hushh model info", async () => {
    const result = await generateHinglishContent({
      brandName: "Zomato",
      topic: "Diwali sale",
      tone: "friendly",
      format: "social media post",
    });
    expect(result).toHaveProperty("content");
    expect(result.content).toContain("deal");
    expect(result.model).toBe("hushh.Kavi");
    expect(result.geminiModel).toBe("gemini-2.5-pro");
    expect(result.tier).toBe("pro");
    expect(result.badge).toBe("🖋️");
    expect(result.brandName).toBe("Zomato");
    expect(result.topic).toBe("Diwali sale");
  });

  it("culturallyAdapt returns adapted content with hushh model", async () => {
    const result = await culturallyAdapt({
      originalText: "Big holiday sale starting now!",
      targetRegion: "North India",
      targetLanguage: "Hinglish",
    });
    expect(result).toHaveProperty("adaptedContent");
    expect(result.model).toBe("hushh.Kavi");
    expect(result.geminiModel).toBe("gemini-2.5-pro");
    expect(result.targetRegion).toBe("North India");
    expect(result.targetLanguage).toBe("Hinglish");
  });

  it("generateFestivalCampaign returns campaign with hushh model", async () => {
    const result = await generateFestivalCampaign({
      brandName: "Flipkart",
      festival: "Diwali",
      productCategory: "electronics",
    });
    expect(result).toHaveProperty("campaign");
    expect(result.model).toBe("hushh.Kavi");
    expect(result.geminiModel).toBe("gemini-2.5-pro");
    expect(result.brandName).toBe("Flipkart");
    expect(result.festival).toBe("Diwali");
  });
});

// ═══════════════════════════════════════════════════════════════
// Speech Service
// ═══════════════════════════════════════════════════════════════
describe("Speech Service", () => {
  it("exports SPEECH_LANGUAGES with Indian language codes", () => {
    expect(SPEECH_LANGUAGES["hi-IN"]).toBe("Hindi (India)");
    expect(SPEECH_LANGUAGES["en-IN"]).toBe("English (India)");
    expect(SPEECH_LANGUAGES["ta-IN"]).toBe("Tamil (India)");
    expect(Object.keys(SPEECH_LANGUAGES).length).toBe(12);
  });

  it("transcribeAudio returns transcript with confidence", async () => {
    const fakeAudio = Buffer.from("fake-audio-data");
    const result = await transcribeAudio(fakeAudio, "hi-IN");
    expect(result.transcript).toBe("मुझे एक नया फोन चाहिए");
    expect(result.confidence).toBe(0.95);
    expect(result.languageCode).toBe("hi-IN");
    expect(result.languageName).toBe("Hindi (India)");
    expect(result.wordCount).toBe(5);
    expect(result.model).toBe("chirp_2");
  });

  it("transcribeAudio returns word-level details", async () => {
    const fakeAudio = Buffer.from("fake-audio-data");
    const result = await transcribeAudio(fakeAudio, "hi-IN");
    expect(result.words).toHaveLength(5);
    result.words.forEach((w) => {
      expect(w).toHaveProperty("word");
      expect(w).toHaveProperty("confidence");
      expect(w).toHaveProperty("startTime");
      expect(w).toHaveProperty("endTime");
    });
  });
});

// ═══════════════════════════════════════════════════════════════
// Vision Service
// ═══════════════════════════════════════════════════════════════
describe("Vision Service", () => {
  it("analyzeImage returns structured analysis", async () => {
    const fakeImage = Buffer.from("fake-image-data");
    const result = await analyzeImage(fakeImage);

    expect(result.labels).toHaveLength(2);
    expect(result.labels[0].description).toBe("Smartphone");
    expect(result.labels[0].score).toBe(0.95);

    expect(result.objects).toHaveLength(1);
    expect(result.objects[0].name).toBe("Phone");

    expect(result.text).toBe("Samsung Galaxy S24");

    expect(result.colors).toHaveLength(2);
    expect(result.colors[0]).toHaveProperty("red");
    expect(result.colors[0]).toHaveProperty("green");
    expect(result.colors[0]).toHaveProperty("blue");

    expect(result.webEntities).toHaveLength(1);
    expect(result.webEntities[0].description).toBe("Samsung Galaxy");

    expect(result.safeSearch).toHaveProperty("adult");
  });

  it("detectProducts filters by confidence thresholds", async () => {
    const fakeImage = Buffer.from("fake-image-data");
    const result = await detectProducts(fakeImage);

    expect(result).toHaveProperty("products");
    expect(result).toHaveProperty("categories");
    expect(result).toHaveProperty("dominantColors");
    expect(result).toHaveProperty("suggestedSearchTerms");
    expect(result.categories).toContain("Smartphone");
  });
});

// ═══════════════════════════════════════════════════════════════
// Language Service
// ═══════════════════════════════════════════════════════════════
describe("Language Service", () => {
  it("analyzeText returns sentiment, entities, and categories", async () => {
    const result = await analyzeText("This Diwali sale is amazing!");

    expect(result.sentiment).toEqual({
      score: 0.8,
      magnitude: 1.5,
      label: "positive",
    });

    expect(result.entities).toHaveLength(1);
    expect(result.entities[0].name).toBe("Diwali");
    expect(result.entities[0].type).toBe("EVENT");

    expect(result.categories).toHaveLength(1);
    expect(result.categories[0].name).toBe("/Shopping/Deals");
  });

  it("analyzeSentiment returns overall and sentence-level scores", async () => {
    const result = await analyzeSentiment("This product is amazing!");

    expect(result.overall).toEqual({
      score: 0.8,
      magnitude: 1.5,
      label: "positive",
    });

    expect(result.sentences).toHaveLength(1);
    expect(result.sentences[0].text).toBe("This product is amazing!");
    expect(result.sentences[0].score).toBe(0.9);
  });

  it("correctly labels sentiment as positive/negative/neutral", async () => {
    // The mock always returns 0.8, which is > 0.25, so "positive"
    const result = await analyzeSentiment("Test text");
    expect(result.overall.label).toBe("positive");
  });
});
