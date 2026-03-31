"use client";

import dynamic from "next/dynamic";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./KaiPage.module.css";
import { ensureGsapPlugins, useReducedMotionPreference } from "../_components/motion/gsapMotion";

const KaiDeviceStage = dynamic(() => import("./KaiDeviceStage"), {
  ssr: false,
});

const KAI_APP_URL = "https://apps.apple.com/au/app/hushh-personal-agent-kai/id6757718917";
const KAI_WEB_URL = "https://kai.hushh.ai";
const VISIBILITY_DISCOVERY_TOTAL = 12419.52;
const STRATEGY_QUOTE_TEXT = "Kai, where should I invest my $1,000?";
const STRATEGY_QUOTE_STAGES = [
  "",
  "Kai,",
  "Kai, where should",
  "Kai, where should I invest",
  "Kai, where should I invest my",
  STRATEGY_QUOTE_TEXT,
];
const EXECUTION_GROWTH_IMPACT = 1000;
const EXECUTION_TIME_SAVED = 4.5;

function formatCurrency(value) {
  return `$${value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatSignedCurrency(value) {
  return `${value >= 0 ? "+" : "-"}${formatCurrency(Math.abs(value))}`;
}

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
    </a>
  );
}

export default function HushhKai() {
  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const problemRef = useRef(null);
  const problemShellRef = useRef(null);
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
    let mm;

    const ctx = gsap.context(() => {
      mm = gsap.matchMedia();
      mm.add(
        {
          desktop: "(min-width: 1200px)",
          tablet: "(min-width: 768px) and (max-width: 1199px)",
          mobile: "(max-width: 767px)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { desktop, tablet, mobile, reduce } = context.conditions;
          const reduced = Boolean(reduce || reduceMotion);
          const viewportHeight = window.innerHeight;
          const startsNearTop = window.scrollY < 24;
          const cleanups = [];

          const pick = (desktopValue, tabletValue, mobileValue) =>
            mobile ? mobileValue : tablet ? tabletValue : desktopValue;

          const getMountState = (element, triggerRatio) => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < viewportHeight && rect.bottom > 0;
            const hasCrossedTrigger = rect.top <= viewportHeight * triggerRatio;
            const isComplete = rect.bottom <= 0 || hasCrossedTrigger;
            return { isVisible, isComplete };
          };

          const registerReveal = ({
            ref,
            start,
            triggerRatio,
            timeline,
            onActive,
            onInactive,
            onSettle,
            onReset,
          }) => {
            if (!ref.current) {
              return;
            }

            timeline.eventCallback("onComplete", () => {
              onSettle?.();
            });
            timeline.eventCallback("onReverseComplete", () => {
              onReset?.();
            });

            const mountState = getMountState(ref.current, triggerRatio);

            if (mountState.isComplete) {
              timeline.progress(1).pause();
              onSettle?.();
              if (mountState.isVisible) {
                onActive?.();
              } else {
                onInactive?.();
              }
            } else {
              timeline.progress(0).pause();
              onReset?.();
              onInactive?.();
            }

            ScrollTrigger.create({
              trigger: ref.current,
              start,
              onEnter: () => {
                onActive?.();
                timeline.play();
              },
              onEnterBack: () => {
                onActive?.();
                timeline.play();
              },
              onLeave: () => {
                onInactive?.();
              },
              onLeaveBack: () => {
                onInactive?.();
                timeline.reverse();
              },
            });
          };

          const registerParallax = (selector, triggerRef, yDistance) => {
            if (reduced || !triggerRef.current) {
              return;
            }

            gsap.to(selector, {
              y: yDistance,
              ease: "none",
              scrollTrigger: {
                trigger: triggerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            });
          };

          if (discoveryStageRef.current) {
            discoveryProgressRef.current = reduced ? 1 : 0;
            ScrollTrigger.create({
              trigger: discoveryStageRef.current,
              start: pick("top 88%", "top 90%", "top 92%"),
              end: pick("top 44%", "top 50%", "top 58%"),
              onUpdate: (self) => {
                discoveryProgressRef.current = reduced ? 1 : self.progress;
              },
              onLeave: () => {
                discoveryProgressRef.current = 1;
              },
              onLeaveBack: () => {
                discoveryProgressRef.current = 0;
              },
            });
          }

          if (reduced) {
            return () => {
              cleanups.forEach((cleanup) => cleanup());
            };
          }

          if (desktop && heroRef.current) {
            const primaryAura = heroRef.current.querySelector('[data-kai-hero-aura="primary"]');
            const secondaryAura = heroRef.current.querySelector('[data-kai-hero-aura="secondary"]');

            if (primaryAura && secondaryAura) {
              const primaryX = gsap.quickTo(primaryAura, "x", { duration: 0.65, ease: "power3.out" });
              const primaryY = gsap.quickTo(primaryAura, "y", { duration: 0.65, ease: "power3.out" });
              const secondaryX = gsap.quickTo(secondaryAura, "x", { duration: 0.8, ease: "power3.out" });
              const secondaryY = gsap.quickTo(secondaryAura, "y", { duration: 0.8, ease: "power3.out" });

              const handlePointerMove = (event) => {
                const rect = heroRef.current?.getBoundingClientRect();
                if (!rect) {
                  return;
                }

                const offsetX = (event.clientX - rect.left) / rect.width - 0.5;
                const offsetY = (event.clientY - rect.top) / rect.height - 0.5;

                primaryX(offsetX * 44);
                primaryY(offsetY * 28);
                secondaryX(offsetX * -28);
                secondaryY(offsetY * -18);
              };

              const resetPointerDrift = () => {
                primaryX(0);
                primaryY(0);
                secondaryX(0);
                secondaryY(0);
              };

              heroRef.current.addEventListener("pointermove", handlePointerMove);
              heroRef.current.addEventListener("pointerleave", resetPointerDrift);
              cleanups.push(() => {
                heroRef.current?.removeEventListener("pointermove", handlePointerMove);
                heroRef.current?.removeEventListener("pointerleave", resetPointerDrift);
              });
            }
          }

          const heroTimeline = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
          heroTimeline
            .fromTo(
              "[data-kai-hero-aura]",
              { autoAlpha: 0, y: 24 },
              { autoAlpha: 1, y: 0, duration: 1.05, stagger: 0.08 },
              0,
            )
            .fromTo(
              "[data-kai-hero-line]",
              { yPercent: 118, rotateZ: 0.8, transformOrigin: "left bottom" },
              {
                yPercent: 0,
                rotateZ: 0,
                duration: pick(0.94, 0.84, 0.72),
                stagger: 0.08,
                ease: "power4.out",
              },
              0.06,
            )
            .fromTo(
              "[data-kai-hero-body]",
              { autoAlpha: 0, y: 24, clipPath: "inset(0% 0% 100% 0%)" },
              { autoAlpha: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)", duration: 0.62 },
              0.26,
            )
            .fromTo(
              "[data-kai-hero-actions] > *",
              { autoAlpha: 0, y: 18, scale: 0.985 },
              { autoAlpha: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.08 },
              0.4,
            )
            .fromTo(
              "[data-kai-hero-trust-item]",
              { autoAlpha: 0, x: (index) => (index % 2 === 0 ? -16 : 16), y: 10 },
              { autoAlpha: 1, x: 0, y: 0, duration: 0.46, stagger: 0.08 },
              0.58,
            )
            .fromTo(
              "[data-kai-hero-consent]",
              { autoAlpha: 0, y: 12 },
              { autoAlpha: 1, y: 0, duration: 0.36 },
              0.82,
            );

          if (startsNearTop) {
            heroTimeline.play(0);
          } else {
            heroTimeline.progress(1).pause();
          }

          const strategyOrbPulse = gsap.to("[data-kai-strategy-orb]", {
            scale: pick(1.09, 1.07, 1.05),
            opacity: 0.34,
            duration: pick(2.1, 1.9, 1.65),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            paused: true,
          });

          const strategyBarsWave = gsap.timeline({ paused: true, repeat: -1, defaults: { ease: "sine.inOut" } });
          strategyBarsWave
            .to(
              "[data-kai-strategy-bar]",
              {
                keyframes: [
                  { scaleY: (index) => [0.72, 1.2, 1.45, 1.12, 0.78][index], duration: 0.32 },
                  { scaleY: 1, duration: 0.38 },
                ],
                transformOrigin: "bottom",
                stagger: 0.05,
              },
              0,
            )
            .to({}, { duration: 0.18 });

          const visibilityAmountElement = pageRef.current?.querySelector("[data-kai-visibility-amount]");
          const visibilityAmountState = {
            value: reduced ? VISIBILITY_DISCOVERY_TOTAL : 0,
          };

          const syncVisibilityAmount = () => {
            if (visibilityAmountElement) {
              visibilityAmountElement.textContent = formatCurrency(visibilityAmountState.value);
            }
          };

          if (visibilityAmountElement) {
            syncVisibilityAmount();
          }

          const strategyQuoteElement = pageRef.current?.querySelector("[data-kai-strategy-quote]");
          const strategyQuoteState = {
            stage: reduced ? STRATEGY_QUOTE_STAGES.length - 1 : 0,
          };

          const syncStrategyQuote = () => {
            if (strategyQuoteElement) {
              strategyQuoteElement.textContent = STRATEGY_QUOTE_STAGES[strategyQuoteState.stage];
            }
          };

          if (strategyQuoteElement) {
            syncStrategyQuote();
          }

          const executionMetricValues = {
            growth: reduced ? EXECUTION_GROWTH_IMPACT : 0,
            time: reduced ? EXECUTION_TIME_SAVED : 0,
          };

          const growthMetricElement = pageRef.current?.querySelector(
            '[data-kai-execution-metric-value="growth"]',
          );
          const timeMetricElement = pageRef.current?.querySelector(
            '[data-kai-execution-metric-value="time"]',
          );

          const syncExecutionMetrics = () => {
            if (growthMetricElement) {
              growthMetricElement.textContent = formatSignedCurrency(executionMetricValues.growth);
            }

            if (timeMetricElement) {
              timeMetricElement.textContent = `${executionMetricValues.time.toFixed(1)}h`;
            }
          };

          if (growthMetricElement || timeMetricElement) {
            syncExecutionMetrics();
          }

          const problemTimeline = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
          problemTimeline
            .fromTo(
              "[data-kai-problem-eyebrow]",
              { autoAlpha: 0, y: 14 },
              { autoAlpha: 1, y: 0, duration: 0.34 },
              0,
            )
            .fromTo(
              "[data-kai-problem-title-line]",
              { yPercent: 118, rotateZ: 0.9, transformOrigin: "left bottom" },
              {
                yPercent: 0,
                rotateZ: 0,
                duration: 0.82,
                stagger: 0.08,
                ease: "power4.out",
              },
              0.04,
            )
            .fromTo(
              "[data-kai-problem-lead]",
              { autoAlpha: 0, y: 18, clipPath: "inset(0% 0% 100% 0%)" },
              { autoAlpha: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)", duration: 0.54 },
              0.18,
            )
            .fromTo(
              "[data-kai-problem-shell]",
              {
                autoAlpha: 0,
                y: pick(68, 56, 44),
                scale: 0.965,
                rotateX: pick(5, 4, 0),
                transformPerspective: 1400,
                clipPath: "inset(12% 0% 12% 0% round 2.5rem)",
              },
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                rotateX: 0,
                clipPath: "inset(0% 0% 0% 0% round 2.5rem)",
                duration: 1.08,
              },
              0.18,
            )
            .fromTo(
              "[data-kai-problem-sweep]",
              { autoAlpha: 0, xPercent: -72 },
              { autoAlpha: 0.72, xPercent: 78, duration: 1.26, ease: "power2.inOut" },
              0.24,
            )
            .to(
              "[data-kai-problem-sweep]",
              { autoAlpha: 0, duration: 0.22, ease: "power1.out" },
              1.28,
            )
            .fromTo(
              "[data-kai-problem-before]",
              { autoAlpha: 0, y: 24 },
              { autoAlpha: 1, y: 0, duration: 0.48 },
              0.34,
            )
            .fromTo(
              "[data-kai-problem-badge]",
              { autoAlpha: 0, scale: 0.78, transformOrigin: "center" },
              { autoAlpha: 1, scale: 1, duration: 0.01 },
              0.56,
            )
            .to(
              "[data-kai-problem-badge]",
              {
                keyframes: [
                  { scale: 1.12, duration: 0.18, ease: "back.out(3)" },
                  { scale: 1, duration: 0.16, ease: "power2.out" },
                ],
              },
              0.56,
            )
            .fromTo(
              "[data-kai-problem-line]",
              { scaleY: 0, transformOrigin: "top" },
              { scaleY: 1, duration: 0.34 },
              0.5,
            )
            .fromTo(
              "[data-kai-problem-arrow]",
              { autoAlpha: 0, y: 14 },
              { autoAlpha: 1, y: 0, duration: 0.34 },
              0.54,
            )
            .to(
              "[data-kai-problem-arrow-icon]",
              {
                keyframes: [
                  { y: 6, duration: 0.12 },
                  { y: 0, duration: 0.18 },
                  { y: 3, duration: 0.1 },
                  { y: 0, duration: 0.14 },
                ],
                ease: "power2.out",
              },
              0.74,
            )
            .fromTo(
              "[data-kai-problem-after]",
              { autoAlpha: 0, y: 34 },
              { autoAlpha: 1, y: 0, duration: 0.62 },
              0.62,
            )
            .fromTo(
              "[data-kai-problem-note]",
              { autoAlpha: 0, y: 14 },
              { autoAlpha: 1, y: 0, duration: 0.34 },
              0.84,
            )
            .fromTo(
              "[data-kai-problem-aura]",
              { autoAlpha: 0, scale: 0.78, transformOrigin: "center" },
              { autoAlpha: 1, scale: 1, duration: 0.92, stagger: 0.08 },
              0.18,
            );

          registerReveal({
            ref: problemShellRef,
            start: pick("top 82%", "top 86%", "top 89%"),
            triggerRatio: pick(0.82, 0.86, 0.89),
            timeline: problemTimeline,
          });

          const visibilityTimeline = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
          visibilityTimeline
            .fromTo(
              "[data-kai-visibility-intro]",
              { autoAlpha: 0, y: 30 },
              { autoAlpha: 1, y: 0, duration: 0.56 },
              0,
            )
            .fromTo(
              "[data-kai-visibility-card]",
              { autoAlpha: 0, y: pick(42, 36, 30), scale: 0.985 },
              { autoAlpha: 1, y: 0, scale: 1, duration: 0.82 },
              0.14,
            )
            .fromTo(
              "[data-kai-visibility-scan]",
              { autoAlpha: 0, xPercent: -96 },
              { autoAlpha: 0.65, xPercent: 126, duration: pick(1.22, 1.04, 0.9), ease: "power2.inOut" },
              0.22,
            )
            .to(
              visibilityAmountState,
              {
                value: VISIBILITY_DISCOVERY_TOTAL,
                duration: pick(1.18, 1.02, 0.88),
                ease: "power2.out",
                onUpdate: syncVisibilityAmount,
              },
              0.24,
            )
            .fromTo(
              "[data-kai-visibility-summary]",
              { autoAlpha: 0, y: 24 },
              { autoAlpha: 1, y: 0, duration: 0.48 },
              0.24,
            )
            .fromTo(
              "[data-kai-visibility-row]",
              { autoAlpha: 0, x: (index) => (index % 2 === 0 ? -18 : 18), y: 12 },
              { autoAlpha: 1, x: 0, y: 0, duration: 0.38, stagger: 0.1 },
              0.42,
            )
            .fromTo(
              "[data-kai-visibility-note]",
              { autoAlpha: 0, y: 14 },
              { autoAlpha: 1, y: 0, duration: 0.3 },
              0.58,
            )
            .fromTo(
              "[data-kai-visibility-banner-copy]",
              { autoAlpha: 0, y: 18, clipPath: "inset(0% 0% 100% 0%)" },
              { autoAlpha: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)", duration: 0.42 },
              0.7,
            )
            .fromTo(
              "[data-kai-visibility-status]",
              { autoAlpha: 0, y: 12, scale: 0.92 },
              { autoAlpha: 1, y: 0, scale: 1, duration: 0.32 },
              0.82,
            )
            .fromTo(
              "[data-kai-visibility-device]",
              { autoAlpha: 0, y: pick(56, 46, 34), scale: 0.975 },
              { autoAlpha: 1, y: 0, scale: 1, duration: pick(0.94, 0.84, 0.74) },
              0.9,
            )
            .fromTo(
              "[data-kai-visibility-aura]",
              { autoAlpha: 0 },
              { autoAlpha: 1, duration: 0.64, stagger: 0.08 },
              0.2,
            );

          registerReveal({
            ref: visibilityRef,
            start: pick("top 78%", "top 82%", "top 86%"),
            triggerRatio: pick(0.78, 0.82, 0.86),
            timeline: visibilityTimeline,
            onSettle: () => {
              visibilityAmountState.value = VISIBILITY_DISCOVERY_TOTAL;
              syncVisibilityAmount();
            },
            onReset: () => {
              visibilityAmountState.value = 0;
              syncVisibilityAmount();
            },
          });

          const strategyTimeline = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
          strategyTimeline
            .fromTo(
              "[data-kai-strategy-intro]",
              { autoAlpha: 0, y: 30 },
              { autoAlpha: 1, y: 0, duration: 0.54 },
              0,
            )
            .fromTo(
              "[data-kai-strategy-voice]",
              { autoAlpha: 0, y: pick(40, 36, 30) },
              { autoAlpha: 1, y: 0, duration: 0.82 },
              0.14,
            )
            .to(
              strategyQuoteState,
              {
                stage: STRATEGY_QUOTE_STAGES.length - 1,
                duration: pick(1.95, 1.72, 1.5),
                ease: "none",
                snap: { stage: 1 },
                onStart: () => {
                  strategyQuoteState.stage = 0;
                  syncStrategyQuote();
                },
                onUpdate: () => {
                  syncStrategyQuote();
                },
              },
              0.34,
            )
            .fromTo(
              "[data-kai-strategy-bar]",
              { autoAlpha: 0.2, scaleY: 0.42, transformOrigin: "bottom" },
              { autoAlpha: 1, scaleY: 1, duration: 0.36, stagger: 0.04 },
              0.9,
            )
            .call(() => {
              strategyBarsWave.play(0);
            }, [], 1.02)
            .fromTo(
              "[data-kai-strategy-connector]",
              { autoAlpha: 0, scaleY: 0.55, transformOrigin: "top" },
              { autoAlpha: 1, scaleY: 1, duration: 0.26, stagger: 0.05 },
              1.1,
            )
            .fromTo(
              "[data-kai-strategy-step]",
              { autoAlpha: 0, x: -20, y: 18 },
              { autoAlpha: 1, x: 0, y: 0, duration: 0.44, stagger: 0.16 },
              1.18,
            )
            .fromTo(
              "[data-kai-strategy-note]",
              { autoAlpha: 0, y: 14 },
              { autoAlpha: 1, y: 0, duration: 0.32 },
              1.56,
            );

          registerReveal({
            ref: strategyRef,
            start: pick("top 80%", "top 84%", "top 88%"),
            triggerRatio: pick(0.8, 0.84, 0.88),
            timeline: strategyTimeline,
            onActive: () => {
              strategyOrbPulse.play();
            },
            onInactive: () => {
              strategyOrbPulse.pause();
              strategyBarsWave.pause(0);
            },
            onSettle: () => {
              strategyQuoteState.stage = STRATEGY_QUOTE_STAGES.length - 1;
              syncStrategyQuote();
              strategyBarsWave.play(0);
            },
            onReset: () => {
              strategyQuoteState.stage = 0;
              syncStrategyQuote();
              strategyBarsWave.pause(0);
            },
          });

          const executionTimeline = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
          executionTimeline
            .fromTo(
              "[data-kai-execution-intro]",
              { autoAlpha: 0, y: 30 },
              { autoAlpha: 1, y: 0, duration: 0.56 },
              0,
            )
            .fromTo(
              "[data-kai-execution-accent]",
              { color: "rgba(0, 122, 255, 0.36)" },
              { color: "rgb(var(--kai-blue-rgb))", duration: 0.42 },
              0.12,
            )
            .fromTo(
              "[data-kai-execution-portfolio]",
              { autoAlpha: 0, y: pick(40, 34, 28), scale: 0.985 },
              { autoAlpha: 1, y: 0, scale: 1, duration: 0.84 },
              0.16,
            )
            .fromTo(
              "[data-kai-execution-row]",
              { autoAlpha: 0, x: (index) => (index % 2 === 0 ? -18 : 18), y: 14 },
              { autoAlpha: 1, x: 0, y: 0, duration: 0.38, stagger: 0.1 },
              0.34,
            )
            .fromTo(
              "[data-kai-execution-confirm]",
              { autoAlpha: 0, y: pick(34, 30, 26), x: pick(18, 14, 0) },
              { autoAlpha: 1, y: 0, x: 0, duration: 0.68 },
              0.5,
            )
            .fromTo(
              "[data-kai-execution-status]",
              { autoAlpha: 0, y: 14 },
              { autoAlpha: 1, y: 0, duration: 0.3 },
              0.72,
            )
            .fromTo(
              "[data-kai-execution-metric]",
              { autoAlpha: 0, y: 14 },
              { autoAlpha: 1, y: 0, duration: 0.3, stagger: 0.06 },
              0.8,
            )
            .to(
              executionMetricValues,
              {
                growth: EXECUTION_GROWTH_IMPACT,
                duration: pick(0.92, 0.8, 0.68),
                ease: "power2.out",
                onUpdate: syncExecutionMetrics,
              },
              0.84,
            )
            .to(
              executionMetricValues,
              {
                time: EXECUTION_TIME_SAVED,
                duration: pick(0.72, 0.62, 0.54),
                ease: "power2.out",
                onUpdate: syncExecutionMetrics,
              },
              0.92,
            )
            .fromTo(
              "[data-kai-execution-aura]",
              { autoAlpha: 0 },
              { autoAlpha: 1, duration: 0.74, stagger: 0.08 },
              0.14,
            );

          registerReveal({
            ref: executionRef,
            start: pick("top 78%", "top 82%", "top 86%"),
            triggerRatio: pick(0.78, 0.82, 0.86),
            timeline: executionTimeline,
            onSettle: () => {
              executionMetricValues.growth = EXECUTION_GROWTH_IMPACT;
              executionMetricValues.time = EXECUTION_TIME_SAVED;
              syncExecutionMetrics();
            },
            onReset: () => {
              executionMetricValues.growth = 0;
              executionMetricValues.time = 0;
              syncExecutionMetrics();
            },
          });

          const governanceTimeline = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
          governanceTimeline
            .fromTo(
              "[data-kai-governance-intro]",
              { autoAlpha: 0, y: 24 },
              { autoAlpha: 1, y: 0, duration: 0.46 },
              0,
            )
            .fromTo(
              "[data-kai-governance-card]",
              { autoAlpha: 0, x: -22, y: 8 },
              { autoAlpha: 1, x: 0, y: 0, duration: 0.38, stagger: 0.1 },
              0.12,
            )
            .fromTo(
              "[data-kai-governance-icon-shell]",
              { scale: 0.82, autoAlpha: 0.6 },
              { scale: 1, autoAlpha: 1, duration: 0.32, stagger: 0.08 },
              0.2,
            )
            .fromTo(
              "[data-kai-governance-copy]",
              { autoAlpha: 0, x: -14 },
              { autoAlpha: 1, x: 0, duration: 0.34, stagger: 0.08 },
              0.24,
            );

          registerReveal({
            ref: governanceRef,
            start: pick("top 84%", "top 88%", "top 90%"),
            triggerRatio: pick(0.84, 0.88, 0.9),
            timeline: governanceTimeline,
          });

          const finalTimeline = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
          finalTimeline
            .fromTo(
              "[data-kai-final-copy]",
              { autoAlpha: 0, y: 24, clipPath: "inset(0% 0% 100% 0%)" },
              { autoAlpha: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)", duration: 0.48 },
              0,
            )
            .fromTo(
              "[data-kai-final-accent]",
              { color: "rgba(0, 122, 255, 0.36)" },
              { color: "rgb(var(--kai-blue-rgb))", duration: 0.42 },
              0.12,
            )
            .fromTo(
              "[data-kai-final-actions]",
              { autoAlpha: 0, y: 16, scale: 0.99 },
              { autoAlpha: 1, y: 0, scale: 1, duration: 0.4 },
              0.22,
            );

          registerReveal({
            ref: finalRef,
            start: pick("top 90%", "top 92%", "top 94%"),
            triggerRatio: pick(0.9, 0.92, 0.94),
            timeline: finalTimeline,
          });

          registerParallax("[data-kai-hero-aura]", heroRef, pick(-34, -20, -10));
          registerParallax("[data-kai-problem-aura]", problemRef, pick(-22, -16, -10));
          registerParallax("[data-kai-problem-shell]", problemRef, pick(-18, -12, -6));
          registerParallax("[data-kai-visibility-card]", visibilityRef, pick(-16, -12, -6));
          registerParallax("[data-kai-visibility-status]", visibilityRef, pick(-10, -7, -4));
          registerParallax("[data-kai-visibility-device]", visibilityRef, pick(-14, -10, -6));
          registerParallax("[data-kai-visibility-aura]", visibilityRef, pick(-28, -20, -12));
          registerParallax("[data-kai-visibility-banner]", visibilityRef, pick(-12, -8, -4));
          registerParallax("[data-kai-strategy-stack]", strategyRef, pick(-18, -12, -8));
          registerParallax("[data-kai-execution-aura]", executionRef, pick(-26, -18, -10));
          registerParallax("[data-kai-execution-confirm]", executionRef, pick(-10, -7, 0));

          ScrollTrigger.refresh();

          return () => {
            cleanups.forEach((cleanup) => cleanup());
          };
        },
      );
    }, pageRef);

    return () => {
      mm?.revert();
      ctx.revert();
    };
  }, [discoveryStageReady, discoveryDeviceProgress, reduceMotion]);

  return (
    <div ref={pageRef} className={styles.kaiDesignerPage}>
      <section ref={heroRef} className={styles.kaiDesignerHero}>
        <div className={styles.kaiHeroAtmosphere} aria-hidden="true">
          <div className={styles.kaiHeroAuraPrimary} data-kai-hero-aura="primary" />
          <div className={styles.kaiHeroAuraSecondary} data-kai-hero-aura="secondary" />
        </div>

        <div className={styles.kaiContentContainer}>
          <div className={styles.kaiHeroStack}>
            <h1 className={styles.kaiHeroTitle} data-kai-hero-title>
              <span className={styles.kaiHeroTitleLine}>
                <span className={styles.kaiHeroTitleLineInner} data-kai-hero-line>
                  Kai,
                </span>
              </span>
              <span className={styles.kaiHeroTitleLine}>
                <span className={styles.kaiHeroTitleLineInner} data-kai-hero-line>
                  Your personal
                </span>
              </span>
              <span className={styles.kaiHeroTitleLine}>
                <span className={styles.kaiHeroTitleLineInner} data-kai-hero-line>
                  financial agent.
                </span>
              </span>
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
            <p
              className={`${styles.kaiEyebrow} ${styles.kaiEyebrowDark}`}
              data-kai-problem-eyebrow
            >
              THE PROBLEM
            </p>
            <h2 className={styles.kaiSectionTitleLight}>
              <span className={styles.kaiProblemTitleLine}>
                <span className={styles.kaiProblemTitleLineInner} data-kai-problem-title-line>
                  Fragmentation is costly.
                </span>
              </span>
              <span className={styles.kaiProblemTitleLine}>
                <span className={styles.kaiProblemTitleLineInner} data-kai-problem-title-line>
                  Stop the leakage.
                </span>
              </span>
            </h2>
            <p className={styles.kaiSectionLeadDark} data-kai-problem-lead>
              Idle cash across accounts isn&apos;t just sitting still—it&apos;s losing ground.
              Missed signals and manual tracking quietly drain your capital every month.
            </p>
          </div>

          <div
            ref={problemShellRef}
            className={styles.kaiProblemCard}
            data-kai-problem-shell
          >
            <div className={styles.kaiProblemRevealSweep} data-kai-problem-sweep aria-hidden="true" />
            <div className={styles.kaiProblemState} data-kai-problem-before>
              <div className={styles.kaiProblemHeader}>
                <p className={styles.kaiMiniEyebrow}>Fragmentation is costly</p>
                <span className={styles.kaiProblemBadge} data-kai-problem-badge>
                  Wasted
                </span>
              </div>

              <div className={styles.kaiProblemRow}>
                <span>Chase / Amex / Venmo</span>
                <strong>$5,412.45</strong>
              </div>
            </div>

            <div className={styles.kaiProblemConnector} data-kai-problem-arrow>
              <div className={styles.kaiProblemConnectorLine} data-kai-problem-line />
              <div className={styles.kaiProblemConnectorButton}>
                <MaterialIcon
                  name="south"
                  className={styles.kaiProblemConnectorIcon}
                  data-kai-problem-arrow-icon
                />
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

            <div className={styles.kaiProblemAuraCoral} data-kai-problem-aura aria-hidden="true" />
            <div className={styles.kaiProblemAuraGreen} data-kai-problem-aura aria-hidden="true" />
          </div>

          <p className={styles.kaiProblemNote} data-kai-problem-note>
            <MaterialIcon name="verified" className={styles.kaiProblemNoteIcon} />
            <span>Save hours. Make smarter money moves.</span>
          </p>
        </div>
      </section>

      <section ref={visibilityRef} className={styles.kaiVisibilitySection}>
        <div className={styles.kaiContentContainer}>
          <div
            className={`${styles.kaiSectionIntro} ${styles.kaiSectionIntroCentered}`}
            data-kai-visibility-intro
          >
            <p className={styles.kaiEyebrow}>VISIBILITY</p>
            <h2 className={styles.kaiSectionTitle}>Total Clarity. Total Control.</h2>
            <p className={styles.kaiSectionLead}>
              Your financial universe, unified. Kai securely scans every account to reveal every
              dollar that could be working harder for you.
            </p>
          </div>

          <div className={styles.kaiVisibilityCard} data-kai-visibility-card>
            <div className={styles.kaiVisibilityScan} data-kai-visibility-scan aria-hidden="true" />
            <div className={styles.kaiDiscoverySummary} data-kai-visibility-summary>
              <div className={styles.kaiDiscoveryIconShell}>
                <MaterialIcon name="analytics" className={styles.kaiDiscoveryIcon} filled />
              </div>
              <div className={styles.kaiDiscoveryTitleRow}>
                <span className={styles.kaiMiniEyebrowBlue}>Discovery Report</span>
                <span className={styles.kaiFoundBadge}>Found</span>
              </div>
              <div className={styles.kaiDiscoveryAmount} data-kai-visibility-amount>
                $12,419.52
              </div>
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
              <div className={styles.kaiVisibilityBannerCopy} data-kai-visibility-banner-copy>
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

            <div className={styles.kaiVisibilityAuraBlue} data-kai-visibility-aura aria-hidden="true" />
            <div className={styles.kaiVisibilityAuraGreen} data-kai-visibility-aura aria-hidden="true" />
          </div>

          <div className={styles.kaiVisibilityDeviceRow} data-kai-visibility-device>
            <div
              ref={discoveryStageRef}
              className={`${styles.discoveryDeviceStage} ${styles.kaiDesignerDeviceStage}`}
            >
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
          <div
            className={`${styles.kaiSectionIntro} ${styles.kaiSectionIntroCentered}`}
            data-kai-strategy-intro
          >
            <p className={styles.kaiEyebrow}>Strategy</p>
            <h2 className={styles.kaiSectionTitle}>How KAI works quietly for you.</h2>
            <p className={styles.kaiSectionLead}>
              Wealth management is finally simple. Just ask, approve, and grow your money without
              the manual hustle.
            </p>
          </div>

          <div className={styles.kaiStrategyStack} data-kai-strategy-stack>
            <div className={styles.kaiVoicePanel} data-kai-strategy-voice>
              <div className={styles.kaiVoiceOrb} data-kai-strategy-orb aria-hidden="true" />
              <p className={styles.kaiVoiceEyebrow}>Just ask Kai</p>
              <p className={styles.kaiVoiceQuote}>
                “<span data-kai-strategy-quote>{STRATEGY_QUOTE_TEXT}</span>”
              </p>

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
        <div className={styles.kaiExecutionAtmosphere} aria-hidden="true">
          <div className={styles.kaiExecutionAuraBlue} data-kai-execution-aura />
          <div className={styles.kaiExecutionAuraGreen} data-kai-execution-aura />
        </div>

        <div className={styles.kaiContentContainer}>
          <div className={styles.kaiSectionIntro} data-kai-execution-intro>
            <p className={styles.kaiEyebrow}>Execution</p>
            <h2 className={styles.kaiSectionTitle}>
              Invest with <span className={styles.kaiAccentWord} data-kai-execution-accent>clarity.</span>
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
                <p className={styles.kaiExecutionStatusLabel} data-kai-execution-status>
                  <MaterialIcon name="check_circle" className={styles.kaiExecutionStatusIcon} filled />
                  Money, in motion.
                </p>

                <div className={styles.kaiExecutionMetricGrid}>
                  <div data-kai-execution-metric>
                    <p>Growth Impact</p>
                    <strong data-kai-execution-metric-value="growth">+$1,000.00</strong>
                  </div>
                  <div data-kai-execution-metric>
                    <p>Time Saved</p>
                    <strong data-kai-execution-metric-value="time">4.5h</strong>
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
                  data-kai-governance-icon-shell
                >
                  <MaterialIcon
                    name={card.icon}
                    className={styles.kaiGovernanceIcon}
                    filled
                  />
                </div>
                <div className={styles.kaiGovernanceCopy} data-kai-governance-copy>
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
              Own your <span className={styles.kaiAccentWord} data-kai-final-accent>financial future.</span>
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
