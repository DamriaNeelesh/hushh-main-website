import React from 'react';
import { Box, VStack, Heading, Text, List, ListItem, OrderedList, Divider, ListIcon, UnorderedList } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';

const ProfileSettings = () => {
  return (
    <Box mt={{ md: '0', base: '1rem' }} p={{ md: '4rem', base: '0.25rem' }} color="white">
      <VStack spacing={6} align="start">

        <Heading as="h1" fontSize={{ md: '3xl', base: '2xl' }} className="gradient">
            Manage Your Hushh Experience
        </Heading>
        <Heading as="h2" fontSize={{ md: 'xl', base: 'lg' }} className="new-gradient">
        Access Profile and Account Settings
        </Heading>
        <OrderedList spacing={3} fontSize={{ md: 'lg', base: 'sm' }}>
          <ListItem>
          Open the Hushh app and tap the settings icon. 
          </ListItem>
          <ListItem>
            Manage your account with these options: 
            <UnorderedList>
              <ListItem>
                 <b>Permissions:</b>Adjust data access and sharing permissions. 
              </ListItem>
              <ListItem>
                 <b>Switch to Agent Profile:</b>Adjust data access and sharing permissions. 
              </ListItem>
              <ListItem>
                 <b>Send Feedback:</b>Adjust data access and sharing permissions. 
              </ListItem>
              <ListItem>
                 <b>Delete My Data:</b>Remove your data from our systems for privacy. 
              </ListItem>
              <ListItem>
                 <b>Logout:</b>Sign out securely
              </ListItem>
            </UnorderedList>
          </ListItem>
        </OrderedList>


        <Divider borderColor="gray.400" opacity={0.3} my={{ md: 4, base: 2 }} />

        <Heading as="h2" fontSize={{ md: 'xl', base: 'lg' }} className="new-gradient">
           Edit Your Profile Information
        </Heading>
        <OrderedList spacing={3} fontSize={{ md: 'lg', base: 'sm' }}>
          <ListItem>
              Tap on “Hushh ID Card” or “Demographic Card” under Preference card.
          </ListItem>
          <ListItem>
              Select and edit the information you want to change.  
          </ListItem>
          <ListItem>
             Save changes to update your profile instantly.
          </ListItem>
        </OrderedList>  

        <Divider borderColor="gray.400" opacity={0.3} my={{ md: 4, base: 2 }} />

        <Text fontStyle="italic" fontSize={{ md: 'lg', base: 'sm' }}>
          Note: Changes made to your Hushh ID Card and Demographic Card reflect immediately across the Hushh ecosystem, keeping your profile up to date with your latest information.
        </Text>

      </VStack>
    </Box>
  );
};

export default ProfileSettings;
