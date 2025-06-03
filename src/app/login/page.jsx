'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import bgImage from '../../../public/Images/bg-image-login.png';
import { Box, Flex, Text, Button, Container, Icon, VStack } from '@chakra-ui/react';
import { FaApple, FaPhone, FaArrowRight, FaGoogle } from 'react-icons/fa';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

// Define animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const LoginPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [mobileViewType, setMobileViewType] = useState('windowsMosaic'); // or 'letsConnect'
  const router = useRouter();
  
  // Check for device size on client side
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    setIsLoaded(true);
    
    // For demonstration purposes, let's toggle between the two mobile views
    // In a real app, you'd make this decision based on user context or A/B testing
    const urlParams = new URLSearchParams(window.location.search);
    const viewType = urlParams.get('view');
    if (viewType === 'connect') {
      setMobileViewType('letsConnect');
    }
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isLoaded) {
    return null; // Prevent layout shift during hydration
  }

  // Render appropriate layout based on device
  if (isMobile) {
    return mobileViewType === 'windowsMosaic' ? 
      <MobileLoginView /> : 
      <MobileConnectView />;
  } else {
    return <DesktopLoginView isTablet={isTablet} />;
  }
};

// Mobile-specific login view with windows mosaic background
const MobileLoginView = () => {
  const router = useRouter();
  
  const handlePhoneLogin = () => {
    router.push('/login/phone-verification');
  };

  const handleSignIn = () => {
    router.push('/login/signIn');
  };
  
  return (
    <Box position="relative" minH="100vh" width="100%">
      {/* Background Image */}
      <Box 
        position="absolute" 
        top={0} 
        left={0} 
        right={0} 
        bottom={0}
        zIndex={0}
        sx={{
          '&::after': {
            content: '""',
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: '40%',
            background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 100%)',
            zIndex: 1,
            pointerEvents: 'none',
          }
        }}
      >
        <Image
          src={bgImage}
          alt="Hushh Login Background"
          priority
          fill
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
            filter: 'blur(20px)',
          }}
        />
      </Box>
      
      {/* Content */}
      <Flex
        position="relative"
        direction="column"
        minH="100vh"
        zIndex={1}
        justifyContent="space-between"
        pt={10}
        pb={6}
      >
        {/* Logo area */}
        <Flex justify="center" mb={6}>
          <Box width="50px" height="50px">
            <svg viewBox="0 0 120 120" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M60 0C26.9 0 0 26.9 0 60C0 93.1 26.9 120 60 120C93.1 120 120 93.1 120 60C120 26.9 93.1 0 60 0ZM60 40C71 40 80 49 80 60C80 71 71 80 60 80C49 80 40 71 40 60C40 49 49 40 60 40ZM23.3 88.3C30.6 100.4 44.3 108 60 108C75.7 108 89.4 100.4 96.7 88.3C89.4 81.7 75.7 78 60 78C44.3 78 30.6 81.7 23.3 88.3ZM96.7 31.7C89.4 19.6 75.7 12 60 12C44.3 12 30.6 19.6 23.3 31.7C30.6 38.3 44.3 42 60 42C75.7 42 89.4 38.3 96.7 31.7ZM17 60C17 44.3 24.6 30.6 36.7 23.3C31.7 30.6 28 44.3 28 60C28 75.7 31.7 89.4 36.7 96.7C24.6 89.4 17 75.7 17 60ZM83.3 23.3C95.4 30.6 103 44.3 103 60C103 75.7 95.4 89.4 83.3 96.7C88.3 89.4 92 75.7 92 60C92 44.3 88.3 30.6 83.3 23.3Z" />
            </svg>
          </Box>
        </Flex>
        
        {/* Main content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '0 1.5rem',
          }}
        >
          <Box textAlign="center" color="#FFFFFF" mb={16}>
            <Text 
              fontSize="5xl" 
              fontWeight="600" 
              mb={2}
              lineHeight="1.1"
              letterSpacing={'-1%'}
            >
              Welcome to Hushh
            </Text>
            <Text fontSize="xl" mb={4} fontWeight={'400'} letterSpacing={'-1%'}>
              Where Your Privacy is of Value.
            </Text>
          </Box>
        </motion.div>
        
        {/* Bottom buttons & legal */}
        <Box px={4}>
          {/* Sign In Button */}
          <Button
            bg="transparent" 
            color="white"
            borderRadius="full"
            size="lg"
            width="100%"
            height="60px"
            border="2px solid white"
            _hover={{ bg: "rgba(255,255,255,0.1)" }}
            fontSize="lg"
            mb={4}
            onClick={handleSignIn}
          >
            Sign In
          </Button>
          
          {/* Join Experience Button */}
          <Link href="/signup">
            <Button 
              rightIcon={<FaArrowRight />}
              bg="white" 
              color="black"
              borderRadius="full"
              size="lg"
              width="100%"
              height="60px"
              _hover={{ bg: "gray.100" }}
              fontSize="lg"
              mb={6}
              onClick={handlePhoneLogin}
            >
              Join the Experience
            </Button>
          </Link>
          
          <Box textAlign="center" fontSize="xs" color="white" mt={4} opacity={0.8}>
            <Text>
              By entering information, I agree to Hushh's Terms of Service, Non-discrimination Policy and Payments Terms of Service and acknowledge the Privacy Policy.
            </Text>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

// Mobile-specific login view with Let's Connect and Adam imagery
const MobileConnectView = () => {
  const router = useRouter();
  
  const handlePhoneLogin = () => {
    router.push('/login/phone-verification');
  };

  const handleSignIn = () => {
    router.push('/login/signIn');
  };
  
  return (
    <Box 
      position="relative" 
      minH="100vh" 
      width="100%" 
      bg="white"
      background="linear-gradient(180deg, rgba(238,238,238,1) 0%, rgba(255,255,255,1) 100%)"
      // Use an image if available or use a gradient
      // backgroundImage="url('/Images/connect-bg.png')"
      // backgroundSize="cover"
      // backgroundPosition="center"
    >
      {/* Adam and God hands illustration - this is a placeholder for the creation hands illustration */}
      <Box 
        position="absolute"
        top="50%"
        left="0"
        right="0"
        height="200px"
        opacity={0.2}
        zIndex={0}
        pointerEvents="none"
        sx={{
          background: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg/1920px-Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg')",
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "contrast(1.2) brightness(0.9)",
        }}
      />

      {/* Content */}
      <Flex
        position="relative"
        direction="column"
        minH="100vh"
        justifyContent="space-between"
        pt={10}
        pb={6}
        zIndex={1}
      >
        {/* Top area - LETS CONNECT */}
        <Box px={8} pt={8}>
          <Text 
            fontSize="4xl" 
            fontWeight="bold" 
            letterSpacing="wider"
            textAlign="center"
            color="black"
          >
            LET'S<br />CONNECT
          </Text>
        </Box>
        
        {/* Main content */}
        <Box px={6}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <VStack spacing={6} align="stretch">
              <Box textAlign="left">
                <Text fontSize="4xl" fontWeight="bold" mb={2} lineHeight="1.1">
                  Welcome to Hushh
                </Text>
                <Text fontSize="lg" mb={6}>
                  Unlock the Power of Your Data
                </Text>
              </Box>
              
              <Button
                leftIcon={<FaGoogle />}
                width="100%"
                height="60px"
                bg="gray.100"
                color="black"
                _hover={{ bg: "gray.200" }}
                borderRadius="md"
                fontSize="md"
                fontWeight="normal"
                justifyContent="flex-start"
                px={6}
                mb={2}
              >
                Continue with Google
              </Button>
              
              <Button
                leftIcon={<FaPhone />}
                width="100%"
                height="60px"
                bg="black"
                color="white"
                _hover={{ bg: "gray.800" }}
                borderRadius="md"
                fontSize="md"
                fontWeight="normal"
                justifyContent="flex-start"
                px={6}
                onClick={handlePhoneLogin}
              >
                Continue with Phone
              </Button>
            </VStack>
          </motion.div>

          {/* Actions */}
          <VStack spacing={4} mt={8}>
            {/* Sign In Button */}
            <Button
              bg="transparent" 
              color="black"
              borderRadius="full"
              size="lg"
              width="100%"
              height="60px"
              border="2px solid black"
              _hover={{ bg: "rgba(0,0,0,0.05)" }}
              fontSize="lg"
              onClick={handleSignIn}
            >
              Sign In
            </Button>
            
            <Button
              colorScheme="black"
              bg="black"
              color="white"
              size="lg"
              width="100%"
              height="60px"
              borderRadius="full"
              _hover={{ bg: "gray.800" }}
              onClick={handlePhoneLogin}
            >
              Join Now
            </Button>
          </VStack>
        </Box>
        
        {/* Legal text */}
        <Box px={6} mt={6}>
          <Box textAlign="center" fontSize="xs" color="gray.500">
            <Text>
              By entering information, I agree to Hushh's <Text as="span" color="red.500">Terms of Service</Text>, <Text as="span" color="red.500">Non-discrimination Policy</Text> and <Text as="span" color="red.500">Payments Terms of Service</Text> and acknowledge the <Text as="span" color="red.500">Privacy Policy</Text>.
            </Text>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

// Desktop/Tablet login view
const DesktopLoginView = ({ isTablet }) => {
  const router = useRouter();
  
  const handlePhoneLogin = () => {
    router.push('/login/phone-verification');
  };
  
  const handleSignIn = () => {
    router.push('/login/signIn');
  };
  
  return (
    <Flex 
      minH="100vh" 
      width="100%" 
      position="relative" 
      flexDirection="row"
      overflow="hidden"
    >
      {/* Background Image Section */}
      <Box 
        position="relative" 
        width="50%" 
        minH="100vh"
        sx={{
            '&::after': {
              content: '""',
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: '40%',
            //   background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 100%)',
              zIndex: 1,
              pointerEvents: 'none',
            }
          }}
      >
        <Image
          src={bgImage}
          alt="Hushh Login Background"
          priority
          fill
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
            filter: 'blur(5px)',
          }}
        />
        
        {/* Overlay text on background */}
        <Flex
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          flexDirection="column"
          justifyContent="center"
          alignItems="flex-start"
          padding={isTablet ? "8" : "16"}
          zIndex={1}
          color="white"
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <Box textAlign="center">
              <Text 
                fontSize={isTablet ? "5xl" : "6xl"} 
                fontWeight="bold" 
                mb={2}
                lineHeight="1.1"
              >
                Welcome to Hushh
              </Text>
              <Text 
                fontSize={isTablet ? "lg" : "xl"} 
                mb={12}
              >
                Where Your Privacy is of Value.
              </Text>
            </Box>
          </motion.div>
        </Flex>
      </Box>

      {/* Login Form Section */}
      <Flex 
        width="50%" 
        flexDirection="column" 
        justifyContent="center" 
        alignItems="center"
        bg="white"
        p={isTablet ? 6 : 8}
      >
        <Container maxW="md">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <Box mb={12} textAlign="left" width="100%">
              <Text fontSize={isTablet ? "3xl" : "4xl"} letterSpacing={'-1%'} fontWeight="600" mb={1}>
                Login
              </Text>
              <Text fontSize={isTablet ? "lg" : "xl"} fontWeight={'400'}>
                Unlock the Power of Your Data
              </Text>
            </Box>

            <Flex direction="column" gap={4}>
              <Button
                leftIcon={<FaPhone />}
                width="100%"
                height="60px"
                bg="gray.100"
                color="black"
                _hover={{ bg: "gray.200" }}
                borderRadius="15px"
                fontSize="md"
                fontWeight="normal"
                justifyContent="flex-start"
                px={6}
                onClick={handlePhoneLogin}
              >
                Continue with Phone
              </Button>
              
              <Button
                leftIcon={<FaApple />}
                width="100%"
                height="60px"
                bg="black"
                color="white"
                _hover={{ bg: "gray.800" }}
                borderRadius="15px"
                fontSize="md"
                fontWeight="normal"
                justifyContent="flex-start"
                px={6}
              >
                Continue with Apple
              </Button>

              <Button
                rightIcon={<FaArrowRight />}
                width="auto"
                height="50px"
                bg="transparent"
                color="black"
                border="2px solid black"
                _hover={{ bg: "gray.50" }}
                borderRadius="full"
                fontSize="md"
                fontWeight="500"
                px={8}
                mt={4}
                mx="auto"
                onClick={handleSignIn}
              >
                Sign In
              </Button>
              
              <Box textAlign="center" fontSize="xs" color="gray.500" mt={8}>
                <Text>
                  By entering information, I agree to Hushh's <Text as="span" color="red.500">Terms of Service</Text>, <Text as="span" color="red.500">Non-discrimination Policy</Text> and <Text as="span" color="red.500">Payments Terms of Service</Text> and acknowledge the <Text as="span" color="red.500">Privacy Policy</Text>.
                </Text>
              </Box>
            </Flex>
          </motion.div>
        </Container>
      </Flex>
    </Flex>
  );
};

export default LoginPage;