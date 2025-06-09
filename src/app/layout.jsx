import "./globals.css";
import "./_styles/blog.css";
import "../app/_styles/syntax-highlight.css";
import React from "react";
import Script from "next/script";
import { GoogleTagManager } from "@next/third-parties/google";
import NextTopLoader from "nextjs-toploader";
import { figtree } from "./_utilities/fonts";
import { Providers } from "./provider";
import ResponsiveSizeProvider from "./context/responsive";
import HeaderComponent from "./_components/features/HeaderComponent";
import { siteMetadata } from "./sitemetadata";

export const metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    template: `%s | Hushh`,
    default: siteMetadata.title,
  },
  description: siteMetadata.description,
  keywords: siteMetadata.keywords,
  generator: 'Next.js',
  applicationName: 'Hushh',
  referrer: 'origin-when-cross-origin',
  authors: [{ name: siteMetadata.author, url: siteMetadata.siteUrl }],
  creator: siteMetadata.author,
  publisher: 'Hushh',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: 'Hushh',
    images: [
      {
        url: `${siteMetadata.siteUrl}${siteMetadata.socialBanner}`,
        width: 1200,
        height: 630,
        alt: 'Hushh - Your Data Your Business',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: siteMetadata.title,
    description: siteMetadata.description,
    creator: '@hushh_ai',
    images: [
      {
        url: `${siteMetadata.siteUrl}${siteMetadata.socialBanner}`,
        alt: 'Hushh - Your Data Your Business',
      },
    ],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  verification: {
    google: "2yMPgnyqy54zZFkGkUxbtKD_9R60gWhe5Hk-DTYff9M"
  },
  category: 'technology',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${figtree.variable}`}>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-1PDGMHH7CL"
        strategy={'afterInteractive'}
      />
      <Script src="https://analytics.ahrefs.com/analytics.js" strategy={'lazyOnload'} data-key="yInBsXwcX1jmHJpmJk0QSQ" async />
      <Script
        type="text/javascript"
        strategy={'lazyOnload'}
        src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"
      />
      <GoogleTagManager gtmId="G-1PDGMHH7CL" />
      <meta
        name="google-site-verification"
        content="2yMPgnyqy54zZFkGkUxbtKD_9R60gWhe5Hk-DTYff9M"
      />
      <head>
        {/* Preconnect to essential domains */}
        <link rel="icon" href="./favicon.ico" />
      </head>

      <body
        style={{
          backgroundColor: "black",
          padding: "0 !important",
          paddingInlineStart: "0px !important",
          paddingInlineEnd: "0px !important",
        }}
      >
        <NextTopLoader
          color="red"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
          shadow="0 0 10px #2299DD,0 0 5px #2299DD"
          template='
                    <div class="bar" role="bar">
                      <div class="peg">
                      </div>
                    </div>
                    <div class="spinner" role="spinner">
                      <div class="spinner-icon">
                      </div>
                    </div>
                    '
          zIndex={1600}
          showAtBottom={false}
        />
        
        {/* <div className="relative z-50">
          <HushhButtonFromLib />
        </div> */}
        <ResponsiveSizeProvider>
          <header className="h-[90px] w-full absolute z-50">
            <HeaderComponent />
          </header>
          {" "}
          <div className={`${figtree.variable} w-full`}>
            <Providers>{children}</Providers>
          </div>
        </ResponsiveSizeProvider>
      </body>
    </html>
  );
}
