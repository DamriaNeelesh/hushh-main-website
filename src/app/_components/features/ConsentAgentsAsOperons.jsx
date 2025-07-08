"use client";
import React from "react";
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";
import Image from "next/image";
import geneLevel from "../svg/gene_level.svg";
import operonLevel from "../svg/operon.svg";
import agentLevel from "../svg/agent_level.svg";

const ConsentAgentsAsOperons = () => {
  const levels = [
    {
      title: "Gene Level",
      description: "Each Function is a Gene e.g., requestConsent, logDecision, encryptBlob",
      image: geneLevel,
      gridSpan: { base: 2, lg: 1 },
    },
    {
      title: "Operon Level",
      description: "Each consent workflow is an Operon e.g., userConnectsGmail, userSharesLocationOnce",
      image: operonLevel,
      gridSpan: { base: 2, lg: 1 },
    },
    {
      title: "Agent Level",
      description: "Each Agent is a living cell — able to grow, replicate, and interact across a secure ecosystem",
      image: agentLevel,
      gridSpan: { base: 2, lg: 2 },
    },
  ];

  const LevelCard = ({ level }) => (
    <Box
      bg="#000000"
      borderRadius="24px"
      h="full"
      minH={{ base: "250px", md: "300px", lg: "350px" }}
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: "0 12px 40px rgba(0, 0, 0, 0.3)",
      }}
      transition="all 0.3s ease"
      overflow="hidden"
      position="relative"
    >
      <Image
        src={level.image}
        alt={`${level.title} visualization`}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        style={{ objectFit: "cover", objectPosition: "center" }}
        priority
      />
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bgGradient="linear(to-t, rgba(0,0,0,0.6), transparent)"
        borderRadius="24px"
        zIndex={1}
      />
      <Box
        p={{ base: 6, md: 8 }}
        position="relative"
        zIndex={2}
        h="full"
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
      >
        <VStack spacing={{ base: 2, md: 3 }} align="flex-start">
          <Heading
            as="h3"
            fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
            fontFamily="Inter"
            fontWeight={700}
            color="white"
            letterSpacing="-0.02em"
          >
            {level.title}
          </Heading>
          <Text
            fontSize={{ base: "md", md: "xl", lg: "2xl" }}
            fontFamily="Inter"
            fontWeight={400}
            color="hsla(0, 0%, 100%, 1)"
            lineHeight="1.4"
            letterSpacing="-0.01em"
            maxW="95%"
          >
            {level.description}
          </Text>
        </VStack>
      </Box>
    </Box>
  );

  return (
    <Box
      minH="100vh"
      bg="#F8F9FA"
      display="flex"
      alignItems="center"
      justifyContent="center"
      py={{ base: 16, md: 20, lg: 24 }}
    >
      <Container maxW="full" px={{ base: 4, md: 8, lg: 16 }}>
        <VStack
          spacing={{ base: 12, md: 16 }}
          align="center"
          w="full"
          maxW="1400px"
          mx="auto"
        >
          {/* Header Section */}
          <HStack
            w="full"
            justifyContent="space-between"
            alignItems="center"
            flexDirection={{ base: "column", lg: "row" }}
            spacing={{ base: 4, lg: 8 }}
          >
            <Heading
              as="h2"
              fontSize={{ base: "4xl", sm: "5xl", md: "6xl", lg: "7xl" }}
              fontFamily="Inter"
              fontWeight={700}
              letterSpacing="-0.02em"
              color="#1A1A1A"
              textAlign={{ base: "center", lg: "left" }}
            >
              Consent Agents as Operons
            </Heading>
            <Text
              fontSize={{ base: "lg", sm: "xl", md: "2xl" }}
              fontFamily="Inter"
              fontWeight={400}
              color="#4A5568"
              maxW={{ base: "full", lg: "450px" }}
              textAlign={{ base: "center", lg: "right" }}
            >
              Each function is a gene, each workflow is an operon, each agent is
              a living cell
            </Text>
          </HStack>

          {/* Cards Layout */}
          <Box w="full" maxW="1200px">
            <SimpleGrid
              columns={2}
              spacing={{ base: 6, md: 8 }}
              w="full"
            >
              {levels.map((level, index) => (
                <Box
                  key={index}
                  gridColumn={{
                    base: `span ${level.gridSpan.base}`,
                    lg: `span ${level.gridSpan.lg}`,
                  }}
                >
                  <LevelCard level={level} />
                </Box>
              ))}
            </SimpleGrid>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default ConsentAgentsAsOperons; 