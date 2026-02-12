"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { STATS } from "../lib/constants";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F5F3FF] via-white to-white py-20 sm:py-28 lg:py-36">
      {/* Decorative grid */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxIiBmaWxsPSIjRTVFN0VCIi8+PC9zdmc+')] opacity-50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[#7C3AED]/20 bg-[#7C3AED]/5 px-4 py-1.5 mb-8">
          <Sparkles size={14} className="text-[#F59E0B]" />
          <span className="text-xs font-semibold tracking-wide text-[#7C3AED] uppercase">
            AI-Powered for Bharat
          </span>
        </div>

        {/* Headline */}
        <h1
          className="font-extrabold tracking-tight text-[#1A1A2E] mb-4"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", lineHeight: 1.1 }}
        >
          Apni Pehchaan
          <br />
          <span className="text-[#7C3AED]">Banayein</span>
        </h1>

        {/* Subheadline */}
        <p className="mx-auto max-w-2xl text-lg sm:text-xl text-[#4A4A68] mb-10 leading-relaxed">
          India&apos;s first consent-first AI platform for vernacular marketing.
          Speak to{" "}
          <span className="font-semibold text-[#7C3AED]">800M+ users</span> in
          their language, on their terms.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#contact"
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#7C3AED] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-[#7C3AED]/25 transition-all duration-200 hover:bg-[#6D28D9] hover:shadow-xl hover:shadow-[#7C3AED]/30 cursor-pointer"
          >
            Start Building
            <ArrowRight
              size={18}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </a>
          <a
            href="#features"
            className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-gray-200 bg-white px-8 py-4 text-base font-semibold text-[#1A1A2E] transition-all duration-200 hover:border-[#7C3AED]/30 hover:bg-[#F5F3FF] cursor-pointer"
          >
            Explore Features
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#7C3AED]">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-[#9CA3AF] font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
