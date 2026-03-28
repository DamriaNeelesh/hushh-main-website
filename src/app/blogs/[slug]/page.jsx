import { siteMetadata } from "../../sitemetadata";
import { allBlogs, getBlogBySlug } from "../../../lib/content/blog-registry";
import Image from "next/image";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { Box, Container, Heading, Text } from "@chakra-ui/react";
import ClientBlogContent from "../../_components/Blog/ClientBlogContent";
import RenderContent from "../../_components/Blog/RenderContent";
import JsonLdScript from "../../_components/seo/JsonLdScript";
import { calculateReadingTime } from "../../../lib/utils";
import {
  formatContentDate,
  getContentDateIso,
  getContentDateTimestamp,
} from "../../../lib/content/date-utils";
import { buildPageMetadata, resolveCanonicalUrl } from "../../../lib/seo/pageMetadata";

const ContactForm = dynamic(() => import("src/app/_components/features/contactForm"), {
  loading: () => <div className="h-24" aria-hidden="true" />,
});

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
        .sort((a, b) => getContentDateTimestamp(b.publishedAt) - getContentDateTimestamp(a.publishedAt))
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
    slug: blog.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);
  
  if (!blog) {
    return {
      title: "Blog Not Found | Hushh.ai",
      description: "The blog post you're looking for does not exist."
    };
  }

  // Base metadata
  const publicationDate = getContentDateIso(blog.publishedAt);
  const modificationDate = getContentDateIso(blog.updatedAt || blog.publishedAt) || publicationDate;
  
  // Get image for metadata
  let imageUrl = siteMetadata.socialBanner;
  if (blog.image?.filePath) {
    imageUrl = `${siteMetadata.siteUrl}${blog.image.filePath.replace("../public", "")}`;
  }

  return buildPageMetadata({
    title: blog.title,
    description: blog.description,
    pathname: `/blogs/${slug}`,
    image: imageUrl,
    type: "article",
    keywords: blog.tags,
    openGraph: {
      ...(publicationDate ? { publishedTime: publicationDate } : {}),
      ...(modificationDate ? { modifiedTime: modificationDate } : {}),
      locale: "en_US",
      authors: [blog.author || siteMetadata.author],
    },
    twitter: {
      images: [imageUrl],
    },
  });
}

export default async function BlogPage({ params }) {
  try {
    const { slug } = await params;
    const blog = getBlogBySlug(slug);
    
    if(!blog){
      notFound();
    }

    // Format date to match Apple's style: "31 March 2025"
    const publicationDate = getContentDateIso(blog.publishedAt);
    const modificationDate = getContentDateIso(blog.updatedAt || blog.publishedAt) || publicationDate;
    const formattedDate = formatContentDate(blog.publishedAt, "d MMMM yyyy", "Recent post");
    
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
      ...(publicationDate ? { "datePublished": publicationDate } : {}),
      ...(modificationDate ? { "dateModified": modificationDate } : {}),
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
    const { Content, ...blogData } = blog;

    const enhancedBlog = {
      ...blogData,
      image: {
        ...blog.image,
        filePath: blog.image?.filePath?.replace("../public", "") || DEFAULT_BLOG_IMAGE
      },
      relatedPosts
    };

    return (
      <>
        {/* JSON-LD structured data for SEO */}
        <JsonLdScript data={{ ...jsonLd, mainEntityOfPage: resolveCanonicalUrl(`/blogs/${slug}`) }} />
        
        {/* Main blog content component */}
        <ClientBlogContent 
          blog={enhancedBlog} 
          formattedDate={formattedDate} 
          readingTime={readingTime}
          isUpdate={isUpdate}
          articleContent={<RenderContent blog={blog} />}
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
