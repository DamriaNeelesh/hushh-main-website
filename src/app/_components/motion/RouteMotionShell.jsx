"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ensureGsapPlugins, useReducedMotionPreference } from "./gsapMotion";
import { getRouteMotionPreset } from "./motionTokens";

export default function RouteMotionShell({
  family = "marketing",
  pathname,
  className = "",
  children,
}) {
  const shellRef = useRef(null);
  const contentRef = useRef(null);
  const reduceMotion = useReducedMotionPreference();
  const preset = getRouteMotionPreset(family, reduceMotion);

  useLayoutEffect(() => {
    ensureGsapPlugins();

    const contentElement = contentRef.current;
    if (!contentElement) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      const orbElements = shellRef.current?.querySelectorAll(".route-motion-orb") || [];

      gsap.killTweensOf(contentElement);
      gsap.set(contentElement, preset.initial);
      gsap.to(contentElement, {
        ...preset.animate,
        duration: preset.duration,
        ease: preset.ease,
        clearProps: "opacity,visibility,transform",
      });

      if (preset.withAtmosphere && orbElements.length) {
        gsap.fromTo(
          orbElements,
          { autoAlpha: 0, y: 18 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.72,
            ease: "power2.out",
            stagger: 0.08,
          },
        );
      }
    }, shellRef);

    return () => ctx.revert();
  }, [family, pathname, preset]);

  return (
    <div
      ref={shellRef}
      className={["route-motion-shell", `route-motion-shell--${family}`, className].filter(Boolean).join(" ")}
      data-motion-family={family}
    >
      {preset.withAtmosphere ? (
        <div className="route-motion-atmosphere" aria-hidden="true">
          <span className="route-motion-orb route-motion-orb--primary" />
          <span className="route-motion-orb route-motion-orb--secondary" />
        </div>
      ) : null}
      <div ref={contentRef} className="route-motion-content">
        {children}
      </div>
    </div>
  );
}
