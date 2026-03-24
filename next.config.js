/** @type {import('next').NextConfig} */

const supabaseUrlFromEnv = process.env.NEXT_PUBLIC_SUPABASE_URL
  || "https://ibsisfnjxeowvdtvgzff.supabase.co";

const supabaseHostname = (() => {
  try {
    return new URL(supabaseUrlFromEnv).hostname;
  } catch {
    return "ibsisfnjxeowvdtvgzff.supabase.co";
  }
})();

const isDevelopment = process.env.NODE_ENV !== "production";

const connectSources = [
  "'self'",
  `https://${supabaseHostname}`,
  "https://www.google-analytics.com",
  "https://region1.google-analytics.com",
  "https://www.googletagmanager.com",
  "https://accounts.google.com",
  "https://appleid.apple.com",
  "https://hushh-api-53407187172.us-central1.run.app",
  "https://developer-api-53407187172.us-central1.run.app",
  "https://hushh-plaid-api-app-bubqpu.5sc6y6-1.usa-e2.cloudhub.io",
  "https://hushh-plaid-agent-app-bubqpu.5sc6y6-4.usa-e2.cloudhub.io",
  "https://hushh-plaid-mcp-server-app-bubqpu.5sc6y6-4.usa-e2.cloudhub.io",
  "https://production.plaid.com",
  "https://sandbox.plaid.com",
  "https://cdn.plaid.com",
  "https://calendly.com",
  "https://docs.google.com",
  "https://api.github.com",
  "https://github.com",
  "https://x.com",
  "https://www.linkedin.com",
  "https://www.youtube.com",
  "https://youtube.com",
  "https://*.run.app",
  "https://*.cloudhub.io",
  "wss:",
];

if (isDevelopment) {
  connectSources.push("http:", "https:", "ws:");
}

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compiler: {
    removeConsole: true,
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  async headers() {
    const contentSecurityPolicy = [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "frame-ancestors 'self'",
      "img-src 'self' data: blob: https:",
      "media-src 'self' data: blob: https:",
      "font-src 'self' data: https://fonts.gstatic.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      `script-src 'self' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com https://www.google-analytics.com https://accounts.google.com https://appleid.cdn-apple.com https://cdn.plaid.com`,
      `connect-src ${[...new Set(connectSources)].join(" ")}`,
      "frame-src 'self' https://docs.google.com https://calendly.com https://accounts.google.com https://appleid.apple.com https://cdn.plaid.com",
      "worker-src 'self' blob:",
      "form-action 'self' https://docs.google.com",
      "upgrade-insecure-requests",
    ].join("; ");

    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Content-Security-Policy", value: contentSecurityPolicy },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "Origin-Agent-Cluster", value: "?1" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
          { key: "Cross-Origin-Resource-Policy", value: "cross-origin" },
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
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
        source: "/developerApi",
        destination: "/developers",
        permanent: true,
      },
      {
        source: "/developerApi/:path*",
        destination: "/developers/:path*",
        permanent: true,
      },
      {
        source: "/developer-Api",
        destination: "/developers",
        permanent: true,
      },
      {
        source: "/developer-Api/:path*",
        destination: "/developers/:path*",
        permanent: true,
      },
      {
        source: "/getting-started",
        destination: "/developers/getting-started",
        permanent: true,
      },
      {
        source: "/use-cases",
        destination: "/developers/use-cases",
        permanent: true,
      },
      {
        source: "/data-resources",
        destination: "/developers/data-resources",
        permanent: true,
      },
      {
        source: "/legal/privacypolicy",
        destination: "/privacy",
        permanent: true,
      },
      {
        source: "/legal/termsofuse",
        destination: "/terms",
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
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "hushh.ai",
          },
        ],
        destination: "https://www.hushh.ai/:path*",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
