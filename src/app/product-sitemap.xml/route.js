import { getProductUrls } from '../_utilities/generateSitemap';
import { formatSitemapXml } from '../_utilities/generateSitemap';

export async function GET() {
  // Get all product URLs
  const productUrls = await getProductUrls();
  
  // Format as XML
  const sitemap = formatSitemapXml(productUrls);

  // Return the XML with proper content type
  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
} 