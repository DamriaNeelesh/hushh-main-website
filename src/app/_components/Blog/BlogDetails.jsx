'use client';
import { format, parseISO } from "date-fns";
import Link from "next/link";
import React from "react";
import { Box, Flex, Text, Divider, useColorMode } from "@chakra-ui/react";
import { slug } from "github-slugger";

const BlogDetails = ({ blog, slug: blogSlug }) => {
  const { colorMode } = useColorMode();
  
  // Colors based on color mode
  const bgColor = colorMode === 'light' ? "#f5f5f7" : "#1A1A1A";
  const textColor = colorMode === 'light' ? "#1d1d1f" : "white";
  const mutedTextColor = colorMode === 'light' ? "#6e6e73" : "#98989A";
  const borderColor = colorMode === 'light' ? "#e5e5e7" : "#333";
  const linkHoverColor = "#0066CC";

  return (
    <Box 
      py="6" 
      px="6"
      bg={bgColor} 
      borderRadius="lg" 
      overflow="hidden"
      borderWidth="1px"
      borderColor={borderColor}
      transition="all 0.3s ease"
      className="apple-card fade-up"
      boxShadow="sm"
      _hover={{ boxShadow: "md", transform: "translateY(-2px)" }}
    >
      <Text fontSize="lg" fontWeight="semibold" color={textColor} mb="4">
        Article Information
      </Text>
      
      <Flex direction="column" gap="4">
        <Box>
          <Text fontSize="sm" color={mutedTextColor} mb="1" fontWeight="medium">
            Publication Date
          </Text>
          <Text fontSize="sm" color={textColor}>
            {format(parseISO(blog.publishedAt), "MMMM d, yyyy")}
          </Text>
        </Box>
        
        <Divider borderColor={borderColor} />
        
        <Box>
          <Text fontSize="sm" color={mutedTextColor} mb="1" fontWeight="medium">
            Author
          </Text>
          <Text fontSize="sm" color={textColor}>
            {blog.author}
          </Text>
        </Box>
        
        <Divider borderColor={borderColor} />
        
        <Box>
          <Text fontSize="sm" color={mutedTextColor} mb="1" fontWeight="medium">
            Reading Time
          </Text>
          <Flex align="center" fontSize="sm" color={textColor}>
            <Box as="span" mr="2">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </Box>
            {blog.readingTime.text}
          </Flex>
        </Box>
        
        <Divider borderColor={borderColor} />
        
        <Box>
          <Text fontSize="sm" color={mutedTextColor} mb="1" fontWeight="medium">
            Category
          </Text>
          <Link href={`/categories/${slug(blog.tags[0])}`} className="apple-link no-style">
            <Text 
              fontSize="sm" 
              color={textColor}
              textTransform="capitalize"
              _hover={{ color: linkHoverColor }}
              transition="color 0.2s"
              display="inline-flex"
              alignItems="center"
            >
              {blog.tags[0]}
              <Box as="span" ml="1">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </Box>
            </Text>
          </Link>
        </Box>
      </Flex>
      
      <style jsx global>{`
        .apple-card {
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        
        @media (prefers-color-scheme: dark) {
          .apple-card {
            background-color: rgba(26, 26, 26, 0.8);
          }
        }
        
        @media (prefers-color-scheme: light) {
          .apple-card {
            background-color: rgba(245, 245, 247, 0.8);
          }
        }
      `}</style>
    </Box>
  );
};

export default BlogDetails;
