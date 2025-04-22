'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Box, Flex, HStack, Text, IconButton, useColorMode, Container } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import { usePathname } from 'next/navigation';
import HushhHeaderLogo from '../svg/hushhHeaderLogo';

/**
 * Specialized Apple-style header for blog pages
 * Uses glass morphism and minimalist design principles
 */
const BlogHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { colorMode } = useColorMode();
  const pathname = usePathname();
  
  // Determine if we're on a detailed blog post page
  const isDetailPage = pathname && pathname.startsWith('/blogs/') && pathname !== '/blogs';
  
  // Handle scroll events for the header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    // Initial check
    handleScroll();
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Handle closing mobile menu when clicking outside
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    
    const handleClickOutside = (e) => {
      if (!e.target.closest('.mobile-menu-container')) {
        setIsMobileMenuOpen(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMobileMenuOpen]);
  
  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);
  
  // Define theme colors
  const headerBgClass = isScrolled 
    ? 'apple-header-glass' 
    : 'apple-header-transparent';
  
  const textColor = colorMode === 'light' 
    ? 'rgba(0, 0, 0, 0.8)' 
    : 'rgba(255, 255, 255, 0.9)';
  
  const accentColor = colorMode === 'light' ? '#0066CC' : '#2997FF';
  
  return (
    <Box 
      as="header"
      position="fixed"
      top="0"
      left="0"
      right="0"
      height={{ base: '54px', md: '64px' }}
      zIndex="1000"
      transition="all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)"
      className={`apple-header ${headerBgClass}`}
      color={textColor}
    >
      <Container maxW="1280px" h="100%">
        <Flex 
          h="100%" 
          alignItems="center" 
          justifyContent="space-between"
          px={{ base: 4, md: 6 }}
        >
          {/* Left side: Logo + back button for detail pages */}
          <Flex alignItems="center">
            {isDetailPage && (
              <Link href="/hushhBlogs" passHref>
                <Box
                  as="span"
                  display="flex"
                  alignItems="center"
                  mr={4}
                  className="apple-header-link"
                  color={accentColor}
                >
                  <ChevronLeftIcon boxSize={5} mr={1} />
                  <Text 
                    fontSize="14px" 
                    fontWeight="500"
                    display={{ base: 'none', md: 'block' }}
                  >
                    Newsroom
                  </Text>
                </Box>
              </Link>
            )}
            
            <Link href="/" className="apple-header-logo">
              <Box opacity={isScrolled ? 1 : 0.9}>
                <HushhHeaderLogo />
              </Box>
            </Link>
          </Flex>
          
          {/* Center: Navigation links (desktop only) */}
          <HStack 
            spacing={8} 
            display={{ base: 'none', md: 'flex' }}
          >
            <Link href="/hushhBlogs" className="apple-header-link">
              <Text 
                fontSize="14px" 
                fontWeight="500"
                className={pathname === '/hushhBlogs' ? 'apple-header-active-link' : ''}
              >
                Newsroom
              </Text>
            </Link>
            
            <Link href="/categories/all" className="apple-header-link">
              <Text 
                fontSize="14px" 
                fontWeight="500"
                className={pathname.startsWith('/categories') ? 'apple-header-active-link' : ''}
              >
                Categories
              </Text>
            </Link>
            
            <Link href="/about" className="apple-header-link">
              <Text fontSize="14px" fontWeight="500">
                About
              </Text>
            </Link>
            
            <Link href="/contact-us" className="apple-header-link">
              <Text fontSize="14px" fontWeight="500">
                Contact
              </Text>
            </Link>
          </HStack>
          
          {/* Right side: Mobile menu toggle */}
          <Box display={{ base: 'block', md: 'none' }}>
            <IconButton
              aria-label="Toggle menu"
              icon={isMobileMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
              variant="ghost"
              color="currentColor"
              _hover={{ bg: 'transparent', opacity: 0.7 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </Box>
        </Flex>
      </Container>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <Box
          position="fixed"
          top="54px"
          left="0"
          right="0"
          bottom="0"
          className="blog-mobile-menu mobile-menu-container"
          zIndex="1000"
          p={6}
          animation="fadeInDown 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)"
          color={textColor}
        >
          <Flex direction="column" h="100%">
            <Box flex="1">
              <Flex direction="column" align="center" mt={8} spacing={6}>
                <Link 
                  href="/hushhBlogs" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="apple-header-link"
                >
                  <Text
                    fontSize="18px"
                    fontWeight="500"
                    mb={6}
                    className={pathname === '/hushhBlogs' ? 'apple-header-active-link' : ''}
                  >
                    Newsroom
                  </Text>
                </Link>
                
                <Link 
                  href="/categories/all" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="apple-header-link"
                >
                  <Text
                    fontSize="18px"
                    fontWeight="500"
                    mb={6}
                    className={pathname.startsWith('/categories') ? 'apple-header-active-link' : ''}
                  >
                    Categories
                  </Text>
                </Link>
                
                <Link 
                  href="/about" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="apple-header-link"
                >
                  <Text fontSize="18px" fontWeight="500" mb={6}>
                    About
                  </Text>
                </Link>
                
                <Link 
                  href="/contact-us" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="apple-header-link"
                >
                  <Text fontSize="18px" fontWeight="500" mb={6}>
                    Contact
                  </Text>
                </Link>
              </Flex>
            </Box>
            
            <Box textAlign="center" py={4}>
              <Text fontSize="sm" opacity={0.7}>
                © {new Date().getFullYear()} Hushh. All rights reserved.
              </Text>
            </Box>
          </Flex>
        </Box>
      )}
      
      <style jsx global>{`
        /* Additional styles for perfect header rendering */
        .apple-header-transparent {
          background-color: ${colorMode === 'light' 
            ? 'rgba(255, 255, 255, 0)' 
            : 'rgba(0, 0, 0, 0)'};
        }
        
        .apple-header-glass {
          background-color: ${colorMode === 'light' 
            ? 'rgba(255, 255, 255, 0.8)' 
            : 'rgba(0, 0, 0, 0.8)'};
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid ${colorMode === 'light'
            ? 'rgba(0, 0, 0, 0.1)'
            : 'rgba(255, 255, 255, 0.1)'};
          box-shadow: ${colorMode === 'light'
            ? '0 1px 10px rgba(0, 0, 0, 0.05)'
            : '0 1px 10px rgba(0, 0, 0, 0.2)'};
        }
        
        /* Force text colors */
        .apple-header-link, 
        .apple-header .chakra-text {
          color: ${textColor};
        }
      `}</style>
    </Box>
  );
};

export default BlogHeader; 