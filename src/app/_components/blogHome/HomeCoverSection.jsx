'use client';
import { sortBlogs } from "../../utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Tag from "../Elements/Tag";
import { slug } from "github-slugger";
import { format } from "date-fns";

const HomeCoverSection = ({ blogs }) => {
  const sortedBlogs = sortBlogs(blogs);
  const blog = sortedBlogs[0];
  
  // Format date to match Apple's style: "14 April 2025"
  const formattedDate = format(new Date(blog.publishedAt), "d MMMM yyyy");
  
  // Determine if the first tag is an update type
  const isUpdate = blog.tags[0].toLowerCase().includes('update') || 
    blog.tags[0].toLowerCase() === 'press release' || 
    blog.tags[0].toLowerCase() === 'quick read';

  return (
    <div className="w-full max-w-[1180px] mx-auto pt-24 pb-0">
      <div className="flex flex-col mb-8 px-5 sm:px-6">
        <h1 className="text-2xl sm:text-3xl font-semibold text-[#6e6e73] dark:text-[#86868b] mb-3">
          Newsroom
        </h1>
        
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#1d1d1f] dark:text-white mb-14 leading-tight tracking-tight">
          Latest News
        </h2>
      </div>
      
      <div className="flex flex-col bg-white border-r-[50%] lg:flex-row items-start gap-10 px-5 sm:px-6">
        {/* Main featured article - left side */}
        <div className="w-full lg:w-[58%]">
          <Link href={blog.url} className="block group">
            <div className="overflow-hidden rounded-2xl mb-0">
              <Image
                src={blog.image.filePath.replace("../public", "")}
                placeholder="blur"
                blurDataURL={blog.image.blurhashDataUrl}
                alt={blog.title}
                width={700}
                height={500}
                className="w-full h-auto object-cover object-center group-hover:scale-[1.03] transition-all duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 58vw, 700px"
                priority
              />
            </div>
          </Link>
        </div>
        
        {/* Content - right side */}
        <div className="w-full lg:w-[42%] flex flex-col lg:pt-3">
          {isUpdate && (
            <div className="mb-4">
              <span className="text-xs uppercase font-semibold tracking-wider text-[#6e6e73] dark:text-[#86868b]">
                {blog.tags[0]}
              </span>
            </div>
          )}
          
          <Link href={blog.url} className="group">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1d1d1f] dark:text-white leading-tight mb-5 tracking-tight group-hover:text-[#0066CC] transition-colors duration-300">
              {blog.title}
            </h3>
          </Link>
          
          <p className="text-lg text-[#1d1d1f] dark:text-white mb-5 leading-relaxed">
            {blog.description}
          </p>
          
          <span className="text-[#6e6e73] dark:text-[#86868b] text-base">
            {formattedDate}
          </span>
          
          <Link href={blog.url} className="mt-6 inline-flex items-center text-[#0066CC] font-medium hover:underline">
            Read more
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
      
      <div className="h-px w-full bg-[#d2d2d7] dark:bg-[#262626] my-16 mx-auto"></div>
    </div>
  );
};

export default HomeCoverSection;
