import { NextResponse } from "next/server";
import { analyzeImage, detectProducts } from "../../lib/vision-service";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const imageFile = formData.get("image");
    const action = formData.get("action") || "analyze";

    if (!imageFile) {
      return NextResponse.json({ error: "Image file is required" }, { status: 400 });
    }

    const imageBuffer = Buffer.from(await imageFile.arrayBuffer());

    let result;
    if (action === "products") {
      result = await detectProducts(imageBuffer);
    } else {
      result = await analyzeImage(imageBuffer);
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Vision API error:", error);
    return NextResponse.json(
      { error: "Image analysis failed", details: error.message },
      { status: 500 }
    );
  }
}
