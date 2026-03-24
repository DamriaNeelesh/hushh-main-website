"use client";

import { useState } from "react";
import { Globe, ArrowRight, Loader2 } from "lucide-react";

const DEMO_LANGUAGES = [
{ code: "hi", name: "Hindi", native: "हिन्दी" },
{ code: "ta", name: "Tamil", native: "தமிழ்" },
{ code: "bn", name: "Bengali", native: "বাংলা" },
{ code: "te", name: "Telugu", native: "తెలుగు" },
{ code: "mr", name: "Marathi", native: "मराठी" },
{ code: "gu", name: "Gujarati", native: "ગુજરાતી" }];


export default function TranslationDemo() {
  const [inputText, setInputText] = useState("");
  const [translations, setTranslations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTranslate = async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/hushh-vani/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: inputText,
          action: "multi",
          targetLangs: DEMO_LANGUAGES.map((l) => l.code)
        })
      });

      const json = await res.json();
      if (json.success) {
        setTranslations(json.data);
      } else {
        setError(json.error || "Translation failed");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="bharat" className="relative py-20 sm:py-28 bg-gradient-to-b from-white to-[#F5F3FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#7C3AED]/20 bg-[#7C3AED]/5 px-4 py-1.5 mb-4">
            <Globe size={14} className="text-[#7C3AED]" />
            <span className="text-xs font-semibold tracking-wide text-[#7C3AED] uppercase">
              🌐 hushh.Bhasha — भाषा (Language)
            </span>
          </div>
          <h2 className="font-extrabold text-[#1A1A2E] mb-3" style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}>
            Instant Translation to 12+ Indian Languages
          </h2>
          <p className="mx-auto max-w-2xl text-[#4A4A68] text-lg">
            Type anything in English — watch it transform into Hindi, Tamil, Bengali, Telugu, Marathi, and Gujarati in real time.
          </p>
        </div>

        {/* Input */}
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your marketing text here… e.g. 'Discover amazing deals this festive season!'"
              rows={3}
              className="w-full rounded-2xl border border-gray-200 bg-white px-6 py-4 text-[#1A1A2E] placeholder:text-[#9CA3AF] outline-none transition-all duration-200 focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20 resize-none text-base" />
            
            <button
              onClick={handleTranslate}
              disabled={loading || !inputText.trim()}
              className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-xl bg-[#7C3AED] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#6D28D9] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
              
              {loading ?
              <Loader2 size={16} className="animate-spin" /> :

              <>
                  Translate <ArrowRight size={14} />
                </>
              }
            </button>
          </div>

          {/* Error */}
          {error &&
          <p className="mt-3 text-sm text-[#EF4444] text-center">{error}</p>
          }

          {/* Results */}
          {translations.length > 0 &&
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {translations.map((t, idx) => {
              const langInfo = DEMO_LANGUAGES.find((l) => l.code === t.targetLanguage);
              return (
                <div
                  key={t.targetLanguage}
                  className="group rounded-xl border border-gray-100 bg-white p-5 transition-all duration-200 hover:border-[#7C3AED]/20 hover:shadow-md">
                  
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-bold text-[#7C3AED] uppercase tracking-wider">
                        {langInfo?.name}
                      </span>
                      <span className="text-xs text-[#9CA3AF]">
                        {langInfo?.native}
                      </span>
                    </div>
                    <p className="text-[#1A1A2E] text-sm leading-relaxed">
                      {t.translatedText}
                    </p>
                  </div>);

            })}
            </div>
          }
        </div>
      </div>
    </section>);

}