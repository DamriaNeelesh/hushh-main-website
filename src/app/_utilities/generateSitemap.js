/**
 * Sitemap Generation Utility
 * This file contains functions to help with generating dynamic sitemaps
 */

// Get all product URLs for the sitemap
export const getProductUrls = async () => {
  // This could be replaced with an API call or CMS query in a real application
  const productPages = [
    'hushh-button',
    'hushh-vibe-search',
    'hushh-wallet-app',
    'hushh-valet-chat',
    'hushh-for-students',
    'concierge-app',
    'browser-companion',
  ];

  return productPages.map((slug) => ({
    loc: `https://www.hushh.ai/products/${slug}`,
    lastmod: new Date().toISOString(),
    changefreq: 'weekly',
    priority: 0.8,
  }));
};

// Get all blog URLs for the sitemap
export const getBlogUrls = async () => {
  // This could be replaced with an API call or CMS query in a real application
  const blogPaths = [
    // Add actual blog paths here
    'blog-1',
    'blog-2',
    'blog-3',
  ];

  return blogPaths.map((slug) => ({
    loc: `https://www.hushh.ai/blogs/${slug}`,
    lastmod: new Date().toISOString(),
    changefreq: 'weekly',
    priority: 0.7,
  }));
};

// Get main site URLs
export const getMainPageUrls = () => {
  return [
    {
      loc: 'https://www.hushh.ai',
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: 1.0,
    },
    {
      loc: 'https://www.hushh.ai/about',
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: 0.8,
    },
    {
      loc: 'https://www.hushh.ai/products',
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: 0.9,
    },
    {
      loc: 'https://www.hushh.ai/blogs',
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: 0.9,
    },
    {
      loc: 'https://www.hushh.ai/contact-us',
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: 0.7,
    },
    {
      loc: 'https://www.hushh.ai/career',
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: 0.6,
    },
    {
      loc: 'https://www.hushh.ai/legal',
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: 0.5,
    },
  ];
};

// Generate full sitemap data
export const generateSitemapData = async () => {
  const products = await getProductUrls();
  const blogs = await getBlogUrls();
  const mainPages = getMainPageUrls();

  return [...mainPages, ...products, ...blogs];
};

// Convert sitemap data to XML format
export const formatSitemapXml = (sitemapData) => {
  const xmlItems = sitemapData.map(
    (item) => `
    <url>
      <loc>${item.loc}</loc>
      <lastmod>${item.lastmod}</lastmod>
      <changefreq>${item.changefreq}</changefreq>
      <priority>${item.priority}</priority>
    </url>
  `
  );

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${xmlItems.join('')}
</urlset>`;
}; 