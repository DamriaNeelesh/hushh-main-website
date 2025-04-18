'use client';
import { sortBlogs } from "../../utils";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";

const FeaturedPosts = ({ blogs }) => {
  const sortedBlogs = sortBlogs(blogs);
  // Get posts 1-4 for the featured grid (first post is in hero section)
  const featuredBlogs = sortedBlogs.slice(1, 5);

  return (
    <section className="w-full max-w-[1180px] mx-auto px-5 sm:px-6 pb-16">
      <h3 className="text-3xl font-semibold text-[#1d1d1f] dark:text-white mb-8 tracking-tight">
        Featured Articles
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
        {featuredBlogs.map((blog, index) => {
          // Format date to match Apple's style: "8 April 2025"
          const formattedDate = format(new Date(blog.publishedAt), "d MMMM yyyy");
          
          // Determine if the tag is an update type for display
          const isUpdate = blog.tags[0].toLowerCase().includes('update') || 
            blog.tags[0].toLowerCase() === 'press release' || 
            blog.tags[0].toLowerCase() === 'quick read';
          
          return (
            <article 
              key={index} 
              className="group flex flex-col rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
              style={{
                animationDelay: `${index * 150}ms`,
                animation: 'fadeIn 0.8s ease-in-out forwards',
                opacity: 0
              }}
            >
              {/* Article image */}
              <Link href={blog.url} className="block w-full overflow-hidden rounded-xl">
                <div className="overflow-hidden rounded-xl mb-5 aspect-[16/9]">
                  <Image
                    src={blog.image.filePath.replace("../public", "")}
                    placeholder="blur"
                    blurDataURL={blog.image.blurhashDataUrl}
                    alt={blog.title}
                    width={580}
                    height={326}
                    className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-all duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 580px"
                  />
                </div>
              </Link>
              
              <div className="flex flex-col p-1">
                {/* Article tag - only if UPDATE or specific type */}
                {isUpdate && (
                  <div className="mb-3">
                    <span className="text-xs uppercase font-semibold tracking-wider text-[#6e6e73] dark:text-[#86868b]">
                      {blog.tags[0]}
                    </span>
                  </div>
                )}
                
                {/* Article title */}
                <Link href={blog.url} className="group mb-3">
                  <h3 className="text-xl md:text-2xl font-semibold text-[#1d1d1f] dark:text-white leading-tight group-hover:text-[#0066CC] transition-colors duration-300">
                    {blog.title}
                  </h3>
                </Link>
                
                {/* Article description */}
                <p className="text-base text-[#424245] dark:text-[#a1a1a6] mb-3 line-clamp-2">
                  {blog.description}
                </p>
                
                {/* Article date */}
                <span className="text-[#6e6e73] dark:text-[#86868b] text-sm">
                  {formattedDate}
                </span>
                
                <Link href={blog.url} className="mt-4 inline-flex items-center text-[#0066CC] font-medium text-sm hover:underline">
                  Read article
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>
          );
        })}
      </div>
      
      <div className="h-px w-full bg-[#d2d2d7] dark:bg-[#262626] my-16"></div>
    </section>
  );
};

export default FeaturedPosts;
