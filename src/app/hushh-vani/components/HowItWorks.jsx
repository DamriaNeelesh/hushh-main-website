"use client";

import { Layers, Zap, BarChart3, Rocket } from "lucide-react";

const STEPS = [
  {
    step: "01",
    title: "Connect Your Brand",
    hindiTag: "ब्रांड जोड़ें",
    description:
      "Plug in your existing brand assets, tone-of-voice guidelines, and target audience data. We handle the rest.",
    icon: Layers,
    color: "#7C3AED",
  },
  {
    step: "02",
    title: "AI Localizes Everything",
    hindiTag: "AI सब समझे",
    description:
      "Our vernacular engine adapts your content to 22+ Indian languages, regional idioms, and cultural contexts in real time.",
    icon: Zap,
    color: "#F59E0B",
  },
  {
    step: "03",
    title: "Launch & Measure",
    hindiTag: "लॉन्च और मापें",
    description:
      "Deploy campaigns across channels — WhatsApp, social, voice, web — and track performance with granular analytics.",
    icon: BarChart3,
    color: "#06B6D4",
  },
  {
    step: "04",
    title: "Scale Across Bharat",
    hindiTag: "पूरे भारत में फैलाएं",
    description:
      "From metros to Tier-3 cities, scale effortlessly with mobile-first, low-bandwidth experiences that convert.",
    icon: Rocket,
    color: "#10B981",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest text-[#06B6D4] uppercase mb-3">
            Kaise Kaam Karta Hai
          </p>
          <h2
            className="font-extrabold text-[#1A1A2E] mb-4"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
          >
            Four Steps to Bharat-Ready Marketing
          </h2>
          <p className="mx-auto max-w-2xl text-[#4A4A68] text-lg leading-relaxed">
            From setup to scale — go live in days, not months.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="group relative rounded-2xl border border-gray-100 bg-white p-8 text-center transition-all duration-300 hover:shadow-lg hover:border-transparent"
              >
                {/* Step number */}
                <span
                  className="absolute -top-4 left-1/2 -translate-x-1/2 inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold text-white"
                  style={{ backgroundColor: item.color }}
                >
                  {item.step}
                </span>

                {/* Icon */}
                <div
                  className="mx-auto mb-5 inline-flex items-center justify-center w-14 h-14 rounded-2xl transition-colors duration-200"
                  style={{
                    backgroundColor: `${item.color}15`,
                    color: item.color,
                  }}
                >
                  <Icon size={28} />
                </div>

                {/* Hindi tag */}
                <p
                  className="text-xs font-medium tracking-wide mb-2"
                  style={{ color: item.color }}
                >
                  {item.hindiTag}
                </p>

                {/* Title */}
                <h3 className="text-lg font-bold text-[#1A1A2E] mb-3">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#4A4A68] leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
