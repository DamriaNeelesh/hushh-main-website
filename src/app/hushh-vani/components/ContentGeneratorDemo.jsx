"use client";

import { useState } from "react";
import { Sparkles, Loader2, Copy, Check, Zap } from "lucide-react";

const HUSHH_CONTENT_MODELS = [
  {
    id: "hushh.Kavi",
    displayName: "hushh.Kavi",
    hindi: "कवि",
    meaning: "The Poet",
    badge: "🖋️",
    tier: "pro",
    engine: "Gemini 2.5 Pro",
    color: "#7C3AED",
  },
  {
    id: "hushh.Rasa",
    displayName: "hushh.Rasa",
    hindi: "रस",
    meaning: "The Essence",
    badge: "✨",
    tier: "premium",
    engine: "Gemini 3 Pro",
    color: "#F59E0B",
  },
];

const TONE_OPTIONS = [
  "friendly, relatable, culturally aware",
  "professional, authoritative",
  "playful, Gen-Z vibes",
  "emotional, heartfelt",
];

const FORMAT_OPTIONS = [
  "social media post",
  "WhatsApp broadcast",
  "email campaign",
  "YouTube video script",
  "SMS text",
];

export default function ContentGeneratorDemo() {
  const [brandName, setBrandName] = useState("");
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState(TONE_OPTIONS[0]);
  const [format, setFormat] = useState(FORMAT_OPTIONS[0]);
  const [selectedModel, setSelectedModel] = useState(HUSHH_CONTENT_MODELS[0]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!brandName.trim() || !topic.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/hushh-vani/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "hinglish",
          brandName,
          topic,
          tone,
          format,
          hushhModel: selectedModel.id,
        }),
      });

      const json = await res.json();
      if (json.success) {
        setResult(json.data);
      } else {
        setError(json.error || "Generation failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (result?.content) {
      navigator.clipboard.writeText(result.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className="relative py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#F59E0B]/20 bg-[#F59E0B]/5 px-4 py-1.5 mb-4">
            <Sparkles size={14} className="text-[#F59E0B]" />
            <span className="text-xs font-semibold tracking-wide text-[#F59E0B] uppercase">
              Powered by hushh AI
            </span>
          </div>
          <h2 className="font-extrabold text-[#1A1A2E] mb-3" style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}>
            AI Hinglish Content Generator
          </h2>
          <p className="mx-auto max-w-2xl text-[#4A4A68] text-lg">
            Choose your AI model — enter your brand and topic — get culturally resonant Hinglish marketing copy in seconds.
          </p>
        </div>

        {/* Model Switcher */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex items-center justify-center gap-3">
            {HUSHH_CONTENT_MODELS.map((model) => {
              const isSelected = selectedModel.id === model.id;
              return (
                <button
                  key={model.id}
                  onClick={() => setSelectedModel(model)}
                  className={`relative flex items-center gap-3 rounded-2xl border-2 px-5 py-4 transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? "border-[var(--model-color)] bg-[var(--model-color)]/5 shadow-lg"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                  style={{ "--model-color": model.color }}
                >
                  {model.tier === "premium" && (
                    <span className="absolute -top-2 -right-2 rounded-full bg-gradient-to-r from-[#F59E0B] to-[#EF4444] px-2 py-0.5 text-[10px] font-bold text-white">
                      PREMIUM
                    </span>
                  )}
                  <span className="text-2xl">{model.badge}</span>
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-bold ${isSelected ? "text-[#1A1A2E]" : "text-[#4A4A68]"}`}>
                        {model.displayName}
                      </span>
                      <span className="text-xs text-[#9CA3AF]">{model.hindi}</span>
                    </div>
                    <p className="text-xs text-[#9CA3AF]">
                      {model.meaning} • {model.engine}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Form */}
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl border border-gray-100 bg-[#FAFAFA] p-6 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              {/* Brand */}
              <div>
                <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">
                  Brand Name
                </label>
                <input
                  type="text"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  placeholder="e.g. Zomato, Flipkart, Hushh"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-[#1A1A2E] placeholder:text-[#9CA3AF] outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20"
                />
              </div>

              {/* Topic */}
              <div>
                <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">
                  Campaign Topic
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. Diwali sale, new product launch"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-[#1A1A2E] placeholder:text-[#9CA3AF] outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20"
                />
              </div>

              {/* Tone */}
              <div>
                <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">
                  Tone
                </label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-[#1A1A2E] outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20 cursor-pointer"
                >
                  {TONE_OPTIONS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* Format */}
              <div>
                <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">
                  Content Format
                </label>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-[#1A1A2E] outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20 cursor-pointer"
                >
                  {FORMAT_OPTIONS.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || !brandName.trim() || !topic.trim()}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              style={{
                backgroundColor: selectedModel.color,
                boxShadow: `0 10px 25px -5px ${selectedModel.color}40`,
              }}
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Generating with {selectedModel.displayName}…
                </>
              ) : (
                <>
                  <Zap size={16} />
                  Generate with {selectedModel.displayName}
                </>
              )}
            </button>
          </div>

          {/* Error */}
          {error && (
            <p className="mt-4 text-sm text-[#EF4444] text-center">{error}</p>
          )}

          {/* Result */}
          {result && (
            <div className="mt-6 rounded-2xl border border-[#7C3AED]/10 bg-white p-6 sm:p-8 relative">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{result.badge || selectedModel.badge}</span>
                  <span className="text-sm font-semibold" style={{ color: selectedModel.color }}>
                    Generated by {result.model}
                  </span>
                  {result.tier === "premium" && (
                    <span className="rounded-full bg-gradient-to-r from-[#F59E0B] to-[#EF4444] px-2 py-0.5 text-[10px] font-bold text-white">
                      PREMIUM
                    </span>
                  )}
                </div>
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 text-xs text-[#9CA3AF] hover:text-[#7C3AED] transition-colors cursor-pointer"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
              <div className="prose prose-sm max-w-none text-[#1A1A2E] whitespace-pre-wrap leading-relaxed">
                {result.content}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
