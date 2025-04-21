'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Box, useColorMode } from '@chakra-ui/react';
import BlogHeader from '../_components/Blog/BlogHeader';

/**
 * Blog-specific layout wrapper with specialized blog features
 * Uses Apple-like design patterns for enhanced reading experience
 */
export default function BlogLayout({ children }) {
  const pathname = usePathname();
  const { colorMode } = useColorMode();
  const [mounted, setMounted] = useState(false);
  
  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
    
    // Hide the main site header when in blog pages
    if (typeof document !== 'undefined') {
      const isDetailPage = pathname && pathname.startsWith('/blogs/') && pathname !== '/blogs';
      const mainHeader = document.querySelector('header');
      
      if (mainHeader) {
        // Hide the main header
        mainHeader.style.display = 'none';
        
        // Restore on unmount
        return () => {
          mainHeader.style.display = '';
        };
      }
    }
  }, [pathname]);
  
  if (!mounted) {
    // Return a minimal layout during SSR to prevent hydration mismatch
    return (
      <Box 
        bg={colorMode === 'light' ? "white" : "black"}
        minH="100vh"
      >
        {children}
      </Box>
    );
  }
  
  return (
    <Box 
      as="div" 
      className="blog-typography"
      bg={colorMode === 'light' ? "white" : "black"}
      minH="100vh"
      transition="background-color 0.3s ease"
    >
      {/* Use our specialized blog header */}
      <BlogHeader />
      
      {/* Blog content with appropriate padding for the fixed header */}
      <Box className="blog-content-container">
        {children}
      </Box>
      
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