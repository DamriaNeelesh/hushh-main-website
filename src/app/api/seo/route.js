import { NextResponse } from 'next/server';

export async function GET(request) {
  // Get the search params from the request URL
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const slug = searchParams.get('slug');
  
  if (!type) {
    return NextResponse.json({ error: 'Type parameter is required' }, { status: 400 });
  }
  
  let data = {};
  
  switch (type) {
    case 'product':
      data = await getProductSEOData(slug);
      break;
    case 'blog':
      data = await getBlogSEOData(slug);
      break;
    case 'page':
      data = await getPageSEOData(slug);
      break;
    default:
      return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 });
  }
  
  return NextResponse.json(data);
}

// Example function to get product SEO data
async function getProductSEOData(slug) {
  // This would typically fetch from a database or CMS
  const productSEOMap = {
    'hushh-button': {
      title: 'Hushh Button | One-Click Data Sharing Solution',
      description: 'Share your data securely with just one click. Hushh Button bridges the gap between your preferences and your favorite brands.',
      keywords: 'Hushh Button, Data Sharing, User Privacy, Personalized Experiences',
      image: 'https://www.hushh.ai/images/products/hushh-button-banner.jpg',
    },
    'hushh-vibe-search': {
      title: 'Hushh Vibe Search | Personalized Search Experience',
      description: 'Discover a new way of searching that understands your preferences and delivers personalized results.',
      keywords: 'Vibe Search, Personalized Search, AI Search, Hushh Search',
      image: 'https://www.hushh.ai/images/products/vibe-search-banner.jpg',
    },
    // Add more products as needed
  };
  
  return slug && productSEOMap[slug] 
    ? productSEOMap[slug] 
    : { 
        title: 'Hushh Products | Data Intelligence Solutions',
        description: 'Explore Hushh\'s suite of data intelligence products designed to empower users with control over their data.',
        keywords: 'Hushh Products, Data Intelligence, Data Privacy, User Control',
        image: 'https://www.hushh.ai/images/products/products-banner.jpg',
      };
}

// Example function to get blog SEO data
async function getBlogSEOData(slug) {
  // This would typically fetch from a database or CMS
  return {
    title: `Hushh Blog | ${slug ? formatTitle(slug) : 'Data Intelligence Insights'}`,
    description: 'Insights and updates from Hushh on data privacy, user control, and the future of digital experiences.',
    keywords: 'Hushh Blog, Data Privacy, Data Control, Digital Identity',
    image: 'https://www.hushh.ai/images/blog/blog-banner.jpg',
  };
}

// Example function to get page SEO data
async function getPageSEOData(slug) {
  // This would typically fetch from a database or CMS
  const pageSEOMap = {
    'about': {
      title: 'About Hushh | Our Mission and Values',
      description: 'Learn about Hushh\'s mission to empower users with control over their data while creating value through AI.',
      keywords: 'About Hushh, Hushh Mission, Data Privacy Company, Data Control',
      image: 'https://www.hushh.ai/images/about/about-banner.jpg',
    },
    'contact-us': {
      title: 'Contact Hushh | Get in Touch With Our Team',
      description: 'Have questions about Hushh? Get in touch with our team to learn more about our products and services.',
      keywords: 'Contact Hushh, Hushh Support, Hushh Sales, Hushh Information',
      image: 'https://www.hushh.ai/images/contact/contact-banner.jpg',
    },
    // Add more pages as needed
  };
  
  return slug && pageSEOMap[slug] 
    ? pageSEOMap[slug] 
    : { 
        title: 'Hushh | Your Data Your Business',
        description: 'Hushh empowers users to extract value from their data while maintaining complete control and privacy.',
        keywords: 'Hushh, Data Intelligence, Data Privacy, User Control',
        image: 'https://www.hushh.ai/images/hushh-banner.jpg',
      };
}

// Helper function to format title from slug
function formatTitle(slug) {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
} 