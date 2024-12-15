"use client";

import { createContext, useContext } from "react";
import { useMediaQuery } from "@chakra-ui/react";

export const responsiveSizeContext = createContext(null);

export default function ResponsiveSizeProvider({ children }) {
  // mobile media query. (UPDATED TO TARGET TABLETS)
  const [isMobile] = useMediaQuery("(max-width: 62.5em)"); //30em

  //tablet media query
  const [minWidthTablet] = useMediaQuery("(min-width: 62em)");
  const [maxWidthTablet] = useMediaQuery("(max-width: 75em)");
  const isTablet = minWidthTablet && maxWidthTablet;

  // desktop media query
  const [isDesktop] = useMediaQuery("(min-width: 62.5em)");

  return (
    <responsiveSizeContext.Provider value={{ isMobile, isTablet, isDesktop }}>
      {children}
    </responsiveSizeContext.Provider>
  );
}

export function useResponsiveSizes(forceMobile = false) {
  const { isMobile, isTablet, isDesktop } = useContext(responsiveSizeContext);

  return {
    isMobile: isMobile || forceMobile,
    isTablet,
    isDesktop,
  };
}
