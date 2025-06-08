'use client'
import React from 'react'
import { Container, Box, Heading, Text } from '@chakra-ui/react' // Added Text
import ContactForm from '../_components/features/contactForm'
// import Head from 'next/head'; // Removed deprecated Head component
import { siteMetadata } from '../sitemetadata'

// ContactPage JSON-LD structured data
const contactPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact Hushh.ai", // Updated
  "description": "Contact page for Hushh.ai, a company specializing in user-controlled data platforms and AI-powered personalization.", // Updated
  "url": "https://www.hushh.ai/contact-us",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-425-296-9050", // Consistent phone number
    "contactType": "customer service", // Or "sales", "technical support"
    "areaServed": "US", // Or more specific if applicable
    "availableLanguage": "English",
    "email": "info@hush1one.com" // Added email
  },
  // Address can be added if it's a public contact point, same as Organization schema
  // "address": {
  //   "@type": "PostalAddress",
  //   "streetAddress": "1021 5th St W",
  //   "addressLocality": "Kirkland",
  //   "addressRegion": "WA",
  //   "postalCode": "98033",
  //   "addressCountry": "US"
  // }
};

const ContactUsClient = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageJsonLd) }}
      />
      <Box display={'flex'} pt={{ base: "2rem", md: "4rem" }} pb={{ base: "2rem", md: "4rem" }}> {/* Added padding top/bottom */}
        <Container minW={'100%'} textAlign={'center'} display={'flex'} flexDirection={'column'} >
          <Heading as={'h1'} size="2xl" className='gradient' my={{md:'1rem',base:'0.5rem'}}> {/* Updated H1 text & size */}
            Contact Hushh.ai
          </Heading>
          <Text fontSize="lg" mb={{md:'2rem',base:'1.5rem'}} px={{ base: "1rem", md: "2rem" }}> {/* Added introductory paragraph */}
            We&apos;re here to help with your questions about our data privacy solutions,
            user data platforms, AI-powered personalization tools, or any other inquiries.
            Please use the form below or reach out via our provided contact details.
          </Text>
          <ContactForm/>
        </Container>
      </Box> 
    </>
  )
}

export default ContactUsClient; 