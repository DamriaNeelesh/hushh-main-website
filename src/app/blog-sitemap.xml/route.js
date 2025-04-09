import { getBlogUrls, formatSitemapXml } from '../_utilities/generateSitemap';

export async function GET() {
  // Get all blog URLs
  const blogUrls = await getBlogUrls();
  
  // Format as XML
  const sitemap = formatSitemapXml(blogUrls);

  // Return the XML with proper content type
  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
} 