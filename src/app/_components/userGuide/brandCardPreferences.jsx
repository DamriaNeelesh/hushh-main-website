import React from 'react'
import {
  Box,
  VStack,
  Heading,
  Text,
  OrderedList,
  List,
  ListItem,
  ListIcon,
  Divider,
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';

const BrandCardPreferences = () => {
  return (
    <Box mt={{md:'0',base:'1rem'}}  p={{ md: '4rem', base: '0.25rem' }} color="white">
      <VStack align="start" spacing={6}>
        <Heading as="h1" textAlign={'center'} fontSize={{ md: '4xl', base: 'xl' }} className="gradient">
          Attaching Cards for Enhanced Experiences
        </Heading>

        <Heading as="h2" fontSize={{ md: 'xl', base: 'lg' }} className="color-gradient">
          Link Your Preferences and Brands for Unforgettable Interactions
        </Heading>

        <Text fontSize={{ md: 'lg', base: 'md' }}>
          In Hushh, the ability to attach Brand and Preference Cards to any of your existing cards
          is a feature designed to amplify your personalized experiences. This functionality
          enables you to seamlessly combine different aspects of your profile to share more
          comprehensively and get experiences tailored just for you.
        </Text>

        <OrderedList spacing={3} fontSize={{ md: 'lg', base: 'sm' }}>
          <ListItem>
            <Text as="b">Navigate to the Wallet Screen:</Text>
            <List>
              <ListItem>
                <ListIcon as={CheckCircleIcon} />
                Access Your Wallet: Start by opening the Hushh app and navigating to your
                Wallet screen.
              </ListItem>
            </List>
          </ListItem>

          <ListItem>
            <Text as="b">Select the Card to Enhance:</Text>
            <List>
              <ListItem>
                <ListIcon as={CheckCircleIcon} />
                Choose the Primary Card: Select the card you want to enhance by attaching
                additional Brand or Preference Cards.
              </ListItem>
            </List>
          </ListItem>

          <ListItem>
            <Text as="b">Attach Brand or Preference Cards:</Text>
            <List>
              <ListItem>
                <ListIcon as={CheckCircleIcon} />
                Select the Attach Option: Look for the option to attach other cards.
              </ListItem>
              <ListItem>
                <ListIcon as={CheckCircleIcon} />
                Choose Cards to Attach: Select from your available Brand and Preference Cards.
              </ListItem>
            </List>
          </ListItem>
        </OrderedList>

        <Divider borderColor="gray.400" opacity={0.3} my={{ md: 4, base: 2 }} />

        <Text fontWeight={'bold'} as={"h3"} fontSize={{ md: 'xl', base: 'lg' }} className='color-gradient'>
          Benefits of Attaching Cards
        </Text>

        <List spacing={3} fontSize={{ md: 'lg', base: 'sm' }}>
          <ListItem>
            <ListIcon as={CheckCircleIcon} />
            Enhanced Personalization: Create a more detailed profile by linking cards.
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} />
            Streamlined Sharing: With attached cards, sharing becomes easier.
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} />
            Memorable Experiences: This feature ensures every interaction is as relevant and personalized as possible.
          </ListItem>
        </List>
        <Divider borderColor="gray.400" opacity={0.3} my={{ md: 4, base: 2 }} />

        <Text fontWeight={'bold'} as={"h3"} fontSize={{ md: 'xl', base: 'lg' }} className='color-gradient'>
          Getting the Most Out of Card Attachments:
        </Text>

        <List spacing={3} fontSize={{ md: 'lg', base: 'sm' }}>
          <ListItem>
            <ListIcon as={CheckCircleIcon} />
            Regularly Update Your Preferences: Update the attached cards to keep your experiences fresh and relevant.
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} />
            Monitor Your Shared Data: Keep track of which cards are attached and what information is being shared.
          </ListItem>
        </List>
      </VStack>
    </Box>
  );
};

export default BrandCardPreferences;
