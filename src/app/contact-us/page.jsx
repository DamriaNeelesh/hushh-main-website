import React from 'react'
import ContactUsClient from './ContactUsClient'
import { siteMetadata } from '../sitemetadata'

// This is a server component that can export metadata
export const metadata = {
  title: "Contact Hushh.ai | Get in Touch About Data Privacy Solutions", // Updated
  description: "Reach out to Hushh.ai for inquiries about our user-controlled data platforms, AI-powered personalization tools, or data privacy initiatives.", // Updated
  keywords: [ // Optional: Refined keywords
    "contact Hushh.ai", "Hushh support", "data privacy solutions", "user data platforms", "AI personalization tools", "user-controlled data", "ethical AI"
  ],
  canonical: "https://www.hushh.ai/contact-us", // Ensured www
  alternates: {
    canonical: "https://www.hushh.ai/contact-us", // Ensured www
    languages: {
      'en-US': 'https://www.hushh.ai/contact-us', // Ensured www
    },
  },
  openGraph: {
    title: "Contact Hushh.ai | Get in Touch About Data Privacy Solutions", // Updated
    description: "Reach out to Hushh.ai for inquiries about our user-controlled data platforms, AI-powered personalization tools, or data privacy initiatives.", // Updated
    url: "https://www.hushh.ai/contact-us", // Ensured www
    type: "website",
    siteName: "Hushh.ai", // Consistent site name
    images: [
      {
        url: siteMetadata.socialBanner, // Assuming this is appropriate
        width: 1200,
        height: 630,
        alt: "Contact Hushh.ai", // Updated alt
      },
    ],
    locale: "en_US",
  },
};

// The actual page component (server component)
export default function ContactUs() {
  return <ContactUsClient />
}


