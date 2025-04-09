import { getServerSideSitemap } from 'next-sitemap';
import { generateSitemapData } from '../_utilities/generateSitemap';

export async function GET() {
  // Generate sitemap data using our utility
  const fields = await generateSitemapData();

  // Return the sitemap XML
  return getServerSideSitemap(fields);
} 