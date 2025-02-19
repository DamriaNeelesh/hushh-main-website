import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Code,
  useToast
} from "@chakra-ui/react";
import axios from "axios";

interface FieldDefinition {
  name: string;
  label: string;
  placeholder?: string;
}

interface ApiPlaygroundProps {
  title: string;                // e.g. "List Installed Cards"
  method: "GET" | "POST" | "PUT" | "DELETE"; // or other HTTP verbs
  endpoint: string;             // e.g. "/api/v1/list-installed-cards"
  description?: string;         // Short explanation of the endpoint
  paramFields?: FieldDefinition[]; // Query / param fields
  bodyFields?: FieldDefinition[];  // Body fields for POST/PUT
}

/**
 * A collapsible panel (using Chakra’s Accordion) that displays an API’s
 * details. Users can fill in parameters and body fields, then send a request
 * to see the response—like a mini Swagger UI.
 */
const ApiPlayground: React.FC<ApiPlaygroundProps> = ({
  title,
  method,
  endpoint,
  description,
  paramFields = [],
  bodyFields = []
}) => {
  const [params, setParams] = useState<Record<string, string>>({});
  const [body, setBody] = useState<Record<string, string>>({});
  const [responseData, setResponseData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();

  // Handle param input changes
  const handleParamChange = (field: string, value: string) => {
    setParams((prev) => ({ ...prev, [field]: value }));
  };

  // Handle body input changes
  const handleBodyChange = (field: string, value: string) => {
    setBody((prev) => ({ ...prev, [field]: value }));
  };

  // Send request to the specified endpoint
  const handleSendRequest = async () => {
    setResponseData(null);
    setError(null);
    setLoading(true);

    try {
      let finalUrl = endpoint;

      // Build query string from paramFields if GET or if you want them in the query
      const queryString = new URLSearchParams(params).toString();
      if (queryString && (method === "GET" || method === "DELETE")) {
        finalUrl += `?${queryString}`;
      }

      // For POST/PUT, we can also attach param fields as query if desired:
      // finalUrl += `?${queryString}`

      // Convert body object to JSON if needed
      // Or let user input raw JSON themselves
      let requestBody: any = {};
      // Attempt to parse each body field as JSON, else fallback to string
      for (const key of Object.keys(body)) {
        try {
          requestBody[key] = JSON.parse(body[key]);
        } catch {
          requestBody[key] = body[key];
        }
      }

      const res = await axios({
        method,
        url: finalUrl,
        data: (method === "POST" || method === "PUT") ? requestBody : undefined
      });

      setResponseData(res.data);
    } catch (err: any) {
      console.error("Error sending request:", err);
      setError(err?.message || "Unknown error");
      toast({
        title: "API Error",
        description: err?.message || "Unknown error occurred.",
        status: "error",
        duration: 4000,
        isClosable: true
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Accordion allowToggle my={6}>
      <AccordionItem border="1px solid #ccc" borderRadius="md">
        <AccordionButton px={4} py={2}>
          <Box flex="1" textAlign="left">
            <Heading size="md">
              {title} — <strong>{method}</strong> {endpoint}
            </Heading>
          </Box>
          <AccordionIcon />
        </AccordionButton>

        <AccordionPanel pb={4}>
          {description && (
            <Box mb={4}>
              <Heading size="sm" mb={2}>Description</Heading>
              <Box fontSize="sm">{description}</Box>
            </Box>
          )}

          {/* PARAMS */}
          {paramFields.length > 0 && (
            <Box mb={4}>
              <Heading size="sm" mb={2}>Parameters</Heading>
              {paramFields.map((field) => (
                <FormControl key={field.name} my={2}>
                  <FormLabel fontSize="sm">{field.label}</FormLabel>
                  <Input
                    size="sm"
                    placeholder={field.placeholder}
                    onChange={(e) => handleParamChange(field.name, e.target.value)}
                  />
                </FormControl>
              ))}
            </Box>
          )}

          {/* BODY */}
          {(method === "POST" || method === "PUT") && bodyFields.length > 0 && (
            <Box mb={4}>
              <Heading size="sm" mb={2}>Body</Heading>
              {bodyFields.map((field) => (
                <FormControl key={field.name} my={2}>
                  <FormLabel fontSize="sm">{field.label}</FormLabel>
                  <Textarea
                    size="sm"
                    placeholder={field.placeholder}
                    onChange={(e) => handleBodyChange(field.name, e.target.value)}
                  />
                </FormControl>
              ))}
            </Box>
          )}

          {/* SEND BUTTON */}
          <Button
            colorScheme="blue"
            size="sm"
            onClick={handleSendRequest}
            isLoading={loading}
          >
            Send Request
          </Button>

          {/* RESPONSE */}
          {responseData && (
            <Box mt={4}>
              <Heading size="sm" mb={1}>Response</Heading>
              <Code
                display="block"
                whiteSpace="pre"
                p={2}
                w="100%"
                overflowX="auto"
                bg="gray.800"
                color="green.200"
                fontSize="sm"
                borderRadius="md"
              >
                {JSON.stringify(responseData, null, 2)}
              </Code>
            </Box>
          )}

          {/* ERROR */}
          {error && (
            <Box mt={4} color="red.400" fontSize="sm">
              Error: {error}
            </Box>
          )}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default ApiPlayground;
