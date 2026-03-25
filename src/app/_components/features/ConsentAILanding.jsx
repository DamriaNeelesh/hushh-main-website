"use client";
import React from "react";
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Button,
  HStack,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import section1Phone from "../svg/section_1_phone.svg";
import ContentWrapper from "../layout/ContentWrapper";

const ConsentAILanding = () => {
  const router = useRouter();

  return (
    <ContentWrapper>
      <Box
        minH="100vh"
        bg="#f8f6f1"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
      <Container maxW="full" mt={{md:0,base:4}} px={{ base: 4, md: 8, lg: 16 }}>
        <Box
          display={{ base: "block", lg: "flex" }}
          alignItems="center"
          justifyContent="space-between"
          w="full"
          maxW="1200px"
          mx="auto"
        >
          {/* Left: Text & CTA */}
          <VStack
            spacing={{ base: 6, md: 8 }}
            align={{ base: "center", lg: "flex-start" }}
            textAlign={{ base: "center", lg: "left" }}
            w={{ base: "full", lg: "55%" }}
            maxW="none"
            mb={{ base: 12, lg: 0 }}
          >
            {/* Beta Badge */}
            <Box>
              <Text
                fontSize={{ base: "lg", md: "xl" }}
                fontFamily="Inter"
                fontWeight={400}
                letterSpacing="wider"
                sx={{
                  color: "#8f8570",
                }}
              >
                Now in Open Beta
              </Text>
            </Box>

            {/* Main Heading */}
            <VStack
              spacing={{ base: 4, md: 6 }}
              w="full"
              align={{ base: "center", lg: "flex-start" }}
            >
              <Heading
                as="h1"
                fontSize={{ base: "4xl", sm: "5xl", md: "6xl" }}
                fontFamily="Inter"
                fontWeight={700}
                letterSpacing="-0.02em"
                lineHeight={{ base: "1.1", md: "1.05" }}
                color="#171b29"
                maxW="full"
              >
                The Consent AI Protocol
              </Heading>
            </VStack>
            {/* Subtitle */}
            <Box maxW={{ base: "full", md: "4xl", lg: "5xl" }}>
              <Text
                fontSize={{ base: "lg", sm: "xl", md: "2xl" }}
                fontFamily="Inter"
                fontWeight={400}
                letterSpacing="-0.01em"
                lineHeight={{ base: "1.4", md: "1.3" }}
                color="#5f5f5f"
                px={{ base: 2, lg: 0 }}
              >
                Empowering every verified iOS human with modular, trusted, consent-native 
                personal data agents that scale like bacteria but coordinate like complex life.
              </Text>
            </Box>
            {/* CTA Buttons */}
            <HStack
              spacing={{ base: 4, md: 8 }}
              w="full"
              justify={{ base: "center", lg: "flex-start" }}
              flexDirection={{ base: "column", sm: "row" }}
              maxW="600px"
            >
              <Button
                bg="#171b29"
                color="white"
                fontSize={{ base: "md", md: "lg", lg: "xl" }}
                fontFamily="Inter"
                fontWeight={600}
                h={{ base: "50px", md: "60px", lg: "64px" }}
                px={{ base: 8, md: 12, lg: 16 }}
                borderRadius="full"
                border="none"
                _hover={{
                  bg: "#0a1128",
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 25px rgba(10, 17, 40, 0.24)",
                }}
                _active={{
                  transform: "translateY(0)",
                }}
                transition="all 0.3s ease"
                w={{ base: "280px", sm: "auto" }}
                onClick={() => window.open("https://github.com/hushh-labs/Hushh-PDA-Hackathon-Starting-Repository", '_blank')}
              >
                Learn More
              </Button>
              <Button
                bg="transparent"
                color="#171b29"
                fontSize={{ base: "md", md: "lg", lg: "xl" }}
                fontFamily="Inter"
                fontWeight={600}
                h={{ base: "50px", md: "60px", lg: "64px" }}
                px={{ base: 8, md: 12, lg: 16 }}
                borderRadius="full"
                border="2px solid #171b29"
                _hover={{
                  bg: "#171b29",
                  color: "white",
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 25px rgba(10, 17, 40, 0.16)",
                }}
                _active={{
                  transform: "translateY(0)",
                }}
                transition="all 0.3s ease"
                w={{ base: "280px", sm: "auto" }}
                onClick={() => router.push("/contact-us")}
              >
                Contact Us 
              </Button>
            </HStack>
          </VStack>
          {/* Right: Mobile SVG */}
          <Box
            display={{ base: "flex", lg: "none" }}
            w="full"
            justifyContent="center"
            mt={{ base: 8, md: 12 }}
          >
            <Image
              src={section1Phone}
              alt="Consent API Mobile Preview"
              style={{ maxWidth: "350px", height: "auto" }}
              sizes="(max-width: 767px) 80vw, 350px"
              priority
            />
          </Box>
          <Box
            display={{ base: "none", lg: "flex" }}
            alignItems="center"
            justifyContent="center"
            w={{ lg: "45%" }}
            minW={{ lg: "350px" }}
            maxW={{ lg: "500px" }}
            h="auto"
          >
            <Image
              src={section1Phone}
              alt="Consent API Mobile Preview"
              style={{ width: "100%", height: "auto" }}
              sizes="(max-width: 1200px) 45vw, 500px"
              priority
            />
          </Box>
        </Box>
      </Container>
      </Box>
    </ContentWrapper>
  );
};

export default ConsentAILanding; 
