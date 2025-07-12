"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Input,
  Select,
  Textarea,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useToast,
  Spinner,
  Grid,
  GridItem,
  Card,
  CardBody,
  Divider,
  Image,
  Flex,
  Icon,
  Badge,
  useColorModeValue,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";
import { FiUser, FiMail, FiPhone, FiMapPin, FiCalendar, FiEdit3, FiShield, FiClock, FiCheck } from "react-icons/fi";
import { BiUser, BiMale, BiFemale } from "react-icons/bi";
import { IoLocationOutline } from "react-icons/io5";
import { MdWork, MdOutlineWorkOutline } from "react-icons/md";
import Link from "next/link";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionCard = motion(Card);

// API configuration - Using the same API configuration as UserRegistration
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwbXp5a294cW5ib3pnZG9xYnBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE5Mjc5NzEsImV4cCI6MjAxNzUwMzk3MX0.3GwG8YQKwZSWfGgTBEEA47YZAZ-Nr4HiirYPWiZtpZ0";
const API_BASE_URL = "https://rpmzykoxqnbozgdoqbpc.supabase.co/rest/v1";
const API_HEADERS = {
  'apikey': API_KEY,
  'Authorization': `Bearer ${API_KEY}`,
  'Content-Type': 'application/json'
};
const UserRegistration = () => {
  const router = useRouter();
  const { user, session, loading: authLoading } = useAuth();
  const toast = useToast();
  
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingUser, setIsCheckingUser] = useState(false);
  const [error, setError] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  
  // Form fields - Only the ones that can be updated
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userCoins, setUserCoins] = useState(0);
  const [investorType, setInvestorType] = useState("");
  
  // Form fields - Read-only for display purposes in update mode
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [reasonForUsingHushh, setReasonForUsingHushh] = useState("");

  // Form validation states
  const [errors, setErrors] = useState({});

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerChildren = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const childVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  };

  useEffect(() => {
    if (authLoading) return;
    
    if (!user) {
      router.push('/login');
      return;
    }

    if (user?.email) {
      setUserEmail(user.email);
      checkExistingUser(user.email);
    }
  }, [user, authLoading, router]);

  const checkExistingUser = async (email) => {
    try {
      console.log('Checking if user exists:', email);
      setIsCheckingUser(true);
      const response = await fetch(
        `${API_BASE_URL}/users?or=(email.ilike.*${email}*)`,
        { headers: API_HEADERS }
      );
      
      if (response.ok) {
        const data = await response.json();
        console.log('API Response:', data);
        
        if (data && data.length > 0) {
          const userData = data[0];
          console.log('User found, redirecting to profile page:', userData);
          
          // User already exists, redirect to profile page
          toast({
            title: "Welcome back!",
            description: "Your profile already exists. Redirecting to your profile page.",
            status: "info",
            duration: 3000,
            isClosable: true,
          });
          
          setTimeout(() => {
            router.push('/user-profile');
          }, 1500);
        } else {
          console.log('User not found, staying in registration mode');
        }
      } else {
        console.error('API request failed:', response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error checking existing user:", error);
      // Show a toast notification for debugging
      toast({
        title: "API Check Error",
        description: `Failed to check user existence: ${error.message}`,
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsCheckingUser(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    if (!phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";
    if (!investorType) newErrors.investorType = "Investor type is required";
    if (!gender) newErrors.gender = "Gender is required";
    if (!country.trim()) newErrors.country = "Country is required";
    if (!city.trim()) newErrors.city = "City is required";
    if (!dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
    if (!reasonForUsingHushh.trim()) newErrors.reasonForUsingHushh = "Reason for using Hushh is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const userData = {
        first_name: firstName,
        last_name: lastName,
        email: userEmail,
        phone_number: phoneNumber,
        gender: gender,
        country: country,
        city: city,
        dob: dateOfBirth,
        reason_for_using: reasonForUsingHushh,
        investor_type: investorType,
      };

      const response = await fetch(
        `${API_BASE_URL}/users`,
        {
          method: 'POST',
          headers: API_HEADERS,
          body: JSON.stringify(userData)
        }
      );
      
      if (response.ok) {
        toast({
          title: "🎉 Registration Complete",
          description: "Your profile has been created successfully! Welcome to Hushh.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Redirect to home page after successful registration/update
      setTimeout(() => {
        router.push("/");
      }, 2000);
      
    } catch (err) {
      console.error("Registration/Update error:", err);
      setError(`An unexpected error occurred. Please try again later.`);
      toast({
        title: "Registration Error",
        description: "There was an error saving your profile. Please try again.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return (
      <Box
        minH="100vh"
        bg="gray.50"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <VStack spacing={4}>
          <Spinner size="xl" color="blue.500" />
          <Text fontSize="lg" color="gray.600">
            Loading your account...
          </Text>
        </VStack>
      </Box>
    );
  }

  return (
    <Box
      minH="100vh"
      bg="gray.50"
      py={{ base: 8, md: 12 }}
      px={{ base: 4, md: 8 }}
    >
      <Container maxW="4xl" mt={10}>
        <MotionBox
          initial="initial"
          animate="animate"
          variants={staggerChildren}
        >
          {/* Header */}
          <MotionCard
            variants={childVariants}
            bg="white"
            boxShadow="lg"
            borderRadius="xl"
            p={{ base: 6, md: 8 }}
            mb={8}
          >
            <VStack spacing={4} textAlign="center">
              <Box
                w="80px"
                h="80px"
                bg="blue.500"
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                boxShadow="lg"
              >
                <Icon as={FiUser} fontSize="2xl" color="white" />
              </Box>
              <VStack spacing={2}>
                <Heading
                  size="lg"
                  color="gray.800"
                  fontFamily="Inter, sans-serif"
                  fontWeight="700"
                >
                  Complete Your Profile
                </Heading>
                <Text color="gray.600" fontSize="md" maxW="500px">
                  Welcome to Hushh! Please provide the following information to complete your registration
                </Text>
              </VStack>
              {isCheckingUser && (
                <Badge colorScheme="blue" size="lg" borderRadius="full">
                  <Spinner size="sm" mr={2} />
                  Checking user status...
                </Badge>
              )}
              {!isCheckingUser && (
                <Badge colorScheme="purple" size="lg" borderRadius="full">
                  <Icon as={FiUser} mr={1} />
                  New User Registration
                </Badge>
              )}
            </VStack>
          </MotionCard>

          {/* Form */}
          <MotionCard
            variants={childVariants}
            bg="white"
            boxShadow="lg"
            borderRadius="xl"
            overflow="hidden"
          >
            <CardBody p={{ base: 6, md: 8 }}>
              {error && (
                <Alert status="error" mb={6} borderRadius="md">
                  <AlertIcon />
                  <Box>
                    <AlertTitle>Error!</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Box>
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <VStack spacing={6}>
                  {/* Investor Type Field - At the top */}
                  <FormControl isInvalid={errors.investorType}>
                    <FormLabel color="gray.700" fontWeight="600">
                      <Icon as={MdOutlineWorkOutline} mr={2} />
                      What type of investor are you?
                    </FormLabel>
                    <Select
                      value={investorType}
                      onChange={(e) => setInvestorType(e.target.value)}
                      placeholder="Select investor type"
                      bg="gray.50"
                      border="1px"
                      borderColor="gray.200"
                      _hover={{ borderColor: "gray.300" }}
                      _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px #3182CE" }}
                    >
                      <option value="individual">Individual Investor</option>
                      <option value="institutional">Institutional / Corporate Investor</option>
                    </Select>
                    <FormErrorMessage>{errors.investorType}</FormErrorMessage>
                  </FormControl>

                  {/* Name Fields */}
                  <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4} w="full">
                    <GridItem>
                      <FormControl isInvalid={errors.firstName}>
                        <FormLabel color="gray.700" fontWeight="600">
                          <Icon as={FiUser} mr={2} />
                          First Name
                        </FormLabel>
                        <Input
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="Enter your first name"
                          bg="gray.50"
                          border="1px"
                          borderColor="gray.200"
                          _hover={{ borderColor: "gray.300" }}
                          _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px #3182CE" }}
                        />
                        <FormErrorMessage>{errors.firstName}</FormErrorMessage>
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl isInvalid={errors.lastName}>
                        <FormLabel color="gray.700" fontWeight="600">
                          <Icon as={FiUser} mr={2} />
                          Last Name
                        </FormLabel>
                        <Input
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Enter your last name"
                          bg="gray.50"
                          border="1px"
                          borderColor="gray.200"
                          _hover={{ borderColor: "gray.300" }}
                          _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px #3182CE" }}
                        />
                        <FormErrorMessage>{errors.lastName}</FormErrorMessage>
                      </FormControl>
                    </GridItem>
                  </Grid>

                  {/* Contact Fields */}
                  <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4} w="full">
                    <GridItem>
                      <FormControl>
                        <FormLabel color="gray.700" fontWeight="600">
                          <Icon as={FiMail} mr={2} />
                          Email Address
                        </FormLabel>
                        <Input
                          type="email"
                          value={userEmail}
                          onChange={(e) => setUserEmail(e.target.value)}
                          placeholder="Enter your email"
                          bg="gray.50"
                          border="1px"
                          borderColor="gray.200"
                          _hover={{ borderColor: "gray.300" }}
                          _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px #3182CE" }}
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl isInvalid={errors.phoneNumber}>
                        <FormLabel color="gray.700" fontWeight="600">
                          <Icon as={FiPhone} mr={2} />
                          Phone Number
                        </FormLabel>
                        <Input
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="Enter your phone number"
                          bg="gray.50"
                          border="1px"
                          borderColor="gray.200"
                          _hover={{ borderColor: "gray.300" }}
                          _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px #3182CE" }}
                        />
                        <FormErrorMessage>{errors.phoneNumber}</FormErrorMessage>
                      </FormControl>
                    </GridItem>
                  </Grid>

                  {/* Additional Information */}
                  <Divider />
                  <Text fontSize="lg" fontWeight="600" color="gray.700" textAlign="center">
                    Additional Information
                  </Text>

                      {/* Gender and Location */}
                      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr 1fr" }} gap={4} w="full">
                        <GridItem>
                          <FormControl isInvalid={errors.gender}>
                            <FormLabel color="gray.700" fontWeight="600">
                              <Icon as={BiUser} mr={2} />
                              Gender
                            </FormLabel>
                            <Select
                              value={gender}
                              onChange={(e) => setGender(e.target.value)}
                              placeholder="Select gender"
                              bg="gray.50"
                              border="1px"
                              borderColor="gray.200"
                              _hover={{ borderColor: "gray.300" }}
                              _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px #3182CE" }}
                            >
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="other">Other</option>
                              <option value="prefer-not-to-say">Prefer not to say</option>
                            </Select>
                            <FormErrorMessage>{errors.gender}</FormErrorMessage>
                          </FormControl>
                        </GridItem>
                        <GridItem>
                          <FormControl isInvalid={errors.country}>
                            <FormLabel color="gray.700" fontWeight="600">
                              <Icon as={IoLocationOutline} mr={2} />
                              Country
                            </FormLabel>
                            <Input
                              value={country}
                              onChange={(e) => setCountry(e.target.value)}
                              placeholder="Enter your country"
                              bg="gray.50"
                              border="1px"
                              borderColor="gray.200"
                              _hover={{ borderColor: "gray.300" }}
                              _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px #3182CE" }}
                            />
                            <FormErrorMessage>{errors.country}</FormErrorMessage>
                          </FormControl>
                        </GridItem>
                        <GridItem>
                          <FormControl isInvalid={errors.city}>
                            <FormLabel color="gray.700" fontWeight="600">
                              <Icon as={FiMapPin} mr={2} />
                              City
                            </FormLabel>
                            <Input
                              value={city}
                              onChange={(e) => setCity(e.target.value)}
                              placeholder="Enter your city"
                              bg="gray.50"
                              border="1px"
                              borderColor="gray.200"
                              _hover={{ borderColor: "gray.300" }}
                              _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px #3182CE" }}
                            />
                            <FormErrorMessage>{errors.city}</FormErrorMessage>
                          </FormControl>
                        </GridItem>
                      </Grid>

                      {/* Date of Birth */}
                      <FormControl isInvalid={errors.dateOfBirth}>
                        <FormLabel color="gray.700" fontWeight="600">
                          <Icon as={FiCalendar} mr={2} />
                          Date of Birth
                        </FormLabel>
                        <Input
                          type="date"
                          value={dateOfBirth}
                          onChange={(e) => setDateOfBirth(e.target.value)}
                          bg="gray.50"
                          border="1px"
                          borderColor="gray.200"
                          _hover={{ borderColor: "gray.300" }}
                          _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px #3182CE" }}
                        />
                        <FormErrorMessage>{errors.dateOfBirth}</FormErrorMessage>
                      </FormControl>

                      {/* Reason for using Hushh */}
                      <FormControl isInvalid={errors.reasonForUsingHushh}>
                        <FormLabel color="gray.700" fontWeight="600">
                          <Icon as={FiEdit3} mr={2} />
                          Reason for using Hushh
                        </FormLabel>
                        <Textarea
                          value={reasonForUsingHushh}
                          onChange={(e) => setReasonForUsingHushh(e.target.value)}
                          placeholder="Tell us why you're interested in using Hushh"
                          bg="gray.50"
                          border="1px"
                          borderColor="gray.200"
                          _hover={{ borderColor: "gray.300" }}
                          _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px #3182CE" }}
                          rows={4}
                        />
                        <FormErrorMessage>{errors.reasonForUsingHushh}</FormErrorMessage>
                      </FormControl>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    colorScheme="blue"
                    size="lg"
                    fontSize="md"
                    fontWeight="600"
                    w="full"
                    h="56px"
                    borderRadius="xl"
                    isLoading={isLoading}
                    loadingText="Completing Registration..."
                    _hover={{
                      transform: "translateY(-2px)",
                      boxShadow: "lg",
                    }}
                    _active={{
                      transform: "translateY(0)",
                    }}
                    transition="all 0.2s"
                  >
                    Complete Registration
                  </Button>
                </VStack>
              </form>
            </CardBody>
          </MotionCard>

          {/* Footer */}
          <MotionBox
            variants={childVariants}
            textAlign="center"
            mt={8}
            py={6}
            px={4}
            bg="white"
            borderRadius="xl"
            boxShadow="md"
          >
            <Text fontSize="sm" color="gray.600">
              By completing your profile, you agree to our{" "}
              <Link href="/legal/termsofuse">
                <Text as="span" color="blue.500" fontWeight="600" _hover={{ textDecoration: "underline" }}>
                  Terms of Service
                </Text>
              </Link>
              {" "}and{" "}
              <Link href="/legal/privacypolicy">
                <Text as="span" color="blue.500" fontWeight="600" _hover={{ textDecoration: "underline" }}>
                  Privacy Policy
                </Text>
              </Link>
            </Text>
          </MotionBox>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default UserRegistration; 