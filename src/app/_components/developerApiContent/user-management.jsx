import { Box, Heading } from "@chakra-ui/react";
import ApiSection from "./api-section";
const userManagementEndpoints = [
  {
    method: "POST",
    path: "/profilesetup",
    description: "Profile Setup",
    requestBody: { firstname: "string", lastname: "string", mail: "string" },
    responses: { 200: `"string"`, 422: `{"detail": "Validation Error"}` },
  },
  {
    method: "POST",
    path: "/generateapikey",
    description: "Generate Api Key",
    requestBody: { mail: "string" },
    responses: { 200: `"string"`, 422: `{"detail": [{"loc": [], "msg": "string"}]}` },
  },
  {
    method: "GET",
    path: "/getapikey",
    description: "Get Api Key",
    requestBody: { mail: "user@example.com" },
    responses: { 200: `"string"`, 422: `{"detail": [{"loc": [], "msg": "string"}]}` },
  },
];

const UserManagement = () => (
    <Box p={5}>
      <Heading mb={6} color="teal.500">User Management APIs</Heading>
      {userManagementEndpoints.map((endpoint, idx) => <ApiSection key={idx} endpoint={endpoint} />)}
    </Box>
  );
  
  export default UserManagement;
