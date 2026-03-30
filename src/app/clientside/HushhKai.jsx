"use client";

import dynamic from "next/dynamic";
import { useReducedMotion, useScroll } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  BadgeCheck,
  BadgeDollarSign,
  BarChart3,
  ChevronsDown,
  CheckCircle2,
  Clock3,
  Code2,
  Fingerprint,
  Gem,
  Info,
  Landmark,
  Mic,
  ScanFace,
  Shield,
  TrendingUp,
} from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./KaiPage.module.css";

const KaiDeviceStage = dynamic(() => import("./KaiDeviceStage"), {
  ssr: false,
});

const KAI_APP_URL = "https://apps.apple.com/au/app/hushh-personal-agent-kai/id6757718917";
const KAI_WEB_URL = "https://kai.hushh.ai";

const heroTrustPoints = [
  {
    label: "Instant KYC Onboarding",
    icon: BadgeCheck,
  },
  {
    label: "Expert RIA Strategy",
    icon: Landmark,
  },
  {
    label: "Absolute Biometric Consent",
    icon: Fingerprint,
  },
];

const fragmentedRows = [
  { label: "Chase Savings", amount: "$4,210.00", tone: "high" },
  { label: "Amex Rewards", amount: "$890.45", tone: "soft" },
  { label: "Venmo Balance", amount: "$312.00", tone: "high" },
];

const visibilityCards = [
  {
    eyebrow: "Idle Capital Detected",
    title: "Chase Platinum",
    detail: "$8,420.00",
    icon: Landmark,
    tone: "blue",
  },
  {
    eyebrow: "Unused Liquidity",
    title: "Schwab Brokerage",
    detail: "$4,000.",
    detailMuted: "52",
    icon: BarChart3,
    tone: "indigo",
  },
];

const strategySteps = [
  {
    number: "01",
    title: "Fetch data.",
    body: "Kai connects to your universe, fetching every dollar instantly.",
  },
  {
    number: "02",
    title: "Recommend next moves.",
    body: "Expert RIA algorithms and humans curate your optimal portfolio.",
  },
  {
    number: "03",
    title: "Execute with consent.",
    body: "One tap is all it takes. Nothing moves without your approval.",
  },
];

const strategyNotes = [
  {
    body: "Expert Guidance from elite RIA advisors for elite precision.",
    icon: Info,
    tone: "neutral",
  },
  {
    body: "Expert-backed strategies built to grow your capital.",
    icon: TrendingUp,
    tone: "positive",
  },
];

const allocationCards = [
  {
    company: "Apple Inc.",
    symbol: "AAPL",
    logo: "apple",
    allocation: "44%",
    amount: "$440.00",
    note: "Value Sanctuary",
  },
  {
    company: "Microsoft",
    symbol: "MSFT",
    logo: "microsoft",
    allocation: "33%",
    amount: "$330.00",
    note: "AI Alpha",
  },
  {
    company: "Google",
    symbol: "GOOGL",
    logo: "google",
    allocation: "25%",
    amount: "$250.00",
    note: "Compute Core",
  },
];

const governanceCards = [
  {
    title: "Your keys, your data",
    body: "All financial information is encrypted and stored strictly on your device.",
    icon: Shield,
    tone: "blue",
  },
  {
    title: "Zero-knowledge",
    body: "Every data access generates a Consent Receipt. No silent sharing.",
    icon: BadgeCheck,
    tone: "green",
  },
  {
    title: "Open protocol",
    body: "The Hushh Protocol is open source. Audit it yourself for peace of mind.",
    icon: Code2,
    tone: "indigo",
  },
  {
    title: "Secure Heritage",
    body: "Built by veterans of Google Cloud and Azure ML with a focus on security.",
    icon: Gem,
    tone: "ink",
  },
];

function ExternalCta({ href, variant = "primary", className = "", heroSized = false, children }) {
  const baseClassName = variant === "primary" ? styles.primaryCta : styles.secondaryCta;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-kai-hero-cta={heroSized ? "true" : undefined}
      className={[baseClassName, className].filter(Boolean).join(" ")}
    >
      <span>{children}</span>
      <ArrowRight size={18} strokeWidth={2.1} />
    </a>
  );
}

function AppleMark(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M16.86 12.83c.03 3.22 2.82 4.29 2.85 4.3-.02.08-.44 1.5-1.44 2.97-.86 1.27-1.76 2.53-3.16 2.56-1.37.03-1.82-.81-3.39-.81-1.57 0-2.07.79-3.36.84-1.35.05-2.38-1.35-3.25-2.62-1.78-2.58-3.13-7.29-1.31-10.46.9-1.58 2.51-2.58 4.26-2.61 1.33-.03 2.59.9 3.39.9.8 0 2.31-1.11 3.89-.95.66.03 2.52.27 3.71 2.02-.1.06-2.22 1.29-2.19 3.86Zm-2.37-8.94c.72-.87 1.21-2.08 1.08-3.29-1.03.04-2.29.69-3.03 1.56-.67.78-1.26 2.02-1.1 3.2 1.15.09 2.33-.59 3.05-1.47Z" />
    </svg>
  );
}

function AppStoreCta({ href, className = "", heroSized = false }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-kai-hero-store={heroSized ? "true" : undefined}
      className={[styles.primaryCta, styles.storeCta, className].filter(Boolean).join(" ")}
      aria-label="Download Kai on the App Store"
    >
      <AppleMark className={styles.storeCtaIcon} />
      <span className={styles.storeCtaLabel}>Get Kai on the App Store</span>
    </a>
  );
}

function CompanyLogo({ name }) {
  if (name === "apple") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M16.86 12.83c.03 3.22 2.82 4.29 2.85 4.3-.02.08-.44 1.5-1.44 2.97-.86 1.27-1.76 2.53-3.16 2.56-1.37.03-1.82-.81-3.39-.81-1.57 0-2.07.79-3.36.84-1.35.05-2.38-1.35-3.25-2.62-1.78-2.58-3.13-7.29-1.31-10.46.9-1.58 2.51-2.58 4.26-2.61 1.33-.03 2.59.9 3.39.9.8 0 2.31-1.11 3.89-.95.66.03 2.52.27 3.71 2.02-.1.06-2.22 1.29-2.19 3.86Zm-2.37-8.94c.72-.87 1.21-2.08 1.08-3.29-1.03.04-2.29.69-3.03 1.56-.67.78-1.26 2.02-1.1 3.2 1.15.09 2.33-.59 3.05-1.47Z" />
      </svg>
    );
  }

  if (name === "microsoft") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="2" y="2" width="9" height="9" fill="#F25022" rx="1.2" />
        <rect x="13" y="2" width="9" height="9" fill="#7FBA00" rx="1.2" />
        <rect x="2" y="13" width="9" height="9" fill="#00A4EF" rx="1.2" />
        <rect x="13" y="13" width="9" height="9" fill="#FFB900" rx="1.2" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
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

export default function HushhKai() {
  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const discoveryRef = useRef(null);
  const discoveryStageRef = useRef(null);
  const problemRef = useRef(null);
  const strategyRef = useRef(null);
  const executionRef = useRef(null);
  const governanceRef = useRef(null);
  const finalRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const [discoveryStageReady, setDiscoveryStageReady] = useState(false);

  const { scrollYProgress: discoveryDeviceProgress } = useScroll({
    target: discoveryStageRef,
    offset: ["start end", "start start"],
  });

  useEffect(() => {
    if (typeof window === "undefined" || discoveryStageReady) {
      return undefined;
    }

    const discoveryElement = discoveryRef.current;

    if (!discoveryElement) {
      return undefined;
    }

    const enableStage = () => {
      setDiscoveryStageReady((current) => current || true);
    };

    const { top } = discoveryElement.getBoundingClientRect();

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
      }
    );

    observer.observe(discoveryElement);

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
    if (typeof window === "undefined") {
      return undefined;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        return;
      }

      const isMobileViewport = window.matchMedia("(max-width: 767px)").matches;
      const startsNearTop = window.scrollY < 24;
      const revealStarts = {
        discovery: isMobileViewport ? "top 80%" : "top 72%",
        problem: isMobileViewport ? "top 82%" : "top 74%",
        strategy: isMobileViewport ? "top 80%" : "top 72%",
        execution: isMobileViewport ? "top 78%" : "top 70%",
        governance: isMobileViewport ? "top 84%" : "top 78%",
        final: isMobileViewport ? "top 86%" : "top 80%",
      };

      const collectTargets = (...selectors) =>
        selectors.flatMap((selector) => gsap.utils.toArray(selector));
      const setActiveMotionTargets = (targets, active) => {
        if (targets.length === 0) {
          return;
        }

        gsap.set(targets, { willChange: active ? "transform, opacity" : "auto" });
      };

      const sectionControllers = [];

      const registerController = ({
        ref,
        start,
        timeline,
        targets,
        onEnter,
        onLeave,
        onEnterBack,
        onLeaveBack,
      }) => {
        if (!ref.current) {
          return;
        }

        timeline.pause(0);
        timeline.eventCallback("onComplete", () => setActiveMotionTargets(targets, false));
        timeline.eventCallback("onReverseComplete", () => setActiveMotionTargets(targets, false));

        const trigger = ScrollTrigger.create({
          trigger: ref.current,
          start,
          invalidateOnRefresh: true,
          onEnter: () => {
            setActiveMotionTargets(targets, true);
            onEnter?.();
            timeline.play();
          },
          onEnterBack: () => {
            setActiveMotionTargets(targets, true);
            onEnterBack?.();
            timeline.play();
          },
          onLeave: () => {
            onLeave?.();
          },
          onLeaveBack: () => {
            setActiveMotionTargets(targets, true);
            onLeaveBack?.();
            timeline.reverse();
          },
        });

        sectionControllers.push({
          element: ref.current,
          timeline,
          targets,
          trigger,
          onEnter,
          onLeave,
        });
      };

      const heroGlowSelector = "[data-kai-hero-glow]";
      const heroKickerSelector = "[data-kai-hero-kicker]";
      const heroLineSelector = "[data-kai-hero-line]";
      const heroCopySelector = "[data-kai-hero-copy]";
      const heroActionsWrapSelector = "[data-kai-hero-actions-wrap]";
      const heroTrustWrapSelector = "[data-kai-hero-trust-wrap]";
      const heroTrustItemWrapSelector = "[data-kai-hero-trust-item-wrap]";
      const heroConsentSelector = "[data-kai-hero-consent]";

      const heroTargets = collectTargets(
        heroGlowSelector,
        heroKickerSelector,
        heroLineSelector,
        heroCopySelector,
        heroActionsWrapSelector,
        heroTrustWrapSelector,
        heroTrustItemWrapSelector,
        heroConsentSelector
      );

      if (startsNearTop) {
        gsap.set(heroGlowSelector, { autoAlpha: 0, y: 18 });
        gsap.set(heroKickerSelector, { autoAlpha: 0, y: 14 });
        gsap.set(heroLineSelector, { autoAlpha: 0, y: 44 });
        gsap.set(heroCopySelector, { autoAlpha: 0, y: 20 });
        gsap.set(heroActionsWrapSelector, { autoAlpha: 0, y: 24 });
        gsap.set(heroTrustWrapSelector, { autoAlpha: 0, y: 24 });
        gsap.set(heroTrustItemWrapSelector, { autoAlpha: 0, y: 16 });
        gsap.set(heroConsentSelector, { autoAlpha: 0, y: 12 });

        const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });

        heroTimeline
          .to(heroGlowSelector, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.08 }, 0)
          .to(heroKickerSelector, { autoAlpha: 1, y: 0, duration: 0.46 }, 0.08)
          .to(
            heroLineSelector,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.72,
              stagger: 0.08,
            },
            0.12
          )
          .to(heroCopySelector, { autoAlpha: 1, y: 0, duration: 0.54 }, 0.28)
          .to(heroActionsWrapSelector, { autoAlpha: 1, y: 0, duration: 0.58 }, 0.38)
          .to(heroTrustWrapSelector, { autoAlpha: 1, y: 0, duration: 0.56 }, 0.46)
          .to(
            heroTrustItemWrapSelector,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.48,
              stagger: 0.07,
            },
            0.5
          )
          .to(heroConsentSelector, { autoAlpha: 1, y: 0, duration: 0.42 }, 0.66);

        setActiveMotionTargets(heroTargets, true);
        heroTimeline.eventCallback("onComplete", () => setActiveMotionTargets(heroTargets, false));
      }

      const discoveryGlowSelector = "[data-kai-discovery-glow]";
      const discoveryIntroSelector = "[data-kai-discovery-intro]";
      const discoveryCardSelector = "[data-kai-visibility-card-wrap]";
      const discoveryPillSelector = "[data-kai-visibility-pill]";
      const discoveryPanelSelector = "[data-kai-visibility-panel-wrap]";
      const discoveryBarsSelector = "[data-kai-visibility-bar]";
      const discoveryActionSelector = "[data-kai-panel-action]";
      const discoveryDeviceSelector = "[data-kai-visibility-device-wrap]";

      gsap.set(discoveryGlowSelector, { autoAlpha: 0, y: 28 });
      gsap.set(discoveryIntroSelector, { autoAlpha: 0, y: 40 });
      gsap.set(discoveryCardSelector, { autoAlpha: 0, y: 44 });
      gsap.set(discoveryPillSelector, { autoAlpha: 0, y: 22 });
      gsap.set(discoveryPanelSelector, { autoAlpha: 0, y: 34 });
      gsap.set(discoveryBarsSelector, { scaleY: 0.35, autoAlpha: 0.3, transformOrigin: "bottom" });
      gsap.set(discoveryActionSelector, { autoAlpha: 0, y: 18 });
      gsap.set(discoveryDeviceSelector, { autoAlpha: 0, y: 42 });

      const discoveryTimeline = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
      discoveryTimeline
        .to(discoveryGlowSelector, { autoAlpha: 0.72, y: 0, duration: 0.8 }, 0)
        .to(discoveryIntroSelector, { autoAlpha: 1, y: 0, duration: 0.68 }, 0.06)
        .to(
          discoveryCardSelector,
          { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.12 },
          0.16
        )
        .to(discoveryPillSelector, { autoAlpha: 1, y: 0, duration: 0.48 }, 0.28)
        .to(discoveryPanelSelector, { autoAlpha: 1, y: 0, duration: 0.72 }, 0.2)
        .to(
          discoveryBarsSelector,
          { scaleY: 1, autoAlpha: 1, duration: 0.44, stagger: 0.05 },
          0.34
        )
        .to(discoveryActionSelector, { autoAlpha: 1, y: 0, duration: 0.42 }, 0.42)
        .to(discoveryDeviceSelector, { autoAlpha: 1, y: 0, duration: 0.78 }, 0.28);

      registerController({
        ref: discoveryRef,
        start: revealStarts.discovery,
        timeline: discoveryTimeline,
        targets: collectTargets(
          discoveryGlowSelector,
          discoveryIntroSelector,
          discoveryCardSelector,
          discoveryPillSelector,
          discoveryPanelSelector,
          discoveryBarsSelector,
          discoveryActionSelector,
          discoveryDeviceSelector
        ),
      });

      const problemIntroSelector = "[data-kai-problem-intro]";
      const problemIdleSelector = "[data-kai-problem-card-wrap='idle']";
      const problemArrowSelector = "[data-kai-problem-card-wrap='arrow']";
      const problemUnleashedSelector = "[data-kai-problem-card-wrap='unleashed']";
      const problemFootnoteSelector = "[data-kai-problem-footnote]";

      gsap.set(problemIntroSelector, { autoAlpha: 0, y: 34 });
      gsap.set(problemIdleSelector, { autoAlpha: 0, y: 40 });
      gsap.set(problemArrowSelector, { autoAlpha: 0, y: 24 });
      gsap.set(problemUnleashedSelector, { autoAlpha: 0, y: 46 });
      gsap.set(problemFootnoteSelector, { autoAlpha: 0, y: 18 });

      const problemTimeline = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
      problemTimeline
        .to(problemIntroSelector, { autoAlpha: 1, y: 0, duration: 0.62 }, 0)
        .to(problemIdleSelector, { autoAlpha: 1, y: 0, duration: 0.68 }, 0.14)
        .to(problemArrowSelector, { autoAlpha: 1, y: 0, duration: 0.42 }, 0.28)
        .to(problemUnleashedSelector, { autoAlpha: 1, y: 0, duration: 0.74 }, 0.34)
        .to(problemFootnoteSelector, { autoAlpha: 1, y: 0, duration: 0.42 }, 0.52);

      registerController({
        ref: problemRef,
        start: revealStarts.problem,
        timeline: problemTimeline,
        targets: collectTargets(
          problemIntroSelector,
          problemIdleSelector,
          problemArrowSelector,
          problemUnleashedSelector,
          problemFootnoteSelector
        ),
      });

      const strategyIntroSelector = "[data-kai-strategy-intro]";
      const strategyVoiceSelector = "[data-kai-voice-panel-wrap]";
      const strategyBarsSelector = "[data-kai-voice-bar]";
      const strategyStepSelector = "[data-kai-strategy-step-wrap]";
      const strategyNoteSelector = "[data-kai-strategy-note]";
      const strategyOrbSelector = "[data-kai-voice-orb='true']";

      gsap.set(strategyIntroSelector, { autoAlpha: 0, y: 32 });
      gsap.set(strategyVoiceSelector, { autoAlpha: 0, y: 36 });
      gsap.set(strategyBarsSelector, { scaleY: 0.45, autoAlpha: 0.3, transformOrigin: "bottom" });
      gsap.set(strategyStepSelector, { autoAlpha: 0, y: 28 });
      gsap.set(strategyNoteSelector, { autoAlpha: 0, y: 16 });

      const strategyTimeline = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
      strategyTimeline
        .to(strategyIntroSelector, { autoAlpha: 1, y: 0, duration: 0.62 }, 0)
        .to(strategyVoiceSelector, { autoAlpha: 1, y: 0, duration: 0.72 }, 0.12)
        .to(
          strategyBarsSelector,
          { scaleY: 1, autoAlpha: 1, duration: 0.42, stagger: 0.04 },
          0.32
        )
        .to(
          strategyStepSelector,
          { autoAlpha: 1, y: 0, duration: 0.52, stagger: 0.1 },
          0.26
        )
        .to(strategyNoteSelector, { autoAlpha: 1, y: 0, duration: 0.38 }, 0.52);

      const voiceOrbPulse = gsap.to(strategyOrbSelector, {
        scale: isMobileViewport ? 1.04 : 1.06,
        opacity: 0.3,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        paused: true,
      });

      registerController({
        ref: strategyRef,
        start: revealStarts.strategy,
        timeline: strategyTimeline,
        targets: collectTargets(
          strategyIntroSelector,
          strategyVoiceSelector,
          strategyBarsSelector,
          strategyStepSelector,
          strategyNoteSelector
        ),
        onEnter: () => voiceOrbPulse.play(),
        onEnterBack: () => voiceOrbPulse.play(),
        onLeave: () => voiceOrbPulse.pause(),
        onLeaveBack: () => voiceOrbPulse.pause(),
      });

      const executionGlowSelector = "[data-kai-execution-glow]";
      const executionIntroSelector = "[data-kai-execution-intro]";
      const executionPortfolioSelector = "[data-kai-execution-card-wrap='portfolio']";
      const executionRowSelector = "[data-kai-portfolio-row-wrap]";
      const executionApprovalSelector = "[data-kai-execution-card-wrap='approval']";
      const executionStatusSelector = "[data-kai-execution-status]";

      gsap.set(executionGlowSelector, { autoAlpha: 0, y: 30 });
      gsap.set(executionIntroSelector, { autoAlpha: 0, y: 34 });
      gsap.set(executionPortfolioSelector, { autoAlpha: 0, y: 40 });
      gsap.set(executionRowSelector, { autoAlpha: 0, y: 22 });
      gsap.set(executionApprovalSelector, { autoAlpha: 0, y: 42 });
      gsap.set(executionStatusSelector, { autoAlpha: 0, y: 16 });

      const executionTimeline = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
      executionTimeline
        .to(executionGlowSelector, { autoAlpha: 0.78, y: 0, duration: 0.82 }, 0)
        .to(executionIntroSelector, { autoAlpha: 1, y: 0, duration: 0.62 }, 0.04)
        .to(executionPortfolioSelector, { autoAlpha: 1, y: 0, duration: 0.72 }, 0.14)
        .to(
          executionRowSelector,
          { autoAlpha: 1, y: 0, duration: 0.44, stagger: 0.08 },
          0.3
        )
        .to(executionApprovalSelector, { autoAlpha: 1, y: 0, duration: 0.68 }, 0.24)
        .to(executionStatusSelector, { autoAlpha: 1, y: 0, duration: 0.38 }, 0.54);

      registerController({
        ref: executionRef,
        start: revealStarts.execution,
        timeline: executionTimeline,
        targets: collectTargets(
          executionGlowSelector,
          executionIntroSelector,
          executionPortfolioSelector,
          executionRowSelector,
          executionApprovalSelector,
          executionStatusSelector
        ),
      });

      const governanceIntroSelector = "[data-kai-governance-intro]";
      const governanceCardSelector = "[data-kai-governance-card-wrap]";

      gsap.set(governanceIntroSelector, { autoAlpha: 0, y: 28 });
      gsap.set(governanceCardSelector, { autoAlpha: 0, y: 22 });

      const governanceTimeline = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
      governanceTimeline
        .to(governanceIntroSelector, { autoAlpha: 1, y: 0, duration: 0.52 }, 0)
        .to(governanceCardSelector, { autoAlpha: 1, y: 0, duration: 0.44, stagger: 0.06 }, 0.12);

      registerController({
        ref: governanceRef,
        start: revealStarts.governance,
        timeline: governanceTimeline,
        targets: collectTargets(governanceIntroSelector, governanceCardSelector),
      });

      const finalGlowSelector = "[data-kai-final-glow]";
      const finalCopySelector = "[data-kai-final-copy]";
      const finalActionsSelector = "[data-kai-final-actions-wrap]";

      gsap.set(finalGlowSelector, { autoAlpha: 0, y: 26 });
      gsap.set(finalCopySelector, { autoAlpha: 0, y: 28 });
      gsap.set(finalActionsSelector, { autoAlpha: 0, y: 18 });

      const finalTimeline = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
      finalTimeline
        .to(finalGlowSelector, { autoAlpha: 0.72, y: 0, duration: 0.72 }, 0)
        .to(finalCopySelector, { autoAlpha: 1, y: 0, duration: 0.56 }, 0.08)
        .to(finalActionsSelector, { autoAlpha: 1, y: 0, duration: 0.42 }, 0.26);

      registerController({
        ref: finalRef,
        start: revealStarts.final,
        timeline: finalTimeline,
        targets: collectTargets(finalGlowSelector, finalCopySelector, finalActionsSelector),
      });

      const viewportHeight = window.innerHeight;
      const completedThreshold = isMobileViewport ? 0.9 : 0.82;
      sectionControllers.forEach(({ element, timeline, targets, onEnter, onLeave }) => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < viewportHeight && rect.bottom > 0;
        const shouldBeComplete = rect.top <= viewportHeight * completedThreshold;

        if (isVisible || shouldBeComplete) {
          timeline.progress(1).pause();
        } else {
          timeline.progress(0).pause();
        }

        setActiveMotionTargets(targets, false);

        if (isVisible) {
          onEnter?.();
        } else {
          onLeave?.();
        }
      });

      ScrollTrigger.refresh();
    }, pageRef);

    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <div ref={pageRef} className={styles.page}>
      <section ref={heroRef} className={`${styles.heroSection} ${styles.revisedHeroSection}`} data-kai-section="hero">
        <div className={styles.heroMesh} data-kai-hero-glow aria-hidden="true" />
        <div className={styles.heroGlowPrimary} data-kai-hero-glow aria-hidden="true" />
        <div className={styles.heroGlowSecondary} data-kai-hero-glow aria-hidden="true" />

        <div className={styles.sectionInnerWide}>
          <div className={styles.kaiHeroLayout}>
            <div className={styles.kaiHeroCopy}>
              <p className={styles.eyebrow} data-kai-hero-kicker>
                Investing, simplified
              </p>
              <h1 className={styles.heroTitle}>
                <span className={styles.heroTitleLine} data-kai-hero-line>
                  Kai.
                </span>
                <span className={styles.heroTitleLine} data-kai-hero-line>
                  Your personal
                </span>
                <span className={styles.heroTitleLine} data-kai-hero-line>
                  financial agent.
                </span>
              </h1>
              <p className={styles.heroLead} data-kai-hero-copy>
                Kai understands your money, helps you invest better, and grows your wealth,
                <span className={styles.accentWord}> with your consent.</span>
              </p>

              <div className={styles.heroActionMotionWrap} data-kai-hero-actions-wrap>
                <div className={styles.heroActionPanel} data-kai-hero-actions>
                  <p className={styles.heroActionEyebrow}>Start with Kai</p>
                  <div className={styles.heroActions}>
                    <AppStoreCta href={KAI_APP_URL} heroSized />
                    <ExternalCta href={KAI_WEB_URL} variant="secondary" heroSized>
                      Use Kai on the web
                    </ExternalCta>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.heroTrustMotionWrap} data-kai-hero-trust-wrap>
              <div className={styles.heroTrustStack} data-kai-hero-item>
                <p className={styles.heroTrustEyebrow}>What you unlock</p>
                {heroTrustPoints.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className={styles.heroTrustItemMotionWrap}
                      data-kai-hero-trust-item-wrap
                    >
                      <div className={styles.heroTrustItem} data-kai-hero-trust-item>
                        <span className={styles.heroTrustItemIcon}>
                          <Icon size={18} strokeWidth={2} />
                        </span>
                        <span>{item.label}</span>
                      </div>
                    </div>
                  );
                })}

                <p className={styles.heroConsentNote} data-kai-hero-consent>
                  <Info size={15} strokeWidth={2} />
                  Nothing executes without your explicit approval.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={discoveryRef}
        className={styles.discoverySection}
        data-kai-section="discovery"
      >
        <div className={styles.discoverySectionGlow} data-kai-discovery-glow aria-hidden="true" />
        <div className={styles.sectionInnerWide}>
          <div className={styles.visibilityGrid}>
            <div className={styles.visibilityCopyColumn}>
              <div className={styles.visibilityIntro} data-kai-discovery-intro>
                <p className={styles.eyebrow}>Visibility</p>
                <h2 className={styles.sectionTitle}>
                  Total clarity,
                  <br />
                  <span className={styles.accentWord}>instantly.</span>
                </h2>
                <p className={styles.sectionLead}>
                  Kai securely scans your financial universe to reveal every dollar that could be
                  working harder for you.
                </p>
              </div>

              <div className={styles.visibilitySignalStack}>
                {visibilityCards.map((card) => {
                  const Icon = card.icon;

                  return (
                    <div
                      key={card.title}
                      className={styles.visibilitySignalMotionItem}
                      data-kai-visibility-card-wrap
                    >
                      <article className={styles.visibilitySignalCard} data-kai-visibility-card>
                        <span
                          className={`${styles.visibilitySignalIcon} ${
                            card.tone === "indigo" ? styles.visibilitySignalIconIndigo : ""
                          }`}
                        >
                          <Icon size={24} strokeWidth={2} />
                        </span>
                        <div className={styles.visibilitySignalBody}>
                          <p>{card.eyebrow}</p>
                          <strong className={styles.visibilitySignalLine}>
                            <span className={styles.visibilitySignalTitle}>{card.title}</span>
                            <span className={styles.visibilitySignalSeparator}>&bull;</span>
                            <span className={styles.visibilitySignalAmount}>
                              {card.detail}
                              {card.detailMuted ? (
                                <span className={styles.visibilitySignalMuted}>{card.detailMuted}</span>
                              ) : null}
                            </span>
                          </strong>
                        </div>
                      </article>
                    </div>
                  );
                })}

                <div className={styles.visibilityActionPill} data-kai-visibility-pill>
                  <span className={styles.liveDot} />
                  <span>Optimal deployment path ready.</span>
                </div>
              </div>
            </div>

            <div className={styles.visibilityStageColumn}>
              <div className={styles.visibilityPanelMotionWrap} data-kai-visibility-panel-wrap>
                <div
                  className={styles.visibilityPanelFloat}
                  data-kai-visibility-panel="true"
                  data-kai-visibility-column="panel"
                >
                  <div className={styles.discoveryPanelTop}>
                    <div className={styles.metaInline}>
                      <span className={styles.liveDot} />
                      <p>Unified portfolio vision</p>
                    </div>
                    <BadgeDollarSign size={18} strokeWidth={2.1} />
                  </div>

                  <div className={styles.discoveryAmount}>
                    <strong>$12,419</strong>
                    <span>.52</span>
                  </div>

                  <div className={styles.chartBars} aria-hidden="true">
                    <span className={styles.chartBar} data-kai-visibility-bar />
                    <span className={styles.chartBar} data-kai-visibility-bar />
                    <span className={`${styles.chartBar} ${styles.chartBarPrimary}`} data-kai-visibility-bar />
                    <span className={styles.chartBar} data-kai-visibility-bar />
                    <span className={styles.chartBar} data-kai-visibility-bar />
                  </div>

                  <div className={styles.discoveryActionCard} data-kai-panel-action>
                    <div>
                      <p>Kai unified strategy</p>
                      <strong>Optimal liquidity detected in 2 accounts</strong>
                    </div>
                    <ArrowRight size={18} strokeWidth={2.1} />
                  </div>
                </div>
              </div>

              <div className={styles.discoveryDeviceMotionWrap} data-kai-visibility-device-wrap>
                <div
                  ref={discoveryStageRef}
                  className={styles.discoveryDeviceStage}
                  data-kai-discovery-visual="true"
                  data-kai-visibility-device
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
          </div>
        </div>
      </section>

      <section
        ref={problemRef}
        className={styles.problemSection}
        data-kai-section="problem"
      >
        <div className={styles.sectionInner}>
          <div className={styles.problemFrame}>
            <div className={styles.problemIntro} data-kai-problem-intro>
              <p className={`${styles.eyebrow} ${styles.eyebrowDark}`}>The problem</p>
              <h2 className={`${styles.sectionTitle} ${styles.sectionTitleDark}`}>
                Fragmented money,
                <br />
                hidden opportunity.
              </h2>
              <p className={styles.sectionLeadDark}>
                Idle cash hidden across accounts is not just sitting still. It is losing ground.
                Kai reclaims and transforms it into profit.
              </p>
            </div>

            <div className={styles.problemShowcase}>
              <div className={styles.problemMotionItem} data-kai-problem-card-wrap="idle">
                <article
                  className={`${styles.problemGlassCard} ${styles.problemGlassCardDark}`}
                  data-kai-problem-card="idle"
                >
                  <div className={styles.problemCardHeader}>
                    <span className={styles.problemEyebrow}>Idle capital</span>
                    <span className={`${styles.problemBadge} ${styles.problemBadgeCoral}`}>Wasted</span>
                  </div>

                  <div className={styles.problemList}>
                    {fragmentedRows.map((row) => (
                      <div
                        key={row.label}
                        className={`${styles.problemListRow} ${
                          row.tone === "soft" ? styles.problemListRowSoft : ""
                        }`}
                      >
                        <span>{row.label}</span>
                        <strong>{row.amount}</strong>
                      </div>
                    ))}
                  </div>

                  <div className={styles.problemTotalRow}>
                    <p>Fragmented across 4 platforms</p>
                    <strong>$5,412.45</strong>
                  </div>
                </article>
              </div>

              <div className={styles.problemArrowWrap} data-kai-problem-card-wrap="arrow">
                <div className={styles.problemArrow} data-kai-problem-card="arrow">
                  <ChevronsDown size={34} strokeWidth={1.8} />
                </div>
              </div>

              <div className={styles.problemMotionItem} data-kai-problem-card-wrap="unleashed">
                <article
                  className={`${styles.problemGlassCard} ${styles.problemGlassCardVibrant}`}
                  data-kai-problem-card="unleashed"
                >
                  <div className={styles.problemCardHeader}>
                    <span className={styles.problemEyebrow}>Kai unified strategy</span>
                    <span className={`${styles.problemBadge} ${styles.problemBadgeGreen}`}>Unleashed</span>
                  </div>

                  <div className={styles.problemUnifiedBody}>
                    <strong>$5,412.45</strong>
                    <p>Working for you now</p>
                  </div>

                  <div className={styles.problemMetricsGrid}>
                    <div className={styles.problemMetric}>
                      <span>Yield gain</span>
                      <strong>+4.8%</strong>
                    </div>
                    <div className={styles.problemMetric}>
                      <span>Active time</span>
                      <strong>24/7</strong>
                    </div>
                  </div>
                </article>
              </div>
            </div>

            <p className={styles.problemFootnote} data-kai-problem-footnote>
              <Clock3 size={15} strokeWidth={2} />
              Saving you 4.5 hours of financial friction every week.
            </p>
          </div>
        </div>
      </section>

      <section
        ref={strategyRef}
        className={styles.strategySection}
        data-kai-section="strategy"
      >
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader} data-kai-strategy-intro>
            <p className={styles.eyebrow}>Strategy</p>
            <h2 className={styles.sectionTitle}>How Kai works quietly for you.</h2>
            <p className={styles.sectionLead}>
              Kai handles the complexity of wealth management so you do not have to. Experience
              seamless, human-grade precision on every move.
            </p>
          </div>

          <div className={styles.strategyTopRow}>
            <div className={styles.strategyVoiceMotionWrap} data-kai-voice-panel-wrap>
              <article className={styles.voiceConsoleCard} data-kai-voice-panel="true">
                <div className={styles.voiceConsoleOrb} data-kai-voice-orb="true" aria-hidden="true" />
                <p className={styles.voiceTag}>Voice intelligence</p>
                <blockquote className={styles.voiceQuote}>“Kai, where should I invest my $1,000?”</blockquote>
                <div className={styles.voiceBars} aria-hidden="true">
                  {[0, 1, 2, 3, 4].map((bar) => (
                    <span key={bar} data-kai-voice-bar />
                  ))}
                </div>
                <div className={styles.voiceMic}>
                  <Mic size={34} strokeWidth={2.1} />
                </div>
              </article>
            </div>

            <div className={styles.strategyStepsStack}>
              {strategySteps.map((step) => (
                <div
                  key={step.number}
                  className={styles.strategyStepMotionWrap}
                  data-kai-strategy-step-wrap
                >
                  <article className={styles.strategyStepCard} data-kai-strategy-step>
                    <div className={styles.strategyStepHeader}>
                      <span className={styles.strategyStepNumber}>{step.number}</span>
                      <h3>{step.title}</h3>
                    </div>
                    <p>{step.body}</p>
                  </article>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.strategyNoteStack} data-kai-strategy-note>
            {strategyNotes.map((note) => {
              const Icon = note.icon;

              return (
                <p
                  key={note.body}
                  className={`${styles.strategyNoteRow} ${
                    note.tone === "positive" ? styles.strategyNoteRowPositive : ""
                  }`}
                >
                  <Icon size={15} strokeWidth={2} />
                  <span>{note.body}</span>
                </p>
              );
            })}
          </div>
        </div>
      </section>

      <section
        ref={executionRef}
        className={styles.executionSection}
        data-kai-section="execution"
      >
        <div className={styles.executionSectionGlow} data-kai-execution-glow aria-hidden="true" />
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader} data-kai-execution-intro>
            <p className={styles.eyebrow}>Execution</p>
            <h2 className={styles.sectionTitle}>
              Invest with
              <br />
              <span className={styles.accentWord}>clarity.</span>
            </h2>
            <p className={styles.sectionLead}>
              Kai integrates your portfolio view into a single offensive stance with one-tap
              execution grounded in triple-tier validation.
            </p>
          </div>

          <div className={styles.executionGridNew}>
            <div className={styles.executionCardMotionWrap} data-kai-execution-card-wrap="portfolio">
              <article className={styles.portfolioCard} data-kai-execution-card="portfolio">
                <p className={styles.portfolioLabel}>Proposed Portfolio Realignment</p>
                <div className={styles.portfolioRows}>
                  {allocationCards.map((card) => (
                    <div
                      key={card.symbol}
                      className={styles.portfolioRowMotionWrap}
                      data-kai-portfolio-row-wrap
                    >
                      <div className={styles.portfolioRow} data-kai-portfolio-row>
                        <div className={styles.portfolioCompany}>
                          <span className={styles.companyLogoMark}>
                            <CompanyLogo name={card.logo} />
                          </span>
                          <div>
                            <h3>{card.company}</h3>
                            <p>{card.symbol}</p>
                            <span className={styles.portfolioNote}>{card.note}</span>
                          </div>
                        </div>
                        <div className={styles.portfolioAllocation}>
                          <strong>{card.allocation}</strong>
                          <span>{card.amount}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <p className={styles.portfolioMeta}>
                  Expert strategies vetted by our optional fiduciary RIA committee.
                </p>
              </article>
            </div>

            <div className={styles.executionCardMotionWrap} data-kai-execution-card-wrap="approval">
              <article className={styles.approvalExecutionCard} data-kai-execution-card="approval">
                <div className={styles.approvalIconWrap}>
                  <ScanFace size={52} strokeWidth={1.8} />
                </div>
                <div className={styles.approvalCopy}>
                  <h3>Confirm Allocation</h3>
                  <span>
                    Verify with FaceID to securely execute the $1,000 strategy. Transactions are
                    signed locally.
                  </span>
                </div>
                <div className={styles.approvalStatus} data-kai-execution-status>
                  <CheckCircle2 size={16} strokeWidth={2.1} />
                  <span>Portfolio synced: execution complete in 11s.</span>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={governanceRef}
        className={styles.privacySection}
        data-kai-section="privacy"
      >
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader} data-kai-governance-intro>
            <p className={styles.eyebrow}>Governance</p>
            <h2 className={styles.sectionTitle}>Trust, consent, and control.</h2>
            <p className={styles.sectionLead}>
              Your data never leaves your device without your explicit consent. We built Kai on the
              Hushh Consent Protocol to ensure zero-knowledge privacy.
            </p>
          </div>

          <div className={styles.governanceGridNew}>
            {governanceCards.map((card) => {
              const Icon = card.icon;

              return (
                <div
                  key={card.title}
                  className={styles.governanceCardMotionWrap}
                  data-kai-governance-card-wrap
                >
                  <article className={styles.governanceCard} data-kai-governance-card>
                    <span
                      className={`${styles.governanceIconWrap} ${
                        card.tone === "green"
                          ? styles.governanceIconGreen
                          : card.tone === "indigo"
                            ? styles.governanceIconIndigo
                            : card.tone === "ink"
                              ? styles.governanceIconInk
                              : ""
                      }`}
                    >
                      <Icon size={20} strokeWidth={2} />
                    </span>
                    <div>
                      <h3>{card.title}</h3>
                      <p>{card.body}</p>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section
        ref={finalRef}
        className={styles.finalSection}
        data-kai-section="final"
      >
        <div className={styles.finalGlow} data-kai-final-glow aria-hidden="true" />
        <div className={styles.sectionInnerWide}>
          <div className={styles.finalCopy} data-kai-final-copy>
            <p className={styles.eyebrow}>
              Next step
            </p>
            <h2 className={styles.finalTitle}>
              Own your <span className={styles.accentWord}>financial future.</span>
            </h2>
            <p className={styles.finalLead}>
              Stop letting your capital sit idle. Join the era of intelligent banking today.
            </p>
            <div className={styles.finalActionsMotionWrap} data-kai-final-actions-wrap>
              <div className={styles.heroActions} data-kai-final-actions>
                <AppStoreCta href={KAI_APP_URL} heroSized />
                <ExternalCta href={KAI_WEB_URL} variant="secondary" heroSized>
                  Use Kai on the web
                </ExternalCta>
              </div>
              <p className={styles.finalConsentNote}>
                Saving time. Making money. Always with your consent.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
