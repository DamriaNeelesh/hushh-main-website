"use client";
import React from "react";
import {
  Box,
  Button,
  HStack,
  Heading,
  Stack,
  Text,
  VStack } from
"@chakra-ui/react";
import extendedTheme from "../theme";
import Image from "next/image";
import BrowserBox from "../_components/svg/browserCompanionBoxImg.svg";
import BrowserFaq from "../_components/features/faq/browserFaq";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { animateScroll as scroll } from "react-scroll";
import ContactForm from "../_components/features/contactForm";
import BgAnimation from "../../../public/Gif/bgAnimation.gif";
import BrowserGif from "../../../public/Gif/browserGifBg.gif";
import TypingGIF from "../../../public/Gif/typing.gif";
import "next-cloudinary/dist/cld-video-player.css";

// const CldVideoPlayer = dynamic(
//   () => import("next-cloudinary").then((mod) => mod.CldVideoPlayer),
//   { ssr: false }
// );

const ClientBrowserCompanion = () => {
  const gradient = "linear-gradient(135deg, #171b29 0%, #8f8570 58%, #b7a789 100%)";
  const _router = useRouter();
  const [_loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 200);

    return () => clearTimeout(timeout);
  }, []);

  const scrollTo = () => {
    scroll.scrollTo(850); // Scrolling to 100px from the top of the page.
  };

  const _scrollInMobile = () => {
    scroll.scrollTo(450);
  };

  return (
    <>
      <Box
        maxW={"100%"}
        minW={"100%"}
        display={"flex"}
        flexDirection={"column"}
        pos={"relative"}>
        
        <Box display={{ base: "none", md: "block" }}>
          <Image
            src={BrowserGif}
            alt="BrowserGif"
            style={{
              position: "absolute",
              top: "0px",
              zIndex: "-10",
              width: "100%",
              opacity: "0.7",
              height: "40rem",
              filter: "grayscale(100%)"
            }}
            unoptimized />
          
        </Box>
        <Box display={{ base: "block", md: "none" }}>
          <Image
            src={BrowserGif}
            alt="BrowserGif"
            style={{
              position: "absolute",
              top: "55px",
              zIndex: "-10",
              width: "100%",
              height: "16rem",
              filter: "grayscale(100%)"
            }}
            unoptimized />
          
        </Box>
        <Box
          alignItems={"center"}
          w={"100%"}
          display={"flex"}
          flexDirection={"column"}
          mt={{ base: "3rem" }}>
          
          <Heading
            fontWeight={"700"}
            lineHeight={{ md: "255.6px", base: "60px" }}
            textAlign={"center"}
            fontSize={{ md: "8.8rem", base: "2.5rem" }}
            pt={{ md: "10rem", base: "3rem" }}
            className="gradient"
            px={{ base: "0.5rem" }}
            mb={{ base: "0.5rem" }}
            as={"h1"}>
            
            Browser Companion
          </Heading>
          <Text
            px={{ md: "17.8rem" }}
            mb={{ base: "2rem", md: "4rem" }}
            textAlign={"center"}
            color={"#ABABAB"}
            fontSize={{ md: "1rem", base: "0.75rem" }}>
            
            Tired of being tracked online? Every click, scroll, and search query
            leaves a trail of your identity, exploited by third-party
            organizations for targeted advertising. With Hushh, the power is
            back in your hands
          </Text>
          <Box
            mt={{ md: "4rem", base: "2rem" }}
            display={{ base: "flex", md: "flex" }}
            flexDirection={{ md: "row", base: "row" }}
            justifyContent={"space-between"}
            wrap={"wrap"}
            gap={{ md: "4rem", base: "1.5rem" }}>
            
            <Button
              className="site-cta-solid"
              border={"1px solid #606060"}
              borderRadius={"4rem"}
              p={{ md: "1rem", base: "0.5rem" }}
              w={{ md: "100%", base: "10rem" }}
              h={{ md: "3.75rem", base: "2.5rem" }}
              color={extendedTheme.colors._white}
              lineHeight={{ md: "28px", base: "14px" }}
              fontSize={{ base: "0.75rem", md: "1.25rem" }}
              background={"transparent"}
              letterSpacing={{ md: "0.3rem", base: "0rem" }}
              _hover={{
                background:
                "linear-gradient(135deg, #171b29 0%, #8f8570 58%, #b7a789 100%)",
                border: "none"
              }}
              onClick={() =>
              window.open(
                "https://chromewebstore.google.com/detail/glmkckchoggnebfiklpbiajpmjoagjgj?hl=en&authuser=0",
                "_blank"
              )
              }
              flex={{ md: "1", base: "none" }}>
              
              Add to your browser
            </Button>
            <Button
              className="site-cta-outline-branded"
              display={{ md: "none", base: "block" }}
              border={"1px solid #606060"}
              borderRadius={"4rem"}
              w={{ md: "15rem", base: "10rem" }}
              color={extendedTheme.colors._white}
              lineHeight={"28px"}
              fontSize={"0.75rem"}
              background={"transparent"}
              letterSpacing={"0rem"}
              onClick={scrollTo}
              _hover={{
                background:
                "linear-gradient(135deg, #171b29 0%, #8f8570 58%, #b7a789 100%)",
                border: "none"
              }}
              p={{ md: "1rem", base: "0.5rem" }}
              h={{ md: "3.75rem", base: "2.5rem" }}
              flex={{ md: "1", base: "none" }}>
              
              PLAY DEMO
            </Button>
          </Box>
        </Box>
        <HStack
          mt={"2rem"}
          gap={"3rem"}
          px={"4rem"}
          display={{ md: "flex", base: "none" }}
          flexDirection={{ base: "none", md: "row" }}
          justifyContent="flex-end"
          mr={"3rem"}>
          
          <Button
            className="site-cta-outline-branded"
            ml={{ md: "62.375rem" }}
            display={{ md: "flex", base: "none" }}
            border={"1px solid #606060"}
            borderRadius={"4rem"}
            w={"9rem"}
            color={extendedTheme.colors._white}
            lineHeight={"28px"}
            background={"transparent"}
            letterSpacing={"0.2rem"}
            onClick={scrollTo}
            _hover={{
              background:
              "linear-gradient(135deg, #171b29 0%, #8f8570 58%, #b7a789 100%)",
              border: "none"
            }}
            padding={"15px 68px 15px 68px"}>
            
            PLAY DEMO
          </Button>
        </HStack>
        {/* <Box
           display={{ base: "flex", md: "none" }}
           mt={"2rem"}
           justifyContent={"center"}
          >
           <Button
             ml={{ md: "55rem" }}
             display={"flex"}
             border={"1px solid #606060"}
             borderRadius={"4rem"}
             onClick={scrollInMobile}
             w={"12rem"}
             color={extendedTheme.colors._white}
             lineHeight={"32.4px"}
             background={"transparent"}
             letterSpacing={"0.29rem"}
             _hover={{
               background:
                 "linear-gradient(135deg, #171b29 0%, #8f8570 58%, #b7a789 100%)",
               border: "none",
             }}
             padding={"15px 68px 15px 68px"}
           >
             PLAY DEMO
           </Button>
          </Box> */}

        <HStack
          position={"relative"}
          mt={"4rem"}
          px={{ md: "15rem", base: "0" }}
          minW={"100%"}
          bg={"#FFFFFF"}
          display={"flex"}
          flexDirection={"column"}
          textAlign={"center"}
          py={{ md: "3rem", base: "1rem" }}>
          
          <Text
            color={"#0D0D25"}
            fontWeight={"700"}
            fontSize={{ md: "3.5rem", base: "1.5rem" }}
            lineHeight={{ base: "30px", md: "70px" }}>
            
            Introducing Hushh Browser Companion, a product that helps you keep
            track of your digital footprint with Gen AI
          </Text>
          <Text
            mt={"1rem"}
            color={"#656565"}
            fontSize={{ md: "1rem", base: "0.75rem" }}>
            
            Tired of being tracked online? Every click, scroll, and search query
            leaves a trail of your identity, exploited by third-party
            organizations for targeted advertising. With Hushh, the power is
            back in your hands
          </Text>
        
       
        </HStack>

        <HStack
          my={{ md: "8rem", base: "3rem" }}
          px={{ md: "7rem", base: "1.25rem" }}
          display={{ base: "flex" }}
          flexDirection={{ base: "column", md: "row" }}>
          
          <Box display={"flex"} flexDirection={"column"} gap={"1rem"} flex={1}>
            <Text
              className="default-gradient"
              letterSpacing={"0.255rem"}
              lineHeight={"1rem"}
              fontWeight={"600"}
              fontSize={{ md: "1rem", base: "0.75rem" }}>
              
              HUSHH
            </Text>
            <Text
              className="gradient"
              fontSize={{ md: "3.75rem", base: "1.75rem" }}
              fontWeight={"400"}
              lineHeight={{ md: "83.3px", base: "41.2px" }}>
              
              Browser Companion{" "}
            </Text>
            <Text
              className="gradient"
              fontSize={{ md: "3.75rem", base: "1.75rem" }}
              fontWeight={"700"}
              lineHeight={{ md: "83.3px", base: "41.2px" }}>
              
              that empowers you
            </Text>
            <Box
              position="relative"
              fontSize={{ base: "1.25rem", md: "1.75rem" }}
              fontWeight="700"
              css={{
                "&::before": {
                  content: '"–"',
                  display: "inline-block",
                  width: "22px",
                  height: "1em",
                  background: gradient,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  border: "0 solid",
                  borderImageSource: gradient,
                  borderImageSlice: 1
                },
                background: gradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}>
              
              Track your own browsing activity
            </Box>
            <Box
              fontSize={{ md: "1.25rem", base: "0.75rem" }}
              display={"flex"}
              flexDirection={"column"}
              fontWeight={"500"}
              lineHeight={"30.04px"}
              color={"#ABACB0"}
              gap={{ md: "1rem", base: "0rem" }}>
              
              <Text>Choose what data to collect</Text>
              <Text>Track your interests over time</Text>
              <Text>Export the collected data to your hushh wallet</Text>
              <Text>Sell your data responsibly and get tailored services</Text>
            </Box>
          </Box>
          <Box display={"flex"} flexDirection={"column"} flex={1} gap={"1rem"}>
            <Image src={BrowserBox} alt="BrowserBox" />
            <Text
              fontSize={{ md: "1rem", base: "0.75rem" }}
              color={"#ABABAB"}
              lineHeight={{ md: "36px", base: "18px" }}>
              
              See exactly what data is being collected about you, including
              search queries, brand interactions, interests, preferences, likes,
              and clicks. Gain insights into your online behavior and understand
              what shapes your digital footprint
            </Text>
            <Button
              borderRadius={"3.3rem"}
              w={"fit-content"}
              p={"1rem 2rem"}
              _hover={{
                color: "white",
                bg: "linear-gradient(135deg, #171b29 0%, #8f8570 58%, #b7a789 100%)",
                border: "none"
              }}
              onClick={() =>
              window.open(
                "https://chromewebstore.google.com/detail/glmkckchoggnebfiklpbiajpmjoagjgj?hl=en&authuser=0",
                "_blank"
              )
              }>
              
              Explore
            </Button>
          </Box>
        </HStack>

        <HStack
          my={{ md: "8rem", base: "3rem" }}
          px={{ md: "7rem", base: "1.25rem" }}
          gap={{ md: "2rem", base: "0.25rem" }}
          display={"flex"}
          flexDirection={{ md: "row", base: "column" }}>
          
          <Box
            display={{ md: "flex", base: "none" }}
            flexDirection={"column"}
            flex={1}
            gap={{ md: "2rem", base: "1rem" }}>
            
            <Image
              src={TypingGIF}
              alt="TypingGIF"
              style={{ height: "607px", width: "540px" }}
              unoptimized />
            
          </Box>
          <Box
            display={{ base: "flex", md: "none" }}
            flexDirection={"column"}
            flex={1}
            mb={"2rem"}
            gap={{ md: "2rem", base: "1rem" }}>
            
            <Image
              src={TypingGIF}
              alt="TypingGIF"
              style={{ height: "207px", width: "270px" }}
              unoptimized />
            
          </Box>

          <Box display={"flex"} flexDirection={"column"} gap={"2rem"} flex={1}>
            <Text
              className="default-gradient"
              letterSpacing={"0.255rem"}
              lineHeight={"1rem"}
              fontWeight={"600"}
              fontSize={"1rem"}>
              
              CONVENIENT
            </Text>
            <Text
              className="gradient"
              fontSize={{ md: "3.75rem", base: "1.75rem" }}
              fontWeight={"700"}
              lineHeight={{ md: "83.3px", base: "41.2px" }}>
              
              Wallet Integration
            </Text>
            <Box
              position="relative"
              fontSize={{ base: "1.25rem", md: "1.75rem" }}
              fontWeight="700"
              css={{
                "&::before": {
                  content: '"–"',
                  display: "inline-block",
                  width: "22px",
                  height: "1em",
                  background: gradient,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  border: "0 solid",
                  borderImageSource: gradient,
                  borderImageSlice: 1
                },
                background: gradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}>
              
              Streamlined Integration via Browser Companion
            </Box>
            <Box
              fontSize={"1rem"}
              display={"flex"}
              flexDirection={"column"}
              fontWeight={"500"}
              lineHeight={"36px"}
              color={"#ABABAB"}
              gap={"1rem"}>
              
              <Text>
                Hushh Web Browser Companion also enables users to share their
                user activity in their Hushh Wallet. This makes it easy to
                organize and access important information, such as receipts,
                warranty details, and more, all in one secure place.
              </Text>
            </Box>
            <Button
              className="site-cta-solid"
              border={"3px solid #606060"}
              borderRadius={"2px"}
              w={"16.25rem"}
              h={"3.125rem"}
              color={extendedTheme.colors._white}
              lineHeight={"28px"}
              background={"transparent"}
              letterSpacing={"0.4rem"}
              _hover={{
                background:
                "linear-gradient(135deg, #171b29 0%, #8f8570 58%, #b7a789 100%)",
                border: "none"
              }}
              onClick={() =>
              window.open(
                "https://chromewebstore.google.com/detail/glmkckchoggnebfiklpbiajpmjoagjgj?hl=en&authuser=0",
                "_blank"
              )
              }>
              
              REQUEST ACCESS
            </Button>
          </Box>
        </HStack>

        <Stack margin={{ md: "10rem", base: "3.5rem" }} position={"relative"}>
          <Box display={{ base: "none", md: "block" }}>
            <Image
              src={BgAnimation}
              alt="BgAnimation"
              style={{
                position: "absolute",
                top: "-15px",
                zIndex: "-10",
                width: "100%",
                height: "40rem",
                filter: "grayscale(100%)"
              }}
              unoptimized />
            
          </Box>
          <Box display={{ base: "block", md: "none" }}>
            <Image
              src={BgAnimation}
              alt="BgAnimation"
              style={{
                position: "absolute",
                top: "-15px",
                zIndex: "-10",
                width: "100%",
                height: "13rem",
                filter: "grayscale(100%)"
              }}
              unoptimized />
            
          </Box>
          <VStack
            mb={{ md: "2rem", base: "6rem" }}
            px={{ md: "10rem", base: "0rem" }}>
            
            <Text
              textAlign={"center"}
              className="gradient"
              fontWeight={"400"}
              fontSize={{ md: "3.75rem", base: "1.25rem" }}
              lineHeight={{ base: "45px", md: "75px" }}
              as={"h2"}>
              
              Intelligent Insights and <br></br> Recommendations
            </Text>
            <Text
              mt={{ md: "2rem", base: "1rem" }}
              color={"white"}
              textAlign={"center"}
              fontWeight={"400"}
              lineHeight={{ md: "31.5px", base: "20px" }}
              fontSize={{ md: "1.125rem", base: "0.75rem" }}>
              
              The extension utilizes advanced algorithms and AI technology to
              analyze the captured data and generate brilliant insights. Users
              receive personalized recommendations, discover new products and
              brands, aligned with their interests, and stay up-to-date with the
              latest trends with Gen AI.
            </Text>
          </VStack>
        </Stack>
        <BrowserFaq />
      </Box>
      <ContactForm />
    </>);

};

export default ClientBrowserCompanion;
