'use client'
import React from 'react'
import { Container, Box, Heading } from '@chakra-ui/react'
import ContactForm from '../_components/features/contactForm'
import Head from 'next/head'
import { siteMetadata } from '../sitemetadata'

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

const ContactUs = () => {
  return (
  <>
  <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageJsonLd) }}
      />
   <Head>
        <title>Contact Us - hushh.ai | Get in Touch with Our Team</title>
        <meta
          name="description"
          content="Reach out to hushh.ai for inquiries, support, or feedback. Connect with our team today for a personalized experience and discover innovative solutions tailored to your needs."
        />
        <meta
          name="keywords"
          content="contact us, hushh, hushh.ai, customer support, inquiries, get in touch, innovative solutions"
        />
          <link rel="canonical" href="https://hushh.ai/contact-us" />
          <meta property="og:title" content="Contact Us - hushh.ai | Get in Touch with Our Team" />
          <meta
    property="og:description"
    content="Reach out to hushh.ai for inquiries, support, or feedback. Connect with our team today for a personalized experience and discover innovative solutions tailored to your needs."
  />
    <meta property="og:url" content="https://hushh.ai/contact-us" />
    {/* <meta property="og:image" content="/path/to/contact-us-og-image.jpg" /> */}

      </Head>
    <Box display={'flex'}>
     <Container minW={'100%'} textAlign={'center'} display={'flex'} flexDirection={'column'} mt={{ md:'4rem', base:'2rem'}}>
        <Heading as={'h1'} className='gradient' my={{md:'2rem',base:'1rem'}}>Reach out to us</Heading>
        <ContactForm/>
     </Container>
     </Box> 
  </>
)
}

export default ContactUs;


