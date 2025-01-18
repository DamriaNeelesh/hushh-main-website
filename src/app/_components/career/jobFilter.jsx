import React, { useState } from "react";
import {
  Box,
  Text,
  VStack,
  HStack,
  Button,
  Divider,
  SimpleGrid,
  IconButton,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

const countries = ["Any", "India", "United States"];
const employmentTypes = ["Any", "Internship", "Full-time"];
const categories = [
  "Any",
  "Software Development",
  "Customer Success",
  "Data Science",
  "AI/ML",
  "Human Resources"
];


const jobs = [
  {
    id: 1,
    title: "Site Reliability Engineer (SRE)",
    location: "London, UK & San Francisco & Palo Alto, CA",
    department: "Research, Engineering & Product",
  },
  {
    id: 2,
    title: "Datacenter Infrastructure Engineer Lead",
    location: "United States",
    department: "Software Development",
  },
  {
    id: 3,
    title: "Electrical Engineer",
    location: "United States",
    department: "Data Center Operations",
  },
  {
    id: 4,
    title: "Mechanical Engineer (HVAC / Chilled Water)",
    location: "United States",
    department: "Data Center Operations",
  },
  {
    id: 5,
    title: "SDE - 1",
    location: "Pune, India",
    department: "Software Development",
  },
  {
    id: 6,
    title: "Product Management",
    location: "Pune, India",
    department: "Product Management",
  },
  {
    id: 7,
    title: "SDE - 1",
    location: "Seattle , US",
    department: "Software Development",
  },
  {
    id: 8,
    title: "Product Management",
    location: "Seattle , US",
    department: "Product Management",
  },
];

export default function JobFilter() {
  const [selectedCountry, setSelectedCountry] = useState("Any");
  const [selectedEmploymentType, setSelectedEmploymentType] = useState("Any");
  const [selectedCategory, setSelectedCategory] = useState("Any");
  // Filter jobs based on selected filters
  const filteredJobs = jobs.filter((job) => {
    const matchesCountry =
      selectedCountry === "Any" || job.location.includes(selectedCountry);
    const matchesEmploymentType =
      selectedEmploymentType === "Any" || job.employmentType === selectedEmploymentType;
    const matchesCategory =
      selectedCategory === "Any" || job.category === selectedCategory;
    return matchesCountry && matchesEmploymentType && matchesCategory;
  });

  return (
    <Box
    bg="black"
    color="white"
    minH="100vh"
    w="100%"
    px={{ base: 4, md: 8 }}
    py={{ base: 6, md: 12 }}
  >
    {/* Country Filter */}
    <VStack align="start" spacing={4} mb={6}>
      <HStack spacing={4} flexWrap="wrap">
        <Text fontWeight="bold" fontSize={{ base: "sm", md: "md" }}>
          Country:
        </Text>
        {countries.map((country) => (
          <Button
            key={country}
            variant="ghost"
            color={selectedCountry === country ? "white" : "#aaa"}
            fontWeight={selectedCountry === country ? "bold" : "normal"}
            _hover={{ color: "white" }}
            onClick={() => setSelectedCountry(country)}
          >
            {country}
          </Button>
        ))}
      </HStack>
      <Divider borderColor="#444" />
    </VStack>

    {/* Employment Type Filter */}
    <VStack align="start" spacing={4} mb={6}>
      <HStack spacing={4} flexWrap="wrap">
        <Text fontWeight="bold" fontSize={{ base: "sm", md: "md" }}>
          Employment Type:
        </Text>
        {employmentTypes.map((type) => (
           <Button
           key={type}
           variant="ghost"
           color={selectedEmploymentType === type ? "white" : "#aaa"}
           fontWeight={selectedEmploymentType === type ? "bold" : "normal"}
           _hover={{ color: "white" }}
           onClick={() => setSelectedEmploymentType(type)}
         >
           {type}
         </Button>
       ))}
     </HStack>
     <Divider borderColor="#444" />
   </VStack>

   {/* Category Filter */}
   <VStack align="start" spacing={4} mb={6}>
     <HStack spacing={4} flexWrap="wrap">
       <Text fontWeight="bold" fontSize={{ base: "sm", md: "md" }}>
         Category:
       </Text>
       {categories.map((category) => (
         <Button
           key={category}
           variant="ghost"
           color={selectedCategory === category ? "white" : "#aaa"}
           fontWeight={selectedCategory === category ? "bold" : "normal"}
           _hover={{ color: "white" }}
           onClick={() => setSelectedCategory(category)}
         >
           {category}
         </Button>
       ))}
     </HStack>
     <Divider borderColor="#444" />
   </VStack>
   <VStack align="start" spacing={6}>
        {filteredJobs.length > 0 ? (
          <SimpleGrid
            columns={{ base: 1, md: 2 }}
            spacing={4}
            w="100%"
            alignItems="start"
          >
            {filteredJobs.map((job) => (
              <HStack
                key={job.id}
                justifyContent="space-between"
                w="100%"
                borderBottom="1px solid #444"
                pb={2}
                spacing={4}
              >
                <VStack align="start" spacing={0}>
                  <Text fontWeight="bold" fontSize={{ base: "sm", md: "md" }}>
                    {job.title}
                  </Text>
                  <Text fontSize={{ base: "xs", md: "sm" }} color="#aaa">
                    {job.location}
                  </Text>
                </VStack>
                <IconButton
                  aria-label="Go"
                  icon={<ArrowForwardIcon />}
                  variant="ghost"
                  color="white"
                  _hover={{ bg: "gray.700" }}
                />
              </HStack>
            ))}
          </SimpleGrid>
        ) : (
          <Text color="#aaa">No jobs found for the selected filters.</Text>
        )}
      </VStack>
    </Box>
  );
}
