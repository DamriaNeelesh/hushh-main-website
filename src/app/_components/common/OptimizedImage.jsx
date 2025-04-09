'use client';

import React from 'react';
import Image from 'next/image';
import { getOptimizedImageProps, getBlurredPlaceholder, getOptimizedImageUrl } from '../../_utilities/imageOptimization';

/**
 * OptimizedImage Component
 * 
 * A wrapper around Next.js Image component with built-in optimizations for SEO and performance
 * 
 * @param {Object} props
 * @param {string} props.src - Image source URL
 * @param {string} props.alt - Image alt text (required for SEO)
 * @param {string} props.size - Predefined size: 'thumbnail', 'preview', 'standard', 'banner', 'icon', 'avatar', 'logo'
 * @param {boolean} props.priority - Whether to prioritize loading this image
 * @param {number} props.quality - Image quality (1-100)
 * @param {string} props.className - CSS class name
 * @param {Object} props.imgProps - Additional props to pass to Next.js Image component
 */
const OptimizedImage = ({
  src,
  alt,
  size = 'standard',
  priority = false,
  quality = 80,
  className = '',
  imgProps = {},
}) => {
  if (!src) {
    return null;
  }

  // Get optimized image properties
  const optimizedProps = getOptimizedImageProps(src, alt || '', size, {
    priority,
    quality,
    ...imgProps,
  });

  // Get optimized image URL if using Cloudinary or similar service
  const optimizedSrc = getOptimizedImageUrl(src, {
    quality,
    width: optimizedProps.width,
    height: optimizedProps.height,
  });

  return (
    <div className={`optimized-image-wrapper ${className}`}>
      <Image
        {...optimizedProps}
        src={optimizedSrc}
        alt={alt || ''}
        placeholder="blur"
        blurDataURL={getBlurredPlaceholder()}
        style={{
          maxWidth: '100%',
          height: 'auto',
          ...imgProps.style,
        }}
      />
      {/* Hidden image caption for SEO */}
      {alt && (
        <span className="sr-only">
          {alt}
        </span>
      )}
    </div>
  );
};

export default OptimizedImage; 