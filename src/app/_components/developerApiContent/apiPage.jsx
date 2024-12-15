import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Collapse,
    Heading,
    Text,
    VStack,
    useDisclosure,
    Flex,
    Input,
    Textarea,
    Spacer,
    Icon,
    Tooltip,
    Badge,
    SimpleGrid,
    Table,
    Thead,
    Tr,
    Th,
    Td,
    Tbody,
  } from "@chakra-ui/react";
  import { FaChevronDown, FaChevronUp, FaCopy, FaCheck } from "react-icons/fa";
  import { useState } from "react"; 
  import axios from "axios";
  import { useApiKey } from "../../context/apiKeyContext";
  // List of API endpoints
  const apiEndpoints = [
    {
      category: "Authentication",
      method: "POST",
      path: "/register/",
      description: "Signup",
      requestBody: {
        mail: "user@example.com",
        password: "string",
        confirmpassword: "string",
      },
      responses: { 200: `"string"`, 422: `{"detail": "Validation Error"}` },
    },
    {
      category: "User Management",
      method: "POST",
      path: "/profilesetup",
      description: "Profile Setup",
      requestBody: {
        firstname: "string",
        lastname: "string",
        mobilenumber: "integer",
        companyname: "string",
        website: "string",
        purpose: "string",
        mail: "string",
      },
      responses: { 200: `"string"`, 422: `{"detail": "Validation Error"}` },
    },
    {
      category: "User Management",
        method: "POST",
        path: "/generateapikey",
        description: "Generate Api Key",
        requestBody: {
          mail: "string",
        },
        responses: { 200: `"string"`, 422: `{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}` },
      },
    {
      category: "Authentication",
      method: "POST",
      path: "/login",
      description: "Login",
      requestBody: {
        mail: "user@example.com",
        password: "string",
      },
      responses: { 200: `"string"`, 422: `{"detail": "Validation Error"}` },
    },
    {
      category: "Authentication",
        method: "POST",
        path: "/validatetoken",
        description: "Validate Token",
        requestBody: {
          token:"string",
        },
        responses: { 200: `"string"`, 422: `{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}` },
      },
      {
        category: "Authentication",
        method: "POST",
        path: "/refreshtoken",
        description: "Refresh Token",
        requestBody: {
          mail: "user@example.com",
          api_key:"string"
        },
        responses: { 200: `"string"`, 422: `{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}` },
      },
      {
        category: "User Management",
        method: "GET",
        path: "/getapikey",
        description: "Get Api Key",
        requestBody: {
          mail: "user@example.com",
        },
        responses: { 200: `"string"`, 422: `{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}` },
      },
      {    category: "Data Retrieval",
        method: "POST",
        path: "/api/v1/receipt_data",
        description: "Receipt User Data",
        requestBody: {
          user_id: "string",
          token:"string"
        },
        responses: { 200: `"string"`, 422: `{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}` },
      },
      {
        category: "Data Retrieval",
        method: "POST",
        path: "/api/v1/health-data",
        description: "Get Health Data",
        requestBody: {
          user_id: "string",
          token:"string"
        },
        responses: { 200: `"string"`, 422: `{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}` },
      },
      {
        category: "Data Retrieval",
        method: "POST",
        path: "/api/v1/browsing",
        description: "Get Browsing Data",
        requestBody: {
          user_id: "string",
          token:"string"
        },
        responses: { 200: `"string"`, 422: `{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}` },
      },
      {
        category: "Data Retrieval",
        method: "POST",
        path: "/api/v1/app-usage",
        description: "Get App Usage",
        requestBody: {
          user_id: "string",
          token:"string"
        },
        responses: { 200: `"string"`, 422: `{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}` },
      },
      {
        category: "Data Retrieval",
        method: "POST",
        path: "/api/v1/brand-preferences",
        description: "Get Brand Preferences",
        requestBody: {
          user_id: "string",
          token:"string"
        },
        responses: { 200: `"string"`, 422: `{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}` },
      },
      {
        category: "Data Retrieval",
        method: "POST",
        path: "/api/v1/food-data",
        description: "Get Food Data",
        requestBody: {
          user_id: "string",
          token:"string"
        },
        responses: { 200: `"string"`, 422: `{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}` },
      },
      {
        category: "Data Retrieval",
        method: "POST",
        path: "/api/v1/insurance-data",
        description: "Get Insurance Data",
        requestBody: {
          user_id: "string",
          token:"string"
        },
        responses: { 200: `"string"`, 422: `{
  "detail": [
    {
      "loc": [  
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}` },
      },
  ];

  const schemas = [
    {
      name: "CandidateLogin",
      fields: [
        { key: "mail", type: "string", required: true },
        { key: "password", type: "string", required: true },
      ],
    },
    {
      name: "ProfileSetup",
      fields: [
        { key: "firstname", type: "string" },
        { key: "lastname", type: "string" },
        { key: "mobilenumber", type: "string" },
        { key: "companyname", type: "string" },
        { key: "website", type: "string" },
        { key: "purpose", type: "string" },
        { key: "mail", type: "string" },
      ],
    },
    {
      name: "UserCreate",
      fields: [
        { key: "mail", type: "string", required: true },
        { key: "password", type: "string", required: true },
        { key: "confirmpassword", type: "string", required: true },
      ],
    },
    {
        name: "ValidationError",
        fields: [
          { key: "loc", type: "string || integer", required: true },
          { key: "msg", type: "string", required: true },
          { key: "type", type: "string", required: true },
        ],
      },
  ];
  
  const BASE_URL = 'https://developer-api-53407187172.us-central1.run.app';

  const ApiDocumentation = () => {
    return (
      <Box p={{ base: 3, md: 5 }} borderRadius="lg" bg="gray.100" maxW="100%">
        <Heading size="lg" mb={6} textAlign="center" color="black">
          API Documentation
        </Heading>
        {apiEndpoints.map((endpoint, index) => (
          <ApiSection key={index} endpoint={endpoint} />
        ))}
        <SchemaSection />
      </Box>
    );
  };
  
  const ApiSection = ({ endpoint }) => {
    const { isOpen, onToggle } = useDisclosure();
    const [requestBody, setRequestBody] = useState(endpoint.requestBody || {});
    const [response, setResponse] = useState(null);
    const [requestedUrl, setRequestedUrl] = useState('');
    const { apiKey } = useApiKey(); // Retrieve the access token

    const handleInputChange = (key, value) => {
      setRequestBody({ ...requestBody, [key]: value });
    };
  
    const handleSubmit = async () => {
      if (!apiKey) {
        alert('You must be logged in to use this API.');
        return;
      }
  
      const fullUrl = `${BASE_URL}${endpoint.path}`;
      setRequestedUrl(fullUrl);
  
      try {
        const res = await axios({
          method: endpoint.method.toLowerCase(),
          url: fullUrl,
          data: requestBody,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`, // Include the access token
          },
        });
        setResponse(res.data);
      } catch (error) {
        console.error('Error:', error);
        setResponse(error.response ? error.response.data : 'Error');
      }
    };
  
    return (
      <Box
        mb={6}
        p={{ base: 3, md: 4 }}
        borderWidth="1px"
        borderRadius="md"
        bg="white"
        shadow="md"
        transition="all 0.3s ease"
        _hover={{ transform: "translateY(-4px)", shadow: "lg" }}
      >
        {/* Header */}
        <Flex
          align={{ base: "flex-start", md: "center" }}
          justify="space-between"
          flexDirection={{ base: "column", md: "row" }}
        >
          <Flex
            align="center"
            flexDirection={{ base: "column", md: "row" }}
            cursor="pointer"
            onClick={onToggle}
            w="full"
          >
            <Badge
              colorScheme={endpoint.method === "GET" ? "blue" : "green"}
              mb={{ base: 2, md: 0 }}
              mr={{ base: 0, md: 3 }}
              px={2}
              py={1}
              borderRadius="md"
              fontSize={{ base: "0.8em", md: "0.9em" }}
            >
              {endpoint.method}
            </Badge>
            <Text
              fontSize={{ base: "md", md: "lg" }}
              fontWeight="bold"
              color="gray.700"
              mb={{ base: 1, md: 0 }}
            >
              {endpoint.path}
            </Text>
            <Text fontSize={{ base: "sm", md: "md" }} color="gray.500">
              {endpoint.description}
            </Text>
          </Flex>
          <Spacer />
          <Box alignSelf={{ base: "flex-end", md: "center" }}>
            <CopyButton textToCopy={endpoint.path} />
          </Box>
          <Icon
            as={isOpen ? FaChevronUp : FaChevronDown}
            boxSize={5}
            cursor="pointer"
            mt={{ base: 2, md: 0 }}
            onClick={onToggle}
          />
        </Flex>
  
        {/* Collapsible Content */}
        <Collapse in={isOpen} animateOpacity>
          <VStack
            align="start"
            spacing={4}
            mt={4}
            bg="gray.50"
            p={{ base: 2, md: 4 }}
            borderRadius="md"
          >
             {Object.keys(endpoint.requestBody).length > 0 && (
            <Box w="full">
              <Text fontWeight="semibold" fontSize="md" mb={2}>
                Request Body:
              </Text>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                {Object.keys(endpoint.requestBody).map((key) => (
                  <FormControl key={key}>
                    <FormLabel>{key}</FormLabel>
                    <Input
                      placeholder={`Enter ${key}`}
                      value={requestBody[key] || ''}
                      onChange={(e) => handleInputChange(key, e.target.value)}
                    />
                  </FormControl>
                ))}
              </SimpleGrid>
            </Box>
          )}
  <Button colorScheme="teal" onClick={handleSubmit}>
            Send Request
          </Button>

          {requestedUrl && (
            <Box w="full" mt={4}>
              <Text fontWeight="semibold" fontSize="md" mb={2}>
                Requested URL:
              </Text>
              <Textarea
                value={requestedUrl}
                readOnly
                bg="gray.100"
                borderRadius="md"
                fontSize="sm"
                overflowX="auto"
              />
            </Box>
          )}

          {response && (
            <Box w="full" mt={4}>
              <Text fontWeight="semibold" fontSize="md" mb={2}>
                Response:
              </Text>
              <Textarea
                value={JSON.stringify(response, null, 2)}
                readOnly
                bg="gray.100"
                borderRadius="md"
                fontSize="sm"
                overflowX="auto"
              />
            </Box>
          )}
        </VStack>
      </Collapse>
    </Box>
    );
  };
  
  const SchemaSection = () => {
    return (
      <Box mt={8} p={{ base: 3, md: 4 }} borderWidth="1px" borderRadius="md" bg="white" shadow="md">
        <Heading size="md" mb={4} color="teal.500">
          Schemas
        </Heading>
        {schemas.map((schema, index) => (
          <Box key={index} p={3} bg="gray.50" borderRadius="md" borderWidth="1px" mb={4}>
            <Text fontWeight="semibold" color="gray.600">
              {schema.name}
            </Text>
            <Box mt={2}>
              {schema.fields.map((field, idx) => (
                <Text key={idx} fontSize="sm" color="gray.700" mb={1}>
                  <strong>{field.key}:</strong> <span style={{ color: "teal" }}>{field.type}</span>{" "}
                  {field.required && (
                    <Badge colorScheme="red" ml={1} fontSize="0.7em">
                      Required
                    </Badge>
                  )}
                </Text>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    );
  };
  
  const CopyButton = ({ textToCopy }) => {
    const [copied, setCopied] = useState(false);
    const handleCopy = async () => {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };
    return (
      <Tooltip label={copied ? "Copied!" : "Copy"} placement="top" hasArrow>
        <Button
          size="sm"
          colorScheme={copied ? "green" : "teal"}
          variant="ghost"
          onClick={handleCopy}
          leftIcon={copied ? <FaCheck /> : <FaCopy />}
        >
          Copy
        </Button>
      </Tooltip>
    );
  };
  
  export default ApiDocumentation;