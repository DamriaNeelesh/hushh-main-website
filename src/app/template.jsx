"use client";

import { usePathname } from "next/navigation";
import RouteMotionShell from "./_components/motion/RouteMotionShell";
import {
  resolveRootMotionFamily,
  shouldDeferToNestedMotionShell,
} from "./_components/motion/motionTokens";

export default function AppTemplate({ children }) {
  const pathname = usePathname() || "/";

  if (shouldDeferToNestedMotionShell(pathname)) {
    return children;
  }

  return (
    <RouteMotionShell family={resolveRootMotionFamily(pathname)} pathname={pathname}>
      {children}
    </RouteMotionShell>
  );
}
