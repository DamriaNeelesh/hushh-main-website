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
    category: "Personal Assistant",
    plans: [
      {
        name: "Basic",
        price: "Free",
        advetisment: "Ads included",
        brands: "",
        perMonth: "/mo",
        features: [["AI-powered assistance"], ["Basic query handling"]],
      },
      {
        name: "PRO",
        price: "$15",
        advetisment: "No Ads",
        brands: "",
        perMonth: "/mo",
        features: [
          [
            "Advanced AI assistance",
          ],
          ["Scheduling features", "Personalized alerts"],
        ],
      },
      {
        name: "Ultra X",
        price: "$100",
        advetisment: "No Ads",
        brands: "",
        perMonth: "/request",
        features: [
          [
            "Priority request handling",
          ],
          ["Bespoke personal assistance"],
        ],
      },
      {
        name: "Ultra Max",
        price: "$500",
        advetisment: "No Ads",
        brands: "Unlimited brands",
        perMonth: "/mo",
        features: [
          ["Dedicated personal assistant"],
          ["24/7 availability"],
        ],
      },
    ],
  },
  {
    category: "Concierge",
    plans: [
      {
        name: "Basic",
        price: "Free",
        advetisment: "Ads included",
        brands: "",
        perMonth: "/mo",
        features: [
          [
            "Access to general services",          
           ],
        ],
      },
      {
        name: "PRO",
        price: "5% transaction fee",
        advetisment: "No Ads",
        brands: "",
        perMonth: "",
        features: [
            [
              "Personalized service booking",
              "Exclusive Event Bookings"
            ],
        ],
      },
      {
        name: "Ultra X",
        price: "$100",
        advetisment: "No Ads",
        brands: "",
        perMonth: "/request",
        features: [
            [
                "Premium service bookings",
                "Tailored recommendations",
              ],
            ["Exclusive event bookings"],        
        ],
      },
      {
        name: "Ultra Max",
        price: "",
        advetisment: "No Ads",
        brands: "",
        perMonth: "",
        features: [
            ["Advanced service bookings"],
            [
                "Unlimited concierge services",
                "Global access to events and bookings",
              ],
        ],
      },
    ],
  },
  {
    category: "Luxury Marketplace",
    plans: [
      {
        name: "Basic",
        price: "Free",
        advetisment: "Ads included",
        brands: "",
        perMonth: "/mo",
        features: [["Access to marketplace"]],
      },
      {
        name: "PRO",
        price: "$100",
        advetisment: "No Ads",
        brands: "",
        perMonth: "/mo",
        features: [
          [
            "Premium listings unlocked",
          ],
          ["Special offers and deals"]
        ],
      },
      {
        name: "Ultra X",
        price: "$500",
        advetisment: "No Ads",
        brands: "",
        perMonth: "/mo",
        features: [
         [
            "Access to exclusive prodcuts",
            "Early releases",
          ],
        ],
      },
      {
        name: "Ultra Max",
        price: "$10,000",
        advetisment: "No Ads",
        brands: "",
        perMonth: "/lifetime",
        features: [
         [
            "Lifetime Membership",
          ],
          [
            "Personal shopping advisor"
          ]
        ],
      },
    ],
  },
  {
    category: "Cloud Services",
    plans: [
      {
        name: "Basic",
        price: "$0.10/GB Storage",
        advetisment: "Ads included",
        brands: "",
        perMonth: "",
        features: [
          [
            "Secure data storage",
          ],
          ["Basic backup and sync"]
        ],
      },
      {
        name: "PRO",
        price: "$50",
        advetisment: "No Ads",
        brands: "",
        perMonth: "/mo",
        features: [
          ["Enhanced security features"],
          ["More storage and bakcup options"]
        ],
      },
      {
        name: "Ultra X",
        price: "$150",
        advetisment: "No Ads",
        brands: "",
        perMonth: "/mo",
        features: [
            ["Advanced cloud solutions"],
            ["Priority support"]
        ],
      },
      {
        name: "Ultra Max",
        price: "$200",
        advetisment: "No Ads",
        brands: "",
        perMonth: "/mo +$2,000 setup",
        features: [
            ["Custom cloud infrastructure"],
            ["Managed IT services"]
        ],
      },
    ],
  },
  {
    category: "Investment Insights",
    plans: [
      {
        name: "Basic",
        price: "Free",
        advetisment: "Ads included",
        brands: "",
        perMonth: "/mo",
        features: [
          [
            "Access to basic market insights",
          ],
        ],
      },
      {
        name: "PRO",
        price: "$500",
        advetisment: "No Ads",
        brands: "",
        perMonth: "/mo",
        features: [
          [
            "In-depth analytics and reporting",
          ],
          ["Personal investment advisor"],
        ],
      },
      {
        name: "Ultra X",
        price: "Coming Soon!",
        advetisment: "No Ads",
        brands: "",
        perMonth: "/mo",
        features: [
          ["Advanced AI Capabilities"],
        ],
      },
      {
        name: "Ultra Max",
        price: "Coming Soon!",
        advetisment: "No Ads",
        brands: "",
        perMonth: "/mo",
        features: [
          ["Advanced AI Capabilities"],
          ["Customer Support and Assistance"]
        ],
      },
    ],
  },
  {
    category: "Ultra G1",
    plans: [
      {
        name: "Basic",
        price: "Free",
        advetisment: "Ads included",
        brands: "",
        perMonth: "/mo",
        features: [
            ["Coming Soon!!"],

        ],
      },
      {
        name: "PRO",
        price: "",
        advetisment: "No Ads",
        brands: "",
        perMonth: "/mo",
        features: [
            ["Coming Soon!!"],
        ],
      },
      {
        name: "Ultra X",
        price: "",
        advetisment: "No Ads",
        brands: "",
        perMonth: "/mo",
        features: [
          ["Coming Soon!!"],
        ],
      },
      {
        name: "Ultra Max",
        price: "",
        advetisment: "No Ads",
        brands: "",
        perMonth: "/mo",
        features: [
          ["Exclusive access to Ultra G1 services"],
        ],
      },
    ],
  },
  {
    category: "Luxury Experience",
    plans: [
        {
          name: "Basic",
          price: "Free",
          advetisment: "Ads included",
          brands: "",
          perMonth: "/mo",
          features: [
              ["Coming Soon!!"],
  
          ],
        },
        {
          name: "PRO",
          price: "",
          advetisment: "No Ads",
          brands: "",
          perMonth: "/mo",
          features: [
              ["Coming Soon!!"],
          ],
        },
        {
          name: "Ultra X",
          price: "",
          advetisment: "No Ads",
          brands: "",
          perMonth: "/mo",
          features: [
            ["Coming Soon!!"],
          ],
        },
        {
          name: "Ultra Max",
          price: "",
          advetisment: "No Ads",
          brands: "",
          perMonth: "/mo",
          features: [
            ["Tailored luxury experiences and travels"],
          ],
        },
      ],
  },
  {
    category: "VR Meetings & Workspace",
    plans: [
        {
          name: "Basic",
          price: "Free",
          advetisment: "Ads included",
          brands: "",
          perMonth: "/mo",
          features: [
              ["Coming Soon!!"],
  
          ],
        },
        {
          name: "PRO",
          price: "",
          advetisment: "No Ads",
          brands: "",
          perMonth: "/mo",
          features: [
              ["Coming Soon!!"],
          ],
        },
        {
          name: "Ultra X",
          price: "",
          advetisment: "No Ads",
          brands: "",
          perMonth: "/mo",
          features: [
            ["Coming Soon!!"],
          ],
        },
        {
          name: "Ultra Max",
          price: "",
          advetisment: "No Ads",
          brands: "",
          perMonth: "/mo",
          features: [
            ["Advanced virtual reality meeting spaces"],
          ],
        },
      ],
  },
  {
    category: "Affiliate Program",
    plans: [
      {
        name: "Standard Commission",
        price: "",
        advetisment: "",
        brands: "",
        perMonth: "",
        features: [
          [
            "Up to 30% on direct sales",
          ],
          ["Access to free entry tool"]
        ],
      },
      {
        name: "Elite Commission",
        price: "",
        advetisment: "",
        brands: "",
        perMonth: "",
        features: [
          [
            "Up to 50% on high--ticket items",
          ],
          ["Elite Tools"],
          ["Full Access"]
        ],
      },
    ],
  },
];

const ClientPricingPage = () => {
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
    const discountedPrice = isYearly ? yearlyPrice * 0.78 : priceNum; // Applying 22% discount if it's yearly, else use original price
    const total = Math.floor(discountedPrice); // Remove decimal part

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

       <VStack mt={{md:'2rem', base:'1rem'}} mr={{ md: "30%", base: "0" }}  ml={{ base: "1rem", md: "5.5rem" }} gap={{md:'1rem', base:'0.5rem'}}>
        <Text color={'white'} fontSize={{md:'1rem', base:'0.75rem'}} lineHeight={{ md:'30px', base:'20px'}} fontWeight={'500'}>
           Join Hushh on a journey of personal data empowerment. From free access to basic services to the ultimate luxury experiences, Hushh crafts tailored solutions for every facet of your digital life.
        </Text>
        <Box textAlign={'left'} flexDirection={'column'} justifySelf={'flex-start'} alignSelf={'flex-start'} justifyContent={'flex-start'} display={'flex'} color={'#474747'} fontSize={{ md:'1rem', base:'0.75rem'}} fontWeight={'400'} lineHeight={'21px'}>
            <Text>- Basic Tier: Suitable for new users exploring the platform</Text>
            <Text>- Pro Tier: Designed for users needing more personalized and advanced services.</Text>
            <Text>- Ultra X: Caters to individuals requiring premium, professional services.</Text>
            <Text>- Ultra Max: Offers the pinnacle of luxury and personalization with exclusive services and products.</Text>
        </Box>
      </VStack>
      </Box>

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
            p={{ md: "", base: "0.5rem" }}
            borderRadius={"8px"}
            border={"1px solid #222222"}
            minH={{ md: "4.125rem", base: "auto" }}
            w={{ md: "auto", base: "auto" }}
            justifyContent={{ md: "center", base:"space-evenly" }}
            flexWrap={{ base: "wrap" , md:'normal'}}
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
                fontSize={{ md: "15px", base: "8px" }}
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
                  columns={{ base: 2, md: 4 }}
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
                          minW={{ md: "20rem", base: "100%" }}
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
                              {plan.name}
                            </Text>
                          </Box>
                          <Text
                            fontWeight="600"
                            fontSize={{ base: "0.85rem", md: "1.75rem" }}
                            lineHeight={{ md: "38.2px", base: "28px" }}
                            mt={{ md: "1rem", base: "0.5rem" }}
                            className="planPrice"
                          >
                            {plan.price}                            {"  "}
                           <span style={{fontSize:'0.9rem'}}>{plan.perMonth}</span> 
                          </Text>
                          <Text
                            color={"#535353"}
                            lineHeight={"25.6px"}
                            fontWeight={"400"}
                            fontSize={{ md: "0.85rem", base: "0.55rem" }}
                            className="planAdvertisment"
                          >
                            {plan.advetisment}
                          </Text>
                          <Divider w={{md:'15rem', base:'100%'}} />
                          {plan.features.map((featureGroup, groupIndex) => (
                            <React.Fragment key={groupIndex}>
                              {featureGroup?.map((feature, featureIndex) => (
                                <Box
                                  display={"flex"}
                                  flexDirection={"row"}
                                  alignItems={"flex-start"}
                                  w={"80%"}
                                  justifyContent={"space-between"}
                                  textAlign={"left"}
                                >
                                  <Text
                                    key={featureIndex}
                                    lineHeight={"22px"}
                                    fontWeight={"500"}
                                    fontSize={{ md: "0.85rem", base: "0.5rem" }}
                                    // w={"70%"}
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
                                <Divider w={{md:'15rem', base:'100%'}}  />
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
                            minW={{md:"12rem", base:'5rem'}}
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
                          >
                            {plan.price === "Free"
                              ? "Start For Free"
                              : "Add Site Plan"}
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
          <Button
            fontSize={{ md: "1rem", base: "0.8rem" }}
            rightIcon={<ChevronDownIcon />}
          >
            View all plan features
          </Button>
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

export default ClientPricingPage;

  
