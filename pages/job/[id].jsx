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
import Header from '../../src/app/_components/header'

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
    const fromName = `${formData.firstName} ${formData.lastName}`;
    const hasCoverLetter = formData.coverLetterLink && formData.coverLetterLink.trim() !== '';

    const templateParams = {
      // firstName: formData.firstName,
      // lastName: formData.lastName,
      to_name: 'Hiring Manager',
      from_name: fromName, // Concatenated firstName and lastName
      from_email: formData.email,
      phone: formData.phone,
      resume_link: formData.resumeLink,
      position: job?.title,
      location: job?.location,
      cover_letter_link: hasCoverLetter ? formData?.coverLetterLink : '', // Only include if present
    };

    emailjs
      .send(
        "service_tsuapx9", // Replace with your EmailJS Service ID
        "template_fx7ipta", // Replace with your EmailJS Template ID
        templateParams,
        "DtG13YmoZDccI-GgA" // Replace with your EmailJS Public Key
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
    <>
    <Header backgroundColor={'black'}/>
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
            <Text>{job.aboutCompany}</Text> {/* Display the aboutCompany field */}

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
            {job?.additionalRequirements?.length > 0 && job?.personalRequirements?.length > 0 && (
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
    </>
  );
};

export default JobDetailPage;
