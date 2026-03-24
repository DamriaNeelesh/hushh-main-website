'use client';
import React from 'react';
import { Box } from '@chakra-ui/react';

/**
 * ContentWrapper - Shared page frame for route content
 *
 * Global header/banner spacing is owned by the site shell.
 * This wrapper now standardizes page width, optional background, and route-local spacing only.
 */
const ContentWrapper = ({
  children,
  includeHeaderSpacing: _includeHeaderSpacing = true,
  additionalSpacing = 0,
  minHeight = "auto",
  surface = "default",
  className = "",
  ...boxProps
}) => {
  return (
    <Box
      data-site-page-frame
      data-surface={surface}
      w="full"
      minH={minHeight}
      pt={`${additionalSpacing}px`}
      className={`site-page-frame ${className}`.trim()}
      {...boxProps}>
      
      {children}
    </Box>);

};

export default ContentWrapper;