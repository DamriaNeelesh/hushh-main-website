import React from "react";
import {
  Box,
  VStack,
  Heading,
  ListItem,
  Divider,
  OrderedList
} from "@chakra-ui/react";

const HushhBot = () => {
  return (
    <Box
      mt={{ md: "0", base: "1rem" }}
      p={{ md: "4rem", base: "0.25rem" }}
      color="white"
    >
      <VStack spacing={6} align="start">
        <Heading
          as="h1"
          fontSize={{ md: "3xl", base: "2xl" }}
          className="gradient"
        >
          Interacting with Hushh Bot
        </Heading>

        <OrderedList spacing={4} fontSize={{ md: "lg", base: "sm" }}>
          <ListItem>
            Open the Hushh app and tap on the Hushh Bot icon in the chat section to start your interaction. 
          </ListItem>
          <ListItem>
          Enter your query or request into the Hushh Bot for help with documents, data entries, or using your data.
          </ListItem>
          <ListItem>
          The bot will process your request and give you actionable advice, or explaining your documents' content and significance. 
          </ListItem>
        </OrderedList>

        <Divider borderColor="gray.400" opacity={0.3} my={{ md: 4, base: 2 }} />

      </VStack>
    </Box>
  );
};

export default HushhBot;
