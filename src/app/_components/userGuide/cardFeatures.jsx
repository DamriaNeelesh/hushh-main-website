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

const CardFeatures = () => {
  return (
    <Box mt={{ md: '0', base: '1rem' }} p={{ md: '4rem', base: '0.25rem' }} color="white">
      <VStack align="start" spacing={6}>
        {/* Main Heading */}
        <Heading as="h1" fontSize={{ md: '3xl', base: '2xl' }} className="gradient">
          Card Features: Share Your Vibe and Manage Your Card
        </Heading>

        <Heading as="h3" fontSize={{ md: 'xl', base: 'lg' }} className="color-gradient">
           Share Your Vibe: 
        </Heading>
        <OrderedList spacing={3} fontSize={{ md: 'lg', base: 'sm' }}>
          <ListItem>
             Open a Brand or General Preferences Card. 
          </ListItem>
          <ListItem>
            Tap on 'Share Your Vibe'. 
          </ListItem>
          <ListItem>
          Choose to attach images, receipts, or documents.
          </ListItem>
          <ListItem>
          Upload files from your device to display on your card. 
          </ListItem>
        </OrderedList>

        <Divider borderColor="gray.400" opacity={0.3} my={{ md: 4, base: 2 }} />

{/* Manage Your Card */}
<Heading as="h3" fontSize={{ md: 'xl', base: 'lg' }} className="color-gradient">
   Manage Your Card: 
</Heading>
<OrderedList spacing={3} fontSize={{ md: 'lg', base: 'sm' }}>
          <ListItem>
          Access the card you want to manage.  
          </ListItem>
          <ListItem>
          Select 'Manage Your Card'. 
          </ListItem>
          <ListItem>
          Set or update the minimum bid amount, view linked assets, and share your card through Hushh Chat or other options.
          </ListItem>

        </OrderedList>
   
      </VStack>
    </Box>
  );
};

export default CardFeatures;
