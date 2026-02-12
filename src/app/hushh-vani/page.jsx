"use client";

import HushhVaniHeader from "./components/HushhVaniHeader";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import HowItWorks from "./components/HowItWorks";
import TranslationDemo from "./components/TranslationDemo";
import ContentGeneratorDemo from "./components/ContentGeneratorDemo";
import VoiceSearchDemo from "./components/VoiceSearchDemo";
import ContactSection from "./components/ContactSection";
import HushhVaniFooter from "./components/HushhVaniFooter";

export default function HushhVaniPage() {
  return (
    <main className="min-h-screen bg-white antialiased">
      <HushhVaniHeader />
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <TranslationDemo />
      <ContentGeneratorDemo />
      <VoiceSearchDemo />
      <ContactSection />
      <HushhVaniFooter />
    </main>
  );
}
