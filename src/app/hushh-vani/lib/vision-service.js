/**
 * Hushh Vani — Cloud Vision AI
 * Enterprise-grade image analysis for visual product search.
 */
import vision from "@google-cloud/vision";

let client = null;

function getClient() {
  if (!client) {
    client = new vision.ImageAnnotatorClient();
  }
  return client;
}

/**
 * Analyze an image — labels, objects, text, web entities, colors.
 * @param {Buffer|string} image - Image buffer or base64 string
 */
export async function analyzeImage(image) {
  const visionClient = getClient();

  const imageContent =
    typeof image === "string" ? image : image.toString("base64");

  const request = {
    image: { content: imageContent },
    features: [
      { type: "LABEL_DETECTION", maxResults: 15 },
      { type: "OBJECT_LOCALIZATION", maxResults: 10 },
      { type: "TEXT_DETECTION" },
      { type: "IMAGE_PROPERTIES" },
      { type: "WEB_DETECTION", maxResults: 10 },
      { type: "SAFE_SEARCH_DETECTION" },
    ],
  };

  const [result] = await visionClient.annotateImage(request);

  return {
    labels: (result.labelAnnotations || []).map((l) => ({
      description: l.description,
      score: l.score,
      topicality: l.topicality,
    })),
    objects: (result.localizedObjectAnnotations || []).map((o) => ({
      name: o.name,
      score: o.score,
      boundingBox: o.boundingPoly?.normalizedVertices || [],
    })),
    text: result.fullTextAnnotation?.text || null,
    colors: (
      result.imagePropertiesAnnotation?.dominantColors?.colors || []
    )
      .slice(0, 5)
      .map((c) => ({
        red: Math.round(c.color.red || 0),
        green: Math.round(c.color.green || 0),
        blue: Math.round(c.color.blue || 0),
        score: c.score,
        pixelFraction: c.pixelFraction,
      })),
    webEntities: (result.webDetection?.webEntities || [])
      .slice(0, 10)
      .map((e) => ({
        description: e.description,
        score: e.score,
      })),
    safeSearch: result.safeSearchAnnotation || {},
  };
}

/**
 * Detect products in an image for visual commerce.
 */
export async function detectProducts(image) {
  const analysis = await analyzeImage(image);

  // Filter for product-relevant labels and objects
  const productLabels = analysis.labels.filter((l) => l.score > 0.7);
  const productObjects = analysis.objects.filter((o) => o.score > 0.5);

  return {
    products: productObjects,
    categories: productLabels.map((l) => l.description),
    dominantColors: analysis.colors,
    suggestedSearchTerms: analysis.webEntities
      .filter((e) => e.description)
      .map((e) => e.description),
  };
}
