import { allBlogs } from "contentlayer/generated";
import HomeCoverSection from "../_components/blogHome/HomeCoverSection";
import FeaturedPosts from "../_components/blogHome/FeaturedPosts";
import RecentPosts from "../_components/blogHome/RecentPosts";
import ContactForm from "../_components/features/contactForm";
import Head from "next/head";

export const metadata = {
  title: "Hushh Blogs | Latest Insights and Articles",
  description:
    "Explore the latest articles on hushh covering technology and more. Stay updated with expert insights and trending topics.",
  keywords:
    "hushh blogs, technology insights, SEO, Data privacy, Data monetization , User-controlled data , Luxury consumers ,Sales agents , AI-powered personalization , Privacy-preserving technology , Decentralized data , Ethical advertising , Data marketplace ,Human-AI interaction , How to monetize my data, Secure data sharing for luxury brands, AI for personalized marketing to high-end consumers , Decentralized data ownership solutions data monetization, trending articles, expert insights",
  canonical: "https://hushh.ai/hushhBlogs",
  alternates: {
    canonical: "https://hushh.ai/hushhBlogs",
  },
  openGraph: {
    title: "Hushh Blogs | Latest Insights and Articles",
    description:
    "Explore the latest articles on hushh covering technologyand more. Stay updated with expert insights and trending topics.",
    url: "https://hushh.ai/hushhBlogs",
    // images: [
    //   {
    //     url: "/path/to/developer-api-og-image.jpg",
    //     width: 1200,
    //     height: 630,
    //     alt: "Hushh Developer APIs Image",
    //   },
    // ],
  },
};

export default function hushhBlogs() {
  
  return (
    <>
    <Head>
        <title>Hushh Blogs | Latest Insights and Articles</title>
        <meta
          name="description"
          content="Explore the latest articles on hushh covering technology, and more updates about our product. Stay updated with expert insights and trending topics."
        />
        <meta
          name="keywords"
          content="hushh blogs, technology insights, SEO, Data privacy, Data monetization , User-controlled data , Luxury consumers ,Sales agents , AI-powered personalization , Privacy-preserving technology , Decentralized data , Ethical advertising , Data marketplace ,Human-AI interaction , How to monetize my data, Secure data sharing for luxury brands, AI for personalized marketing to high-end consumers , Decentralized data ownership solutions data monetization, trending articles, expert insights"
        />
                <link rel="canonical" href="https://hushh.ai/hushhBlogs" />
                <meta property="og:url" content="https://hushh.ai/hushhBlogs" />

      </Head>
    <main className="flex flex-col mb-10 items-center justify-center">
      <HomeCoverSection blogs={allBlogs} />
      <FeaturedPosts blogs={allBlogs} />
      <RecentPosts blogs={allBlogs} />
    </main>
    <ContactForm/>
    </>
  )
}
