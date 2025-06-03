'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  Flex, 
  Text, 
  Button, 
  Container,
  Input,
  HStack,
  InputGroup,
  InputLeftElement,
  Icon,
} from '@chakra-ui/react';
import { FaArrowRight, FaEnvelope } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import bgImage from '../../../../public/Images/bg-image-login.png';

// Define animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const EmailVerificationPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const router = useRouter();
  const inputRefs = Array(6).fill(0).map(() => useRef(null));
  
  // Check for device size on client side
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    setIsLoaded(true);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isLoaded) {
    return null; // Prevent layout shift during hydration
  }

  // Handle OTP input change
  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-focus next input field
    if (value && index < 5) {
      inputRefs[index + 1].current.focus();
    }
  };

  // Handle backspace key
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  // Handle verify button click
  const handleContinue = () => {
    // Navigate to dashboard or home page
    router.push('/dashboard');
  };

  // On mobile, we show just the verification form with minimal design
  if (isMobile) {
    return (
      <Flex 
        minH="100vh" 
        width="100%" 
        justifyContent="flex-start" 
        alignItems="center"
        bg="white"
        p={0}
        pt={12}
        direction="column"
      >
        <Box width="100%" px={6} pt={10} pb={6}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <Box mb={4} textAlign="left" mt={10} width="100%">
              <Text 
                fontSize="2xl" 
                fontWeight="bold" 
                lineHeight="1.2"
              >
                Email Verification
              </Text>
              <Text fontSize="sm" color="gray.600" mt={1}>
                Please enter your details
              </Text>
            </Box>

            <Box mb={8}>
              <Flex mb={8} flexDirection={{base: 'column', md: 'row'}} justifyContent="space-between" alignItems="center">
                <InputGroup size="lg" width="100%">
                  <InputLeftElement pointerEvents="none" height="100%">
                    <Icon as={FaEnvelope} color="gray.500" />
                  </InputLeftElement>
                  <Input
                    placeholder="Please enter your Email-id"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    bg="gray.100"
                    border="none"
                    _placeholder={{ color: 'gray.500' }}
                    _focus={{ boxShadow: "none", bg: "gray.200" }}
                    height="48px"
                    borderRadius="md"
                  />
                </InputGroup>
                <Button
                  variant="ghost"
                  color="black"
                  fontWeight="medium"
                  fontSize="sm"
                  _hover={{ bg: "transparent", textDecoration: "underline" }}
                  height="auto"
                  py={0}
                >
                  Verify yourself
                </Button>
              </Flex>

              <Box mb={6}>
                <Text mb={4} fontWeight="medium" fontSize="sm">Please enter the OTP you received:</Text>
                
                <HStack spacing={2} justifyContent="space-between" width="100%">
                  {otp.map((digit, index) => (
                    <Box
                      key={index}
                      borderWidth="1px"
                      borderColor="gray.200"
                      borderRadius="md"
                      width="45px"
                      height="45px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      bg="gray.50"
                    >
                      <Input
                        ref={inputRefs[index]}
                        type="tel"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        width="100%"
                        height="100%"
                        textAlign="center"
                        fontSize="lg"
                        border="none"
                        _focus={{ boxShadow: "none" }}
                        variant="unstyled"
                      />
                    </Box>
                  ))}
                </HStack>
              </Box>

              <Text 
                textAlign="center" 
                color="gray.500" 
                fontSize="xs" 
                mb={12}
                cursor="pointer"
                _hover={{ textDecoration: "underline" }}
              >
                Didn't Receive the Code? Send it Again
              </Text>

              <Box textAlign="center">
                <Button
                  rightIcon={<FaArrowRight />}
                  bg="black"
                  color="white"
                  borderRadius="full"
                  size="md"
                  width="70%"
                  height="48px"
                  _hover={{ bg: "gray.800" }}
                  fontSize="sm"
                  onClick={handleContinue}
                >
                  Continue
                </Button>
              </Box>
            </Box>
          </motion.div>
        </Box>
      </Flex>
    );
  }

  // On desktop, we show the split screen layout
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
          padding="16"
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
                fontSize="6xl" 
                fontWeight="bold" 
                mb={2}
                lineHeight="1.1"
              >
                Welcome to Hushh
              </Text>
              <Text 
                fontSize="xl" 
                mb={12}
              >
                Where Your Privacy is of Value.
              </Text>
            </Box>
          </motion.div>
        </Flex>
      </Box>

      {/* Verification Form Section */}
      <Flex 
        width="50%" 
        flexDirection="column" 
        justifyContent="center" 
        alignItems="center"
        bg="white"
        p={8}
      >
        <EmailVerificationForm 
          email={email}
          setEmail={setEmail}
          otp={otp}
          inputRefs={inputRefs}
          handleOtpChange={handleOtpChange}
          handleKeyDown={handleKeyDown}
          handleContinue={handleContinue}
          isMobile={isMobile}
        />
      </Flex>
    </Flex>
  );
};

// Extracted verification form component for reuse (for desktop only)
const EmailVerificationForm = ({ email, setEmail, otp, inputRefs, handleOtpChange, handleKeyDown, handleContinue, isMobile }) => {
  return (
    <Container maxW={isMobile ? "100%" : "md"} px={isMobile ? 4 : 6}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <Box mb={8} textAlign="left">
          <Text 
            fontSize={isMobile ? "2xl" : "3xl"} 
            fontWeight="bold" 
            mb={2}
            lineHeight="1.2"
          >
            Email Verification
          </Text>
          <Text fontSize="md" color="gray.600">
            Please enter your details
          </Text>
        </Box>

        <Box mb={8}>
          <Flex mb={6} justifyContent="space-between" alignItems="center">
            <InputGroup size="md" width={isMobile ? "70%" : "75%"}>
              <InputLeftElement pointerEvents="none">
                <Icon as={FaEnvelope} color="gray.400" />
              </InputLeftElement>
              <Input
                placeholder="Please enter your Email-id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                bg="gray.100"
                border="none"
                _placeholder={{ color: 'gray.500' }}
                _focus={{ boxShadow: "none", bg: "gray.200" }}
                height="50px"
              />
            </InputGroup>
            <Button
              variant="ghost"
              color="black"
              fontWeight="medium"
              _hover={{ bg: "transparent", textDecoration: "underline" }}
            >
              Verify yourself
            </Button>
          </Flex>

          <Box mb={6}>
            <Text mb={4} fontWeight="medium">Please enter the OTP you received:</Text>
            
            <HStack spacing={isMobile ? 2 : 3} justifyContent="space-between">
              {otp.map((digit, index) => (
                <Box
                  key={index}
                  borderWidth="1px"
                  borderColor="gray.200"
                  borderRadius="md"
                  width="48px"
                  height="48px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  bg="gray.50"
                >
                  <Input
                    ref={inputRefs[index]}
                    type="tel"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    width="100%"
                    height="100%"
                    textAlign="center"
                    fontSize="xl"
                    border="none"
                    _focus={{ boxShadow: "none" }}
                    variant="unstyled"
                  />
                </Box>
              ))}
            </HStack>
          </Box>

          <Text 
            textAlign="center" 
            color="gray.500" 
            fontSize="sm" 
            mb={8}
            cursor="pointer"
            _hover={{ textDecoration: "underline" }}
          >
            Didn't Receive the Code? Send it Again
          </Text>
        </Box>

        <Box textAlign="center">
          <Button
            rightIcon={<FaArrowRight />}
            bg="black"
            color="white"
            borderRadius="full"
            size="lg"
            width={isMobile ? "100%" : "240px"}
            height="56px"
            _hover={{ bg: "gray.800" }}
            fontSize="md"
            onClick={handleContinue}
          >
            Continue
          </Button>
        </Box>
      </motion.div>
    </Container>
  );
};

export default EmailVerificationPage; 