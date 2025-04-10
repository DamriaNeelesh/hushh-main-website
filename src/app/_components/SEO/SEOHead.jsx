'use client';

import React from 'react';
import Head from 'next/head';
import { getCanonicalUrl } from '../../_utilities/seoPerformance';
import siteMetadata from '../../sitemetadata';

/**
 * SEOHead component for managing all SEO-related head tags
 * 
 * @param {Object} props
 * @param {string} props.title - Page title
 * @param {string} props.description - Page description
 * @param {string} props.keywords - Page keywords
 * @param {string} props.path - Current page path
 * @param {Object} props.ogImage - Open Graph image details
 * @param {string} props.ogType - Open Graph type
 * @param {Object} props.twitter - Twitter card details 
 */
const SEOHead = ({
  title,
  description,
  keywords,
  path,
  ogImage = null,
  ogType = 'website',
  twitter = null,
}) => {
  const canonicalUrl = getCanonicalUrl(path);
  const finalTitle = title || siteMetadata.title;
  const finalDescription = description || siteMetadata.description;
  const finalKeywords = keywords || siteMetadata.keywords;
  const finalOgImage = ogImage || {
    url: siteMetadata.socialBanner,
    width: 1200,
    height: 630,
    alt: finalTitle,
  };

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="author" content={siteMetadata.author} />

      {/* Canonical Link */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={siteMetadata.title} />
      <meta property="og:image" content={finalOgImage.url} />
      <meta property="og:image:width" content={finalOgImage.width.toString()} />
      <meta property="og:image:height" content={finalOgImage.height.toString()} />
      <meta property="og:image:alt" content={finalOgImage.alt} />
      <meta property="og:locale" content={siteMetadata.locale} />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content={twitter?.card || 'summary_large_image'} />
      <meta name="twitter:site" content={twitter?.site || '@hushh_ai'} />
      <meta name="twitter:creator" content={twitter?.creator || '@hushh_ai'} />
      <meta name="twitter:title" content={twitter?.title || finalTitle} />
      <meta name="twitter:description" content={twitter?.description || finalDescription} />
      <meta name="twitter:image" content={twitter?.image || finalOgImage.url} />

      {/* Additional SEO Tags */}
      <meta name="format-detection" content="telephone=no, address=no, email=no" />
    </Head>
  );
};

export default SEOHead; 