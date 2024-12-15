import React from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  Divider,
  UnorderedList,
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';

const BrandCards = () => {
  return (
    <Box mt={{ md: '0', base: '1rem' }} p={{ md: '4rem', base: '0.25rem' }} color="white">
      <VStack align="start" spacing={6}>
        <Heading as="h1" fontSize={{ md: '4xl', base: '2xl' }} className="gradient">
           Engage with Brand Cards
        </Heading>
        <OrderedList spacing={3} fontSize={{ md: 'lg', base: 'md' }}>
          <ListItem>
            Open the Hushh app, navigate to the Card Market by clicking on the "+" icon. 
          </ListItem>
          <ListItem>
            Select and add Brand Cards that match your interests. 
          </ListItem>
          <ListItem>
            Tap 'Take Me There' to personalize the card with your preferences.
          </ListItem>
          <ListItem>
            Customize the card: 
            <UnorderedList spacing={2} pl={6}>
              <ListItem>
                Share likes, dislikes, and habits.
              </ListItem>
              <ListItem>
                Record and attach audio details.
              </ListItem>
              <ListItem>
                Set a minimum bid value to control compensation.
              </ListItem>
              <ListItem>
                Attach data that represents your brand interactions.
              </ListItem>
            </UnorderedList>
          </ListItem>
          <ListItem>
            Use the QR code on each Brand Card to share your preferences securely when needed.
          </ListItem>
        </OrderedList>     

        <Text fontStyle={'italic'} fontSize={{ md: 'lg', base: 'md' }}>
          Note: The more you personalize and engage with your Brand Cards, the richer the experiences and the greater the rewards.
        </Text>

      </VStack>
    </Box>
  );
};

export default BrandCards;
