"use client";
import React from "react";
import {
  Box,
  Heading,
  Button,
  Text,
  VStack,
  SimpleGrid,
  Badge,
  Link,
  HStack,
  Divider,
  Flex,
  List,
  ListItem,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { jobs } from "./jobs";
import { ArrowForwardIcon } from "@chakra-ui/icons";

// const offices = ["Any", "Remote", "Palo Alto", "San Francisco", "Memphis", "Atlanta", "London", "Bay Area"];
// const departments = ["Any", "Research, Engineering & Product", "Human Data", "Data Center Operations", "Other"];

const CareerPage = () => {
  const [selectedOffice, setSelectedOffice] = useState("Any");
  const [selectedDepartment, setSelectedDepartment] = useState("Any");
  const router = useRouter();

  const offices = ["Any", "Pune, India", "United States"];
  const departments = [
    "Any",
    "Research, Engineering & Product",
    "Data Center Operations",
    "Product Management",
    "Software Development",
  ];

  const filteredJobs = jobs.filter((job) => {
    const matchesOffice =
      selectedOffice === "Any" || job.location.includes(selectedOffice) || job.country.includes(selectedOffice);
    const matchesDepartment =
      selectedDepartment === "Any" || job.department === selectedDepartment;
    return matchesOffice && matchesDepartment;
  });

  const handleJobClick = (id) => {
    router.push(`/job/${id}`); // Navigate to job details page
  };

  return (
    <>
      <Box
        p={5}
        w={"100%"}
        bg={"black"}
        fontFamily={"aktiv-grotesk ,sans-serif"}
      >
        <VStack mx={'3rem'} spacing={8} align="center" mt={{ md: "5rem", base: "2.5rem" }}>
          <Heading
            as="h1"
            textAlign={"center"}
            fontWeight={"300"}
            fontSize={{ md: "1.8rem", base: "0.9rem" }}
            color="#9fa1a3"
          >
            Careers at hushh.ai
          </Heading>
          <Text
            fontSize={{ md: "3.5rem", base: "1.75rem" }}
            fontWeight={"300"}
            textAlign={"center"}
            color="#fff"
          >
            Build AI That Advances Humanity
          </Text>

          <HStack mt={{md:'6rem',base:'3rem'}} w={"100%"} gap={{ md: "1.25rem", base: "0.5rem" }}>
            <Text
              color={"#fff"}
              fontWeight={"500"}
              lineHeight={"1.2"}
              letterSpacing={"-0.25px"}
              fontSize={{ md: "1.5rem", base: "0.75rem" }}
            >
              Work at hushh.ai
            </Text>
            <Divider height={"1px"} stroke={"#9fa1a3"} />
            <Text
              color={"#fff"}
              fontWeight={"500"}
              lineHeight={"1.2"}
              letterSpacing={"-0.25px"}
              fontSize={{ md: "1.5rem", base: "0.75rem" }}
              textStyle={"underline"}
            >
              View open roles
            </Text>
          </HStack>

          <Box
            bg="black"
            color="white"
            // minH="100vh"
            w="100%"
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="flex-start"
            textAlign="left"
          >
            {/* Text Block */}
            <Text
              fontSize={{ md: "1.15rem", base: "0.65rem" }}
              fontWeight="500"
              color="#e7e8e8"
              flex="0.4"
              display="flex"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              Why Hushh ?
            </Text>

            {/* Content Block */}
            <VStack
              color="#ccc"
              fontSize={{ md: "1rem", base: "0.65rem" }}
              lineHeight={{ md: "2rem", base: "0.9rem" }}
              flex="0.6"
              align="start"
              spacing={4}
              // maxW="600px"
              display="flex"
              justifyContent="flex-start"
              alignItems="flex-start"
              textAlign="left"
            >
              <Text
                fontWeight="400"
                fontSize={{ md: "1rem", base: "0.65rem" }}
                display="flex"
                justifyContent="flex-start"
                alignItems="flex-start"
                textAlign="left"
              >
                At Hushh, you’ll join an innovative, ambitious startup that values creativity, perseverance, and teamwork. We believe in the transformational power of personal data in the hands of the individual and are committed to building a platform that champions this belief. As part of our team, you’ll have the rare opportunity to shape something meaningful from its inception.
              </Text>

              <Text fontWeight="400">
              Hushh is an equal opportunity employer, championing inclusivity and diversity. We welcome all qualified applicants irrespective of race, religion, gender, sexual orientation, age, disability, or veteran status.
              </Text>

              {/* <List
                spacing={2}
                display="flex"
                flexDirection="column"
                fontWeight="400"
                justifyContent="flex-start"
                alignItems="flex-start"
                textAlign="left"
              >
                <ListItem>
                  • Competitive cash and equity-based compensation
                </ListItem>
                <ListItem>• Medical, dental, and vision insurance</ListItem>
                <ListItem>
                  • Unlimited paid time off subject to prior approval
                </ListItem>
                <ListItem>• Visa sponsorship</ListItem>
                <ListItem>• Life and AD&D insurance</ListItem>
                <ListItem>
                  • Short-term and long-term disability insurance
                </ListItem>
                <ListItem>• 401(k) plan</ListItem>
              </List> */}
            </VStack>
          </Box>

          <Box
            bg="black"
            color="white"
            minH="100vh"
            w="100%"
            px={{ base: 4, md: 8 }}
            py={{ base: 6, md: 12 }}
          >
            {/* Header Section */}
            <Box
              mb={8}
              display={"flex"}
              flexDirection={"row"}
              gap={{ md: "2rem", base: "0.75rem" }}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Text
                fontSize={{ base: "xl", md: "3xl" }}
                fontWeight="bold"
                mb={2}
                textAlign="left"
              >
                Locations
              </Text>
              <Divider height={"1px"} borderColor="#9fa1a3" />
            </Box>

            {/* Main Content */}
            <Box
              display="flex"
              mt={{ md: "6rem", base: "2.2rem" }}
              flexDirection={{ base: "column", md: "row" }}
            >
              {/* Left Section */}
              <Box
                flex={0.3}
                mb={{ base: 6, md: 0 }}
                textAlign={{ base: "center", md: "left" }}
              >
                <Text fontSize={{ base: "sm", md: "md" }} color="#e7e8e8">
                  US, India
                </Text>
              </Box>

              {/* Right Section */}
              <Box flex={0.7} pl={{ md: 8, base: "0" }}>
                <VStack spacing={6} align="start">
                  <Text fontSize={{ base: "sm", md: "lg" }} color="#ccc">
                    We are currently hiring in downtown US, India. Although we
                    prefer to work in-person, we also offer remote work
                    opportunities for exceptional candidates.
                  </Text>

                  {/* Grid of Locations */}
                  <SimpleGrid
                    columns={{ base: 1, md: 3 }}
                    spacing={{ base: 4, md: 6 }}
                    w="100%"
                    mt={{ md: "2.5rem", base: "1.2rem" }}
                  >
                    {/* Palo Alto */}
                    <Box>
                      <Text
                        fontSize={{ base: "md", md: "lg" }}
                        fontWeight="bold"
                        mb={2}
                      >
                        United States
                      </Text>
                      <Text fontSize={{ base: "sm", md: "md" }} color="#aaa">
                        Our US office houses the majority of our core
                        research teams including our pre-training,
                        post-training, and vision teams.
                      </Text>
                    </Box>

                    {/* San Francisco */}
                    <Box>
                      <Text
                        fontSize={{ base: "md", md: "lg" }}
                        fontWeight="bold"
                        mb={2}
                      >
                        Pune, India
                      </Text>
                      <Text fontSize={{ base: "sm", md: "md" }} color="#aaa">
                        Our infrastructure team takes care of our large compute
                        clusters and is predominantly located in Pune, Maharashtra, India.
                      </Text>
                    </Box>
                  </SimpleGrid>
                </VStack>
              </Box>
            </Box>
          </Box>

          <Box
            bg="black"
            color="white"
            minH="100vh"
            w="100%"
            px={{ base: 4, md: 8 }}
            py={{ base: 6, md: 12 }}
          >
            {/* Header Section */}
            <Box
              w={"100%"}
              mb={8}
              display={"flex"}
              flexDirection={"row"}
              gap={{ md: "2rem", base: "0.75rem" }}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Text
                fontSize={{ base: "xl", md: "3xl" }}
                fontWeight="bold"
                mb={2}
                textAlign="left"
              >
                Interview process
              </Text>
              <Divider height={"1px"} borderColor="#9fa1a3" />
            </Box>

            {/* Main Content */}
            <Box
              display="flex"
              mt={{ md: "6rem", base: "2.2rem" }}
              flexDirection={{ base: "column", md: "row" }}
            >
              {/* Left Section */}
              <Box
                flex={0.3}
                mb={{ base: 6, md: 0 }}
                textAlign={{ base: "center", md: "left" }}
              >
                <Text fontSize={{ base: "sm", md: "md" }} color="#e7e8e8">
                  US, India
                </Text>
              </Box>

              {/* Right Section */}
              <Box flex={0.7} pl={{ md: 8, base: "0" }}>
                <VStack spacing={6} align="start">
                  <Text fontSize={{ base: "sm", md: "lg" }} color="#ccc">
                    We are currently hiring in downtown US, India. Although we
                    prefer to work in-person, we also offer remote work
                    opportunities for exceptional candidates.
                  </Text>

                  {/* Grid of Locations */}
                  <SimpleGrid
                    columns={{ base: 1, md: 3 }}
                    spacing={{ base: 4, md: 6 }}
                    w="100%"
                    mt={{ md: "2.5rem", base: "1.2rem" }}
                  >
                    {/* Palo Alto */}
                    <Box>
                      <Text
                        fontSize={{ base: "md", md: "lg" }}
                        fontWeight="bold"
                        mb={2}
                      >
                        US, India
                      </Text>
                      <Text fontSize={{ base: "sm", md: "md" }} color="#aaa">
                        Our India office houses the majority of our core
                        research teams including our pre-training,
                        post-training, and vision teams.
                      </Text>
                    </Box>

                    {/* San Francisco */}
                    <Box>
                      <Text
                        fontSize={{ base: "md", md: "lg" }}
                        fontWeight="bold"
                        mb={2}
                      >
                        US
                      </Text>
                      <Text fontSize={{ base: "sm", md: "md" }} color="#aaa">
                        Our infrastructure team takes care of our large compute
                        clusters and is predominantly located in San Francisco.
                      </Text>
                    </Box>
                  </SimpleGrid>
                </VStack>
              </Box>
            </Box>
          </Box>
        </VStack>
      </Box>

      <Box
        mb={8}
        display={"flex"}
        flexDirection={"row"}
        gap={{ md: "2rem", base: "0.75rem" }}
        justifyContent={"center"}
        mx={'3rem'}
        alignItems={"center"}
      >
        <Text
          fontSize={{ base: "xl", md: "3xl" }}
          fontWeight="bold"
          mb={2}
          textAlign="left"
          color={"#fff"}
        >
          Open roles
        </Text>
        <Divider height={"1px"} borderColor="#9fa1a3" />
      </Box>

      <Box
        bg="black"
        color="white"
        minH="100vh"
        py={10}
        px={{ base: 4, md: 12 }}
      >
        <VStack align="start" spacing={4} mb={6}>
          <HStack spacing={4}>
            <Text fontWeight="bold">Office:</Text>
            {offices.map((office) => (
              <Button
                key={office}
                variant="ghost"
                color={selectedOffice === office ? "white" : "#aaa"}
                onClick={() => setSelectedOffice(office)}
              >
                {office}
              </Button>
            ))}
          </HStack>
          <Divider borderColor="#444" />
          <HStack spacing={4}>
            <Text fontWeight="bold">Department:</Text>
            {departments.map((department) => (
              <Button
                key={department}
                variant="ghost"
                color={selectedDepartment === department ? "white" : "#aaa"}
                onClick={() => setSelectedDepartment(department)}
              >
                {department}
              </Button>
            ))}
          </HStack>
          <Divider borderColor="#444" />
        </VStack>

        {/* Job Listings */}
        <VStack align="start" spacing={6}>
          {filteredJobs.length > 0 ? (
            <SimpleGrid columns={{ base: 1, md: 1 }} spacing={4} w="100%">
              {filteredJobs.map((job) => (
                <Flex
                  key={job.id}
                  border="1px solid #444"
                  p={4}
                  cursor="pointer"
                  onClick={() => handleJobClick(job.id)}
                  _hover={{ borderColor: "white" }}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box flex="0.3">
                    <Text fontWeight="bold" color="#aaa">
                      {job.department}
                    </Text>
                  </Box>
                  <Box
                    flex="0.7"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box>
                      <Text fontWeight="bold">{job.title}</Text>
                      <Text fontSize="sm" color="#aaa">
                        {job.location}
                      </Text>
                    </Box>
                    <ArrowForwardIcon color="#aaa" />
                  </Box>
                </Flex>
              ))}
            </SimpleGrid>
          ) : (
            <Text color="#aaa">No jobs found for the selected filters.</Text>
          )}
        </VStack>
      </Box>
    </>
  );
};

export default CareerPage;
