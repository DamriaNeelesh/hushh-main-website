/**
 * SEO Performance Utility Functions
 * This file contains utility functions to optimize SEO and performance across the site
 */

// Generates structured data for FAQ sections
export const generateFAQSchema = (faqItems) => {
  if (!faqItems || faqItems.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };
};

// Generates breadcrumb structured data
export const generateBreadcrumbSchema = (breadcrumbs) => {
  if (!breadcrumbs || breadcrumbs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  };
};

// Generates article structured data for blog posts
export const generateArticleSchema = (article) => {
  if (!article) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "datePublished": article.publishDate,
    "dateModified": article.modifiedDate || article.publishDate,
    "description": article.description,
    "image": article.image,
    "author": {
      "@type": "Person",
      "name": article.author.name,
      "url": article.author.url
    },
    "publisher": {
      "@type": "Organization",
      "name": "Hushh AI",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.hushh.ai/images/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": article.url
    }
  };
};

// Generate product structured data
export const generateProductSchema = (product) => {
  if (!product) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": product.image,
    "brand": {
      "@type": "Brand",
      "name": "Hushh AI"
    },
    "offers": {
      "@type": "Offer",
      "url": product.url,
      "priceCurrency": "USD",
      "price": product.price || "0",
      "availability": "https://schema.org/InStock"
    }
  };
};

// Generate optimized meta descriptions based on page type
export const generateMetaDescription = (type, data) => {
  if (!data) return "";

  switch (type) {
    case 'product':
      return `${data.name} - ${data.shortDescription}. Learn more about how Hushh AI's ${data.name} can help you take control of your data.`;
    case 'blog':
      return `${data.title} - ${data.excerpt}. Read more on Hushh.ai, the leading platform for data autonomy and privacy.`;
    case 'page':
      return `${data.title} | Hushh AI - Your Data Your Business. ${data.description}`;
    default:
      return data.description || "";
  }
};

// Generate canonical URL
export const getCanonicalUrl = (path) => {
  const baseUrl = "https://www.hushh.ai";
  if (!path) return baseUrl;
  
  // Normalize the path
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  return `${baseUrl}${normalizedPath}`;
};

// Create image optimization attributes for SEO
export const getImageProps = (src, alt, width = 1200, height = 630) => {
  return {
    src,
    alt,
    width,
    height,
    loading: "lazy",
    fetchPriority: "high",
    decoding: "async"
  };
}; 