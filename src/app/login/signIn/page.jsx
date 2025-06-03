'use client';

import React from 'react';
import { Box, Flex, Text, Button, VStack, Icon, Container, useToast } from '@chakra-ui/react';
import { FaApple, FaPhone, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import authentication from '../../_components/authentication/authentication';

const SignInPage = () => {
  const router = useRouter();
  const toast = useToast();

  // Handle phone login
  const handlePhoneLogin = () => {
    router.push('/login/phone-verification');
  };

  // Handle Apple login
  const handleAppleLogin = async () => {
    try {
      await authentication.appleSignIn();
      toast({
        title: "Apple Sign-In Successful",
        description: "You have been signed in with Apple.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      router.push('/dashboard');
    } catch (error) {
      toast({
        title: "Apple Sign-In Error",
        description: error.message || "An error occurred during sign in",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Handle sign up / join experience
  const handleJoinExperience = () => {
    router.push('/login/signUp');
  };

  return (
    <Container 
      maxW="100%" 
      p={0} 
      h="100vh" 
      display="flex" 
      flexDirection="column" 
      justifyContent="flex-start"
      bg="white"
    >
      {/* Header section - adjusted spacing */}
      <Box  px={6} mb={8}>
        <Text 
          fontSize="28px" 
          fontWeight="700" 
          lineHeight="1.2"
          pt={'5.75rem'}
        >
          Login
        </Text>
        <Text 
          fontSize="16px" 
          fontWeight="400" 
          color="gray.700"
          mt={1}
        >
          Unlock the Power of Your Data
        </Text>
      </Box>

      {/* Main content - Login options with adjusted spacing */}
      <VStack 
        spacing={4} 
        px={6} 
        align="stretch" 
        w="100%"
        mb="auto"
      >
        {/* Phone Login Button - adjusted styling */}
        <Button
          leftIcon={<Icon as={FaPhone} color="black" boxSize="16px" />}
          size="lg"
          height="48px"
          bg="gray.100"
          color="black"
          borderRadius="md"
          _hover={{ bg: 'gray.200' }}
          justifyContent="flex-start"
          pl={4}
          fontWeight="400"
          fontSize="14px"
          onClick={handlePhoneLogin}
        >
          Continue with Phone
        </Button>

        {/* Apple ID Login Button - adjusted styling */}
        <Button
          leftIcon={<Icon as={FaApple} boxSize="18px" />}
          size="lg"
          height="48px"
          bg="black"
          color="white"
          borderRadius="md"
          _hover={{ bg: 'gray.800' }}
          justifyContent="flex-start"
          pl={4}
          fontWeight="400"
          fontSize="14px"
          onClick={handleAppleLogin}
        >
          Continue with Apple ID
        </Button>
      </VStack>

      {/* Join Experience Button - centered in page with proper spacing */}
      <Flex 
        direction="column" 
        align="center" 
        w="100%" 
        mt="auto"
        mb={4}
      >
        <Button
          rightIcon={<Icon as={FaArrowRight} boxSize="14px" />}
          size="md"
          height="40px"
          bg="black"
          color="white"
          borderRadius="full"
          _hover={{ bg: 'gray.800' }}
          width="fit-content"
          px={5}
          fontSize="14px"
          fontWeight="500"
          onClick={handleJoinExperience}
        >
          Join the Experience
        </Button>
      </Flex>

      {/* Legal text - adjusted styling and links */}
      <Box px={8} pb={6} w="100%">
        <Text fontSize="10px" color="gray.600" textAlign="center" lineHeight="1.4">
          By entering information, I agree to Hushh's{' '}
          <Link href="/terms" passHref>
            <Text as="span" color="red.500" textDecoration="none">Terms of Service</Text>
          </Link>
          ,{' '}
          <Link href="/non-discrimination" passHref>
            <Text as="span" color="red.500" textDecoration="none">Non-discrimination Policy</Text>
          </Link>
          {' '}and{' '}
          <Link href="/payments-terms" passHref>
            <Text as="span" color="red.500" textDecoration="none">Payments Terms of Service</Text>
          </Link>
          {' '}and acknowledge the{' '}
          <Link href="/privacy" passHref>
            <Text as="span" color="red.500" textDecoration="none">Privacy Policy</Text>
          </Link>
          .
        </Text>
      </Box>
    </Container>
  );
};

export default SignInPage;