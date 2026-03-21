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
      {
        source: "/developer-Api",
        destination: "/developerApi",
        permanent: true,
      },
      {
        source: "/developer-Api/:path*",
        destination: "/developerApi/:path*",
        permanent: true,
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
