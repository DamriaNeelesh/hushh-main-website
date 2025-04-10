/**
 * Performance Optimization Utility
 * Functions for optimizing web performance across the site
 */

// Script loading strategies
export const scriptLoadingStrategies = {
  BLOCKING: 'beforeInteractive',
  IMMEDIATE: 'afterInteractive',
  LAZY: 'lazyOnload',
};

/**
 * Generate optimal script loading attributes based on script type
 * @param {string} type - Script type: 'analytics', 'essential', 'enhancement', or 'thirdParty'
 * @returns {object} Script loading attributes
 */
export const getScriptLoadingStrategy = (type) => {
  switch (type) {
    case 'essential':
      return {
        strategy: scriptLoadingStrategies.BLOCKING,
        async: false,
        defer: false,
      };
    case 'analytics':
      return {
        strategy: scriptLoadingStrategies.IMMEDIATE,
        async: true,
        defer: true,
      };
    case 'thirdParty':
      return {
        strategy: scriptLoadingStrategies.LAZY,
        async: true,
        defer: true,
      };
    case 'enhancement':
    default:
      return {
        strategy: scriptLoadingStrategies.LAZY,
        async: true,
        defer: true,
      };
  }
};

/**
 * Generate cache control headers for different resource types
 * @param {string} type - Resource type: 'static', 'image', 'font', 'api', 'html'
 * @returns {string} Cache-Control header value
 */
export const getCacheControlHeaders = (type) => {
  switch (type) {
    case 'static':
      return 'public, max-age=31536000, immutable'; // 1 year
    case 'image':
      return 'public, max-age=604800, stale-while-revalidate=86400'; // 1 week, SWR 1 day
    case 'font':
      return 'public, max-age=31536000, immutable'; // 1 year
    case 'api':
      return 'private, no-cache, no-store, must-revalidate';
    case 'html':
    default:
      return 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400'; // 1 hour, CDN 1 day
  }
};

/**
 * Generate resource hints for faster page loads
 * @returns {object} Resource hints configuration
 */
export const getResourceHints = () => {
  return {
    preconnect: [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://www.googletagmanager.com',
      'https://www.google-analytics.com',
    ],
    prefetch: [
      '/fonts/figtree-var.woff2',
    ],
    preload: [
      {
        href: '/fonts/figtree-var.woff2',
        as: 'font',
        type: 'font/woff2',
        crossOrigin: 'anonymous',
      },
    ],
  };
};

/**
 * Generate performance-optimized link tags for resource hints
 * @returns {Array} Array of link tag objects
 */
export const getResourceHintTags = () => {
  const hints = getResourceHints();
  const tags = [];

  // Add preconnect hints
  hints.preconnect.forEach((url) => {
    tags.push({
      rel: 'preconnect',
      href: url,
      crossOrigin: 'anonymous',
    });
  });

  // Add prefetch hints
  hints.prefetch.forEach((url) => {
    tags.push({
      rel: 'prefetch',
      href: url,
    });
  });

  // Add preload hints
  hints.preload.forEach((preload) => {
    tags.push({
      rel: 'preload',
      ...preload,
    });
  });

  return tags;
};

/**
 * Generate common security headers for all pages
 * @returns {object} Security headers
 */
export const getSecurityHeaders = () => {
  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
    'Content-Security-Policy': generateCSP(),
  };
};

/**
 * Generate Content Security Policy
 * @returns {string} CSP header value
 */
function generateCSP() {
  const policy = {
    'default-src': ["'self'"],
    'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'https://www.googletagmanager.com', 'https://www.google-analytics.com', 'https://analytics.ahrefs.com', 'https://cdn.jsdelivr.net'],
    'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
    'img-src': ["'self'", 'data:', 'https:', 'https://media.licdn.com'],
    'font-src': ["'self'", 'data:', 'https://fonts.gstatic.com'],
    'connect-src': ["'self'", 'https://www.google-analytics.com', 'https://analytics.ahrefs.com'],
    'frame-src': ["'self'"],
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
  };

  return Object.entries(policy)
    .map(([directive, sources]) => {
      return `${directive} ${sources.join(' ')}`;
    })
    .join('; ');
} 