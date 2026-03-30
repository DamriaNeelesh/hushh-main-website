"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let pluginsRegistered = false;

export function ensureGsapPlugins() {
  if (typeof window !== "undefined" && !pluginsRegistered) {
    gsap.registerPlugin(ScrollTrigger);
    pluginsRegistered = true;
  }

  return gsap;
}

export function useReducedMotionPreference() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = (event) => {
      setReduceMotion(event.matches);
    };

    setReduceMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", syncPreference);

    return () => mediaQuery.removeEventListener("change", syncPreference);
  }, []);

  return reduceMotion;
}

export function resolveGsapEase(ease) {
  if (Array.isArray(ease)) {
    return "power3.out";
  }

  switch (ease) {
    case "easeOut":
      return "power3.out";
    case "easeIn":
      return "power2.in";
    case "easeInOut":
      return "power2.inOut";
    case "linear":
      return "none";
    default:
      return typeof ease === "string" && ease ? ease : "power3.out";
  }
}

export function resolveMotionState(state, variants) {
  if (!state) {
    return null;
  }

  if (typeof state === "string") {
    return variants?.[state] ?? null;
  }

  if (typeof state === "object") {
    return state;
  }

  return null;
}

export function toGsapTweenOptions(transition) {
  if (!transition || typeof transition !== "object" || Array.isArray(transition)) {
    return {};
  }

  const options = {
    ease: resolveGsapEase(transition.ease),
  };

  if (typeof transition.duration === "number") {
    options.duration = transition.duration;
  }

  if (typeof transition.delay === "number") {
    options.delay = transition.delay;
  }

  return options;
}

export function toGsapVars(state = {}) {
  const vars = {};
  const keys = [
    "autoAlpha",
    "opacity",
    "x",
    "y",
    "z",
    "scale",
    "scaleX",
    "scaleY",
    "scaleZ",
    "rotate",
    "rotateX",
    "rotateY",
    "rotateZ",
    "clipPath",
    "filter",
    "transformOrigin",
  ];

  keys.forEach((key) => {
    if (state[key] !== undefined) {
      vars[key] = state[key];
    }
  });

  if (state.opacity !== undefined && state.autoAlpha === undefined) {
    vars.autoAlpha = state.opacity;
  }

  return vars;
}
