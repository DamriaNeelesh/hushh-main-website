/** @type {import('next').NextConfig} */

const { withContentlayer } = require("next-contentlayer");

const nextConfig = {
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  experimental: {
    appDir: true,
    optimizeCss: true,
    optimizeFonts: true,
    scrollRestoration: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.example.com',
        port: '',
        pathname: '/account123/**',
      },
      {
        protocol: 'https',
        hostname: 'media.licdn.com',
        port: '',
        pathname: '/**',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async redirects() {
    return [
      {
        source: "/:path*", // Match all paths
        has: [
          {
            type: "host",
            value: "www.hush1one.com", // Old domain
          },
        ],
        destination: "https://www.hushh.ai/:path*", // Redirect to the new domain
        permanent: true, // 301 redirect
      },
      {
        source: "/:path*", // Match all paths
        has: [
          {
            type: "host",
            value: "hush1one.com", // Old domain
          },
        ],
        destination: "https://www.hushh.ai/:path*", // Redirect to the new domain
        permanent: true, // 301 redirect
      },
      {
        source: "/:path*", // Match all paths
        has: [
          {
            type: "host",
            value: "hushh1one.com", // Old domain
          },
        ],
        destination: "https://www.hushh.ai/:path*", // Redirect to the new domain
        permanent: true, // 301 redirect
      },
      {
        source: "/:path*", // Match all paths
        has: [
          {
            type: "host",
            value: "hushh.ai", // Non-www domain
          },
        ],
        destination: "https://www.hushh.ai/:path*", // Redirect to www domain
        permanent: true, // 301 redirect
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
      {
        source: '/fonts/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=31536000',
          },
        ],
      },
    ];
  },
  webpack: (config) => {
    // Optimize bundle size
    config.optimization = {
      ...config.optimization,
      moduleIds: 'deterministic',
    };
    return config;
  },
};

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
});

const combinedConfig = {
  ...nextConfig,
  ...withMDX({
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  }),
};

const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx',
  standalone: true,
});

module.exports = withContentlayer(withNextra(combinedConfig));


  

