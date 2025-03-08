"use client";
import "../globals.css";
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Grid,
  HStack,
  Heading,
  Text,
  VStack,
  useDisclosure,
  useTheme,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { BrandSlider } from "../_components/features/brandSlider";
import BrandWalletSection from "../_components/features/brandWalletSection";
// import ConceirgeApp from "../_components/svg/conciergeApp";
import VibeSearchApi from "../_components/svg/vibeSearchApi";
import ValetChat from "../_components/svg/valetChat";
import ChromeExtentionLogo from "../_components/svg/ChromeExtensionLogo";
import FendiCard from "../../../public/Images/Fendi.png";
import HushhButtonIcon from "../_components/svg/hushhButton";
import HushhWalletIcon from "../_components/svg/hushhWalletIcon";
import KeyIcon from "../_components/svg/keyIcon";
import LockIcon from "../_components/svg/LockIcon";
import LouisVuitton from "../../../public/Images/LouisVuitton.png";
import { useState, useEffect } from "react";
import React from "react";
import SephoraCard from "../../../public/Images/Sephora.png";
import { ServiceCard } from "../_components/primitives/serviceCard";
import ShieldIcon from "../_components/svg/ShieldIcon";
import TechnologySection from "../_components/features/technologySection";
import VibeSearchIcon from "../_components/svg/vibeSearch";
import extendedTheme from "../theme";
import theme from "../theme";
import { useRouter } from "next/navigation";
import HushhCoinUiBox from "../_components/features/hushhCoinUiBox";
import ContactForm from "../_components/features/contactForm";
import NotificationPopup from "../_components/features/popupNotification";
import ReviewSlider from "../_components/features/reviewSlider";
import HfsLogo from "../_components/svg/hfsLogo";
import HomeBg from "../_components/svg/homeBG.svg";
import Image from "next/image";
import Head from "next/head";
import HomeBanner from "../_components/svg/homepageBanner.svg";
import PinkShadow from "../_components/svg/pinkShadow1.svg";
import CircleHomeBg from "../_components/svg/circleHomeBg.svg";
import RightCircleEclipse from "../_components/svg/rightCircleEclipse.svg";
import ApiVibeSearch from "../_components/svg/apiVibeSearch";
import { HushhBlogsHome } from "../_components/HushhBlogsHome";
import AppleIcon from "../_components/svg/icons/appleIconLogo.svg";
import PlayStoreIcon from "../_components/svg/icons/playStoreIcon.svg";
import YoutubeBG from "../_components/svg/youtubeBgEllipse.svg";
import ImageGrid from "../_components/features/dynamicImageGrid";
import { QRCode } from "react-qrcode-logo";
import { isMobile, isAndroid, isIOS } from "react-device-detect";
import UnicodeQR from "../_components/svg/onelinkQrdownload.svg";
import DownloadModal from "../_components/primitives/downloadModal";

const ClientHome = () => {
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  // const { isOpen, onToggle } = useDisclosure();
  const theme = useTheme();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [hasHovered, setHasHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentQRLink, setCurrentQRLink] = useState("");

  const handleMouseEnter = () => {
    if (!hasHovered) {
      onOpen();
      setHasHovered(true);
    }
  };

  const handleOpenModal = (link) => {
    setCurrentQRLink(link);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowPopup(true);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  // const handleDownloadClick = () => {
  //   if (isAndroid) {
  //     window.location.href = "https://bit.ly/hushh-wallet-play-store";
  //   } else if (isIOS) {
  //     window.location.href = "https://bit.ly/hushh-app-ios";
  //   } else {
  //     handleOpenModal();
  //   }
  // };
  const handleDownloadClick = () => {
    setIsModalOpen(true); // Open the modal instead of navigating
  };

  const handleTestBuildClick = (platform) => {
    if (platform === "android") {
      window.location.href = "https://bit.ly/hushh-wallet-android-dev"; // Test build for Android
    } else {
      window.location.href = "https://bit.ly/hushh-wallet-ios-dev"; // Test build for iOS
    }
  };

  const handleProductionBuildClick = (platform) => {
    if (platform === "android") {
      window.location.href = "https://bit.ly/hushh-wallet-play-store"; // Production build for Android
    } else {
      window.location.href = "https://bit.ly/hushh-app-ios"; // Production build for iOS
    }
  };

  return (
    <>
      <Head>
        <title>Hushh - Home</title>
        <meta name="title" content="HUSHH - Home" />
        <meta
          name="description"
          content="Intelligence as a service powered by your Data"
        />
        <meta
          name="keywords"
          content="Data API Business, Data Autonomy, Data Equity, Consent-Driven Excellence, Technology For Everyone, Hushh Wallet App, Hushh Button, Vibe Search, Browser Companion, Concierge App, Valet Chat, Vibe Search API, Hushh For Students, Brand Wallet, Receipt Radar, Future of Digital Identity & Personalised Experiences, Gen AI, GenAI "
        />
         <meta property="og:title" content="Hushh - user data API businesses" />
        <meta
          property="og:description"
          content="Integrated Wallet & Data Control"
        />
        <meta property="og:url" content="https://hushh.ai" />
        <link rel="canonical" href="https://hushh.ai" key="canonical"/>
      </Head>
      <DownloadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <div className="relative">
        <main className="bg-transparent">
          <div className="absolute top-0 w-full">
            <Box
              display={"flex"}
              flexDirection={"row"}
              px={{ base: "0.2rem", md: "2rem" }}
            >
              <VStack
                align={"flex-start"}
                w={"full"}
                flex={1}
                pt={20}
                display={"flex"}
                gap={"1.5rem"}
                mt={{ md: "7rem", base: "1rem" }}
                ml={{ base: "1rem", md: "5.5rem" }}
              >
                <HStack>
                  <Heading
                    fontSize={{ md: "5rem", base: "2rem" }}
                    lineHeight={{ md: "5.5rem", base: "2.5rem" }}
                    fontWeight={"400"}
                    display={"flex"}
                    textAlign={"left"}
                    alignItems={"flex-start"}
                    justifyContent={"flex-start"}
                    flexDirection={"column"}
                    bg={"transparent"}
                    className="text-headText"
                    as={'h1'}
                  >
                    <div
                      className="wrapper"
                      style={{ background: "transparent !important" }}
                    >
                      <div className="words">
                        <span className="slideText bg-gradient-to-r from-purple-600 to-red-600 text-transparent bg-clip-text">
                          Enable Customers
                        </span>
                        <span className="slideText bg-gradient-to-r from-purple-600 to-red-600 text-transparent bg-clip-text">
                          Enrich Data
                        </span>
                        <span className="slideText bg-gradient-to-r from-purple-600 to-red-600 text-transparent bg-clip-text">
                          Enhance Business
                        </span>
                        <span className="slideText bg-gradient-to-r from-purple-600 to-red-600 text-transparent bg-clip-text">
                          Enable Customers
                        </span>
                        <span className="slideText bg-gradient-to-r from-purple-600 to-red-600 text-transparent bg-clip-text">
                          Enrich Data
                        </span>
                        <span className="slideText bg-gradient-to-r from-purple-600 to-red-600 text-transparent bg-clip-text">
                          Enhance Business
                        </span>
                      </div>
                    </div>
                  </Heading>
                </HStack>

                {/* <Text
                  color={"#656565"}
                  fontSize={{ md: "1.15rem", base: "1rem" }}
                >
                  Revolutionize customer insights, Personalize commerce, Build
                  deeper connections with your customers consent and control.
                </Text> */}
                <Box
                  mt={{ md: "2rem", base: "1rem" }}
                  display={"flex"}
                  gap={{ md: "2rem", base: "1rem" }}
                  flexDirection={{ md: "row", base: "column" }}
                  zIndex={"9"}
                >
                  <Button
                    border="1px solid #606060"
                    borderRadius="2px"
                    color={theme.colors._white}
                    lineHeight="28px"
                    background="transparent"
                    onClick={handleDownloadClick}
                    px="21px"
                    py="15px"
                    fontSize={{ md: "1rem", base: "0.75rem" }}
                    fontWeight="400"
                    letterSpacing={{ md: "0.1rem", base: "0.1rem" }}
                    _hover={{
                      background:
                        "linear-gradient(265.3deg, #E54D60 8.81%, #A342FF 94.26%)",
                      border: "none",
                    }}
                    w={{ md: "18rem", base: "14rem" }}
                  >
                    Download Hushh Wallet App
                  </Button>
                  <Button
                    border="1px solid #606060"
                    borderRadius="2px"
                    color={theme.colors._white}
                    lineHeight="28px"
                    background="transparent"
                    onClick={()=> router.push('/demoBookingPage')}
                    px="21px"
                    py="15px"
                    fontSize={{ md: "1rem", base: "0.75rem" }}
                    fontWeight="400"
                    letterSpacing={{ md: "0.1rem", base: "0.1rem" }}
                    _hover={{
                      background:
                        "linear-gradient(265.3deg, #E54D60 8.81%, #A342FF 94.26%)",
                      border: "none",
                    }}
                    w={{ md: "18rem", base: "14rem" }}
                  >
                    Schedule A Call 
                  </Button>
                </Box>
              </VStack>
              <VStack
                display={{ md: "block", base: "none" }}
                position={"relative"}
                flex={1}
              >
                <Image
                  style={{ top: "-65px", position: "absolute" }}
                  src={HomeBanner}
                  alt="HomeBanner"
                  priority
                />
                <Image
                  src={CircleHomeBg}
                  alt="CircleHomeBg"
                  style={{ bottom: "0px", position: "absolute" }}
                />
              </VStack>
              <VStack
                display={{ md: "none", base: "block" }}
                position={"relative"}
                flex={1}
              >
                <Image
                  src={CircleHomeBg}
                  alt="CircleHomeBg"
                  style={{
                    bottom: "0px",
                    height: "2rem",
                    width: "2rem",
                    // zIndex: "0.9",
                  }}
                />
              </VStack>
            </Box>

            <HStack
              pt={{ md: "8rem", base: "6rem" }}
              justify={"center"}
              display={"flex"}
              flexDirection={"column"}
              mt={{md:'9rem',base:'0'}}
            >
              <Text
                className="bg-gradient-to-r from-red-600 to-purple-600 text-transparent bg-clip-text"
                fontWeight={600}
                letterSpacing={"0.25rem"}
                fontSize={{md:"1rem",base:'0.75rem'}}
                mb={{ md: "1.25rem",base:'0' }}
                // as={"h1"}
              >
                BRANDS WE WANT TO WORK WITH
              </Text>
              <Text
                align={"center"}
                lineHeight={{ md: "63.3px", base: "2rem" }}
                pl={{ md: "12rem", base: "2rem" }}
                pr={{ md: "12rem", base: "2rem" }}
                color={theme.colors.secondary}
                fontWeight={"300"}
                fontSize={{ md: "3.75rem", base: "1rem" }}
              >
                Discover the brands that {"  "}
                <span
                  style={{ lineHeight: "63.3px" }}
                  className="trust-text bg-gradient-to-r from-purple-600 to-red-600 text-transparent bg-clip-text"
                >
                  trust us
                </span>{" "}
                to unlock the potential of their customer data
              </Text>
            </HStack>

            <BrandSlider />

            <Box
              display="flex"
              h={"full"}
              flexDirection={{ base: "column", md: "row" }}
              alignItems={{ base: "center", md: "flex-start" }}
              pt={{ md: "10rem", base: "6rem" }}
              justifyContent="space-between"
              gap="8rem"
              px={{ md: "3rem" }}
              minH={'100vh'}
            >
              {/* Left side box */}
              <Box
                position={"relative"}
                flex="1"
                bg={extendedTheme.colors._black}
                display={{ base: "none", md: "block" }}
              >
                <Image
                  src={LouisVuitton}
                  alt="Louis Vuitton"
                  width={350.62}
                  height={363.19}
                  style={{
                    // zIndex: "1",
                    position: "relative",
                    top: "25px",
                    left: "100px",
                  }}
                />
                <Image
                  style={{
                    position: "relative",
                    top: "-90.67px",
                    left: "319px",
                    // zIndex: "2",
                  }}
                  src={SephoraCard}
                  alt="Sephora Card"
                  width={420.62}
                  height={363.19}
                />
                <Image
                  style={{
                    position: "absolute",
                    top: "200.67px",
                    left: "100px",
                    // zIndex: "1",
                    rotate: "10.02",
                  }}
                  src={FendiCard}
                  alt="Fendi Card"
                  width={570.62}
                  height={363.19}
                />
              </Box>
              {/* Right side box */}
              <VStack
                alignItems={{ md: "left", base: "" }}
                mr={{ md: "2rem", base: "0" }}
                textAlign={{ md: "left", base: "center" }}
                flex="1"
              >
                <Text
                  className="color-gradient"
                  fontWeight={600}
                  letterSpacing={"0.25rem"}
                  fontSize={{md:"1rem",base:'0.75rem'}}
                >
                  OUR ADVANTAGES
                </Text>

                <Text
                  className="gradient"
                  lineHeight={"63px"}
                  fontWeight={"400"}
                  alignItems={{ md: "left", base: "center" }}
                  textAlign={{ md: "left", base: "center" }}
                  fontSize={{ md: "3.75rem", base: "2rem" }}
                >
                  Why Us?
                </Text>
                <Text
                  px={{ base: "1rem", md: "0" }}
                  alignItems={{ base: "center" }}
                  pt={{ md: "1rem" }}
                  fontWeight={"500"}
                  fontSize={{md:'',base:'1rem'}}
                  color={extendedTheme.colors.secondary}
                >
                  Empower individuals with data control. Today, we're a
                  cutting-edge platform fostering trust, transparency, and
                  personalized experiences.
              </Text>

                <Box
                  pt={{ md: "40px", base: "20px" }}
                  width={"100%"}
                  pr={{ base: "1.25rem" }}
                  justifyContent={{ base: "space-between" }}
                  display={"flex"}
                  gap={{ md: "4rem" }}
                >
                  <VStack
                    mx={{ base: "2rem", md: "0" }}
                    maxW={{ md: "290px" }}
                    textAlign={"left"}
                    alignItems={"left"}
                  >
                    <HStack gap={{ md: "2rem" }}>
                      <ShieldIcon />
                      <Text
                        fontWeight={"500"}
                        fontSize={{ base: "1rem", md: "1.25rem" }}
                        ml={{ base: "0.5rem" }}
                        color={extendedTheme.colors.secondary}
                      >
                        Data <br></br> Autonomy
                      </Text>
                    </HStack>
                    <Divider
                      mt={"1rem"}
                      className="divider"
                      width={{ md: "12rem", base: "8rem" }}
                    />
                    <Text
                      fontWeight={"500"}
                      fontSize={{ base: "0.75rem", md: "1rem" }}
                      lineHeight={{ md: "22px", base: "18px" }}
                      mt={{ md: "1.25rem", base: "0.75rem" }}
                      color={extendedTheme.colors.secondary}
                    >
                      Empower your customers with full control over their
                      personal data
                    </Text>
                  </VStack>

                  <VStack
                    maxW={{ md: "290px" }}
                    mt={"-0.68rem"}
                    textAlign={"left"}
                    alignItems={"left"}
                  >
                    <HStack gap={{ md: "2rem" }}>
                      <KeyIcon />
                      <Text
                        fontWeight={"500"}
                        fontSize={{ base: "1rem", md: "1.25rem" }}
                        ml={{ base: "0.5rem" }}
                        color={extendedTheme.colors.secondary}
                      >
                        Data <br></br> Equity
                      </Text>
                    </HStack>
                    <Divider
                      mt={"1rem"}
                      className="divider"
                      width={{ md: "12rem", base: "8rem" }}
                    />
                    <Text
                      fontWeight={"500"}
                      lineHeight={{ md: "22px", base: "18px" }}
                      fontSize={{ base: "0.75rem", md: "1rem" }}
                      mt={{ md: "1.25rem", base: "0.75rem" }}
                      color={extendedTheme.colors.secondary}
                    >
                      Creating a fair and equitable environment for data
                      sharing.
                    </Text>
                  </VStack>
                </Box>
                <VStack
                  mx={{ base: "1rem" }}
                  pr={"1.25rem"}
                  alignContent={"left"}
                  mt={"1.5rem"}
                  textAlign={"left"}
                  alignItems={"left"}
                >
                  <HStack gap={"1rem"}>
                    <LockIcon />
                    <Text
                      fontWeight={"500"}
                      fontSize={{ base: "1rem", md: "1.25rem" }}
                      color={extendedTheme.colors.secondary}
                    >
                      Consent-Driven <br></br> Excellence
                    </Text>
                  </HStack>
                  <Divider
                    mt={"1rem"}
                    className="divider"
                    width={{ md: "22rem", base: "14rem" }}
                  />
                  <Text
                    fontWeight={"500"}
                    lineHeight={{ md: "22px", base: "18px" }}
                    mt={{ md: "1.25rem", base: "0.75rem" }}
                    fontSize={{ base: "0.75rem", md: "1rem" }}
                    color={extendedTheme.colors.secondary}
                  >
                    Creating a fair and equitable environment for data sharing.
                  </Text>
                </VStack>
              </VStack>
            </Box>

            <TechnologySection />

            <BrandWalletSection />

            <HushhCoinUiBox />

            <HushhBlogsHome />

            <ContactForm />
          </div>
        </main>
        <Image
          src={RightCircleEclipse}
          alt="RightCircleEclipse"
          style={{
            top: "0%",
            right: "0px",
            position: "absolute",
          }}
        />
      </div>
    </>
  );
};

export default ClientHome;
