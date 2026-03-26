"use client";

import FundingBanner from "../features/FundingBanner";
import HeaderComponent from "../features/HeaderComponent";
import { useBannerHeight } from "../../context/BannerHeightContext";
import SiteFooter from "./SiteFooter";
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
        style={{ height: totalOffsetHeight, width: "100%" }}
      />
      <div
        data-site-shell-content
        className="site-shell-content min-h-[calc(100dvh-var(--total-offset-height,106px))] flex flex-col"
      >
        <main data-site-route-slot className="site-route-slot flex flex-1 flex-col">
          {children}
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}
