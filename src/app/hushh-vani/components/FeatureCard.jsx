"use client";

import {
  Languages,
  Mic,
  Heart,
  ShoppingBag,
  Smartphone,
  ChevronRight,
} from "lucide-react";

const ICON_MAP = {
  Languages,
  Mic,
  Heart,
  ShoppingBag,
  Smartphone,
};

export default function FeatureCard({ feature, index }) {
  const Icon = ICON_MAP[feature.icon] || Languages;
  const isEven = index % 2 === 0;

  return (
    <article
      className={`group relative rounded-2xl border border-gray-100 bg-white p-8 sm:p-10 transition-all duration-300 hover:border-[#7C3AED]/20 hover:shadow-lg hover:shadow-[#7C3AED]/5 ${
        isEven ? "" : "lg:translate-y-8"
      }`}
    >
      {/* Icon */}
      <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#7C3AED]/10 text-[#7C3AED] transition-colors duration-200 group-hover:bg-[#7C3AED] group-hover:text-white">
        <Icon size={24} />
      </div>

      {/* Hindi tagline */}
      <p className="text-xs font-medium text-[#F59E0B] tracking-wide mb-2">
        {feature.tagline}
      </p>

      {/* Title */}
      <h3 className="text-xl font-bold text-[#1A1A2E] mb-1">
        {feature.title}
      </h3>

      {/* Hindi title */}
      <p className="text-sm text-[#A78BFA] font-medium mb-4">
        {feature.hindiTitle}
      </p>

      {/* Description */}
      <p className="text-[#4A4A68] leading-relaxed mb-6">
        {feature.description}
      </p>

      {/* Capabilities */}
      <ul className="space-y-2">
        {feature.capabilities.map((cap) => (
          <li key={cap} className="flex items-start gap-2 text-sm text-[#4A4A68]">
            <ChevronRight
              size={14}
              className="mt-0.5 shrink-0 text-[#7C3AED]"
            />
            {cap}
          </li>
        ))}
      </ul>
    </article>
  );
}
