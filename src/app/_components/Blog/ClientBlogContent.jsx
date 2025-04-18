'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import Head from "next/head";
import { slug } from "github-slugger";
import { Box, Container, Divider, Flex, Heading, Link, Text, VStack, HStack, Icon, Button, useColorMode } from "@chakra-ui/react";
import BlogDetails from "./BlogDetails";
import RenderMdx from "./RenderMdx";
import RecentPosts from "../blogHome/RecentPosts";
import MDXContent from '@/lib/mdxContent';
import { formatDate } from "@/lib/utils";

const ClientBlogContent = ({ blog, formattedDate, readingTime, isUpdate, allBlogs, params }) => {
  const { colorMode } = useColorMode();
  const [mounted, setMounted] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const progressBarRef = useRef(null);
  
  // Only access window after component is mounted
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Calculate reading progress on scroll
  useEffect(() => {
    if (!mounted) return;
    
    const updateReadingProgress = () => {
      const currentScrollPos = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      
      if (scrollHeight) {
        const percentage = Math.round((currentScrollPos / scrollHeight) * 100);
        setReadingProgress(percentage);
      }
    };
    
    // Set initial progress
    updateReadingProgress();
    
    // Add scroll event listener
    window.addEventListener('scroll', updateReadingProgress);
    
    // Cleanup
    return () => window.removeEventListener('scroll', updateReadingProgress);
  }, [mounted]);
  
  // Colors based on color mode
  const bgColor = colorMode === 'light' ? "white" : "gray.900";
  const textColor = colorMode === 'light' ? "gray.800" : "gray.100";
  const mutedTextColor = colorMode === 'light' ? "gray.600" : "gray.400";
  const socialBgColor = colorMode === 'light' ? "gray.50" : "gray.800";
  const socialHoverBgColor = colorMode === 'light' ? "gray.100" : "gray.700";
  const sectionBgColor = colorMode === 'light' ? "#f5f5f7" : "#111";
  const linkHoverColor = colorMode === 'light' ? "blue.600" : "blue.300";
  const borderColor = colorMode === 'light' ? "gray.200" : "gray.700";
  const progressBarColor = "#0066CC"; // Apple blue color for progress bar

  // Copy link function
  const copyLinkToClipboard = () => {
    if (mounted && typeof navigator !== 'undefined' && navigator.clipboard) {
      const currentUrl = window.location.href;
      navigator.clipboard.writeText(currentUrl);
      // Could add toast notification here
    }
  };

  if (!mounted) {
    // Return a placeholder during SSR
    return <div style={{ height: "100vh", backgroundColor: colorMode === 'light' ? "#ffffff" : "#000000" }}></div>;
  }

  return (
    <>
      <Head>
        <title>{blog.title}</title>
        <meta name="description" content={blog.description} />
        {blog?.canonical && <link rel="canonical" href={blog.canonical} />}
        <meta property="og:title" content={blog.ogTitle || blog.title} />
        <meta property="og:description" content={blog.ogDescription || blog.description} />
        {blog?.ogImage && <meta property="og:image" content={blog.ogImage} />}
        {blog?.canonical && <meta property="og:url" content={blog.canonical} />}
      </Head>
      
      {/* Reading Progress Bar with enhanced visual effect */}
      <Box
        ref={progressBarRef}
        position="fixed"
        top="0"
        left="0"
        right="0"
        height="3px"
        width={`${readingProgress}%`}
        bg={progressBarColor}
        zIndex="9999"
        className="reading-progress-bar"
        transition="width 0.1s ease-out"
        boxShadow={readingProgress > 0 ? "0 0 10px rgba(0, 102, 204, 0.4)" : "none"}
      />
      
      <Box as="main" bg={bgColor} color={textColor} pt={{ base: "14", md: "20" }} className="fade-up">
        {/* Navigation breadcrumb */}
        <Container maxW="1180px" px={{ base: 5, md: 6 }} mb="8" className="fade-up delay-1">
          <Link 
            href="/hushhBlogs"
            color={mutedTextColor}
            fontSize="sm"
            fontWeight="medium"
            _hover={{ color: linkHoverColor }}
            display="flex"
            alignItems="center"
            transition="color 0.2s"
            className="no-style"
          >
            <Box as="span" mr="1">‹</Box> Newsroom
          </Link>
        </Container>
        
        {/* Article header with staggered fade-in animation */}
        <Container maxW="880px" px={{ base: 5, md: 6 }} mb={{ base: "8", md: "10" }}>
          {isUpdate && (
            <Text 
              className="uppercase fade-up delay-1"
              fontSize="xs"
              fontWeight="semibold"
              letterSpacing="0.05em"
              color={mutedTextColor}
              mb="3"
            >
              {blog.tags[0]}
            </Text>
          )}
          
          <Heading
            as="h1"
            fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
            fontWeight="semibold"
            lineHeight="1.2"
            mb={{ base: "4", md: "6" }}
            letterSpacing="-0.02em"
            className="fade-up delay-2"
          >
            {blog.title}
          </Heading>
          
          <Text 
            fontSize={{ base: "lg", md: "xl" }} 
            lineHeight="1.5"
            color={textColor}
            fontWeight="normal"
            mb={{ base: "5", md: "7" }}
            letterSpacing="-0.01em"
            className="fade-up delay-3"
          >
            {blog.description}
          </Text>

          <HStack spacing="4" mb={{ base: "6", md: "8" }} color={mutedTextColor} className="fade-up delay-3">
            <Text fontSize="md">{formattedDate}</Text>
            <Box as="span" w="1" h="1" borderRadius="full" bg={mutedTextColor}></Box>
            <Text fontSize="md" className="reading-time">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              {readingTime} min read
            </Text>
          </HStack>
          
          {/* Enhanced Social sharing section with Apple-style buttons */}
          <Box mb={{ base: "8", md: "10" }} className="fade-up delay-4">
            <Text fontSize="sm" fontWeight="medium" color={mutedTextColor} mb="3">
              Share this article
            </Text>
            <Flex gap="3" wrap="wrap" className="social-share-container">
              {/* Twitter/X */}
              <Link 
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(mounted ? window.location.href : '')}`}
                isExternal
                aria-label="Share on Twitter"
                _hover={{ textDecoration: 'none' }}
                className="no-style"
              >
                <Box 
                  as="span" 
                  p="2.5"
                  borderRadius="full" 
                  bg={socialBgColor}
                  border="1px solid" 
                  borderColor={borderColor}
                  display="flex" 
                  alignItems="center" 
                  justifyContent="center"
                  className="social-share-btn"
                  transition="all 0.2s ease"
                  role="button"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </Box>
              </Link>
              
              {/* LinkedIn */}
              <Link 
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(mounted ? window.location.href : '')}`}
                isExternal
                aria-label="Share on LinkedIn"
                _hover={{ textDecoration: 'none' }}
                className="no-style"
              >
                <Box 
                  as="span" 
                  p="2.5"
                  borderRadius="full" 
                  bg={socialBgColor}
                  border="1px solid" 
                  borderColor={borderColor}
                  display="flex" 
                  alignItems="center" 
                  justifyContent="center"
                  className="social-share-btn"
                  transition="all 0.2s ease"
                  role="button"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </Box>
              </Link>
              
              {/* WhatsApp */}
              <Link 
                href={`https://wa.me/?text=${encodeURIComponent(`${blog.title} - ${mounted ? window.location.href : ''}`)}`}
                isExternal
                aria-label="Share on WhatsApp"
                _hover={{ textDecoration: 'none' }}
                className="no-style"
              >
                <Box 
                  as="span" 
                  p="2.5"
                  borderRadius="full" 
                  bg={socialBgColor}
                  border="1px solid" 
                  borderColor={borderColor}
                  display="flex" 
                  alignItems="center" 
                  justifyContent="center"
                  className="social-share-btn"
                  transition="all 0.2s ease"
                  role="button"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                  </svg>
                </Box>
              </Link>
              
              {/* Email */}
              <Link 
                href={`mailto:?subject=${encodeURIComponent(blog.title)}&body=${encodeURIComponent(`I thought you might find this interesting: ${blog.title}\n\n${mounted ? window.location.href : ''}`)}`}
                isExternal
                aria-label="Share via Email"
                _hover={{ textDecoration: 'none' }}
                className="no-style"
              >
                <Box 
                  as="span" 
                  p="2.5"
                  borderRadius="full" 
                  bg={socialBgColor}
                  border="1px solid" 
                  borderColor={borderColor}
                  display="flex" 
                  alignItems="center" 
                  justifyContent="center"
                  className="social-share-btn"
                  transition="all 0.2s ease"
                  role="button"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </Box>
              </Link>
              
              {/* Copy Link Button */}
              <Box 
                as="button"
                p="2.5"
                borderRadius="full" 
                bg={socialBgColor}
                border="1px solid" 
                borderColor={borderColor}
                display="flex" 
                alignItems="center" 
                justifyContent="center"
                className="social-share-btn"
                transition="all 0.2s ease"
                onClick={copyLinkToClipboard}
                aria-label="Copy link to clipboard"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>
              </Box>
            </Flex>
          </Box>
          
          {/* Hero Image with subtle hover animation */}
          <Box w="100%" position="relative" mb={{ base: "12", md: "16" }} className="fade-up delay-5 apple-image">
            <Image
              src={blog.image || '/images/default-blog-img.png'}
              alt={blog.title}
              width={1200}
              height={630}
              style={{
                width: '100%',
                height: 'auto',
                aspectRatio: '1200 / 630',
                objectFit: 'cover',
                borderRadius: '12px',
              }}
              priority
              unoptimized={false}
            />
            {blog?.imageCaption && (
              <Text fontSize="sm" color={mutedTextColor} mt="2" textAlign="center">
                {blog.imageCaption}
              </Text>
            )}
          </Box>
          
          {/* Blog content with enhanced typography */}
          <Box className="prose prose-lg dark:prose-invert">
            <MDXContent source={blog.content} />
          </Box>
          
          {/* Author section */}
          {blog.author && (
            <Box mt={{ base: '10', md: '12' }} mb={{ base: '8', md: '10' }} className="author-section">
              <Divider mb={{ base: '6', md: '8' }} />
              <Flex 
                direction={{ base: 'column', sm: 'row' }} 
                align={{ base: 'flex-start', sm: 'center' }}
                gap={{ base: '4', sm: '5' }}
              >
                {blog.authorAvatar && (
                  <Box 
                    flexShrink="0" 
                    w={{ base: '12', sm: '14' }} 
                    h={{ base: '12', sm: '14' }}
                    borderRadius="full" 
                    overflow="hidden"
                    className="author-avatar"
                  >
                    <Image 
                      src={blog.authorAvatar} 
                      alt={blog.author}
                      width={56}
                      height={56}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                )}
                <Box>
                  <Text fontWeight="medium" fontSize={{ base: 'md', sm: 'lg' }} mb="1">
                    Written by {blog.author}
                  </Text>
                  {blog.authorBio && (
                    <Text color={mutedTextColor} fontSize={{ base: 'sm', sm: 'md' }}>
                      {blog.authorBio}
                    </Text>
                  )}
                </Box>
              </Flex>
            </Box>
          )}
          
          {/* Related Articles Section */}
          {blog.relatedPosts && blog.relatedPosts.length > 0 && (
            <Box mt={{ base: '10', md: '14' }} mb={{ base: '16', md: '20' }} className="related-articles">
              <Heading 
                as="h2" 
                fontSize={{ base: 'xl', md: '2xl' }}
                fontWeight="semibold"
                mb={{ base: '6', md: '8' }}
                letterSpacing="-0.02em"
              >
                More to explore
              </Heading>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {blog.relatedPosts.map((post, index) => (
                  <div key={index} className="related-article-card">
                    <Link 
                      href={post.slug} 
                      className="no-style"
                    >
                      <div>
                        {post.image && (
                          <div 
                            className="overflow-hidden rounded-xl mb-3"
                          >
                            <Image
                              src={post.image}
                              alt={post.title}
                              width={400}
                              height={225}
                              style={{
                                width: '100%',
                                height: 'auto',
                                aspectRatio: '16/9',
                                objectFit: 'cover',
                                transition: 'all 0.6s ease-in-out',
                              }}
                              className="hover:scale-105"
                            />
                          </div>
                        )}
                        <Text 
                          color={mutedTextColor} 
                          fontSize="sm"
                          mb="2"
                        >
                          {formattedDate}
                        </Text>
                        <Heading
                          as="h3"
                          fontSize={{ base: 'lg', md: 'xl' }}
                          fontWeight="semibold"
                          lineHeight="1.3"
                          mb="2"
                          letterSpacing="-0.01em"
                          _hover={{ color: linkHoverColor }}
                          transition="color 0.2s"
                        >
                          {post.title}
                        </Heading>
                        {post.description && (
                          <Text 
                            color={mutedTextColor}
                            fontSize="md"
                            noOfLines={2}
                          >
                            {post.description}
                          </Text>
                        )}
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </Box>
          )}
        </Container>
      </Box>
      
      <style jsx global>{`
        .dark-mode-social-button:hover {
          background-color: #2d2d2f !important;
        }
        .dark-mode-tag:hover {
          background-color: #2d2d2f !important;
        }
        .dark-mode-toc {
          background-color: #1d1d1f;
          border-color: #333336;
        }
        .dark-mode-related {
          background-color: #111;
        }
      `}</style>
    </>
  );
};

export default ClientBlogContent; 