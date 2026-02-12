"use client";

import HushhVaniHeader from "./components/HushhVaniHeader";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import HowItWorks from "./components/HowItWorks";
import ContactSection from "./components/ContactSection";
import HushhVaniFooter from "./components/HushhVaniFooter";

export default function HushhVaniPage() {
  return (
    <main className="min-h-screen bg-white antialiased">
      <HushhVaniHeader />
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <ContactSection />
      <HushhVaniFooter />
    </main>
  );
}
