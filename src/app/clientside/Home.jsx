"use client";
import "../globals.css";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import ConsentAILanding from "../_components/features/ConsentAILanding";
import CodeLikeBacteriaSection from "../_components/features/CodeLikeBacteriaSection";
import ConsentAgentsAsOperons from "../_components/features/ConsentAgentsAsOperons";
import EukaryoticBackbone from "../_components/features/EukaryoticBackbone";
import VerifiediOSUserSection from "../_components/features/VerifiediOSUserSection";
import ContactForm from "../_components/features/contactForm";
import NotificationPopup from "../_components/features/popupNotification";
import DownloadModal from "../_components/primitives/downloadModal";
import { useDisclosure, useTheme } from "@chakra-ui/react";

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
      
      {/* New ConsentAI Landing Section */}
      <ConsentAILanding />
      
      {/* Code Like Bacteria Section */}
      <CodeLikeBacteriaSection />
      
      {/* Consent Agents as Operons Section */}
      <ConsentAgentsAsOperons />
      
      {/* Eukaryotic Backbone Section */}
      {/* <EukaryoticBackbone /> */}
      
      {/* For the Verified iOS User Section */}
      <VerifiediOSUserSection />
      
      {/* Contact Form */}
      <ContactForm />
      
      {/* Notification Popup */}
      {showPopup && (
        <NotificationPopup 
          onClose={() => setShowPopup(false)} 
        />
      )}
    </>
  );
};

export default ClientHome;
