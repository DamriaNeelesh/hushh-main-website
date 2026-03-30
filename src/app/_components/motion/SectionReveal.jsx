"use client";

import { forwardRef, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ensureGsapPlugins, useReducedMotionPreference } from "./gsapMotion";
import { getSectionMotionPreset, getStaggerMotionPreset } from "./motionTokens";

function resolveTag(as) {
  return as || "div";
}

function setForwardedRef(forwardedRef, node) {
  if (!forwardedRef) {
    return;
  }

  if (typeof forwardedRef === "function") {
    forwardedRef(node);
    return;
  }

  forwardedRef.current = node;
}

export const MotionSection = forwardRef(function MotionSection(
  {
    as = "section",
    family = "marketing",
    className = "",
    delay = 0,
    once = true,
    amount = 0.18,
    children,
    ...props
  },
  forwardedRef,
) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotionPreference();
  const preset = getSectionMotionPreset(family, reduceMotion, delay);
  const Tag = resolveTag(as);

  useLayoutEffect(() => {
    ensureGsapPlugins();

    const element = ref.current;
    if (!element) {
      return undefined;
    }

    if (reduceMotion) {
      gsap.set(element, preset.animate);
      return undefined;
    }

    const tween = gsap.fromTo(
      element,
      preset.initial,
      {
        ...preset.animate,
        duration: preset.duration,
        delay: preset.delay,
        ease: preset.ease,
        scrollTrigger: {
          trigger: element,
          start: `top ${Math.round((1 - amount) * 100)}%`,
          toggleActions: once ? "play none none none" : "play none none reverse",
          once,
        },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [amount, once, preset, reduceMotion]);

  return (
    <Tag
      {...props}
      ref={(node) => {
        ref.current = node;
        setForwardedRef(forwardedRef, node);
      }}
      className={className}
    >
      {children}
    </Tag>
  );
});

export const MotionStaggerGroup = forwardRef(function MotionStaggerGroup(
  {
    as = "div",
    family = "marketing",
    className = "",
    once = true,
    amount = 0.12,
    children,
    ...props
  },
  forwardedRef,
) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotionPreference();
  const preset = getStaggerMotionPreset(family, reduceMotion);
  const Tag = resolveTag(as);

  useLayoutEffect(() => {
    ensureGsapPlugins();

    const element = ref.current;
    if (!element) {
      return undefined;
    }

    const items = gsap.utils.toArray("[data-motion-stagger-item]", element);
    if (!items.length) {
      return undefined;
    }

    if (reduceMotion) {
      gsap.set(items, preset.itemAnimate);
      return undefined;
    }

    gsap.set(items, preset.itemInitial);

    const timeline = gsap.timeline({
      paused: true,
      defaults: {
        duration: preset.duration,
        ease: preset.ease,
      },
    });

    timeline.to(items, {
      ...preset.itemAnimate,
      stagger: preset.stagger,
      delay: preset.delayChildren,
      clearProps: "opacity,visibility,transform",
    });

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: `top ${Math.round((1 - amount) * 100)}%`,
      toggleActions: once ? "play none none none" : "play none none reverse",
      once,
      onEnter: () => timeline.play(),
      onEnterBack: () => {
        if (!once) {
          timeline.play();
        }
      },
      onLeaveBack: () => {
        if (!once) {
          timeline.reverse();
        }
      },
    });

    return () => {
      trigger.kill();
      timeline.kill();
    };
  }, [amount, once, preset, reduceMotion]);

  return (
    <Tag
      {...props}
      ref={(node) => {
        ref.current = node;
        setForwardedRef(forwardedRef, node);
      }}
      className={className}
    >
      {children}
    </Tag>
  );
});

export const MotionStaggerItem = forwardRef(function MotionStaggerItem(
  { as = "div", className = "", children, ...props },
  forwardedRef,
) {
  const Tag = resolveTag(as);

  return (
    <Tag
      {...props}
      ref={forwardedRef}
      className={className}
      data-motion-stagger-item
    >
      {children}
    </Tag>
  );
});
