'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import Head from "next/head";
import { slug } from "github-slugger";
import { Box, Container, Divider, Flex, Heading, Link, Text, VStack, HStack, Icon, Button, useColorMode, useToast, IconButton } from "@chakra-ui/react";
import BlogDetails from "./BlogDetails";
import RenderMdx from "./RenderMdx";
import RecentPosts from "../blogHome/RecentPosts";
import MDXContent from '../../../lib/mdxContent';
import { format } from 'date-fns';
import { CalendarIcon, TimeIcon, CopyIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { FaTwitter, FaLinkedin, FaFacebook } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const ClientBlogContent = ({ blog, formattedDate, readingTime, isUpdate, allBlogs, params }) => {
  const { colorMode } = useColorMode();
  const [mounted, setMounted] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const [tableOfContents, setTableOfContents] = useState([]);
  const [activeSection, setActiveSection] = useState('');
  const progressBarRef = useRef(null);
  const toast = useToast();
  const articleRef = useRef(null);
  
  // Only access window after component is mounted
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Calculate reading progress on scroll with enhanced behavior
  useEffect(() => {
    if (!mounted) return;
    
    const updateReadingProgress = () => {
      const currentScrollPos = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      
      // Show progress bar only after scrolling down a bit
      if (currentScrollPos > 150 && !showProgress) {
        setShowProgress(true);
      } else if (currentScrollPos <= 150 && showProgress) {
        setShowProgress(false);
      }
      
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
  }, [mounted, showProgress]);
  
  // Colors based on color mode - enhanced with Apple-style values
  const bgColor = colorMode === 'light' ? "white" : "gray.900";
  const textColor = colorMode === 'light' ? "gray.800" : "gray.100";
  const headingColor = colorMode === 'light' ? "#1d1d1f" : "white";
  const mutedTextColor = colorMode === 'light' ? "#6e6e73" : "#86868b";
  const socialBgColor = colorMode === 'light' ? "gray.50" : "gray.800";
  const socialHoverBgColor = colorMode === 'light' ? "gray.100" : "gray.700";
  const sectionBgColor = colorMode === 'light' ? "#f5f5f7" : "#111";
  const linkHoverColor = colorMode === 'light' ? "blue.600" : "blue.300";
  const borderColor = colorMode === 'light' ? "gray.200" : "gray.700";
  const progressBarColor = "#0066CC"; // Apple blue color for progress bar

  // Generate table of contents from blog content
  useEffect(() => {
    if (blog?.content) {
      const headings = blog.content.match(/#{2,3}\s+([^\n]+)/g) || [];
      const toc = headings.map(heading => {
        const level = (heading.match(/#/g) || []).length;
        const title = heading.replace(/#{2,3}\s+/, '');
        const id = title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
        return { level, title, id };
      });
      setTableOfContents(toc);
    }
  }, [blog?.content]);

  // Update reading progress
  useEffect(() => {
    const updateReadingProgress = () => {
      if (articleRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        const articleTop = articleRef.current.offsetTop;
        const articleBottom = articleTop + articleRef.current.offsetHeight;
        const windowBottom = scrollTop + clientHeight;
        const windowTop = scrollTop;

        // Show progress bar after scrolling past article top
        setShowProgress(windowTop > articleTop);

        // Calculate reading progress
        if (windowBottom >= articleBottom) {
          setReadingProgress(100);
        } else if (windowTop <= articleTop) {
          setReadingProgress(0);
        } else {
          const progress = ((windowBottom - articleTop) / (articleBottom - articleTop)) * 100;
          setReadingProgress(Math.min(100, Math.max(0, progress)));
        }

        // Update active section
        const headings = articleRef.current.querySelectorAll('h2, h3');
        let currentSection = '';
        
        for (const heading of headings) {
          const { top } = heading.getBoundingClientRect();
          if (top <= 100) {
            currentSection = heading.id;
          } else {
            break;
          }
        }
        
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', updateReadingProgress);
    return () => window.removeEventListener('scroll', updateReadingProgress);
  }, []);

  // Copy link function with toast notification
  const copyLinkToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast({
      title: "Link copied",
      description: "The article link has been copied to your clipboard",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "bottom-right",
    });
  };

  // Scroll to section
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Render safely - handle errors or missing content
  const renderContent = () => {
    try {
      if (!blog || !blog.content) {
        return (
          <Box p={4} my={8} textAlign="center">
            <Text>Content unavailable. Please try again later.</Text>
          </Box>
        );
      }
      
      // Use the RenderMdx component which is specifically designed for MDX content
      return (
        <Box className="prose prose-lg dark:prose-invert apple-content">
          <RenderMdx blog={blog} />
        </Box>
      );
    } catch (error) {
      console.error("Error rendering blog content:", error);
      return (
        <Box p={4} my={8} textAlign="center" color="red.500">
          <Text>Error loading content. Please refresh the page.</Text>
        </Box>
      );
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
        transition="width 0.1s ease-out, opacity 0.3s ease"
        boxShadow={readingProgress > 0 ? "0 0 10px rgba(0, 102, 204, 0.4)" : "none"}
        opacity={showProgress ? 1 : 0}
      />
      
      <Box 
        as="main" 
        bg={bgColor} 
        color={textColor} 
        className="apple-bg"
        pt="120px"
        mt="0"
      >
        {/* Navigation breadcrumb */}
        <Container maxW="1180px" px={{ base: 5, md: 6 }} mb={{ base: 8, md: 10 }} className="fade-up delay-1">
          <Link 
            href="/hushhBlogs"
            color={mutedTextColor}
            fontSize="sm"
            fontWeight="medium"
            _hover={{ color: linkHoverColor }}
            display="flex"
            alignItems="center"
            transition="color 0.2s"
            className="no-style apple-link"
          >
            <Box as="span" mr="1">‹</Box> Newsroom
          </Link>
        </Container>
        
        {/* Article header with staggered fade-in animation */}
        <Container maxW="880px" px={{ base: 5, md: 6 }} mb={{ base: 10, md: 12 }}>
          {isUpdate && (
            <Text 
              className="uppercase fade-up delay-1 apple-text-tag"
              fontSize="xs"
              fontWeight="semibold"
              letterSpacing="0.05em"
              color={mutedTextColor}
              mb="3"
            >
              {blog.tags && blog.tags.length > 0 ? blog.tags[0] : ""}
            </Text>
          )}
          
          <Heading
            as="h1"
            fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
            fontWeight="semibold"
            lineHeight="1.2"
            mb={{ base: "4", md: "6" }}
            letterSpacing="-0.02em"
            color={headingColor}
            className="fade-up delay-2 apple-heading"
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
            className="fade-up delay-3 apple-text"
          >
            {blog.description}
          </Text>

          <HStack spacing="4" mb={{ base: "6", md: "8" }} color={mutedTextColor} className="fade-up delay-3 apple-meta">
            <Text fontSize="md">{formattedDate}</Text>
            <Box as="span" w="1" h="1" borderRadius="full" bg={mutedTextColor}></Box>
            <Text fontSize="md" className="reading-time">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="apple-icon">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              {readingTime} min read
            </Text>
          </HStack>
          
          {/* Enhanced Social sharing section with Apple-style buttons */}
          <Box mb={{ base: "8", md: "10" }} className="fade-up delay-4">
            <Text fontSize="sm" fontWeight="medium" color={mutedTextColor} mb="3" className="apple-text-small">
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="apple-icon">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="apple-icon">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </Box>
              </Link>
              
              {/* Facebook */}
              <Link 
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(mounted ? window.location.href : '')}`}
                isExternal
                aria-label="Share on Facebook"
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="apple-icon">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="apple-icon">
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
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="apple-icon">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>
              </Box>
            </Flex>
          </Box>
          
          {/* Hero Image with subtle hover animation */}
          {blog.image && blog.image.filePath && (
            <Box w="100%" position="relative" mb={{ base: "12", md: "16" }} className="fade-up delay-5 apple-card apple-image">
              <Image
                src={blog.image.filePath}
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
                className="apple-img-zoom"
              />
              {blog?.imageCaption && (
                <Text fontSize="sm" color={mutedTextColor} mt="2" textAlign="center" className="apple-text-caption">
                  {blog.imageCaption}
                </Text>
              )}
            </Box>
          )}
          
          {/* Blog content with enhanced typography */}
          <Box className="fade-up delay-4">
            <RenderMdx blog={blog} />
          </Box>
          
          {/* Author section */}
          {blog.author && (
            <Box 
              mt={{ base: '8', md: '10' }} 
              mb={{ base: '6', md: '8' }} 
              p={{ base: '4', md: '5' }}
              borderRadius="lg"
              bg={colorMode === 'light' ? 'gray.50' : 'gray.900'}
              border="1px solid"
              borderColor={colorMode === 'light' ? 'gray.100' : 'gray.800'}
              className="author-section apple-card"
              boxShadow="sm"
            >
              <Flex 
                direction={{ base: 'column', sm: 'row' }} 
                align={{ base: 'flex-start', sm: 'center' }}
                gap={{ base: '3', sm: '4' }}
              >
                {blog.authorAvatar ? (
                  <Box 
                    flexShrink="0" 
                    w={{ base: '12', sm: '14' }} 
                    h={{ base: '12', sm: '14' }}
                    borderRadius="full" 
                    overflow="hidden"
                    border="1px solid"
                    borderColor={colorMode === 'light' ? 'blue.100' : 'blue.800'}
                    boxShadow="sm"
                    className="author-avatar apple-avatar"
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
                      className="apple-img"
                    />
                  </Box>
                ) : (
                  <Flex
                    flexShrink="0" 
                    w={{ base: '12', sm: '14' }} 
                    h={{ base: '12', sm: '14' }}
                    borderRadius="full"
                    bg={colorMode === 'light' ? 'blue.500' : 'blue.400'}
                    color="white"
                    align="center"
                    justify="center"
                    fontSize={{ base: 'md', sm: 'lg' }}
                    fontWeight="bold"
                    border="1px solid"
                    borderColor={colorMode === 'light' ? 'blue.100' : 'blue.800'}
                    boxShadow="sm"
                    className="author-avatar apple-avatar"
                  >
                    {blog.author.split(' ').map(name => name[0]).join('').toUpperCase()}
                  </Flex>
                )}
                <Box>
                  <Text 
                    fontWeight="medium" 
                    fontSize={{ base: 'md', sm: 'lg' }} 
                    mb="1"
                    color={headingColor}
                    letterSpacing="-0.01em"
                  >
                    Written by {blog.author}
                  </Text>
                  {blog.authorBio && (
                    <Text 
                      color={mutedTextColor} 
                      fontSize={{ base: 'sm', sm: 'md' }}
                      lineHeight="tall"
                      noOfLines={2}
                      maxW="2xl"
                    >
                      {blog.authorBio}
                    </Text>
                  )}
                  {blog.authorTwitter && (
                    <Link
                      href={`https://twitter.com/${blog.authorTwitter}`}
                      isExternal
                      display="inline-flex"
                      alignItems="center"
                      mt="2"
                      color={linkHoverColor}
                      fontSize="xs"
                      fontWeight="medium"
                      _hover={{ color: linkHoverColor, textDecoration: 'none' }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}>
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                      </svg>
                      @{blog.authorTwitter}
                    </Link>
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
                color={headingColor}
                className="apple-heading-2"
              >
                More to explore
              </Heading>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {blog.relatedPosts.map((post, index) => (
                  <div key={index} className="related-article-card apple-card">
                    <Link 
                      href={post.slug} 
                      className="no-style"
                    >
                      <div>
                        {post.image && (
                          <div 
                            className="overflow-hidden rounded-xl mb-3 apple-image-container"
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
                              className="hover:scale-105 apple-img-zoom"
                            />
                          </div>
                        )}
                        <Text 
                          color={mutedTextColor} 
                          fontSize="sm"
                          mb="2"
                          className="apple-text-date"
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
                          color={headingColor}
                          _hover={{ color: linkHoverColor }}
                          transition="color 0.2s"
                          className="apple-heading-3"
                        >
                          {post.title}
                        </Heading>
                        {post.description && (
                          <Text 
                            color={mutedTextColor}
                            fontSize="md"
                            noOfLines={2}
                            className="apple-text-excerpt"
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
        
        /* Apple-specific animations */
        .apple-bg {
          background: linear-gradient(to bottom, rgba(245,245,247,0.02), rgba(245,245,247,0));
          padding-top: 120px !important;
        }
        
        .apple-heading {
          font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif;
          font-weight: 600;
        }
        
        .apple-heading-2, .apple-heading-3 {
          font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif;
          font-weight: 600;
        }
        
        .apple-text {
          font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif;
          line-height: 1.47059;
        }
        
        .apple-text-small, .apple-text-caption, .apple-text-date, .apple-text-bio {
          font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif;
        }
        
        .apple-content {
          font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif;
          font-size: 1.0625rem;
          line-height: 1.52947;
          letter-spacing: -0.015em;
        }
        
        .apple-card {
          transition: transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1), box-shadow 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
        }
        
        .apple-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }
        
        .apple-link:hover {
          text-decoration: none;
          color: #0066CC;
        }
        
        .apple-image-container {
          overflow: hidden;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }
        
        .apple-img-zoom {
          transition: transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        
        .apple-img-zoom:hover {
          transform: scale(1.03);
        }
        
        .apple-avatar {
          border: 2px solid #f5f5f7;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        
        /* Apple-specific icon animations */
        .apple-icon {
          transition: all 0.3s ease;
        }
        
        .social-share-btn {
          transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        
        .social-share-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          background-color: #f5f5f7;
        }
        
        .social-share-btn:hover .apple-icon {
          color: #0066CC;
        }
        
        /* Dark mode adjustments */
        .dark .apple-bg {
          background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0));
        }
        
        .dark .apple-card:hover {
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
        }
        
        .dark .apple-image-container {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
        
        .dark .apple-avatar {
          border-color: #333;
        }
        
        .dark .social-share-btn:hover {
          background-color: #2d2d2f;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }
        
        /* Fade-up animation classes */
        .fade-up {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        
        .delay-1 {
          animation-delay: 0.1s;
        }
        
        .delay-2 {
          animation-delay: 0.2s;
        }
        
        .delay-3 {
          animation-delay: 0.3s;
        }
        
        .delay-4 {
          animation-delay: 0.4s;
        }
        
        .delay-5 {
          animation-delay: 0.5s;
        }
        
        @keyframes fadeUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Reading progress enhancements */
        .reading-progress-bar {
          transition: width 0.1s ease-out, opacity 0.3s ease, box-shadow 0.3s ease;
        }
        
        .reading-time {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        
        .reading-time svg {
          margin-right: 2px;
        }
        
        @media (max-width: 768px) {
          .apple-bg {
            padding-top: 100px !important;
          }
        }
      `}</style>
    </>
  );
};

export default ClientBlogContent; 