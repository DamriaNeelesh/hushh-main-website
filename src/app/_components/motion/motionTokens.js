export const MOTION_EASE_EMPHASIZED = [0.22, 1, 0.36, 1];
export const MOTION_EASE_STANDARD = [0.2, 0.8, 0.2, 1];

const NESTED_TEMPLATE_PREFIXES = [
  "/developers",
  "/login",
  "/social-onboarding",
  "/user-profile",
  "/user-registration",
  "/settings",
];

const UTILITY_FAMILY_PREFIXES = [
  "/hushh-id",
  "/hushh_id",
  "/p/",
  "/u/",
  "/qrCodePage",
  "/viva-connect/qrPage",
];

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

const routeMotionPresets = {
  marketing: {
    withAtmosphere: true,
    initial: { opacity: 0, y: 28, scale: 0.992, filter: "blur(8px)" },
    animate: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
    exit: { opacity: 0, y: -14, scale: 0.996, filter: "blur(6px)" },
    transition: { duration: 0.74, ease: MOTION_EASE_EMPHASIZED },
  },
  docs: {
    withAtmosphere: true,
    initial: { opacity: 0, y: 16, scale: 0.996, filter: "blur(4px)" },
    animate: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
    exit: { opacity: 0, y: -8, scale: 0.998, filter: "blur(3px)" },
    transition: { duration: 0.42, ease: MOTION_EASE_STANDARD },
  },
  app: {
    withAtmosphere: false,
    initial: { opacity: 0, y: 12, scale: 0.998 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -6, scale: 0.999 },
    transition: { duration: 0.28, ease: MOTION_EASE_STANDARD },
  },
};

const sectionMotionPresets = {
  marketing: {
    initial: { opacity: 0, y: 34 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.68, ease: MOTION_EASE_EMPHASIZED },
  },
  docs: {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.42, ease: MOTION_EASE_STANDARD },
  },
  app: {
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.32, ease: MOTION_EASE_STANDARD },
  },
};

const staggerMotionPresets = {
  marketing: {
    parent: {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.08,
          delayChildren: 0.04,
        },
      },
    },
    item: {
      hidden: { opacity: 0, y: 18 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.52, ease: MOTION_EASE_EMPHASIZED },
      },
    },
  },
  docs: {
    parent: {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.05,
          delayChildren: 0.02,
        },
      },
    },
    item: {
      hidden: { opacity: 0, y: 12 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.36, ease: MOTION_EASE_STANDARD },
      },
    },
  },
  app: {
    parent: {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.04,
          delayChildren: 0.01,
        },
      },
    },
    item: {
      hidden: { opacity: 0, y: 10 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.28, ease: MOTION_EASE_STANDARD },
      },
    },
  },
};

export function getRouteMotionPreset(family = "marketing", reduceMotion = false) {
  const preset = routeMotionPresets[family] || routeMotionPresets.marketing;

  if (!reduceMotion) {
    return preset;
  }

  return {
    ...preset,
    withAtmosphere: false,
    initial: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
    animate: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
    exit: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
    transition: { duration: 0.01 },
  };
}

export function getSectionMotionPreset(family = "marketing", reduceMotion = false, delay = 0) {
  const preset = sectionMotionPresets[family] || sectionMotionPresets.marketing;

  if (!reduceMotion) {
    return {
      ...preset,
      transition: {
        ...preset.transition,
        delay,
      },
    };
  }

  return {
    initial: { opacity: 1, y: 0 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.01 },
  };
}

export function getStaggerMotionPreset(family = "marketing", reduceMotion = false) {
  const preset = staggerMotionPresets[family] || staggerMotionPresets.marketing;

  if (!reduceMotion) {
    return preset;
  }

  return {
    parent: { hidden: {}, visible: {} },
    item: {
      hidden: { opacity: 1, y: 0 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.01 } },
    },
  };
}
