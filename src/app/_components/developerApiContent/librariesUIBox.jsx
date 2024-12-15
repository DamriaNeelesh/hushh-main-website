import React from "react";
import { Grid, Box, Heading, Text, Button } from "@chakra-ui/react";
import 'tailwindcss/tailwind.css';
import { FiArrowRight } from "react-icons/fi";
import '../../../../pages/fonts.css'

const LibrariesUIBox = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 mt-2 md:mt-5 lg:grid-cols-4 gap-4 mb-6">
        <div className="rounded-lg border shadow-sm bg-gray-100 p-6">
          <Heading size={{md:"8rem",base:'4rem'}} fontWeight="semibold" whiteSpace="nowrap">
            PII
          </Heading>
          <Button display={'flex'} bg={'transparent'} fontWeight={'700'} href={'https://hushh.gitbook.io/hushh-docs/api-reference/pii-api'} textDecoration={'underline'} rightIcon={<FiArrowRight/>}>Get Started </Button>
        </div>
        <div className="rounded-lg border shadow-sm bg-gray-100 p-6">
          <Heading size={{md:"8rem",base:'4rem'}} fontWeight="semibold" whiteSpace="nowrap">
            Fashion API
          </Heading>
          <Button bg={'transparent'} display={'flex'} fontWeight={'700'} href={'https://hushh.gitbook.io/hushh-docs/api-reference/fashion-api'} textDecoration={'underline'} rightIcon={<FiArrowRight/>}>Get Started </Button>

        </div>
        <div className="rounded-lg border shadow-sm bg-gray-100 p-6">
          <Heading size={{md:"8rem",base:'4rem'}} fontWeight="semibold" whiteSpace="nowrap">
            Transactions API
          </Heading>
          <Button bg={'transparent'} display={'flex'} fontWeight={'700'} href={'https://hushh.gitbook.io/hushh-docs/api-reference/transactions-api'} textDecoration={'underline'} rightIcon={<FiArrowRight/>}>Get Started </Button>

        </div>{" "}
        <div className="rounded-lg border shadow-sm bg-gray-100 p-6">
          <Heading size={{md:"8rem",base:'4rem'}} fontWeight="semibold" whiteSpace="nowrap">
            Travel
          </Heading>
          <Button bg={'transparent'} display={'flex'} fontWeight={'700'} textDecoration={'underline'} rightIcon={<FiArrowRight/>}>Coming Soon! </Button>

        </div>{" "}
        <div className="rounded-lg border shadow-sm bg-gray-100 p-6">
          <Heading size={{md:"8rem",base:'4rem'}} fontWeight="semibold" whiteSpace="nowrap">
            Social Media
          </Heading>
          <Button bg={'transparent'} display={'flex'} fontWeight={'700'}  textDecoration={'underline'} rightIcon={<FiArrowRight/>}>Coming Soon! </Button>

        </div>{" "}
        <div className="rounded-lg border shadow-sm bg-gray-100 p-6">
          <Heading size={{md:"8rem",base:'4rem'}} fontWeight="semibold" whiteSpace="nowrap">
            Fitness
          </Heading>
          <Button bg={'transparent'} display={'flex'} fontWeight={'700'} textDecoration={'underline'} rightIcon={<FiArrowRight/>}>Coming Soon! </Button>

        </div>
      </div>
    </>
  );
};

export default LibrariesUIBox;

{
  /* <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4} mb={6}>
  <Box
    rounded="lg"
    borderWidth="1px"
    borderColor="text-card-foreground"
    boxShadow="sm"
    bg="gray.100"
  >
    <Box p={6}>
      <Heading size={{md:"lg",base:'md'}} fontWeight="semibold" whiteSpace="nowrap">
        Ruby
      </Heading>
    </Box>
    <Box p={6}>
      <Text fontSize="sm">
        A dynamic, open source programming language with a focus on simplicity and productivity.
      </Text>
    </Box>
  </Box>

  <Box
    rounded="lg"
    borderWidth="1px"
    borderColor="text-card-foreground"
    boxShadow="sm"
    bg="gray.100"
  >
    <Box p={6}>
      <Heading size={{md:"lg",base:'md'}} fontWeight="semibold" whiteSpace="nowrap">
        Python
      </Heading>
    </Box>
    <Box p={6}>
      <Text fontSize="sm">
        A dynamic, open source programming language with a focus on simplicity and productivity.
      </Text>
    </Box>
  </Box>

  <Box
    rounded="lg"
    borderWidth="1px"
    borderColor="text-card-foreground"
    boxShadow="sm"
    bg="gray.100"
  >
    <Box p={6}>
      <Heading size={{md:"lg",base:'md'}} fontWeight="semibold" whiteSpace="nowrap">
        Node.js
      </Heading>
    </Box>
    <Box p={6}>
      <Text fontSize="sm">
        A dynamic, open source programming language with a focus on simplicity and productivity.
      </Text>
    </Box>
  </Box>
</Grid>  */
}
