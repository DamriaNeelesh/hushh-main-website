import React from 'react';
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
  UnorderedList,
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';

const HushhAccount = () => {
  return (
    <Box mt={{md:'0',base:'1rem'}} p={{ md: '4rem', base: '0.25rem' }} color="white">
      <VStack align="start" spacing={6}>
        {/* Main Heading */}
        <Heading as="h1" fontSize={{ md: '3xl', base: 'xl' }} className="gradient">
          Create a Hushh Account
        </Heading>

        {/* Subheading */}
        <Text fontSize={{ md: 'lg', base: 'md' }}>
          Start Your Journey Towards Data Empowerment. Creating your Hushh account is the first step to gaining control over your data and enjoying personalized experiences.
        </Text>

        {/* Steps to create an account */}
        <UnorderedList listStyleType={'none'} spacing={3} fontSize={{ md: 'lg', base: 'sm' }} gap={'4rem'}>
          <ListItem spacing={{md:'2rem'}}>
            <Text as="b" className='new-gradient'>1. Download Hushh:</Text>
            <List spacing={2}>
              <ListItem>
                {/* <ListIcon as={CheckCircleIcon} /> */}
                Download the Hushh app to your device. Available on iOS and Android.
                <br /> - <a href="https://bit.ly/hushhAndroid" target="_blank" rel="noopener noreferrer">Android : </a> {"   "}<a href="https://bit.ly/hushhAndroid" target="_blank" rel="noopener noreferrer" style={{color:'white', textDecoration:'underline'}}>https://bit.ly/hushhAndroid</a>
                <br /> - <a href="https://bit.ly/HushhIos" target="_blank" rel="noopener noreferrer">iOS :</a>  {"   "}<a href="https://bit.ly/HushhIos" target="_blank" rel="noopener noreferrer" style={{color:'white', textDecoration:'underline'}}>https://bit.ly/HushhIos</a>
                </ListItem>
            </List>
          </ListItem>

          <ListItem>
            <Text as="b" className='new-gradient'>2. Sign Up:</Text>
            <List spacing={2}>
              <ListItem>
                Open the Hushh app and tap on "Sign Up" to begin the account creation process
              </ListItem>
            </List>
          </ListItem>

          <ListItem>
            <Text as="b" className='new-gradient'>3. Verify Your Account:</Text>
            <List spacing={2}>
              <ListItem>
                An OTP will be sent to your registered phone number or email. Enter the OTP to verify your account.
              </ListItem>
            </List>
          </ListItem>

          {/* <ListItem>
            <Text as="b" className='new-gradient'>4. Connect Your Accounts:</Text>
            <List spacing={2}>
              <ListItem>
                <ListIcon as={CheckCircleIcon} />
                Link Apple and Google Accounts: This step is crucial for seamless integration and synchronization.
              </ListItem>
            </List>
          </ListItem> */}

          <ListItem>
            <Text as="b" className='new-gradient'>4. Set Up Your Profile:</Text>
            <List spacing={2}>
              <ListItem>
                Fill out your profile, add personal information, and set up your Hushh ID.
              </ListItem>
            </List>
          </ListItem>

          <ListItem>
            <Text as="b" className='new-gradient'>5. Grant Permissions:</Text>
            <List spacing={2}>
              <ListItem>
                Allow Hushh access to all required permissions.
              </ListItem>
            </List>
          </ListItem>
        </UnorderedList>

        <Text fontSize={{ md: 'lg', base: 'sm' }}>
          By following these steps, you'll be well on your way to harnessing the full potential of Hushh, enjoying a data-driven experience that respects your privacy and provides tangible benefits.
        </Text>
      </VStack>
    </Box>
  );
};

export default HushhAccount;
