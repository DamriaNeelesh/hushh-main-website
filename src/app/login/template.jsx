"use client";

import { usePathname } from "next/navigation";
import RouteMotionShell from "../_components/motion/RouteMotionShell";

export default function LoginTemplate({ children }) {
  const pathname = usePathname() || "/login";

  return (
    <RouteMotionShell family="app" pathname={pathname}>
      {children}
    </RouteMotionShell>
  );
}
