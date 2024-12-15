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

const EnhancingHushh = () => {
  return (
    <Box mt={{ md: '0', base: '1rem' }} p={{ md: '4rem', base: '0' }} color="white">
      <VStack align="start" spacing={6}>
        <Heading as="h1" fontSize={{ md: '3xl', base: 'xl' }} className="gradient">
          Enhancing the Core of Hushh — The Convergence of Luxury and Technology
        </Heading>

        <Text fontSize={{ md: 'xl', base: 'lg' }}>
          At the heart of Hushh lies a suite of core product experiences, meticulously crafted to provide unmatched data management and personalization:
        </Text>

        <UnorderedList listStyleType={'none'}  spacing={{ base:3, md:'2rem'}} fontSize={{ md: 'lg', base: 'sm' }}>
          <ListItem >
            <Text as="b" className='new-gradient'>1-Click Data Operations:</Text>
            <List spacing={{base:3,md:'1.25rem'}}>
              <ListItem>
                <ListIcon as={CheckCircleIcon} />
                $haring & $elling: Our platform enables users to share or monetize their data with a single click, exerting full control over who has access and at what price.
              </ListItem>
              <ListItem>
                <ListIcon as={CheckCircleIcon} />
                Search: A powerful, intuitive search function allows users to navigate their data with the same ease as browsing the web.
              </ListItem>
              <ListItem>
                <ListIcon as={CheckCircleIcon} />
                Chatbots & Concierge: AI-driven chatbots and human-assisted concierge services offer personalized assistance, from data queries to lifestyle management.
              </ListItem>
            </List>
          </ListItem>

          <ListItem>
            <Text as="b" className='new-gradient'>Hushh Private On-Device Cloud:</Text>
            <List spacing={{base:3,md:'1.25rem'}}>
              <ListItem>
                <ListIcon as={CheckCircleIcon} />
                The backbone of our service, the hushh private on-device cloud, guarantees secure and seamless data sharing and consent management.
              </ListItem>
              <ListItem>
                <ListIcon as={CheckCircleIcon} />
                This proprietary technology ensures that user data never leaves the device without explicit permission, maintaining a fortified layer of privacy.
              </ListItem>
            </List>
          </ListItem>

          <ListItem>
            <Text as="b" className='new-gradient'>Co-Branded Luxury Experience:</Text>
            <List spacing={{base:3,md:'1.25rem'}}>
              <ListItem>
                <ListIcon as={CheckCircleIcon} />
                We've partnered with luxury brands to offer a co-branded digital magazine, combining the latest in lifestyle trends with personalized data insights.
              </ListItem>
              <ListItem>
                <ListIcon as={CheckCircleIcon} />
                Private Data Cloud Wallet & Personal Concierge: Aligning with the opulence of esteemed brands, we provide a digital counterpart that not only matches in elegance but excels in functionality.
              </ListItem>
            </List>
          </ListItem>

          <ListItem>
            <Text as="b" className='new-gradient'>A Vision of Empowerment:</Text>
            <List spacing={{base:3,md:'1.25rem'}}>
              <ListItem>
                <ListIcon as={CheckCircleIcon} />
                Hushh is redefining what it means to be a service—it's a commitment to an elevated digital life, where data isn’t just a commodity, but a statement of individuality and empowerment.
              </ListItem>
              <ListItem>
                <ListIcon as={CheckCircleIcon} />
                We're reshaping the data economy to prioritize user control, value creation, and ethical stewardship.
              </ListItem>
            </List>
          </ListItem>
        </UnorderedList>

      </VStack>
    </Box>
  );
};

export default EnhancingHushh;
