import dynamic from "next/dynamic";
import { allBlogSummaries } from "../../lib/content/blog-registry";
import HushhBlogsContent from "../_components/Blog/HushhBlogsContent";
import { siteMetadata } from "../sitemetadata";
import ContentWrapper from "../_components/layout/ContentWrapper";

const ContactForm = dynamic(() => import("../_components/features/contactForm"), {
  loading: () => <div className="h-24" aria-hidden="true" />,
});

export const metadata = {
  title: "Hushh Newsroom | Latest Insights and Updates",
  description:
    "Explore the latest news, articles, and updates from Hushh covering technology, privacy, and data solutions. Stay informed with expert insights and product announcements.",
  keywords:
    "hushh newsroom, technology insights, data privacy, data monetization, user-controlled data, luxury consumers, AI-powered personalization, privacy-preserving technology, decentralized data, ethical advertising, data marketplace, human-AI interaction",
  alternates: {
    canonical: "https://www.hushh.ai/hushhBlogs",
  },
  openGraph: {
    title: "Hushh Newsroom | Latest Insights and Updates",
    description:
      "Explore the latest news, articles, and updates from Hushh covering technology, privacy, and data solutions. Stay informed with expert insights and product announcements.",
    url: "https://www.hushh.ai/hushhBlogs",
    type: "website",
    images: [
      {
        url: siteMetadata.socialBanner,
        width: 1200,
        height: 630,
        alt: "Hushh Newsroom",
      },
    ],
  },
};

export default function HushhBlogs() {
  return (
    <ContentWrapper>
      <HushhBlogsContent blogs={allBlogSummaries} />
      <ContactForm />
    </ContentWrapper>
  );
}
