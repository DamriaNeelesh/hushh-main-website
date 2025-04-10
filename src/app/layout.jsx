import "./globals.css";
import { Navbar } from "./_components/Navbar";
import HomebannerBG from "./_components/svg/images/homeBannerBg";
import { Providers } from "./provider";
import {
  figtree,
} from "./_utilities/fonts";
import Script from "next/script";
import Header from "./_components/header";
import React from "react";
import ResponsiveSizeProvider from "./context/responsive";
import ContactForm from "./_components/features/contactForm";
import HeaderComponent from "./_components/features/HeaderComponent";
import emailjs from "@emailjs/browser";
import NextTopLoader from "nextjs-toploader";
import Head from "next/head";
import { GoogleTagManager } from "@next/third-parties/google";
import HushhButtonFromLib from './_utilities/HushhButton'
import siteMetadata  from "./sitemetadata";

export const metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    template: `%s | ${siteMetadata.title}`,
    default: siteMetadata.title,
  },
  description: siteMetadata.description,
  keywords: siteMetadata.keywords,
  authors: [{ name: siteMetadata.author }],
  creator: siteMetadata.author,
  publisher: siteMetadata.organization.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.title,
    images: [
      {
        url: siteMetadata.socialBanner,
        width: 1200,
        height: 630,
        alt: siteMetadata.title,
      },
    ],
    locale: siteMetadata.locale,
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [siteMetadata.socialBanner],
    creator: "@hushh_ai",
    site: "@hushh_ai",
  },
  alternates: {
    canonical: siteMetadata.siteUrl,
  },
  verification: {
    google: "2yMPgnyqy54zZFkGkUxbtKD_9R60gWhe5Hk-DTYff9M",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  category: "technology",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${figtree.variable} `}>
      {/* Google Analytics */}
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${siteMetadata.analytics.googleAnalyticsId}`}
        strategy="afterInteractive"
      />
      <Script 
        id="google-analytics" 
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${siteMetadata.analytics.googleAnalyticsId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      
      {/* Ahrefs Analytics */}
      <Script 
        src="https://analytics.ahrefs.com/analytics.js" 
        strategy="lazyOnload" 
        data-key="yInBsXwcX1jmHJpmJk0QSQ" 
        async 
      />
      
      {/* EmailJS */}
      <Script
        type="text/javascript"
        strategy="lazyOnload"
        src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"
      />
      
      <GoogleTagManager gtmId={siteMetadata.analytics.googleAnalyticsId} />
      
      <head>
        <meta
          name="google-site-verification"
          content="2yMPgnyqy54zZFkGkUxbtKD_9R60gWhe5Hk-DTYff9M"
        />

        {/* Schema.org markup for organization */}
        <script 
          type="application/ld+json" 
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": siteMetadata.organization.name,
              "url": siteMetadata.organization.url,
              "logo": siteMetadata.organization.logo,
              "sameAs": [
                siteMetadata.twitter,
                siteMetadata.linkedin,
                siteMetadata.youtube,
              ]
            })
          }}
        />

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Font optimization - combined into a single request */}
        <link 
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Figtree:ital,wght@0,300..900;1,300..900&family=Inter:wght@100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        />
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
        <link rel="icon" href="/favicon.ico" />
        
        {/* <div className="relative z-50">
          <HushhButtonFromLib />
        </div> */}
        <ResponsiveSizeProvider>
          <header className="h-[90px] w-full absolute z-50">
            <HeaderComponent />
          </header>
          {" "}
          <div className={`${figtree.variable}  w-full`}>
            <Providers>{children}</Providers>
          </div>
        </ResponsiveSizeProvider>
      </body>
    </html>
  );
}
