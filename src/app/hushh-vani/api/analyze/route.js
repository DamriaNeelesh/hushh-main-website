import { NextResponse } from "next/server";
import { analyzeText, analyzeSentiment } from "../../lib/language-service";

export async function POST(request) {
  try {
    const body = await request.json();
    const { text, action = "full" } = body;

    if (!text || text.trim().length === 0) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    let result;
    if (action === "sentiment") {
      result = await analyzeSentiment(text);
    } else {
      result = await analyzeText(text);
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Analyze API error:", error);
    return NextResponse.json(
      { error: "Text analysis failed", details: error.message },
      { status: 500 }
    );
  }
}
