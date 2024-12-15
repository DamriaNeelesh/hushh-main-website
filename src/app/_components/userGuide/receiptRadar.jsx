import React from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  ListItem,
  OrderedList,
  Divider,
} from '@chakra-ui/react';

const ReceiptRadar = () => {
  return (
    <Box mt={{ md: '0', base: '1rem' }} p={{ md: '4rem', base: '0.25rem' }} color="white">
      <VStack align="start" spacing={6}>
        {/* Main Heading */}
        <Heading as="h1" fontSize={{ md: '3xl', base: '2xl' }} className="gradient">
          Getting Started with Receipt Radar: 
        </Heading>

        <OrderedList spacing={3} fontSize={{ md: 'lg', base: 'sm' }}>
          <ListItem>
            Open the Hushh app and go to Receipt Radar on the main wallet screen.
          </ListItem>
          <ListItem>
            Follow the prompts to connect your email account securely. 
          </ListItem>
          <ListItem>
            Search for brand receipts you want Receipt Radar to scan. 
          </ListItem>
          <ListItem>
            By clicking on “Sync all receipts automatically”, it automatically synchronize all receipts by scanning your entire email inbox.
          </ListItem>
          <ListItem>
            Review and confirm the extracted information before it’s attached to your cards 
          </ListItem>
        </OrderedList>
      
        <Text fontStyle={'italic'} fontSize={{ md: 'lg', base: 'sm' }}>
          Note: The Receipt Radar feature is built with user discretion in mind. You have full control over which receipts are imported and how data is categorized and used within the Hushh app.
        </Text>

      </VStack>
    </Box>
  );
};

export default ReceiptRadar;
