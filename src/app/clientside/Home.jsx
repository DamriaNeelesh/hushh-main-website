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

  const handleDownloadClick = () => {
    setIsModalOpen(true);
  };

  const handleTestBuildClick = (platform) => {
    if (platform === "android") {
      window.location.href = "https://bit.ly/hushh-wallet-android-dev";
    } else {
      window.location.href = "https://bit.ly/hushh-wallet-ios-dev";
    }
  };

  const handleProductionBuildClick = (platform) => {
    if (platform === "android") {
      window.location.href = "https://bit.ly/hushh-wallet-play-store";
    } else {
      window.location.href = "https://bit.ly/hushh-app-ios";
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
      </Head>
      <DownloadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <div className="relative">
        {isMobile ? (
          <Image
            src={PinkShadow}
            alt="PinkShadow"
            placeholder="blur"
            style={{ width: "50%", height: "50%" }}
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANII="
          />
        ) : (
          <Image
            src={PinkShadow}
            alt="PinkShadow"
            placeholder="blur"
            style={{ width: "80%", height: "80%" }}
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANII="
          />
        )}
        <main className="bg-transparent font-Figtree">
          <header>
            <h1 className="sr-only">Hushh - Revolutionizing Customer Insights</h1>
            <nav aria-label="Main Navigation">
              <ul>
                <li><a href="/about">About Us</a></li>
                <li><a href="/products/hushhWalletApp">Hushh Wallet App</a></li>
                <li><a href="/contact-us">Contact Us</a></li>
                <li><a href="/career">Careers</a></li>
              </ul>
            </nav>
          </header>
          <section aria-labelledby="home-intro">
            <h2 id="home-intro">Enable Customers, Enrich Data, Enhance Business</h2>
            <p>Revolutionize customer insights, personalize commerce, and build deeper connections with your customers’ consent and control.</p>
            <div>
              <button onClick={handleDownloadClick}>Download Hushh Wallet App</button>
              <button onClick={() => router.push('/demoBookingPage')}>Schedule A Call</button>
            </div>
          </section>
          <section aria-labelledby="brands">
            <h2 id="brands">Brands We Want to Work With</h2>
            <p>Discover the brands that trust us to unlock the potential of their customer data.</p>
            <BrandSlider />
          </section>
          <section aria-labelledby="why-us">
            <h2 id="why-us">Why Us?</h2>
            <p>Empower individuals with data control. Today, we're a cutting-edge platform fostering trust, transparency, and personalized experiences.</p>
            <ul>
              <li>Data Autonomy: Empower your customers with full control over their personal data.</li>
              <li>Data Equity: Creating a fair and equitable environment for data sharing.</li>
              <li>Consent-Driven Excellence: Ensuring privacy and transparency in data usage.</li>
            </ul>
          </section>
          <footer>
            <ContactForm />
          </footer>
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
