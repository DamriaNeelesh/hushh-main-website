import "./globals.css";
import { Navbar } from "./_components/Navbar";
import { mulish } from "./_utilities/fonts";
import HomebannerBG from "./_components/svg/images/homeBannerBg";
import { Providers } from "./provider";
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
  title: {
    default: "HUSHH",
    template: "%s",
  },
  description: {
    default: "Your Data Your Business",
    template: "%s",
  },
  keywords: {
    template: "%s",
    default:
      "Hushh, Hushh, User Data API business,Hushh Button, Hushh Wallet App, Hushh Browser Companion, Hushh For Students, Hushh Valet Chat, Valet Chat, Vibe Search, Concierge App",
  },

 metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    template: `%s`,
    default: siteMetadata.title, // a default is required when creating a template
  },
  description: siteMetadata.description,
  // Most Important to fix this out
  openGraph: {
    title: siteMetadata?.title,
    description: siteMetadata?.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: "en_US",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    images: [siteMetadata.socialBanner],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-1PDGMHH7CL"
      ></script>
      <GoogleTagManager gtmId="G-1PDGMHH7CL" />
      <meta
        name="google-site-verification"
        content="2yMPgnyqy54zZFkGkUxbtKD_9R60gWhe5Hk-DTYff9M"
      />
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Figtree:ital,wght@0,300..900;1,300..900&family=Inter:wght@100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Figtree:ital,wght@0,300..900;1,300..900&family=Inter:wght@100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Figtree:ital,wght@0,300..900;1,300..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
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
        className={`${mulish.variable} font-sans`}
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
        <link rel="icon" href="./favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Figtree:ital,wght@0,300..900;1,300..900&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300..900;1,300..900&display=swap"
          rel="stylesheet"
        />
        {/* <script src="https://cdn.jsdelivr.net/npm/mermaid@10.9.0/dist/mermaid.min.js"></script>
        <script src="https://cdn.botpress.cloud/webchat/v1/inject.js"></script>
        <script
          src="https://mediafiles.botpress.cloud/fbf5d1e1-066c-4f35-a420-7128eae2130c/webchat/config.js"
          defer
        ></script> */}
        <script
          type="text/javascript"
          src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"
        ></script>
        {/* <div className="relative z-50">
          <HushhButtonFromLib />
        </div> */}
        <ResponsiveSizeProvider>
          <header className="h-[90px] w-full absolute z-50">
            <HeaderComponent />
          </header>
          {" "}
          <div className="w-full">
            <Providers>{children}</Providers>
          </div>
        </ResponsiveSizeProvider>
      </body>
    </html>
  );
}
