import { notFound } from "next/navigation";
import { Box, ListItem, Text, UnorderedList, VStack } from "@chakra-ui/react";
import ContentWrapper from "../../_components/layout/ContentWrapper";
import { jobs } from "../../_components/career/jobs";
import { MotionSection } from "../../_components/motion/SectionReveal";
import DeferredIframe from "../../_components/primitives/DeferredIframe";

export function generateStaticParams() {
  return jobs.map((job) => ({ id: job.id.toString() }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const job = jobs.find((entry) => entry.id.toString() === id);

  if (!job) {
    return {
      title: "Role not found | Hushh Careers",
      description: "This role is no longer available on the Hushh careers board.",
    };
  }

  return {
    title: `${job.title} | Hushh Careers`,
    description: `${job.title} in ${job.location}. Explore responsibilities, qualifications, and the application workflow at Hushh.`,
    alternates: {
      canonical: `https://www.hushh.ai/job/${job.id}`,
    },
    openGraph: {
      title: `${job.title} | Hushh Careers`,
      description: `${job.title} in ${job.location}. Explore responsibilities, qualifications, and the application workflow at Hushh.`,
      url: `https://www.hushh.ai/job/${job.id}`,
    },
  };
}

export default async function JobDetailPage({ params }) {
  const { id } = await params;
  const job = jobs.find((entry) => entry.id.toString() === id);

  if (!job) {
    notFound();
  }

  const jobRole = job.title || "";
  const baseFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSeWzoc7AsiVKm4IX3pCxmHmiJY2OMA7Ulx_9DW6oHsQZPkrRg/viewform?embedded=true";
  const formUrl = `${baseFormUrl}&entry.472327161=${encodeURIComponent(jobRole)}`;

  return (
    <ContentWrapper surface="contrast">
      <Box bg="black" color="white" minH="100%">
        <MotionSection as="div" family="marketing">
        <Box className="gradient-bg" py={{ md: 40, base: 20 }} px={{ base: 6, md: 12 }}>
          <VStack align="start" spacing={4}>
            <Text fontSize={{ base: "xl", md: "4xl" }} fontWeight="bold">
              {job.title}
            </Text>
            <Text fontSize="lg">{job.location}</Text>
          </VStack>
        </Box>
        </MotionSection>

        <MotionSection as="div" family="marketing" delay={0.04}>
        <Box py={10} px={{ base: 6, md: 12 }} fontSize={{ md: "1.1rem", base: "0.62rem" }} bg="white" color="black">
          <VStack align="start" spacing={6}>
            <Box>
              <Text fontSize="xl" fontWeight="bold" mb={4}>
                About the Company
              </Text>
              <Text>{job.aboutCompany}</Text>
            </Box>
            <Box>
              <Text fontSize="xl" fontWeight="bold" mb={4}>
                Why Hushh ?
              </Text>
              <Text>
                At Hushh, you&apos;ll join an innovative, ambitious startup that values creativity, perseverance, and teamwork.
                We believe in the transformational power of personal data in the hands of the individual and are committed to
                building a platform that champions this belief. As part of our team, you&apos;ll have the rare opportunity to
                shape something meaningful from its inception.
              </Text>
              <Text>
                Hushh is an equal opportunity employer, championing inclusivity and diversity. We welcome all qualified applicants
                irrespective of race, religion, gender, sexual orientation, age, disability, or veteran status.
              </Text>
            </Box>
            <Box>
              <Text fontWeight="bold" mb={4}>
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
                {job.additionalRequirements.length > 0
                  ? job.additionalRequirements.map((item, index) => <ListItem key={index}>{item}</ListItem>)
                  : job.personalRequirements.map((item, index) => <ListItem key={index}>{item}</ListItem>)}
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
        </MotionSection>

        <MotionSection as="div" family="marketing" delay={0.08}>
        <Box py={10} px={{ base: 6, md: 12 }} bg="gray.100" color="black">
          <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" mb={6}>
            Apply for this Position
          </Text>
          <Box minH={{ md: "160vh", base: "180vh" }}>
            <DeferredIframe
              src={formUrl}
              minHeight="100%"
              height="100%"
              title="Job Application Form"
              placeholder="The application form will load as you reach it."
            />
          </Box>
        </Box>
        </MotionSection>
      </Box>
    </ContentWrapper>
  );
}
