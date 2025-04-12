import React from 'react'
import ContactUsClient from './ContactUsClient'
import { siteMetadata } from '../sitemetadata'

// This is a server component that can export metadata
export const metadata = {
  title: "Contact Hushh | Connect with Our Data Privacy Experts",
  description:
    "Reach out to Hushh for inquiries about our data privacy and monetization solutions. Connect with our team to learn how we can help you take control of your data.",
  keywords: [
    "contact Hushh", "Hushh support", "data privacy inquiries", "data monetization questions", "user-controlled data help", "privacy-preserving technology support", "ethical data practices contact", "Hushh AI contact", "data marketplace inquiries", "human-AI interaction support", "Kirkland WA tech company"
  ],
  canonical: "https://hushh.ai/contact-us",
  alternates: {
    canonical: "https://hushh.ai/contact-us",
    languages: {
      'en-US': 'https://hushh.ai/contact-us',
    },
  },
  openGraph: {
    title: "Contact Hushh | Connect with Our Data Privacy Experts",
    description:
      "Reach out to Hushh for inquiries about our data privacy and monetization solutions. Connect with our team to learn how we can help you take control of your data.",
    url: "https://hushh.ai/contact-us",
    type: "website",
    siteName: "Hushh AI",
    images: [
      {
        url: siteMetadata.socialBanner,
        width: 1200,
        height: 630,
        alt: "Contact Hushh - Connect with Our Team",
      },
    ],
    locale: "en_US",
  },
};

// The actual page component (server component)
export default function ContactUs() {
  return <ContactUsClient />
}


