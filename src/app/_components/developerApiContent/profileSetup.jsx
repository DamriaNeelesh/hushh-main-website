import React, { useState } from "react";
import { Box, VStack, Input, FormControl, FormLabel, Button, Text, useToast } from "@chakra-ui/react";
import { httpRequest } from "../requestHandler/requestHandler";

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
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
        console.log("Submitting data:", formData); // Debugging

      const response = await httpRequest("POST", "profilesetup", {
        body: formData,
      });
      setProfileData(response);
      toast({
        title: "Profile Setup",
        description: "Thank you for setting up your profile.",
        status: "success",
        duration: 5000,
        isClosable: true,
    });
    } catch (error) {
    //   console.error("Error saving profile:", error);
    console.error("Error saving profile:", error.message);

      // Handle error gracefully (e.g., display a message to the user)
    } finally {
      setIsLoading(false);
    }
  };

  if (profileData) {
    return (
        <Box bg="gray.50" p={6} rounded="md" shadow="sm" maxW="400px" mx="auto" mt={10}>
            <Text fontSize="lg" fontWeight="bold" mb={4}>
                Thank you for setting up your profile.
            </Text>
        </Box>
    );
}

  return (
    <Box bg="gray.50" p={6} rounded="md" shadow="sm" maxW="400px" mx="auto" mt={10}>
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
    name="mail" // Updated to match the API expectation
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
