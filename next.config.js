/** @type {import('next').NextConfig} */

const { withContentlayer } = require("next-contentlayer");
const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
});
const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.jsx",
  standalone: true,
});

const nextConfig = {
  compiler: {
    removeConsole: true,
  },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.example.com",
        port: "",
        pathname: "/account123/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.hush1one.com",
          },
        ],
        destination: "https://hushh.ai*",
        permanent: true,
      },
    ];
  },
};

// Apply all configurations in the correct order
module.exports = withNextra(withContentlayer(withMDX(nextConfig)));
