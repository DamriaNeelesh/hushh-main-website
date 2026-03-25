'use client'
import React from 'react'
import ContactForm from '../_components/features/contactForm'
import ContentWrapper from '../_components/layout/ContentWrapper'
import JsonLdScript from '../_components/seo/JsonLdScript'

// ContactPage JSON-LD structured data
const contactPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact Hushh AI",
  "description": "Contact page for Hushh AI, a company specializing in data privacy and monetization solutions.",
  "url": "https://www.hushh.ai/contact-us",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-800-HUSHH-AI",
    "contactType": "customer service",
    "areaServed": "US",
    "availableLanguage": "English"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "1021 5th St W.",
    "addressLocality": "Kirkland",
    "addressRegion": "WA",
    "postalCode": "98033",
    "addressCountry": "US"
  }
};

const ContactUsClient = () => {
  return (
    <>
      <JsonLdScript data={contactPageJsonLd} />
      <ContentWrapper surface="muted" px={0} mx={0}>
        <div className="w-full">
          <ContactForm />
        </div>
      </ContentWrapper>
    </>
  )
}

export default ContactUsClient; 
