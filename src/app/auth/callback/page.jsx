"use client";
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  Spinner, 
  Button, 
  VStack, 
  Alert, 
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Icon,
  Card,
  CardBody,
  Badge,
  HStack,
  keyframes,
  useColorModeValue
} from '@chakra-ui/react';
import { FiCheckCircle, FiAlertTriangle, FiArrowRight } from 'react-icons/fi';
import { motion } from 'framer-motion';
import config from '../../../lib/config/config';

const MotionBox = motion(Box);
const MotionCard = motion(Card);

// Keyframe animations
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const router = useRouter();
  const [verificationStatus, setVerificationStatus] = useState('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const [countdown, setCountdown] = useState(5);

  // Color mode values
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'gray.300');
  const headingColor = useColorModeValue('gray.800', 'white');

  useEffect(() => {
    const handleEmailVerification = async () => {
      try {
        // Check for any type and error from the URL
        const type = searchParams.get('type');
        const error = searchParams.get('error');
        const errorDescription = searchParams.get('error_description');
        
        // If there's an error, display it
        if (error) {
          setVerificationStatus('error');
          setErrorMessage(errorDescription || 'An error occurred during verification');
          return;
        }
        
        // If it's a signup confirmation or any other successful auth
        if (type === 'signup' || type === 'recovery' || type === 'invite') {
          // Get the access token and refresh token from the URL
          const accessToken = searchParams.get('access_token');
          const refreshToken = searchParams.get('refresh_token');
          
          if (!accessToken || !refreshToken) {
            setVerificationStatus('error');
            setErrorMessage('Missing authentication tokens');
            return;
          }
          
          // Set the session with Supabase
          const { error } = await config.supabaseClient?.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken
          });
          
          if (error) {
            setVerificationStatus('error');
            setErrorMessage(error.message);
            return;
          }
          
          // Verification successful
          setVerificationStatus('success');
        } else {
          // Handle other auth types or default success
          setVerificationStatus('success');
        }
      } catch (err) {
        console.error('Verification error:', err);
        setVerificationStatus('error');
        setErrorMessage('An unexpected error occurred');
      }
    };
    
    handleEmailVerification();
  }, [searchParams]);

  // Countdown timer for auto-redirect
  useEffect(() => {
    if (verificationStatus === 'success') {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            router.push('/user-registration');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [verificationStatus, router]);

  const redirectToLogin = () => {
    router.push('/login');
  };

  const redirectToRegistration = () => {
    router.push('/user-registration');
  };

  const redirectToHome = () => {
    router.push('/');
  };

  // Loading state
  if (verificationStatus === 'loading') {
    return (
      <Box
        minH="100vh"
        bg={bgColor}
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={4}
      >
        <Container maxW="md">
          <MotionCard
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            bg={cardBg}
            boxShadow="xl"
            borderRadius="2xl"
            overflow="hidden"
          >
            <CardBody p={12}>
              <VStack spacing={8} textAlign="center">
                <Box
                  w="80px"
                  h="80px"
                  bg="blue.500"
                  borderRadius="50%"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  animation={`${float} 3s ease-in-out infinite`}
                >
                  <Spinner size="lg" color="white" />
                </Box>
                <VStack spacing={4}>
                  <Heading size="lg" color={headingColor} fontFamily="Inter, sans-serif">
                    Verifying Your Account
                  </Heading>
                  <Text color={textColor} fontSize="md">
                    Please wait while we verify your authentication...
                  </Text>
                </VStack>
              </VStack>
            </CardBody>
          </MotionCard>
        </Container>
      </Box>
    );
  }

  // Success state
  if (verificationStatus === 'success') {
    return (
      <Box
        minH="100vh"
        bg={bgColor}
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={4}
      >
        <Container maxW="md">
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            bg={cardBg}
            boxShadow="xl"
            borderRadius="2xl"
            overflow="hidden"
          >
            <CardBody p={12}>
              <VStack spacing={8} textAlign="center">
                <Box
                  w="80px"
                  h="80px"
                  bg="green.500"
                  borderRadius="50%"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  animation={`${pulse} 2s ease-in-out infinite`}
                >
                  <Icon as={FiCheckCircle} fontSize="2xl" color="white" />
                </Box>
                <VStack spacing={4}>
                  <Badge colorScheme="green" size="lg" borderRadius="full" px={4} py={2}>
                    Authentication Successful
                  </Badge>
                  <Heading size="lg" color={headingColor} fontFamily="Inter, sans-serif">
                    Welcome to Hushh!
                  </Heading>
                  <Text color={textColor} fontSize="md" maxW="400px">
                    Your account has been successfully verified. You'll be redirected to complete your profile setup.
                  </Text>
                </VStack>
                
                <VStack spacing={4} w="full">
                  <Alert status="info" borderRadius="lg" bg="blue.50" border="1px" borderColor="blue.200">
                    <AlertIcon />
                    <Box flex="1">
                      <AlertTitle fontSize="sm">Auto-redirect in {countdown} seconds</AlertTitle>
                      <AlertDescription fontSize="xs">
                        Taking you to the registration page...
                      </AlertDescription>
                    </Box>
                  </Alert>
                  
                  <HStack spacing={4} w="full">
                    <Button
                      onClick={redirectToRegistration}
                      colorScheme="blue"
                      size="lg"
                      flex={1}
                      rightIcon={<FiArrowRight />}
                      _hover={{
                        transform: "translateY(-2px)",
                        boxShadow: "lg",
                      }}
                      _active={{
                        transform: "translateY(0)",
                      }}
                      transition="all 0.2s"
                    >
                      Continue Setup
                    </Button>
                    <Button
                      onClick={redirectToHome}
                      variant="outline"
                      size="lg"
                      flex={1}
                      _hover={{
                        transform: "translateY(-2px)",
                        boxShadow: "md",
                      }}
                      _active={{
                        transform: "translateY(0)",
                      }}
                      transition="all 0.2s"
                    >
                      Go Home
                    </Button>
                  </HStack>
                </VStack>
              </VStack>
            </CardBody>
          </MotionCard>
        </Container>
      </Box>
    );
  }

  // Error state
  return (
    <Box
      minH="100vh"
      bg={bgColor}
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      <Container maxW="md">
        <MotionCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          bg={cardBg}
          boxShadow="xl"
          borderRadius="2xl"
          overflow="hidden"
        >
          <CardBody p={12}>
            <VStack spacing={8} textAlign="center">
              <Box
                w="80px"
                h="80px"
                bg="red.500"
                borderRadius="50%"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Icon as={FiAlertTriangle} fontSize="2xl" color="white" />
              </Box>
              <VStack spacing={4}>
                <Badge colorScheme="red" size="lg" borderRadius="full" px={4} py={2}>
                  Verification Failed
                </Badge>
                <Heading size="lg" color={headingColor} fontFamily="Inter, sans-serif">
                  Authentication Error
                </Heading>
                <Text color={textColor} fontSize="md" maxW="400px">
                  {errorMessage || 'There was an error verifying your account. Please try again.'}
                </Text>
              </VStack>
              
              <VStack spacing={4} w="full">
                <Alert status="error" borderRadius="lg">
                  <AlertIcon />
                  <Box flex="1">
                    <AlertTitle fontSize="sm">Need Help?</AlertTitle>
                    <AlertDescription fontSize="xs">
                      Contact support if this problem persists.
                    </AlertDescription>
                  </Box>
                </Alert>
                
                <HStack spacing={4} w="full">
                  <Button
                    onClick={redirectToLogin}
                    colorScheme="blue"
                    size="lg"
                    flex={1}
                    _hover={{
                      transform: "translateY(-2px)",
                      boxShadow: "lg",
                    }}
                    _active={{
                      transform: "translateY(0)",
                    }}
                    transition="all 0.2s"
                  >
                    Try Again
                  </Button>
                  <Button
                    onClick={redirectToHome}
                    variant="outline"
                    size="lg"
                    flex={1}
                    _hover={{
                      transform: "translateY(-2px)",
                      boxShadow: "md",
                    }}
                    _active={{
                      transform: "translateY(0)",
                    }}
                    transition="all 0.2s"
                  >
                    Go Home
                  </Button>
                </HStack>
              </VStack>
            </VStack>
          </CardBody>
        </MotionCard>
      </Container>
    </Box>
  );
};

export default AuthCallback; 