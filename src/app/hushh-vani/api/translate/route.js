import { NextResponse } from "next/server";
import { translateText, translateToMultiple, detectLanguage } from "../../lib/translate-service";
import { INDIAN_LANGUAGE_CODES } from "../../lib/gcp-client";

export async function POST(request) {
  try {
    const body = await request.json();
    const { text, targetLangs, sourceLang = "en", action = "translate" } = body;

    if (!text || text.trim().length === 0) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    if (action === "detect") {
      const result = await detectLanguage(text);
      return NextResponse.json({ success: true, data: result });
    }

    if (action === "multi") {
      const langs = targetLangs || INDIAN_LANGUAGE_CODES.slice(0, 6);
      const results = await translateToMultiple(text, langs, sourceLang);
      return NextResponse.json({ success: true, data: results });
    }

    // Default: single translation
    const targetLang = targetLangs?.[0] || "hi";
    const result = await translateText(text, targetLang, sourceLang);
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Translation API error:", error);
    return NextResponse.json(
      { error: "Translation failed", details: error.message },
      { status: 500 }
    );
  }
}
