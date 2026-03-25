"use client";

import { Suspense, useEffect } from "react";
import {
  Box,
  Button,
  Divider,
  HStack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import DeveloperBg from "../../_components/svg/developerApi/developerApiLoginBg.svg";
import BgLeftCircle from "../../_components/svg/developerApi/developerLoginLCircle.svg";
import BgRightCircle from "../../_components/svg/developerApi/developerLoginRCircle.svg";
import Image from "next/image";
import { useAuth } from "../../context/AuthContext";
import GoogelIcon from "../../_components/svg/icons/googleIcon.svg";
import AppleIcon from "../../_components/svg/icons/appleIconLogo.svg";
import 'react-phone-number-input/style.css'
import MFAEnrollmentModal from "../../_components/auth/MFAEnrollmentModal";
import MFAVerificationModal from "../../_components/auth/MFAVerificationModal";
import ContentWrapper from "../../_components/layout/ContentWrapper";

function DeveloperLoginPageContent() {
  const {
    isAuthenticated,
    loading: authLoading,
    mfaRequired,
    mfaEnrollmentNeeded,
    currentFactorId,
    currentChallengeId,
    checkingMFA,
    completeMFAEnrollment,
    completeMFAVerification,
    signIn,
    signInWithApple,
  } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const toast = useToast();
  const onboardingPath = "/developers/on-boarding";
  const redirectTarget = searchParams.get("redirect") || onboardingPath;
  const oauthReturnPath = redirectTarget;

  useEffect(() => {
    if (
      isAuthenticated &&
      !authLoading &&
      !checkingMFA &&
      !mfaRequired &&
      !mfaEnrollmentNeeded
    ) {
      router.replace(redirectTarget);
    }
  }, [
    isAuthenticated,
    authLoading,
    checkingMFA,
    mfaRequired,
    mfaEnrollmentNeeded,
    router,
    redirectTarget,
  ]);

  const handleGoogleLogin = async () => {
    try {
      await signIn(null, oauthReturnPath);
      toast({
        title: "Signed in",
        description: "Continuing to the developer experience.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Google Sign-In Error",
        description: error?.message || "Unable to sign in with Google.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleAppleLogin = async () => {
    try {
      await signInWithApple(null, oauthReturnPath);
      toast({
        title: "Signed in",
        description: "Continuing to the developer experience.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Apple Sign-In Error",
        description: error?.message || "Unable to sign in with Apple.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // ... existing code ...

  return (
    <ContentWrapper surface="muted">
      <section className="site-page-band site-page-band--wide developer-auth-band">
        <div className="developer-auth-shell site-page-card">
          <Image
            src={BgLeftCircle}
            alt="BgLeftCircle"
            className="developer-auth-bg developer-auth-bg--left"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANII="
          />
          <Image
            src={BgRightCircle}
            alt="BgRightCircle"
            className="developer-auth-bg developer-auth-bg--right"
            width={200}
            height={200}
          />
          <Image
            src={DeveloperBg}
            alt="DeveloperBg"
            className="developer-auth-bg developer-auth-bg--center"
          />

          {/* {loading && <Loading />} */}
          <main className="developer-auth-main">
            <Box
              zIndex={"1"}
              w={{ md: "lg", base: "100%" }}
              minH={"25rem"}
              borderRadius={"1.61rem"}
              background={"rgba(23, 27, 41, 0.95)"}
              border={"1px solid rgba(255, 255, 255, 0.08)"}
              p={{ md: "2.68rem", base: "1.34rem" }}
              textAlign={"center"}
              display={"flex"}
              flexDirection={"column"}
              alignContent={"space-between"}
              className="developer-auth-card"
            >
          <Text
            color={"#CBCBCB"}
            fontSize={{ md: "1.65rem", base: "1.15rem" }}
            fontWeight={"700"}
            mb={{ md: "1.25rem", base: "1rem" }}
            as={'h1'}
          >
            {" "}
            Get your account ready for Hushh{" "}
          </Text>

          <Button
            style={{ borderRadius: "3.35rem" }}
            onClick={handleGoogleLogin}
            w={"100%"}
            background="#686F7D0F"
            mb={{ md: "1.25rem", base: "0.75rem" }}
            color={"#CBCBCB"}
            fontWeight={"400"}
            fontSize={"1rem"}
            lineHeight={"17.5px"}
            textAlign={"center"}
            gap={{ md: "0.75rem", base: "0.45rem" }}
            _hover={{
              color: "white",
              background:
                "linear-gradient(135deg, #171b29 0%, #8f8570 58%, #b7a789 100%)",
            }}
          >
            <Image src={GoogelIcon} alt="GoogelIcon" />
            Continue with Google
          </Button>

          <Button
            style={{ borderRadius: "3.35rem" }}
            onClick={handleAppleLogin}
            w={"100%"}
            background="#686F7D0F"
            mb={{ md: "1.25rem", base: "0.75rem" }}
            color={"#CBCBCB"}
            fontWeight={"400"}
            fontSize={"1rem"}
            lineHeight={"17.5px"}
            textAlign={"center"}
            gap={{ md: "0.75rem", base: "0.45rem" }}
            _hover={{
              color: "white",
              background:
                "linear-gradient(135deg, #171b29 0%, #8f8570 58%, #b7a789 100%)",
            }}
          >
            <Image src={AppleIcon} alt="AppleIcon" />
            Continue with Apple
          </Button>

          <HStack my={{ md: "1rem", base: "0.5rem" }}>
            <Divider />
            <Text
              color={"#3F434A"}
              fontWeight={"400"}
              fontSize={{ md: "0.87rem", base: "0.6rem" }}
            >
              Or
            </Text>
            <Divider />
          </HStack>

          {/* ... existing form and other components ... */}

          <Button
            style={{ borderRadius: "3.35rem" }}
            onClick={() => router.push(redirectTarget)}
            w={"100%"}
            background="linear-gradient(135deg, #171b29 0%, #8f8570 58%, #b7a789 100%)"
            mb={{ md: "1.25rem", base: "0.75rem" }}
            color="white"
            _hover={{
              opacity: 0.94,
            }}
          >
            Get Started
          </Button>

          <Text
            fontWeight={"400"}
            lineHeight={"18px"}
            fontSize={{ md: "sm", base: "xs" }}
            color={"white"}
          >
            By continuing, you&rsquo;re agreeing to our{" "}
            <a href="/terms" style={{ textDecoration: "underline" }}>
              Terms
            </a>{" "}
            and{" "}
            <a
              href="/privacy"
              style={{ textDecoration: "underline" }}
            >
              Privacy Policy
            </a>
          </Text>
            </Box>
          </main>
        </div>
      </section>

      <MFAEnrollmentModal
        isOpen={mfaEnrollmentNeeded}
        onClose={() => {
          toast({
            title: "Two-factor required",
            description: "Enable two-factor authentication to continue.",
            status: "info",
            duration: 4000,
            isClosable: true,
            position: "top",
          });
        }}
        onSuccess={async () => {
          await completeMFAEnrollment();
          toast({
            title: "Two-factor enabled",
            description: "Two-factor authentication is now active.",
            status: "success",
            duration: 4000,
            isClosable: true,
            position: "top",
          });
        }}
      />

      <MFAVerificationModal
        isOpen={mfaRequired}
        onClose={() => {
          toast({
            title: "Verification required",
            description: "Enter your authentication code to continue.",
            status: "info",
            duration: 4000,
            isClosable: true,
            position: "top",
          });
        }}
        factorId={currentFactorId}
        challengeId={currentChallengeId}
        onSuccess={async () => {
          await completeMFAVerification();
          toast({
            title: "Verified",
            description: "Authentication verified. Redirecting...",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
        }}
      />
    </ContentWrapper>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <DeveloperLoginPageContent />
    </Suspense>
  );
}
