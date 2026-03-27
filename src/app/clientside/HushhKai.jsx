"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  BadgeDollarSign,
  CheckCircle2,
  Fingerprint,
  LockKeyhole,
  Mic,
  ShieldCheck,
  Smartphone,
  Sparkles,
  SlidersHorizontal,
} from "lucide-react";
import { useEffect, useRef } from "react";
import styles from "./KaiPage.module.css";

const KaiDeviceStage = dynamic(() => import("./KaiDeviceStage"), {
  ssr: false,
});

const KAI_APP_URL = "https://apps.apple.com/au/app/hushh-personal-agent-kai/id6757718917";
const KAI_WEB_URL = "https://kai.hushh.ai";

const discoveryAccounts = [
  {
    label: "Chase Platinum",
    detail: "$8,420.00 idle",
    icon: "C",
    tone: "primary",
  },
  {
    label: "Schwab Brokerage",
    detail: "$4,000.52 idle",
    icon: "S",
    tone: "secondary",
  },
];

const scatteredAccounts = [
  {
    label: "High Yield Savings",
    detail: "$24,100",
    source: "Marcus by Goldman",
  },
  {
    label: "Brokerage",
    detail: "$4,000",
    source: "Schwab Account",
  },
  {
    label: "Checking",
    detail: "$8,420",
    source: "Chase Sapphire",
  },
];

const allocationCards = [
  {
    company: "Apple Inc.",
    symbol: "AAPL",
    allocation: "42%",
    amount: "$5,200",
    note: "Strong ecosystem capture and on-device intelligence support a higher-conviction core position.",
    meter: "42%",
    accent: "blue",
  },
  {
    company: "Microsoft",
    symbol: "MSFT",
    allocation: "33%",
    amount: "$4,100",
    note: "Cloud cashflow and enterprise AI depth create a steadier defensive layer for the portfolio.",
    meter: "33%",
    accent: "slate",
  },
  {
    company: "Alphabet",
    symbol: "GOOGL",
    allocation: "25%",
    amount: "$3,100",
    note: "Valuation discipline and platform breadth keep the opportunity balanced against risk.",
    meter: "25%",
    accent: "ink",
  },
];

const flowCards = [
  {
    tag: "Discovery",
    title: "See scattered capital",
    copy: "Kai brings idle cash and fragmented account context into one private view before you have to hunt for it.",
  },
  {
    tag: "Strategy",
    title: "Review the allocation",
    copy: "Each recommendation carries sizing, conviction, and plain-English reasoning so you can trust the next move.",
  },
  {
    tag: "Approval",
    title: "Confirm with intent",
    copy: "Every execution waits for your biometric approval. Nothing moves silently in the background.",
  },
];

const methodCards = [
  {
    title: "See what matters",
    body: "Kai compresses account noise, market signals, and liquidity into a single frame you can understand in seconds.",
  },
  {
    title: "Understand the why",
    body: "Every suggestion is paired with rationale, sizing, and context instead of a black-box recommendation.",
  },
  {
    title: "Stay in control",
    body: "The system never hides agency. The final move belongs to you, not the model.",
  },
];

const securityCards = [
  {
    title: "Local-only storage",
    body: "Your financial footprint stays encrypted on your hardware and under your control.",
    icon: Smartphone,
  },
  {
    title: "Zero-knowledge compute",
    body: "Kai’s intelligence runs with architectural boundaries that minimize unnecessary data exposure.",
    icon: Sparkles,
  },
  {
    title: "Sovereign keys",
    body: "Protected keys and biometric approval keep the final authority in your hands.",
    icon: LockKeyhole,
  },
  {
    title: "Hard thresholds",
    body: "Guardrails and explicit limits keep Kai aligned with your intent and appetite for risk.",
    icon: SlidersHorizontal,
  },
];

const springConfig = {
  stiffness: 120,
  damping: 22,
  mass: 0.42,
};

function useParallax(progress, range) {
  return useSpring(useTransform(progress, [0, 1], range), springConfig);
}

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

export default function HushhKai() {
  const reduceMotion = useReducedMotion();

  const heroRef = useRef(null);
  const discoveryRef = useRef(null);
  const discoveryStageRef = useRef(null);
  const problemRef = useRef(null);
  const voiceRef = useRef(null);
  const strategyRef = useRef(null);
  const finalRef = useRef(null);

  useEffect(() => {
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

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });
  const { scrollYProgress: discoveryProgress } = useScroll({
    target: discoveryRef,
    offset: ["start end", "end start"],
  });
  const { scrollYProgress: problemProgress } = useScroll({
    target: problemRef,
    offset: ["start end", "end start"],
  });
  const { scrollYProgress: voiceProgress } = useScroll({
    target: voiceRef,
    offset: ["start end", "end start"],
  });
  const { scrollYProgress: strategyProgress } = useScroll({
    target: strategyRef,
    offset: ["start end", "end start"],
  });
  const { scrollYProgress: finalProgress } = useScroll({
    target: finalRef,
    offset: ["start end", "end start"],
  });

  const heroMeshY = useParallax(heroProgress, [-48, 68]);
  const heroGlowOneY = useParallax(heroProgress, [-18, 48]);
  const heroGlowTwoY = useParallax(heroProgress, [24, -36]);
  const heroGlowOneScale = useParallax(heroProgress, [0.96, 1.08]);
  const heroGlowTwoScale = useParallax(heroProgress, [1.04, 0.94]);

  const discoverySceneY = useParallax(discoveryProgress, [16, -10]);
  const discoveryPanelY = useParallax(discoveryProgress, [-6, 10]);
  const discoveryBarOne = useParallax(discoveryProgress, [0.74, 1]);
  const discoveryBarTwo = useParallax(discoveryProgress, [0.64, 1]);
  const discoveryBarThree = useParallax(discoveryProgress, [0.82, 1]);
  const discoveryBarFour = useParallax(discoveryProgress, [0.7, 1]);
  const discoveryBarFive = useParallax(discoveryProgress, [0.58, 1]);

  const problemCardOneY = useParallax(problemProgress, [68, -92]);
  const problemCardTwoY = useParallax(problemProgress, [28, -64]);
  const problemCardThreeY = useParallax(problemProgress, [48, -54]);
  const problemCenterY = useParallax(problemProgress, [92, -42]);
  const problemCardOneRotate = useParallax(problemProgress, [-9, -4]);
  const problemCardTwoRotate = useParallax(problemProgress, [6, 2]);
  const problemCardThreeRotate = useParallax(problemProgress, [-3, 1]);
  const problemCardBg = useTransform(
    problemProgress,
    [0.26, 0.58],
    ["rgba(255, 255, 255, 0.2)", "rgba(255, 255, 255, 0.08)"]
  );
  const problemCardBorder = useTransform(
    problemProgress,
    [0.26, 0.58],
    ["rgba(255, 255, 255, 0.2)", "rgba(255, 255, 255, 0.1)"]
  );
  const problemCardShadow = useTransform(
    problemProgress,
    [0.26, 0.58],
    ["0 28px 56px rgba(15, 23, 42, 0.12)", "0 40px 80px rgba(0, 0, 0, 0.42)"]
  );
  const problemKickerColor = useTransform(
    problemProgress,
    [0.26, 0.58],
    ["rgba(255, 255, 255, 0.72)", "rgba(255, 255, 255, 0.45)"]
  );
  const problemBodyColor = useTransform(
    problemProgress,
    [0.26, 0.58],
    ["rgba(255, 255, 255, 0.96)", "#ffffff"]
  );
  const problemMetaColor = useTransform(
    problemProgress,
    [0.26, 0.58],
    ["rgba(255, 255, 255, 0.76)", "rgba(255, 255, 255, 0.58)"]
  );

  const voiceOrbScale = useParallax(voiceProgress, [0.88, 1.18]);
  const voiceOrbOpacity = useTransform(voiceProgress, [0, 0.4, 1], [0.24, 0.42, 0.18]);
  const voicePanelY = useParallax(voiceProgress, [40, -24]);

  const wheelRotate = useParallax(strategyProgress, [-18, 14]);
  const allocationCardY = useParallax(strategyProgress, [34, -16]);

  const finalGlowY = useParallax(finalProgress, [84, -24]);
  const finalGlowScale = useParallax(finalProgress, [0.92, 1.1]);

  const reveal = (delay = 0, y = 28) => ({
    initial: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false, amount: 0.2 },
    transition: reduceMotion
      ? { duration: 0.01, delay: 0 }
      : { duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <div className={styles.page}>
      <section ref={heroRef} className={styles.heroSection} data-kai-section="hero">
        <motion.div
          className={styles.heroMesh}
          aria-hidden="true"
          style={reduceMotion ? undefined : { y: heroMeshY }}
        />
        <motion.div
          className={styles.heroGlowPrimary}
          aria-hidden="true"
          style={reduceMotion ? undefined : { y: heroGlowOneY, scale: heroGlowOneScale }}
        />
        <motion.div
          className={styles.heroGlowSecondary}
          aria-hidden="true"
          style={reduceMotion ? undefined : { y: heroGlowTwoY, scale: heroGlowTwoScale }}
        />

        <div className={styles.sectionInnerWide}>
          <motion.div className={styles.heroStack} data-kai-hero-copy="true" {...reveal(0.04, 24)}>
            <p className={styles.eyebrow}>Investing, simplified</p>
            <h1 className={styles.heroTitle}>
              Your private AI banker.
              <br />
              <span className={styles.accentWord}>Now in your pocket.</span>
            </h1>
            <p className={styles.heroLead}>
              A personal AI agent that understands your money and shows what to do next and why,
              with privacy and control built into every step.
            </p>

            <div className={styles.heroActions}>
              <AppStoreCta href={KAI_APP_URL} heroSized />
              <ExternalCta
                href={KAI_WEB_URL}
                variant="secondary"
                heroSized
              >
                Use Kai on the web
              </ExternalCta>
            </div>

            <div className={styles.heroTrustRow}>
              <span>Private by design</span>
              <span>Biometric approval</span>
              <span>Explainable decisions</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section ref={discoveryRef} className={styles.discoverySection} data-kai-section="discovery">
        <div className={styles.sectionInner}>
          <div className={styles.discoveryLayout} data-kai-discovery-stage="true">
            <motion.div
              className={`${styles.sectionCopy} ${styles.discoveryCopy}`}
              {...reveal(0.04, 26)}
            >
              <p className={styles.eyebrow}>Discovery</p>
              <h2 className={`${styles.sectionTitle} ${styles.discoveryTitle}`}>
                Your capital,
                <br />
                <span className={`${styles.accentWord} ${styles.discoveryAccent}`}>unleashed.</span>
              </h2>
              <p className={styles.sectionLead}>
                Kai securely scans your accounts to identify idle cash instantly and turns
                scattered balance context into one readable private view.
              </p>

              <div className={styles.accountStack}>
                {discoveryAccounts.map((item, index) => (
                  <motion.article
                    key={item.label}
                    className={`${styles.accountCard} ${
                      item.tone === "primary"
                        ? styles.accountCardPrimary
                        : styles.accountCardSecondary
                    }`}
                    {...reveal(index * 0.06 + 0.12, 18)}
                  >
                    <div className={styles.accountIcon}>{item.icon}</div>
                    <div>
                      <p>{item.label}</p>
                      <strong>{item.detail}</strong>
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.div>

            <motion.div
              className={styles.discoveryUnlockPanel}
              style={reduceMotion ? undefined : { y: discoveryPanelY }}
              {...reveal(0.12, 24)}
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
                <motion.span
                  className={styles.chartBar}
                  style={reduceMotion ? { scaleY: 1 } : { scaleY: discoveryBarOne }}
                />
                <motion.span
                  className={styles.chartBar}
                  style={reduceMotion ? { scaleY: 1 } : { scaleY: discoveryBarTwo }}
                />
                <motion.span
                  className={`${styles.chartBar} ${styles.chartBarPrimary}`}
                  style={reduceMotion ? { scaleY: 1 } : { scaleY: discoveryBarThree }}
                />
                <motion.span
                  className={styles.chartBar}
                  style={reduceMotion ? { scaleY: 1 } : { scaleY: discoveryBarFour }}
                />
                <motion.span
                  className={styles.chartBar}
                  style={reduceMotion ? { scaleY: 1 } : { scaleY: discoveryBarFive }}
                />
              </div>

              <div className={styles.discoveryActionCard}>
                <div>
                  <p>Potential to unlock</p>
                  <strong>Optimal liquidity detected in 2 accounts</strong>
                </div>
                <ArrowRight size={18} strokeWidth={2.1} />
              </div>
            </motion.div>

            <motion.div
              ref={discoveryStageRef}
              className={styles.discoveryDeviceStage}
              data-kai-discovery-visual="true"
              style={reduceMotion ? undefined : { y: discoverySceneY }}
              {...reveal(0.18, 30)}
            >
              <div className={styles.discoveryDeviceAura} aria-hidden="true" />
              <KaiDeviceStage
                className={styles.discoveryImageWrap}
                progress={discoveryProgress}
                reduceMotion={reduceMotion}
                posterSrc="/Images/kai/discovery-screen.png"
                sectionRef={discoveryStageRef}
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section ref={problemRef} className={styles.problemSection} data-kai-section="problem">
        <div className={styles.sectionInner}>
          <motion.div className={styles.problemIntro} {...reveal(0.06, 24)}>
            <p className={`${styles.eyebrow} ${styles.eyebrowDark}`}>The problem</p>
            <h2 className={`${styles.sectionTitle} ${styles.sectionTitleDark}`}>
              Your money is
              <br />
              <span className={styles.accentWord}>scattered.</span>
            </h2>
            <p className={styles.sectionLeadDark}>
              Across accounts. Across apps. Sitting idle and not working for you. The modern
              financial landscape is fragmented, and Kai starts by making that fragmentation
              obvious.
            </p>
          </motion.div>

          <div className={styles.scatterStage}>
            {scatteredAccounts.map((item, index) => {
              const yStyles = [
                { y: problemCardOneY, rotate: problemCardOneRotate },
                { y: problemCardTwoY, rotate: problemCardTwoRotate },
                { y: problemCardThreeY, rotate: problemCardThreeRotate },
              ][index];

              return (
                <motion.article
                  key={item.label}
                  className={`${styles.scatterCard} ${styles[`scatterCard${index + 1}`]}`}
                  style={
                    reduceMotion
                      ? undefined
                      : {
                          ...yStyles,
                          backgroundColor: problemCardBg,
                          borderColor: problemCardBorder,
                          boxShadow: problemCardShadow,
                          "--scatter-kicker": problemKickerColor,
                          "--scatter-body": problemBodyColor,
                          "--scatter-meta": problemMetaColor,
                        }
                  }
                >
                  <p>{item.label}</p>
                  <strong>{item.detail}</strong>
                  <span>{item.source}</span>
                </motion.article>
              );
            })}

            <motion.article
              className={styles.scatterCenterCard}
              style={
                reduceMotion
                  ? undefined
                  : {
                      y: problemCenterY,
                      backgroundColor: problemCardBg,
                      borderColor: problemCardBorder,
                      boxShadow: problemCardShadow,
                      "--scatter-kicker": problemKickerColor,
                      "--scatter-body": problemBodyColor,
                      "--scatter-meta": problemMetaColor,
                    }
              }
            >
              <p>Combined idle</p>
              <strong>$12,419.52</strong>
              <span>Ready to invest with Kai</span>
            </motion.article>
          </div>
        </div>
      </section>

      <section ref={voiceRef} className={styles.voiceSection} data-kai-section="voice">
        <div className={styles.sectionInner}>
          <div className={styles.twoColumnLayout}>
            <motion.div className={styles.sectionCopy} {...reveal(0.06, 24)}>
              <p className={styles.eyebrow}>Zero typing</p>
              <h2 className={styles.sectionTitle}>
                Just
                <br />
                <span className={styles.accentWord}>say it.</span>
              </h2>
              <p className={styles.sectionLead}>
                Talk to Kai to consolidate your view, understand what matters, and align capital in
                one motion-rich, private flow.
              </p>
              <div className={styles.inlineSecurityTag}>
                <ShieldCheck size={16} strokeWidth={2.1} />
                <span>On-device privacy secured</span>
              </div>
            </motion.div>

            <motion.div
              className={styles.voicePanel}
              style={reduceMotion ? undefined : { y: voicePanelY }}
              {...reveal(0.16, 28)}
            >
              <motion.div
                className={styles.voiceOrb}
                aria-hidden="true"
                style={
                  reduceMotion
                    ? undefined
                    : { scale: voiceOrbScale, opacity: voiceOrbOpacity }
                }
              />
              <p className={styles.voiceTag}>Voice intelligence</p>
              <blockquote className={styles.voiceQuote}>
                “Kai, where should I invest my $1000?”
              </blockquote>
              <div className={styles.voiceBars} aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
              <div className={styles.voiceMic}>
                <Mic size={38} strokeWidth={2.1} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section ref={strategyRef} className={styles.strategySection} data-kai-section="strategy">
        <div className={styles.sectionInner}>
          <motion.div className={styles.sectionHeader} {...reveal(0.06, 24)}>
            <p className={styles.eyebrow}>Strategy</p>
            <h2 className={styles.sectionTitle}>
              Where to
              <br />
              <span className={styles.accentWord}>invest.</span>
            </h2>
            <p className={styles.sectionLead}>
              Kai proposes a targeted strategy based on your profile: high-conviction,
              mathematically sound, and explained in plain English.
            </p>
          </motion.div>

          <div className={styles.strategyGrid}>
            <div className={styles.allocationGrid}>
              {allocationCards.map((card, index) => (
                <motion.article
                  key={card.symbol}
                  className={styles.allocationCard}
                  style={reduceMotion ? undefined : { y: allocationCardY }}
                  {...reveal(index * 0.06 + 0.1, 18)}
                >
                  <div className={styles.allocationHeader}>
                    <div className={`${styles.logoBadge} ${styles[`logoBadge${card.accent}`]}`}>
                      {card.symbol.slice(0, 1)}
                    </div>
                    <div className={styles.allocationMeta}>
                      <strong>{card.allocation}</strong>
                      <span>Allocation</span>
                    </div>
                  </div>
                  <div className={styles.allocationCompany}>
                    <h3>{card.amount}</h3>
                    <p>
                      {card.symbol} / {card.company}
                    </p>
                  </div>
                  <div className={styles.allocationMeter}>
                    <motion.i
                      className={styles.allocationBar}
                      initial={reduceMotion ? false : { scaleX: 0.35 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: false, amount: 0.45 }}
                      transition={
                        reduceMotion
                          ? { duration: 0.01 }
                          : { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }
                      }
                      style={{ width: card.meter }}
                    />
                  </div>
                  <p className={styles.allocationNote}>{card.note}</p>
                </motion.article>
              ))}
            </div>

            <motion.div className={styles.allocationWheelCard} {...reveal(0.18, 24)}>
              <motion.div
                className={styles.allocationWheel}
                style={reduceMotion ? undefined : { rotate: wheelRotate }}
              >
                <div className={styles.allocationWheelInner}>
                  <strong>$1,000</strong>
                  <span>Allocation</span>
                </div>
              </motion.div>
              <p className={styles.allocationWheelCopy}>
                Kai keeps the decision visual and legible, so sizing and conviction are obvious
                before you commit capital.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className={styles.confirmationSection} data-kai-section="confirmation">
        <div className={styles.sectionInner}>
          <div className={styles.twoColumnLayout}>
            <motion.div className={styles.sectionCopy} {...reveal(0.05, 24)}>
              <p className={styles.eyebrow}>Confirmation</p>
              <h2 className={styles.sectionTitle}>
                One tap.
                <br />
                <span className={styles.accentWord}>Absolute control.</span>
              </h2>
              <p className={styles.sectionLead}>
                Review your allocation and confirm when ready. Your money never moves without your
                biometric approval.
              </p>

              <div className={styles.flowList}>
                {flowCards.map((card) => (
                  <article key={card.title} className={styles.flowCard}>
                    <p>{card.tag}</p>
                    <h3>{card.title}</h3>
                    <span>{card.copy}</span>
                  </article>
                ))}
              </div>
            </motion.div>

            <motion.article className={styles.approvalCard} {...reveal(0.15, 28)}>
              <div className={styles.approvalIconWrap}>
                <Fingerprint size={54} strokeWidth={1.8} />
              </div>
              <div className={styles.approvalCopy}>
                <p>On-device privacy core</p>
                <h3>Biometric approval</h3>
                <span>The future is private, intelligent, and still entirely yours.</span>
              </div>
            </motion.article>
          </div>
        </div>
      </section>

      <section className={styles.executionSection} data-kai-section="execution">
        <div className={styles.sectionInner}>
          <motion.div className={styles.sectionHeader} {...reveal(0.06, 24)}>
            <p className={styles.eyebrow}>Execution</p>
            <h2 className={styles.sectionTitle}>
              Money,
              <br />
              <span className={styles.accentWord}>in motion.</span>
            </h2>
            <p className={styles.sectionLead}>
              Your strategy becomes active without clutter. The result feels calm, clear, and easy
              to audit after the fact.
            </p>
          </motion.div>

          <motion.article className={styles.outcomeCard} {...reveal(0.14, 26)}>
            <div className={styles.outcomeCheck}>
              <CheckCircle2 size={44} strokeWidth={2.1} />
            </div>
            <h3>Portfolio synced</h3>
            <div className={styles.outcomeMetrics}>
              <div>
                <span>Previous balance</span>
                <strong>$124,190.00</strong>
              </div>
              <div className={styles.outcomeInvestment}>Investment: +$1,000.00</div>
              <div>
                <span>New total</span>
                <strong>$125,190.00</strong>
              </div>
            </div>
          </motion.article>
        </div>
      </section>

      <section className={styles.methodSection} data-kai-section="method">
        <div className={styles.sectionInner}>
          <motion.div className={styles.sectionHeader} {...reveal(0.04, 24)}>
            <p className={styles.eyebrow}>The method</p>
            <h2 className={styles.sectionTitle}>
              Simple,
              <br />
              <span className={styles.accentWord}>clear decisions.</span>
            </h2>
            <p className={styles.sectionLead}>
              Kai looks at your money, finds the opportunity, and shows what to do and why without
              turning the process into analysis paralysis.
            </p>
          </motion.div>

          <div className={styles.methodGrid}>
            {methodCards.map((card, index) => (
              <motion.article
                key={card.title}
                className={styles.methodCard}
                {...reveal(index * 0.06 + 0.1, 18)}
              >
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.privacySection} data-kai-section="privacy">
        <div className={styles.sectionInner}>
          <motion.div className={styles.sectionHeader} {...reveal(0.06, 24)}>
            <p className={styles.eyebrow}>Security</p>
            <h2 className={styles.sectionTitle}>
              Your privacy.
              <br />
              <span className={styles.accentWord}>Built on iron rules.</span>
            </h2>
            <p className={styles.sectionLead}>
              Uncompromising protection keeps your financial data guarded by architectural rules
              that preserve human control.
            </p>
          </motion.div>

          <div className={styles.securityGrid}>
            {securityCards.map((card, index) => {
              const Icon = card.icon;

              return (
                <motion.article
                  key={card.title}
                  className={styles.securityCard}
                  {...reveal(index * 0.05 + 0.1, 18)}
                >
                  <span className={styles.securityIcon}>
                    <Icon size={22} strokeWidth={2} />
                  </span>
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section ref={finalRef} className={styles.finalSection} data-kai-section="final">
        <motion.div
          className={styles.finalGlow}
          aria-hidden="true"
          style={reduceMotion ? undefined : { y: finalGlowY, scale: finalGlowScale }}
        />
        <div className={styles.sectionInnerWide}>
          <motion.div className={styles.finalCopy} {...reveal(0.08, 24)}>
            <p className={styles.eyebrow}>Next step</p>
            <h2 className={styles.finalTitle}>
              Own <span className={styles.accentWord}>your</span> future.
            </h2>
            <p className={styles.finalLead}>
              Stop guessing. Start knowing. Bring private intelligence and calmer action to your
              capital with Kai.
            </p>
            <div className={styles.heroActions}>
              <AppStoreCta href={KAI_APP_URL} heroSized />
              <ExternalCta href={KAI_WEB_URL} variant="secondary" heroSized>
                Use Kai on the web
              </ExternalCta>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
