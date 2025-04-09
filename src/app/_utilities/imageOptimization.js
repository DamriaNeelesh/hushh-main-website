/**
 * Image Optimization Utility
 * Functions for optimizing images to improve SEO and performance
 */

import { getImageProps } from './seoPerformance';

// Define standard image dimensions for different use cases
export const imageSizes = {
  thumbnail: { width: 320, height: 180 },
  preview: { width: 640, height: 360 },
  standard: { width: 1200, height: 630 },
  banner: { width: 1920, height: 1080 },
  icon: { width: 96, height: 96 },
  avatar: { width: 128, height: 128 },
  logo: { width: 200, height: 200 },
};

/**
 * Get optimized image props for Next.js Image component
 * @param {string} src - Image source URL
 * @param {string} alt - Image alt text
 * @param {string} size - Predefined size: 'thumbnail', 'preview', 'standard', 'banner', 'icon', 'avatar', 'logo'
 * @param {object} options - Additional image options
 * @returns {object} Image properties for Next.js Image component
 */
export const getOptimizedImageProps = (src, alt, size = 'standard', options = {}) => {
  if (!src) return null;

  const dimensions = imageSizes[size] || imageSizes.standard;
  
  return {
    ...getImageProps(src, alt, dimensions.width, dimensions.height),
    priority: options.priority || (size === 'banner' || size === 'logo'),
    quality: options.quality || 80,
    sizes: options.sizes || getSizesForWidth(dimensions.width),
    ...options,
  };
};

/**
 * Generate responsive sizes attribute for Next.js Image
 * @param {number} maxWidth - Maximum width of the image
 * @returns {string} Sizes attribute value
 */
export const getSizesForWidth = (maxWidth) => {
  if (maxWidth <= 640) {
    return '(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw';
  } else if (maxWidth <= 1200) {
    return '(max-width: 640px) 100vw, (max-width: 768px) 75vw, (max-width: 1024px) 50vw, 33vw';
  } else {
    return '(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 75vw, 50vw';
  }
};

/**
 * Get placeholder image data URL for lazy loading
 * @param {string} color - Background color in hex format
 * @returns {string} Data URL
 */
export const getImagePlaceholder = (color = '#f0f0f0') => {
  // Create a simple SVG placeholder
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100">
    <rect width="100" height="100" fill="${color}" />
  </svg>`;

  // Convert to base64 data URL
  const base64 = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
};

/**
 * Get blurred data URL for image placeholder (optimized for SEO)
 * @returns {string} - Blurred placeholder data URL
 */
export const getBlurredPlaceholder = () => {
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN8Xw8AAjMBzOqeFbwAAAAASUVORK5CYII=';
};

/**
 * Generate image optimization parameters for Cloudinary or other CDNs
 * @param {string} url - Original image URL
 * @param {object} options - Transformation options
 * @returns {string} Optimized image URL
 */
export const getOptimizedImageUrl = (url, options = {}) => {
  if (!url) return '';

  // Handle Cloudinary URLs
  if (url.includes('cloudinary.com')) {
    const transformations = [];
    
    // Add quality
    if (options.quality) {
      transformations.push(`q_${options.quality}`);
    } else {
      transformations.push('q_auto');
    }
    
    // Add format
    if (options.format) {
      transformations.push(`f_${options.format}`);
    } else {
      transformations.push('f_auto');
    }
    
    // Add width/height constraints if specified
    if (options.width) {
      transformations.push(`w_${options.width}`);
    }
    
    if (options.height) {
      transformations.push(`h_${options.height}`);
    }
    
    // Add crop mode if both width and height are specified
    if (options.width && options.height) {
      transformations.push(options.crop || 'c_fill');
    }
    
    // Insert transformations into URL
    const transformString = transformations.join(',');
    
    // Handle different Cloudinary URL formats
    if (url.includes('/image/upload/')) {
      return url.replace('/image/upload/', `/image/upload/${transformString}/`);
    } else {
      // For other Cloudinary URL patterns, just add the transformations
      // This is a simplified approach, might need customization based on actual URLs
      const urlParts = url.split('//');
      return `${urlParts[0]}//${transformString}/${urlParts[1]}`;
    }
  }
  
  // For regular URLs, just return the original
  return url;
}; 