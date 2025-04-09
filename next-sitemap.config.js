/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.hushh.ai",
  changefreq: 'daily',
  priority: 0.7,
  exclude: [
    "/icon.svg", 
    "/apple-icon.png", 
    "/manifest.webmanifest", 
    "/tags/*", 
    "/api/*", 
    "/404",
    "/500",
    "/google*.html",
    "/favicon.ico",
    "/_next/*",
    "/*.js",
    "/*.json",
  ],
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  sitemapSize: 5000,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/_next/*",
          "/api/*",
          "/404",
          "/500",
          "/google*.html",
        ],
      },
    ],
    additionalSitemaps: [
      'https://www.hushh.ai/sitemap.xml',
      'https://www.hushh.ai/server-sitemap.xml',
    ],
  },
  transform: async (config, path) => {
    // Custom transform function (if needed in the future)
    // Use this to dynamically set priority for different pages
    if (path === '/') {
      return {
        loc: path,
        changefreq: config.changefreq,
        priority: 1.0,
        lastmod: new Date().toISOString(),
      };
    }
    
    // Blog posts and product pages should have higher priority
    if (path.includes('/blogs/') || path.includes('/products/')) {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      };
    }

    // Default transformation for other pages
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    };
  },
};
