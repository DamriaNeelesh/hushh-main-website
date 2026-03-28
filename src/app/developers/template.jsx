"use client";

import { usePathname } from "next/navigation";
import RouteMotionShell from "../_components/motion/RouteMotionShell";

export default function DevelopersTemplate({ children }) {
  const pathname = usePathname() || "/developers";

  if (pathname.startsWith("/developers/login")) {
    return children;
  }

  return (
    <RouteMotionShell family="docs" pathname={pathname}>
      {children}
    </RouteMotionShell>
  );
}
