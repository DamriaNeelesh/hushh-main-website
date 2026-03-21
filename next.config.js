/** @type {import('next').NextConfig} */

const supabaseUrlFromEnv = process.env.NEXT_PUBLIC_SUPABASE_URL
  || process.env.VITE_SUPABASE_URL
  || "https://ibsisfnjxeowvdtvgzff.supabase.co";

const supabaseHostname = (() => {
  try {
    return new URL(supabaseUrlFromEnv).hostname;
  } catch (error) {
    return "ibsisfnjxeowvdtvgzff.supabase.co";
  }
})();

const HUSHH_BASE_URL = "https://hushh.ai";

const externalNavPathRedirects = [
  "/agents",
  "/hushh-vault",
  "/hushh-link",
  "/products/hushh-link",
  "/products/hushh-flow",
  "/products/hushh-grid",
  "/hushh-voice",
  "/intelligence-portal",
  "/products/hushh-wallet-app",
  "/products/hushh-button",
  "/products/browser-companion",
  "/products/hushh-vibe-search",
  "/products/hushh-for-students",
  "/labs",
  "/why-hushh",
  "/legal/privacypolicy",
  "/consent-ai-protocol",
  "/hushh-community",
  "/solutions",
  "/pda/iithackathon",
  "/about",
  "/contact-us",
  "/career",
  "/hushhBlogs",
  "/frequently-asked-questions",
  "/login",
  "/agent-kit-cli",
  "/data-resources",
];

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  compiler: {
    removeConsole: true,
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Content-Security-Policy", value: "frame-ancestors 'self';" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.example.com',
        port: '',
        pathname: '/account123/**',
      },
      {
        protocol: 'https',
        hostname: supabaseHostname,
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  async redirects() {
    const navFallbackRedirects = externalNavPathRedirects.map((path) => ({
      source: path,
      destination: `${HUSHH_BASE_URL}${path}`,
      permanent: false,
    }));

    return [
      {
        source: '/hushh_id/:path*',
        destination: '/hushh-id/:path*',
        permanent: true,
      },
      {
        source: '/hushh-hackhathon',
        destination: '/pda/iithackathon',
        permanent: true,
      },
      ...navFallbackRedirects,
      {
        source: "/agent-kit-cli/:path*",
        destination: `${HUSHH_BASE_URL}/agent-kit-cli/:path*`,
        permanent: false,
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.hush1one.com",
          },
        ],
        destination: "https://hushh.ai/:path*",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
