"use client";

import { usePathname } from "next/navigation";
import RouteMotionShell from "../_components/motion/RouteMotionShell";

export default function UserRegistrationTemplate({ children }) {
  const pathname = usePathname() || "/user-registration";

  return (
    <RouteMotionShell family="app" pathname={pathname}>
      {children}
    </RouteMotionShell>
  );
}
