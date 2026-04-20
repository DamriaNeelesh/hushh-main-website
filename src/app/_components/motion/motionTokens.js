export const MOTION_EASE_EMPHASIZED = "power3.out";
export const MOTION_EASE_STANDARD = "power2.out";

const NESTED_TEMPLATE_PREFIXES = [
  "/foundation",
  "/developers",
  "/login",
  "/social-onboarding",
  "/user-profile",
  "/user-registration",
  "/settings",
];

const UTILITY_FAMILY_PREFIXES = [
  "/hushh-id",
  "/p/",
  "/u/",
  "/qrCodePage",
  "/viva-connect/qrPage",
];

const routeMotionPresets = {
  marketing: {
    withAtmosphere: true,
    initial: { autoAlpha: 0, y: 24, scale: 0.994 },
    animate: { autoAlpha: 1, y: 0, scale: 1 },
    duration: 0.68,
    ease: MOTION_EASE_EMPHASIZED,
  },
  docs: {
    withAtmosphere: true,
    initial: { autoAlpha: 0, y: 14 },
    animate: { autoAlpha: 1, y: 0 },
    duration: 0.34,
    ease: MOTION_EASE_STANDARD,
  },
  app: {
    withAtmosphere: false,
    initial: { autoAlpha: 0, y: 10 },
    animate: { autoAlpha: 1, y: 0 },
    duration: 0.28,
    ease: MOTION_EASE_STANDARD,
  },
};

const sectionMotionPresets = {
  marketing: {
    initial: { autoAlpha: 0, y: 28 },
    animate: { autoAlpha: 1, y: 0 },
    duration: 0.62,
    ease: MOTION_EASE_EMPHASIZED,
  },
  docs: {
    initial: { autoAlpha: 0, y: 18 },
    animate: { autoAlpha: 1, y: 0 },
    duration: 0.4,
    ease: MOTION_EASE_STANDARD,
  },
  app: {
    initial: { autoAlpha: 0, y: 12 },
    animate: { autoAlpha: 1, y: 0 },
    duration: 0.28,
    ease: MOTION_EASE_STANDARD,
  },
};

const staggerMotionPresets = {
  marketing: {
    itemInitial: { autoAlpha: 0, y: 18 },
    itemAnimate: { autoAlpha: 1, y: 0 },
    duration: 0.48,
    ease: MOTION_EASE_EMPHASIZED,
    stagger: 0.08,
    delayChildren: 0.04,
  },
  docs: {
    itemInitial: { autoAlpha: 0, y: 12 },
    itemAnimate: { autoAlpha: 1, y: 0 },
    duration: 0.34,
    ease: MOTION_EASE_STANDARD,
    stagger: 0.05,
    delayChildren: 0.02,
  },
  app: {
    itemInitial: { autoAlpha: 0, y: 10 },
    itemAnimate: { autoAlpha: 1, y: 0 },
    duration: 0.24,
    ease: MOTION_EASE_STANDARD,
    stagger: 0.04,
    delayChildren: 0.01,
  },
};

export function shouldDeferToNestedMotionShell(pathname = "/") {
  return NESTED_TEMPLATE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export function resolveRootMotionFamily(pathname = "/") {
  if (
    UTILITY_FAMILY_PREFIXES.some(
      (prefix) => pathname === prefix || pathname.startsWith(prefix),
    )
  ) {
    return "app";
  }

  return "marketing";
}

export function getRouteMotionPreset(family = "marketing", reduceMotion = false) {
  const preset = routeMotionPresets[family] || routeMotionPresets.marketing;

  if (reduceMotion) {
    return {
      ...preset,
      withAtmosphere: false,
      initial: { autoAlpha: 1, y: 0, scale: 1 },
      animate: { autoAlpha: 1, y: 0, scale: 1 },
      duration: 0.01,
      ease: "none",
    };
  }

  return preset;
}

export function getSectionMotionPreset(family = "marketing", reduceMotion = false, delay = 0) {
  const preset = sectionMotionPresets[family] || sectionMotionPresets.marketing;

  if (reduceMotion) {
    return {
      initial: { autoAlpha: 1, y: 0 },
      animate: { autoAlpha: 1, y: 0 },
      duration: 0.01,
      delay: 0,
      ease: "none",
    };
  }

  return {
    ...preset,
    delay,
  };
}

export function getStaggerMotionPreset(family = "marketing", reduceMotion = false) {
  const preset = staggerMotionPresets[family] || staggerMotionPresets.marketing;

  if (reduceMotion) {
    return {
      itemInitial: { autoAlpha: 1, y: 0 },
      itemAnimate: { autoAlpha: 1, y: 0 },
      duration: 0.01,
      ease: "none",
      stagger: 0,
      delayChildren: 0,
    };
  }

  return preset;
}
