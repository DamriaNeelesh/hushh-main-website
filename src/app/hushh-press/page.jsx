// 'use client'
import {
    Box,
    VStack,
    Text,
    Heading,
    Divider,
    Link,
    UnorderedList,
    ListItem,
    Stack,
  } from "@chakra-ui/react";
// import FooterComponent from "../_components/features/FooterComponent";
// import Header from "../_components/header";
import HushhPress from '../_components/hushhPress/hushhPress'
export const metadata = {
    title: "Hushh | Press-release",
    description:
    "Discover Hushh's mission to empower individuals with data control, privacy, and wealth creation. Learn about our vision for a human-centered world, our core values, and the innovative services we offer to transform personal data into financial rewards.",
     keywords:
    "Hushh, data empowerment, privacy-first, personal data, wealth creation, business growth, mission, vision, core values, data control, financial rewards, technology, innovation, privacy, data monetization"
  };
  
  const hushhPress = () => {
    return (
        <>
        <HushhPress/>
      </>
    );
  };
  
  export default hushhPress;
  