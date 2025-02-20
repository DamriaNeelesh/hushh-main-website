'use client'
import React from 'react'
import { Container, Box } from '@chakra-ui/react'
import ContactForm from '../_components/features/contactForm'
import Head from 'next/head'

const ContactUs = () => {
  return (
  <>
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
     <Container minW={'100%'}  mt={{ md:'4rem', base:'2rem'}}>
        <ContactForm/>
     </Container>
     </Box> 
  </>
)
}

export default ContactUs;
