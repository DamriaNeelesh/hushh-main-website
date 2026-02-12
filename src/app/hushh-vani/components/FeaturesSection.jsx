"use client";

import { FEATURES } from "../lib/constants";
import FeatureCard from "./FeatureCard";

export default function FeaturesSection() {
  return (
    <section id="features" className="relative py-20 sm:py-28 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest text-[#F59E0B] uppercase mb-3">
            Kya Kya Kar Sakte Hain
          </p>
          <h2
            className="font-extrabold text-[#1A1A2E] mb-4"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
          >
            Built for India. Powered by AI.
          </h2>
          <p className="mx-auto max-w-2xl text-[#4A4A68] text-lg leading-relaxed">
            Five pillars that make your brand speak Bharat&apos;s language —
            literally and emotionally.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, idx) => (
            <FeatureCard key={feature.id} feature={feature} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
