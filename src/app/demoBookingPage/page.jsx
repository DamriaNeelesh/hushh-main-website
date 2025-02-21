import React from "react";

import ClientDemoBooking from "../clientside/DemoBooking";
import Head from "next/head";

export const metadata = {
  title: "Hushh | Schedule a Live Demo Call with Us",
  description:
    "Book a call to check out a live demonstration of our products and learn more about our innovative solutions.",
  keywords: [
    "Book a call", "Appointment", "Live Demo", "Live Demonstrations", "Quick Access", "Walkthrough", "Demo Videos", "Watch Demo", "Meet our founder", "Data API Business", "Data Autonomy", "Data Equity", "Consent-Driven Excellence", "Technology For Everyone", "Hushh Wallet App", "Hushh Button", "Vibe Search", "Browser Companion", "Concierge App", "Valet Chat", "Vibe Search API", "Hushh For Students", "Brand Wallet", "Receipt Radar", "Future of Digital Identity & Personalized Experiences", "Gen AI", "GenAI"
  ],
  canonical: "https://hushh.ai/demoBookingPgae",
  alternates: {
    canonical: "https://hushh.ai/demoBookingPage",
  },
  openGraph: {
    title: "Hushh | Schedule a Live Demo Call with Us",
    description:
      "Book a call to check out a live demonstration of our products and learn more about our innovative solutions.",
    url: "https://hushh.ai/demoBookingPgae",
    // images: [
    //   {
    //     url: "/path/to/demo-booking-og-image.jpg",
    //     width: 800,
    //     height: 600,
    //     alt: "Hushh Demo Booking Image",
    //   },
    // ],
  },
};

const DemoBookingPage = () => {
  return (
    <>
    <Head>
        <title>Hushh | Schedule Your Personalized Demo</title>
        <meta
          name="description"
          content="Book a free, personalized demo of Hushh and see our platform in action. Discover how Hushh can transform your data integration and app development."
        />
        <meta
          name="keywords"
          content="Hushh demo, personalized demo, schedule demo, Hushh platform, data integration, app development"
        />
        <meta property="og:title" content="Schedule Your Personalized Demo | Hushh" />
        <meta
          property="og:description"
          content="Book a free, personalized demo of Hushh and see our platform in action. Discover how Hushh can transform your data integration and app development."
        />
        {/* <meta property="og:image" content="/path/to/og-image.jpg" /> */}
        <meta property="og:url" content="https://hushh.ai/demBookingPage" />
        <link rel="canonical" href="https://hushh.ai/demBookingPage" />
      </Head>
      <ClientDemoBooking />
    </>
  );
};

export default DemoBookingPage;
