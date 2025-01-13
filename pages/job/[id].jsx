// /pages/job/[id].jsx
import { useRouter } from "next/router";
import { jobs } from "../../src/app/_components/career/jobs"; // Import the job data
import {
    Box,
    Text,
    VStack,
    UnorderedList,
    ListItem,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Button,
  } from "@chakra-ui/react";
  import emailjs from "@emailjs/browser";
import { useState } from "react";

const JobDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  // Find the job data based on the ID
  const job = jobs.find((job) => job.id === id);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    resumeLink: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      resumeLink: formData.resumeLink,
      jobTitle: job?.title,
      jobLocation: job?.location,
    };

    emailjs
      .send(
        "YOUR_SERVICE_ID", // Replace with your EmailJS Service ID
        "YOUR_TEMPLATE_ID", // Replace with your EmailJS Template ID
        templateParams,
        "YOUR_PUBLIC_KEY" // Replace with your EmailJS Public Key
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          alert("Application submitted successfully!");
        },
        (error) => {
          console.error("FAILED...", error);
          alert("There was an error submitting your application. Please try again.");
        }
      );
  };

  if (!job) {
    return (
      <Box bg="black" color="white" minH="100vh" p={10}>
        <Text>Job not found</Text>
      </Box>
    );
  }

  return (
    <Box bg="black"  color="white" minH="100vh" mx={'auto'}>
      <Box className="gradient-bg " py={20} px={{ base: 6, md: 12 }}>
        <VStack align="start" spacing={4}>
          <Text fontSize={{ base: "2xl", md: "4xl" }} fontWeight="bold">
            {job.title}
          </Text>
          <Text fontSize="lg">{job.location}</Text>
        </VStack>
      </Box>

      <Box py={10} px={{ base: 6, md: 12 }} fontSize={{md:'1.1rem',base:'0.62rem'}} bg="white" color="black">
        <VStack align="start" spacing={6}>
        <Box>
            <Text fontSize="xl" fontWeight="bold" mb={4}>
              About the Company
            </Text>
            <Text>We are a user data api (visa for data) business that Builds products and solutions helping our users organize, manage and extract meaningful value from their own data, including ai monetization options to turn their data into a financial asset.</Text>
            <Text>Our motto is 'Your Data, Your Business', and we prioritize ownership, observability, and control of your data and its privacy. With hushh, you can monetize your data while prioritizing your privacy preferences if you choose to, allowing your trusted brands to serve you via the best virtual and human assistants. </Text>
            <Text>Our mission is to help make “your” data “your” business. We do this by helping you extract meaningful insights & solutions from your most valuable personal data that helps you and your family understand the power that lies within your personal data once you start collecting, organizing and managing it as a personal asset on your own devices.</Text>
          </Box> 
          <Box>
            <Text fontSize="xl" fontWeight="bold" mb={4}>
              Why Hushh ?
            </Text>
            <Text>At Hushh, you’ll join an innovative, ambitious startup that values creativity, perseverance, and teamwork. We believe in the transformational power of personal data in the hands of the individual and are committed to building a platform that champions this belief. As part of our team, you’ll have the rare opportunity to shape something meaningful from its inception.</Text>
            <Text>Hushh is an equal opportunity employer, championing inclusivity and diversity. We welcome all qualified applicants irrespective of race, religion, gender, sexual orientation, age, disability, or veteran status.</Text>
          </Box> 
          <Box>
            <Text  fontWeight="bold" mb={4}>
              Responsibilities
            </Text>
            <UnorderedList spacing={0}>
              {job.responsibilities.map((item, index) => (
                <ListItem key={index}>{item}</ListItem>
              ))}
            </UnorderedList>
          </Box>

          {job?.basicQualifications && job.basicQualifications.length > 0 && (
            <Box>
              <Text fontWeight="bold" mb={4}>
                Basic Qualifications
              </Text>
              <UnorderedList spacing={0}>
                {job.basicQualifications.map((item, index) => (
                  <ListItem key={index}>{item}</ListItem>
                ))}
              </UnorderedList>
            </Box>
          )}

          <Box>
            <Text fontSize="xl" fontWeight="bold" mb={4}>
              Additional Requirements
            </Text>
            <UnorderedList spacing={3}>
              {job.additionalRequirements.length > 0 ? (
                job.additionalRequirements.map((item, index) => (
                  <ListItem key={index}>{item}</ListItem>
                ))
              ) : (
                job.personalRequirements.map((item, index) => (
                  <ListItem key={index}>{item}</ListItem>
                ))
              )}
            </UnorderedList>
            {job.additionalRequirements.length > 0 && job.personalRequirements.length > 0 && (
              <UnorderedList spacing={3}>
                {job.personalRequirements.map((item, index) => (
                  <ListItem key={index}>{item}</ListItem>
                ))}
              </UnorderedList>
            )}
          </Box>
        </VStack>
      </Box>

      <Box py={10} px={{ base: 6, md: 12 }} bg="gray.100" color="black">
        <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" mb={6}>
          Apply for this Position
        </Text>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>First Name</FormLabel>
              <Input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Last Name</FormLabel>
              <Input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Phone</FormLabel>
              <Input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Resume/CV Link</FormLabel>
              <Input
                type="url"
                name="resumeLink"
                value={formData.resumeLink}
                onChange={handleChange}
                placeholder="Enter a link to your resume or CV"
              />
            </FormControl>

            <Button type="submit" colorScheme="blue" width="full">
              Submit Application
            </Button>
          </VStack>
        </form>
      </Box>

    </Box>
  );
};

export default JobDetailPage;
