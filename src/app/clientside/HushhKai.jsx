"use client";

import dynamic from "next/dynamic";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import styles from "./KaiPage.module.css";
import { ensureGsapPlugins, useReducedMotionPreference } from "../_components/motion/gsapMotion";

const KaiDeviceStage = dynamic(() => import("./KaiDeviceStage"), {
  ssr: false,
});

const KAI_APP_URL = "https://apps.apple.com/au/app/hushh-personal-agent-kai/id6757718917";
const KAI_WEB_URL = "https://kai.hushh.ai";

const heroTrustPoints = [
  { icon: "verified_user", label: "Instant KYC Onboarding" },
  { icon: "account_balance", label: "Expert RIA Strategy" },
  { icon: "fingerprint", label: "Absolute Biometric Consent" },
];

const visibilityRows = [
  {
    icon: "savings",
    title: "Chase checking",
    label: "Excess Liquidity",
    amount: "$8,210.00",
  },
  {
    icon: "account_balance",
    title: "Schwab Cash",
    label: "Uninvested",
    amount: "$4,209.52",
  },
];

const strategySteps = [
  {
    number: "01",
    title: "Fetch data.",
    body: "KAI securely finds your money details across all your accounts. Zero manual entry required.",
  },
  {
    number: "02",
    title: "Recommend next moves.",
    body: "KAI finds growth opportunities based on your goals, vetted by an optional RIA committee.",
  },
  {
    number: "03",
    title: "Execute with consent.",
    body: "You review and approve. KAI only acts when you say so. One biometric tap handles everything.",
  },
];

const allocationCards = [
  {
    company: "Apple Inc.",
    symbol: "AAPL",
    note: "Value Sanctuary",
    allocation: "44%",
    amount: "$440.00",
    accent: "green",
    logo: "apple",
  },
  {
    company: "Microsoft",
    symbol: "MSFT",
    note: "AI Alpha",
    allocation: "33%",
    amount: "$330.00",
    accent: "blue",
    logo: "microsoft",
  },
  {
    company: "Google",
    symbol: "GOOGL",
    note: "Compute Core",
    allocation: "25%",
    amount: "$250.00",
    accent: "neutral",
    logo: "google",
  },
];

const governanceCards = [
  {
    icon: "smartphone",
    accent: "blue",
    title: "Your data stays on-device",
    body: "Kai processes everything locally. No cloud. No middleman. No exceptions.",
  },
  {
    icon: "passkey",
    accent: "green",
    title: "User holds the keys",
    body: "Kai proposes, but only you authorize. Every transaction requires explicit, biometric consent.",
  },
  {
    icon: "trending_up",
    accent: "indigo",
    title: "The One-Way Ratchet",
    body: "Income-generating growth. Absolute ownership that only goes up, never down.",
  },
  {
    icon: "account_balance",
    accent: "ink",
    title: "Agent-to-agent trust",
    body: "When Kai needs data it doesn't have, it asks — with your permission — through secure agent protocols.",
  },
];

function MaterialIcon({ name, className = "", filled = false }) {
  return (
    <span
      className={["material-symbols-outlined", className].filter(Boolean).join(" ")}
      style={filled ? { fontVariationSettings: '"FILL" 1, "wght" 400, "GRAD" 0, "opsz" 24' } : undefined}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}

function AppleMark(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M16.86 12.83c.03 3.22 2.82 4.29 2.85 4.3-.02.08-.44 1.5-1.44 2.97-.86 1.27-1.76 2.53-3.16 2.56-1.37.03-1.82-.81-3.39-.81-1.57 0-2.07.79-3.36.84-1.35.05-2.38-1.35-3.25-2.62-1.78-2.58-3.13-7.29-1.31-10.46.9-1.58 2.51-2.58 4.26-2.61 1.33-.03 2.59.9 3.39.9.8 0 2.31-1.11 3.89-.95.66.03 2.52.27 3.71 2.02-.1.06-2.22 1.29-2.19 3.86Zm-2.37-8.94c.72-.87 1.21-2.08 1.08-3.29-1.03.04-2.29.69-3.03 1.56-.67.78-1.26 2.02-1.1 3.2 1.15.09 2.33-.59 3.05-1.47Z" />
    </svg>
  );
}

function CompanyLogo({ name }) {
  if (name === "apple") {
    return <AppleMark className={styles.kaiCompanyLogoSvg} />;
  }

  if (name === "microsoft") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.kaiCompanyLogoSvg}>
        <rect x="2" y="2" width="9" height="9" fill="#F25022" rx="1.2" />
        <rect x="13" y="2" width="9" height="9" fill="#7FBA00" rx="1.2" />
        <rect x="2" y="13" width="9" height="9" fill="#00A4EF" rx="1.2" />
        <rect x="13" y="13" width="9" height="9" fill="#FFB900" rx="1.2" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.kaiCompanyLogoSvg}>
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.55-.21-2.27H12v4.3h6.44a5.5 5.5 0 0 1-2.39 3.61v3h3.88c2.27-2.09 3.56-5.17 3.56-8.64Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.07 7.93-2.91l-3.88-3c-1.07.72-2.45 1.15-4.05 1.15-3.11 0-5.74-2.1-6.68-4.93H1.31v3.09A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC04"
        d="M5.32 14.31A7.18 7.18 0 0 1 4.94 12c0-.8.14-1.57.38-2.31V6.6H1.31A12 12 0 0 0 0 12c0 1.94.46 3.78 1.31 5.4l4.01-3.09Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.77c1.76 0 3.34.61 4.58 1.81l3.43-3.43C17.94 1.2 15.24 0 12 0A12 12 0 0 0 1.31 6.6l4.01 3.09C6.26 6.86 8.89 4.77 12 4.77Z"
      />
    </svg>
  );
}

function AppStoreCta({ className = "" }) {
  return (
    <a
      href={KAI_APP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={[styles.kaiPrimaryCta, className].filter(Boolean).join(" ")}
      aria-label="Download Kai on iOS"
    >
      <AppleMark className={styles.kaiStoreIcon} />
      <span>Get Kai on the App Store</span>
    </a>
  );
}

function WebCta({ className = "" }) {
  return (
    <a
      href={KAI_WEB_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={[styles.kaiSecondaryCta, className].filter(Boolean).join(" ")}
    >
      <span>Continue on Web</span>
      <ArrowRight size={18} strokeWidth={2.2} />
    </a>
  );
}

export default function HushhKai() {
  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const problemRef = useRef(null);
  const visibilityRef = useRef(null);
  const discoveryStageRef = useRef(null);
  const strategyRef = useRef(null);
  const executionRef = useRef(null);
  const governanceRef = useRef(null);
  const finalRef = useRef(null);
  const discoveryProgressRef = useRef(0);
  const reduceMotion = useReducedMotionPreference();
  const [discoveryStageReady, setDiscoveryStageReady] = useState(false);

  const discoveryDeviceProgress = useMemo(
    () => ({
      get: () => discoveryProgressRef.current,
    }),
    [],
  );

  useEffect(() => {
    if (typeof window === "undefined" || discoveryStageReady) {
      return undefined;
    }

    const visibilityElement = visibilityRef.current;
    if (!visibilityElement) {
      return undefined;
    }

    const enableStage = () => {
      setDiscoveryStageReady((current) => current || true);
    };

    const { top } = visibilityElement.getBoundingClientRect();

    if (top <= window.innerHeight * 1.28) {
      enableStage();
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          enableStage();
          observer.disconnect();
        }
      },
      {
        rootMargin: "70% 0px 50% 0px",
        threshold: 0.01,
      },
    );

    observer.observe(visibilityElement);
    return () => observer.disconnect();
  }, [discoveryStageReady]);

  useLayoutEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const root = document.documentElement;

    const measureTopChrome = () => {
      const header = document.querySelector("header");
      const banner = document.querySelector('[aria-label="Funding announcement"]');
      const headerHeight = header?.getBoundingClientRect().height ?? 0;
      const bannerHeight = banner?.getBoundingClientRect().height ?? 0;
      root.style.setProperty("--kai-chrome-offset", `${Math.round(headerHeight + bannerHeight)}px`);
    };

    root.classList.add("kai-scroll-shell");
    measureTopChrome();

    const resizeObserver =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(measureTopChrome) : null;
    const header = document.querySelector("header");
    const banner = document.querySelector('[aria-label="Funding announcement"]');

    if (resizeObserver && header) {
      resizeObserver.observe(header);
    }

    if (resizeObserver && banner) {
      resizeObserver.observe(banner);
    }

    window.addEventListener("resize", measureTopChrome);

    return () => {
      root.classList.remove("kai-scroll-shell");
      root.style.removeProperty("--kai-chrome-offset");
      resizeObserver?.disconnect();
      window.removeEventListener("resize", measureTopChrome);
    };
  }, []);

  useLayoutEffect(() => {
    ensureGsapPlugins();

    const ctx = gsap.context(() => {
      const startsNearTop = typeof window !== "undefined" && window.scrollY < 24;
      const isMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;
      const controllers = [];
      const viewportHeight = typeof window !== "undefined" ? window.innerHeight : 0;

      const collectTargets = (root, selectors) =>
        selectors.flatMap((selector) => gsap.utils.toArray(selector, root));

      const registerController = ({
        ref,
        start,
        selectors,
        timeline,
        onEnter,
        onEnterBack,
        onLeave,
        onLeaveBack,
      }) => {
        if (!ref.current) {
          return;
        }

        const targets = collectTargets(ref.current, selectors);
        timeline.pause(0);

        const trigger = ScrollTrigger.create({
          trigger: ref.current,
          start,
          onEnter: () => {
            onEnter?.();
            timeline.play();
          },
          onEnterBack: () => {
            onEnterBack?.();
            timeline.play();
          },
          onLeave: () => {
            onLeave?.();
          },
          onLeaveBack: () => {
            onLeaveBack?.();
            timeline.reverse();
          },
        });

        controllers.push({
          element: ref.current,
          timeline,
          trigger,
          onEnter,
          onLeave,
          targets,
        });
      };

      if (discoveryStageRef.current) {
        discoveryProgressRef.current = reduceMotion ? 1 : 0;
        ScrollTrigger.create({
          trigger: discoveryStageRef.current,
          start: "top bottom",
          end: "top top",
          onUpdate: (self) => {
            discoveryProgressRef.current = reduceMotion ? 1 : self.progress;
          },
          onLeave: () => {
            discoveryProgressRef.current = 1;
          },
          onLeaveBack: () => {
            discoveryProgressRef.current = 0;
          },
        });
      }

      if (reduceMotion) {
        return;
      }

      const heroGlowSelector = "[data-kai-hero-glow]";
      const heroTitleSelector = "[data-kai-hero-title]";
      const heroBodySelector = "[data-kai-hero-body]";
      const heroActionsSelector = "[data-kai-hero-actions]";
      const heroTrustSelector = "[data-kai-hero-trust]";
      const heroTrustItemSelector = "[data-kai-hero-trust-item]";
      const heroConsentSelector = "[data-kai-hero-consent]";

      if (startsNearTop) {
        gsap.set(heroGlowSelector, { autoAlpha: 0, y: 20 });
        gsap.set(heroTitleSelector, { autoAlpha: 0, y: 36 });
        gsap.set(heroBodySelector, { autoAlpha: 0, y: 20 });
        gsap.set(heroActionsSelector, { autoAlpha: 0, y: 20 });
        gsap.set(heroTrustSelector, { autoAlpha: 0, y: 20 });
        gsap.set(heroTrustItemSelector, { autoAlpha: 0, y: 14 });
        gsap.set(heroConsentSelector, { autoAlpha: 0, y: 12 });

        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .to(heroGlowSelector, { autoAlpha: 1, y: 0, duration: 0.82, stagger: 0.08 }, 0)
          .to(heroTitleSelector, { autoAlpha: 1, y: 0, duration: 0.74 }, 0.08)
          .to(heroBodySelector, { autoAlpha: 1, y: 0, duration: 0.56 }, 0.22)
          .to(heroActionsSelector, { autoAlpha: 1, y: 0, duration: 0.54 }, 0.34)
          .to(heroTrustSelector, { autoAlpha: 1, y: 0, duration: 0.5 }, 0.42)
          .to(heroTrustItemSelector, { autoAlpha: 1, y: 0, duration: 0.44, stagger: 0.08 }, 0.48)
          .to(heroConsentSelector, { autoAlpha: 1, y: 0, duration: 0.42 }, 0.64);
      }

      const problemIntroSelector = "[data-kai-problem-intro]";
      const problemBeforeSelector = "[data-kai-problem-before]";
      const problemArrowSelector = "[data-kai-problem-arrow]";
      const problemAfterSelector = "[data-kai-problem-after]";
      const problemNoteSelector = "[data-kai-problem-note]";

      gsap.set(problemIntroSelector, { autoAlpha: 0, y: 30 });
      gsap.set(problemBeforeSelector, { autoAlpha: 0, y: 32 });
      gsap.set(problemArrowSelector, { autoAlpha: 0, y: 16 });
      gsap.set(problemAfterSelector, { autoAlpha: 0, y: 34 });
      gsap.set(problemNoteSelector, { autoAlpha: 0, y: 14 });

      const problemTimeline = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
      problemTimeline
        .to(problemIntroSelector, { autoAlpha: 1, y: 0, duration: 0.58 }, 0)
        .to(problemBeforeSelector, { autoAlpha: 1, y: 0, duration: 0.66 }, 0.12)
        .to(problemArrowSelector, { autoAlpha: 1, y: 0, duration: 0.34 }, 0.28)
        .to(problemAfterSelector, { autoAlpha: 1, y: 0, duration: 0.74 }, 0.34)
        .to(problemNoteSelector, { autoAlpha: 1, y: 0, duration: 0.38 }, 0.52);

      registerController({
        ref: problemRef,
        start: isMobile ? "top 82%" : "top 76%",
        selectors: [
          problemIntroSelector,
          problemBeforeSelector,
          problemArrowSelector,
          problemAfterSelector,
          problemNoteSelector,
        ],
        timeline: problemTimeline,
      });

      const visibilityIntroSelector = "[data-kai-visibility-intro]";
      const visibilityCardSelector = "[data-kai-visibility-card]";
      const visibilityRowSelector = "[data-kai-visibility-row]";
      const visibilityNoteSelector = "[data-kai-visibility-note]";
      const visibilityBannerSelector = "[data-kai-visibility-banner]";
      const visibilityStatusSelector = "[data-kai-visibility-status]";
      const visibilityDeviceSelector = "[data-kai-visibility-device]";

      gsap.set(visibilityIntroSelector, { autoAlpha: 0, y: 28 });
      gsap.set(visibilityCardSelector, { autoAlpha: 0, y: 32 });
      gsap.set(visibilityRowSelector, { autoAlpha: 0, y: 18 });
      gsap.set(visibilityNoteSelector, { autoAlpha: 0, y: 16 });
      gsap.set(visibilityBannerSelector, { autoAlpha: 0, y: 20 });
      gsap.set(visibilityStatusSelector, { autoAlpha: 0, y: 12 });
      gsap.set(visibilityDeviceSelector, { autoAlpha: 0, y: 34 });

      const visibilityTimeline = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
      visibilityTimeline
        .to(visibilityIntroSelector, { autoAlpha: 1, y: 0, duration: 0.56 }, 0)
        .to(visibilityCardSelector, { autoAlpha: 1, y: 0, duration: 0.72 }, 0.12)
        .to(visibilityRowSelector, { autoAlpha: 1, y: 0, duration: 0.42, stagger: 0.08 }, 0.28)
        .to(visibilityNoteSelector, { autoAlpha: 1, y: 0, duration: 0.34 }, 0.42)
        .to(visibilityBannerSelector, { autoAlpha: 1, y: 0, duration: 0.46 }, 0.5)
        .to(visibilityStatusSelector, { autoAlpha: 1, y: 0, duration: 0.34 }, 0.58)
        .to(visibilityDeviceSelector, { autoAlpha: 1, y: 0, duration: 0.82 }, 0.42);

      registerController({
        ref: visibilityRef,
        start: isMobile ? "top 80%" : "top 72%",
        selectors: [
          visibilityIntroSelector,
          visibilityCardSelector,
          visibilityRowSelector,
          visibilityNoteSelector,
          visibilityBannerSelector,
          visibilityStatusSelector,
          visibilityDeviceSelector,
        ],
        timeline: visibilityTimeline,
      });

      const strategyIntroSelector = "[data-kai-strategy-intro]";
      const strategyVoiceSelector = "[data-kai-strategy-voice]";
      const strategyBarsSelector = "[data-kai-strategy-bar]";
      const strategyConnectorSelector = "[data-kai-strategy-connector]";
      const strategyStepSelector = "[data-kai-strategy-step]";
      const strategyNoteSelector = "[data-kai-strategy-note]";
      const strategyOrbSelector = "[data-kai-strategy-orb]";

      gsap.set(strategyIntroSelector, { autoAlpha: 0, y: 28 });
      gsap.set(strategyVoiceSelector, { autoAlpha: 0, y: 36 });
      gsap.set(strategyBarsSelector, { autoAlpha: 0.3, scaleY: 0.45, transformOrigin: "bottom" });
      gsap.set(strategyConnectorSelector, { autoAlpha: 0, scaleY: 0.6, transformOrigin: "top" });
      gsap.set(strategyStepSelector, { autoAlpha: 0, y: 22 });
      gsap.set(strategyNoteSelector, { autoAlpha: 0, y: 16 });

      const strategyOrbPulse = gsap.to(strategyOrbSelector, {
        scale: isMobile ? 1.04 : 1.07,
        opacity: 0.34,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        paused: true,
      });

      const strategyTimeline = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
      strategyTimeline
        .to(strategyIntroSelector, { autoAlpha: 1, y: 0, duration: 0.56 }, 0)
        .to(strategyVoiceSelector, { autoAlpha: 1, y: 0, duration: 0.76 }, 0.12)
        .to(strategyBarsSelector, { autoAlpha: 1, scaleY: 1, duration: 0.4, stagger: 0.04 }, 0.26)
        .to(strategyConnectorSelector, { autoAlpha: 1, scaleY: 1, duration: 0.28, stagger: 0.06 }, 0.34)
        .to(strategyStepSelector, { autoAlpha: 1, y: 0, duration: 0.48, stagger: 0.12 }, 0.42)
        .to(strategyNoteSelector, { autoAlpha: 1, y: 0, duration: 0.34 }, 0.66);

      registerController({
        ref: strategyRef,
        start: isMobile ? "top 82%" : "top 74%",
        selectors: [
          strategyIntroSelector,
          strategyVoiceSelector,
          strategyBarsSelector,
          strategyConnectorSelector,
          strategyStepSelector,
          strategyNoteSelector,
        ],
        timeline: strategyTimeline,
        onEnter: () => strategyOrbPulse.play(),
        onEnterBack: () => strategyOrbPulse.play(),
        onLeave: () => strategyOrbPulse.pause(),
        onLeaveBack: () => strategyOrbPulse.pause(),
      });

      const executionIntroSelector = "[data-kai-execution-intro]";
      const executionPortfolioSelector = "[data-kai-execution-portfolio]";
      const executionRowSelector = "[data-kai-execution-row]";
      const executionConfirmSelector = "[data-kai-execution-confirm]";
      const executionMetricSelector = "[data-kai-execution-metric]";

      gsap.set(executionIntroSelector, { autoAlpha: 0, y: 28 });
      gsap.set(executionPortfolioSelector, { autoAlpha: 0, y: 34 });
      gsap.set(executionRowSelector, { autoAlpha: 0, y: 20 });
      gsap.set(executionConfirmSelector, { autoAlpha: 0, y: 34 });
      gsap.set(executionMetricSelector, { autoAlpha: 0, y: 14 });

      const executionTimeline = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
      executionTimeline
        .to(executionIntroSelector, { autoAlpha: 1, y: 0, duration: 0.54 }, 0)
        .to(executionPortfolioSelector, { autoAlpha: 1, y: 0, duration: 0.72 }, 0.12)
        .to(executionRowSelector, { autoAlpha: 1, y: 0, duration: 0.42, stagger: 0.08 }, 0.3)
        .to(executionConfirmSelector, { autoAlpha: 1, y: 0, duration: 0.66 }, 0.26)
        .to(executionMetricSelector, { autoAlpha: 1, y: 0, duration: 0.34, stagger: 0.06 }, 0.56);

      registerController({
        ref: executionRef,
        start: isMobile ? "top 82%" : "top 72%",
        selectors: [
          executionIntroSelector,
          executionPortfolioSelector,
          executionRowSelector,
          executionConfirmSelector,
          executionMetricSelector,
        ],
        timeline: executionTimeline,
      });

      const governanceIntroSelector = "[data-kai-governance-intro]";
      const governanceCardSelector = "[data-kai-governance-card]";

      gsap.set(governanceIntroSelector, { autoAlpha: 0, y: 24 });
      gsap.set(governanceCardSelector, { autoAlpha: 0, y: 18 });

      const governanceTimeline = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
      governanceTimeline
        .to(governanceIntroSelector, { autoAlpha: 1, y: 0, duration: 0.5 }, 0)
        .to(governanceCardSelector, { autoAlpha: 1, y: 0, duration: 0.38, stagger: 0.08 }, 0.1);

      registerController({
        ref: governanceRef,
        start: isMobile ? "top 84%" : "top 78%",
        selectors: [governanceIntroSelector, governanceCardSelector],
        timeline: governanceTimeline,
      });

      const finalCopySelector = "[data-kai-final-copy]";
      const finalActionsSelector = "[data-kai-final-actions]";

      gsap.set(finalCopySelector, { autoAlpha: 0, y: 24 });
      gsap.set(finalActionsSelector, { autoAlpha: 0, y: 16 });

      const finalTimeline = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
      finalTimeline
        .to(finalCopySelector, { autoAlpha: 1, y: 0, duration: 0.5 }, 0)
        .to(finalActionsSelector, { autoAlpha: 1, y: 0, duration: 0.38 }, 0.16);

      registerController({
        ref: finalRef,
        start: isMobile ? "top 88%" : "top 82%",
        selectors: [finalCopySelector, finalActionsSelector],
        timeline: finalTimeline,
      });

      controllers.forEach(({ element, timeline, onEnter, onLeave }) => {
        const rect = element.getBoundingClientRect();
        const shouldComplete = rect.top <= viewportHeight * 0.72;
        const isVisible = rect.top < viewportHeight && rect.bottom > 0;

        if (shouldComplete || isVisible) {
          timeline.progress(1).pause();
          onEnter?.();
        } else {
          timeline.progress(0).pause();
          onLeave?.();
        }
      });

      ScrollTrigger.refresh();
    }, pageRef);

    return () => ctx.revert();
  }, [discoveryStageReady, discoveryDeviceProgress, reduceMotion]);

  return (
    <div ref={pageRef} className={styles.kaiDesignerPage}>
      <section ref={heroRef} className={styles.kaiDesignerHero}>
        <div className={styles.kaiHeroGlowPrimary} data-kai-hero-glow aria-hidden="true" />
        <div className={styles.kaiHeroGlowSecondary} data-kai-hero-glow aria-hidden="true" />
        <div className={styles.kaiContentContainer}>
          <div className={styles.kaiHeroStack}>
            <h1 className={styles.kaiHeroTitle} data-kai-hero-title>
              Kai,
              <br />
              Your personal
              <br />
              financial agent.
            </h1>
            <p className={styles.kaiHeroBody} data-kai-hero-body>
              Understand your money, invest better, and grow your wealth—always with your consent.
            </p>

            <div className={styles.kaiHeroActions} data-kai-hero-actions>
              <AppStoreCta className={styles.kaiHeroPrimaryCta} />
              <WebCta className={styles.kaiHeroSecondaryCta} />
            </div>

            <div className={styles.kaiHeroTrustList} data-kai-hero-trust>
              {heroTrustPoints.map((item) => (
                <div
                  key={item.label}
                  className={styles.kaiHeroTrustItem}
                  data-kai-hero-trust-item
                >
                  <MaterialIcon name={item.icon} className={styles.kaiTrustIcon} />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>

            <p className={styles.kaiHeroConsent} data-kai-hero-consent>
              <MaterialIcon name="info" className={styles.kaiInfoIcon} />
              <span>Nothing executes without your explicit approval.</span>
            </p>
          </div>
        </div>
      </section>

      <section ref={problemRef} className={styles.kaiProblemSection}>
        <div className={styles.kaiContentContainer}>
          <div className={styles.kaiProblemIntro} data-kai-problem-intro>
            <p className={`${styles.kaiEyebrow} ${styles.kaiEyebrowDark}`}>THE PROBLEM</p>
            <h2 className={styles.kaiSectionTitleLight}>
              Fragmentation is costly.
              <br />
              Stop the leakage.
            </h2>
            <p className={styles.kaiSectionLeadDark}>
              Idle cash across accounts isn&apos;t just sitting still—it&apos;s losing ground.
              Missed signals and manual tracking quietly drain your capital every month.
            </p>
          </div>

          <div className={styles.kaiProblemCard} data-kai-problem-before>
            <div className={styles.kaiProblemState}>
              <div className={styles.kaiProblemHeader}>
                <p className={styles.kaiMiniEyebrow}>Fragmentation is costly</p>
                <span className={styles.kaiProblemBadge}>Wasted</span>
              </div>

              <div className={styles.kaiProblemRow}>
                <span>Chase / Amex / Venmo</span>
                <strong>$5,412.45</strong>
              </div>
            </div>

            <div className={styles.kaiProblemConnector} data-kai-problem-arrow>
              <div className={styles.kaiProblemConnectorLine} />
              <div className={styles.kaiProblemConnectorButton}>
                <MaterialIcon name="south" className={styles.kaiProblemConnectorIcon} />
              </div>
            </div>

            <div className={styles.kaiProblemUnifiedState} data-kai-problem-after>
              <p className={styles.kaiProblemUnifiedEyebrow}>One Unified Strategy</p>
              <h3 className={styles.kaiProblemUnifiedAmount}>$5,412.45</h3>
              <div className={styles.kaiProblemWorkingRow}>
                <MaterialIcon name="trending_up" className={styles.kaiWorkingIcon} />
                <span>Working 24/7</span>
              </div>
            </div>

            <div className={styles.kaiProblemAuraCoral} aria-hidden="true" />
            <div className={styles.kaiProblemAuraGreen} aria-hidden="true" />
          </div>

          <p className={styles.kaiProblemNote} data-kai-problem-note>
            <MaterialIcon name="verified" className={styles.kaiProblemNoteIcon} />
            <span>Save hours. Make smarter money moves.</span>
          </p>
        </div>
      </section>

      <section ref={visibilityRef} className={styles.kaiVisibilitySection}>
        <div className={styles.kaiContentContainer}>
          <div className={styles.kaiSectionIntro} data-kai-visibility-intro>
            <p className={styles.kaiEyebrow}>VISIBILITY</p>
            <h2 className={styles.kaiSectionTitle}>Total Clarity. Total Control.</h2>
            <p className={styles.kaiSectionLead}>
              Your financial universe, unified. Kai securely scans every account to reveal every
              dollar that could be working harder for you.
            </p>
          </div>

          <div className={styles.kaiVisibilityCard} data-kai-visibility-card>
            <div className={styles.kaiDiscoverySummary}>
              <div className={styles.kaiDiscoveryIconShell}>
                <MaterialIcon name="analytics" className={styles.kaiDiscoveryIcon} filled />
              </div>
              <div className={styles.kaiDiscoveryTitleRow}>
                <span className={styles.kaiMiniEyebrowBlue}>Discovery Report</span>
                <span className={styles.kaiFoundBadge}>Found</span>
              </div>
              <div className={styles.kaiDiscoveryAmount}>$12,419.52</div>
              <p className={styles.kaiDiscoveryCaption}>
                Idle capital found across 4 linked institutions
              </p>
            </div>

            <div className={styles.kaiVisibilityRows}>
              {visibilityRows.map((row) => (
                <div key={row.title} className={styles.kaiVisibilityRow} data-kai-visibility-row>
                  <div className={styles.kaiVisibilityRowInfo}>
                    <div className={styles.kaiVisibilityRowIconShell}>
                      <MaterialIcon name={row.icon} className={styles.kaiVisibilityRowIcon} />
                    </div>
                    <div className={styles.kaiVisibilityRowCopy}>
                      <span>{row.title}</span>
                      <small>{row.label}</small>
                    </div>
                  </div>
                  <strong>{row.amount}</strong>
                </div>
              ))}
            </div>

            <p className={styles.kaiVisibilityNote} data-kai-visibility-note>
              Includes $5,412.45 previously identified, plus newly detected liquidity and missed
              signals from the last 30 days.
            </p>

            <div className={styles.kaiVisibilityBanner} data-kai-visibility-banner>
              <div className={styles.kaiVisibilityBannerCopy}>
                <MaterialIcon name="verified" className={styles.kaiBannerIcon} filled />
                <div>
                  <strong>Optimal deployment ready.</strong>
                  <p>Potential yield uplift: +$520.80/yr</p>
                </div>
              </div>

              <div className={styles.kaiVisibilityStatus} data-kai-visibility-status>
                <span className={styles.kaiStatusDot} />
                <span>System Ready</span>
              </div>
            </div>

            <div className={styles.kaiVisibilityAuraBlue} aria-hidden="true" />
            <div className={styles.kaiVisibilityAuraGreen} aria-hidden="true" />
          </div>

          <div className={styles.kaiVisibilityDeviceRow} data-kai-visibility-device>
            <div
              ref={discoveryStageRef}
              className={`${styles.discoveryDeviceStage} ${styles.kaiDesignerDeviceStage}`}
            >
              <div className={styles.discoveryDeviceAura} aria-hidden="true" />
              {discoveryStageReady ? (
                <KaiDeviceStage
                  className={styles.discoveryImageWrap}
                  progress={discoveryDeviceProgress}
                  reduceMotion={reduceMotion}
                  posterSrc="/Images/kai/discovery-screen.png"
                />
              ) : (
                <div className={styles.discoveryPosterShell} aria-hidden="true">
                  <img
                    src="/Images/kai/discovery-screen.png"
                    alt=""
                    className={styles.discoveryPosterImage}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section ref={strategyRef} className={styles.kaiStrategySection}>
        <div className={styles.kaiContentContainer}>
          <div className={styles.kaiSectionIntro} data-kai-strategy-intro>
            <p className={styles.kaiEyebrow}>Strategy</p>
            <h2 className={styles.kaiSectionTitle}>How KAI works quietly for you.</h2>
            <p className={styles.kaiSectionLead}>
              Wealth management is finally simple. Just ask, approve, and grow your money without
              the manual hustle.
            </p>
          </div>

          <div className={styles.kaiStrategyStack}>
            <div className={styles.kaiVoicePanel} data-kai-strategy-voice>
              <div className={styles.kaiVoiceOrb} data-kai-strategy-orb aria-hidden="true" />
              <p className={styles.kaiVoiceEyebrow}>Just ask Kai</p>
              <p className={styles.kaiVoiceQuote}>“Kai, where should I invest my $1,000?”</p>

              <div className={styles.kaiVoiceBars} aria-hidden="true">
                <span data-kai-strategy-bar />
                <span data-kai-strategy-bar />
                <span data-kai-strategy-bar />
                <span data-kai-strategy-bar />
                <span data-kai-strategy-bar />
              </div>

              <div className={styles.kaiVoiceMic}>
                <MaterialIcon name="mic" className={styles.kaiVoiceMicIcon} />
              </div>
            </div>

            {strategySteps.map((step, index) => (
              <div key={step.number} className={styles.kaiStrategyStepBlock}>
                <div className={styles.kaiConnectorLine} data-kai-strategy-connector />
                <article className={styles.kaiStrategyStepCard} data-kai-strategy-step>
                  <div className={styles.kaiStrategyStepHeader}>
                    <div className={styles.kaiStrategyStepNumber}>{step.number}</div>
                    <h3>{step.title}</h3>
                  </div>
                  <p>{step.body}</p>
                </article>
                {index === strategySteps.length - 1 ? null : null}
              </div>
            ))}
          </div>

          <p className={styles.kaiStrategyNote} data-kai-strategy-note>
            <MaterialIcon name="info" className={styles.kaiStrategyNoteIcon} />
            <span>Connect with expert RIAs through KAI for institutional-grade strategies.</span>
          </p>
        </div>
      </section>

      <section ref={executionRef} className={styles.kaiExecutionSection}>
        <div className={styles.kaiContentContainer}>
          <div className={styles.kaiSectionIntro} data-kai-execution-intro>
            <p className={styles.kaiEyebrow}>Execution</p>
            <h2 className={styles.kaiSectionTitle}>
              Invest with <em>clarity.</em>
            </h2>
            <p className={styles.kaiSectionLead}>
              Kai integrates your portfolio view into a single offensive stance with one-tap
              execution grounded in triple-tier validation.
            </p>
          </div>

          <div className={styles.kaiExecutionGrid}>
            <article className={styles.kaiPortfolioCard} data-kai-execution-portfolio>
              <p className={styles.kaiPortfolioEyebrow}>Proposed Portfolio Realignment</p>
              <div className={styles.kaiPortfolioRows}>
                {allocationCards.map((card) => (
                  <div key={card.symbol} className={styles.kaiPortfolioRow} data-kai-execution-row>
                    <div className={styles.kaiPortfolioInfo}>
                      <div className={styles.kaiCompanyLogoShell}>
                        <CompanyLogo name={card.logo} />
                      </div>
                      <div>
                        <h4>{card.company}</h4>
                        <p>
                          {card.symbol} • {card.note}
                        </p>
                      </div>
                    </div>
                    <div className={styles.kaiPortfolioMeta}>
                      <strong
                        className={
                          card.accent === "green"
                            ? styles.kaiPortfolioValueGreen
                            : card.accent === "blue"
                              ? styles.kaiPortfolioValueBlue
                              : styles.kaiPortfolioValueNeutral
                        }
                      >
                        {card.allocation}
                      </strong>
                      <span>{card.amount}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className={styles.kaiPortfolioFootnote}>
                Expert strategies vetted by our optional fiduciary RIA committee.
              </p>
            </article>

            <article className={styles.kaiConfirmCard} data-kai-execution-confirm>
              <div className={styles.kaiConfirmIconShell}>
                <MaterialIcon name="face" className={styles.kaiConfirmIcon} filled />
              </div>

              <div className={styles.kaiConfirmCopy}>
                <h3>Confirm Allocation</h3>
                <p>
                  Verify with FaceID to securely execute the $1,000 strategy. Transactions are
                  signed locally.
                </p>
              </div>

              <p className={styles.kaiConfirmNote}>
                Tapping triggers trades across all linked accounts.
              </p>

              <div className={styles.kaiExecutionStatusBlock}>
                <p className={styles.kaiExecutionStatusLabel}>
                  <MaterialIcon name="check_circle" className={styles.kaiExecutionStatusIcon} filled />
                  Money, in motion.
                </p>

                <div className={styles.kaiExecutionMetricGrid}>
                  <div data-kai-execution-metric>
                    <p>Growth Impact</p>
                    <strong>+$1,000.00</strong>
                  </div>
                  <div data-kai-execution-metric>
                    <p>Time Saved</p>
                    <strong>4.5h</strong>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section ref={governanceRef} className={styles.kaiGovernanceSection}>
        <div className={styles.kaiContentContainer}>
          <div className={styles.kaiSectionIntro} data-kai-governance-intro>
            <p className={styles.kaiEyebrow}>Governance</p>
            <h2 className={styles.kaiSectionTitle}>
              Your privacy.
              <br />
              Built on iron rules.
            </h2>
            <p className={styles.kaiSectionLead}>
              Built on the Hushh Consent Protocol, Kai ensures total security through on-device
              encryption and absolute fiduciary RIA alignment.
            </p>
          </div>

          <div className={styles.kaiGovernanceList}>
            {governanceCards.map((card) => (
              <article key={card.title} className={styles.kaiGovernanceItem} data-kai-governance-card>
                <div
                  className={[
                    styles.kaiGovernanceIconShell,
                    card.accent === "green"
                      ? styles.kaiGovernanceIconGreen
                      : card.accent === "indigo"
                        ? styles.kaiGovernanceIconIndigo
                        : card.accent === "ink"
                          ? styles.kaiGovernanceIconInk
                          : styles.kaiGovernanceIconBlue,
                  ].join(" ")}
                >
                  <MaterialIcon
                    name={card.icon}
                    className={styles.kaiGovernanceIcon}
                    filled={card.accent !== "ink"}
                  />
                </div>
                <div className={styles.kaiGovernanceCopy}>
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section ref={finalRef} className={styles.kaiFinalSection}>
        <div className={styles.kaiContentContainer}>
          <div className={styles.kaiFinalCopy} data-kai-final-copy>
            <h2 className={styles.kaiFinalTitle}>
              Own your <em>financial future.</em>
            </h2>
            <p className={styles.kaiFinalBody}>
              Stop letting your capital sit idle. Join the era of intelligent banking today.
            </p>
          </div>

          <div className={styles.kaiFinalActions} data-kai-final-actions>
            <AppStoreCta className={styles.kaiFinalPrimaryCta} />
            <WebCta className={styles.kaiFinalSecondaryCta} />
            <p className={styles.kaiFinalNote}>
              Spend less time managing money. More time growing it.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
