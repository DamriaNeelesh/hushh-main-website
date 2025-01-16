'use client'
import {
    Box,
    VStack,
    Text,
    Heading,
    Divider,
    Link,
    UnorderedList,
    ListItem,
    Stack,
  } from "@chakra-ui/react";
import FooterComponent from "../_components/features/FooterComponent";
import Header from "../_components/header";
  
  const hushhPress = () => {
    return (
        <>
        {/* <Header/> */}
      <Box
        bg="black"
        color="white"
        py={{ base: 20, md: 24 }}
        px={{ base: 6, md: 24 }}
        fontFamily="Helvetica, Arial, sans-serif"
        lineHeight="1.8"
      >
        <VStack spacing={{ base: 8, md: 12 }} align="start" w="full">
          <Heading
            fontSize={{ base: "2xl", md: "4xl" }}
            textAlign="center"
            w="full"
          >
            Welcome to Hushh: Your Data. Your Business.
          </Heading>
  
          {/* Mission Section */}
          <VStack spacing={4} align="start">
            <Heading fontSize={{ base: "xl", md: "2xl" }}>Our Mission</Heading>
            <Text fontSize={{ base: "md", md: "lg" }}>
              At Hushh, we believe your data is one of your most valuable assets.
              In a world where personal information is often exploited without
              consent, we empower individuals to take back control, transform
              their data into real wealth, and decide how and with whom they share
              it.
            </Text>
            <Text fontSize={{ base: "md", md: "lg" }}>
              Hushh is more than a platform—it’s a movement to redefine how the
              world views and uses personal data.
            </Text>
          </VStack>
  
          {/* Vision Section */}
          <VStack spacing={4} align="start">
            <Heading fontSize={{ base: "xl", md: "2xl" }}>Our Vision</Heading>
            <Text fontSize={{ base: "md", md: "lg" }}>
              To create a better, more human-centered world where technology and
              data work for you—not the other way around. By combining
              privacy-first innovation, luxury experiences, and financial
              empowerment, we’re building a future where your life, your time,
              and your data are truly yours.
            </Text>
          </VStack>
  
          {/* Core Values Section */}
          <VStack spacing={4} align="start">
            <Heading fontSize={{ base: "xl", md: "2xl" }}>Our Core Values</Heading>
            <UnorderedList fontSize={{ base: "md", md: "lg" }} spacing={3}>
              <ListItem>
                <b>Customers Come First:</b> Every decision we make is guided by
                the people we serve: our users. We work backward from your needs
                to ensure every interaction with Hushh is effortless, rewarding,
                and trustworthy.
              </ListItem>
              <ListItem>
                <b>Simplicity is Everything:</b> Inspired by the timeless wisdom
                of Steve Jobs, we believe simplicity is the ultimate
                sophistication. Hushh is designed to be intuitive, elegant, and
                easy to use—so you can focus on what matters most in your life.
              </ListItem>
              <ListItem>
                <b>Privacy is Non-Negotiable:</b> We are committed to
                privacy-first technology. Your data belongs to you. Every action
                is governed by your consent. We use end-to-end encryption and
                on-device processing to protect your information at every step.
              </ListItem>
              <ListItem>
                <b>Turning Data into Wealth:</b> Inspired by Warren Buffett’s
                value-driven principles, Hushh transforms your personal data into
                tangible financial rewards.
              </ListItem>
            </UnorderedList>
          </VStack>
  
          {/* What We Offer Section */}
          <VStack spacing={4} align="start">
            <Heading fontSize={{ base: "xl", md: "2xl" }}>What We Offer</Heading>
            <Stack spacing={4}>
              <Text fontSize={{ base: "md", md: "lg" }}>
                <b>Control Over Your Data:</b> View your personal data in a clear,
                organized dashboard. Decide which businesses or brands can access
                your data.
              </Text>
              <Text fontSize={{ base: "md", md: "lg" }}>
                <b>Monetization Made Simple:</b> Earn in USD (via USDC), Euros, or
                Bitcoin. See real-time earnings from shared data streams. Get
                exclusive offers tailored to your preferences.
              </Text>
            </Stack>
          </VStack>
  
          {/* Why Hushh Section */}
          <VStack spacing={4} align="start">
            <Heading fontSize={{ base: "xl", md: "2xl" }}>Why Hushh?</Heading>
            <Text fontSize={{ base: "md", md: "lg" }}>
              We’re creating a better digital economy that respects privacy,
              enables financial inclusion, and bridges gaps between technology,
              people, and opportunity.
            </Text>
          </VStack>
  
          {/* Invitation Section */}
          <VStack spacing={4} align="start">
            <Heading fontSize={{ base: "xl", md: "2xl" }}>Our Invitation</Heading>
            <Text fontSize={{ base: "md", md: "lg" }}>
              We’re just getting started, and we invite you to join us in shaping
              the future of personal data empowerment. Whether you’re a user, a
              creator, or a business, Hushh is here to unlock new opportunities
              for you.
            </Text>
            <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold">
              Your Life. Your Time. Your Data. Your Business.
            </Text>
          </VStack>
  
          {/* Media Contact Section */}
          <VStack spacing={4} align="start">
            <Heading fontSize={{ base: "xl", md: "2xl" }}>Media Contact</Heading>
            <Text fontSize={{ base: "md", md: "lg" }}>
              Email: press@hushh.ai
            </Text>
            <Text fontSize={{ base: "md", md: "lg" }}>
              Phone: +14252969050 
            </Text>
            <Link
              href="https://www.hushh.ai"
              fontSize={{ base: "md", md: "lg" }}
              color="blue.400"
              isExternal
            >
              Visit hushh.ai
            </Link>
            {/* <Link
              href="https://www.hushh.ai"
              fontSize={{ base: "md", md: "lg" }}
              color="blue.400"
              isExternal
            >
              Visit hushh.ai
            </Link> */}
          </VStack>
        </VStack>
      </Box>
      <FooterComponent/>
      </>
    );
  };
  
  export default hushhPress;
  