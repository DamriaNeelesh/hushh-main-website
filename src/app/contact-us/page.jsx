'use client'
import React from 'react'
import { Container, Box, Heading } from '@chakra-ui/react'
import ContactForm from '../_components/features/contactForm'
import StructuredData from '../_components/SEO/StructuredData'
import { generateBreadcrumbSchema } from '../_utilities/seoPerformance'
import siteMetadata from '../sitemetadata'

// SEO Metadata
export const metadata = {
  title: "Contact Hushh | Get in Touch with Our Data Privacy Experts",
  description:
    "Reach out to Hushh for inquiries about data privacy solutions, support, or partnership opportunities. Connect with our team and discover how we can help you take control of your data.",
  keywords:
    "Contact Hushh, Data Privacy Support, Hushh Contact Form, Privacy Solutions, Data Control Inquiries, Get in Touch, Hushh Customer Support, Data Privacy Experts, Privacy Consultation, Hushh Partnership, Data Ownership Support",
  canonical: "https://www.hushh.ai/contact-us",
  alternates: {
    canonical: "https://www.hushh.ai/contact-us",
    languages: {
      'en-US': 'https://www.hushh.ai/contact-us',
    },
  },
  openGraph: {
    title: "Contact Hushh | Get in Touch with Our Data Privacy Experts",
    description:
      "Reach out to Hushh for inquiries about data privacy solutions, support, or partnership opportunities. Connect with our team today.",
    url: "https://www.hushh.ai/contact-us",
    type: "website",
    siteName: "Hushh AI",
    images: [
      {
        url: siteMetadata.socialBanner,
        width: 1200,
        height: 630,
        alt: "Contact Hushh - Data Privacy Experts",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Hushh | Get in Touch with Our Data Privacy Experts",
    description: "Reach out to Hushh for inquiries about data privacy solutions. Connect with our team today.",
    images: [siteMetadata.socialBanner],
    creator: "@hushh_ai",
    site: "@hushh_ai",
  },
};

// Create structured data for contact page
const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact Hushh",
  "description": "Reach out to Hushh for inquiries about data privacy solutions, support, or partnership opportunities.",
  "url": "https://www.hushh.ai/contact-us",
  "mainEntity": {
    "@type": "Organization",
    "name": "Hushh AI",
    "url": "https://www.hushh.ai",
    "logo": siteMetadata.siteLogo,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-800-HUSHH-AI",
      "contactType": "customer service",
      "email": "support@hushh.ai",
      "availableLanguage": ["English"]
    }
  }
};

// Create breadcrumb schema
const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "https://www.hushh.ai" },
  { name: "Contact Us", url: "https://www.hushh.ai/contact-us" }
]);

export default function ContactUs() {
  return (
    <>
      {/* Add structured data */}
      <StructuredData data={contactPageSchema} />
      <StructuredData data={breadcrumbSchema} />
      
      <Box display={'flex'}>
        <Container minW={'100%'} textAlign={'center'} display={'flex'} flexDirection={'column'} mt={{ md:'4rem', base:'2rem'}}>
          <Heading 
            as={'h1'} 
            className='gradient' 
            my={{md:'2rem',base:'1rem'}}
          >
            Reach out to us
          </Heading>
          <ContactForm/>
        </Container>
      </Box> 
    </>
  );
}
