"use client";

import React, { useState, useEffect } from "react";
import { Box, Button, Text, HStack, Link } from "@chakra-ui/react";

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if the user has already given consent
    const cookieConsent = document.cookie
      .split("; ")
      .find((row) => row.startsWith("cookieConsent="));
    if (!cookieConsent) {
      setShowBanner(true);
    }
  }, []);

  const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // Expiry in days
    document.cookie = `${name}=${value}; path=/; expires=${date.toUTCString()}; SameSite=Strict`;
  };

  const pushToDataLayer = (event, details = {}) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event,
      ...details,
    });
  };

  const handleAccept = () => {
    // Store consent details in cookies
    const consentDetails = { analytics: true, ads: true };
    setCookie("cookieConsent", "accepted", 365); // 1 year expiration
    setCookie("consentDetails", JSON.stringify(consentDetails), 365);
    setCookie("consentDate", new Date().toISOString(), 365);
    setShowBanner(false);

    // Push event to dataLayer for GTM
    pushToDataLayer("cookie_consent_accepted", consentDetails);
  };

  const handleReject = () => {
    // Store rejection details
    const consentDetails = { analytics: false, ads: false };
    setCookie("cookieConsent", "rejected", 365);
    setCookie("consentDetails", JSON.stringify(consentDetails), 365);
    setCookie("consentDate", new Date().toISOString(), 365);
    setShowBanner(false);

    // Push event to dataLayer for GTM
    pushToDataLayer("cookie_consent_rejected", consentDetails);
  };

  if (!showBanner) {
    return null; // Do not render the banner if consent is already given
  }

  return (
    <Box
      position="fixed"
      bottom="0"
      width="100%"
      bg="gray.800"
      color="white"
      p={4}
      zIndex="1000"
      boxShadow="0px -2px 10px rgba(0, 0, 0, 0.1)"
    >
      <HStack
        spacing={4}
        alignItems="center"
        justifyContent="space-between"
        maxW="container.lg"
        mx="auto"
      >
         <Text fontSize="sm" textAlign="center">
          We use cookies to ensure you get the best experience on our website.{" "}
          <Link href="/legal/privacypolicy" fontWeight="bold" color="teal.200">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="/legal/termsofuse" fontWeight="bold" color="teal.200">
            Terms of Use
          </Link>
          .
        </Text>
        <HStack spacing={3}>
          <Button
            size="sm"
            bg="green.500"
            color="white"
            _hover={{ bg: "green.600" }}
            onClick={handleAccept}
          >
            Accept
          </Button>
          <Button
            size="sm"
            bg="red.500"
            color="white"
            _hover={{ bg: "red.600" }}
            onClick={handleReject}
          >
            Reject
          </Button>
        </HStack>
      </HStack>
    </Box>
  );
};

export default CookieConsent;
