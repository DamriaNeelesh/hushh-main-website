import { Box, Heading , SimpleGrid} from "@chakra-ui/react";
import ApiSection from "./api-section";

const dataRetrievalEndpoints = [
  {
    method: "POST",
    path: "/api/v1/receipt_data",
    description: "Receipt User Data",
    requestBody: { user_id: "string", token: "string" },
    responses: { 200: `"string"`, 422: `{"detail": [{"loc": [], "msg": "string"}]}` },
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
  // Add remaining data retrieval APIs here
];

const DataRetrieval = () => (
    <Box p={5}>
      <Heading mb={6} color="teal.500">Data Retrieval APIs</Heading>
      {dataRetrievalEndpoints.map((endpoint, idx) => <ApiSection key={idx} endpoint={endpoint} />)}
    </Box>
  );
  
  export default DataRetrieval;

