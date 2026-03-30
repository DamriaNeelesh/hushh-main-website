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

const firebaseAuthDomainFromEnv = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
  || "hushh-pda.firebaseapp.com";

const isDevelopment = process.env.NODE_ENV !== "production";

const connectSources = [
  "'self'",
  "blob:",
  `https://${supabaseHostname}`,
  `https://${firebaseAuthDomainFromEnv}`,
  "https://www.google-analytics.com",
  "https://region1.google-analytics.com",
  "https://www.googletagmanager.com",
  "https://accounts.google.com",
  "https://appleid.apple.com",
  "https://identitytoolkit.googleapis.com",
  "https://securetoken.googleapis.com",
  "https://firebaseinstallations.googleapis.com",
  "https://www.googleapis.com",
  "https://apis.google.com",
  "https://hushh-api-53407187172.us-central1.run.app",
  "https://developer-api-53407187172.us-central1.run.app",
  "https://calendly.com",
  "https://docs.google.com",
  "https://api.github.com",
  "https://github.com",
  "https://x.com",
  "https://www.linkedin.com",
  "https://www.youtube.com",
  "https://youtube.com",
  "https://*.run.app",
  "wss:",
];

if (isDevelopment) {
  connectSources.push("http:", "https:", "ws:");
}

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: "standalone",
  experimental: {
    webVitalsAttribution: ["CLS", "FCP", "INP", "LCP", "TTFB"],
    optimizePackageImports: ["date-fns", "lucide-react"],
  },
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
      `script-src 'self' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com https://www.google-analytics.com https://accounts.google.com https://appleid.cdn-apple.com https://apis.google.com`,
      `connect-src ${[...new Set(connectSources)].join(" ")}`,
      `frame-src 'self' https://docs.google.com https://calendly.com https://accounts.google.com https://appleid.apple.com https://${firebaseAuthDomainFromEnv}`,
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
    qualities: [75, 90],
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
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "github.com",
        pathname: "/user-attachments/assets/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/hushh-hackhathon',
        destination: '/pda/iithackathon',
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
