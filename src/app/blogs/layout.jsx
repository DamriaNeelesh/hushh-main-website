'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Box, useColorMode } from '@chakra-ui/react';

/**
 * Blog-specific layout wrapper with specialized blog features
 * Uses Apple-like design patterns for enhanced reading experience
 */
export default function BlogLayout({ children }) {
  const pathname = usePathname();
  const { colorMode } = useColorMode();
  
  // Apply header spacing adjustments when in blog detail pages
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const isDetailPage = pathname && pathname.startsWith('/blogs/') && pathname !== '/blogs';
      
      // Add debug log to help troubleshoot
      console.log('Blog path:', pathname, 'Is detail page:', isDetailPage);
      
      // Adjust header if needed
      const header = document.querySelector('header');
      if (header && isDetailPage) {
        header.style.position = 'fixed';
        header.style.background = 'transparent';
        header.style.backdropFilter = 'blur(10px)';
        header.style.webkitBackdropFilter = 'blur(10px)';
        header.style.borderBottom = colorMode === 'light' 
          ? '1px solid rgba(0,0,0,0.05)' 
          : '1px solid rgba(255,255,255,0.05)';
        header.style.zIndex = '1000';
        header.style.transition = 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)';
        
        // Scroll detection for header background change
        const handleScroll = () => {
          if (window.scrollY > 100) {
            header.style.backgroundColor = colorMode === 'light' 
              ? 'rgba(255, 255, 255, 0.8)' 
              : 'rgba(0, 0, 0, 0.8)';
            header.style.boxShadow = colorMode === 'light'
              ? '0 2px 10px rgba(0, 0, 0, 0.05)'
              : '0 2px 10px rgba(0, 0, 0, 0.2)';
          } else {
            header.style.backgroundColor = 'transparent';
            header.style.boxShadow = 'none';
          }
        };
        
        // Initial check
        handleScroll();
        
        // Add scroll event
        window.addEventListener('scroll', handleScroll);
        
        // Clear these adjustments when component unmounts
        return () => {
          window.removeEventListener('scroll', handleScroll);
          header.style.position = '';
          header.style.background = '';
          header.style.backdropFilter = '';
          header.style.webkitBackdropFilter = '';
          header.style.borderBottom = '';
          header.style.zIndex = '';
          header.style.boxShadow = '';
          header.style.transition = '';
        };
      }
    }
  }, [pathname, colorMode]);
  
  return (
    <Box 
      as="div" 
      className="blog-typography"
      bg={colorMode === 'light' ? "white" : "black"}
      minH="100vh"
      transition="background-color 0.3s ease"
    >
      {children}
      
      <style jsx global>{`
        .blog-typography {
          animation: blogFadeIn 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        
        @keyframes blogFadeIn {
          from { 
            opacity: 0;
            transform: translateY(10px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Enhanced link styling throughout blog pages */
        .blog-typography a:not(.no-style) {
          color: #0066CC;
          text-decoration: none;
          position: relative;
          transition: all 0.2s cubic-bezier(0.25, 0.1, 0.25, 1);
          display: inline-block;
        }
        
        .blog-typography a:not(.no-style)::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 100%;
          height: 1px;
          background-color: currentColor;
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
        }
        
        .blog-typography a:not(.no-style):hover {
          color: #0077ED;
        }
        
        .blog-typography a:not(.no-style):hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }
        
        /* Apple-style scrollbar */
        .blog-typography::-webkit-scrollbar {
          width: 8px;
        }
        
        .blog-typography::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .blog-typography::-webkit-scrollbar-thumb {
          background-color: rgba(0, 0, 0, 0.2);
          border-radius: 20px;
          border: 2px solid transparent;
        }
        
        .blog-typography::-webkit-scrollbar-thumb:hover {
          background-color: rgba(0, 0, 0, 0.4);
        }
        
        /* Dark mode scrollbar */
        .dark .blog-typography::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.2);
        }
        
        .dark .blog-typography::-webkit-scrollbar-thumb:hover {
          background-color: rgba(255, 255, 255, 0.4);
        }
        
        /* Focus styling */
        .blog-typography *:focus {
          outline: none;
          box-shadow: 0 0 0 2px rgba(0, 102, 204, 0.4);
          transition: box-shadow 0.2s ease;
        }
        
        /* Ensure proper spacing for header */
        .blog-detail-page {
          padding-top: 90px;
        }
        
        /* Enhanced typography for blog content */
        .blog-typography {
          font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          font-feature-settings: "kern";
          text-rendering: optimizeLegibility;
        }
        
        .blog-typography h1,
        .blog-typography h2,
        .blog-typography h3 {
          font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif;
        }
      `}</style>
    </Box>
  );
} 