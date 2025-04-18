'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Box } from '@chakra-ui/react';

/**
 * Blog-specific layout wrapper with specialized blog features
 * Uses Apple-like design patterns for enhanced reading experience
 */
export default function BlogLayout({ children }) {
  const pathname = usePathname();
  
  return (
    <>
      {/* Apply blog-typography class to all content within the blog section */}
      <Box as="div" className="blog-typography">
        {children}
      </Box>
      
      {/* Fade-in animation for initial page load */}
      <style jsx global>{`
        @keyframes blogFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .blog-typography {
          animation: blogFadeIn 0.5s ease-out;
        }
        
        /* Enhanced link styling throughout blog pages */
        .blog-typography a:not(.no-style) {
          color: #0066CC;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        
        .blog-typography a:not(.no-style):hover {
          color: #004499;
        }
      `}</style>
    </>
  );
} 