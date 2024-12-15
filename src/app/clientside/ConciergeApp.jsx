"use client";
import React from "react";
import {
  Box,
  Button,
  HStack,
  Heading,
  Stack,
  Text,
  VStack,
  Container,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import extendedTheme from "../theme";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { animateScroll as scroll } from "react-scroll";
import ConciergeFaq from "../_components/features/faq/conciergeFaq";
import ContactForm from "../_components/features/contactForm";
import { ServiceCard } from "../_components/primitives/serviceCard";
import TrustedAIIcon from "../_components/svg/trustedAI";
import ControlOver from "../_components/svg/controlOver";
import TechIntegrationIcon from "../_components/svg/techIntegration";
import RedifiningIcon from "../_components/svg/redifiningIcon";
import TransparentSecureIcon from "../_components/svg/tranparentSecure";
import RightArrowBlack from "../_components/svg/icons/rightArrowBlack.svg";
import RightArrowWhite from "../_components/svg/icons/rightArrowWhite.svg";
import GoldenMedal from "../_components/svg/conciergeApp/goldernMedalIcon.svg";
import PaperPlane from "../_components/svg/conciergeApp/paperPlanImage.svg";
import ShoppingHand from "../_components/svg/conciergeApp/shoppingHandImg.svg";
import TransparentLock from "../_components/svg/transparetLock";
import BoltIcon from "../_components/svg/boltIcon";
import { useState, useEffect } from "react";
import MarketIcon from "../_components/svg/marketIcon";
import ConciergeMobile from "../_components/svg/icons/conciergeMobileIcon.svg";
// import Loading from "../_components/features/loading";

const handlePlayDemo = () => {
  // Open the URL in a new tab
  window.open("https://www.youtube.com/watch?v=J0Q_n6CWfO8", "_blank");
};

const ClientConciergeApp = () => {
  const gradient = "linear-gradient(265.3deg, #E54D60 8.81%, #A342FF 94.26%)";
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 200);

    return () => clearTimeout(timeout);
  }, []);

  const scrollTo = () => {
    scroll.scrollTo(850);
  };

  const scrollInMobile = () => {
    scroll.scrollTo(450);
  };

  const learnMoreScroll = () => {
    scroll.scrollTo(1500);
  };

  return (
    <>
      <Box
        maxW={"100%"}
        minW={"100%"}
        display={"flex"}
        flexDirection={"column"}
      >
        <Box
          alignItems={"center"}
          w={"100%"}
          display={"flex"}
          flexDirection={"column"}
          mt={{ base: "3rem" }}
        >
          <Heading
            fontWeight={"700"}
            lineHeight={{ md: "255.6px", base: "60px" }}
            textAlign={"center"}
            fontSize={{ md: "8.8rem", base: "2.5rem" }}
            pt={{ md: "8rem", base: "3rem" }}
            className="gradient"
            px={{ base: "0.5rem" }}
            mb={{ base: "0.5rem" }}
            as={"h1"}
          >
            Concierge App
          </Heading>
          <Heading
            className="color-gradient"
            fontWeight={"700"}
            fontSize={{ md: "2rem", base: "1rem" }}
            lineHeight={{ md: "57.6px", base: "28.3px" }}
            as={"h2"}
          >
            Experience Luxury, Redefined
          </Heading>
          <Text
            px={{ md: "17.8rem" }}
            mb={{ base: "1rem", md: "4rem" }}
            textAlign={"center"}
            color={"#656565"}
          >
            Hushh is a revolutionary concierge app that transforms luxury
            experiences through the power of voice, AI, and real-time data.
            Unlike traditional concierge services, Hushh prioritizes your needs,
            not just your preferences with Gen AI
          </Text>
          <Button
            border={"1px solid #606060"}
            borderRadius={"2px"}
            w={{ md: "16rem", base: "10rem" }}
            color={extendedTheme.colors._white}
            lineHeight={{ md: "28px", base: "14px" }}
            background={"transparent"}
            letterSpacing={{ md: "0.5rem", base: "0.25rem" }}
            _hover={{
              background:
                "linear-gradient(265.3deg, #E54D60 8.81%, #A342FF 94.26%)",
              border: "none",
            }}
            onClick={learnMoreScroll}
          >
            LEARN MORE
          </Button>
        </Box>
        <HStack
          mt={"2rem"}
          gap={"3rem"}
          px={"4rem"}
          display={"flex"}
          flexDirection={{ base: "row", md: "row" }}
          justifyContent="flex-end"
          mr={"3rem"}
        >
          <Button
            display={{ md: "flex", base: "none" }}
            border={"1px solid #606060"}
            borderRadius={"4rem"}
            w={"9rem"}
            color={extendedTheme.colors._white}
            lineHeight={"28px"}
            background={"transparent"}
            letterSpacing={"0.2rem"}
            _hover={{
              background:
                "linear-gradient(265.3deg, #E54D60 8.81%, #A342FF 94.26%)",
              border: "none",
            }}
            padding={"15px 68px 15px 68px"}
            onClick={handlePlayDemo}
          >
            PLAY DEMO
          </Button>
        </HStack>
        <Box
          display={{ base: "flex", md: "none" }}
          mt={"2rem"}
          justifyContent={"center"}
        >
          <Button
            ml={{ md: "55rem" }}
            display={"flex"}
            border={"1px solid #606060"}
            borderRadius={"4rem"}
            w={"12rem"}
            color={extendedTheme.colors._white}
            lineHeight={"32.4px"}
            background={"transparent"}
            letterSpacing={"0.29rem"}
            _hover={{
              background:
                "linear-gradient(265.3deg, #E54D60 8.81%, #A342FF 94.26%)",
              border: "none",
            }}
            padding={"15px 68px 15px 68px"}
            onClick={handlePlayDemo}
          >
            PLAY DEMO
          </Button>
        </Box>

        <HStack
          mt={{ md: "8rem", base: "5rem" }}
          w={"100%"}
          display={"flex"}
          flexDirection={"column"}
          textAlign={"center"}
          gap={{ md: "2rem", base: "1rem" }}
        >
          <Text
            className="gradient"
            fontSize={{ md: "3.75rem", base: "1.5rem" }}
            display={{ md: "flex", base: "none" }}
            fontWeight={400}
          >
            Here's how{" "}
            <Text style={{ fontWeight: 700, margin: "0 1rem" }}>
              Hushh elevates
            </Text>{" "}
            your experience
          </Text>
          <Text
            className="gradient"
            fontSize={{ md: "3.75rem", base: "1.5rem" }}
            display={{ md: "none", base: "flex" }}
            fontWeight={400}
          >
            Here's how Hushh elevates your experience
          </Text>
          <Text
            color={extendedTheme.colors.secondary}
            fontWeight={"500"}
            fontSize={"1rem"}
            lineHeight={{ md: "2.25rem", base: "1.5rem" }}
            px={{ md: "20rem", base: "1rem" }}
          >
            Our technology services deliver cutting-edge solutions tailored to
            drive efficiency, enhance performance, and fuel growth in today's
            digital landscape.
          </Text>
        </HStack>

        <Container
          display={"flex"}
          pt={{ md: "2rem" }}
          px={{ md: "10rem", base: "1rem" }}
          justifyContent={"center"}
          minW={{ md: "100%", base: "100%" }}
        >
          <Grid
            templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }}
            gap={{ md: 10, base: 5 }}
            flexWrap="wrap"
          >
            <ServiceCard
              icon={<TrustedAIIcon />}
              alignItems={""}
              onClick={null}
              title="Effortless Service​"
              textAlign={"left"}
              description="Simply speak your request using the app, and Hushh translates it into action. No more searching or filling out forms.​"
            />
            <ServiceCard
              icon={<TechIntegrationIcon />}
              alignItems={""}
              onClick={null}
              title="Personalized Recommendations​​​"
              textAlign={"left"}
              description="Hushh analyzes your intent, not just your preferences, to recommend services that truly match your needs.​​"
            />
            <ServiceCard
              icon={<ControlOver />}
              alignItems={""}
              onClick={null}
              title="Real-Time Responses​"
              textAlign={"left"}
              description="Get immediate responses to your requests from top-tier service providers, competing for your attention."
            />
            <ServiceCard
              icon={<RedifiningIcon />}
              title="Discretion and Privacy​​​"
              onClick={null}
              alignItems={""}
              textAlign={"left"}
              description="Your identity and preferences remain confidential. Requests are shared anonymously with relevant service providers.​​"
            />
            <ServiceCard
              icon={<TransparentSecureIcon />}
              title="Exclusive Opportunities​"
              onClick={null}
              alignItems={""}
              textAlign={"left"}
              description="Access exclusive deals and hidden gem recommendations you won't find anywhere else"
            />
          </Grid>
        </Container>

        <Stack
          mt={{ base: "2rem", md: "9rem" }}
          px={{ md: "9rem", base: "1rem" }}
        >
          <Text
            className="gradient"
            fontWeight={"700"}
            lineHeight={{ md: "75px", base: "28px" }}
            fontSize={{ md: "3.75rem", base: "1.25rem" }}
            mb={{ base: "2rem", md: "4rem" }}
            display={{ md: "flex", base: "none" }}
          >
            Hushh caters to a wide range <br></br> of needs, including
          </Text>
          <Text
            className="gradient"
            fontWeight={"700"}
            lineHeight={{ md: "75px", base: "28px" }}
            fontSize={{ md: "3.75rem", base: "1.25rem" }}
            mb={{ base: "2rem", md: "4rem" }}
            display={{ md: "none", base: "flex" }}
            textAlign={"center"}
          >
            Hushh caters to a wide range of needs, including
          </Text>
          <Grid
            templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }}
            gap={{ md: 10, base: 4 }}
            flexWrap="wrap"
            textAlign={"left"}
          >
            <Box
              gap={"2rem"}
              color={"#0D0D25"}
              p={{ md: "2rem", base: "1rem" }}
              bg={"white"}
              borderRadius={"1.75rem"}
            >
              <Text
                fontWeight={"700"}
                fontSize={{ md: "1.75rem", base: "1rem" }}
                lineHeight={{ md: "38.53px" }}
                marginBottom={{ base: "0.75rem", md: "2rem" }}
              >
                Travel
              </Text>
              <Text
                fontWeight={"400"}
                fontSize={{ md: "1rem", base: "0.5rem" }}
                lineHeight={{ md: "22.41px" }}
                marginBottom={{ base: "1.25rem", md: "3rem" }}
              >
                Bespoke itineraries, private jet charters, exclusive tours
              </Text>
              <Image src={RightArrowBlack} alt="RightArrowBlack" />
              <Box>
                <Image src={PaperPlane} alt="PaperPlane" />
              </Box>
            </Box>
            <Box
              gap={"2rem"}
              p={{ md: "2rem", base: "1rem" }}
              borderRadius={"1.75rem"}
              background="linear-gradient(265.3deg, #E54D60 8.81%, #A342FF 94.26%)"
            >
              <Text
                fontWeight={"700"}
                fontSize={{ md: "1.75rem", base: "1rem" }}
                lineHeight={{ md: "38.53px" }}
                marginBottom={{ base: "0.75rem", md: "2rem" }}
                color={"white"}
              >
                Events
              </Text>
              <Text
                fontWeight={"400"}
                fontSize={{ md: "1rem", base: "0.5rem" }}
                lineHeight={{ md: "22.41px" }}
                marginBottom={{ base: "1.25rem", md: "3rem" }}
                color={"white"}
              >
                VIP access to high-profile events, private viewings, red carpet
                experiences
              </Text>
              <Image src={RightArrowWhite} alt="rightArrowWhite" />
              <Image src={GoldenMedal} alt="goldenMedal" />
            </Box>
            <Box
              gap={"2rem"}
              color={"#0D0D25"}
              p={{ md: "2rem", base: "1rem" }}
              bg={"white"}
              borderRadius={"1.75rem"}
            >
              <Text
                fontWeight={"700"}
                fontSize={{ md: "1.75rem", base: "1rem" }}
                lineHeight={{ md: "38.53px" }}
                marginBottom={{ base: "0.75rem", md: "2rem" }}
              >
                Lifestyle
              </Text>
              <Text
                fontWeight={"400"}
                fontSize={{ md: "1rem", base: "0.5rem" }}
                lineHeight={{ md: "22.41px" }}
                marginBottom={{ base: "1.25rem", md: "3rem" }}
              >
                Personal shopping, home management, day-to-day errands,
                specialized requests
              </Text>
              <Image src={RightArrowBlack} alt="RightArrowBlack" />
              <Image src={ShoppingHand} alt="shoppingHand" />
            </Box>
          </Grid>
        </Stack>

        <Container
          mt={{ base: "4rem", md: "8rem" }}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          flexDirection={{ base: "column", md: "row" }}
          minW={"100%"}
          px={{ md: "10rem", base: "2rem" }}
        >
          <Box
            maxWidth={{ base: "100%", md: "40%" }}
            display={{ base: "none", md: "flex" }}
            mb={{ base: "2rem" }}
          >
            <Image src={ConciergeMobile} alt="ConciergeMobile" />
          </Box>
          <VStack
            alignItems={{ base: "center", md: "flex-start" }}
            maxW={{ base: "100%", md: "50%" }}
            textAlign={{ base: "center", md: "left" }}
          >
            <Text
              className="color-gradient"
              fontWeight={600}
              letterSpacing={"0.25rem"}
              fontSize={"1rem"}
            >
              Concierge App
            </Text>{" "}
            <Box
              maxWidth={{ base: "100%", md: "40%" }}
              display={{ base: "flex", md: "none" }}
              mb={{ base: "2rem" }}
            >
              <Image src={ConciergeMobile} alt="ConciergeMobile" />
            </Box>
            <Text
              className="gradient"
              fontWeight="700"
              fontSize={{ md: "3.75rem", base: "1.25rem" }}
            >
              The <br></br> Hushh Difference
            </Text>
            <Text
              color={extendedTheme.colors.secondary}
              lineHeight={{ base: "18px", md: "36px" }}
              mt={{ base: "1rem", md: "2rem" }}
            >
              Receipt Radar revolutionizes the way you handle receipts. With
              automatic scanning, smart categorization, and customizable
              options, managing expenses becomes a breeze. Simplify your life
              and take control of your finances with Receipt Radar today!{" "}
            </Text>
            <VStack
              align="flex-start"
              spacing={4}
              w="100%"
              mt={{ base: "1rem", md: "2rem" }}
            >
              <Box
                alignItems={"center"}
                textAlign={"left"}
                flexDirection={"row"}
                color={extendedTheme.colors._white}
                display="flex"
                gap={"1rem"}
              >
                <MarketIcon />
                <VStack
                  textAlign={"left"}
                  alignItems={"flex-start"}
                  lineHeight={"1rem"}
                >
                  <Text fontWeight={"700"}>Flips the Script</Text>
                  <Text fontWeight={"400"} fontSize={"0.75rem"}>
                    Users seeking services become services seeking users,
                    putting you in control.
                  </Text>
                </VStack>
              </Box>

              <Box
                alignItems={"center"}
                textAlign={"left"}
                flexDirection={"row"}
                color={extendedTheme.colors._white}
                display="flex"
                gap={"1rem"}
              >
                <BoltIcon />
                <VStack
                  textAlign={"left"}
                  alignItems={"flex-start"}
                  lineHeight={"1rem"}
                >
                  <Text fontWeight={"700"}>Powered by AI</Text>
                  <Text fontWeight={"400"} fontSize={"0.75rem"}>
                     Leverages cutting-edge technology to understand your intent
                    and deliver personalized recommendations
                  </Text>
                </VStack>
              </Box>

              <Box
                alignItems={"center"}
                textAlign={"left"}
                flexDirection={"row"}
                color={extendedTheme.colors._white}
                display="flex"
                gap={"1rem"}
              >
                <TransparentLock />
                <VStack
                  ml={{ md: "0.75rem" }}
                  textAlign={"left"}
                  alignItems={"flex-start"}
                  lineHeight={"1rem"}
                >
                  <Text fontWeight={"700"}>Real-Time Matching</Text>
                  <Text fontWeight={"400"} fontSize={"0.75rem"}>
                    Connects you with the right service providers instantly
                  </Text>
                </VStack>
              </Box>
            </VStack>
          </VStack>
        </Container>

        <ConciergeFaq />
      </Box>
      <ContactForm />
    </>
  );
};

export default ClientConciergeApp;
