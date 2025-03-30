/** @type {import('next').NextConfig} */

const { withContentlayer } = require("next-contentlayer");

const nextConfig = {
  compiler: {
    removeConsole: true,
  },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  experimental: {
    appDir: true,
  },
  markdown: {
    remarkPlugins: "remark-gfm",
  },
};

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
});

const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.jsx",
  standalone: true,
});

module.exports = withContentlayer({
  compress: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
          { key: "Content-Encoding", value: "br" },
        ],
      },
    ];
  },
  images: {
    domains: ["assets.example.com"],
  },
  ...nextConfig,
});




