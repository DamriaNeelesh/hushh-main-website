import React from "react";
import Link from "next/link";
import { Box, Container, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import ContentWrapper from "../layout/ContentWrapper";

export default function LegalPageShell({
  title,
  subtitle,
  updatedLabel,
  children,
}) {
  return (
    <Box bg="#f5f5f7">
      <ContentWrapper includeHeaderSpacing={true}>
        <Container maxW="container.xl" py={{ base: 16, md: 20, lg: 24 }}>
          <VStack spacing={{ base: 10, md: 12, lg: 14 }} align="stretch">
            <VStack spacing={{ base: 4, md: 5, lg: 6 }} align="center" textAlign="center">
              <Text
                fontSize={{ base: "12px", md: "13px" }}
                fontWeight="700"
                letterSpacing="0.24em"
                textTransform="uppercase"
                color="#007AFF"
                fontFamily="Manrope, sans-serif"
              >
                Legal
              </Text>
              <Heading
                as="h1"
                fontSize={{ base: "44px", md: "68px", lg: "88px" }}
                fontWeight="700"
                textAlign="center"
                lineHeight={{ base: 1.08, md: 1.0, lg: 0.96 }}
                letterSpacing={{ base: "-1px", md: "-2px", lg: "-3px" }}
                color="#111827"
                fontFamily="Inter, sans-serif"
              >
                {title}
              </Heading>
              {subtitle ? (
                <Text
                  fontSize={{ base: "19px", md: "24px", lg: "28px" }}
                  textAlign="center"
                  lineHeight={{ base: 1.5, md: 1.4 }}
                  color="#4B5563"
                  fontWeight="400"
                  maxW={{ base: "100%", md: "85%", lg: "72%" }}
                  px={{ base: 4, md: 0 }}
                  fontFamily="Inter, sans-serif"
                  letterSpacing="-0.01em"
                >
                  {subtitle}
                </Text>
              ) : null}
              {updatedLabel ? (
                <Text
                  fontSize={{ base: "15px", md: "17px" }}
                  color="#6B7280"
                  fontWeight="500"
                  fontFamily="Inter, sans-serif"
                  textAlign="center"
                >
                  {updatedLabel}
                </Text>
              ) : null}
            </VStack>

            <Box
              maxW="5xl"
              mx="auto"
              w="full"
              rounded={{ base: "24px", md: "32px" }}
              border="1px solid rgba(15, 23, 42, 0.06)"
              bg="white"
              px={{ base: 5, md: 8, lg: 10 }}
              py={{ base: 8, md: 10, lg: 12 }}
              boxShadow="0 24px 80px rgba(15, 23, 42, 0.06)"
            >
              {children}
            </Box>

            <Box
              maxW="5xl"
              mx="auto"
              w="full"
              rounded={{ base: "20px", md: "28px" }}
              border="1px solid rgba(15, 23, 42, 0.06)"
              bg="rgba(255, 255, 255, 0.85)"
              px={{ base: 5, md: 8 }}
              py={{ base: 5, md: 6 }}
              boxShadow="0 16px 48px rgba(15, 23, 42, 0.04)"
            >
              <VStack spacing={4} align="start">
                <Text
                  fontSize={{ base: "12px", md: "13px" }}
                  fontWeight="700"
                  letterSpacing="0.22em"
                  textTransform="uppercase"
                  color="#6B7280"
                  fontFamily="Manrope, sans-serif"
                >
                  Continue Exploring
                </Text>
                <HStack spacing={{ base: 3, md: 4 }} flexWrap="wrap">
                  {[
                    { label: "Home", href: "/" },
                    { label: "Agent Kai", href: "/products/kai" },
                    { label: "Privacy Policy", href: "/privacy" },
                    { label: "Terms of Use", href: "/terms" },
                    { label: "Contact", href: "/contact-us" },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="inline-flex items-center rounded-full border border-[rgba(17,24,39,0.1)] bg-white px-4 py-2.5 text-[14px] font-semibold text-[#111827] transition-colors hover:border-[rgba(0,122,255,0.3)] hover:text-[#007AFF] md:px-5 md:py-3 md:text-[15px]"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </HStack>
              </VStack>
            </Box>
          </VStack>
        </Container>
      </ContentWrapper>
    </Box>
  );
}
