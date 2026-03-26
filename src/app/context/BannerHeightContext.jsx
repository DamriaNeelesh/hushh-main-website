'use client';
import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';

// Constants extracted outside component to prevent recreation
const HEADER_HEIGHT = 70;
const FUNDING_BANNER_HEIGHT = "var(--funding-banner-height, 36px)";

const BannerHeightContext = createContext();

export const useBannerHeight = () => {
  const context = useContext(BannerHeightContext);
  if (!context) {
    throw new Error('useBannerHeight must be used within a BannerHeightProvider');
  }
  return context;
};

export const BannerHeightProvider = ({ children }) => {
  const [activeBanners, setActiveBanners] = useState({
    funding: true,
  });

  const fundingBannerHeight = useMemo(
    () => (activeBanners.funding ? FUNDING_BANNER_HEIGHT : "0px"),
    [activeBanners.funding]
  );

  const totalBannerHeight = fundingBannerHeight;
  const totalOffsetHeight = useMemo(
    () => `calc(${HEADER_HEIGHT}px + ${totalBannerHeight})`,
    [totalBannerHeight]
  );

  // Memoized functions to prevent unnecessary re-renders
  const registerBanner = useCallback((bannerType) => {
    setActiveBanners(prev => ({ ...prev, [bannerType]: true }));
  }, []);

  const unregisterBanner = useCallback((bannerType) => {
    setActiveBanners(prev => ({ ...prev, [bannerType]: false }));
  }, []);

  // Memoized context value to prevent unnecessary re-renders of consumers
  const value = useMemo(() => ({
    activeBanners,
    fundingBannerHeight,
    totalBannerHeight,
    headerHeight: HEADER_HEIGHT,
    totalOffsetHeight,
    registerBanner,
    unregisterBanner,
    // CSS custom properties as computed values (no side effects)
    cssVars: {
      '--funding-banner-height': "36px",
      '--total-banner-height': totalBannerHeight,
      '--total-offset-height': totalOffsetHeight,
      '--header-height': `${HEADER_HEIGHT}px`,
    }
  }), [
    activeBanners,
    fundingBannerHeight,
    totalBannerHeight,
    totalOffsetHeight,
    registerBanner,
    unregisterBanner
  ]);

  return (
    <BannerHeightContext.Provider value={value}>
      {children}
    </BannerHeightContext.Provider>
  );
}; 
