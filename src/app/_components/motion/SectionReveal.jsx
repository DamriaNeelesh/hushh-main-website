"use client";

import { motion, useReducedMotion } from "framer-motion";
import { getSectionMotionPreset, getStaggerMotionPreset } from "./motionTokens";

function resolveMotionTag(as) {
  switch (as) {
    case "article":
      return motion.article;
    case "main":
      return motion.main;
    case "section":
      return motion.section;
    case "ul":
      return motion.ul;
    case "ol":
      return motion.ol;
    default:
      return motion.div;
  }
}

export function MotionSection({
  as = "section",
  family = "marketing",
  className = "",
  delay = 0,
  once = true,
  amount = 0.18,
  children,
  ...props
}) {
  const reduceMotion = useReducedMotion();
  const preset = getSectionMotionPreset(family, reduceMotion, delay);
  const MotionTag = resolveMotionTag(as);

  return (
    <MotionTag
      className={className}
      initial={preset.initial}
      whileInView={preset.animate}
      viewport={{ once, amount }}
      transition={preset.transition}
      {...props}
    >
      {children}
    </MotionTag>
  );
}

export function MotionStaggerGroup({
  as = "div",
  family = "marketing",
  className = "",
  once = true,
  amount = 0.12,
  children,
  ...props
}) {
  const reduceMotion = useReducedMotion();
  const preset = getStaggerMotionPreset(family, reduceMotion);
  const MotionTag = resolveMotionTag(as);

  return (
    <MotionTag
      className={className}
      variants={preset.parent}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      {...props}
    >
      {children}
    </MotionTag>
  );
}

export function MotionStaggerItem({
  as = "div",
  family = "marketing",
  className = "",
  children,
  ...props
}) {
  const reduceMotion = useReducedMotion();
  const preset = getStaggerMotionPreset(family, reduceMotion);
  const MotionTag = resolveMotionTag(as);

  return (
    <MotionTag className={className} variants={preset.item} {...props}>
      {children}
    </MotionTag>
  );
}
