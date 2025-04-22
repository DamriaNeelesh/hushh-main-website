import { siteMetadata } from "../../sitemetadata";
import { allBlogs } from "contentlayer/generated";
import { slug } from "github-slugger";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import ContactForm from "src/app/_components/features/contactForm";
import RecentPosts from "src/app/_components/blogHome/RecentPosts";
import Script from "next/script";
import { format } from "date-fns";
import ClientBlogContent from "../../_components/Blog/ClientBlogContent";
import { calculateReadingTime } from "../../../lib/utils";

// Default image path for blogs that don't have an image
const DEFAULT_BLOG_IMAGE = "/images/default-blog-img.jpg";

// Function to generate related posts
function getRelatedPosts(currentBlog, allBlogs) {
  try {
    // First, try to find posts with the same primary tag
    const primaryTag = currentBlog.tags && currentBlog.tags.length > 0 ? currentBlog.tags[0] : "";
    
    let relatedByTag = allBlogs.filter(blog => 
      blog._id !== currentBlog._id && 
      blog.tags && blog.tags.includes(primaryTag)
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
      image: blog.image?.filePath?.replace("../public", "") || DEFAULT_BLOG_IMAGE
    }));
  } catch (error) {
    console.error("Error generating related posts:", error);
    return [];
  }
}

// Generate static params for all blogs
export async function generateStaticParams() {
  return allBlogs.map((blog) => ({
    slug: blog._raw.flattenedPath,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const blog = allBlogs.find((blog) => blog._raw.flattenedPath === params.slug);
  
  if (!blog) {
    return {
      title: "Blog Not Found | Hushh.ai",
      description: "The blog post you're looking for does not exist."
    };
  }

  // Base metadata
  const publicationDate = new Date(blog.publishedAt).toISOString();
  const modificationDate = new Date(blog.updatedAt || blog.publishedAt).toISOString();
  
  // Get image for metadata
  let imageUrl = siteMetadata.socialBanner;
  if (blog.image?.filePath) {
    imageUrl = `${siteMetadata.siteUrl}${blog.image.filePath.replace("../public", "")}`;
  }
  
  return {
    title: blog.title,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      publishedTime: publicationDate,
      modifiedTime: modificationDate,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
      locale: "en_US",
      type: "article",
      authors: [blog.author || siteMetadata.author],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
      images: [imageUrl],
    },
    alternates: {
      canonical: `${siteMetadata.siteUrl}/blogs/${params.slug}`,
    },
  };
}

export default function BlogPage({ params }) {
  try {
    const blog = allBlogs.find((blog) => blog._raw.flattenedPath === params.slug);
    
    if(!blog){
      notFound();
    }

    // Format date to match Apple's style: "31 March 2025"
    const formattedDate = format(new Date(blog.publishedAt), "d MMMM yyyy");
    
    // Calculate reading time
    const readingTime = blog.readingTime?.text || 
                        `${calculateReadingTime(blog.body.raw)} min`;

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
    const isUpdate = blog.tags && blog.tags.length > 0 && (
      blog.tags[0].toLowerCase().includes('update') || 
      blog.tags[0].toLowerCase() === 'press release' || 
      blog.tags[0].toLowerCase() === 'quick read'
    );

    // Prepare the enhanced blog content with proper error handling
    const enhancedBlog = {
      ...blog,
      content: blog.body.raw, // Pass raw content for MDX rendering
      image: {
        ...blog.image,
        filePath: blog.image?.filePath?.replace("../public", "") || DEFAULT_BLOG_IMAGE
      },
      relatedPosts
    };

    return (
      <>
        {/* JSON-LD structured data for SEO */}
        <Script 
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        {/* Main blog content component */}
        <ClientBlogContent 
          blog={enhancedBlog} 
          formattedDate={formattedDate} 
          readingTime={readingTime}
          isUpdate={isUpdate}
          allBlogs={allBlogs}
          params={params}
        />
        
        {/* Contact form section */}
        <ContactForm />
      </>
    );
  } catch (error) {
    console.error("Error rendering blog page:", error);
    
    // Return an error state
    return (
      <Container maxW="1180px" py="16">
        <Box textAlign="center">
          <Heading as="h1" size="xl" mb="4">Something went wrong</Heading>
          <Text mb="6">We encountered an error loading this blog post. Please try again later.</Text>
          <Image 
            src={DEFAULT_BLOG_IMAGE}
            alt="Error loading blog"
            width={600}
            height={300}
            style={{ margin: '0 auto' }}
          />
        </Box>
      </Container>
    );
  }
}
