"use client";

import { usePathname } from "next/navigation";
import RouteMotionShell from "../_components/motion/RouteMotionShell";

export default function SocialOnboardingTemplate({ children }) {
  const pathname = usePathname() || "/social-onboarding";

  return (
    <RouteMotionShell family="app" pathname={pathname}>
      {children}
    </RouteMotionShell>
  );
}
