import { Box, Heading, Text, List, ListItem, ListIcon, OrderedList, VStack, Divider } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import React from 'react';

const AttachingCards = () => {
  return (
    <Box p={{ md: '2rem', base: '0.25rem' }} color={'white'}>
      <VStack spacing={6} align="start">
        <Heading as="h1" fontSize={{ md: '3xl', base: 'lg' }} className='gradient'>
           Attaching Cards for Enhanced Experiences - Link Your Preference and Brand cards 
        </Heading>

        <OrderedList spacing={3} fontSize={{ md: 'lg', base: 'sm' }}>
          <ListItem> Open the Hushh app and go to your Wallet screen where your cards are stored.</ListItem>
          <ListItem>Choose the primary card from your wallet that you want to enhance with additional Brand or Preference Cards.</ListItem>
          <ListItem>
          Tap on "Add Brand Card" or "Add Preferences Card" on the primary card.
          </ListItem>
          <ListItem>
          Select Brand or Preference Cards from the list that complement the primary card. 
          </ListItem>
          <ListItem>
          Confirm the attachment to link the cards together by clicking on “Update”.
          </ListItem>
        </OrderedList>

        <Divider borderColor="gray.400" opacity={0.3} my={{ md: 4, base: 2 }} />
  
      </VStack>
    </Box>
  );
};

export default AttachingCards;
