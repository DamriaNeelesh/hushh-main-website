import {
    Badge,
    Box,
    Collapse,
    Flex,
    FormControl,
    FormLabel,
    Icon,
    Input,
    Text,
    useDisclosure,
    VStack,
    Textarea,
    SimpleGrid,
  } from "@chakra-ui/react";
  import { useState } from "react";
  import { FaChevronDown, FaChevronUp } from "react-icons/fa";
  import axios from "axios";
  
  const BASE_URL = "https://hushh-api-53407187172.us-central1.run.app";
  
  const ApiSection = ({ endpoint, apiKey }) => {
    const { isOpen, onToggle } = useDisclosure();
    const [localApiKey, setLocalApiKey] = useState(apiKey || "");
  
    // Initialize query parameters
    const [queryParams, setQueryParams] = useState(
      endpoint?.queryParams?.reduce((acc, param) => {
        acc[param.name] = "";
        return acc;
      }, {}) || {}
    );
  
    // Initialize headers
    const [headerParams, setHeaderParams] = useState(
      endpoint?.headers?.reduce((acc, header) => {
        acc[header.name] = "";
        return acc;
      }, {}) || {}
    );
  
    // Initialize request body values as empty strings rather than the raw object.
    const initialBodyParams = endpoint?.requestBody
      ? Object.keys(endpoint.requestBody).reduce((acc, key) => {
          acc[key] = "";
          return acc;
        }, {})
      : {};
    const [bodyParams, setBodyParams] = useState(initialBodyParams);
  
    const [response, setResponse] = useState(null);
    const [requestedUrl, setRequestedUrl] = useState("");
  
    const handleInputChange = (setter, key, value) => {
      setter((prev) => ({ ...prev, [key]: value }));
    };
  
    const handleSubmit = async () => {
        // Construct the query string if query parameters exist.
        const queryString = new URLSearchParams(queryParams).toString();
        const fullUrl = `${BASE_URL}${endpoint.path}${queryString ? "?" + queryString : ""}`;
        setRequestedUrl(fullUrl);
      
        // Prepare headers including the API key.
        const finalHeaders = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localApiKey}`,
          ...headerParams,
        };
      
        try {
          const res = await axios({
            method: endpoint.method, // Use the method defined in the endpoint
            url: fullUrl,
            headers: finalHeaders,
            data: endpoint.method !== "GET" ? bodyParams : undefined, // Send body only if not GET
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
        <Flex justify="space-between" align="center" onClick={onToggle} cursor="pointer">
          <Flex align="center">
            <Badge colorScheme="green" mr={3}>
              {endpoint?.method || "POST"}
            </Badge>
            <Text color="gray.500">{endpoint?.description}</Text>
          </Flex>
          <Icon as={isOpen ? FaChevronUp : FaChevronDown} boxSize={5} />
        </Flex>
  
        {/* Collapsible Content */}
        <Collapse in={isOpen} animateOpacity>
          <VStack align="start" spacing={4} mt={4} bg="gray.50" p={4}>
            {/* Query Parameters */}
            {endpoint?.queryParams && endpoint.queryParams.length > 0 && (
              <Box w="full">
                <Text fontWeight="bold">Query Parameters:</Text>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  {endpoint.queryParams.map((param) => (
                    <FormControl key={param.name}>
                      <FormLabel>{param.name}</FormLabel>
                      <Input
                        placeholder={param.placeholder || `Enter ${param.name}`}
                        value={queryParams[param.name] || ""}
                        onChange={(e) =>
                          handleInputChange(setQueryParams, param.name, e.target.value)
                        }
                      />
                    </FormControl>
                  ))}
                </SimpleGrid>
              </Box>
            )}
  
            {/* Headers */}
            {endpoint?.headers && endpoint.headers.length > 0 && (
              <Box w="full">
                <Text fontWeight="bold">Headers:</Text>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  {endpoint.headers.map((header) => (
                    <FormControl key={header.name}>
                      <FormLabel>{header.name}</FormLabel>
                      <Input
                        placeholder={header.placeholder || `Enter ${header.name}`}
                        value={headerParams[header.name] || ""}
                        onChange={(e) =>
                          handleInputChange(setHeaderParams, header.name, e.target.value)
                        }
                      />
                    </FormControl>
                  ))}
                </SimpleGrid>
              </Box>
            )}
  
            {/* Request Body */}
            {endpoint?.requestBody && Object.keys(endpoint.requestBody).length > 0 && (
              <Box w="full">
                <Text fontWeight="bold">Request Body:</Text>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  {Object.keys(endpoint.requestBody).map((key) => (
                    <FormControl key={key}>
                      <FormLabel>{key}</FormLabel>
                      <Input
                        placeholder={
                          endpoint.requestBody[key].placeholder || `Enter ${key}`
                        }
                        value={bodyParams[key] || ""}
                        onChange={(e) =>
                          handleInputChange(setBodyParams, key, e.target.value)
                        }
                      />
                    </FormControl>
                  ))}
                </SimpleGrid>
              </Box>
            )}
  
            {/* Send Request Button */}
            <button onClick={handleSubmit} mt={4} className=" bg-[#bd1e59] text-white inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground h-10 px-4 py-2 mt-4">
              Send Request
            </button>
  
            {/* Display Requested URL */}
            {requestedUrl && (
              <Box w="full">
                <Text fontWeight="bold">Requested URL:</Text>
                <Textarea value={requestedUrl} readOnly bg="gray.100" />
              </Box>
            )}
  
            {/* Display Response */}
            {response && (
              <Box w="full">
                <Text fontWeight="bold">Response:</Text>
                <Textarea value={JSON.stringify(response, null, 2)} readOnly bg="gray.100" />
              </Box>
            )}
          </VStack>
        </Collapse>
      </Box>
    );
  };
  
  export default ApiSection;
  