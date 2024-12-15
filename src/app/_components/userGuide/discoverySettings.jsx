import React from "react";
import {
  Box,
  VStack,
  Heading,
  Text,
  List,
  ListItem,
  OrderedList,
  Divider,
} from "@chakra-ui/react";

const DiscoverySettings = () => {
  return (
    <Box mt={{ md: '0', base: '1rem' }} p={{ md: '4rem', base: '0.25rem' }} color="white">
      <VStack spacing={6} align="start">
        <Heading
          as="h1"
          fontSize={{ md: "3xl", base: "2xl" }}
          className="gradient"
        >
          Discovery Settings
        </Heading>

        <Text fontSize={{ md: "xl", base: "lg" }}>
          Adjust Your Visibility and Connectivity
        </Text>

        <Text fontStyle={'italic'} fontSize={{ md: "lg", base: "sm" }}>
          Discovery on Hushh lets you explore and engage with profiles, brands,
          and services. Our settings allow you to specify the data and
          connections you wish to receive or share for a tailored experience.
        </Text>

        <Heading
          as="h2"
          fontSize={{ md: "2xl", base: "lg" }}
          className="color-gradient"
        >
          Customizing Your Hushh Discovery Settings
        </Heading>

        <OrderedList spacing={3} fontSize={{ md: "lg", base: "sm" }}>
          <ListItem>Launch the Hushh app.</ListItem>
          <ListItem>Tap the profile icon.</ListItem>
          <ListItem>Head into Settings.</ListItem>
          <ListItem>Scroll to Discovery.</ListItem>
          <ListItem>
            Adjust your preferences for the types of profiles, content, and
            services you want to interact with, based on your data-sharing
            comfort level.
          </ListItem>
        </OrderedList>

        <Divider borderColor="gray.400" opacity={0.3} my={{ md: 4, base: 2 }} />

        <Heading
          as="h2"
          fontSize={{ md: "2xl", base: "lg" }}
          className="color-gradient"
        >
          Public or Private Mode
        </Heading>

        <Text fontSize={{ md: "lg", base: "sm" }}>
          In Hushh, you can set your profile to Public or Private mode:
        </Text>

        <List spacing={3} fontSize={{ md: "lg", base: "sm" }}>
          <ListItem>
            <strong>Public Mode:</strong> Your profile and selected data points
            are discoverable to other Hushh users, facilitating connections and
            interactions based on shared interests or mutually beneficial data
            exchanges.
          </ListItem>
          <ListItem>
            <strong>Private Mode:</strong> This setting makes you invisible to
            others. Your profile is not visible, and no data is shared without
            explicit consent. However, you can still manage current connections
            and data-sharing agreements.
          </ListItem>
        </List>
        <Divider borderColor="gray.400" opacity={0.3} my={{ md: 4, base: 2 }} />

        <Heading
          as="h2"
          fontSize={{ md: "2xl", base: "lg" }}
          className="color-gradient"
        >
          Switching Between Public and Private Mode
        </Heading>

        <OrderedList spacing={3} fontSize={{ md: "lg", base: "sm" }}>
          <ListItem>Open the Hushh app.</ListItem>
          <ListItem>Tap the profile icon.</ListItem>
          <ListItem>Proceed to Settings.</ListItem>
          <ListItem>Navigate to Discovery.</ListItem>
          <ListItem>
            Choose between 'Public Mode' or 'Private Mode' to set your desired
            level of visibility and interaction.
          </ListItem>
        </OrderedList>

        <Text fontStyle="italic" fontSize={{ md: "lg", base: "sm" }}>
          Note: Switching to Private Mode does not withdraw any previous data
          permissions granted or disconnect existing relationships. You maintain
          the power to manage those consents within your Hushh wallet.
        </Text>
      </VStack>
    </Box>
  );
};

export default DiscoverySettings;
