import { Box, Spinner, Flex, Text } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      direction="column"
      bg="black"
      color="white"
    >
      <Spinner size="xl" color="white" />
      <Text
        mt="4"
        fontWeight={"400"}
        className="color-gradient"
        fontSize={{ md: "4rem", base: "1rem" }}
      >
        Hushhing....
      </Text>
    </Flex>
  );
}
