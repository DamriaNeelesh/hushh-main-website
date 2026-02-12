"use client";

import { NAV_ITEMS } from "../lib/constants";

export default function HushhVaniFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-100 bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-[#7C3AED]">
              hushh
            </span>
            <span className="text-xl font-light text-[#F59E0B]">वाणी</span>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-[#4A4A68] transition-colors duration-200 hover:text-[#7C3AED] cursor-pointer"
              >
                {item.label}
              </a>
            ))}
            <a
              href="https://hushh.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#4A4A68] transition-colors duration-200 hover:text-[#7C3AED] cursor-pointer"
            >
              hushh.ai
            </a>
          </nav>

          {/* Copyright */}
          <p className="text-xs text-[#9CA3AF]">
            © {year} Hushh AI. All rights reserved.
          </p>
        </div>

        {/* Tagline */}
        <div className="mt-8 text-center">
          <p className="text-sm text-[#9CA3AF]">
            Made with ❤️ for Bharat —{" "}
            <span className="text-[#F59E0B] font-medium">
              अपनी पहचान बनायें
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
