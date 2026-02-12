"use client";

import { useState } from "react";
import { NAV_ITEMS } from "../lib/constants";
import { Menu, X } from "lucide-react";

export default function HushhVaniHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="/hushh-vani" className="flex items-center gap-2 cursor-pointer">
          <span className="text-xl font-bold tracking-tight text-[#7C3AED]">
            hushh
          </span>
          <span className="text-xl font-light text-[#F59E0B]">वाणी</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-gray-600 transition-colors duration-200 hover:text-[#7C3AED] cursor-pointer"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-lg bg-[#7C3AED] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#6D28D9] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/50 cursor-pointer"
          >
            Get Started
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-gray-600 hover:text-[#7C3AED] cursor-pointer"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-3">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block text-sm font-medium text-gray-600 py-2 hover:text-[#7C3AED] cursor-pointer"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="block w-full text-center rounded-lg bg-[#7C3AED] px-5 py-2.5 text-sm font-semibold text-white cursor-pointer"
          >
            Get Started
          </a>
        </div>
      )}
    </header>
  );
}
