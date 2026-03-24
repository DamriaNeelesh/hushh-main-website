"use client";

import FundingBanner from "../features/FundingBanner";
import HeaderComponent from "../features/HeaderComponent";
import { useBannerHeight } from "../../context/BannerHeightContext";
import SiteFooter from "./SiteFooter";
import SiteBottomBar from "./SiteBottomBar";
import { normalizeChromePath, shouldHideChrome } from "./chromeConfig";

export default function SiteChromeShell({ children, pathname = "/" }) {
  const { totalOffsetHeight, cssVars } = useBannerHeight();
  const normalizedPath = normalizeChromePath(pathname);
  const showChrome = !shouldHideChrome(normalizedPath);

  if (!showChrome) {
    return <>{children}</>;
  }

  return (
    <div
      data-site-shell-root
      style={cssVars}
      className="site-shell-root min-h-screen bg-white text-richBlack"
    >
      <FundingBanner />
      <HeaderComponent />
      <div
        data-site-shell-spacer
        aria-hidden="true"
        style={{ height: `${totalOffsetHeight}px`, width: "100%" }}
      />
      <div
        data-site-shell-content
        className="site-shell-content min-h-[calc(100dvh-var(--total-offset-height,106px))] flex flex-col"
      >
        <div data-site-route-slot className="site-route-slot flex flex-1 flex-col">
          {children}
        </div>
        <SiteFooter />
      </div>
      <SiteBottomBar />
    </div>
  );
}
