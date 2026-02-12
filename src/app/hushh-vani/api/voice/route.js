import { NextResponse } from "next/server";
import { transcribeAudio, SPEECH_LANGUAGES } from "../../lib/speech-service";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const audioFile = formData.get("audio");
    const languageCode = formData.get("language") || "hi-IN";

    if (!audioFile) {
      return NextResponse.json({ error: "Audio file is required" }, { status: 400 });
    }

    const audioBuffer = Buffer.from(await audioFile.arrayBuffer());
    const result = await transcribeAudio(audioBuffer, languageCode);

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Voice API error:", error);
    return NextResponse.json(
      { error: "Speech recognition failed", details: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    data: { supportedLanguages: SPEECH_LANGUAGES },
  });
}
