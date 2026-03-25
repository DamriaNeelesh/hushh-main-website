import { getServerSideSitemap } from 'next-sitemap';
import { developerDocs } from '../developers/docs.config';

export async function GET() {
  // Define your list of main static routes
  const mainRoutes = [
    '/',
    '/about',
    '/contact-us',
    '/career',
    '/demoBookingPage',
    '/developers',
    '/agents',
    '/hushh-press',
    '/privacy',
    '/terms',
  ];

  // Define product routes
  const productRoutes = [
    '/products/kai',
    '/products/hushh-wallet-app',
    '/products/hushh-button',
    '/products/browser-companion',
    '/products/hushh-vibe-search',
    '/products/hushh-for-students',
  ];

  // Combine all routes
  const developerRoutes = developerDocs.map((doc) => `/developers/${doc.slug}`);
  const routes = [...mainRoutes, ...productRoutes, ...developerRoutes];

  // Transform routes into the sitemap format
  const fields = routes.map((route) => {
    // Determine priority based on route importance
    let priority = 0.7;
    if (route === '/') priority = 1.0;
    if (route.startsWith('/products/')) priority = 0.9;
    if (route === '/about' || route === '/contact-us') priority = 0.8;
    if (route === '/developers' || route === '/agents') priority = 0.9;
    if (route.startsWith('/developers/')) priority = 0.8;

    return {
      loc: `https://www.hushh.ai${route}`,
      lastmod: new Date().toISOString(),
      changefreq: route === '/' ? 'daily' : 'weekly',
      priority: priority,
    };
  });

  return getServerSideSitemap(fields);
} 
