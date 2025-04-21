'use client';
import { format, parseISO } from "date-fns";
import Link from "next/link";
import React from "react";
import { Box, Flex, Text, Divider, useColorMode, HStack, Icon } from "@chakra-ui/react";
import { slug } from "github-slugger";
import { CalendarIcon, TimeIcon } from '@chakra-ui/icons';
import { FaTag } from 'react-icons/fa';

const BlogDetails = ({ blog, slug: blogSlug }) => {
  const { colorMode } = useColorMode();
  
  // Colors based on color mode - enhanced with Apple-style values
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
      transition="all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)"
      className="apple-card fade-up"
      boxShadow="sm"
      _hover={{ boxShadow: "md", transform: "translateY(-2px)" }}
      backdropFilter="blur(10px)"
      style={{
        backgroundColor: colorMode === 'light' 
          ? 'rgba(245, 245, 247, 0.8)' 
          : 'rgba(26, 26, 26, 0.8)'
      }}
    >
      <Text 
        fontSize="lg" 
        fontWeight="semibold" 
        color={textColor} 
        mb="5"
        fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Display', Helvetica, Arial, sans-serif"
        letterSpacing="-0.01em"
      >
        Article Information
      </Text>
      
      <Flex direction="column" gap="4">
        <Box>
          <HStack spacing="2" mb="1">
            <Icon as={CalendarIcon} color={mutedTextColor} w="4" h="4" />
            <Text 
              fontSize="sm" 
              color={mutedTextColor} 
              fontWeight="medium"
              fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', Helvetica, Arial, sans-serif"
            >
              Publication Date
            </Text>
          </HStack>
          <Text 
            fontSize="sm" 
            color={textColor}
            ml="6"
            fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', Helvetica, Arial, sans-serif"
          >
            {format(parseISO(blog.publishedAt), "MMMM d, yyyy")}
          </Text>
        </Box>
        
        <Divider borderColor={borderColor} />
        
        <Box>
          <HStack spacing="2" mb="1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: mutedTextColor }}>
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <Text 
              fontSize="sm" 
              color={mutedTextColor} 
              fontWeight="medium"
              fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', Helvetica, Arial, sans-serif"
            >
              Author
            </Text>
          </HStack>
          <Text 
            fontSize="sm" 
            color={textColor}
            ml="6"
            fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', Helvetica, Arial, sans-serif"
          >
            {blog.author}
          </Text>
        </Box>
        
        <Divider borderColor={borderColor} />
        
        <Box>
          <HStack spacing="2" mb="1">
            <Icon as={TimeIcon} color={mutedTextColor} w="4" h="4" />
            <Text 
              fontSize="sm" 
              color={mutedTextColor} 
              fontWeight="medium"
              fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', Helvetica, Arial, sans-serif"
            >
              Reading Time
            </Text>
          </HStack>
          <Flex align="center" fontSize="sm" color={textColor} ml="6">
            <Text fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', Helvetica, Arial, sans-serif">
              {blog.readingTime.text}
            </Text>
          </Flex>
        </Box>
        
        <Divider borderColor={borderColor} />
        
        <Box>
          <HStack spacing="2" mb="1">
            <Icon as={FaTag} color={mutedTextColor} w="4" h="4" />
            <Text 
              fontSize="sm" 
              color={mutedTextColor} 
              fontWeight="medium"
              fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', Helvetica, Arial, sans-serif"
            >
              Category
            </Text>
          </HStack>
          <Box ml="6">
            <Link href={`/categories/${slug(blog.tags[0])}`} className="apple-link no-style">
              <Text 
                fontSize="sm" 
                color={textColor}
                textTransform="capitalize"
                _hover={{ color: linkHoverColor }}
                transition="color 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)"
                display="inline-flex"
                alignItems="center"
                fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', Helvetica, Arial, sans-serif"
                position="relative"
              >
                {blog.tags[0]}
                <Box 
                  as="span" 
                  ml="1.5"
                  transition="transform 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)"
                  className="apple-icon"
                  _groupHover={{ transform: 'translateX(2px)' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Box>
              </Text>
            </Link>
          </Box>
        </Box>
      </Flex>
      
      <style jsx global>{`
        .apple-card {
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
        }
        
        .apple-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
        }
        
        .dark .apple-card:hover {
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
        }
        
        .apple-icon {
          transition: transform 0.2s cubic-bezier(0.25, 0.1, 0.25, 1);
        }
        
        a:hover .apple-icon {
          transform: translateX(3px);
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
