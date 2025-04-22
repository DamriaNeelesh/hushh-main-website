'use client';

import React from 'react';
import Categories from "./Categories";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { ChevronRightIcon } from '@chakra-ui/icons';
import { useColorMode } from "@chakra-ui/react";

const CategoryPageContent = ({ blogs, allCategories, params, categoryName }) => {
  const { colorMode } = useColorMode();
  const bgColor = colorMode === 'light' ? "white" : "black";
  const textColor = colorMode === 'light' ? "#1d1d1f" : "white";
  const mutedTextColor = colorMode === 'light' ? "#6e6e73" : "#98989A";
  const dividerColor = colorMode === 'light' ? "#d2d2d7" : "#262626";
  const cardBgColor = colorMode === 'light' ? "#f5f5f7" : "#111";
  const buttonBgColor = colorMode === 'light' ? "#e5e5e7" : "#262626";
  const buttonHoverBgColor = colorMode === 'light' ? "#d5d5d7" : "#363636";
  
  return (
    <main className={`${bgColor === "white" ? "bg-white" : "bg-black"} min-h-screen`}>
      {/* Navigation breadcrumb */}
      <div className="w-full max-w-[1200px] mx-auto pt-28 pb-0 px-5 sm:px-0">
        <Link 
          href="/hushhBlogs"
          className={`${mutedTextColor === "#6e6e73" ? "text-[#6e6e73] hover:text-[#0066CC]" : "text-[#98989A] hover:text-white"} text-sm font-medium flex items-center transition-colors duration-300`}
        >
          <span className="mr-1">‹</span> Newsroom
        </Link>
      </div>
      
      <div className="w-full max-w-[1200px] mx-auto pt-8 pb-20 px-5 sm:px-0">
        <div className="flex flex-col mb-10">
          <h1 className={`text-4xl md:text-5xl font-bold ${textColor === "#1d1d1f" ? "text-[#1d1d1f]" : "text-white"} mb-3`}>
            {categoryName}
          </h1>
          <p className={`${mutedTextColor === "#6e6e73" ? "text-[#6e6e73]" : "text-[#98989A]"} text-lg max-w-3xl`}>
            {params.slug === "all" 
              ? "Browse all articles from the Hushh Newsroom" 
              : `Articles related to ${categoryName}`
            }
          </p>
        </div>
        
        <div className={`h-px w-full ${dividerColor === "#d2d2d7" ? "bg-[#d2d2d7]" : "bg-[#262626]"} mb-8`} />
        
        <Categories categories={allCategories} currentSlug={params.slug} />
        
        {blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 animate-fadeIn">
            {blogs.map((blog, index) => (
              <article 
                key={index} 
                className="group transform transition duration-500 hover:translate-y-[-8px]"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Link href={blog.url} className="flex flex-col h-full">
                  <div className="overflow-hidden rounded-2xl mb-4 aspect-[16/10] relative">
                    <Image
                      src={blog.image.filePath.replace("../public", "")}
                      placeholder="blur"
                      blurDataURL={blog.image.blurhashDataUrl}
                      alt={blog.title}
                      width={400}
                      height={250}
                      className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-in-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                    />
                  </div>
                  
                  <div className="flex flex-col space-y-3 flex-grow">
                    <span className={`text-xs uppercase tracking-wider font-semibold ${mutedTextColor === "#6e6e73" ? "text-[#6e6e73]" : "text-[#98989A]"}`}>
                      {blog.tags[0]}
                    </span>
                    <h3 className={`text-lg md:text-xl font-semibold ${textColor === "#1d1d1f" ? "text-[#1d1d1f] group-hover:text-[#0066CC]" : "text-white group-hover:text-[#0066CC]"} transition-colors duration-300 leading-tight`}>
                      {blog.title}
                    </h3>
                    <time className={`text-xs ${mutedTextColor === "#6e6e73" ? "text-[#6e6e73]" : "text-[#98989A]"}`} dateTime={blog.publishedAt}>
                      {format(new Date(blog.publishedAt), "MMMM d, yyyy")}
                    </time>
                    <p className={`${colorMode === 'light' ? "text-[#424245]" : "text-gray-300"} text-sm line-clamp-2`}>
                      {blog.description}
                    </p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className={`text-center py-24 ${cardBgColor} rounded-2xl mt-12`}>
            <h3 className={`text-2xl font-semibold ${textColor === "#1d1d1f" ? "text-[#1d1d1f]" : "text-white"} mb-4`}>
              No articles found
            </h3>
            <p className={`${mutedTextColor === "#6e6e73" ? "text-[#6e6e73]" : "text-[#98989A]"} mb-8 max-w-md mx-auto`}>
              We're working on new content for this category. Check back soon for updates.
            </p>
            <Link 
              href="/hushhBlogs" 
              className={`inline-flex items-center ${textColor === "#1d1d1f" ? "text-[#1d1d1f]" : "text-white"} ${buttonBgColor} hover:${buttonHoverBgColor} px-6 py-3 rounded-full transition-colors duration-300`}
            >
              <span className="font-medium">Return to Newsroom</span>
              <ChevronRightIcon w={5} h={5} ml={1} />
            </Link>
          </div>
        )}
        
        {blogs.length > 0 && blogs.length % 3 !== 0 && (
          <div className="mt-16 text-center">
            <Link 
              href="/hushhBlogs" 
              className={`inline-flex items-center ${textColor === "#1d1d1f" ? "text-[#1d1d1f]" : "text-white"} ${buttonBgColor} hover:${buttonHoverBgColor} px-6 py-3 rounded-full transition-colors duration-300`}
            >
              <span className="font-medium">Back to Newsroom</span>
              <ChevronRightIcon w={5} h={5} ml={1} />
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};

export default CategoryPageContent; 