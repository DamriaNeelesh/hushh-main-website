import { Box, Container, VStack, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import ContentWrapper from "./_components/layout/ContentWrapper";

export default function NotFound() {
  return (
    <ContentWrapper surface="muted">
      <Container maxW="7xl" py={{ base: 16, md: 20, lg: 24 }}>
        <VStack
          spacing={{ base: 8, md: 10 }}
          textAlign="center"
          minH="60vh"
          justify="center"
          rounded={{ base: "24px", md: "32px" }}
          border="1px solid rgba(15, 23, 42, 0.06)"
          bg="white"
          px={{ base: 6, md: 10 }}
          py={{ base: 10, md: 14 }}
          boxShadow="0 24px 80px rgba(15, 23, 42, 0.06)"
        >
          <Box>
            <Text className="site-page-eyebrow" mb={4}>
              Navigation
            </Text>
            <Heading
              as="h1"
              className="site-page-title"
              mb={4}
              fontSize={{ base: "64px", md: "96px" }}
            >
              404
            </Heading>
            <Heading
              as="h2"
              fontSize={{ base: "28px", md: "42px" }}
              fontWeight="700"
              color="#111827"
              fontFamily="heading"
              mb={4}
              letterSpacing="-0.03em"
            >
              Page Not Found
            </Heading>
            <Text className="site-page-copy" maxW="xl" mx="auto">
              Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or deleted.
            </Text>
          </Box>

          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-[12px] bg-[#1A1A1B] px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#0A1128]"
            style={{ fontFamily: "var(--site-font-heading)" }}
          >
            Return Home
          </Link>
        </VStack>
      </Container>
    </ContentWrapper>
  );
}
