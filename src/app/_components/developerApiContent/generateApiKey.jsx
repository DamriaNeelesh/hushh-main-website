import React, { useEffect, useState } from "react";
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
import config from "../config/config"; // Make sure this contains supabaseClient

const GenerateApiKey = () => {
  const [apiKey, setApiKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [session, setSession] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const { data: authListener } =
      config.supabaseClient.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });

    return () => {
      authListener?.subscription?.unsubscribe?.();
    };
  }, []);

  const handleGenerateApiKey = async () => {
    if (!session?.user?.email) {
      toast({
        title: "Authentication Required",
        description: "Please sign in before generating an API key.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    const userMail = session.user.email;

    try {
      // Log userMail and access token for debugging
      console.log("User email:", userMail);
      console.log("Access token:", session.access_token);

      const response = await fetch(
        `https://hushh-api-53407187172.us-central1.run.app/generateapikey?mail=${encodeURIComponent(userMail)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`, // Ensure token is valid
          },
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error("Error response:", errorMessage);
        throw new Error(`API error: ${response.status} - ${errorMessage}`);
      }

      const result = await response.json();

      if (!result.api_key) {
        throw new Error("API key missing in response");
      }

      setApiKey(result.api_key);

      toast({
        title: "API Key Generated",
        description: "Store this key securely. It won't be shown again.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error generating API key:", error);
      toast({
        title: "Error",
        description: "Failed to generate API key. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey);
      toast({
        title: "Copied to Clipboard",
        description: "Your API key has been copied.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Box bg="white" p={6} rounded="lg" shadow="md" maxW="500px" mx="auto" mt={10}>
      <VStack spacing={4}>
        <Text fontSize="xl" fontWeight="bold">
          Generate API Key
        </Text>

        <button
          onClick={handleGenerateApiKey}
          disabled={isLoading}
          className=" bg-[#bd1e59] w-full text-white inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground h-10 px-4 py-2 mt-4"
        >
          {isLoading ? "Generating..." : "Generate New API Key"}
        </button>

        {apiKey && (
          <FormControl>
            <FormLabel>API Key</FormLabel>
            <Box display="flex">
              <Input value={apiKey} isReadOnly w="full" />
              <Button onClick={copyToClipboard} ml={2} colorScheme="gray">
                Copy
              </Button>
            </Box>
          </FormControl>
        )}
      </VStack>
    </Box>
  );
};

export default GenerateApiKey;
