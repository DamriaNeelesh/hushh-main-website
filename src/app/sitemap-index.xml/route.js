export async function GET() {
  // Current date for lastmod
  const date = new Date().toISOString();
  
  // Build the sitemap index XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://www.hushh.ai/sitemap.xml</loc>
    <lastmod>${date}</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://www.hushh.ai/server-sitemap.xml</loc>
    <lastmod>${date}</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://www.hushh.ai/product-sitemap.xml</loc>
    <lastmod>${date}</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://www.hushh.ai/blog-sitemap.xml</loc>
    <lastmod>${date}</lastmod>
  </sitemap>
</sitemapindex>`;

  // Return the XML with proper content type
  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
} 