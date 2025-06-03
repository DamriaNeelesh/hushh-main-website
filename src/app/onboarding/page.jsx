'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import bgImage from '../../../public/Images/bg-image-login.png';
import {
  Box,
  Flex,
  Text,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  FormControl,
  FormLabel,
  Container,
  VStack,
  useBreakpointValue,
  Icon,
  VisuallyHidden,
  useToast,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { FaUser, FaCalendarAlt, FaVideo, FaArrowRight } from 'react-icons/fa';

const OnboardingPage = () => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const toast = useToast();
  const isMobile = useBreakpointValue({ base: true, md: false });

  // Handle file upload
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // Handle form submission (placeholder)
  const handleContinue = (e) => {
    e.preventDefault();
    // Validate fields (simple example)
    if (!name || !dob) {
      toast({ title: 'Please fill in all required fields.', status: 'warning' });
      return;
    }
    // Submit logic here
    toast({ title: 'Onboarding continued!', status: 'success' });
  };

  return (
    <Flex minH="100vh" width="100%" position="relative" flexDirection={{ base: 'column', md: 'row' }} overflow="hidden">
      {/* Left: Background Image & Welcome Text */}
      <Box
        position="relative"
        width={{ base: '100%', md: '50%' }}
        minH={{ base: '200px', md: '100vh' }}
        display={{ base: 'none', md: 'block' }}
      >
        <Image
          src={bgImage}
          alt="Hushh Onboarding Background"
          priority
          fill
          style={{ objectFit: 'cover', objectPosition: 'center', filter: 'blur(5px)' }}
        />
        <Flex
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          flexDirection="column"
          justifyContent="center"
          alignItems="flex-start"
          px={{ md: 16, lg: 24 }}
          zIndex={1}
          color="white"
        >
          <Text fontSize={{ md: '5xl', lg: '6xl' }} fontWeight="bold" mb={2} lineHeight="1.1">
            Welcome to Hushh
          </Text>
          <Text fontSize={{ md: 'xl', lg: '2xl' }} mb={4} fontWeight="400">
            Where Your Privacy is of Value.
          </Text>
        </Flex>
      </Box>

      {/* Right: Onboarding Form */}
      <Flex
        width={{ base: '100%', md: '50%' }}
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        bg="white"
        minH={{ base: '100vh', md: '100vh' }}
        p={{ base: 4, md: 8 }}
      >
        <Container maxW="md" width="100%" py={{ base: 8, md: 0 }}>
          <Box mb={10} textAlign="left" width="100%">
            <Text fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }} fontWeight="700" mb={1} mt={{base:'3rem',md:'0rem'}}>
              Onboarding
            </Text>
            <Text fontSize={{ base: 'md', md: 'lg', lg: 'xl' }} fontWeight="400">
              Please enter your details
            </Text>
          </Box>
          <form onSubmit={handleContinue}>
            <VStack spacing={5} align="stretch">
              {/* Name Field */}
              <FormControl isRequired>
                <InputGroup size="lg">
                  <InputLeftElement pointerEvents="none" height="100%">
                    <Icon as={FaUser} color="#9CA3AF" boxSize={5} />
                  </InputLeftElement>
                  <Input
                    placeholder="Please enter your name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    bg="#F5F5F5"
                    border="none"
                    borderRadius="16px"
                    height="60px"
                    fontSize="16px"
                    fontWeight="400"
                    pl="48px"
                    _placeholder={{ color: '#9CA3AF', fontWeight: '400' }}
                    _focus={{ 
                      boxShadow: 'none', 
                      borderColor: 'transparent',
                      bg: "#F0F0F0"
                    }}
                    _hover={{ bg: "#F0F0F0" }}
                    aria-label="Name"
                  />
                </InputGroup>
              </FormControl>
              {/* DOB Field */}
              <FormControl isRequired>
                <InputGroup size="lg">
                  <InputLeftElement pointerEvents="none" height="100%">
                    <Icon as={FaCalendarAlt} color="#9CA3AF" boxSize={5} />
                  </InputLeftElement>
                  <Input
                    placeholder="Please enter your DOB"
                    value={dob}
                    onChange={e => setDob(e.target.value)}
                    type="date"
                    bg="#F5F5F5"
                    border="none"
                    borderRadius="16px"
                    height="60px"
                    fontSize="16px"
                    fontWeight="400"
                    pl="48px"
                    _placeholder={{ color: '#9CA3AF', fontWeight: '400' }}
                    _focus={{ 
                      boxShadow: 'none', 
                      borderColor: 'transparent',
                      bg: "#F0F0F0"
                    }}
                    _hover={{ bg: "#F0F0F0" }}
                    aria-label="Date of Birth"
                  />
                </InputGroup>
              </FormControl>
              {/* Upload Box */}
              <FormControl>
                <Box
                  border="1.5px dashed #D9D9D9"
                  borderRadius="16px"
                  py={6}
                  px={2}
                  textAlign="center"
                  position="relative"
                  bg="#FAFAFA"
                  cursor="pointer"
                  _hover={{ borderColor: '#BDBDBD' }}
                  as="label"
                  htmlFor="file-upload"
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  minH="110px"
                  transition="border-color 0.2s"
                >
                  <VisuallyHidden>
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*,video/*"
                      onChange={handleFileChange}
                      disabled={isUploading}
                    />
                  </VisuallyHidden>
                  <Icon as={FaVideo} boxSize={7} color="#BDBDBD" mb={1} />
                  <Text fontSize="sm" color="#757575" fontWeight="500" mb={0.5}>
                    Upload a picture/Video of Yourself
                  </Text>
                  <ChakraLink
                    color="#BDBDBD"
                    fontSize="xs"
                    textDecoration="underline"
                    tabIndex={0}
                    lineHeight="1"
                    mt={0}
                    onClick={e => {
                      e.preventDefault();
                      setFile(null);
                    }}
                  >
                    Skip for now?
                  </ChakraLink>
                  {file && (
                    <Text mt={2} fontSize="xs" color="green.500">
                      {file.name}
                    </Text>
                  )}
                </Box>
              </FormControl>
              {/* Connect Email Button */}
              <Button
                mx={'auto'}
                type="button"
                colorScheme="red"
                bg="#F44F3B"
                color="white"
                borderRadius="full"
                size={{md:"lg",base:"md"}}
                width="70%"
                height="56px"
                fontSize="lg"
                fontWeight="600"
                mb={1}
                _hover={{ bg: '#e03e2d' }}
                aria-label="Connect your Email"
                onClick={() => toast({ title: 'Connect Email clicked (demo)', status: 'info' })}
              >
                Connect your Email
              </Button>
              {/* Continue Button */}
              <Button
                type="submit"
                mx={'auto'}
                rightIcon={<FaArrowRight />}
                bg="black"
                color="white"
                borderRadius="full"
                size={{md:"lg",base:"md"}}
                width="70%"
                height="56px"
                fontSize="lg"
                fontWeight="600"
                _hover={{ bg: 'gray.800' }}
                aria-label="Continue"
              >
                Continue
              </Button>
            </VStack>
          </form>
        </Container>
      </Flex>
    </Flex>
  );
};

export default OnboardingPage;