import React from "react";
import ClientHushhButton from "../../clientside/HushhButton";
import siteMetadata from "src/app/sitemetadata";
export const metadata = {
  title: "Hushh Button | One-Click Data Sharing Solution for Personalized Experiences",
  description:
    "Share your data securely for personalized recommendations and tailored experiences with just one click. Hushh Button bridges the gap between your preferences and your favorite brands.",
  keywords:
    "Hushh Button, Data In, Data Out, powerful plugin, bridges the gap between your preferences, choices, needs, likes, favorite brands, GenAI, tailored shopping experience, Data Sharing for Personalized Experiences, one-stop solution for seamless data sharing, Hushh Button For Customers, Sync your preferences, past purchases, sizing information, secure data storage, Hushh Wallet, personalized product recommendations, marketing campaigns, user privacy preferences, personalized shopping experience, transformed shopping experience, curated recommendations, unique style, Hushh Button Magic, Data Retrieval",
  canonical: "https://www.hushh.ai/products/hushh-button",
  alternates: {
    canonical: "https://www.hushh.ai/products/hushh-button",
    languages: {
      'en-US': 'https://www.hushh.ai/products/hushh-button',
    },
  },
  openGraph: {
    title: "Hushh Button | One-Click Data Sharing Solution for Personalized Experiences",
    description:
      "Share your data securely for personalized recommendations and tailored experiences with just one click. Hushh Button bridges the gap between your preferences and your favorite brands.",
    url: "https://www.hushh.ai/products/hushh-button",
    type: "product",
    siteName: "Hushh AI",
    images: [
      {
        url: siteMetadata.socialBanner,
        width: 1200,
        height: 630,
        alt: "Hushh Button - One-Click Data Sharing Solution",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hushh Button | One-Click Data Sharing Solution for Personalized Experiences",
    description: "Share your data securely for personalized recommendations and tailored experiences with just one click.",
    images: [siteMetadata.socialBanner],
    creator: "@hushh_ai",
    site: "@hushh_ai",
  },
};

// Product JSON-LD structured data
const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Hushh Button",
  "description": "Share your data securely for personalized recommendations and tailored experiences with just one click. Hushh Button bridges the gap between your preferences and your favorite brands.",
  "brand": {
    "@type": "Brand",
    "name": "Hushh AI"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://www.hushh.ai/products/hushh-button",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  },
  "category": "Data Sharing Tools",
  "image": siteMetadata.socialBanner
};

const HushhButton = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <ClientHushhButton />
    </>
  );
};

export default HushhButton;
