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
import config from "../config/config";
import crypto from "crypto"; 

const GenerateApiKey = () => {
  const [apiKey, setApiKey] = useState(""); // Stores the original API key (for display only)
  const [isLoading, setIsLoading] = useState(false);
  const [session, setSession] = useState(null);
  const toast = useToast();

  // ✅ Fetch Supabase session (Only when component mounts)
  useEffect(() => {
    const { data } = config.supabaseClient.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      if (data?.subscription) {
        data.subscription.unsubscribe();
      }
    };
  }, []);

  // ✅ Generate API Key (Original & Hashed)
  const generateApiKey = (userMail) => {
    const currentTime = new Date().toISOString(); // Equivalent to `datetime.now().isoformat()`
    const userData = `${userMail}${currentTime}`; // Concatenating email and timestamp
    const randomToken = crypto.randomBytes(16).toString("hex"); // Equivalent to `secrets.token_hex(16)`
    const originalApiKey = `${randomToken}`; // 👈 Plain key (Frontend display only)
    const hashedApiKey = crypto.createHash("sha256").update(originalApiKey).digest("hex"); // Hashed version

    return { originalApiKey, hashedApiKey };
  };

  // ✅ Generate & Update API Key in Supabase (Only on Button Click)
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

    try {
      const userMail = session.user.email;
      const { originalApiKey, hashedApiKey } = generateApiKey(userMail); // Generate API Key (Original & Hashed)

      // ✅ Store only the Hashed API Key in Supabase
      const { error } = await config.supabaseClient
        .from("dev_api_userprofile")
        .update({ api_key: hashedApiKey }) // Store only the hashed key
        .eq("mail", userMail);

      if (error) throw error;

      setApiKey(originalApiKey); // Show only the original key to the user (not stored in DB)

      toast({
        title: "API Key Generated",
        description: "Your new API key has been updated.",
        status: "success",
        duration: 3000,
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

  // ✅ Copy API Key to Clipboard
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

        <Button
          onClick={handleGenerateApiKey}
          color={'white'}
          bg={'#bd1e59'}
          _hover={{ bg:'#a11648' }}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground h-10 px-4 py-2 mt-4"
          isLoading={isLoading}
          loadingText="Generating..."
          w="full"
        >
          Generate New API Key
        </Button>

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
