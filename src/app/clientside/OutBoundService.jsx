"use client";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionIcon,
  AccordionPanel,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  HStack,
  Heading,
  ListItem,
  Stack,
  Text,
  UnorderedList,
  VStack,
  border,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  useBreakpointValue,
} from "@chakra-ui/react";
import Image from "next/image";
import React, { useState } from "react";
import OutBoundServiceImg from "../_components/svg/outBoundService/outboundServiceImg.svg";
import { ServiceCard } from "../_components/primitives/serviceCard";
import PaperPlane from "../_components/svg/conciergeApp/paperPlanImage.svg";
import { FiFlag } from "react-icons/fi";
import ChartIcon from "../_components/svg/outBoundService/chartLogoIcon.svg";
import ConsultationIcon from "../_components/svg/outBoundService/consultationIcon.svg";
import DualDirection from "../_components/svg/outBoundService/dualDirection.svg";
import FeedbackIcon from "../_components/svg/outBoundService/feedbackoundIcon.svg";
import ContactForm from "../_components/features/contactForm";
import One from "../_components/svg/outBoundService/one.svg";
import Two from "../_components/svg/outBoundService/two.svg";
import Three from "../_components/svg/outBoundService/three.svg";
import Four from "../_components/svg/outBoundService/four.svg";
import TrustedAIIcon from "../_components/svg/trustedAI";
import ControlOver from "../_components/svg/controlOver";
import TechIntegrationIcon from "../_components/svg/techIntegration";
import RedifiningIcon from "../_components/svg/redifiningIcon";
import TransparentSecureIcon from "../_components/svg/tranparentSecure";
import Manish from "../../../public/Images/manish.png";
import Justin from "../../../public/Images/justin.png";
import TwitterIcon from "../_components/svg/icons/twitterIcon.svg";
import SkypeIcon from "../_components/svg/icons/skypeIcon.svg";
import LinkedInIcon from "../_components/svg/icons/linkedinIcon.svg";
import { useRouter } from "next/navigation";
import Shadow from "../_components/svg/outBoundService/shadowOutBound.svg";
import { useMediaQuery } from "react-responsive";
import SeasonedSvg from "../_components/svg/outBoundService/seasonedProfessional.svg";
import BgShadow from "../_components/svg/outBoundService/bgShadow.svg";
import DivideLine from "../_components/svg/outBoundService/Line 233.svg";
import OutboundFaq from '../_components/features/faq/outboundFaq';
import HeaderBG from "../_components/svg/hushhCommunity/headerBG.svg";

const categories = {
  "AI Infrastructure": [
    "Designing scalable AI systems",
    "Optimizing AI processing pipelines",
    "Selecting and implementing AI hardware solutions"
  ],
  "Machine Learning and Deep Learning": [
    "Developing custom ML/DL models",
    "Implementing transfer learning techniques",
    "Fine-tuning pre-trained models for specific use cases"
  ],
  "Large Language Models (LLMs) and Small Language Models (SLMs)": [
    "Integrating LLMs/SLMs into existing systems",
    "Customizing language models for domain-specific applications",
    "Optimizing inference performance"
  ],
  "Data Architecture": [
    "Designing robust data pipeliness",
    "Implementing data lakes and data warehouses",
    "Ensuring data quality and governance"
  ],
  "Data Science": [
    "Developing data-driven strategies",
    "Implementing advanced analytics solutions",
    "Creating insightful data visualizations"
  ],
  "AI Hardware Selection": [
    "Evaluating GPUs, TPUs, and specialized AI chips",
    "Optimizing hardware configurations for specific AI workloads",
    "Cost-benefit analysis of different AI hardware options"
  ],
  "Product Leadership in AI/ML": [
    "Developing AI-driven product strategies",
    "Managing AI product life cycles",
    "Aligning AI capabilities with business objectives"
  ]
};

const OutBoundService = () => {
  const [activeCategory, setActiveCategory] = useState("AI Infrastructure");
  const router = useRouter();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  // const {
  //   isOpen: isWalletOpen,
  //   onOpen: onWalletOpen,
  //   onClose: onWalletClose,
  // } = useDisclosure();

  // const modalSize = useBreakpointValue({ base: "sm", md: "md" });

  const scrollToStart = () => {
    window.scrollTo({
      top: document.getElementById("howItworks").offsetTop,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Box
        fontFamily={"Figtree"}
        maxW={"100"}
        minW={"100%"}
        display={"flex"}
        flexDirection={"column"}
        position={"relative"}
      >
         <Image src={HeaderBG} style={{position:'absolute',zIndex:'-1'}} alt="header bg" title="header bg"/>
        <Box
          alignItems={"center"}
          w={"100%"}
          gap={{ md: "2rem", base: "1rem" }}
          display={"flex"}
          flexDirection={"column"}
          mt={{ base: "3rem" }}
        >
          <Heading
            fontWeight={"700"}
            lineHeight={{ md: "90.28px", base: "48px" }}
            textAlign={"center"}
            fontSize={{ md: "4.625rem", base: "2rem" }}
            pt={{ md: "10rem", base: "3rem" }}
            className="gradient"
            px={{ base: "0.5rem", md: "4rem" }}
            mb={{ base: "0.5rem" }}
            as={"h1"}
          >
            Hushh Advisory And Professional Consulting Services
          </Heading>
          <Text
            // px={{ md: "17.8rem" }}
            // mb={{ base: "1rem", md: "4rem" }}
            textAlign={"center"}
            fontWeight={"400"}
            color={"#FFFFFF"}
            letterSpacing={"-0.4px"}
            lineHeight={{ md: "30px", base: "18px" }}
            fontSize={{ md: "1.25rem", base: "0.75rem" }}
          >
            For all your AI and data problems
          </Text>
          <Button
            border={"1px solid #606060"}
            borderRadius={"2px"}
            w={{ md: "16rem", base: "10rem" }}
            color={"white"}
            lineHeight={{ md: "28px", base: "14px" }}
            background={"transparent"}
            fontSize={{ md: "1rem", base: "0.75rem" }}
            letterSpacing={{ md: "0.29rem", base: "0.145rem" }}
            _hover={{
              background:
                "linear-gradient(265.3deg, #E54D60 8.81%, #A342FF 94.26%)",
              border: "none",
            }}
            onClick={scrollToStart}
          >
            GET STARTED
          </Button>
        </Box>

        <HStack
          my={{ md: "8rem", base: "3rem" }}
          px={{ md: "7rem", base: "1.25rem" }}
          gap={{ md: "3rem", base: "0.5rem" }}
          display={"flex"}
          flexDirection={{ md: "row", base: "column" }}
        >
          <Box
            display={"flex"}
            flexDirection={"column"}
            flex={1}
            gap={{ md: "2rem", base: "1rem" }}
          >
            <Image
              src={OutBoundServiceImg}
              alt="OutBoundServiceImg"
              layout="responsive"
            />
          </Box>

          <Box
            display={"flex"}
            flexDirection={"column"}
            gap={{ md: "1rem", base: "1rem" }}
            flex={1}
            mt={{md:'0',base:'1rem'}}
          >
            <Text
              className="new-gradient"
              letterSpacing={"0.255rem"}
              lineHeight={{ md: "1rem", base: "0.75rem" }}
              fontWeight={"600"}
              fontSize={"1rem"}
              // mt={{ base: "1rem" }}
            >
              WHAT ARE
            </Text>
            <Text
              className="gradient"
              fontSize={{ md: "3.75rem", base: "1.75rem" }}
              fontWeight={"500"}
              lineHeight={{ md: "63.3px", base: "31.2px" }}
            >
              Outbound Services
            </Text>

            <Text
              color={"#ABABAB"}
              fontWeight={"500"}
              fontSize={{ md: "1rem", base: "0.65rem" }}
              lineHeight={{ md: "36px", base: "20px" }}
            >
              At Hushh, we provide expert advisory consultations to companies
              and teams seeking guidance in AI, data architecture, and related
              technologies. Our outbound services include:
            </Text>

            <Box
              fontSize={{ md: "1rem", base: "0.75rem" }}
              display={"flex"}
              flexDirection={"column"}
              fontWeight={"500"}
              lineHeight={{ md: "36px", base: "24px" }}
              color={"#ABABAB"}
              gap={"1rem"}
            >
              <VStack
                textAlign={"left"}
                alignItems={"flex-start"}
                lineHeight={"1rem"}
              >
                <Text
                  fontWeight={"700"}
                  fontSize={{ md: "1.25rem", base: "1rem" }}
                  lineHeight={{ md: "24px", base: "16px" }}
                  color={"#FFFFFF"}
                >
                  Remote advisory sessions
                </Text>
                <Text
                  color={"#ABABAB"}
                  lineHeight={{ md: "36px", base: "24px" }}
                  fontWeight={"500"}
                  fontSize={{ md: "1rem", base: "0.75rem" }}
                >
                  Flexible online consultations to address your specific AI and
                  data challenges.
                </Text>
              </VStack>
              <VStack
                textAlign={"left"}
                alignItems={"flex-start"}
                lineHeight={"1rem"}
              >
                <Text
                  fontWeight={"700"}
                  fontSize={{ md: "1.25rem", base: "1rem" }}
                  lineHeight={{ md: "24px", base: "16px" }}
                  color={"#FFFFFF"}
                >
                  Short-term expert placements
                </Text>
                <Text
                  color={"#ABABAB"}
                  lineHeight={{ md: "36px", base: "24px" }}
                  fontWeight={"500"}
                  fontSize={{ md: "1rem", base: "0.75rem" }}
                >
                  Temporary integration of our specialists into your team for
                  focused problem-solving.
                </Text>
              </VStack>
              <VStack
                textAlign={"left"}
                alignItems={"flex-start"}
                lineHeight={"1rem"}
              >
                <Text
                  fontWeight={"700"}
                  fontSize={{ md: "1.25rem", base: "1rem" }}
                  lineHeight={{ md: "24px", base: "16px" }}
                  color={"#FFFFFF"}
                >
                  Strategic planning assistance
                </Text>
                <Text
                  color={"#ABABAB"}
                  lineHeight={{ md: "36px", base: "24px" }}
                  fontWeight={"500"}
                  fontSize={{ md: "1rem", base: "0.75rem" }}
                >
                  Help in developing roadmaps for AI adoption and data
                  infrastructure improvements.
                </Text>
              </VStack>
            </Box>
          </Box>
        </HStack>

        <HStack
          mt={{ md: "6rem", base: "3rem" }}
          w={"100%"}
          display={"flex"}
          flexDirection={"column"}
          textAlign={"center"}
          gap={{ md: "2rem", base: "1rem" }}
        >
          <Text
            className="gradient"
            fontSize={{ md: "2.15rem", base: "1rem" }}
            display={'flex'}
            fontWeight={"700"}
            lineHeight={{ md: "51px", base: "30px" }}
            px={{ md: "15%", base: "5%" }}
            mb={{md:'0',base:'1rem'}}
          >
            Our seasoned professionals bring their extensive experience to bear
            on your unique challenges, offering insights and solutions in areas
            such as:
          </Text>
        </HStack>

        <Box
          display={"flex"}
          pt={{ md: "2rem" }}
          justifyContent={"center"}
          flexDir={"column"} // Stack the elements vertically on base, and horizontally on md
          minW={{ md: "100%", base: "100%" }}
          position={"relative"}
          mt={{ md: "2rem", basse: "0.5rem" }}
          px={{ md: "5rem", base: "2rem" }}
        >
          <Image
            src={SeasonedSvg}
            alt="Hushh outbound Services"
            title="Hushh Outbound Service Description"
          />
          <Text
            display={"flex"}
            mt={{ md: "2rem", base: "1rem" }}
            textAlign={"center"}
            alignItems={"center"}
            px={{ md: "4rem" }}
            color={"#ABABAB"}
            fontWeight={"500"}
            fontSize={{ md: "1rem", base: "0.75rem" }}
            lineHeight={{ md: "36px", base: "24px" }}
          >
            Whether you need a quick consultation or ongoing support, our team
            is ready to provide the expertise you need to navigate the complex
            landscape of AI and data technologies.
          </Text>
        </Box>

        <VStack
      px={{ md: "5rem", base: "1.25rem" }}
      py={{ md: "8rem", base: "4rem" }}
      className="howItworks"
      id="howItworks"
      position={"relative"}
    >
      <Text
        className="hushh-gradient"
        fontWeight={"600"}
        fontSize={{ md: "1rem", base: "0.5rem" }}
        lineHeight={{ md: "16px" }}
        letterSpacing={"0.255rem"}
      >
        CORE VALUE COMPANY
      </Text>
      <Text
        className="gradient"
        textAlign={"center"}
        fontWeight={"700"}
        fontSize={{ md: "3.75rem", base: "1.75rem" }}
        lineHeight={{ md: "90px", base: "28.3px" }}
      >
        Our Expertise
      </Text>
      <Box display={"flex"} flexDirection={{ md: "row", base: "column" }}>
        <VStack
          textAlign={"left"}
          alignContent={"flex-start"}
          alignItems={"flex-start"}
          flex={1}
        >
          {Object.keys(categories).map((category) => (
            <React.Fragment key={category}>
              <Text
                w={'100%'} 
                zIndex={3}
                opacity={'100%'}
                color={activeCategory === category ? "#FFFFFF" : "#E5E5E5"}
                fontWeight={activeCategory === category ? "700" : "300"}
                fontSize={{ md: activeCategory === category ? "2.5rem" : "2rem", base: activeCategory === category ? "1.5rem" : "1rem" }}
                lineHeight={{ md: activeCategory === category ? "50.6px" : "32px", base: activeCategory === category ? "32px" : "24px" }}
                onClick={() => setActiveCategory(category)}
                style={{ cursor: 'pointer' }}
              >
                {category}
              </Text>
              <Divider />
            </React.Fragment>
          ))}
          <Image
            style={{
              position: "absolute",
              zIndex: "2",
              left: "-50px",
              top: "60px",
              width: "100%",
              opacity: "80%",
            }}
            src={BgShadow}
            alt="shadow"
          />
        </VStack>
        <VStack
          flex={1}
          justifyContent={{ md: "center", base: 'flex-start' }}
          justifyItems={{ md: "center", base: 'flex-start' }}
          p={{ md: "4rem", base: '0' }}
          mt={{ md: '0', base: '1rem' }}
        >
          <UnorderedList
            color={"#ABABAB"}
            fontWeight={"500"}
            lineHeight={{ md: "69px", base: "30px" }}
            gap={{ md: "1rem", base: "0.25rem" }}
          >
            {categories[activeCategory].map((item, index) => (
              <ListItem key={index}>{item}</ListItem>
            ))}
          </UnorderedList>
        </VStack>
      </Box>
    </VStack>

        <Box position={"relative"} minW={"100%"}>
          <Image
            style={{
              position: "absolute",
              zIndex: "-1",
              left: "-600px",
              top: "100px",
              width: "100%",
            }}
            src={Shadow}
            alt="shadow"
          />
          <VStack
            px={{ md: "3.5rem", base: "1.15rem" }}
            py={{ md: "6rem", base: "2rem" }}
          >
            <Text
              className="hushh-gradient"
              fontWeight={"600"}
              fontSize={{ md: "1rem", base: "0.5rem" }}
              lineHeight={"16px"}
              letterSpacing={"0.255rem"}
            >
              MEET THE FOUNDERS
            </Text>
            <Text
              className="gradient"
              textAlign={"center"}
              fontWeight={"400"}
              fontSize={{ md: "3.75rem", base: "1.75rem" }}
              lineHeight={{ base: "40px", md: "63.3px" }}
            >
              Our Team
            </Text>
            <Text
              color={"#E5E5E5"}
              fontWeight={"400"}
              fontSize={{ md: "1rem", base: "0.75rem" }}
              lineHeight={{ md: "28px", base: "20px" }}
            >
              Leadership isn't a title, it's an action. Thank you for leading by
              example.
            </Text>
          </VStack>

          <Stack
            gap={{ md: "3rem" }}
            px={{ md: "5rem", base: "1.15rem" }}
            display={"flex"}
            w={"100%"}
            flexDirection={{ md: "row", base: "column" }}
          >
            <Box
              flex={1}
              w={"100%"}
              h={"100%"}
              display={{ md: "flex", base: "none" }}
            >
              <Image
                alt="manish"
                src={Manish}
                title="manish sainani"
                width={"355"}
                height={"489"}
                style={{ border: "10px solid white", borderRadius: "21.16px" }}
              />
            </Box>
            <Box w={"100%"} h={"100%"} display={{ md: "none", base: "flex" }} justifyContent={'center'} alignItems={'center'}>
              <Image
                alt="manish"
                src={Manish}
                title="manish sainani"
                width={"200"}
                height={"220"}
              />
            </Box>
            <VStack
              flex={2}
              gap={{ md: "1rem", base: "1rem" }}
              textAlign={"left"}
              alignItems={"flex-start"}
            >
              <HStack w={"100%"} flexDirection={{base:'column',md:'row'}} justifyContent={"space-between"}>
                <Box display={"flex"} flexDirection={"column"}>
                  <Text
                    fontWeight={"700"}
                    lineHeight={{ md: "32.13px", base: "20px" }}
                    fontSize={{ md: "1.67rem", base: "1.15rem" }}
                    className="hushh-gradient"
                    mt={{ base: "1rem" }}
                  >
                    Manish Sainani
                  </Text>
                  <Text
                    fontWeight={"400"}
                    lineHeight={{ md: "21.42px", base: "14px" }}
                    fontSize={{ md: "1.1rem", base: "0.75rem" }}
                    className="gradient"
                  >
                    CEO, CPO and Founder
                  </Text>
                </Box>

                <Box display={"flex"} flexDirection={"row"}>
                  <HStack
                    display={"flex"}
                    gap={{ md: "1rem", base: "0.5rem" }}
                  >
                    <Button
                      backgroundColor={"#0565FF"}
                      color={"white"}
                      borderRadius={"4px"}
                      cursor={"pointer"}
                      padding={{
                        md: "5px 20px 5px 20px",
                        base: "5px 10px 5px 10px",
                      }}
                      fontSize={{ md: "1rem", base: "0.75rem" }}
                      _hover={{
                        color: "white",
                        bg: "linear-gradient(265.3deg, #e54d60 8.81%, #a342ff 94.26%)",
                      }}
                      onClick={() =>
                        window.open(
                          "https://calendly.com/hushh/advisory-meet-with-our-leadership-team",
                          "_blank"
                        )
                      }
                    >
                      Book a call with Manish
                    </Button>
                    <Image
                      src={TwitterIcon}
                      alt="TwitterIcon"
                      title="manish twitter"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        window.open("https://x.com/manishsainani", "_blank")
                      }
                    />
                    <Image
                      src={LinkedInIcon}
                      alt="LinkedInIcon"
                      title="Manish LinkedIn"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        window.open(
                          "https://www.linkedin.com/in/manishsainani/",
                          "_blank"
                        )
                      }
                    />
                  </HStack>
                </Box>
              </HStack>
              <Text
                fontWeight={"500"}
                fontSize={{ md: "1rem", base: "0.75rem" }}
                lineHeight={{ md: "36px", base: "20px" }}
                color={"#ABABAB"}
                opacity={"80%"}
              >
                As CEO and Chief Product Officer, Manish leads Hushh's overall
                strategy and product vision. He leverages his extensive
                experience in AI infrastructure and product management to guide
                clients through complex AI implementation challenges.
              </Text>
              <Accordion
                mt={{ md: "2rem", base: "1rem" }}
                defaultIndex={[0]}
                allowToggle
                w={"100%"}
              >
                <AccordionItem>
                  <AccordionButton>
                    <Text
                      color={"#FFFFFF"}
                      fontWeight={"700"}
                      lineHeight={"24px"}
                      fontSize={{ md: "1.25rem", base: "0.75rem" }}
                      flex="1"
                      textAlign="left"
                    >
                      AI Infrastructure
                    </Text>
                    <AccordionIcon color={"white"} />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <UnorderedList
                      color={"#ABABAB"}
                      fontWeight={"500"}
                      fontSize={{ md: "1rem", base: "0.75rem" }}
                      lineHeight={{ md: "36px", base: "22px" }}
                    >
                      <ListItem>
                        Expert in selecting optimal AI processing hardware
                        (GPUs, TPUs, AWS Inferentia, AWS Trainium)
                      </ListItem>
                      <ListItem>
                        Deep knowledge of AI chip architecture and performance
                        characteristics
                      </ListItem>
                      <ListItem>
                        Experience in scaling AI infrastructure for
                        enterprise-level applications
                      </ListItem>
                    </UnorderedList>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                  <AccordionButton>
                    <Text
                      color={"#FFFFFF"}
                      fontWeight={"700"}
                      lineHeight={"24px"}
                      fontSize={{ md: "1.25rem", base: "0.75rem" }}
                      flex="1"
                      textAlign="left"
                    >
                      Large Language Models (LLMs) and Small Language Models
                      (SLMs)
                    </Text>
                    <AccordionIcon color={"white"} />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <UnorderedList
                      color={"#ABABAB"}
                      fontWeight={"500"}
                      fontSize={{ md: "1rem", base: "0.75rem" }}
                      lineHeight={{ md: "36px", base: "22px" }}
                    >
                      <ListItem>
                        Strategies for integrating language models into existing
                        systems
                      </ListItem>
                      <ListItem>
                        Optimizing LLM/SLM performance for specific use casess
                      </ListItem>
                      <ListItem>
                        Evaluating and selecting appropriate language models for
                        various applications
                      </ListItem>
                    </UnorderedList>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                  <AccordionButton>
                    <Text
                      color={"#FFFFFF"}
                      fontWeight={"700"}
                      lineHeight={"24px"}
                      fontSize={{ md: "1.25rem", base: "0.75rem" }}
                      flex="1"
                      textAlign="left"
                    >
                      AI Product Strategy
                    </Text>
                    <AccordionIcon color={"white"} />
                  </AccordionButton>
                  <AccordionPanel pb={{md:4,base:0}}>
                    <UnorderedList
                      color={"#ABABAB"}
                      fontWeight={"500"}
                      fontSize={{ md: "1rem", base: "0.75rem" }}
                      lineHeight={{ md: "36px", base: "22px" }}
                    >
                      <ListItem>
                        Developing roadmaps for AI product development
                      </ListItem>
                      <ListItem>
                        Aligning AI capabilities with business objectives
                      </ListItem>
                      <ListItem>
                        Managing AI product lifecycles from conception to
                        deployment
                      </ListItem>
                    </UnorderedList>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </VStack>
          </Stack>

         

          <Stack
            w={"100%"}
            py={{ md: "5rem", base: "2rem" }}
            gap={{ md: "3rem" }}
            px={{ md: "5rem", base: "1.15rem" }}
            display={"flex"}
            flexDirection={{ md: "row", base: "column-reverse" }}
            position={"relative"}
          >
            <Box flex={2} display={"flex"} flexDirection={"column"}>
              <HStack
                gap={{ md: "1rem", base: "0.5rem" }}
                // textAlign={{ md: "left", base: "left" }}
                alignItems={{ md: "flex-start", base: "center" }}
                flexDirection={{md:"row",base:'column'}}
                w={"100%"}
                justifyContent={"space-between"}
              >
                <Box display={"flex"} flexDirection={"column"}>
                  <Text
                    fontWeight={"700"}
                    lineHeight={{ md: "32.13px", base: "20px" }}
                    fontSize={{ md: "1.67rem", base: "1rem" }}
                    className="hushh-gradient"
                    mt={{ base: "1rem", md: "0rem" }}
                    textAlign={"left"}
                  >
                    Justin Donaldson
                  </Text>
                  <Text
                    fontWeight={"400"}
                    lineHeight={{ md: "21.42px", base: "14px" }}
                    fontSize={{ md: "1.1rem", base: "0.75rem" }}
                    className="gradient"
                  >
                    CTO and Co-Founder
                  </Text>
                </Box>
                <HStack display={"flex"} gap={{ md: "1rem", base: "0.5rem" }}>
                  <Button
                    backgroundColor={"#0565FF"}
                    color={"white"}
                    borderRadius={"4px"}
                    cursor={"pointer"}
                    padding={{
                      md: "5px 20px 5px 20px",
                      base: "5px 10px 5px 10px",
                    }}
                    fontSize={{ md: "1rem", base: "0.75rem" }}
                    _hover={{
                      color: "white",
                      bg: "linear-gradient(265.3deg, #e54d60 8.81%, #a342ff 94.26%)",
                    }}
                    // onClick={() =>
                    //   window.open(
                    //     "https://calendly.com/hushh/advisory-meet-with-our-leadership-team",
                    //     "_blank"
                    //   )
                    // }
                  >
                    Coming Soon !
                  </Button>
                  <Image
                    src={TwitterIcon}
                    alt="TwitterIcon"
                    title="Justin twitter"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      window.open("https://x.com/omgjjd", "_blank")
                    }
                  />
                  <Image
                    src={LinkedInIcon}
                    alt="LinkedInIcon"
                    title="Justin LinkedIn"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      window.open(
                        "https://www.linkedin.com/in/jjustindonaldson/",
                        "_blank"
                      )
                    }
                  />
                </HStack>
              </HStack>
              <Text
                fontWeight={"500"}
                fontSize={{ md: "1rem", base: "0.75rem" }}
                lineHeight={{ md: "36px", base: "20px" }}
                color={"#ABABAB"}
                opacity={"80%"}
                mt={{md:'2rem',base:'1rem'}}
              >
                As Chief Technology Officer, Justin oversees the technical direction of Hushh and provides expert guidance on data infrastructure and data science initiatives. He brings a wealth of experience in designing and implementing robust data solutions.
              </Text>
              <Accordion
                mt={{ md: "2rem", base: "1rem" }}
                defaultIndex={[0]}
                allowToggle
                w={"100%"}
              >
                <AccordionItem>
                  <AccordionButton>
                    <Text
                      color={"#FFFFFF"}
                      fontWeight={"700"}
                      lineHeight={"24px"}
                      fontSize={{ md: "1.25rem", base: "0.75rem" }}
                      flex="1"
                      textAlign="left"
                    >
                      Data Infrastructure
                    </Text>
                    <AccordionIcon color={"white"} />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <UnorderedList
                      color={"#ABABAB"}
                      fontWeight={"500"}
                      fontSize={{ md: "1rem", base: "0.75rem" }}
                      lineHeight={{ md: "36px", base: "22px" }}
                    >
                      <ListItem>
                      Designing scalable and efficient data architectures
                      </ListItem>
                      <ListItem>
                      Implementing data lakes, data warehouses, and data marts
                      </ListItem>
                      <ListItem>
                      Optimizing data pipelines for performance and reliability
                      </ListItem>
                    </UnorderedList>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                  <AccordionButton>
                    <Text
                      color={"#FFFFFF"}
                      fontWeight={"700"}
                      lineHeight={"24px"}
                      fontSize={{ md: "1.25rem", base: "0.75rem" }}
                      flex="1"
                      textAlign="left"
                    >
                      Data Science
                    </Text>
                    <AccordionIcon color={"white"} />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <UnorderedList
                      color={"#ABABAB"}
                      fontWeight={"500"}
                      fontSize={{ md: "1rem", base: "0.75rem" }}
                      lineHeight={{ md: "36px", base: "22px" }}
                    >
                      <ListItem>
                      Developing advanced analytics solutions
                      </ListItem>
                      <ListItem>
                      Implementing machine learning models for predictive analytics
                      </ListItem>
                      <ListItem>
                      Creating data visualization strategies for complex datasets
                      </ListItem>
                    </UnorderedList>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                  <AccordionButton>
                    <Text
                      color={"#FFFFFF"}
                      fontWeight={"700"}
                      lineHeight={"24px"}
                      fontSize={{ md: "1.25rem", base: "0.75rem" }}
                      flex="1"
                      textAlign="left"
                    >
                      Big Data Technologies
                    </Text>
                    <AccordionIcon color={"white"} />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <UnorderedList
                      color={"#ABABAB"}
                      fontWeight={"500"}
                      fontSize={{ md: "1rem", base: "0.75rem" }}
                      lineHeight={{ md: "36px", base: "22px" }}
                    >
                      <ListItem>
                      Expertise in distributed computing frameworks 
                      </ListItem>
                      <ListItem>
                      Implementing NoSQL databases for large-scale data processing
                      </ListItem>
                      <ListItem>
                      Optimizing big data workflows for efficiency and cost-effectiveness
                      </ListItem>
                    </UnorderedList>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Box>
            <Box
              flex={1}
              w={"100%"}
              h={"100%"}
              display={{ md: "flex", base: "none" }}
            >
              <Image
                alt="Justin"
                src={Justin}
                title="Justin Donaldson"
                width={"355"}
                height={"489"}
                style={{ border: "10px solid white", borderRadius: "21.16px" }}
              />
            </Box>
            <Box w={"100%"} h={"100%"} alignItems={'center'} justifyContent={'center'} display={{ md: "none", base: "flex" }}>
              <Image
                alt="Justin"
                src={Justin}
                title="Justin Donaldson"
                width={"200"}
                height={"220"}
              />
            </Box>
          </Stack>
          <Image
            style={{
              position: "absolute",
              zIndex: "2",
              right: "0px",
              overflow: "hidden",
              top: "900px",
              width: "80%",
            }}
            src={Shadow}
            alt="shadow"
          />
        </Box>
      </Box>
      <OutboundFaq/>
      <ContactForm />
  
    </>
  );
};

export default OutBoundService;
