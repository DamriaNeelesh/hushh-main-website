'use client';
import React, { useState, useEffect } from 'react';
import HomeCoverSection from "../blogHome/HomeCoverSection";
import FeaturedPosts from "../blogHome/FeaturedPosts";
import RecentPosts from "../blogHome/RecentPosts";
import Head from "next/head";
import { useColorMode } from "@chakra-ui/react";

const HushhBlogsContent = ({ blogs }) => {
  const { colorMode } = useColorMode();
  const [mounted, setMounted] = useState(false);
  
  // Only access window after component is mounted
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    // Return a placeholder during SSR
    return <div style={{ height: "100vh", backgroundColor: "#ffffff" }}></div>;
  }
  
  return (
    <>
      <Head>
        <title>Hushh Newsroom | Latest Insights and Updates</title>
        <meta
          name="description"
          content="Explore the latest news, articles, and updates from Hushh covering technology, privacy, and data solutions. Stay informed with expert insights and product announcements."
        />
        <meta
          name="keywords"
          content="hushh newsroom, technology insights, data privacy, data monetization, user-controlled data, luxury consumers, AI-powered personalization, privacy-preserving technology, decentralized data, ethical advertising, data marketplace, human-AI interaction"
        />
        <link rel="canonical" href="https://hushh.ai/hushhBlogs" />
        <meta property="og:url" content="https://hushh.ai/hushhBlogs" />
      </Head>
      
      <main 
        className={`${
          colorMode === 'light' ? 'bg-[#f5f5f7] text-[#1d1d1f]' : 'bg-black text-white'
        } min-h-screen transition-colors duration-300`}
      >
        <div className="pt-14 md:pt-20 pb-10 space-y-0">
          <HomeCoverSection blogs={blogs} />
          <FeaturedPosts blogs={blogs} />
          <RecentPosts blogs={blogs} />
        </div>
      </main>
    </>
  );
};

export default HushhBlogsContent; 