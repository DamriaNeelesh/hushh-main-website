"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { createLead } from "../lib/supabase";

const INITIAL_FORM = {
  name: "",
  email: "",
  company: "",
  message: "",
  languages: "",
};

export default function ContactSection() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await createLead({
        name: form.name,
        email: form.email,
        company: form.company || null,
        message: form.message || null,
        target_languages: form.languages
          ? form.languages.split(",").map((l) => l.trim())
          : [],
        source: "hushh-vani-landing",
      });
      setStatus("success");
      setForm(INITIAL_FORM);
    } catch (err) {
      console.error("Lead submission failed:", err);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative py-20 sm:py-28 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left — copy */}
          <div>
            <p className="text-sm font-semibold tracking-widest text-[#7C3AED] uppercase mb-3">
              Shuru Karein
            </p>
            <h2
              className="font-extrabold text-[#1A1A2E] mb-6"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
            >
              Ready to Speak
              <br />
              <span className="text-[#7C3AED]">Bharat&apos;s Language?</span>
            </h2>
            <p className="text-[#4A4A68] text-lg leading-relaxed mb-8">
              Tell us about your brand and the languages you want to reach. Our
              team will set up a personalized demo within 24 hours.
            </p>

            <div className="space-y-4">
              {[
                "Free 14-day pilot program",
                "Dedicated localization specialist",
                "No credit card required",
              ].map((perk) => (
                <div key={perk} className="flex items-center gap-3">
                  <CheckCircle size={18} className="text-[#10B981] shrink-0" />
                  <span className="text-[#4A4A68] text-sm font-medium">
                    {perk}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-gray-100 bg-white p-8 sm:p-10 shadow-sm"
          >
            <div className="space-y-5">
              {/* Name */}
              <div>
                <label
                  htmlFor="vani-name"
                  className="block text-sm font-medium text-[#1A1A2E] mb-1.5"
                >
                  Your Name <span className="text-[#EF4444]">*</span>
                </label>
                <input
                  id="vani-name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Priya Sharma"
                  className="w-full rounded-xl border border-gray-200 bg-[#FAFAFA] px-4 py-3 text-sm text-[#1A1A2E] placeholder:text-[#9CA3AF] outline-none transition-all duration-200 focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="vani-email"
                  className="block text-sm font-medium text-[#1A1A2E] mb-1.5"
                >
                  Work Email <span className="text-[#EF4444]">*</span>
                </label>
                <input
                  id="vani-email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="priya@company.com"
                  className="w-full rounded-xl border border-gray-200 bg-[#FAFAFA] px-4 py-3 text-sm text-[#1A1A2E] placeholder:text-[#9CA3AF] outline-none transition-all duration-200 focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20"
                />
              </div>

              {/* Company */}
              <div>
                <label
                  htmlFor="vani-company"
                  className="block text-sm font-medium text-[#1A1A2E] mb-1.5"
                >
                  Company
                </label>
                <input
                  id="vani-company"
                  name="company"
                  type="text"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="Your company name"
                  className="w-full rounded-xl border border-gray-200 bg-[#FAFAFA] px-4 py-3 text-sm text-[#1A1A2E] placeholder:text-[#9CA3AF] outline-none transition-all duration-200 focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20"
                />
              </div>

              {/* Target Languages */}
              <div>
                <label
                  htmlFor="vani-languages"
                  className="block text-sm font-medium text-[#1A1A2E] mb-1.5"
                >
                  Target Languages
                </label>
                <input
                  id="vani-languages"
                  name="languages"
                  type="text"
                  value={form.languages}
                  onChange={handleChange}
                  placeholder="Hindi, Tamil, Bengali…"
                  className="w-full rounded-xl border border-gray-200 bg-[#FAFAFA] px-4 py-3 text-sm text-[#1A1A2E] placeholder:text-[#9CA3AF] outline-none transition-all duration-200 focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="vani-message"
                  className="block text-sm font-medium text-[#1A1A2E] mb-1.5"
                >
                  Tell Us More
                </label>
                <textarea
                  id="vani-message"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="What are you trying to achieve?"
                  className="w-full rounded-xl border border-gray-200 bg-[#FAFAFA] px-4 py-3 text-sm text-[#1A1A2E] placeholder:text-[#9CA3AF] outline-none transition-all duration-200 focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20 resize-none"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#7C3AED] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#7C3AED]/25 transition-all duration-200 hover:bg-[#6D28D9] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {status === "sending" ? (
                "Sending…"
              ) : (
                <>
                  Get My Demo <Send size={16} />
                </>
              )}
            </button>

            {/* Status messages */}
            {status === "success" && (
              <div className="mt-4 flex items-center gap-2 text-sm text-[#10B981]">
                <CheckCircle size={16} />
                <span>Thank you! We&apos;ll be in touch within 24 hours.</span>
              </div>
            )}
            {status === "error" && (
              <div className="mt-4 flex items-center gap-2 text-sm text-[#EF4444]">
                <AlertCircle size={16} />
                <span>Something went wrong. Please try again.</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
