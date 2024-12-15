'use client'
import React from 'react'
import { Container, Box } from '@chakra-ui/react'
import ContactForm from '../_components/features/contactForm'

const ContactUs = () => {
  return (
  <>
    <Box display={'flex'}>
     <Container minW={'100%'}  mt={{ md:'4rem', base:'2rem'}}>
        <ContactForm/>
     </Container>
     </Box> 
  </>
)
}

export default ContactUs;
