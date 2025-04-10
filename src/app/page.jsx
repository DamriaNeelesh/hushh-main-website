import "./globals.css"
import React from "react";
import ClientHome from "./clientside/Home";
import siteMetadata from "./sitemetadata";

export const metadata = {
  title: "Hushh | Your Data Your Business - Data Intelligence Platform",
  description:
    "Intelligence as a service powered by your data. Hushh empowers users to extract value from their own data while maintaining complete control and privacy.",
  keywords:
    "Data API Business, Data Autonomy, Data Equity, Consent-Driven Excellence, Technology For Everyone, Hushh Wallet App, Hushh Button, Vibe Search, Browser Companion, Concierge App, Valet Chat, Vibe Search API, Hushh For Students, Brand Wallet, Receipt Radar, Future of Digital Identity & Personalised Experiences, Gen AI, GenAI, Data Privacy, Data Control, Data Monetization",
  
  // Define canonical and alternates
  canonical: "https://www.hushh.ai",
  alternates: {
    canonical: "https://www.hushh.ai",
    languages: {
      'en-US': 'https://www.hushh.ai',
    },
  },
  
  // Enhanced OpenGraph metadata
  openGraph: {
    title: "Hushh | Your Data Your Business - Data Intelligence Platform",
    description: "Intelligence as a service powered by your data. Hushh empowers users to extract value from their own data while maintaining complete control and privacy.",
    url: "https://www.hushh.ai",
    siteName: "Hushh AI",
    images: [
      {
        url: siteMetadata.socialBanner,
        width: 1200,
        height: 630,
        alt: "Hushh AI - Your Data Your Business",
      }
    ],
    locale: "en_US",
    type: "website",
  },
  
  // Twitter card metadata
  twitter: {
    card: "summary_large_image",
    title: "Hushh | Your Data Your Business - Data Intelligence Platform",
    description: "Intelligence as a service powered by your data. Hushh empowers users to extract value from their own data while maintaining complete control and privacy.",
    creator: "@hushh_ai",
    images: [siteMetadata.socialBanner],
  },
};

// Add structured data for home page
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Hushh AI",
  "url": "https://www.hushh.ai",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://www.hushh.ai/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  },
  "description": "Intelligence as a service powered by your data. Hushh empowers users to extract value from their own data while maintaining complete control and privacy.",
  "publisher": {
    "@type": "Organization",
    "name": "Hushh AI",
    "logo": {
      "@type": "ImageObject",
      "url": siteMetadata.socialBanner
    }
  }
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ClientHome />
    </>
  );
}
