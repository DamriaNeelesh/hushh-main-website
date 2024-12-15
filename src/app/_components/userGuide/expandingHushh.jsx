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
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';

const ExpandingHushh = () => {
  return (
    <Box mt={{md:'0',base:'1rem'}} p={{ md: '4rem', base: '0.25rem' }} color="white">
      <VStack align="start" spacing={6}>

        <Heading textAlign={'center'} as="h1" fontSize={{ md: '3xl', base: 'xl' }} className="gradient">
          Expanding the Hushh Ecosystem — The Innovation Beyond
        </Heading>

        <Text fontSize={{ md: 'lg', base: 'sm' }}>
          While the core functionalities of Hushh set a solid foundation for data control and privacy, 
          our suite of flagship offerings pushes the boundaries further:
        </Text>

        <Heading as="h2" fontSize={{ md: '2xl', base: 'lg' }} className="color-gradient">
          Consumer and Agent Applications
        </Heading>

        <List spacing={3} fontSize={{ md: 'lg', base: 'sm' }}>
          <ListItem>
            <ListIcon as={CheckCircleIcon} />
            HushhApp: Tailored for the end-user, providing a one-stop hub for managing personal data with AI assistance.
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} />
            Agent Interface: Designed for professionals who manage data, offering advanced tools to facilitate data operations.
          </ListItem>
        </List>

        <Divider borderColor="gray.400" opacity={0.3} my={{ md: 4, base: 2 }} />

        <Heading as="h2" fontSize={{ md: '2xl', base: 'lg' }} className="color-gradient">
          Seamless Data Sharing
        </Heading>

        <List spacing={3} fontSize={{ md: 'lg', base: 'sm' }}>
          <ListItem>
            <ListIcon as={CheckCircleIcon} />
            🤫 Button: A single touchpoint for users to share their data with consent, quickly and securely.
          </ListItem>
        </List>

        <Heading as="h2" fontSize={{ md: '2xl', base: 'lg' }} className="color-gradient">
          White-Labeled AI Solutions
        </Heading>

        <List spacing={3} fontSize={{ md: 'lg', base: 'sm' }}>
          <ListItem>
            <ListIcon as={CheckCircleIcon} />
            Our suite of AI products is available for white-labeling, allowing businesses to integrate Hushh's data management and sharing capabilities.
          </ListItem>
        </List>

        <Heading as="h2" fontSize={{ md: '2xl', base: 'lg' }} className="color-gradient">
          Co-Branded Experiences
        </Heading>

        <List spacing={3} fontSize={{ md: 'lg', base: 'sm' }}>
          <ListItem>
            <ListIcon as={CheckCircleIcon} />
            In collaboration with leading tech companies and luxury brands, Hushh is crafting co-branded experiences that integrate seamlessly with digital and physical lifestyles.
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} />
            These experiences are designed to reflect the sophistication and uniqueness of each brand, aligning with our commitment to exclusivity and quality.
          </ListItem>
        </List>

        <Divider borderColor="gray.400" opacity={0.3} my={{ md: 4, base: 2 }} />

        <Heading as="h2" fontSize={{ md: '2xl', base: 'lg' }} className="color-gradient">
          The Hushh Movement
        </Heading>

        <List spacing={3} fontSize={{ md: 'lg', base: 'sm' }}>
          <ListItem>
            <ListIcon as={CheckCircleIcon} />
            Hushh is not just an app or a platform; it represents a paradigm shift towards a digital economy that's ethical, user-empowered, and value-driven.
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} />
            By weaving together AI sophistication and human expertise, Hushh ensures your data is an active, invaluable asset.
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} />
            Our vision is to steward the data economy towards a future where data does more than just exist; it works for you, providing tangible benefits and personalized experiences.
          </ListItem>
        </List>
      </VStack>
    </Box>
  );
};

export default ExpandingHushh;
