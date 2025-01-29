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
import config from "../config/config"; // Supabase client config

const ProfileSetup = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    mobilenumber: "",
    companyname: "",
    website: "",
    purpose: "",
  });

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
  
    const userEmail = session.user.email;
  
    try {
      console.log("Checking existing profile...");
  
      // Step 1: Check if the user profile already exists
      const { data: existingUser, error: fetchError } = await config.supabaseClient
        .from("dev_api_userprofile")
        .select("mail")
        .eq("mail", userEmail)
        .single();
  
      if (fetchError && fetchError.code !== "PGRST116") {
        throw fetchError;
      }
  
      const profileData = {
        mail: userEmail,
        firstname: formData.firstname,
        lastname: formData.lastname,
        mobilenumber: formData.mobilenumber,
        companyname: formData.companyname,
        website: formData.website,
        purpose: formData.purpose,
      };
  
      let error;
  
      if (existingUser) {
        // Step 2: Update existing user without modifying password
        console.log("Updating profile:", profileData);
        ({ error } = await config.supabaseClient
          .from("dev_api_userprofile")
          .update(profileData)
          .eq("mail", userEmail));
      } else {
        // Step 3: Insert new user profile
        console.log("Inserting profile:", profileData);
        ({ error } = await config.supabaseClient
          .from("dev_api_userprofile")
          .insert([profileData]));
      }
  
      if (error) throw error;
  
      toast({
        title: "Profile Setup Complete",
        description: "Your profile has been saved successfully.",
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
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="Enter your company website"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Purpose of Usage</FormLabel>
            <Input
              type="text"
              name="purpose"
              value={formData.purpose}
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
