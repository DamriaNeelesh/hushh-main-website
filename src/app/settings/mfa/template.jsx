"use client";

import { usePathname } from "next/navigation";
import RouteMotionShell from "../../_components/motion/RouteMotionShell";

export default function MfaTemplate({ children }) {
  const pathname = usePathname() || "/settings/mfa";

  return (
    <RouteMotionShell family="app" pathname={pathname}>
      {children}
    </RouteMotionShell>
  );
}
