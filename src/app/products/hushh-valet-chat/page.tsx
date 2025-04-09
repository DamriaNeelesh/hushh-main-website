import React from "react";
import ClientHushhValetChat from "../../clientside/HushhValetChat";
import siteMetadata from "../../../app/sitemetadata";

export const metadata = {
  title: "Hushh Valet Chat | AI-Powered Receipt & Finance Management",
  description:
    "Organize all your receipts in one place with Hushh Valet Chat. Get AI-powered insights on your spending habits and take control of your finances effortlessly.",
  keywords:
    "Valet Chat, Receipt Management, AI Finance Management, Receipt Organizer, Digital Receipts, Expense Tracking, Finance Insights, Spending Analytics, Receipt Storage, AI Financial Assistant, Financial Management, Warranty Tracking, Purchase History, Receipt Categorization, Spending Habits Analysis, Budget Management, Receipt Sharing, Financial Intelligence, AI Spending Insights, Smart Receipt Management, Secure Receipt Storage, Financial Dashboard, Expense Management, Digital Finance Assistant, AI Finance Analysis",
  canonical: "https://www.hushh.ai/products/hushh-valet-chat",
  alternates: {
    canonical: "https://www.hushh.ai/products/hushh-valet-chat",
    languages: {
      'en-US': 'https://www.hushh.ai/products/hushh-valet-chat',
    },
  },
  openGraph: {
    title: "Hushh Valet Chat | AI-Powered Receipt & Finance Management",
    description:
      "Organize all your receipts in one place with Hushh Valet Chat. Get AI-powered insights on your spending habits and take control of your finances effortlessly.",
    url: "https://www.hushh.ai/products/hushh-valet-chat",
    type: "product",
    siteName: "Hushh AI",
    images: [
      {
        url: siteMetadata.socialBanner,
        width: 1200,
        height: 630,
        alt: "Hushh Valet Chat - AI-Powered Finance Management",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hushh Valet Chat | AI-Powered Receipt & Finance Management",
    description: "Organize all your receipts in one place with Hushh Valet Chat. Get AI-powered insights on your finances.",
    images: [siteMetadata.socialBanner],
    creator: "@hushh_ai",
    site: "@hushh_ai",
  },
};

// Product JSON-LD structured data for Valet Chat
const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Hushh Valet Chat",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web, iOS, Android",
  "description": "Organize all your receipts in one place with Hushh Valet Chat. Get AI-powered insights on your spending habits and take control of your finances effortlessly.",
  "offers": {
    "@type": "Offer",
    "url": "https://www.hushh.ai/products/hushh-valet-chat",
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
    "ratingValue": "4.6",
    "reviewCount": "187"
  },
  "featureList": "Email receipt collection, AI-powered finance insights, Receipt organization, Spending analytics, Warranty tracking",
  "screenshot": siteMetadata.socialBanner
};

const HushhValetChat = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <ClientHushhValetChat />
    </>
  );
};

export default HushhValetChat;
