import React from "react";
import { GridItem, VStack, Text } from "@chakra-ui/react";

const ServiceCard = ({
  icon,
  title,
  description,
  alignItems,
  textAlign,
  onClick,
  styles,
}) => {
  return (
    <GridItem
      cursor={"pointer"}
      onClick={onClick}
      width={{ base: "100%", md: "100%" }}
      px={{ base: "1rem" }}
      style={styles}
    >
      <VStack
        display={"flex"}
        alignItems={{ md: alignItems || "flex-start", base: "center" }}
        gap={"1rem"}
      >
        {icon}
        <Text
          textAlign={{ base: "center", md: "left" }}
          fontSize={{ md: "1.25rem", base: "1rem" }}
          fontWeight={700}
          color={"white"}
        >
          {title}
        </Text>
        <Text
          textAlign={{ md: textAlign || "left", base: "center" || textAlign }}
          fontWeight={500}
          lineHeight={{ md: "25px", base: "15px" }}
          color={"#ABABAB"}
          fontSize={{ md: "1rem", base: "0.75rem" }}
        >
          {description}
        </Text>
      </VStack>
    </GridItem>
  );
};

export { ServiceCard };
