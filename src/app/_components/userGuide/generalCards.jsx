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
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';

const GeneralCards = () => {
  return (
    <Box mt={{ md: '0', base: '1rem' }} p={{ md: '4rem', base: '0.25rem' }} color="white">
      <VStack align="start" spacing={6}>

        <Heading as="h1" fontSize={{ md: '3xl', base: '2xl' }} className="gradient">
          Utilizing General Cards
        </Heading>

        <OrderedList spacing={3} fontSize={{ md: 'lg', base: 'sm' }}>
          <ListItem>
            Open the Hushh app, navigate to the Card Market by clicking on the "+" icon. 
          </ListItem>
          <ListItem>
          Select General Cards that fit your daily life. 
          </ListItem>
          <ListItem>
          Tap 'Take Me There' to personalize the card with your preferences. 
          </ListItem>
          <ListItem>
            Customize the card:
            <OrderedList
              listStyleType="lower-alpha"
              spacing={3}
              fontSize={{ md: 'md', base: 'sm' }}
              pl={6}
            >
              <ListItem>Share likes, dislikes, and habits.</ListItem>
              <ListItem>Record and attach audio details.</ListItem>
              <ListItem>Set a minimum bid value to control compensation.</ListItem>
              <ListItem>Attach data that represents your general interactions.</ListItem>
            </OrderedList>
          </ListItem>
          <ListItem>
            Use the QR code on each card to securely share your preferences when needed.
          </ListItem>
        </OrderedList>

        <Text fontStyle={'italic'} fontSize={{ md: 'lg', base: 'sm' }}>
          Note: As with Brand Cards, your interaction with General Cards accumulates Hushh Coins, which can be redeemed for unique experiences or benefits.
        </Text>
      </VStack>
    </Box>
  );
};

export default GeneralCards;
