import {
    Box,
    Collapse,
    Flex,
    Badge,
    Text,
    VStack,
    useDisclosure,
    Icon,
    Button,
    SimpleGrid,
    FormControl,
    FormLabel,
    Input,
    Textarea,
  } from "@chakra-ui/react";
  import { FaChevronDown, FaChevronUp } from "react-icons/fa";
  import { useState } from "react";
  import axios from "axios";
 import CopyButton from "./copuButton";
  
  const BASE_URL = "https://developer-api-53407187172.us-central1.run.app";
  
  const ApiSection = ({ endpoint, apiKey }) => {
    const { isOpen, onToggle } = useDisclosure();
    const [requestBody, setRequestBody] = useState(endpoint.requestBody || {});
    const [response, setResponse] = useState(null);
    const [requestedUrl, setRequestedUrl] = useState("");
  
    const handleInputChange = (key, value) => {
      setRequestBody({ ...requestBody, [key]: value });
    };
  
    const handleSubmit = async () => {
      const fullUrl = `${BASE_URL}${endpoint.path}`;
      setRequestedUrl(fullUrl);
  
      try {
        const res = await axios({
          method: endpoint.method.toLowerCase(),
          url: fullUrl,
          data: requestBody,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        });
        setResponse(res.data);
      } catch (error) {
        setResponse(error.response ? error.response.data : "Error occurred.");
      }
    };
  
    return (
      <Box
        mb={6}
        p={4}
        borderWidth="1px"
        borderRadius="md"
        bg="white"
        shadow="md"
        transition="all 0.3s ease"
        _hover={{ transform: "translateY(-4px)", shadow: "lg" }}
      >
        {/* Header */}
        <Flex justify="space-between" align="center" onClick={onToggle}>
          <Flex align="center">
            <Badge
              colorScheme={endpoint.method === "GET" ? "blue" : "green"}
              mr={3}
            >
              {endpoint.method}
            </Badge>
            <Text fontWeight="bold" mr={2} color="gray.700">
              {endpoint.path}
            </Text>
            <Text color="gray.500">{endpoint.description}</Text>
          </Flex>
          <CopyButton textToCopy={endpoint.path} />
          <Icon as={isOpen ? FaChevronUp : FaChevronDown} boxSize={5} />
        </Flex>
  
        {/* Collapsible Content */}
        <Collapse in={isOpen} animateOpacity>
          <VStack align="start" spacing={4} mt={4} bg="gray.50" p={4}>
            {/* Request Body */}
            {Object.keys(endpoint.requestBody).length > 0 && (
              <Box w="full">
                <Text fontWeight="bold">Request Body:</Text>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  {Object.keys(endpoint.requestBody).map((key) => (
                    <FormControl key={key}>
                      <FormLabel>{key}</FormLabel>
                      <Input
                        placeholder={`Enter ${key}`}
                        value={requestBody[key] || ""}
                        onChange={(e) => handleInputChange(key, e.target.value)}
                      />
                    </FormControl>
                  ))}
                </SimpleGrid>
              </Box>
            )}
  
            {/* Send Request Button */}
            <Button colorScheme="teal" onClick={handleSubmit}>
              Send Request
            </Button>
  
            {/* Requested URL */}
            {requestedUrl && (
              <Box w="full">
                <Text fontWeight="bold">Requested URL:</Text>
                <Textarea value={requestedUrl} readOnly bg="gray.100" />
              </Box>
            )}
  
            {/* Response */}
            {response && (
              <Box w="full">
                <Text fontWeight="bold">Response:</Text>
                <Textarea
                  value={JSON.stringify(response, null, 2)}
                  readOnly
                  bg="gray.100"
                />
              </Box>
            )}
          </VStack>
        </Collapse>
      </Box>
    );
  };
  
  export default ApiSection;
  