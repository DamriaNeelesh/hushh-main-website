/** @type {import('next').NextConfig} */

const {withContentlayer} = require("next-contentlayer")

const nextConfig = {
    compiler:{
        removeConsole: true,
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
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
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
      {
        protocol: 'https',
        hostname: '**.hushh.ai',
        pathname: '/**',
      },
    ],
  },
  markdown: {
      remarkPlugins: 'remark-gfm',
    },
};
const withMDX = require('@next/mdx')({
    extension: /\.mdx?$/,
  });
  
module.exports = withMDX({
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
});

module.exports = withContentlayer({ ...nextConfig });

module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'assets.example.com',
          port: '',
          pathname: '/account123/**',
        },
      ],
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
          destination: "https://hushh.ai*", // Redirect to the new domain
          permanent: true, // 301 redirect
        },
      ];
    },
  }
const withNextra = require('nextra')({
    theme: 'nextra-theme-docs',
    themeConfig: './theme.config.jsx',
    standalone: true,
  })
   
module.exports = withNextra(nextConfig)


  

