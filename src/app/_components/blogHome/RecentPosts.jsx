'use client'
import { sortBlogs } from "../../utils";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Text, Button, Flex } from "@chakra-ui/react";

const RecentPosts = ({ blogs }) => {
  const sortedBlogs = blogs && blogs.length > 0 ? sortBlogs(blogs) : [];
  const router = useRouter();
  
  // Check if we're rendering a limited set for the related posts section
  const isLimitedSet = blogs.length <= 3;
  
  if (sortedBlogs.length === 0) return null;
  
  return (
    <section className="w-full max-w-[1180px] mx-auto px-5 sm:px-6 mb-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-[#1d1d1f] dark:text-white">
          {isLimitedSet ? "Related Articles" : "More News"}
        </h2>
        
        {!isLimitedSet && (
          <button
            onClick={() => router.push('/categories/all')}
            className="text-[#0066CC] hover:underline flex items-center text-sm font-medium"
          >
            See more <ChevronRightIcon w={4} h={4} />
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {sortedBlogs.map((blog, index) => {
          // Format date to match Apple's style: "14 April 2025"
          const formattedDate = format(new Date(blog.publishedAt), "d MMMM yyyy");
          
          // Determine if the tag is an update type
          const isUpdate = blog.tags[0].toLowerCase().includes('update') || 
            blog.tags[0].toLowerCase() === 'press release' || 
            blog.tags[0].toLowerCase() === 'quick read';
          
          return (
            <article 
              key={index} 
              className="overflow-hidden rounded-2xl bg-white dark:bg-[#1d1d1f] shadow-sm h-full flex flex-col"
            >
              {/* Image container - 16:9 aspect ratio */}
              <div className="aspect-[16/9] overflow-hidden">
                <Link href={blog.url}>
                  <Image
                    src={blog.image.filePath.replace("../public", "")}
                    placeholder="blur"
                    blurDataURL={blog.image.blurhashDataUrl}
                    alt={blog.title}
                    width={300}
                    height={169}
                    className="w-full h-full object-cover object-center"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 300px"
                  />
                </Link>
              </div>
              
              {/* Content container */}
              <div className="p-5 flex flex-col flex-grow">
                {isUpdate && (
                  <div className="mb-2">
                    <span className="text-xs uppercase font-semibold tracking-wider text-[#6e6e73] dark:text-[#86868b]">
                      {blog.tags[0]}
                    </span>
                  </div>
                )}
                
                <Link href={blog.url}>
                  <h3 className="text-base font-semibold text-[#1d1d1f] dark:text-white leading-tight mb-2 hover:text-[#0066CC] transition-colors duration-300 line-clamp-2">
                    {blog.title}
                  </h3>
                </Link>
                
                <span className="mt-auto text-[#6e6e73] dark:text-[#86868b] text-sm">
                  {formattedDate}
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default RecentPosts;
