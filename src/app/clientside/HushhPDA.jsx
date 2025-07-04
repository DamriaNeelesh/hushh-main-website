"use client";
import React, { useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
  Image,
  List,
  ListItem,
  SimpleGrid,
} from "@chakra-ui/react";
import extendedTheme from "../theme";
import { useRouter } from "next/navigation";
import ContactForm from "../_components/features/contactForm";

const HushhPDA = () => {
  const router = useRouter();
  
  // Center detection for gradient effect - always running
  useEffect(() => {
    const handleMarqueeCenter = () => {
      const nameElements = document.querySelectorAll('.marquee-name');
      const centerY = window.innerHeight / 2;
      
      nameElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const elementCenterY = rect.top + rect.height / 2;
        const distanceFromCenter = Math.abs(centerY - elementCenterY);
        
        // Apply center styling if element is within 30px of center
        if (distanceFromCenter < 30) {
          element.style.background = 'linear-gradient(90deg, #0071E3, #BB62FC, #F34556, #F44F22)';
          element.style.webkitBackgroundClip = 'text';
          element.style.backgroundClip = 'text';
          element.style.webkitTextFillColor = 'transparent';
          element.style.fontSize = 'clamp(1.5rem, 4vw, 3rem)';
          element.style.fontWeight = 'bold';
          element.style.transform = 'scale(1.1)';
          element.style.transition = 'all 0.3s ease';
        } else {
          element.style.background = 'none';
          element.style.webkitBackgroundClip = 'initial';
          element.style.backgroundClip = 'initial';
          element.style.webkitTextFillColor = 'white';
          element.style.color = 'white';
          element.style.fontSize = 'clamp(1rem, 2.5vw, 2rem)';
          element.style.fontWeight = 'normal';
          element.style.transform = 'scale(1)';
          element.style.transition = 'all 0.3s ease';
        }
      });
    };

         // Start animation after 0.001 seconds
     let animationFrame;
     
     const startAnimation = () => {
       const smoothDetection = () => {
         handleMarqueeCenter();
         animationFrame = requestAnimationFrame(smoothDetection);
       };
       
       smoothDetection();
     };
     
     const timeout = setTimeout(startAnimation, 1); // 0.001 seconds = 1ms
     
     return () => {
       clearTimeout(timeout);
       if (animationFrame) {
         cancelAnimationFrame(animationFrame);
       }
     };
  }, []); // Empty dependency array - runs once and never stops

  return (
    <>

      {/* Product Page 1 - Hero Section */}
      <Box
        // minH="100vh"
        bg="#000000"
        color="white"
        position="relative"
        overflow="hidden"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Container maxW="100%" minW={'100%'} h="full">
          <VStack
            // spacing={{ base: 4, md: 6 }}
            align="center"
            justify="center"
            h="full"
            py={{ base: "10vh", md: "8vh" }}
          >
            {/* Powered by Hushh.ai */}
            <Box textAlign="center" w="full" mt={10}>
              <Text
                fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
                fontFamily="Inter"
                fontWeight={700}
                letterSpacing="0"
                lineHeight="shorter"
                bgGradient="linear(to-r, #0071E3, #BB62FC, #F34556, #F44F22)"
                bgClip="text"
                textAlign="center"
              >
                Powered by{" "}
                <Box as="span" display="inline-flex" alignItems="center" mx={2}>
                  <Image
                    src="/svgs/hushhEmoji.svg"
                    alt="Hushh Logo"
                    boxSize={{ base: "1.2rem", md: "1.5rem" }}
                    display="inline"
                  />
                </Box>{" "}
                Hushh.ai
              </Text>
            </Box>

            {/* Main Title */}
            <Box textAlign="center" maxW={{ base: "full", md: "90%", lg: "80%" }}>
              <Heading
                as="h1"
                fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
                fontFamily="Poppins"
                fontWeight={700}
                letterSpacing="0"
                lineHeight="shorter"
                className="gradient"
                textAlign="center"
              >
                Personal Data Agent
              </Heading>
            </Box>

            {/* Tagline */}
            <Box textAlign="center">
              <Text
                fontSize={{ base: "xl", sm: "2xl", md: "3xl", lg: "4xl" }}
                fontFamily="Figtree"
                fontWeight={400}
                letterSpacing="0"
                lineHeight="base"
                color="white"
                textAlign="center"
              >
                Your Agent. Your data. Your business. Your vibe
              </Text>
            </Box>

            {/* Product Image Container - Mobile with larger image */}
            <Box
              position="relative"
              w={{ base: "50vw", sm: "60vw", md: "70vw", lg: "80vw" }}
              h={{ base: "50vh", sm: "60vh", md: "70vh", lg: "80vh" }}
              display="flex"
              alignItems="center"
              justifyContent="center"
              flex={1}
            >
              {/* Gradient Shadow Background */}
              <Box
                position="absolute"
                w={{ base: "90%", md: "95%" }}
                h={{ base: "90%", md: "95%" }}
                bgGradient="radial(circle, rgba(179, 69, 217, 0.6) 0%, rgba(218, 75, 122, 0.4) 40%, transparent 70%)"
                borderRadius="50%"
                filter="blur(5rem)"
                zIndex={0}
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
              />

              {/* Mobile Phone Image - Made larger */}
              <Box
                position="relative"
                zIndex={1}
                w="80%"
                h="60%"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Image
                  src="/svgs/PdaMobile.svg"
                  alt="Personal Data Agent Mobile"
                  // w={{ base: "75%", sm: "80%", md: "85%", lg: "90%" }}
                  w={'auto'}
                  h="auto"
                  mb={'-100px'}
                  maxH="full"
                  objectFit="contain"
                  filter="drop-shadow(0 1.875rem 5rem rgba(179, 69, 217, 0.6))"
                />
              </Box>

              {/* CTA Buttons - Positioned at bottom of image container */}
              <HStack
                position="absolute"
                bottom={{ base: "0", md: "0" }}
                left="50%"
                transform="translateX(-50%)"
                spacing={{ base: 4, md: '12rem' }}
                zIndex={3}
              >
                {/* Learn More Button */}
                <Button
                  bg="linear-gradient(135deg, #da4b7a 0%, #b345d9 100%)"
                  borderRadius="20px"
                  w={{ base: "8.5rem", md: "18rem" }}
                  h={{ base: "3rem", md: "3.5rem" }}
                  fontSize={{ base: "0.875rem", md: "1rem" }}
                  fontFamily="Figtree"
                  fontWeight={600}
                  color="white"
                  border="none"
                  boxShadow="0 0.25rem 1.25rem rgba(218, 75, 122, 0.3)"
                  _hover={{
                    transform: "translateY(-0.125rem)",
                    boxShadow: "0 0.375rem 1.5rem rgba(218, 75, 122, 0.5)",
                  }}
                  transition="all 0.3s ease"
                  onClick={() => router.push("/about")}
                >
                  Learn More
                </Button>

                {/* Get Early Access Button */}
                <Button
                  bg="rgba(255, 255, 255, 0.95)"
                  backdropFilter="blur(0.625rem)"
                    borderRadius="20px"
                    w={{ base: "8.5rem", md: "18rem" }}
                    h={{ base: "3rem", md: "3.5rem" }}
                  fontSize={{ base: "0.875rem", md: "1rem" }}
                  fontFamily="Figtree"
                  fontWeight={600}
                  color="#8B5CF6"
                  border="1px solid rgba(255, 255, 255, 0.3)"
                  boxShadow="0 0.25rem 1.25rem rgba(139, 92, 246, 0.2)"
                  _hover={{
                    bg: "linear-gradient(135deg, #b345d9, #da4b7a)",
                    color: "white",
                    transform: "translateY(-0.125rem)",
                    boxShadow: "0 0.375rem 1.5rem rgba(139, 92, 246, 0.4)",
                  }}
                  transition="all 0.3s ease"
                  onClick={() => router.push("/contact-us")}
                >
                  Get Early Access
                </Button>
              </HStack>
            </Box>
          </VStack>
        </Container>
      </Box>

      {/* Product Page 2 - Full Height Carousel Section */}
      <Box
        minH="100vh"
        h="100vh"
        bg="#000000"
        color="white"
        overflow="hidden"
        position="relative"
      >
        {/* Background Grid Effect */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          opacity={0.1}
          className="grid-background"
        />

        {/* Main Carousel Container */}
        <Container maxW="100%" h="100vh" display="flex" alignItems="center">
          <Grid
            templateColumns={{ base: "1fr", lg: "1fr 1fr 1fr" }}
            gap={{ base: 0, lg: 16 }}
            w="100%"
            h="100%"
            alignItems="center"
          >
            {/* Left Side - Target Audience */}
            <GridItem>
              <VStack spacing={8} align={{ base: "center", lg: "flex-start" }} textAlign={{ base: "center", lg: "left" }}>
                <Heading
                  as="h2"
                  fontSize={{ base: "32px", md: "40px", lg: "48px" }}
                  fontFamily="Poppins"
                  fontWeight={700}
                  letterSpacing="0px"
                  lineHeight={{ base: "40px", md: "48px", lg: "56px" }}
                  bgGradient="linear(to-b, #ffffff 0%, #999999 70%)"
                  bgClip="text"
                  opacity={0.97}
                  maxW={{ base: "100%", lg: "400px" }}
                >
                  Top 1024 Leaders we want to onboard onto our platform
                </Heading>
              </VStack>
            </GridItem>

            {/* Center - Full Height Leader Names Carousel */}
            <GridItem>
              <Box 
                w="100%"
                minH="100vh"
                h="100vh"
                overflow="hidden"
                position="relative"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {/* Top Gradient Mask */}
                <Box
                  position="absolute"
                  top={0}
                  left={0}
                  right={0}
                  h="25vh"
                  bgGradient="linear(to-b, #000000 0%, rgba(0,0,0,0.8) 50%, transparent 100%)"
                  zIndex={2}
                  pointerEvents="none"
                />
                
                {/* Bottom Gradient Mask */}
                <Box
                  position="absolute"
                  bottom={0}
                  left={0}
                  right={0}
                  h="25vh"
                  bgGradient="linear(to-t, #000000 0%, rgba(0,0,0,0.8) 50%, transparent 100%)"
                  zIndex={2}
                  pointerEvents="none"
                />



                {/* CSS-based Infinite Marquee */}
                <Box
                  position="relative"
                  w="100%"
                  h="100vh"
                  overflow="hidden"
                >
                  {/* Softer gradient overlay for better visibility */}
                  <Box
                    position="absolute"
                    top="0"
                    left="0"
                    right="0"
                    bottom="0"
                    background="linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 25%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0.4) 75%, rgba(0,0,0,0.9) 100%)"
                    pointerEvents="none"
                    zIndex="2"
                  />
                  
                  {/* Infinite Scrolling Container */}
                  <Box
                    position="relative"
                    w="100%"
                    h="100vh"
                    css={{
                      '@keyframes scrollUp': {
                        '0%': {
                          transform: 'translateY(0)'
                        },
                        '100%': {
                          transform: 'translateY(-50%)'
                        }
                      }
                    }}
                  >
                    <Box
                      position="absolute"
                      w="100%"
                      css={{
                        animation: 'scrollUp 30s linear infinite'
                      }}
                      style={{
                        transform: 'translateY(-25%)', // Start from center
                      }}
                    >
                      {/* First set of names */}
                      <Box>
                        {[
                          "Satya Nadella",
                          "Tim Cook", 
                          "Andy Jassy",
                          "Sundar Pichai",
                          "Mark Zuckerberg",
                          "Jensen Huang",
                          "Elon Musk",
                          "Manish Sainani",
                          "Larry Fink",
                          "Jamie Dimon",
                          "Warren Buffett",
                          "Bernard Arnault",
                          "Pat Gelsinger",
                          "Shantanu Narayen",
                          "Mary Barra",
                          "Daniel Ek",
                          "Albert Bourla",
                          "Michael Dell",
                          "Reed Hastings",
                          "Doug McMillon",
                          "Cristiano Amon",
                          "Lisa Su",
                          "Arvind Krishna",
                          "Ginni Rometty",
                          "Safra Catz",
                          "Stéphane Bancel",
                          "Alex Gorsky",
                          "Bill Gates",
                          "Jeff Bezos"
                        ].map((name, index) => (
                          <Text 
                            key={`first-${index}`} 
                            className="marquee-name"
                            textAlign="center"
                            fontFamily="Figtree"
                            fontWeight="normal"
                            py="6px"
                            style={{ 
                              fontSize: 'clamp(1rem, 2.5vw, 2rem)',
                              color: 'white',
                              transition: 'all 0.3s ease',
                              lineHeight: '1.2'
                            }}
                          >
                            {name}
                          </Text>
                        ))}
                      </Box>
                      
                      {/* Second set of names for seamless loop */}
                      <Box>
                        {[
                          "Satya Nadella",
                          "Tim Cook", 
                          "Andy Jassy",
                          "Sundar Pichai",
                          "Mark Zuckerberg",
                          "Jensen Huang",
                          "Elon Musk",
                          "Manish Sainani",
                          "Larry Fink",
                          "Jamie Dimon",
                          "Warren Buffett",
                          "Bernard Arnault",
                          "Pat Gelsinger",
                          "Shantanu Narayen",
                          "Mary Barra",
                          "Daniel Ek",
                          "Albert Bourla",
                          "Michael Dell",
                          "Reed Hastings",
                          "Doug McMillon",
                          "Cristiano Amon",
                          "Lisa Su",
                          "Arvind Krishna",
                          "Ginni Rometty",
                          "Safra Catz",
                          "Stéphane Bancel",
                          "Alex Gorsky",
                          "Bill Gates",
                          "Jeff Bezos"
                        ].map((name, index) => (
                          <Text 
                            key={`second-${index}`} 
                            className="marquee-name"
                            textAlign="center"
                            fontFamily="Figtree"
                            fontWeight="normal"
                            py="6px"
                            style={{ 
                              fontSize: 'clamp(1rem, 2.5vw, 2rem)',
                              color: 'white',
                              transition: 'all 0.3s ease',
                              lineHeight: '1.2'
                            }}
                          >
                            {name}
                          </Text>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </GridItem>

            {/* Right Side - About Content */}
            <GridItem>
              <VStack spacing={8} align={{ base: "center", lg: "flex-start" }} textAlign={{ base: "center", lg: "left" }}>
                <Heading
                  as="h2"
                  fontSize={{ base: "48px", md: "56px", lg: "64px" }}
                  fontFamily="Poppins"
                  fontWeight={700}
                  letterSpacing="0px"
                  lineHeight={{ base: "56px", md: "64px", lg: "72px" }}
                  bgGradient="linear(145deg, #ffffff 0%, #dddde0 58.33%, #7a7a7e 100%)"
                  bgClip="text"
                >
                  About
                </Heading>

                <Text
                  fontSize={{ base: "20px", md: "24px", lg: "28px" }}
                  fontFamily="Figtree"
                  fontWeight={400}
                  letterSpacing="0px"
                  lineHeight={{ base: "28px", md: "32px", lg: "36px" }}
                  color="#ffffff"
                  maxW={{ base: "100%", lg: "500px" }}
                >
                  Meet Your Personal Data Agent called 🤫 until you give it your personal hushhname like mani$h for our founder and ceo, Manish Sainani
                  {"\n\n"}
                  AI that organizes your life, protects your privacy, and helps your data work for you — not the other way around.
                </Text>

                {/* Feature Tags */}
                <VStack spacing={6} align={{ base: "center", lg: "flex-start" }} w="full">
                  <HStack spacing={4}>
                    <Box w="40px" h="40px" bg="linear-gradient(135deg, #0071E3, #BB62FC)" borderRadius="50%" />
                    <Text
                      fontSize={{ base: "20px", md: "24px", lg: "28px" }}
                      fontFamily="Figtree"
                      fontWeight={500}
                      letterSpacing="0px"
                      lineHeight={{ base: "28px", md: "32px", lg: "36px" }}
                      color="#ffffff"
                    >
                      Privacy-first
                    </Text>
                  </HStack>

                  <HStack spacing={4}>
                    <Box w="40px" h="40px" bg="linear-gradient(135deg, #BB62FC, #F34556)" borderRadius="50%" />
                    <Text
                      fontSize={{ base: "20px", md: "24px", lg: "28px" }}
                      fontFamily="Figtree"
                      fontWeight={500}
                      letterSpacing="0px"
                      lineHeight={{ base: "28px", md: "32px", lg: "36px" }}
                      color="#ffffff"
                    >
                      AI-Driven
                    </Text>
                  </HStack>

                  <HStack spacing={4}>
                    <Box w="40px" h="40px" bg="linear-gradient(135deg, #F34556, #F44F22)" borderRadius="50%" />
                    <Text
                      fontSize={{ base: "20px", md: "24px", lg: "28px" }}
                      fontFamily="Figtree"
                      fontWeight={500}
                      letterSpacing="0px"
                      lineHeight={{ base: "28px", md: "32px", lg: "36px" }}
                      color="#ffffff"
                    >
                      Monetized by You
                    </Text>
                  </HStack>
                </VStack>
              </VStack>
            </GridItem>
          </Grid>
        </Container>
      </Box>

      {/* Product Page 3 - Problem/Solution Section */}
      <Box
        minH={{ base: "100vh", md: "976px" }}
        bg="#000000"
        color="white"
        py={{ base: 16, md: 24 }}
      >
        <Container maxW="1723px">
          <VStack spacing={12} align="flex-start" h="full">
            {/* Problem Section */}
            <VStack spacing={6} align="flex-start" w="full">
              <Heading
                as="h2"
                fontSize={{ base: "48px", md: "64px" }}
                fontFamily="Inter"
                fontWeight={600}
                letterSpacing="0px"
                lineHeight={{ base: "58px", md: "77.45px" }}
                color="#d6d6d6"
                stroke="1px solid"
                strokeColor="linear-gradient(-40.92deg, #ffffff 8.92%, #ffffff 24.19%, #ffffff 100%)"
              >
                Problem
              </Heading>

              <Text
                fontSize={{ base: "24px", md: "28px" }}
                fontFamily="Figtree"
                fontWeight={400}
                letterSpacing="0px"
                lineHeight="27px"
                color="#ffffff"
                maxW="866px"
              >
                The most powerful companies in the world are built on your data.
                {"\n"}But you don't control it. You don't profit from it. You can't even see it.
                {"\n"}We built hushh to change that — forever.
              </Text>
            </VStack>

            {/* Solution Section */}
            <VStack spacing={8} align="flex-start" w="full">
              <Heading
                as="h2"
                fontSize={{ base: "48px", md: "64px" }}
                fontFamily="Inter"
                fontWeight={700}
                letterSpacing="0px"
                lineHeight={{ base: "58px", md: "77.45px" }}
                bgGradient="linear(-52.44deg, #0071e3 0%, #bb62fc 34.54%, #f34556 71.3%, #f44f22 100%)"
                bgClip="text"
              >
                Solution
              </Heading>

              <Text
                fontSize={{ base: "24px", md: "28px" }}
                fontFamily="Figtree"
                fontWeight={400}
                letterSpacing="0px"
                lineHeight="27px"
                color="#ffffff"
                maxW="866px"
              >
                A smart AI that lives on your device, learns your preferences, and acts on your behalf
                {"\n\n"}Collects and organizes your data (email, docs, receipts, habits)
                {"\n"}Answers your questions before you ask
                {"\n"}Buys things for you. Sells things you permit.
                {"\n"}Tracks your spend, tasks, and life — across services
                {"\n"}Finds offers you'll love and pays you when you share your data with consent
              </Text>

              <Text
                fontSize={{ base: "32px", md: "40px" }}
                fontFamily="Inter"
                fontWeight={600}
                letterSpacing="0px"
                lineHeight="36px"
                color="#ffffff"
                maxW="749px"
                mt={8}
              >
                All with radical transparency and Apple-level privacy.
              </Text>
            </VStack>
          </VStack>
        </Container>
      </Box>

      {/* Product Page 4 - Use Cases Section */}
      <Box
        minH={{ base: "100vh", md: "976px" }}
        bg="#000000"
        color="white"
        py={{ base: 16, md: 24 }}
      >
        <Container maxW="1723px">
          <VStack spacing={16} align="center" h="full">
            {/* Section Header */}
            <VStack spacing={8} align="flex-start" w="full">
              <Heading
                as="h2"
                fontSize={{ base: "72px", md: "96px" }}
                fontFamily="Inter"
                fontWeight={600}
                letterSpacing="0px"
                lineHeight={{ base: "87px", md: "116.18px" }}
                color="#d6d6d6"
                stroke="1px solid"
                strokeColor="linear-gradient(-40.92deg, #ffffff 8.92%, #ffffff 24.19%, #ffffff 100%)"
              >
                Usecase
              </Heading>

              <Heading
                as="h3"
                fontSize={{ base: "72px", md: "96px" }}
                fontFamily="Inter"
                fontWeight={700}
                letterSpacing="0px"
                lineHeight={{ base: "87px", md: "116.18px" }}
                bgGradient="linear(-52.44deg, #0071e3 0%, #bb62fc 34.54%, #f34556 71.3%, #f44f22 100%)"
                bgClip="text"
              >
                Agentic Action
              </Heading>
            </VStack>

            {/* Use Cases Grid */}
            <Grid
              templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
              gap={16}
              w="full"
              maxW="6xl"
            >
              {/* Left Column - User Actions */}
              <GridItem>
                <VStack spacing={8} align="flex-start">
                  {[
                    { text: "Track my monthly subscriptions", opacity: 1 },
                    { text: "Book my next massage when I have time & credits", opacity: 0.73 },
                    { text: "Share my coffee preferences with Blue Bottle", opacity: 0.55 },
                    { text: "Sell my fitness data to a verified wellness brand", opacity: 0.2 },
                  ].map((item, index) => (
                    <HStack key={index} spacing={4} align="flex-start">
                      <Box
                        w="28px"
                        h="28px"
                        borderRadius="50%"
                        bg="#ffffff"
                        opacity={item.opacity}
                      />
                      <Text
                        fontSize={{ base: "20px", md: "24px" }}
                        fontFamily="Figtree"
                        fontWeight={500}
                        letterSpacing="0px"
                        lineHeight="36px"
                        color="#ffffff"
                      >
                        {item.text}
                      </Text>
                    </HStack>
                  ))}
                </VStack>
              </GridItem>

              {/* Right Column - Agentic Actions */}
              <GridItem>
                <VStack spacing={8} align="flex-start">
                  {[
                    "Finds all recurring charges & alerts you",
                    "Schedules, confirms, and logs it for you",
                    "Sends only what's necessary—with your consent",
                    "You choose who sees it. You earn.",
                  ].map((text, index) => (
                    <Text
                      key={index}
                      fontSize={{ base: "20px", md: "24px" }}
                      fontFamily="Inter"
                      fontWeight={500}
                      letterSpacing="0px"
                      lineHeight="36px"
                      color="#ffffff"
                    >
                      {text}
                    </Text>
                  ))}
                </VStack>
              </GridItem>
            </Grid>
          </VStack>
        </Container>
      </Box>

      {/* Product Page 5 - Why Different Section with iPhone Mockups */}
      <Box
        minH={{ base: "100vh", md: "976px" }}
        bg="#000000"
        color="white"
        py={{ base: 16, md: 24 }}
      >
        <Container maxW="1723px">
          <Grid
            templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
            gap={16}
            align="center"
            h="full"
          >
            {/* Left Column - iPhone Mockups */}
            <GridItem>
              <Grid
                templateColumns="repeat(3, 1fr)"
                gap={8}
                justify="center"
                align="center"
              >
                {/* iPhone 1 */}
                <Box
                  w={{ base: "150px", md: "200px" }}
                  h={{ base: "300px", md: "400px" }}
                  bg="linear-gradient(to-b, #ffffff, #bcb5b1)"
                  borderRadius="25px"
                  border="2px solid #333"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  transform="rotate(-5deg)"
                  boxShadow="0 20px 40px rgba(0,0,0,0.3)"
                />
                
                {/* iPhone 2 */}
                <Box
                  w={{ base: "150px", md: "200px" }}
                  h={{ base: "300px", md: "400px" }}
                  bg="linear-gradient(to-b, #ffffff, #bcb5b1)"
                  borderRadius="25px"
                  border="2px solid #333"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  transform="translateY(-20px)"
                  boxShadow="0 20px 40px rgba(0,0,0,0.3)"
                />
                
                {/* iPhone 3 */}
                <Box
                  w={{ base: "150px", md: "200px" }}
                  h={{ base: "300px", md: "400px" }}
                  bg="linear-gradient(to-b, #ffffff, #bcb5b1)"
                  borderRadius="25px"
                  border="2px solid #333"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  transform="rotate(5deg) translateY(20px)"
                  boxShadow="0 20px 40px rgba(0,0,0,0.3)"
                />
              </Grid>
            </GridItem>

            {/* Right Column - Why Different Content */}
            <GridItem>
              <VStack spacing={8} align="flex-start">
                <Heading
                  as="h2"
                  fontSize={{ base: "64px", md: "96px" }}
                  fontFamily="Inter"
                  fontWeight={600}
                  letterSpacing="0px"
                  lineHeight={{ base: "77px", md: "116.18px" }}
                  bgGradient="linear(to-r, #ffffff 27.1%, #999999 100%)"
                  bgClip="text"
                  stroke="1px solid"
                  strokeColor="linear-gradient(-40.92deg, #ffffff 8.92%, #ffffff 24.19%, #ffffff 100%)"
                >
                  Why is hushh Different
                </Heading>

                <Text
                  fontSize={{ base: "28px", md: "36px" }}
                  fontFamily="Figtree"
                  fontWeight={600}
                  letterSpacing="0px"
                  lineHeight={{ base: "33.6px", md: "43.2px" }}
                  color="#ffffff"
                  maxW="893px"
                >
                  We're not just another AI app.
                  {"\n"}We're a movement for data sovereignty.
                  {"\n\n"}Built by former Google AI & Cloud leaders
                  {"\n"}Runs on consent-first infrastructure
                  {"\n"}Designed with human psychology, not just tech
                  {"\n"}Monetization powered by you, not advertisers
                  {"\n"}Powered by open protocols like A2A, MCP, and ADK
                </Text>
              </VStack>
            </GridItem>
          </Grid>
        </Container>
      </Box>

      {/* Product Page 6 - Trust & Privacy + Join First Wave */}
      <Box
        minH={{ base: "100vh", md: "976px" }}
        bg="#000000"
        color="white"
        position="relative"
        overflow="hidden"
      >
        <Container maxW="1723px" position="relative" zIndex={2} py={{ base: 16, md: 24 }}>
          <Grid
            templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
            gap={16}
            align="center"
            h="full"
          >
            {/* Left Column - Trust and Privacy */}
            <GridItem>
              <VStack spacing={8} align="flex-start">
                <Heading
                  as="h2"
                  fontSize={{ base: "40px", md: "48px" }}
                  fontFamily="Inter"
                  fontWeight={600}
                  letterSpacing="0px"
                  lineHeight={{ base: "48px", md: "58.09px" }}
                  bgGradient="linear(to-r, #d6d6d6 0%, #707070 100%)"
                  bgClip="text"
                  stroke="1px solid"
                  strokeColor="linear-gradient(-40.92deg, #ffffff 8.92%, #ffffff 24.19%, #ffffff 100%)"
                >
                  Trust and Privacy First
                </Heading>

                <VStack spacing={4} align="flex-start">
                  <Text
                    fontSize={{ base: "28px", md: "32px" }}
                    fontFamily="Figtree"
                    fontWeight={600}
                    letterSpacing="0px"
                    lineHeight="24px"
                    color="#ffffff"
                  >
                    End-to-end encrypted personal data vault
                    {"\n"}On-device preference learning
                    {"\n"}No data is shared without your opt-in
                    {"\n"}Clear audit logs for every action
                    {"\n"}You decide what gets shared, when, and why
                  </Text>
                </VStack>
              </VStack>
            </GridItem>

            {/* Right Column - Join First Wave */}
            <GridItem position="relative">
              {/* Gradient Background */}
              <Box
                position="absolute"
                top={0}
                right={0}
                w="120%"
                h="120%"
                bgGradient="linear(135deg, #0071e3 0%, #b345d9 27.4%, #da4b7a 69.23%, #f44f22 100%)"
                transform="translateX(20%)"
                zIndex={-1}
              />

              <VStack spacing={8} align="center" textAlign="center" py={16} px={8}>
                <HStack spacing={3}>
                  <Image
                    src="/Icons/shield-check.svg"
                    alt="Hushh Icon"
                    width="46px"
                    height="46px"
                  />
                  <Heading
                    as="h2"
                    fontSize={{ base: "40px", md: "48px" }}
                    fontFamily="Inter"
                    fontWeight={600}
                    letterSpacing="0px"
                    lineHeight={{ base: "48px", md: "58.09px" }}
                    bgGradient="linear(to-r, #ffffff 27.1%, #999999 100%)"
                    bgClip="text"
                    stroke="1px solid"
                    strokeColor="linear-gradient(-40.92deg, #ffffff 8.92%, #ffffff 24.19%, #ffffff 100%)"
                  >
                    Join the First Wave
                  </Heading>
                </HStack>

                <Text
                  fontSize={{ base: "28px", md: "32px" }}
                  fontFamily="Figtree"
                  fontWeight={600}
                  letterSpacing="0px"
                  lineHeight={{ base: "32px", md: "38.4px" }}
                  color="#ffffff"
                  maxW="639px"
                >
                  We're onboarding our first 1,024 humans into the hushh network.
                  {"\n\n\n"}You'll be among the first to use, test, and co-design the future of intelligent agents
                </Text>

                <Button
                  bg="#ffffff"
                  border="2px solid transparent"
                  borderRadius="20px"
                  w={{ base: "280px", md: "341px" }}
                  h="74px"
                  fontSize="24px"
                  fontFamily="Figtree"
                  fontWeight={600}
                  letterSpacing="0.96px"
                  lineHeight="28.8px"
                  color="#bb62fc"
                  _hover={{
                    bg: "linear-gradient(to-r, #b345d9, #da4b7a)",
                    color: "white",
                    transform: "translateY(-2px)",
                  }}
                  transition="all 0.3s ease"
                  onClick={() => router.push("/contact-us")}
                >
                  Join the waitlist
                </Button>
              </VStack>
            </GridItem>
          </Grid>
        </Container>
      </Box>

      {/* Product Page 7 - Developer CTA Section */}
      <Box
        minH={{ base: "100vh", md: "976px" }}
        bg="#000000"
        color="white"
        py={{ base: 16, md: 24 }}
      >
        <Container maxW="1723px">
          <VStack spacing={16} align="center" textAlign="center" h="full" justify="center">
            <Heading
              as="h2"
              fontSize={{ base: "64px", md: "84px" }}
              fontFamily="Inter"
              fontWeight={600}
              letterSpacing="0px"
              lineHeight={{ base: "77px", md: "101.66px" }}
              bgGradient="linear(to-r, #ffffff 27.1%, #999999 100%)"
              bgClip="text"
              stroke="1px solid"
              strokeColor="linear-gradient(-40.92deg, #ffffff 8.92%, #ffffff 24.19%, #ffffff 100%)"
            >
              Developer and Partner CTA
            </Heading>

            <Text
              fontSize={{ base: "28px", md: "36px" }}
              fontFamily="Figtree"
              fontWeight={600}
              letterSpacing="0px"
              lineHeight={{ base: "33.6px", md: "43.2px" }}
              bgGradient="linear(43.68deg, #b345d9 0%, #da4b7a 100%)"
              bgClip="text"
              maxW="1266px"
            >
              Build with hushhKit.
            </Text>

            <Text
              fontSize={{ base: "28px", md: "32px" }}
              fontFamily="Figtree"
              fontWeight={300}
              letterSpacing="0px"
              lineHeight={{ base: "32px", md: "38.4px" }}
              color="#ffffff"
              maxW="1266px"
            >
              Are you a dev, creator, or data agent architect?
              {"\n"}Use our open tools to build AI agents that plug into hushh's consent-first data vault, memory graph, and monetization APIs.
            </Text>

            <Text
              fontSize={{ base: "28px", md: "32px" }}
              fontFamily="Figtree"
              fontWeight={300}
              letterSpacing="0px"
              lineHeight={{ base: "32px", md: "38.4px" }}
              bgGradient="linear(to-r, #da4b7a 0%, #bb62fc 100%)"
              bgClip="text"
              maxW="1852px"
            >
              Agents that work with people, not against them      HushhLink trust tokens for identity     HushhFlow for monetization
            </Text>

            <Button
              bg="linear-gradient(to-r, #da4b7a 0%, #b345d9 100%)"
              border="1px solid #ffffff"
              borderRadius="20px"
              w={{ base: "320px", md: "341px" }}
              h="74px"
              fontSize="24px"
              fontFamily="Figtree"
              fontWeight={600}
              letterSpacing="0.96px"
              lineHeight="28.8px"
              color="white"
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "0 8px 25px rgba(218, 75, 122, 0.4)",
              }}
              transition="all 0.3s ease"
              onClick={() => router.push("/developer-Api")}
            >
              Launch Your Agent
            </Button>
          </VStack>
        </Container>
      </Box>

      <ContactForm />
    </>
  );
};

export default HushhPDA;