import { allBlogs } from "contentlayer/generated";
import ContactForm from "../_components/features/contactForm";
import HushhBlogsContent from "../_components/Blog/HushhBlogsContent";
import { siteMetadata } from "../sitemetadata";
import { Heading, Text, Container } from "@chakra-ui/react"; // Added imports for Chakra UI

export const metadata = {
  title: "Hushh.ai Blog | Data Privacy, AI & User Control Insights", // Updated
  description: "Explore the latest articles from Hushh.ai on data privacy, user-controlled data, AI-powered personalization, ethical AI, and the future of digital identity.", // Updated
  keywords: // Optional: can refine keywords if needed, current ones are broad
    "hushh blog, data privacy, user-controlled data, AI personalization, ethical AI, digital identity, privacy-preserving technology, data monetization",
  canonical: "https://www.hushh.ai/hushhBlogs",
  alternates: {
    canonical: "https://www.hushh.ai/hushhBlogs",
  },
  openGraph: {
    title: "Hushh.ai Blog | Data Privacy, AI & User Control Insights", // Updated
    description: "Explore the latest articles from Hushh.ai on data privacy, user-controlled data, AI-powered personalization, ethical AI, and the future of digital identity.", // Updated
    url: "https://www.hushh.ai/hushhBlogs",
    type: "website",
    images: [ // Assuming siteMetadata.socialBanner is appropriate, otherwise use a generic blog banner
      {
        url: siteMetadata.socialBanner,
        width: 1200,
        height: 630,
        alt: "Hushh.ai Blog", // Updated alt
      },
    ],
  },
};

export default function HushhBlogs() {
  return (
    <Container maxW="container.xl" py={10}>
      <Heading as="h1" size="2xl" mb={4} textAlign="center">
        Hushh.ai Blog: Insights on Data Privacy, AI & More
      </Heading>
      <Text fontSize="lg" mb={8} textAlign="center">
        Welcome to the Hushh.ai blog. Discover expert articles and thought leadership on the evolving landscape of data privacy,
        the power of user-controlled data, advancements in AI-powered personalization, and our commitment to ethical AI.
        Stay informed and empowered in your digital life.
      </Text>
      <HushhBlogsContent blogs={allBlogs} />
      {/* ContactForm might be better on a dedicated contact page or in the footer unless specifically desired here */}
      {/* <ContactForm /> */}
    </Container>
  );
}
