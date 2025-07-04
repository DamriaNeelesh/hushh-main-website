"use client";
import React from "react";
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
} from "@chakra-ui/react";
import extendedTheme from "../theme";
import { useRouter } from "next/navigation";
import ContactForm from "../_components/features/contactForm";

const HushhPDA = () => {
  const router = useRouter();

  return (
    <>
      {/* Product Page 1 - Hero Section */}
      <Box
        minH="100vh"
        bg="black"
        color="white"
        position="relative"
        overflow="hidden"
      >
        {/* Background Image */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          backgroundImage="url('/Images/pda-hero-bg.jpg')"
          backgroundSize="cover"
          backgroundPosition="center"
          opacity={0.3}
          zIndex={0}
        />
        
        <Container maxW="7xl" position="relative" zIndex={1}>
          <VStack
            spacing={8}
            align="center"
            justify="center"
            minH="100vh"
            textAlign="center"
            px={{ base: 4, md: 8 }}
          >
            <Text
              fontSize={{ base: "lg", md: "2xl" }}
              fontFamily="Figtree"
              fontWeight={400}
              letterSpacing="0"
              className="hushh-gradient"
              mt={{md:0,base:10}}
            >
              Your Personal Data, Your Personal AI, Under Your Control
            </Text>

            <Heading
              as="h1"
              fontSize={{ base: "4xl", md: "6xl", lg: "8xl" }}
              fontFamily="Poppins"
              fontWeight={700}
              lineHeight={1.2}
              bgGradient="linear(135deg, #ffffff 0%, #7a7a7e 100%)"
              bgClip="text"
              maxW="4xl"
            >
              Personal Data Agent
            </Heading>

            <Text
              fontSize={{ base: "md", md: "xl" }}
              fontFamily="Figtree"
              fontWeight={300}
              color="white"
              maxW="5xl"
              lineHeight="1.4"
              px={{ base: 4, md: 0 }}
            >
              Welcome to the future of personal data ownership. Hushh PDA is your intelligent, 
              privacy-first agent that organizes, protects, and unlocks the power of your digital 
              life — all from your pocket. Say goodbye to exploitation, and hello to empowerment.
            </Text>

            <Button
              bg="transparent"
              color="white"
              border="1px solid white"
              borderRadius="2px"
              fontSize={{ base: "lg", md: "xl" }}
              fontFamily="Figtree"
              fontWeight={600}
              letterSpacing="0.96px"
              w={{md:'100%',base:170}}
              px={{md:10,base:4}}
              py={{md:4,base:2}}
              h="auto"
              _hover={{
                bg: "linear-gradient(265.3deg, #E54D60 8.81%, #A342FF 94.26%)",
                border: "none",
              }}
              onClick={() => router.push("/contact-us")}
            >
              Get Early Access
            </Button>
          </VStack>
        </Container>
      </Box>

      {/* Product Page 2 - More than Just an App */}
      <Box
        // minH="100vh"
        bg="black"
        color="white"
        p={{base:4,md:28}}
        // py={{ base: 16, md: 24 }}
      >
        <Container maxW="8xl">
          <VStack spacing={6} align="center" textAlign="center">
            

            

            <Flex
              direction={{ base: "column", lg: "row" }}
              gap={{md:'8rem',base:6}}
              align="flex-start"
              w="full"
              // maxW="6xl"
            >
              <VStack spacing={6} flex={1} align="flex-start" textAlign="left">
              <Text
              fontSize={{ base: "2xl", md: "3xl" }}
              fontFamily="Figtree"
              fontWeight={500}
              bgGradient="linear(to-r, #b345d9, #da4b7a)"
              bgClip="text"
            >
              HUSHH PDA
            </Text>
              <Heading
                as="h2"
                fontSize={{ base: "3xl", md: "5xl", lg: "6xl" }}
                fontFamily="Poppins"
                fontWeight={500}
                lineHeight={1.2}
                bgGradient="linear(135deg, #ffffff 0%, #7a7a7e 100%)"
                bgClip="text"
                textAlign="left"
              >
                More than Just an App
              </Heading>
              <Text
                fontSize={{ base: "2xl", md: "3xl" }}
                fontFamily="Figtree"
                fontWeight={600}
                bgGradient="linear(to-r, #b345d9, #da4b7a)"
                bgClip="text"
                textAlign="left"
              >
                - Reclaim, Understand, and Monetize Your Digital Life
              </Text>
                <Text
                  fontSize={{ base: "lg", md: "xl" }}
                  fontFamily="Figtree"
                  fontWeight={300}
                  color="white"
                  letterSpacing="0.24px"
                  lineHeight="1.4"
                >
                  It's your AI-powered data concierge. Built with radical privacy at its core, 
                  Hushh turns fragmented digital noise into meaningful insight and effortless control.
                </Text>

                <Text
                  fontSize={{ base: "lg", md: "xl" }}
                  fontFamily="Figtree"
                  fontWeight={700}
                  color="white"
                  letterSpacing="0.24px"
                >
                  What you can Do:
                </Text>

                <VStack spacing={2} align="flex-start">
                  <HStack spacing={4} align="flex-start">
                    <Image 
                      src="/svgs/starhash.svg" 
                      alt="Star hash icon" 
                      width={'24px'} 
                      height={'24px'} 
                      mt={1} 
                    />
                    <VStack spacing={2} align="flex-start">
                      <Text
                        fontSize={{ base: "lg", md: "xl" }}
                        fontFamily="Figtree"
                        fontWeight={700}
                        bgGradient="linear(to-r, #ffffff, #999999)"
                        bgClip="text"
                        letterSpacing="0.24px"
                      >
                        <span className="hushh-gradient" style={{fontWeight:700}}>Aggregate</span> Bring your receipts, health data, subscriptions, 
                        and documents into one encrypted vault
                      </Text>
                    </VStack>
                  </HStack>

                  <HStack spacing={4} align="flex-start">
                  <Image 
                      src="/svgs/starhash.svg" 
                      alt="Star hash icon" 
                      width={'24px'} 
                      height={'24px'} 
                      mt={1} 
                    />
                    <Text
                      fontSize={{ base: "lg", md: "xl" }}
                      fontFamily="Figtree"
                      fontWeight={700}
                      color="white"
                      letterSpacing="0.24px"
                    >
                      <span className="hushh-gradient" style={{fontWeight:700}}>Ask</span> "How much did I spend on groceries?" — your PDA will know
                    </Text>
                  </HStack>

                  <HStack spacing={4} align="flex-start">
                  <Image 
                      src="/svgs/starhash.svg" 
                      alt="Star hash icon" 
                      width={'24px'} 
                      height={'24px'} 
                      mt={1} 
                    />
                    <Text
                      fontSize={{ base: "lg", md: "xl" }}
                      fontFamily="Figtree"
                      fontWeight={700}
                      color="white"
                      letterSpacing="0.24px"
                    >
                      <span className="hushh-gradient" style={{fontWeight:700}}>Control</span> Every piece of data is yours alone — share it only when you choose
                    </Text>
                  </HStack>

                  <HStack spacing={4} align="flex-start">
                  <Image 
                      src="/svgs/starhash.svg" 
                      alt="Star hash icon" 
                      width={'24px'} 
                      height={'24px'} 
                      mt={1} 
                    />
                    <Text
                      fontSize={{ base: "lg", md: "xl" }}
                      fontFamily="Figtree"
                      fontWeight={700}
                      color="white"
                      letterSpacing="0.24px"
                    >
                      <span className="hushh-gradient" style={{fontWeight:700}}>Earn</span> Monetize ethically — trade data for value, never at the cost of privacy
                    </Text>
                  </HStack>
                </VStack>
              </VStack>

              <Box 
                flex={1}
                display={{ base: "none", lg: "block" }}
                h="650px"
                w="503px"
                bg="gray.800"
                borderRadius="15px"
                backgroundImage="/svgs/p2.svg"
                backgroundSize="cover"
                backgroundPosition="center"
              />
            </Flex>
          </VStack>
        </Container>
      </Box>

      {/* Product Page 3 - How it Works */}
      <Box
        minH="100vh"
        bg="black"
        color="white"
        py={{ base: 16, md: 24 }}
      >
        <Container maxW="7xl">
          <VStack spacing={16} align="center">
            <VStack spacing={8} textAlign="center">
              <Text
                fontSize={{ base: "2xl", md: "3xl" }}
                fontFamily="Figtree"
                fontWeight={500}
                bgGradient="linear(to-r, #b345d9, #da4b7a)"
                bgClip="text"
              >
                HUSHH PDA
              </Text>

              <Heading
                as="h2"
                fontSize={{ base: "3xl", md: "5xl", lg: "6xl" }}
                fontFamily="Poppins"
                fontWeight={500}
                lineHeight={1.2}
                bgGradient="linear(135deg, #ffffff 0%, #7a7a7e 100%)"
                bgClip="text"
              >
                How it Works
              </Heading>

              <Text
                fontSize={{ base: "lg", md: "xl" }}
                fontFamily="Figtree"
                fontWeight={300}
                color="white"
                letterSpacing="0.24px"
                maxW="5xl"
              >
                Behind the scenes, Hushh is doing the heavy lifting — securely, intelligently, and transparently.
              </Text>
            </VStack>

            {/* Step 1 Row */}
            <Grid
              templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
              gap={12}
              w="full"
              maxW="4xl"
            >
              <GridItem>
                <VStack spacing={6} align="center" textAlign="center">
                  <Box
                    bg="linear-gradient(135deg, #da4b7a, #b345d9)"
                    w={{md:"115px",base:'80px'}}
                    h={{md:"104px",base:'80px'}}
                    borderRadius="12px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Image
                      src="/svgs/connect.svg"
                      alt="Connect"
                      width={{md:"51px",base:'30px'}}
                      height={{md:"47px",base:'30px'}}
                      filter="brightness(0) invert(1)"
                    />
                  </Box>
                  <Text
                    fontSize="xl"
                    fontFamily="Poppins"
                    fontWeight={600}
                    color="white"
                  >
                    Connect
                  </Text>
                  <Text
                    fontSize="lg"
                    fontFamily="Figtree"
                    fontWeight={400}
                    color="white"
                    letterSpacing="0.2px"
                    lineHeight="1.2"
                  >
                    Link your Gmail, bank, calendar — or upload manually
                  </Text>
                </VStack>
              </GridItem>

              <GridItem>
                <VStack spacing={6} align="center" textAlign="center">
                  <Box
                    bg="linear-gradient(135deg, #da4b7a, #b345d9)"
                    w={{md:"115px",base:'80px'}}
                    h={{md:"104px",base:'80px'}}
                    borderRadius="12px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Image
                      src="/svgs/secure.svg"
                      alt="Secure"
                      width={{md:"30px",base:'20px'}}
                      height={{md:"35px",base:'20px'}}
                      filter="brightness(0) invert(1)"
                    />
                  </Box>
                  <Text
                    fontSize="xl"
                    fontFamily="Poppins"
                    fontWeight={600}
                    color="white"
                  >
                    Secure
                  </Text>
                  <Text
                    fontSize="lg"
                    fontFamily="Figtree"
                    fontWeight={400}
                    color="white"
                    letterSpacing="0.2px"
                    lineHeight="1.2"
                  >
                    Everything goes into your encrypted data vault
                  </Text>
                </VStack>
              </GridItem>

              <GridItem>
                <VStack spacing={6} align="center" textAlign="center">
                  <Box
                    bg="linear-gradient(135deg, #da4b7a, #b345d9)"
                    w={{md:"115px",base:'80px'}}
                    h={{md:"104px",base:'80px'}}
                    borderRadius="12px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Image
                      src="/svgs/ask.svg"
                      alt="Ask and Chat"
                      width={{md:"45px",base:'30px'}}
                      height={{md:"47px",base:'30px'}}
                      filter="brightness(0) invert(1)"
                    />
                  </Box>
                  <Text
                    fontSize="xl"
                    fontFamily="Poppins"
                    fontWeight={600}
                    color="white"
                  >
                    Ask and Chat
                  </Text>
                  <Text
                    fontSize="lg"
                    fontFamily="Figtree"
                    fontWeight={400}
                    color="white"
                    letterSpacing="0.2px"
                    lineHeight="1.2"
                  >
                    Chat with your PDA to uncover insights, find files, automate tasks
                  </Text>
                </VStack>
              </GridItem>
            </Grid>

            {/* Step 2 Row */}
            <Grid
              templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
              gap={12}
              w="full"
              maxW="3xl"
              mt={16}
            >
              <GridItem>
                <VStack spacing={6} align="center" textAlign="center">
                  <Box
                    bg="linear-gradient(135deg, #da4b7a, #b345d9)"
                    w={{md:"115px",base:'80px'}}
                    h={{md:"104px",base:'80px'}}
                    borderRadius="12px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Image
                      src="/svgs/choose.svg"
                      alt="Choose"
                      width={{md:"43px",base:'30px'}}
                      height={{md:"44px",base:'30px'}}
                      filter="brightness(0) invert(1)"
                    />
                  </Box>
                  <Text
                    fontSize="xl"
                    fontFamily="Poppins"
                    fontWeight={600}
                    color="white"
                  >
                    Choose
                  </Text>
                  <Text
                    fontSize="lg"
                    fontFamily="Figtree"
                    fontWeight={400}
                    color="white"
                    letterSpacing="0.2px"
                    lineHeight="1.2"
                  >
                    Share selected data for rewards, never without consent
                  </Text>
                </VStack>
              </GridItem>

              <GridItem>
                <VStack spacing={6} align="center" textAlign="center">
                  <Box
                    bg="linear-gradient(135deg, #da4b7a, #b345d9)"
                    w={{md:"115px",base:'80px'}}
                    h={{md:"104px",base:'80px'}}
                    borderRadius="12px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Image
                      src="/svgs/track.svg"
                      alt="Track"
                      width={{md:"33px",base:'20px'}}
                      height={{md:"32px",base:'20px'}}
                      filter="brightness(0) invert(1)"
                    />
                  </Box>
                  <Text
                    fontSize="xl"
                    fontFamily="Poppins"
                    fontWeight={600}
                    color="white"
                  >
                    Track
                  </Text>
                  <Text
                    fontSize="lg"
                    fontFamily="Figtree"
                    fontWeight={400}
                    color="white"
                    letterSpacing="0.2px"
                    lineHeight="1.2"
                  >
                    See every action in your consent log — even on blockchain
                  </Text>
                </VStack>
              </GridItem>
            </Grid>
          </VStack>
        </Container>
      </Box>

      {/* Product Page 4 - Mission Statement */}
      <Box
        minH="100vh"
        bg="black"
        color="white"
        py={{ base: 16, md: 24 }}
      >
        <Container maxW="7xl">
          <VStack spacing={16} align="center" textAlign="center">
            <VStack spacing={8}>
              <Text
                fontSize={{ base: "2xl", md: "3xl" }}
                fontFamily="Figtree"
                fontWeight={500}
                bgGradient="linear(to-r, #b345d9, #da4b7a)"
                bgClip="text"
              >
                HUSHH PDA
              </Text>

              <Heading
                as="h2"
                fontSize={{ base: "3xl", md: "5xl", lg: "6xl" }}
                fontFamily="Poppins"
                fontWeight={500}
                lineHeight={1.2}
                bgGradient="linear(135deg, #ffffff 0%, #7a7a7e 100%)"
                bgClip="text"
              >
                Mission Statement
              </Heading>

              <Text
                fontSize={{ base: "2xl", md: "3xl" }}
                fontFamily="Figtree"
                fontWeight={600}
                bgGradient="linear(to-r, #b345d9, #da4b7a)"
                bgClip="text"
                letterSpacing="0.64px"
                maxW="5xl"
              >
                We're Not Just Building an App — We're Building a Movement
              </Text>
            </VStack>

            <VStack spacing={12} maxW="4xl">
              <Text
                fontSize={{ base: "md", md: "xl" }}
                fontFamily="Figtree"
                fontWeight={400}
                color="white"
                lineHeight="1.6"
                textAlign="center"
              >
                At Hushh, we believe that personal data should serve you, not exploit you. 
                Our Personal Data Agent represents a fundamental shift in how individuals 
                interact with their digital information — putting control, privacy, and 
                value creation back where it belongs: in your hands.
              </Text>

              <Text
                fontSize={{ base: "md", md: "xl" }}
                fontFamily="Figtree"
                fontWeight={400}
                color="white"
                lineHeight="1.6"
                textAlign="center"
              >
                We're building more than technology; we're fostering a future where data 
                ownership is a right, not a privilege. Join us in creating a world where 
                your digital life truly belongs to you.
              </Text>

              <Button
                bg="linear-gradient(to-r, #da4b7a, #b345d9)"
                color="white"
                border="1px solid white"
                borderRadius="2px"
                fontSize={{ base: "lg", md: "xl" }}
                fontFamily="Figtree"
                fontWeight={600}
                w={{md:'100%',base:170}}
                letterSpacing="0.96px"
                px={{md:12,base:4}}
                py={{md:6,base:2}}
                h="auto"
                _hover={{
                  bg: "white",
                  color: "black",
                }}
                onClick={() => router.push("/contact-us")}
              >
                Partner With Us
              </Button>
            </VStack>
          </VStack>
        </Container>
      </Box>

      <ContactForm />
    </>
  );
};

export default HushhPDA;