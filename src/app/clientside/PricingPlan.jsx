"use client";
import React, { useState } from "react";
import {
  Divider,
  List,
  ListItem,
  Switch,
} from "@chakra-ui/react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  Button,
  HStack,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import ListIconTick from "../_components/svg/icons/listIconTick";
import Image from "next/image";
import BoxImage from "../_components/svg/keyHighlightImg.svg";
import ManageFinanceBox from "../_components/svg/managefinanceBox.svg";
import PricingFaq from "../_components/features/faq/pricingFaq";
import ContactForm from "../_components/features/contactForm";
import { useMediaQuery } from "react-responsive";
import InfoIcon from "../_components/svg/icons/infoIcon.svg";
import { Tooltip } from "@chakra-ui/react";

const planData = [
  {
    category: "Vibe Search",
    plans: [
      {
        name: "BASIC",
        price: "Free",
        advetisment: "Ads included",
        freeTrial:"(Free trial for 90 days)",
        brands: "Upto 10 brands",
        perMonth: "/mo",
        features: [["Basic Search"], ["Search History", "Share your vibe"]],
      },
      {
        name: "PRO",
        price: "$9.99",
        advetisment: "No Ads",
        brands: "Upto 50 brands",
        perMonth: "/mo",
        features: [
          [
            "Basic Search",
            "Search History",
            "Share your vibe",
            "Style Profile",
            "Advance Search Filters",
          ],
          ["Unlimited Searches", "Search History"],
          ["Saved Searches"],
        ],
      },
      {
        name: "PREMIUM",
        price: "$19.99",
        advetisment: "No Ads",
        brands: "Unlimited brands",
        perMonth: "/mo",
        features: [
          [
            "Basic Search",
            "Search History",
            "Share your vibe",
            "Style Profile",
            "Advance Search Filters",
          ],
          ["Unlimited Searches", "Search History"],
          ["Saved Searches", "Customizable UI"],
        ],
      },
    ],
  },
  {
    category: "Wallet App",
    plans: [
      {
        name: "BASIC",
        price: "Free",
        advetisment: "Ads included",
        freeTrial:"(Free trial for 90 days)",
        brands: "Upto 5 cards",
        perMonth: "/mo",
        features: [
          ["Limited Sources Data Aggregation"],
          [
            "Data Card Creation",
            "Selective Data Sharing",
            "Security Standard Encryption",
          ],
          ["Basic rewards ", "Anonymization"],
        ],
      },
      {
        name: "PRO",
        price: "$9.99",
        advetisment: "No Ads",
        brands: "Upto 25 cards",
        perMonth: "/mo",
        features: [
          ["Limited Sources Data Aggregation"],
          [
            "Data Card Creation",
            "Selective Data Sharing",
            "Security Standard Encryption",
          ],
          ["Advanced rewards", "Anonymization"],
        ],
      },
      {
        name: "PREMIUM",
        price: "$19.99",
        advetisment: "No Ads",
        brands: "Upto 25 cards",
        perMonth: "/mo",
        features: [
          ["Limited Sources Data Aggregation"],
          [
            "Data Card Creation",
            "Selective Data Sharing",
            "Security Standard Encryption",
          ],
          [
            "Advanced rewards",
            "Anonymization",
            "Data Backup",
            "Customizable Privacy Settings",
          ],
        ],
      },
    ],
  },
  {
    category: "Valet Chat",
    plans: [
      {
        name: "BASIC",
        price: "Free",
        advetisment: "Ads included",
        freeTrial:"(Free trial for 90 days)",
        brands: "Reciept Import",
        perMonth: "/mo",
        features: [["Categorization", "Conversational AI"]],
      },
      {
        name: "PRO",
        price: "$9.99",
        advetisment: "No Ads",
        brands: "Reciept Import",
        perMonth: "/mo",
        features: [
          [
            "Categorization",
            "Conversational AI",
            "Multimedia Sharing",
            "Export Options",
          ],
        ],
      },
      {
        name: "PREMIUM",
        price: "$19.99",
        advetisment: "No Ads",
        brands: "Reciept Import",
        perMonth: "/mo",
        features: [
          [
            "Categorization",
            "Conversational AI",
            "Multimedia Sharing",
            "Export Options"],[
            "Customizable Themes",
            "Chat Backup",
          ],
        ],
      },
    ],
  },
  // {
  //   category: "Concierge App",
  //   plans: [
  //     {
  //       name: "BASIC",
  //       price: "Free",
  //       advetisment: "Ads included",
  //       freeTrial:"(Free trial for 90 days)",
  //       brands: "Request Format",
  //       perMonth: "/mo",
  //       features: [
  //         [
  //           "Response Speed",
  //           "Service Provider Choice",
  //           "Basic Assistance",
  //           "Request Anonymity Level",
  //         ],
  //       ],
  //     },
  //     {
  //       name: "PRO",
  //       price: "$9.99",
  //       advetisment: "No Ads",
  //       brands: "Request Format",
  //       perMonth: "/mo",
  //       features: [
  //         [
  //           "Response Speed",
  //           "Service Provider Choice",
  //           "Basic Assistance",
  //           "Request Anonymity Level",
  //         ],
  //         ["Advanced AI Capabilities"],
  //       ],
  //     },
  //     {
  //       name: "PREMIUM",
  //       price: "$19.99",
  //       advetisment: "No Ads",
  //       brands: "Request Format",
  //       perMonth: "/mo",
  //       features: [
  //         [
  //           "Response Speed",
  //           "Service Provider Choice",
  //           "Basic Assistance",
  //           "Request Anonymity Level",
  //         ],
  //         ["Advanced AI Capabilities"],
  //       ],
  //     },
  //   ],
  // },
  {
    category: "Browser Companion",
    plans: [
      {
        name: "BASIC",
        price: "Free",
        advetisment: "Ads included",
        freeTrial:"(Free trial for 90 days)",
        brands: "Request Format",
        perMonth: "/mo",
        features: [
          [
            "Response Speed",
            "Service Provider Choice",
            "Basic Assistance",
            "Request Anonymity Level",
          ],
        ],
      },
      {
        name: "PRO",
        price: "$9.99",
        advetisment: "No Ads",
        brands: "Request Format",
        perMonth: "/mo",
        features: [
          [
            "Response Speed",
            "Service Provider Choice",
            "Basic Assistance",
            "Request Anonymity Level",
          ],
          ["Advanced AI Capabilities"],
        ],
      },
      {
        name: "PREMIUM",
        price: "$19.99",
        advetisment: "No Ads",
        brands: "Request Format",
        perMonth: "/mo",
        features: [
          [
            "Response Speed",
            "Service Provider Choice",
            "Basic Assistance",
            "Request Anonymity Level",
          ],
          ["Advanced AI Capabilities"],
        ],
      },
    ],
  },
];

const workspacePlansData = [
  {
    category: "Luxury App Agent",
    plans: [
      {
        name: "BASIC",
        price: "Free",
        advetisment: "Ads included",
        freeTrial:"(Free trial for 90 days)",
        brands: "Basic Data Access",
        perMonth: "/mo",
        features: [["Advanced Data Insights"], ["User Targeting Options", "Data Card Sharing","Commision Structure"],["Brand Reputation Tools","Campaign Management"]],
      },
      {
        name: "PRO",
        price: "$9.99",
        advetisment: "Ads included",
        brands: "Basic Data Access",
        perMonth: "/mo",
        features: [["Advanced Data Insights"], ["User Targeting Options", "Data Card Sharing","Commision Structure"],["Brand Reputation Tools","Campaign Management"]],
      },
      {
        name: "PREMIUM",
        price: "$19.99",
        advetisment: "Ads Free",
        brands: "Basic Data Access",
        perMonth: "/mo",
        features: [["Advanced Data Insights"], ["User Targeting Options", "Data Card Sharing","Commision Structure"],["Brand Reputation Tools","Campaign Management"],["Brand Interaction Analytics","Customizable Reporting"]],
      },
    ],
  },
  {
    category: "Vibe Search API",
    plans: [
      {
        name: "BASIC",
        price: "Free",
        advetisment: "Ads included",
        freeTrial:"(Free trial for 90 days)",
        brands: "Basic Integration",
        perMonth: "/mo",
        features: [
          ["Maximum Products Indexed"],
          [
            "API Calls per month",
            "Response Time",
            "Recommendation Types",
          ]
        ],
      },
      {
        name: "PRO",
        price: "$9.99",
        advetisment: "No Ads",
        brands: "Basic Integration",
        perMonth: "/mo",
        features: [
          ["Maximum Products Indexed"],
          [
            "API Calls per month",
            "Response Time",
            "Recommendation Types",
          ],
          ["Customer Data Integration", "Customizable Search Filters"],
        ],
      },
      {
        name: "PREMIUM",
        price: "$19.99",
        advetisment: "No Ads",
        brands: "Advanced Integration",
        perMonth: "/mo",
        features: [
          ["Maximum Products Indexed"],
          [
            "API Calls per month",
            "Response Time",
            "Recommendation Types",
          ],
          ["Customer Data Integration", "Customizable Search Filters"],
          [
            "Enhanced Search Analytics",
          ],
        ],
      },
    ],
  },
  {
    category: "Agent Concierge App",
    plans: [
      {
        name: "BASIC",
        price: "Free",
        advetisment: "Ads included",
        freeTrial:"(Free trial for 90 days)",
        brands: "Maximum Service Categories",
        perMonth: "/mo",
        features: [["Client Matching"],["Lead Volume","Hushh Coin Commision","Recommendation Types"]],
      },
      {
        name: "PRO",
        price: "$9.99",
        advetisment: "No Ads",
        brands: "Maximum Service Categories",
        perMonth: "/mo",
        features: [["Client Matching"],["Lead Volume","Hushh Coin Commision","Recommendation Types"],["Client Match Radius","Featured Agent Listing"]],
      },
      {
        name: "PREMIUM",
        price: "$19.99",
        advetisment: "No Ads",
        brands: "Reciept Import",
        perMonth: "/mo",
        features: [["Client Matching"],["Lead Volume","Hushh Coin Commision","Recommendation Types"],["Client Match Radius","Featured Agent Listing"],["Advanced AI Capabilities"]],
      },
    ],
  },
];

const ClientPricingPlan = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [activeAccordionIndex, setActiveAccordionIndex] = useState(-1);
  const [isYearly, setIsYearly] = useState(false);
  const [isMonthly, setIsMonthly] = useState(true);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const [activePlanCategory, setActivePlanCategory] = useState("site"); // 'site' or 'workspace'

  const handleTabsChange = (index) => {
    setTabIndex(index);
    setActiveAccordionIndex(index);
  };

  const handleSwitchChange = () => {
    setIsYearly(!isYearly); // toggle the state on each click
    setIsMonthly(false);
  };

  const handlePlanCategoryChange = (category) => {
    setActivePlanCategory(category);
    setTabIndex(0);
  };

  const renderPrice = (price, perMonth) => {
    if (price === "Free") return "Free"; // If price is "Free", return "Free"

    const priceNum = parseFloat(price.replace("$", ""));
    const yearlyPrice = isYearly ? priceNum * 12 : priceNum;
    const discountedPrice = isYearly ? yearlyPrice * 0.78 : priceNum.toFixed(2); // Applying 22% discount if it's yearly, else use original price
    const total = isYearly ? Math.floor(discountedPrice) : discountedPrice ; // Remove decimal part

    // Change perMonth text based on yearly toggle
    const durationText = isYearly ? "/yr" : perMonth;
    return `$${total}`; // Total price with updated duration text
  };

  const yearlyTextStyles = isYearly ? { color: "white" } : { color: "#717171" };
  const monthlyTextStyles = !isYearly
    ? { color: "white" }
    : { color: "#717171" };

  return (
    <>
      <Box p={{ base: 4, md: 8 }}>
        <VStack
          ml={{ base: "1rem", md: "5.5rem" }}
          spacing={2}
          mt={{ md: "8rem", base: "5rem" }}
          mr={{ md: "50%", base: "0" }}
        >
          <Heading
            lineHeight={"32px"}
            display={"flex"}
            alignSelf={"flex-start"}
            textAlign={"left"}
            as={"h1"}
            color={"#FFFFFF"}
            fontSize={{ base: "0.85rem", md: "1.25rem" }}
            letterSpacing={"0.04rem"}
            fontWeight="500"
          >
            Pricing
          </Heading>
          <Heading
            as={"h2"}
            lineHeight={{ md: "90.28px", base: "40px" }}
            className="gradient"
            fontSize={{ base: "2.5rem", md: "4.625rem" }}
            fontWeight="700"
            alignSelf={"flex-start"}
            textAlign={"left"}
          >
            Find the right plan for your needs
          </Heading>
        </VStack>
      </Box>

      <Box
        gap={{ base: "1rem", md: "0" }}
        mb={{ md: "1rem", base: "0.2rem" }}
        mt={{ md: "5rem", base: "2rem" }}
        px={{ md: "7.5rem", base: "1.5rem" }}
        alignItems={{ md: "center" }}
        justifyContent="space-evenly"
        align={"center"}
        alignSelf={"center"}
        alignContent={"center"}
        w={"100%"}
        display={"flex"}
      >
        <Box
          cursor={"pointer"}
          onClick={() => handlePlanCategoryChange("site")}
          gap={"0.5rem"}
          textAlign={"left"}
          flex={1}
          color={activePlanCategory === "site" ? "#FFFFFF" : "#5A5A5A"}
          display={"flex"}
          flexDirection={"column"}
        >
          <Text
            fontWeight={"500"}
            fontSize={{ md: "1rem", base: "0.7rem" }}
            lineHeight={"19.5px"}
            letterSpacing={"1.5px"}
            w={'100%'}
          >
            USER PLANS
          </Text>
          <Text
            fontWeight={"600"}
            fontSize={{ md: "1.5rem", base: "0.75rem" }}
            lineHeight={{ md: "30px", base: "20px" }}
          >
            Build, publish, and host with ease
          </Text>
        </Box>
        <Box
          cursor={"pointer"}
          onClick={() => handlePlanCategoryChange("workspace")}
          gap={"0.5rem"}
          textAlign={"left"}
          flex={1}
          color={activePlanCategory === "workspace" ? "#FFFFFF" : "#5A5A5A"}
          display={"flex"}
          flexDirection={"column"}
        >
          <Text
            fontWeight={"500"}
            fontSize={{ md: "1rem", base: "0.7rem" }}
            letterSpacing={"1.5px"}
          >
            PROFESSIONAL PLANS
          </Text>
          <Text
            fontWeight={"600"}
            fontSize={{ md: "1.5rem", base: "0.75rem" }}
            lineHeight={{ md: "30px", base: "20px" }}
          >
            Add a team and stage multiple sites
          </Text>
        </Box>
      </Box>
      <Box
        display={"flex"}
        mt={{ md: "1rem", base: "0.5rem" }}
        px={{ md: "7.5rem", base: "1.5rem" }}
      >
        <Divider
          borderStyle={"solid"}
          borderWidth={"2px"}
          borderColor={activePlanCategory === "site" ? "#146EF5" : "#5A5A5A"}
        />
        <Divider
          borderStyle={"solid"}
          borderWidth={"2px"}
          borderColor={
            activePlanCategory === "workspace" ? "#146EF5" : "#5A5A5A"
          }
        />
      </Box>

      <VStack
        mt={{ md: "7em", base: "2.5rem" }}
        textAlign={"left"}
        alignItems={"flex-start"}
        mx={{ md: "7.2rem" }}
        display={{ md: "flex", base: "none" }}
        flexDirection={{ base: "column", md: "column" }}
      >
        <Text
          mb={{ md: "1.5rem", base: "0.75rem" }}
          className="gradient"
          fontWeight={"600"}
          lineHeight={{ md: "52px", base: "35px" }}
          fontSize={{ md: "3.5rem", base: "2rem" }}
          letterSpacing={"0.56px"}
        >
          {activePlanCategory === "site" ? "User plans" : "Professional plans"}
        </Text>
        <HStack gap={{ md: "20rem", base: "4rem" }}>
          <Text
            w={{ md: "50%", base: "100%" }}
            lineHeight={"30px"}
            color={"#FFFFFF"}
            fontWeight={"500"}
            fontSize={{ md: "1rem", base: "0.8rem" }}
          >
            {activePlanCategory === "site"
              ? "Our user plans provide easy 1-click publishing and hosting, right from inside our powerful visual designer"
              : "Our professional plans provide easy 1-click publishing and hosting, right from inside our powerful visual designer"}
          </Text>
          <VStack>
            <Box
              lineHeight={"22px"}
              fontSize={{ md: "1rem", base: "0.8rem" }}
              display={"flex"}
              flexDirection={"row"}
              gap={"1rem"}
            >
              <Text color={"#717171"} style={monthlyTextStyles}>
                Billed monthly
              </Text>
              <Switch size="lg" onChange={handleSwitchChange} />
              <Text color="#717171" style={yearlyTextStyles}>
                Billed yearly
              </Text>
            </Box>
            <Text
              fontWeight={"400"}
              style={yearlyTextStyles}
              fontSize={"0.85rem"}
              lineHeight={"22px"}
            >
              (Save up to 22%)
            </Text>
          </VStack>
        </HStack>
      </VStack>

      <HStack
        mt={{ md: "7em", base: "2.5rem" }}
        textAlign={{ md: "center", base: "center" }}
        alignItems={{ md: "flex-start" }}
        display={{ base: "flex", md: "none" }}
        flexDirection={{ base: "column", md: "column" }}
      >
        <Text
          mb={{ md: "1.5rem", base: "0" }}
          className="gradient"
          fontWeight={"600"}
          lineHeight={{ md: "52px", base: "35px" }}
          fontSize={{ md: "3.5rem", base: "2rem" }}
          letterSpacing={"0.56px"}
        >
          {activePlanCategory === "site" ? "USER PLANS" : "PROFESSIONAL PLANS"}
        </Text>
        <VStack mx={'0.2rem'} gap={{ md: "20rem", base: "4rem" }}>
          <Text
            w={"100%"}
            lineHeight={{ md: "30px", base: "13px" }}
            color={"#FFFFFF"}
            fontWeight={"500"}
            fontSize={{ md: "1rem", base: "0.5rem" }}
          >
            {activePlanCategory === "site"
              ? "Our user plans provide easy 1-click publishing and hosting, right from inside our powerful visual designer"
              : "Our professional plans provide easy 1-click publishing and hosting, right from inside our powerful visual designer"}
          </Text>
          <VStack>
            <Box
              lineHeight={"22px"}
              fontSize={{ md: "1rem", base: "0.8rem" }}
              display={"flex"}
              flexDirection={"row"}
              gap={"1rem"}
              mt={{ base: "-2rem", md: "0" }}
            >
              <Text color={"#717171"} style={monthlyTextStyles}>
                Billed monthly
              </Text>
              <Switch size="lg" onChange={handleSwitchChange} />
              <Text color="#717171" style={yearlyTextStyles}>
                Billed yearly
              </Text>
            </Box>
            <Text
              fontWeight={"400"}
              style={yearlyTextStyles}
              fontSize={"0.85rem"}
              lineHeight={"22px"}
            >
              (Save up to 22%)
            </Text>
          </VStack>
        </VStack>
      </HStack>

      <Box
        minW={"100%"}
        display={"flex"}
        textAlign={"left"}
        alignItems={{ md: "center", base: "center" }}
        flexDirection={"column"}
      >
        <Tabs
          onChange={handleTabsChange}
          position="relative"
          variant="unstyled"
          mt={8}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
        >
          <TabList
            p={{ md: "0.5rem", base: "0.5rem" }}
            borderRadius={"8px"}
            border={"1px solid #222222"}
            minH={{ md: "4.125rem", base: "auto" }}
            w={{ md: "52%", base: "auto" }}
            justifyContent={{ md: "space-between", base: "flex-start" }}
            flexWrap={{ base: "wrap" }}
          >
            {(activePlanCategory === "site"
              ? planData
              : workspacePlansData
            ).map((category, index) => (
              <Tab
                key={index}
                _selected={{
                  color: "white",
                  bg: "#363636",
                  borderRadius: "4px",
                }}
                color={"#898989"}
                lineHeight={{ md: "22px", base: "14px" }}
                fontWeight={"600"}
                fontSize={{ md: "15px", base: "10px" }}
                mr={{ base: "2", md: "0" }}
              >
                {category.category}
              </Tab>
            ))}
          </TabList>

          <TabPanels mt={"2rem"}>
            {(activePlanCategory === "site"
              ? planData
              : workspacePlansData
            ).map((category, index) => (
              <TabPanel key={index}>
                <SimpleGrid
                  mx={{ md: "10rem", base: "0" }}
                  columns={{ base: 1, md: 3 }}
                  gap={{ md: "4rem", base: "1rem" }}
                >
                  {category.plans.map((plan, idx) => (
                    <>
                      <Box
                        bg={"#131414"}
                        display={"flex"}
                        textAlign={"center"}
                        alignItems={"center"}
                        borderRadius={"4px"}
                        flexDirection={"column"}
                        className="plan"
                      >
                        <Box
                          flex={1}
                          display={"flex"}
                          textAlign={"center"}
                          alignItems={"center"}
                          flexDirection={"column"}
                          minW={isTabletOrMobile ? '100%' : '20rem'}
                          gap={{ md: "1rem", base: "0.5rem" }}
                          justifyContent={"flex-start"}
                          borderRadius={"2rem"}
                          p={{ md: "1.5rem", base: "1rem" }}
                          key={idx}
                          color={"white"}
                          height={"100%"}
                        >
                          <Box
                            bg={"#146EF5"}
                            w={{ md: "max-content" }}
                            borderRadius={"4px"}
                            className="planName"
                          >
                            <Text
                              px={{ md: "1rem", base: "0.5rem" }}
                              py={{ md: "0.5rem", base: "0.2rem" }}
                              fontWeight="600"
                              lineHeight={"20px"}
                              fontSize={{ md: "0.875rem", base: "0.5rem" }}
                            >
                              {/* I want this plan name box to be black in color and white in bg when in hovering condition */}
                              {plan.name}
                            </Text>
                          </Box>
                          <Text
                            fontWeight="600"
                            fontSize={{ base: "2xl", md: "4xl",lg:"5xl" }}
                            lineHeight={{ md: "79.2px", base: "40px" }}
                            mt={{ md: "1rem", base: "0.5rem" }}
                            className="planPrice"
                          >
                            {renderPrice(plan.price)}
                            {"  "}
                            {plan.perMonth && !isTabletOrMobile && (
                              <span
                                style={{
                                  color: "white",
                                  marginLeft: "-0.75rem",
                                  fontWeight: "600",
                                  fontSize: "1.25rem",
                                }}
                              >
                                {plan.perMonth && (isYearly ? " /yr" : " /mo")}
                              </span>
                            )}
                            {plan.perMonth && isTabletOrMobile && (
                              <span
                                style={{
                                  color: "white",
                                  fontWeight: "600",
                                  fontSize: "1rem",
                                }}
                              >
                                {plan.perMonth && (isYearly ? " /yr" : " /mo")}
                              </span>
                            )}
                          </Text>
                            <Text
                            color={"white"}
                            lineHeight={"25.6px"}
                            fontWeight={"500"}
                            fontSize={{ md: "1rem", base: "0.65rem" }}
                            // className="planAdvertisment"
                          >
                            {plan?.freeTrial}
                          </Text>
                          <Text
                            color={"#535353"}
                            lineHeight={"25.6px"}
                            fontWeight={"400"}
                            fontSize={{ md: "1rem", base: "0.65rem" }}
                            className="planAdvertisment"
                          >
                            {plan.advetisment}
                          </Text>
                          <Divider p={0} />
                          <Text
                            lineHeight={{ md: "28px", base: "18px" }}
                            fontWeight={"400"}
                            fontSize={{ md: "1rem", base: "0.65rem" }}
                            className="planBrands"
                          >
                            {plan.brands}
                          </Text>
                          <Divider />
                          {plan.features.map((featureGroup, groupIndex) => (
                            <React.Fragment key={groupIndex}>
                              {featureGroup?.map((feature, featureIndex) => (
                                <Box
                                  display={"flex"}
                                  flexDirection={"row"}
                                  alignItems={"flex-start"}
                                  w={"100%"}
                                  justifyContent={{ base:"space-between"}}
                                  textAlign={"left"}
                                >
                                  <Text
                                    key={featureIndex}
                                    lineHeight={"22px"}
                                    fontWeight={"500"}
                                    fontSize={{ md: "1rem", base: "0.75rem" }}
                                    w={"70%"}
                                    className="planFeatures"
                                  >
                                    {feature}
                                  </Text>
                                  <Box display={"flex"} alignItems={"flex-end"}>
                                  <Tooltip hasArrow label='Advanced rewards (early access, exclusive offers)' bg='#FFFFFF' borderRadius={'8px'} color='#000000'>
                                    <Image src={InfoIcon} alt="InfoIcon" />
                                  </Tooltip>  
                                  </Box>
                                </Box>
                              ))}
                              {groupIndex < plan.features.length - 1 && (
                                <Divider />
                              )}
                            </React.Fragment>
                          ))}
                        </Box>
                        <Box
                          my={{ md: "2rem", base: "1rem" }}
                          display={"flex"}
                          alignItems={"flex-end"}
                        >
                          <Button
                            minW={isTabletOrMobile ? "full" : "15rem"}
                            bg={"#146EF5"}
                            color={"white"}
                            borderRadius={"4px"}
                            fontWeight={"600"}
                            className="planButton"  
                            fontSize={{ md: "1rem", base: "0.6rem" }}
                            _hover={{
                              color: "black",
                              bg: "white",
                            }}
                            onClick={() =>
                              window.open("/contact-us", "_blank")
                            }
                          >
                            {plan.price === "Free"
                              ? "Contact Us"
                              : "Coming Soon!"}
                          </Button>
                        </Box>
                      </Box>
                    </>
                  ))}
                </SimpleGrid>
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
        <Box
          mt={{ base: "0.5rem", md: "1rem" }}
          gap={{ md: "2rem", base: "1rem" }}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          textAlign={"center"}
          alignSelf={"center"}
        >
          <Text
            color={"white"}
            fontWeight={"500"}
            fontSize={{ md: "1rem", base: "0.75rem" }}
            lineHeight={{ md: "36px", base: "20px" }}
          >
            All prices are in USD and charged per site with applicable taxes
            added at checkout
          </Text>
          {/* <Button
            fontSize={{ md: "1rem", base: "0.8rem" }}
            rightIcon={<ChevronDownIcon />}
          >
            View all plan features
          </Button> */}
        </Box>
      </Box>

      <Box
        mx={{ md: "6rem", base: "0" }}
        mb={"1rem"}
        bg={"#131414"}
        gap={{ md: "5rem", base: "1rem" }}
        minW={{ md: "85%", base: "100%" }}
        mt={{ md: "6rem", base: "4rem" }}
        display={"flex"}
        flexDirection={"row"}
      >
        <VStack
          ml={{ md: "2rem", base: "0" }}
          mx={{ base: "1rem" }}
          gap={{ md: "1rem", base: "0rem" }}
          textAlign={"left"}
          alignItems={"flex-start"}
          my={{ md: "4rem", base: "2rem" }}
        >
          <Text
            className="color-gradient"
            fontWeight={"600"}
            fontSize={{ md: "1rem", base: "1rem" }}
            lineHeight={"1rem"}
            letterSpacing={"0.255"}
          >
            HUSHH
          </Text>
          <Text
            className="gradient"
            fontSize={{ md: "3.75rem", base: "2rem" }}
            fontWeight={"600"}
            lineHeight={{ md: "63.65px", base: "45px" }}
          >
            Key Highlights
          </Text>
          <VStack
            display={{ md: "none", base: "block" }}
            alignItems={"center"}
            justify={"center"}
            align={"center"}
            alignSelf={"center"}
          >
            <Image
              src={BoxImage}
              alt="BoxImageHighlight"
              style={{ width: "100%", height: "100%" }}
            />
          </VStack>
          <List spacing={{ md: 10, base: 5 }} color={"white"} mt={"1rem"}>
            <ListItem display={"flex"}>
              <Box pr={{ md: "1rem", base: "0.5rem" }}>
                <ListIconTick />
              </Box>
              <VStack textAlign={"left"}>
                <Text
                  alignContent={"flex-start"}
                  align={"flex-start"}
                  alignSelf={"flex-start"}
                  alignItems={"flex-start"}
                  display={"flex"}
                  flexDirection={"row"}
                  fontWeight={"700"}
                  fontSize={{ md: "1.5rem", base: "1rem" }}
                  lineHeight={{ md: "32px", base: "32px" }}
                >
                  Simplicity & Transparency
                </Text>
                <Text
                  fontWeight={"500"}
                  fontSize={{ md: "1rem", base: "0.65rem" }}
                  lineHeight={{ md: "30px", base: "20px" }}
                >
                  Pricing is designed to be straightforward across all services,
                  ensuring users can easily select the tools that best fit their
                  needs without encountering hidden fees.
                </Text>
              </VStack>
            </ListItem>
            <ListItem display={"flex"}>
              <Box pr={{ md: "1rem", base: "0.5rem" }}>
                <ListIconTick />
              </Box>
              <VStack textAlign={"left"}>
                <Text
                  alignContent={"flex-start"}
                  align={"flex-start"}
                  alignSelf={"flex-start"}
                  alignItems={"flex-start"}
                  display={"flex"}
                  flexDirection={"row"}
                  fontWeight={"700"}
                  fontSize={{ md: "1.5rem", base: "1rem" }}
                  lineHeight={"32px"}
                >
                  Scalable Solutions
                </Text>
                <Text
                  fontWeight={"500"}
                  fontSize={{ md: "1rem", base: "0.65rem" }}
                  lineHeight={{ md: "30px", base: "20px" }}
                >
                  From free basic access to premium options, services are built
                  to scale with the growth of individuals & businesses, ensuring
                  long-term support
                </Text>
              </VStack>
            </ListItem>
            <ListItem display={"flex"}>
              <Box pr={{ md: "1rem", base: "0.5rem" }}>
                <ListIconTick />
              </Box>
              <VStack textAlign={"left"}>
                <Text
                  alignContent={"flex-start"}
                  align={"flex-start"}
                  alignSelf={"flex-start"}
                  alignItems={"flex-start"}
                  display={"flex"}
                  flexDirection={"row"}
                  fontWeight={"700"}
                  fontSize={{ md: "1.5rem", base: "1rem" }}
                  lineHeight={"32px"}
                >
                  Community Focus
                </Text>
                <Text
                  fontWeight={"500"}
                  fontSize={{ md: "1rem", base: "0.65rem" }}
                  lineHeight={{ md: "30px", base: "20px" }}
                >
                  Beyond the tools and platforms, Hushh fosters a community for
                  support, learning, and collaboration, enhancing the value of
                  every subscription.
                </Text>
              </VStack>
            </ListItem>
          </List>
        </VStack>
        <VStack
          display={{ md: "flex", base: "none" }}
          alignContent={"flex-end"}
          alignItems={"flex-end"}
          alignSelf={"flex-end"}
          w={"100%"}
          h={"80%"}
        >
          <Image src={BoxImage} alt="BoxImageHighlight" />
        </VStack>
      </Box>

      <HStack
        my={{ md: "8rem", base: "3rem" }}
        px={{ md: "7rem", base: "1.25rem" }}
        display={{ base: "flex" }}
        gap={{ md: "7rem" }}
        flexDirection={{ base: "column", md: "row" }}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          gap={{ md: "1rem", base: "0.5rem" }}
          flex={1}
        >
          <Text
            className="default-gradient"
            letterSpacing={"0.255rem"}
            lineHeight={{ md: "1rem", base: "20px" }}
            fontWeight={"600"}
            fontSize={{ md: "1rem", base: "0.75rem" }}
          >
            HUSHH
          </Text>
          <Text
            className="gradient"
            fontSize={{ md: "3.75rem", base: "1.75rem" }}
            fontWeight={"600"}
            lineHeight={{ md: "63.3px", base: "41.2px" }}
          >
            Final Takeaway
          </Text>
          <Box
            display={"flex"}
            flexDirection={"column"}
            gap={{ md: "1rem", base: "0rem" }}
          >
            <Text
              fontSize={{ md: "1rem", base: "0.8rem" }}
              fontWeight={"500"}
              color={"#ABABAB"}
              lineHeight={{ md: "36px", base: "25px" }}
            >
              Hushh’s diverse pricing strategy aims to democratize access to
              powerful data and AI tools, making them accessible to a wide
              audience. Whether you’re a consumer trusting us with your data, a
              developer building the next big app, a sales agent aiming for your
              next target, or a creator curating unique experiences, Hushh
              provides the tools, support, and platform to achieve your goals.
              With Hushh, embrace a smarter, more secure, and personalized
              digital future.
            </Text>
          </Box>
        </Box>
        <Box
          my={{ base: "1rem" }}
          display={"flex"}
          flexDirection={"column"}
          flex={1}
          gap={"1rem"}
        >
          <Image src={ManageFinanceBox} alt="ManageFinanceBox" />
          <Text
            fontSize={{ md: "1rem", base: "0.75rem" }}
            color={"#ABABAB"}
            lineHeight={{ md: "36px", base: "18px" }}
          >
            This summary aims to convey Hushh’s commitment to delivering value
            through innovative, user-centric products and services, ensuring
            clear communication of pricing and offerings to foster trust and
            loyalty across all user segments.
          </Text>
        </Box>
      </HStack>
      <PricingFaq />
      <ContactForm />
    </>
  );
};

export default ClientPricingPlan;
