import "../app/globals.css";
import React from "react";
import ClientHome from "./clientside/Home";

export const metadata = {
  title: "Hushh | 🤫 'Your' data, make it 'Your' business",
  description:
    "Intelligence as a service powered by your Data, extract value from your own data",
  keywords:
    "Data API Business, Data Autonomy, Data Equity, Consent-Driven Excellence, Technology For Everyone, Hushh Wallet App, Hushh Button, Vibe Search, Browser Companion, Concierge App, Valet Chat, Vibe Search API, Hushh For Students, Brand Wallet, Receipt Radar, Future of Digital Identity & Personalised Experiences, Gen AI, GenAI ",
  canonical: "https://hushh.ai",
  openGraph: {
  title: "Hushh | 🤫 'Your' data, make it 'Your' business",
  description: "Intelligence as a service powered by your Data, extract value from your own data",
  url: "https://hushh.ai",
      // images: [
      //   {
      //     url: "/path/to/og-image.jpg",
      //     width: 1200,
      //     height: 630,
      //     alt: "Hushh Open Graph Image",
      //   },
      // ],
    }, 
};

export default function Home() {
  return (
    <>
    <Head>
        <title>Hushh - Home</title>
        <meta name="title" content="HUSHH - user data API businesses" />
        <meta
          name="description"
          content="Intelligence as a service powered by your Data"
        />
        <meta
          name="keywords"
          content="Data API Business, Data Autonomy, Data Equity, Consent-Driven Excellence, Technology For Everyone, Hushh Wallet App, Hushh Button, Vibe Search, Browser Companion, Concierge App, Valet Chat, Vibe Search API, Hushh For Students, Brand Wallet, Receipt Radar, Future of Digital Identity & Personalised Experiences, Gen AI, GenAI "
        />
         <meta property="og:title" content="Hushh - user data API businesses" />
        <meta
          property="og:description"
          content="Integrated Wallet & Data Control"
        />
        {/* <meta property="og:image" content="/path/to/og-image.jpg" /> */}
        <meta property="og:url" content="https://hushh.ai" />
        {/* Add canonical URL */}
        <link rel="canonical" href="https://hushh.ai" key="canonical"/>
      </Head>
      <ClientHome />
    </>
 
);
}
