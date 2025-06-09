import "./globals.css"
import React from "react";
import ClientHome from "./clientside/Home";

export const metadata = {
  title: "Hushh: User-Controlled Data, AI Personalization & Privacy",
  description:
    "Regain control of your data with Hushh.ai. We enable ethical data monetization & AI-powered personalization, prioritizing your privacy. For users & brands.",
  keywords:
    "user-controlled data, data privacy, AI personalization, ethical data monetization, data control, privacy-preserving technology, luxury consumers, data autonomy, granular user consent",
  canonical: "https://hushh.ai",
  alternates: {
    canonical: "https://hushh.ai",
  },
  openGraph: {
  title: "Hushh: User-Controlled Data, AI Personalization & Privacy",
  description: "Regain control of your data with Hushh.ai. We enable ethical data monetization & AI-powered personalization, prioritizing your privacy.",
  url: "https://hushh.ai",
  // Assuming socialBanner metadata is handled in RootLayout, otherwise add relevant image here
    }, 
};

export default function Home() {
  return <ClientHome />;
}
