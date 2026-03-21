"use client";

import FundingBanner from "./FundingBanner";
import HeaderComponent from "./HeaderComponent";
import { useBannerHeight } from "../../context/BannerHeightContext";
import { usePathname } from "next/navigation";

const HIDE_CHROME_PATHS = [
  "/vivaConnect",
  "/viva-connect",
  "/viva-connect/qrPage",
  "/qrCodePage",
];

export default function GlobalSiteChrome() {
  const pathname = usePathname();
  const { totalOffsetHeight } = useBannerHeight();
  const shouldShowChrome = !HIDE_CHROME_PATHS.includes(pathname);

  if (!shouldShowChrome) {
    return null;
  }

  return (
    <>
      <FundingBanner />
      <HeaderComponent />
      <div
        aria-hidden="true"
        style={{ height: `${totalOffsetHeight}px`, width: "100%" }}
      />
    </>
  );
}
