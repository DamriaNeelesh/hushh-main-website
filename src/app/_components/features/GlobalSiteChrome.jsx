"use client";

import { usePathname } from "next/navigation";
import SiteChromeShell from "../shell/SiteChromeShell";

export default function GlobalSiteChrome({ children }) {
  const pathname = usePathname();

  return <SiteChromeShell pathname={pathname}>{children}</SiteChromeShell>;
}
