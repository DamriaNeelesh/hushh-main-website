import { Box, Heading } from "@chakra-ui/react";
import ApiSection from "./api-section";

const authenticationEndpoints = [
  {
    method: "POST",
    path: "/register/",
    description: "Signup",
    requestBody: { mail: "user@example.com", password: "string", confirmpassword: "string" },
    responses: { 200: `"string"`, 422: `{"detail": "Validation Error"}` },
  },
  {
    method: "POST",
    path: "/login",
    description: "Login",
    requestBody: { mail: "user@example.com", password: "string" },
    responses: { 200: `"string"`, 422: `{"detail": "Validation Error"}` },
  },
  {
    method: "POST",
    path: "/validatetoken",
    description: "Validate Token",
    requestBody: { token: "string" },
    responses: { 200: `"string"`, 422: `{"detail": [{"loc": [], "msg": "string"}]}` },
  },
  {
    method: "POST",
    path: "/refreshtoken",
    description: "Refresh Token",
    requestBody: { mail: "user@example.com", api_key: "string" },
    responses: { 200: `"string"`, 422: `{"detail": [{"loc": [], "msg": "string"}]}` },
  },
];

const Authentication = () => (
    <Box p={5}>
      <Heading mb={6} color="teal.500">Authentication APIs</Heading>
      {authenticationEndpoints.map((endpoint, idx) => <ApiSection key={idx} endpoint={endpoint} />)}
    </Box>
  );
  
  export default Authentication;
