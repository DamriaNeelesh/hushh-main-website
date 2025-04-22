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
  
  // Format date to match Apple's style: "16 April 2025"
  const formattedDate = format(new Date(blog.publishedAt), "d MMMM yyyy");
  
  // Determine if the first tag is an update type
  const isUpdate = blog.tags[0].toLowerCase().includes('update') || 
    blog.tags[0].toLowerCase() === 'press release' || 
    blog.tags[0].toLowerCase() === 'quick read';

  return (
    <section className="w-full max-w-[1180px] mx-auto mt-8 mb-12">
      <div className="px-5 sm:px-6">
        <h1 className="text-2xl font-semibold text-[#1d1d1f] dark:text-white mb-4">
          Latest News
        </h1>
      </div>
      
      {/* Main featured article */}
      <div className="mx-5 sm:mx-6 mb-8 overflow-hidden rounded-2xl bg-white dark:bg-[#1d1d1f] shadow-sm">
        <div className="flex flex-col lg:flex-row">
          {/* Left side image */}
          <div className="w-full lg:w-2/3">
            <Link href={blog.url} className="block">
              <Image
                src={blog.image.filePath.replace("../public", "")}
                placeholder="blur"
                blurDataURL={blog.image.blurhashDataUrl}
                alt={blog.title}
                width={700}
                height={500}
                className="w-full h-full object-cover object-center aspect-[16/9]"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 700px"
                priority
              />
            </Link>
          </div>
          
          {/* Right side content */}
          <div className="w-full lg:w-1/3 p-6 lg:p-8 flex flex-col justify-between">
            {isUpdate && (
              <div className="mb-3">
                <span className="text-xs uppercase font-semibold tracking-wider text-[#6e6e73] dark:text-[#86868b]">
                  {blog.tags[0]}
                </span>
              </div>
            )}
            
            <div>
              <Link href={blog.url}>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1d1d1f] dark:text-white leading-tight mb-4 hover:text-[#0066CC] transition-colors duration-300">
                  {blog.title}
                </h2>
              </Link>
              
              <p className="text-base text-[#424245] dark:text-[#86868b] mb-6 line-clamp-3">
                {blog.description}
              </p>
            </div>
            
            <div className="mt-auto">
              <span className="block text-[#6e6e73] dark:text-[#86868b] text-sm mb-4">
                {formattedDate}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeCoverSection;
