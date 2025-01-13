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

const offices = ["Any", "Remote", "United States", "Pune, India"];
const departments = ["Any","SDE-1", "Product Management","Software Development","Research, Engineering & Product", "Human Data", "Data Center Operations", "Other"];

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
  const [selectedOffice, setSelectedOffice] = useState("Any");
  const [selectedDepartment, setSelectedDepartment] = useState("Any");

  // Filter jobs based on selected filters
  const filteredJobs = jobs.filter((job) => {
    const matchesOffice =
      selectedOffice === "Any" || job.location.includes(selectedOffice);
    const matchesDepartment =
      selectedDepartment === "Any" || job.department === selectedDepartment;
    return matchesOffice && matchesDepartment;
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
      {/* Office Filter */}
      <VStack align="start" spacing={4} mb={6}>
        <HStack spacing={4} flexWrap="wrap">
          <Text fontWeight="bold" fontSize={{ base: "sm", md: "md" }}>
            Office:
          </Text>
          {offices.map((office) => (
            <Button
              key={office}
              variant="ghost"
              color={selectedOffice === office ? "white" : "#aaa"}
              fontWeight={selectedOffice === office ? "bold" : "normal"}
              _hover={{ color: "white" }}
              onClick={() => setSelectedOffice(office)}
            >
              {office}
            </Button>
          ))}
        </HStack>
        <Divider borderColor="#444" />
      </VStack>

      {/* Department Filter */}
      <VStack align="start" spacing={4} mb={6}>
        <HStack spacing={4} flexWrap="wrap">
          <Text fontWeight="bold" fontSize={{ base: "sm", md: "md" }}>
            Department:
          </Text>
          {departments.map((department) => (
            <Button
              key={department}
              variant="ghost"
              color={selectedDepartment === department ? "white" : "#aaa"}
              fontWeight={selectedDepartment === department ? "bold" : "normal"}
              _hover={{ color: "white" }}
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
        <Text fontWeight="bold" fontSize={{ base: "lg", md: "xl" }}>
          Engineering
        </Text>
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
