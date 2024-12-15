"use client";
import React from "react";
import {
  Box,
  Button,
  IconButton,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import { CiShare2 } from "react-icons/ci";
import { QRCode } from "react-qrcode-logo";
import { useToast } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";

const qrCodePage2 = () => {
  const router = useRouter();
  const toast = useToast();
  const qrValue = "https://www.hush1one.com/viva-connect";

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Share QR Code",
          text: "Check out this QR code!",
          url: window.location.href,
        })
        .then(
          toast({
            title: "QR share successfully",
            description: "Meanwhile please explore our products",
            status: "success",
            duration: 3000,
            isClosable: true,
          })
        )
        .catch((error) => console.log("Error sharing", error));
    } else {
      alert("Share functionality is not supported in this browser.");
    }
  };

  return (
    <>
      <Box
        fontFamily={"Poppins"}
        bg="black"
        minH="100vh"
        p={4}
        color="white"
        position={"relative"}
        mt={"1rem"}
        zIndex={"999999999"}
      >
        <Button
          onClick={() => router.push("/viva-connect")}
          leftIcon={<ArrowBackIcon stroke={"#FFFFFF"} />}
          bg={"transparent"}
          color={"#FFFFFF"}
          m={0}
          _hover={{
            color:'white',
            bg:'#1B1B1B'
          }}
        >
          Back
        </Button>
        <VStack spacing={4} mt={"4rem"}>
          <Box
            bg={"#1B1B1B"}
            p={"2rem"}
            borderRadius={"8px"}
            textAlign={"center"}
            display={"flex"}
            flexDirection={"column"}
          >
            {/* <QRCode size='40' fgColor='#FFFFFF' logoOpacity={'0.5'} bgColor='transparent'	 quietZone={'0'} logoPaddingStyle='square' logoPadding='0' value="https://github.com/gcoro/react-qrcode-logo"/> */}

            <QRCode value={qrValue} size={256} />
            <Text
              mt={"0.5rem"}
              fontSize={"12px"}
              fontWeight={"400"}
              align={"center"}
              color={"#949494"}
              lineHeight={"14.4px"}
            >
              Scan to save their digital profile and network
            </Text>
          </Box>
          <Button
            leftIcon={<CiShare2 stroke="#666666" />}
            bg={"white"}
            color={"#666666"}
            onClick={handleShare}
          >
            Share QR code
          </Button>
        </VStack>
      </Box>
    </>
  );
};

export default qrCodePage2;
