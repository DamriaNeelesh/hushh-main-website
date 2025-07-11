import "./globals.css"
import React from "react";
import ClientHome from "./clientside/Home";
import NewLandingPage from "./clientside/newLandingPage";

export const metadata = {
  title: "Hushh | 🤫 'Your' data, make it 'Your' business",
  description:
    "Intelligence as a service powered by your Data, extract value from your own data",
  keywords:
    "Data API Business, Data Autonomy, Data Equity, Consent-Driven Excellence, Technology For Everyone, Hushh Wallet App, Hushh Button, Vibe Search, Browser Companion, Concierge App, Valet Chat, Vibe Search API, Hushh For Students, Brand Wallet, Receipt Radar, Future of Digital Identity & Personalised Experiences, Gen AI, GenAI ",
  canonical: "https://hushh.ai",
  alternates: {
    canonical: "https://hushh.ai",
  },
  openGraph: {
  title: "Hushh | 🤫 'Your' data, make it 'Your' business",
  description: "Intelligence as a service powered by your Data, extract value from your own data",
  url: "https://hushh.ai",

    }, 
};

export default function Home() {
  return (
    <NewLandingPage />
  )
}
