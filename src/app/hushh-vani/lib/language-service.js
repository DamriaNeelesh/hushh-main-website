/**
 * Hushh Vani — Cloud Natural Language V2
 * Sentiment analysis, entity extraction, content classification.
 */
import language from "@google-cloud/language";

let client = null;

function getClient() {
  if (!client) {
    client = new language.LanguageServiceClient();
  }
  return client;
}

/**
 * Full analysis: sentiment + entities + syntax + classification.
 */
export async function analyzeText(text) {
  const languageClient = getClient();

  const document = {
    content: text,
    type: "PLAIN_TEXT",
  };

  // Run all analyses in parallel
  const [sentimentResult, entityResult, classificationResult] =
    await Promise.all([
      languageClient.analyzeSentiment({ document }),
      languageClient.analyzeEntities({ document }),
      languageClient.classifyText({ document }).catch(() => [{ categories: [] }]),
    ]);

  const sentiment = sentimentResult[0].documentSentiment;
  const entities = entityResult[0].entities || [];
  const categories = classificationResult[0]?.categories || [];

  return {
    sentiment: {
      score: sentiment.score, // -1 to 1
      magnitude: sentiment.magnitude, // 0 to ∞
      label: getSentimentLabel(sentiment.score),
    },
    entities: entities.slice(0, 15).map((e) => ({
      name: e.name,
      type: e.type,
      salience: e.salience,
      sentiment: e.sentiment
        ? { score: e.sentiment.score, magnitude: e.sentiment.magnitude }
        : null,
    })),
    categories: categories.map((c) => ({
      name: c.name,
      confidence: c.confidence,
    })),
  };
}

/**
 * Quick sentiment check for campaign text.
 */
export async function analyzeSentiment(text) {
  const languageClient = getClient();

  const [result] = await languageClient.analyzeSentiment({
    document: { content: text, type: "PLAIN_TEXT" },
  });

  const sentiment = result.documentSentiment;
  const sentences = (result.sentences || []).map((s) => ({
    text: s.text.content,
    score: s.sentiment.score,
    magnitude: s.sentiment.magnitude,
  }));

  return {
    overall: {
      score: sentiment.score,
      magnitude: sentiment.magnitude,
      label: getSentimentLabel(sentiment.score),
    },
    sentences,
  };
}

function getSentimentLabel(score) {
  if (score >= 0.25) return "positive";
  if (score <= -0.25) return "negative";
  return "neutral";
}
