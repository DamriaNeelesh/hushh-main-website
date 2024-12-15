import { Container, Box, VStack, Heading, Text } from "@chakra-ui/react";
import NextImage from "next/image";
import React from "react";
import MarketIcon from "../svg/marketIcon";
import extendedTheme from "../../theme";
import TransparentLock from "../svg/transparetLock";
import BoltIcon from "../svg/boltIcon";
import ReceiptRadar from '../svg/receiptRadar.svg';

const HushhCoinUiBox = () => {
  
  return (
    <>
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
          <NextImage src={ReceiptRadar} alt="receiptRadar" />
        </Box>
        <VStack
          alignItems={{ base: "center", md: "flex-start" }}
          maxW={{ base: "100%", md: "50%" }}
          textAlign={{ base: "center", md: "left" }}
        >
          <Heading
            as={"h2"}
            className="color-gradient"
            fontWeight={600}
            letterSpacing={"0.25rem"}
            fontSize={"1rem"}
          >
            INTRODUCING RECEIPT RADAR
          </Heading>{" "}
          <Box
            maxWidth={{ base: "100%", md: "40%" }}
            display={{ base: "flex", md: "none" }}
            mb={{ base: "2rem" }}
          >
            <NextImage src={ReceiptRadar} alt="receiptRadar" />
          </Box>
          <Text
            className="gradient"
            fontWeight="700"
            fontSize={{ md: "3.75rem", base: "1.25rem" }}
          >
            Effortless Receipt Management
          </Text>
          <Text
            color={extendedTheme.colors.secondary}
            lineHeight={{ base: "18px", md: "36px" }}
            mt={{ base: "1rem", md: "2rem" }}
          >
            Receipt Radar revolutionizes the way you handle receipts. With
            automatic scanning, smart categorization, and customizable options,
            managing expenses becomes a breeze. Simplify your life and take
            control of your finances with Receipt Radar today!{" "}
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
              <Box>
                <MarketIcon />
              </Box>
              <VStack
                textAlign={"left"}
                alignItems={"flex-start"}
                lineHeight={"1rem"}
              >
                <Text fontWeight={"700"}>Automatic Scanning</Text>
                <Text fontWeight={"400"} fontSize={"0.75rem"}>
                  Scan your email inbox for receipts and invoices automatically,
                  saving time.
                </Text>
              </VStack>
            </Box>

            <Box
              ml={{ base: "-0.5rem", md: "0" }}
              alignItems={"center"}
              textAlign={"left"}
              flexDirection={"row"}
              color={extendedTheme.colors._white}
              display="flex"
              gap={{ md: "1.55rem", base: "0.55rem" }}
            >
              <Box ml={"-0.5rem"} display={{ md: "block", base: "none" }}>
                <BoltIcon />
              </Box>
              <Box display={{ md: "none", base: "block" }}>
                <BoltIcon />
              </Box>
              <VStack
                textAlign={"left"}
                ml={{ md: "-1rem" }}
                alignItems={"flex-start"}
                lineHeight={"1rem"}
              >
                <Text fontWeight={"700"}>Smart Categorization</Text>
                <Text fontWeight={"400"} fontSize={"0.75rem"}>
                  Organize receipts into specific digital wallet cards based on
                  rules or preferences.
                </Text>
              </VStack>
            </Box>

            <Box
              alignItems={"center"}
              textAlign={"left"}
              flexDirection={"row"}
              color={extendedTheme.colors._white}
              display="flex"
              gap={"1.25rem"}
            >
              <Box display={{ md: "block", base: "none" }}>
                {" "}
                <TransparentLock />
              </Box>
              <Box display={{ md: "none", base: "block" }}>
                {" "}
                <TransparentLock />
              </Box>
              <VStack
                textAlign={"left"}
                alignItems={"flex-start"}
                lineHeight={"1rem"}
              >
                <Text fontWeight={"700"}>Customization Options</Text>
                <Text fontWeight={"400"} fontSize={"0.75rem"}>
                  Tailor the app to fit your needs and preferences seamlessly
                </Text>
              </VStack>
            </Box>
          </VStack>
        </VStack>
      </Container>
    </>
  );
};

export default HushhCoinUiBox;
