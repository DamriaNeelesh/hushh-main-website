import React from "react";
import ClientVibeSearch from "../../clientside/VibeSearch";
import siteMetadata from "../../../app/sitemetadata";

export const metadata = {
  title: "Hushh Vibe Search | AI-Powered Fashion Search & Style Matching",
  description:
    "Find perfect items to express your individuality with Vibe Search. Discover, save, and share fashion items that match your personal style with our AI-powered search technology.",
  keywords:
    "Vibe Search, AI Fashion Search, Style Matching, Visual Search, Personal Stylist, Fashion Discovery, Image Search, Style Preferences, Personalized Fashion, Outfit Recommendations, Fashion AI, Hushh Wallet Integration, Size Matching, Fit Recommendations, Style Sharing, Visual Recognition, Style Analysis, Product Discovery, Fashion Trends, Brand Matching, Budget Shopping, Shopping Assistant, Curated Fashion, Style Expression, Individualized Fashion",
  canonical: "https://www.hushh.ai/products/hushh-vibe-search",
  alternates: {
    canonical: "https://www.hushh.ai/products/hushh-vibe-search",
    languages: {
      'en-US': 'https://www.hushh.ai/products/hushh-vibe-search',
    },
  },
  openGraph: {
    title: "Hushh Vibe Search | AI-Powered Fashion Search & Style Matching",
    description:
      "Find perfect items to express your individuality with Vibe Search. Discover, save, and share fashion items that match your personal style with our AI-powered search technology.",
    url: "https://www.hushh.ai/products/hushh-vibe-search",
    type: "product",
    siteName: "Hushh AI",
    images: [
      {
        url: siteMetadata.socialBanner,
        width: 1200,
        height: 630,
        alt: "Hushh Vibe Search - Your Personal Fashion Stylist",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hushh Vibe Search | AI-Powered Fashion Search & Style Matching",
    description: "Find perfect items to express your individuality with Vibe Search. Your AI-powered personal stylist at your fingertips.",
    images: [siteMetadata.socialBanner],
    creator: "@hushh_ai",
    site: "@hushh_ai",
  },
};

// Product JSON-LD structured data for Vibe Search
const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Hushh Vibe Search",
  "applicationCategory": "LifestyleApplication",
  "operatingSystem": "iOS, Android, Web",
  "description": "Find perfect items to express your individuality with Vibe Search. Discover, save, and share fashion items that match your personal style with our AI-powered search technology.",
  "offers": {
    "@type": "Offer",
    "url": "https://www.hushh.ai/products/hushh-vibe-search",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Hushh AI",
    "logo": {
      "@type": "ImageObject",
      "url": siteMetadata.socialBanner
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "243"
  },
  "featureList": "Image-based search, Style preferences, Size matching, Trend alerts, Personalized recommendations",
  "screenshot": siteMetadata.socialBanner
};

const VibeSearch = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <ClientVibeSearch />
    </>
  );
};

export default VibeSearch;
