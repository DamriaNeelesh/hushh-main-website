import React from 'react'
import CareerPage from '../_components/career/carrer';
import Head from 'next/head';


export const metadata = {
  title: "Hushh | Careers",
  description:
    "Join us and build AI that advances personalized data experiences. Explore career opportunities at Hushh and be part of our innovative team.",
  keywords: [
    "HUSHH", "hushh", "Join Us", "Career", "Jobs", "Opportunity", "Personalized Experience", "Digital Footprint", "Gen AI", "Product that helps you keep track of your digital footprint", "Tired of being tracked online", "Track your own browsing activity", "Choose what data to collect", "Track your interests over time", "Export the collected data to your Hushh wallet", "Sell your data responsibly and get tailored services", "Streamlined Integration via Browser Companion", "Enables users to share their user activity in their Hushh Wallet", "Easy to organize and access important information", "Intelligent Insights and Recommendations", "Extension utilizes advanced algorithms and AI technology", "Latest trends with Gen AI", "Receive personalized recommendations", "Analyze the captured data and generate brilliant insights"
  ],
  canonical: "https://www.hushh.ai/career",
  alternates: {
    canonical: "https://www.hushh.ai/career",
  },
  robots: "index, follow", 
  openGraph: {
    title: "Hushh | Careers",
    description:
      "Join us and build AI that advances personalized data experiences. Explore career opportunities at Hushh and be part of our innovative team.",
    url: "https://www.hushh.ai/career",
    // images: [
    //   {
    //     url: "/path/to/career-og-image.jpg",
    //     width: 800,
    //     height: 600,
    //     alt: "Hushh Careers Image",
    //   },
    // ],
  },
};

const Career = () => {


  return (
    <>
    
       <CareerPage/>
    </>
  )
}

export default Career