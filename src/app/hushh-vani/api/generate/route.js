import { NextResponse } from "next/server";
import {
  generateHinglishContent,
  culturallyAdapt,
  generateFestivalCampaign,
} from "../../lib/gemini-service";

export async function POST(request) {
  try {
    const body = await request.json();
    const { action = "hinglish", ...params } = body;

    if (action === "hinglish") {
      if (!params.brandName || !params.topic) {
        return NextResponse.json(
          { error: "brandName and topic are required" },
          { status: 400 }
        );
      }
      const result = await generateHinglishContent({
        ...params,
        hushhModel: params.hushhModel || "hushh.Kavi",
      });
      return NextResponse.json({ success: true, data: result });
    }

    if (action === "adapt") {
      if (!params.originalText) {
        return NextResponse.json(
          { error: "originalText is required" },
          { status: 400 }
        );
      }
      const result = await culturallyAdapt(params);
      return NextResponse.json({ success: true, data: result });
    }

    if (action === "festival") {
      if (!params.brandName || !params.festival) {
        return NextResponse.json(
          { error: "brandName and festival are required" },
          { status: 400 }
        );
      }
      const result = await generateFestivalCampaign(params);
      return NextResponse.json({ success: true, data: result });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Generate API error:", error);
    return NextResponse.json(
      { error: "Content generation failed", details: error.message },
      { status: 500 }
    );
  }
}
