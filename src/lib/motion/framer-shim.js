"use client";

import React, { forwardRef } from "react";

const STRIPPED_MOTION_PROPS = new Set([
  "animate",
  "animatePresenceProps",
  "custom",
  "drag",
  "dragConstraints",
  "dragElastic",
  "dragMomentum",
  "exit",
  "initial",
  "layout",
  "layoutId",
  "layoutRoot",
  "onAnimationComplete",
  "onDrag",
  "onDragEnd",
  "onDragStart",
  "onLayoutAnimationComplete",
  "style",
  "transformTemplate",
  "transition",
  "variants",
  "whileHover",
  "whileInView",
  "whileTap",
]);

const cache = new Map();

function createMotionComponent(tagName) {
  const MotionComponent = forwardRef(function MotionComponent(props, ref) {
    const nextProps = {};

    for (const [key, value] of Object.entries(props)) {
      if (STRIPPED_MOTION_PROPS.has(key)) {
        if (key === "style" && value && typeof value === "object") {
          nextProps.style = value;
        }
        continue;
      }

      nextProps[key] = value;
    }

    return React.createElement(tagName, { ref, ...nextProps });
  });

  MotionComponent.displayName = `motion.${tagName}`;
  return MotionComponent;
}

export const motion = new Proxy(
  {},
  {
    get(_target, property) {
      if (property === Symbol.toStringTag) {
        return "motion";
      }

      if (!cache.has(property)) {
        cache.set(property, createMotionComponent(property));
      }

      return cache.get(property);
    },
  });

export function AnimatePresence({ children }) {
  return <>{children}</>;
}

export function useIsPresent() {
  return true;
}

export function usePresence() {
  return [true, () => {}];
}
