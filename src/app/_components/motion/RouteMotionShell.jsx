"use client";

import { motion, useReducedMotion } from "framer-motion";
import { getRouteMotionPreset } from "./motionTokens";

export default function RouteMotionShell({
  family = "marketing",
  pathname,
  className = "",
  children,
}) {
  const reduceMotion = useReducedMotion();
  const preset = getRouteMotionPreset(family, reduceMotion);

  return (
    <div
      className={["route-motion-shell", `route-motion-shell--${family}`, className].filter(Boolean).join(" ")}
      data-motion-family={family}
    >
      {preset.withAtmosphere ? (
        <div className="route-motion-atmosphere" aria-hidden="true">
          <span className="route-motion-orb route-motion-orb--primary" />
          <span className="route-motion-orb route-motion-orb--secondary" />
        </div>
      ) : null}
      <motion.div
        key={pathname}
        className="route-motion-content"
        initial={preset.initial}
        animate={preset.animate}
        exit={preset.exit}
        transition={preset.transition}
      >
        {children}
      </motion.div>
    </div>
  );
}
