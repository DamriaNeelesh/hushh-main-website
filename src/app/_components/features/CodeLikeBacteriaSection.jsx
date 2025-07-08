"use client";
import React from "react";
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";
import Image from "next/image";
import bacteria_small from "../svg/screen_1_image_1.svg";
import bacteria_portable from "../svg/screen_1_image_2.1.svg";
import bacteria_self_contained from "../svg/screen_1_image_2.2.svg";
import bacteria_modular from "../svg/screen_1_image_3.svg";

const CodeLikeBacteriaSection = () => {
  const features = [
    {
      title: "Small",
      description: "Every function is lightweight each line of code costs energy",
      image: bacteria_small,
      bgColor: "#000000"
    },
    {
      title: "Portable",
      description: "Everything should be GitHub gist-worthy",
      image: bacteria_portable,
      bgColor: "#000000"
    },
    {
      title: "Self-Contained",
      description: "No dependencies; yoinkable and remixable",
      image: bacteria_self_contained,
      bgColor: "#000000"
    },
    {
      title: "Modular",
      description: "Organized into swappable gene clusters",
      image: bacteria_modular,
      bgColor: "#000000"
    }
  ];

  const FeatureCard = ({ feature }) => (
    <Box
      bg={feature.bgColor}
      borderRadius="24px"
      border="none"
      h="full"
      minH={{ base: "180px", md: "200px", lg: "220px" }}
      w="full"
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: "0 12px 40px rgba(0, 0, 0, 0.3)",
      }}
      transition="all 0.3s ease"
      overflow="hidden"
      position="relative"
    >
      {/* Background Image using Next/Image */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        borderRadius="24px"
        overflow="hidden"
        zIndex={0}
      >
        <Image
          src={feature.image}
          alt={`${feature.title} bacteria visualization`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
          priority={true}
        />
      </Box>
      
      {/* Gradient overlay for better text readability */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bgGradient="linear(to-t, rgba(0,0,0,0.8), transparent)"
        borderRadius="24px"
        zIndex={1}
      />
      
      <Box
        p={{ base: 5, md: 6, lg: 7 }}
        position="relative"
        zIndex={2}
        h="full"
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
      >
        <VStack spacing={{ base: 2, md: 3 }} align="flex-start" textAlign="left">
          {/* Feature Title */}
          <Heading
            as="h3"
            fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
            fontFamily="Inter"
            fontWeight={700}
            color="white"
            letterSpacing="-0.02em"
            lineHeight="1.1"
          >
            {feature.title}
          </Heading>

          {/* Feature Description */}
          <Text
            fontSize={{ base: "sm", md: "md", lg: "lg" }}
            fontFamily="Inter"
            fontWeight={400}
            color="rgba(255, 255, 255, 0.9)"
            lineHeight="1.3"
            letterSpacing="-0.01em"
            maxW="95%"
          >
            {feature.description}
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
          spacing={{ base: 8, md: 12, lg: 16 }} 
          align="center" 
          textAlign="center"
          w="full"
          maxW="1400px"
          mx="auto"
        >
          {/* Main Heading */}
          <VStack spacing={{ base: 4, md: 6, lg: 8 }} w="full">
            <Heading
              as="h2"
              fontSize={{ base: "4xl", sm: "5xl", md: "6xl", lg: "7xl", xl: "8xl" }}
              fontFamily="Inter"
              fontWeight={700}
              letterSpacing="-0.02em"
              lineHeight={{ base: "1.1", md: "1.05" }}
              color="#1A1A1A"
              maxW="full"
            >
              Code Like Bacteria
            </Heading>
            
            {/* Detailed Subtitle */}
            <Text
              fontSize={{ base: "md", sm: "lg", md: "xl", lg: "2xl" }}
              fontFamily="Inter"
              fontWeight={400}
              letterSpacing="-0.01em"
              lineHeight={{ base: "1.5", md: "1.4" }}
              color="#4A5568"
              maxW={{ base: "full", md: "5xl", lg: "6xl" }}
              px={{ base: 2, md: 4 }}
            >
              Building on the idea proposed by{" "}
              <Text as="span" fontWeight={600} color="#1A1A1A">
                Andrej Karpathy
              </Text>{" "}
              the foundation of our open-source protocol draws from the most successful system in biology: bacterial DNA. The Bacterial Code Guidelines are shown below. By keeping each unit small, useful, and drop-in ready, contributors can: Fork and remix code without setup, Inject useful behaviors into agents without breaking surrounding context, Compose new agent flows via copy-paste, not imports
            </Text>
          </VStack>

          {/* Cards Layout - Responsive Grid */}
          <Box w="full" maxW="1200px">
            {/* Mobile & Tablet: 2x2 Grid, then Desktop: 3-Column Layout */}
            <SimpleGrid 
              columns={{ base: 1, md: 2, lg: 3 }}
              spacing={{ base: 6, md: 8, lg: 6, xl: 8 }}
              w="full"
              alignItems="stretch"
            >
              {/* Small - Takes full column on all layouts */}
              <Box gridColumn={{ lg: "1" }} gridRow={{ lg: "1 / span 2" }}>
                <FeatureCard feature={features[0]} />
              </Box>

              {/* Portable - Top right on desktop, second on mobile/tablet */}
              <Box gridColumn={{ lg: "2" }} gridRow={{ lg: "1" }}>
                <FeatureCard feature={features[1]} />
              </Box>

              {/* Self-Contained - Bottom middle on desktop */}
              <Box gridColumn={{ lg: "2" }} gridRow={{ lg: "2" }}>
                <FeatureCard feature={features[2]} />
              </Box>

              {/* Modular - Right column full height on desktop */}
              <Box gridColumn={{ lg: "3" }} gridRow={{ lg: "1 / span 2" }}>
                <FeatureCard feature={features[3]} />
              </Box>
            </SimpleGrid>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default CodeLikeBacteriaSection; 