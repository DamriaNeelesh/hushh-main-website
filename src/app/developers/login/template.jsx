"use client";

import { usePathname } from "next/navigation";
import RouteMotionShell from "../../_components/motion/RouteMotionShell";

export default function DeveloperLoginTemplate({ children }) {
  const pathname = usePathname() || "/developers/login";

  return (
    <RouteMotionShell family="app" pathname={pathname}>
      {children}
    </RouteMotionShell>
  );
}
