import React from 'react';
import { Box, VStack, Heading, Text, OrderedList, ListItem, Divider } from '@chakra-ui/react';

const SendFeedback = () => {
  return (
    <Box mt={{ md: '0', base: '1rem' }} p={{ md: '4rem', base: '0.25rem' }} color="white">
      <VStack spacing={6} align="start">

        <Heading as="h1" fontSize={{ md: '3xl', base: '2xl' }} className="gradient">
          Send Feedback
        </Heading>

        <Text fontStyle={'italic'} fontSize={{ md: 'lg', base: 'sm' }}>
          "Your" Voice Matters to Us
        </Text>

        <Text fontSize={{ md: 'lg', base: 'sm' }}>
          At Hushh, we are committed to continuous improvement and value your feedback. The Send Feedback feature allows you to communicate directly with our team about any issues, bugs, or general feedback you have regarding the app.
        </Text>

        <Heading as="h2" fontSize={{ md: '2xl', base: 'lg' }} className="color-gradient">
          How to Send Feedback
        </Heading>

        <OrderedList spacing={3} fontSize={{ md: 'lg', base: 'sm' }}>
          <ListItem>
            Navigate to Settings: Open the Hushh app and tap on the 'Settings' tab located in the bottom bar.
          </ListItem>
          <ListItem>
            Access Feedback Option: Scroll through the settings menu until you find the 'Send Feedback' option.
          </ListItem>
          <ListItem>
            Describe Your Experience: Enter your comments, suggestions, or details of any issues you are experiencing. Be as detailed as possible to help us understand your perspective and address your feedback effectively.
          </ListItem>
          <ListItem>
            Submit Your Feedback: Once you've filled out your feedback, submit it. Our routing mechanisms ensure it reaches the appropriate team, whether it's technical support, user experience, or product development.
          </ListItem>
        </OrderedList>

        <Divider borderColor="gray.400" opacity={0.3} my={{ md: 4, base: 2 }} />

        <Heading as="h2" fontSize={{ md: '2xl', base: 'lg' }} className="color-gradient">
          What Happens After You Send Feedback?
        </Heading>

        <Text fontSize={{ md: 'lg', base: 'sm' }}>
          After submitting feedback, here's what you can expect:
        </Text>

        <OrderedList spacing={3} fontSize={{ md: 'lg', base: 'sm' }}>
          <ListItem>
            Directed to Relevant Team: Our intelligent routing mechanisms determine which team should handle your query, ensuring the right experts address your feedback.
          </ListItem>
          <ListItem>
            Acknowledgment of Receipt: You will receive an acknowledgment that your feedback has been received. We appreciate every piece of feedback and take it seriously.
          </ListItem>
          <ListItem>
            Follow-Up Actions: If your feedback requires further action or clarification, a team member may reach out for more information. We strive to resolve issues promptly and may inform you about updates made in response to your feedback.
          </ListItem>
        </OrderedList>
        
        <Divider borderColor="gray.400" opacity={0.3} my={{ md: 4, base: 2 }} />

        <Heading as="h2" fontSize={{ md: '2xl', base: 'lg' }} className="color-gradient">
          Importance of Your Feedback
        </Heading>

        <Text fontSize={{ md: 'lg', base: 'sm' }}>
          Your feedback is invaluable in helping us refine Hushh and ensure it meets your needs and expectations. We encourage all users to share their thoughts and experiences, as this feedback drives our app's evolution and improvement.
        </Text>

        <Text fontStyle="italic" fontSize={{ md: 'lg', base: 'sm' }}>
          Note: We maintain the highest standards of privacy and confidentiality with all feedback received, ensuring that your communications are secure.
        </Text>

      </VStack>
    </Box>
  );
};

export default SendFeedback;
