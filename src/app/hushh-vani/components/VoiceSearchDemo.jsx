"use client";

import { useState, useRef } from "react";
import { Mic, MicOff, Loader2, Volume2 } from "lucide-react";

const VOICE_LANGUAGES = [
  { code: "hi-IN", name: "Hindi", native: "हिन्दी" },
  { code: "en-IN", name: "English (India)", native: "English" },
  { code: "ta-IN", name: "Tamil", native: "தமிழ்" },
  { code: "bn-IN", name: "Bengali", native: "বাংলা" },
  { code: "te-IN", name: "Telugu", native: "తెలుగు" },
  { code: "mr-IN", name: "Marathi", native: "मराठी" },
];

export default function VoiceSearchDemo() {
  const [isRecording, setIsRecording] = useState(false);
  const [language, setLanguage] = useState("hi-IN");
  const [transcript, setTranscript] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const startRecording = async () => {
    try {
      setError(null);
      setTranscript(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm;codecs=opus",
      });
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        stream.getTracks().forEach((track) => track.stop());
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        await sendAudio(blob);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      setError("Microphone access denied. Please allow microphone access.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const sendAudio = async (audioBlob) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("audio", audioBlob, "recording.webm");
      formData.append("language", language);

      const res = await fetch("/hushh-vani/api/voice", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (json.success) {
        setTranscript(json.data);
      } else {
        setError(json.error || "Transcription failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const selectedLang = VOICE_LANGUAGES.find((l) => l.code === language);

  return (
    <section className="relative py-20 sm:py-28 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#06B6D4]/20 bg-[#06B6D4]/5 px-4 py-1.5 mb-4">
            <Volume2 size={14} className="text-[#06B6D4]" />
            <span className="text-xs font-semibold tracking-wide text-[#06B6D4] uppercase">
              Live Demo — Chirp 2 (Speech-to-Text V2)
            </span>
          </div>
          <h2 className="font-extrabold text-[#1A1A2E] mb-3" style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}>
            Voice Search in Your Language
          </h2>
          <p className="mx-auto max-w-2xl text-[#4A4A68] text-lg">
            Speak in Hindi, Tamil, Bengali, or any Indian language — Google&apos;s Chirp 2 model transcribes with accent-aware accuracy.
          </p>
        </div>

        {/* Controls */}
        <div className="max-w-xl mx-auto text-center">
          {/* Language picker */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {VOICE_LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  language === lang.code
                    ? "bg-[#06B6D4] text-white shadow-lg shadow-[#06B6D4]/25"
                    : "bg-white border border-gray-200 text-[#4A4A68] hover:border-[#06B6D4]/30"
                }`}
              >
                {lang.native}
              </button>
            ))}
          </div>

          {/* Mic button */}
          <button
            onClick={isRecording ? stopRecording : startRecording}
            disabled={loading}
            className={`mx-auto w-24 h-24 rounded-full inline-flex items-center justify-center transition-all duration-300 cursor-pointer ${
              isRecording
                ? "bg-[#EF4444] text-white shadow-xl shadow-[#EF4444]/30 animate-pulse"
                : "bg-[#06B6D4] text-white shadow-xl shadow-[#06B6D4]/30 hover:bg-[#0891B2]"
            } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {loading ? (
              <Loader2 size={32} className="animate-spin" />
            ) : isRecording ? (
              <MicOff size={32} />
            ) : (
              <Mic size={32} />
            )}
          </button>

          <p className="mt-4 text-sm text-[#9CA3AF]">
            {isRecording
              ? `Recording in ${selectedLang?.name}… tap to stop`
              : loading
              ? "Transcribing with Chirp 2…"
              : `Tap to speak in ${selectedLang?.name}`}
          </p>

          {/* Error */}
          {error && (
            <p className="mt-4 text-sm text-[#EF4444]">{error}</p>
          )}

          {/* Result */}
          {transcript && (
            <div className="mt-8 rounded-2xl border border-[#06B6D4]/10 bg-white p-6 text-left">
              <div className="flex items-center gap-2 mb-3">
                <Volume2 size={16} className="text-[#06B6D4]" />
                <span className="text-xs font-semibold text-[#06B6D4] uppercase">
                  {transcript.languageName} • Confidence: {(transcript.confidence * 100).toFixed(1)}%
                </span>
              </div>
              <p className="text-[#1A1A2E] text-lg leading-relaxed">
                {transcript.transcript || "No speech detected. Try again."}
              </p>
              {transcript.wordCount > 0 && (
                <p className="mt-2 text-xs text-[#9CA3AF]">
                  {transcript.wordCount} words detected • Model: {transcript.model}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
