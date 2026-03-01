"use client";

import React from "react";
import HomeCoverSection from "../blogHome/HomeCoverSection";
import FeaturedPosts from "../blogHome/FeaturedPosts";
import RecentPosts from "../blogHome/RecentPosts";

const HushhBlogsContent = ({ blogs }) => {
  return (
    <section className="blog-theme blog-page-shell">
      <section className="blog-container pt-10 md:pt-14 pb-6 md:pb-10">
        <div className="max-w-4xl">
          <p className="blog-kicker blog-gradient-text">Hushh Newsroom</p>
          <h1 className="blog-title mt-3">Ideas, releases, and privacy-first product stories</h1>
          <p className="blog-subtitle mt-4">
            Discover what we are building across agents, consent infrastructure, and personal data experiences.
          </p>
        </div>
      </section>

      <HomeCoverSection blogs={blogs} />
      <FeaturedPosts blogs={blogs} />
      <RecentPosts blogs={blogs} />
    </section>
  );
};

export default HushhBlogsContent;
