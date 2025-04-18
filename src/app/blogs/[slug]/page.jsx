import { siteMetadata } from "../../sitemetadata";
import { allBlogs } from "contentlayer/generated";
import { slug } from "github-slugger";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Box, Container, Flex, Heading } from "@chakra-ui/react";
import ContactForm from "src/app/_components/features/contactForm";
import RecentPosts from "src/app/_components/blogHome/RecentPosts";
import Script from "next/script";
import { format } from "date-fns";
import ClientBlogContent from "../../_components/Blog/ClientBlogContent";
import { calculateReadingTime } from "@/lib/utils";

// Function to generate related posts
function getRelatedPosts(currentBlog, allBlogs) {
  // First, try to find posts with the same primary tag
  const primaryTag = currentBlog.tags[0];
  
  let relatedByTag = allBlogs.filter(blog => 
    blog._id !== currentBlog._id && 
    blog.tags.includes(primaryTag)
  );
  
  // If we don't have at least 2 related posts by tag, add recent posts
  if (relatedByTag.length < 2) {
    const recentPosts = allBlogs
      .filter(blog => 
        blog._id !== currentBlog._id && 
        !relatedByTag.some(related => related._id === blog._id)
      )
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
      .slice(0, 3 - relatedByTag.length);
      
    relatedByTag = [...relatedByTag, ...recentPosts];
  }
  
  // Limit to 3 posts maximum
  return relatedByTag.slice(0, 3).map(blog => ({
    title: blog.title,
    description: blog.description,
    slug: blog.url,
    date: blog.publishedAt,
    image: blog.image.filePath.replace("../public", "")
  }));
}

export function generateStaticParams() {
  return allBlogs.map((blog) => ({ slug: blog._raw.flattenedPath }));
}

export function generateMetadata({ params }) {
  const blog = allBlogs.find((blog) => blog._raw.flattenedPath === params.slug);
  if (!blog) {
    return;
  }

  const publishedAt = new Date(blog.publishedAt).toISOString();
  const modifiedAt = new Date(blog.updatedAt || blog.publishedAt).toISOString();

  let imageList = siteMetadata.socialBanner ? [siteMetadata.socialBanner] : [];
  if (blog.image) {
    imageList =
      typeof blog.image.filePath === "string"
        ? [siteMetadata.siteUrl + blog.image.filePath.replace("../public", "")]
        : blog.image;
  }
  const ogImages = imageList.map((img) => {
    return { url: img.includes("http") ? img : siteMetadata.siteUrl + img };
  });

  const authors = blog?.author ? [blog.author] : [siteMetadata.author];

  return {
    title: blog.title,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      url: siteMetadata.siteUrl + blog.url,
      siteName: siteMetadata.title,
      locale: "en_US",
      type: "article",
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      images: ogImages,
      authors: authors.length > 0 ? authors : [siteMetadata.author],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
      images: ogImages,
    },
  };
}

export default function BlogPage({ params }) {
  const blog = allBlogs.find((blog) => blog._raw.flattenedPath === params.slug);

  if(!blog){
    notFound();
  }

  // Format date to match Apple's style: "31 March 2025"
  const formattedDate = format(new Date(blog.publishedAt), "d MMMM yyyy");
  
  // Calculate reading time
  const readingTime = calculateReadingTime(blog.body.raw);

  // Get related posts
  const relatedPosts = getRelatedPosts(blog, allBlogs);

  let imageList = siteMetadata.socialBanner ? [siteMetadata.socialBanner] : [];
  if (blog.image) {
    imageList =
      typeof blog.image.filePath === "string"
        ? [siteMetadata.siteUrl + blog.image.filePath.replace("../public", "")]
        : blog.image;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": blog.title,
    "description": blog.description,
    "image": imageList,
    "datePublished": new Date(blog.publishedAt).toISOString(),
    "dateModified": new Date(blog.updatedAt || blog.publishedAt).toISOString(),
    "author": [{
        "@type": "Person",
        "name": blog?.author ? blog.author : siteMetadata.author,
        "url": siteMetadata.twitter || "",
      }]
  }

  // Check if the tag is an update type for display
  const isUpdate = blog.tags[0].toLowerCase().includes('update') || 
    blog.tags[0].toLowerCase() === 'press release' || 
    blog.tags[0].toLowerCase() === 'quick read';

  // Prepare the enhanced blog content
  const enhancedBlog = {
    ...blog,
    content: blog.body.raw, // Pass raw content for MDX rendering
    relatedPosts: relatedPosts,
    // You can add any additional fields for the blog here
  };

  // Pass all the necessary data to the client component
  return (
    <>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        strategy={'afterInteractive'}
      />
      
      <ClientBlogContent 
        blog={enhancedBlog}
        formattedDate={formattedDate}
        readingTime={readingTime}
        isUpdate={isUpdate}
        allBlogs={allBlogs}
        params={params}
      />
      
      <Box my="20">
        <Container maxW="1180px">
          <Heading
            as="h2"
            fontSize={{ base: "2xl", md: "3xl" }}
            fontWeight="semibold"
            mb="10"
            textAlign="center"
          >
            Related Articles
          </Heading>
          <RecentPosts blogs={allBlogs.filter(b => relatedPosts.some(rp => rp.slug === b.url))} />
        </Container>
      </Box>
      
      <ContactForm />
    </>
  );
}
