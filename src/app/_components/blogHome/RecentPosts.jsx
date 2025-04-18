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
  const sortedBlogs = sortBlogs(blogs);
  // Get posts 5-11 for the "More from Newsroom" section
  const recentBlogs = blogs.length <= 3 ? blogs : sortedBlogs.slice(5, 11);
  const router = useRouter();
  
  // Check if we're rendering a limited set for the related posts section
  const isLimitedSet = blogs.length <= 3;
  
  return (
    <section className="w-full max-w-[1180px] mx-auto px-5 sm:px-6 pb-20">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-3xl font-semibold text-[#1d1d1f] dark:text-white tracking-tight">
          {isLimitedSet ? "Related Articles" : "More from Newsroom"}
        </h2>
        
        {!isLimitedSet && (
          <Box
            as="button"
            onClick={() => router.push('/categories/all')}
            display="flex"
            alignItems="center"
            color="#0066CC"
            _hover={{ textDecoration: "underline" }}
            fontWeight="medium"
            fontSize="md"
            transition="all 0.2s"
          >
            <Text mr={1}>View Archive</Text>
            <ChevronRightIcon w={4} h={4} />
          </Box>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-7 md:gap-8">
        {recentBlogs.map((blog, index) => {
          // Format date to match Apple's style: "31 March 2025"
          const formattedDate = format(new Date(blog.publishedAt), "d MMMM yyyy");
          
          // Determine if the tag is an update type for display
          const isUpdate = blog.tags[0].toLowerCase().includes('update') || 
            blog.tags[0].toLowerCase() === 'press release' || 
            blog.tags[0].toLowerCase() === 'quick read';
          
          return (
            <article 
              key={index} 
              className="group flex flex-col rounded-lg overflow-hidden hover:shadow-md transition-all duration-300"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'fadeIn 0.8s ease-in-out forwards',
                opacity: 0
              }}
            >
              {/* Article image */}
              <Link href={blog.url} className="block w-full overflow-hidden rounded-xl">
                <div className="overflow-hidden rounded-xl mb-4 aspect-[16/9]">
                  <Image
                    src={blog.image.filePath.replace("../public", "")}
                    placeholder="blur"
                    blurDataURL={blog.image.blurhashDataUrl}
                    alt={blog.title}
                    width={384}
                    height={216}
                    className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-all duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 384px"
                  />
                </div>
              </Link>
              
              <div className="flex flex-col p-1 flex-grow">
                {/* Article tag - only if UPDATE or specific type */}
                {isUpdate && (
                  <div className="mb-2">
                    <span className="text-xs uppercase font-semibold tracking-wider text-[#6e6e73] dark:text-[#86868b]">
                      {blog.tags[0]}
                    </span>
                  </div>
                )}
                
                {/* Article title */}
                <Link href={blog.url} className="group mb-2">
                  <h3 className="text-lg font-semibold text-[#1d1d1f] dark:text-white leading-tight group-hover:text-[#0066CC] transition-colors duration-300">
                    {blog.title}
                  </h3>
                </Link>
                
                {/* Article description - only show on larger screens */}
                <p className="text-sm text-[#424245] dark:text-[#a1a1a6] mb-3 line-clamp-2 hidden md:block">
                  {blog.description}
                </p>
                
                {/* Article date */}
                <span className="text-[#6e6e73] dark:text-[#86868b] text-sm mt-auto">
                  {formattedDate}
                </span>
                
                <Link href={blog.url} className="mt-3 inline-flex items-center text-[#0066CC] font-medium text-sm hover:underline">
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
      
      {!isLimitedSet && (
        <Flex justifyContent="center" mt="14">
          <Button 
            onClick={() => router.push('/categories/all')}
            colorScheme="blue"
            variant="outline"
            size="lg"
            borderRadius="full"
            px="8"
            fontWeight="medium"
            color="#0066CC"
            borderColor="#0066CC"
            _hover={{ bg: "rgba(0, 102, 204, 0.05)" }}
          >
            View All Articles
          </Button>
        </Flex>
      )}
    </section>
  );
};

export default RecentPosts;
