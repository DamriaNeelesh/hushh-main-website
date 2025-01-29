import React, { useState, useEffect } from "react";
import {
  Box,
  VStack,
  Input,
  FormControl,
  FormLabel,
  Button,
  Text,
  useToast,
} from "@chakra-ui/react";
import { httpRequest } from "../requestHandler/requestHandler";
import config from "../config/config"; // Supabase client config

const ProfileSetup = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    mobilenumber: "",
    mail: "",
    companyname: "",
    companywebsite: "",
    purposeofusage: "",
  });

  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [session, setSession] = useState(null);
  const toast = useToast();

  // Fetch current session on component mount
  useEffect(() => {
    config.supabaseClient.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth state changes
    const { data: subscription } = config.supabaseClient.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!session?.user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in before setting up your profile.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }

    // Ensure email in session matches the email in the form
    if (session.user.email !== formData.mail) {
      toast({
        title: "Unauthorized Request",
        description: "The email does not match the signed-in user.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }

    try {
      console.log("Submitting profile data:", formData);

      const response = await httpRequest("POST", "profilesetup", {
        body: formData,
      });

      setProfileData(response);
      toast({
        title: "Profile Setup Complete",
        description: "Thank you for setting up your profile.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error saving profile:", error.message);
      toast({
        title: "Profile Setup Failed",
        description: "Something went wrong. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (profileData) {
    return (
      <Box
        bg="gray.50"
        p={6}
        rounded="md"
        shadow="sm"
        maxW="400px"
        mx="auto"
        mt={10}
      >
        <Text fontSize="lg" fontWeight="bold" mb={4}>
          Thank you for setting up your profile.
        </Text>
      </Box>
    );
  }

  return (
    <Box
      bg="gray.50"
      p={6}
      rounded="md"
      shadow="sm"
      maxW="400px"
      mx="auto"
      mt={10}
    >
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>First Name</FormLabel>
            <Input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              placeholder="Enter your first name"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Last Name</FormLabel>
            <Input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              placeholder="Enter your last name"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="mail"
              value={formData.mail}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Mobile Number</FormLabel>
            <Input
              type="tel"
              name="mobilenumber"
              value={formData.mobilenumber}
              onChange={handleChange}
              placeholder="Enter your mobile number"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Company Name</FormLabel>
            <Input
              type="text"
              name="companyname"
              value={formData.companyname}
              onChange={handleChange}
              placeholder="Enter your company name"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Company Website</FormLabel>
            <Input
              type="text"
              name="companywebsite"
              value={formData.companywebsite}
              onChange={handleChange}
              placeholder="Enter your company website"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Purpose of Usage</FormLabel>
            <Input
              type="text"
              name="purposeofusage"
              value={formData.purposeofusage}
              onChange={handleChange}
              placeholder="Enter the purpose of usage"
            />
          </FormControl>

          <Button
            type="submit"
            colorScheme="blue"
            width="full"
            isLoading={isLoading}
            loadingText="Submitting"
          >
            Submit
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default ProfileSetup;
