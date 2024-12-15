import React from "react";
import { Box, Container, Grid, HStack, Text } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { ServiceCard } from "../primitives/serviceCard";
import TrustedAIIcon from "../svg/trustedAI";
import ControlOver from "../svg/controlOver";
import TechIntegrationIcon from "../svg/techIntegration";
import RedifiningIcon from "../svg/redifiningIcon";
import TransparentSecureIcon from "../svg/tranparentSecure";
import extendedTheme from "../../theme";
import { Router } from "next/router";
import { useRouter } from "next/navigation";

const TechnologySection = () => {
  const router = useRouter();
  return (
    <>
      <HStack
        mt={{ md: "8rem", base: "5rem" }}
        w={"100%"}
        display={"flex"}
        flexDirection={"column"}
        textAlign={"center"}
      >
        <Text
          className="gradient"
          fontSize={{ md: "3.75rem", base: "1.5rem" }}
          display={"flex"}
        >
          Our Technology Services
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
        pt={{ md: "2rem",base:'0.75rem' }}
        px={{ md: "10rem", base:'1rem' }}
        justifyContent={"center"}
        minW={{ md: "100%", base: "100%" }}
      >
        <Grid
          templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }}
          gap={{ md: 10, base: 5 }}
          flexWrap="wrap"
        >
          <ServiceCard
          styles={{
            backgroundColor:'#1C1C1C', borderRadius:'2.5rem',padding:'1.25rem'
          }}
            icon={<TrustedAIIcon />}
            title="Personal Data Assistance​"
            textAlign={"left"}
            description="Leverage AI assistants that understand your data and provide personalized support – for information retrieval, streamline work, and more​"
          />
          <ServiceCard
            icon={<TechIntegrationIcon />}
            styles={{
              backgroundColor:'#1C1C1C', borderRadius:'2.5rem',padding:'1.25rem'
            }}
            title="Seamless Tech Integrationn​​​"
            textAlign={"left"}
            description="Our platform seamlessly integrates with your existing tools to streamline your operations​​"
          />
          <ServiceCard
            icon={<ControlOver />}
            styles={{
              backgroundColor:'#1C1C1C', borderRadius:'2.5rem',padding:'1.25rem'
            }}
            title="Control & Security​"
            textAlign={"left"}
            description="Built with trust in mind, our platform is SOC 2 and GDPR compliant, ensuring the security and privacy of your data"
          />
          {/* <ServiceCard
            icon={<RedifiningIcon />}
            title="Redefining Personal Data Assistance​"
            textAlign={'left'}
            description="Hushh revolutionize data privacy and giving user control and offering an alternative."
          />
          <ServiceCard
            icon={<TransparentSecureIcon />}
            title="Transparent & Secure​"
            textAlign={'left'}
            description="Unlock values from your personal data with Secure platform for sharing data with trusted partners."
          /> */}
        </Grid>
      </Container>
      <Box px={{base:'1rem', md:'0rem'}} w={"100%"} gap={{md:'5rem', base:'2rem'}} display={"flex"} justifyContent="center">
        <Box
          mt={{ md: "4rem", base: "2rem" }}
          p={{ md: "0.5rem", base: "0.25rem" }}
          align={"center"}
          border={"1px solid #606060"}
          borderRadius={"5px"}
          w={{ md: "18rem", base: "12rem" }}
          fontWeight={"400"}
          fontSize={{ md: "1.15rem", base: "0.75rem" }}
          className="color-gradient"
          lineHeight={{ md: "32.4px", base: "20px" }}
          letterSpacing={{ md: "0.5rem", base: "0.25rem" }}
          _hover={{
            background:
              "linear-gradient(265.3deg, #E54D60 8.81%, #A342FF 94.26%)",
            color: "white",
          }}
          cursor={"pointer"}
          onClick={() => router.push("/demoBookingPage")}
        >
          Book A Call
        </Box>

        {/* <Box
                  mt={{ md: "4rem", base: "2rem" }}
                  p={{ md: "0.5rem", base: "0.25rem" }}
                  align={"center"}
                  border={"1px solid #606060"}
                  borderRadius={"5px"}
                  w={{ md: "23rem", base: "12rem" }}
                  fontWeight={"400"}
                  fontSize={{ md: "1rem", base: "0.75rem" }}
                  className="color-gradient"
                  lineHeight={{ md: "32.4px", base: "20px" }}
                  letterSpacing={{ md: "0.5rem", base: "0.25rem" }}
                  _hover={{
                    background:
                      "linear-gradient(265.3deg, #E54D60 8.81%, #A342FF 94.26%)",
                    color: "white",
                  }}
                  cursor={"pointer"}
                  onClick={()=> router.push('/hushh-community')}
                >
                  Join Hushh Community
                </Box> */}
      </Box>
    </>
  );
};

export default TechnologySection;
