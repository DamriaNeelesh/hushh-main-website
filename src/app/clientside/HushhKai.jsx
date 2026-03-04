"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { FaApple, FaArrowRight, FaBell, FaChartLine, FaLock, FaShieldAlt, FaSun } from "react-icons/fa";
import styles from "./KaiPage.module.css";
import FooterComponent from "../_components/features/FooterComponent";

const signals = [
  {
    title: "Company Strength",
    subtitle: "Checks financial health",
    value: "Strong",
    icon: FaShieldAlt,
    iconClass: styles.iconGreen,
    tagClass: styles.tagGreen,
  },
  {
    title: "Market Trend",
    subtitle: "Reads market tone",
    value: "Neutral",
    icon: FaChartLine,
    iconClass: styles.iconOrange,
    tagClass: styles.tagOrange,
  },
  {
    title: "Fair Value",
    subtitle: "Value & risk calculation",
    value: "Good Entry",
    icon: FaLock,
    iconClass: styles.iconBlue,
    tagClass: styles.tagGreen,
  },
];

const transparencyCards = [
  {
    title: "Clear Outcome",
    body: "Instant buy/hold/sell recommendation with a confidence percentage.",
  },
  {
    title: "Specialist Insights",
    body: "See exactly why the AI made the decision. Earnings, momentum, and risk all surfaced.",
  },
  {
    title: "Debate Digest",
    body: "Read the internal monologue of the AI committee as it debates pros and cons.",
  },
];

const preMarketDigestItems = [
  {
    title: "NVDA Report",
    body: "Earnings beat estimates by 12%.",
    tag: "Hold",
    tagClass: styles.digestHold,
  },
  {
    title: "Kai Pick: MSFT",
    body: "Strong fundamentals.",
    tag: "Buy",
    tagClass: styles.digestBuy,
  },
];

const notificationItems = [
  {
    title: "AAPL Sentiment Shift",
    body: "Macro pressure eased pre-open. Committee confidence rose from 82% to 86%.",
    tag: "Recheck",
    tagClass: styles.digestReview,
    time: "5m ago",
    dotClass: styles.noticeBlue,
  },
  {
    title: "TSLA Volatility Alert",
    body: "Risk agent flagged unusually wide swings. Kai suggests tighter position sizing.",
    tag: "Risk",
    tagClass: styles.digestRisk,
    time: "17m ago",
    dotClass: styles.noticeAmber,
  },
  {
    title: "MSFT Order Follow-up",
    body: "Limit buy is still in range before open. Kai recommends keeping the order active.",
    tag: "Keep",
    tagClass: styles.digestKeep,
    time: "29m ago",
    dotClass: styles.noticeGreen,
  },
];

const KAI_APP_URL = "https://apps.apple.com/au/app/hushh-personal-agent-kai/id6757718917";

const committeeWorkflowCards = [
  {
    title: "Fundamental Agent",
    body: "Analyzes filings and financial statements to validate business quality and long-term durability.",
    iconClass: styles.iconGreen,
  },
  {
    title: "Sentiment Agent",
    body: "Tracks news flow and market narrative changes to identify momentum and short-term catalysts.",
    iconClass: styles.iconOrange,
  },
  {
    title: "Valuation Agent",
    body: "Runs deterministic math on valuation and risk so recommendations stay grounded in quant evidence.",
    iconClass: styles.iconBlue,
  },
];

const committeeFlowSteps = ["Analyze", "Debate", "Reconcile", "Decide"];

const trustArtifacts = [
  "Sources and filing snippets",
  "Math-backed evidence",
  "Debate digest with dissent",
  "Persona-fit reliability signal",
];

const riskPersonaCards = [
  {
    title: "Zen",
    subtitle: "Risk-Averse",
    body: "Prioritizes capital preservation, quality balance sheets, and lower volatility paths.",
  },
  {
    title: "Balanced",
    subtitle: "Moderate Risk",
    body: "Targets measured growth with practical guardrails and controlled downside exposure.",
  },
  {
    title: "Alpha",
    subtitle: "Risk-Neutral",
    body: "Pursues higher return potential while accepting wider drawdown and volatility ranges.",
  },
];

const targetAudiences = [
  "Everyday Investor: understandable why behind every recommendation.",
  "Advisor / RIA: explainable artifacts for clients and compliance workflows.",
  "Advanced Retail: deeper signal intelligence with explicit risk guardrails.",
];

const v1Scope = [
  "Share-to-Kai from Safari or news to Decision Card",
  "Buy/Hold/Reduce with confidence and specialist insights",
  "Debate digest, source references, and evidence math",
  "Alpha Digest for watchlist and holdings updates",
  "Read-only portfolio integration with guardrails",
];

const v11Scope = [
  "Model portfolio hooks for Black-Litterman and MVO workflows",
  "Compliance notes with exportable artifacts",
  "Scenario analysis for earnings shocks, rates, and volatility",
];

const investorJourneyStages = [
  {
    tag: "Input",
    title: "Signal Intake",
    bullets: [
      "Capture ticker context from Safari, news, or watchlist.",
      "Retrieve filings, market narrative, and valuation baselines.",
    ],
  },
  {
    tag: "Reasoning",
    title: "Committee Debate",
    bullets: [
      "Fundamental, Sentiment, and Valuation agents challenge each other.",
      "Conflicts are reconciled and residual dissent is retained.",
    ],
  },
  {
    tag: "Output",
    title: "Decision Card",
    bullets: [
      "Buy, Hold, or Reduce with confidence and rationale.",
      "Math traces, sources, and persona fit are attached by default.",
    ],
  },
  {
    tag: "Action",
    title: "Investor Next Step",
    bullets: [
      "Take a clearer next action aligned with your risk profile.",
      "Monitor changes through Alpha Digest and focused notifications.",
    ],
  },
];

const appShowcasePhones = [
 
  // {
  //   key: "center",
  //   src: "/Images/kai/center.png",
  //   alt: "Kai mobile app center screen",
  //   width: 342,
  //   height: 734,
  // },
  {
    key: "left",
    src: "/Images/kai/facing_left.png",
    alt: "Kai mobile app screen facing left",
    width: 342,
    height: 734,
  },
  {
    key: "right",
    src: "/Images/kai/facing_right.png",
    alt: "Kai mobile app screen facing right",
    width: 342,
    height: 734,
  },
];

const HushhKai = () => {
  const [alphaView, setAlphaView] = useState("preMarket");
  const isPreMarketView = alphaView === "preMarket";
  const alphaItems = isPreMarketView ? preMarketDigestItems : notificationItems;
  const shouldReduceMotion = useReducedMotion();

  const revealProps = (delay = 0, amount = 0.3, y = 28) => ({
    initial: shouldReduceMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y, scale: 0.98 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    transition: shouldReduceMotion
      ? { duration: 0.01, delay: 0 }
      : { duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] },
    viewport: { once: false, amount, margin: "0px 0px -8% 0px" },
  });

  const phoneReveal = (delay = 0, rotate = 0) => ({
    initial: shouldReduceMotion
      ? { opacity: 1, rotate: 0, y: 0, scale: 1 }
      : { opacity: 0, rotate, y: 32, scale: 0.94 },
    whileInView: { opacity: 1, rotate: 0, y: 0, scale: 1 },
    transition: shouldReduceMotion
      ? { duration: 0.01, delay: 0 }
      : { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
    viewport: { once: false, amount: 0.35, margin: "0px 0px -8% 0px" },
  });

  const heroReveal = (delay = 0, y = 20) => ({
    initial: shouldReduceMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: shouldReduceMotion
      ? { duration: 0.01, delay: 0 }
      : { duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <>
    <main className={styles.page}>
      <motion.section className={styles.heroStage} {...heroReveal(0, 26)}>
        <div className={styles.heroBackdrop} aria-hidden="true">
          <span className={styles.backdropGlow} />
          <span className={styles.backdropGlowSecondary} />
          <span className={styles.backdropGrid} />
          <span className={styles.backdropOrbit} />
        </div>

        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <motion.div className={styles.heroBadge} {...heroReveal(0.04, 14)}>
              <span className={styles.heroBadgeLogo} aria-hidden="true">
                KAI
              </span>
              Introducing your new financial copilot powered by
              <a href="https://hushhtech.com" target="_blank" rel="noopener noreferrer" className={styles.heroBadgeLink}>
                Hushh Tech
              </a>
            </motion.div>

            <motion.h1
              className={styles.heroTitle}
              {...heroReveal(0.1, 20)}
            >
              Your Personal Agent
              <br />
              for Market Confidence
            </motion.h1>

            <motion.p
              className={styles.heroSubtitle}
              {...heroReveal(0.16, 18)}
            >
              Personal Agent Kai helps you cut through noise and make clear, confident decisions with calm, private guidance.
            </motion.p>

            <motion.div
              className={styles.heroHighlights}
              {...heroReveal(0.22, 16)}
            >
              <span>Calm confidence</span>
              <span>Private advantage</span>
              <span>Everyday edge</span>
            </motion.div>

            <motion.div
              className={styles.heroActions}
              {...heroReveal(0.28, 14)}
            >
              <Link
                href="https://apps.apple.com/au/app/hushh-personal-agent-kai/id6757718917"
                className={styles.ctaPrimary}
              >
                Start with Kai
              </Link>
              <Link href="#kai-analysis" className={styles.ctaSecondary}>
                See the analysis
              </Link>
            </motion.div>

            <motion.div
              className={styles.heroStats}
              {...heroReveal(0.34, 12)}
            >
              <div>
                <p className={styles.heroStatValue}>3</p>
                <p className={styles.heroStatLabel}>Specialist agents</p>
              </div>
              <div>
                <p className={styles.heroStatValue}>87%</p>
                <p className={styles.heroStatLabel}>Avg. confidence</p>
              </div>
              <div>
                <p className={styles.heroStatValue}>24/7</p>
                <p className={styles.heroStatLabel}>Live monitoring</p>
              </div>
            </motion.div>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.heroProductStack}>
              <motion.div
                className={styles.desktopFrame}
                {...heroReveal(0.18, 22)}
              >
                <div className={styles.desktopTopBar}>
                  <span className={styles.desktopDot} />
                  <span className={styles.desktopDot} />
                  <span className={styles.desktopDot} />
                </div>
                <div className={styles.desktopBody}>
                  <div className={styles.desktopHeader}>
                    <div>
                      <p className={styles.desktopTitle}>Kai Market Pulse</p>
                      <p className={styles.desktopSubtitle}>Consensus dashboard</p>
                    </div>
                    <span className={styles.desktopChip}>Live</span>
                  </div>
                  <div className={styles.desktopCard}>
                    <div className={styles.desktopCardHeader}>
                      <span className={styles.desktopStock}>Apple - AAPL</span>
                      <span className={styles.desktopScore}>87%</span>
                    </div>
                    <p className={styles.desktopCardText}>Confidence score based on 3-agent consensus.</p>
                  </div>
                  <div className={styles.desktopSignals}>
                    <div>
                      <p className={styles.signalLabel}>Trend</p>
                      <p className={styles.signalValue}>Neutral</p>
                    </div>
                    <div>
                      <p className={styles.signalLabel}>Risk</p>
                      <p className={styles.signalValue}>Low</p>
                    </div>
                    <div>
                      <p className={styles.signalLabel}>Entry</p>
                      <p className={styles.signalValue}>Good</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className={styles.heroInsightPanel}
                {...heroReveal(0.28, 18)}
              >
                <p className={styles.heroInsightTitle}>Calm Guidance</p>
                <p className={styles.heroInsightBody}>
                  Personal Agent Kai brings clarity to every market decision while keeping control in your hands.
                </p>
                <div className={styles.heroInsightTags}>
                  <span>Clarity</span>
                  <span>Private</span>
                  <span>Everyday</span>
                </div>
              </motion.div>

              <motion.div className={styles.heroSignalGrid} {...heroReveal(0.34, 14)}>
                {[
                  { label: "Attention", value: "Aligned" },
                  { label: "Tradeoffs", value: "Clear" },
                  { label: "Next step", value: "Ready" },
                ].map((item, index) => (
                  <motion.div key={item.label} className={styles.heroSignalCard} {...heroReveal(0.38 + index * 0.04, 10)}>
                    <p className={styles.heroSignalLabel}>{item.label}</p>
                    <p className={styles.heroSignalValue}>{item.value}</p>
                  </motion.div>
                ))}
              </motion.div>

              <span className={styles.floatingOrb} aria-hidden="true" />
              <span className={styles.floatingOrbAlt} aria-hidden="true" />
              <span className={styles.marketPulse} aria-hidden="true" />
            </div>
          </div>
        </div>

        <div className={styles.scrollIndicator}>
          <span className={styles.scrollDot} aria-hidden="true" />
          Scroll to explore the committee view
        </div>
      </motion.section>

      <div className={styles.shell}>
        <div className={styles.mobileFrame}>
          <motion.section id="kai-analysis" className={styles.section} {...revealProps(0.04, 0.3, 24)}>
            <h2 className={styles.sectionTitle}>
              A Committee Decision on
              <br />
              Every Stock.
            </h2>

            <div className={styles.cardWrap}>
              <motion.article className={styles.card} {...revealProps(0.08, 0.35, 18)}>
                <header className={styles.stockHead}>
                  <div className={styles.stockInfo}>
                    <span className={styles.appleIcon}>
                      <FaApple aria-hidden />
                    </span>
                    <div>
                      <h3 className={styles.stockName}>Apple Inc.</h3>
                      <p className={styles.stockTicker}>AAPL</p>
                    </div>
                  </div>

                  <span className={styles.buyChip}>Buy</span>
                </header>

                <div className={styles.scoreArea}>
                  <p className={styles.score}>
                    87<span className={styles.scorePercent}>%</span>
                  </p>
                  <p className={styles.scoreLabel}>Confidence Score</p>
                  <p className={styles.scoreMeta}>Consensus reached by 3 specialist AI agents</p>
                </div>

                <hr className={styles.divider} />

                <div className={styles.signals}>
                  {signals.map((signal, index) => {
                    const Icon = signal.icon;
                    return (
                      <motion.div key={signal.title} className={styles.row} {...revealProps(index * 0.05, 0.28, 12)}>
                        <div className={styles.rowLeft}>
                          <span className={styles.rowIcon}>
                            <Icon className={signal.iconClass} aria-hidden />
                          </span>
                          <div>
                            <h3 className={styles.rowTitle}>{signal.title}</h3>
                            <p className={styles.rowText}>{signal.subtitle}</p>
                          </div>
                        </div>
                        <span className={`${styles.tag} ${signal.tagClass}`}>{signal.value}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.article>
            </div>
          </motion.section>

          <motion.section className={styles.splitSection} {...revealProps(0.06, 0.28, 26)}>
            <div className={styles.splitCopy}>
              <p className={styles.splitEyebrow}>The Process</p>
              <h2 className={styles.splitTitle}>Markets move fast. Personal Agent Kai keeps you grounded.</h2>
              <p className={styles.splitBody}>
                Too much information creates hesitation. Kai simplifies what to focus on so you can stay aligned with
                your goals and move with confidence.
              </p>
              <ul className={styles.splitList}>
                <li>Spot what deserves your attention today.</li>
                <li>Understand the tradeoffs before you act.</li>
                <li>Choose your next step with greater confidence.</li>
              </ul>
            </div>
            <div className={styles.splitVisual}>
              <motion.div
                className={styles.splitPhoneFrame}
                {...phoneReveal(0.12, -8)}
              >
                <Image
                  src="/Images/kai/screen_1_high_level.png"
                  alt="Kai process high-level flow mobile screen"
                  width={1400}
                  height={2537}
                  className={styles.phoneImage}
                />
              </motion.div>
            </div>
          </motion.section>

          {/* <div className={styles.connector}>
            <span className={styles.connectorLine} aria-hidden="true" />
            <span className={styles.connectorArrow} aria-hidden="true">
              ?
            </span>
          </div> */}

          <motion.section className={`${styles.splitSection} ${styles.splitReverse}`} {...revealProps(0.08, 0.28, 26)}>
            <div className={styles.splitCopy}>
              <p className={styles.splitEyebrow}>Clear Decision</p>
              <h2 className={styles.splitTitle}>Less noise. Better choices.</h2>
              <p className={styles.splitBody}>
                Unclear next steps slow decisions. Kai gives private guidance so you can act with calm confidence and
                stay focused on what matters most.
              </p>
              <ul className={styles.splitList}>
                <li>Guidance that feels personal, practical, and trustworthy.</li>
                <li>Designed to empower your judgment, not replace it.</li>
                <li>Focused on confidence and control in every decision.</li>
              </ul>
            </div>
            <div className={styles.splitVisual}>
              <motion.div
                className={styles.splitPhoneFrame}
                {...phoneReveal(0.12, 8)}
              >
                <Image
                  src="/Images/kai/screen_2_stock_analysis.png"
                  alt="Kai detailed stock analysis mobile screen"
                  width={1536}
                  height={2752}
                  className={styles.phoneImage}
                />
              </motion.div>
            </div>
          </motion.section>

          <motion.section className={styles.section} {...revealProps(0.1, 0.3, 24)}>
            <h2 className={styles.sectionTitle}>
              Transparency built into
              <br />
              every card.
            </h2>

            <div className={styles.transparencyList}>
              {transparencyCards.map((item, index) => (
                <motion.article key={item.title} className={styles.transparencyItem} {...revealProps(index * 0.05, 0.22, 14)}>
                  <span className={styles.stepBubble}>{index + 1}</span>
                  <div>
                    <h3 className={styles.transparencyTitle}>{item.title}</h3>
                    <p className={styles.transparencyText}>{item.body}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.section>

          <motion.section className={styles.section} {...revealProps(0.12, 0.3, 24)}>
            <h2 className={styles.sectionTitle}>Start your day with Alpha</h2>
            <p className={styles.sectionSub}>A clean, curated digest of opportunities every morning.</p>

            <div className={styles.alphaPanel}>
              <div className={styles.toggle} role="tablist" aria-label="Alpha views">
                <button
                  type="button"
                  role="tab"
                  aria-selected={isPreMarketView}
                  className={`${styles.toggleItem} ${isPreMarketView ? styles.toggleActive : ""}`}
                  onClick={() => setAlphaView("preMarket")}
                >
                  Pre-market
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={!isPreMarketView}
                  className={`${styles.toggleItem} ${!isPreMarketView ? styles.toggleActive : ""}`}
                  onClick={() => setAlphaView("notifications")}
                >
                  Notifications
                </button>
              </div>

              <div className={styles.digestHead}>
                <div className={styles.digestHeadLeft}>
                  {isPreMarketView ? <FaSun className={styles.iconOrange} aria-hidden /> : <FaBell className={styles.iconBlue} aria-hidden />}
                  <span>{isPreMarketView ? "Morning Digest" : "Kai Notifications"}</span>
                </div>
                <span className={styles.digestTime}>{isPreMarketView ? "08:00 AM" : "Live feed"}</span>
              </div>

              <div className={styles.digestRows}>
                {alphaItems.map((item, index) => (
                  <motion.div key={item.title} className={styles.digestRow} {...revealProps(index * 0.04, 0.2, 12)}>
                    <div className={styles.digestMain}>
                      <div className={styles.digestTitleRow}>
                        {!isPreMarketView ? <span className={`${styles.noticeDot} ${item.dotClass}`} aria-hidden /> : null}
                        <h3 className={styles.digestTitle}>{item.title}</h3>
                      </div>
                      <p className={styles.digestBody}>{item.body}</p>
                      {!isPreMarketView ? <p className={styles.notificationTime}>{item.time}</p> : null}
                    </div>
                    <span className={`${styles.digestTag} ${item.tagClass}`}>{item.tag}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          <motion.section className={`${styles.section} ${styles.planSection}`} {...revealProps(0.16, 0.28, 24)}>
            <p className={styles.planEyebrow}>Committee Workflow</p>
            <h2 className={styles.sectionTitle}>How Kai reaches a recommendation investors can audit.</h2>
            <div className={styles.planCards}>
              {committeeWorkflowCards.map((item, index) => (
                <motion.article key={item.title} className={styles.planCard} {...revealProps(index * 0.05, 0.22, 18)}>
                  <div className={styles.planCardTitleRow}>
                    <FaChartLine className={item.iconClass} aria-hidden />
                    <h3 className={styles.planCardTitle}>{item.title}</h3>
                  </div>
                  <p className={styles.planCardBody}>{item.body}</p>
                </motion.article>
              ))}
            </div>

            <div className={styles.planFlowRail}>
              {committeeFlowSteps.map((step, index) => (
                <motion.div key={step} className={styles.planFlowItem} {...revealProps(index * 0.04, 0.25, 14)}>
                  <span>{step}</span>
                  {index < committeeFlowSteps.length - 1 ? <i aria-hidden /> : null}
                </motion.div>
              ))}
            </div>

            <div className={styles.planTrustBox}>
              <p className={styles.planTrustTitle}>Decision Card trust artifacts</p>
              <ul className={styles.planTrustList}>
                {trustArtifacts.map((item, index) => (
                  <motion.li key={item} {...revealProps(index * 0.04, 0.2, 12)}>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.section>

          <motion.section className={`${styles.section} ${styles.planSection}`} {...revealProps(0.18, 0.28, 24)}>
            <p className={styles.planEyebrow}>Personas and Scope</p>
            <h2 className={styles.sectionTitle}>Who Kai serves and  what Kai provides in V1</h2>

            <div className={styles.planPersonaGrid}>
              {riskPersonaCards.map((item, index) => (
                <motion.article key={item.title} className={styles.planPersonaCard} {...revealProps(index * 0.05, 0.22, 18)}>
                  <div className={styles.planPersonaHead}>
                    <h3>{item.title}</h3>
                    <span>{item.subtitle}</span>
                  </div>
                  <p>{item.body}</p>
                </motion.article>
              ))}
            </div>

            <div className={styles.planAudienceList}>
              {targetAudiences.map((item, index) => (
                <motion.div key={item} className={styles.planAudienceItem} {...revealProps(index * 0.05, 0.2, 14)}>
                  <FaShieldAlt className={styles.iconBlue} aria-hidden />
                  <p>{item}</p>
                </motion.div>
              ))}
            </div>

            <div className={styles.planScopeGrid}>
              <motion.article className={styles.planScopeCard} {...revealProps(0.08, 0.2, 14)}>
                <h3>V1 Consumer</h3>
                <ul>
                  {v1Scope.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </motion.article>
              <motion.article className={styles.planScopeCard} {...revealProps(0.14, 0.2, 14)}>
                <h3>V1.1 Pro / Advisor</h3>
                <ul>
                  {v11Scope.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </motion.article>
            </div>

            <motion.div className={styles.planActions} {...revealProps(0.16, 0.2, 12)}>
              <Link href={KAI_APP_URL} className={styles.ctaPrimary} data-cta="kai-plan-start">
                Start with Kai
              </Link>
              <Link href="/contact-us" className={styles.ctaSecondary} data-cta="kai-plan-talk-team">
                Talk to Team
              </Link>
            </motion.div>
          </motion.section>

          <motion.section
            className={`${styles.section} ${styles.planSection} ${styles.flowFullWidthSection}`}
            {...revealProps(0.2, 0.28, 24)}
          >
            <p className={styles.planEyebrow}>End-to-End Flow</p>
            <h2 className={styles.sectionTitle}>From market signal to explainable investor action.</h2>
            <p className={styles.planLead}>
              This is the exact user journey Kai follows to turn raw market noise into a committee-grade decision.
            </p>
            <div className={styles.journeyDiagram}>
              {investorJourneyStages.map((stage, index) => (
                <React.Fragment key={stage.title}>
                  <motion.article className={styles.journeyStageCard} {...revealProps(index * 0.06, 0.2, 16)}>
                    <span className={styles.journeyStageTag}>{stage.tag}</span>
                    <h3>{stage.title}</h3>
                    <ul>
                      {stage.bullets.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </motion.article>
                  {index < investorJourneyStages.length - 1 ? (
                    <motion.span className={styles.journeyConnector} aria-hidden {...revealProps(index * 0.06 + 0.03, 0.2, 10)}>
                      <FaArrowRight />
                    </motion.span>
                  ) : null}
                </React.Fragment>
              ))}
            </div>
          </motion.section>

          <motion.section className={`${styles.section} ${styles.planSection}`} {...revealProps(0.22, 0.3, 24)}>
            <p className={styles.planEyebrow}>Product Experience</p>
            <h2 className={styles.sectionTitle}>What investors actually see inside Kai.</h2>
            <p className={styles.planLead}>
              Two connected screens define the product experience: structured reasoning first, then an evidence-backed
              decision card.
            </p>
            <div className={styles.triPhoneShowcase}>
              <div className={styles.triPhoneRow}>
                {appShowcasePhones.map((phone, index) => (
                  <motion.figure
                    key={phone.key}
                    className={`${styles.triPhoneItem} ${styles[`triPhone${phone.key}`]}`}
                    {...phoneReveal(index * 0.08, index === 0 ? -6 : 6)}
                  >
                    <Image
                      src={phone.src}
                      alt={phone.alt}
                      width={phone.width}
                      height={phone.height}
                      sizes="(max-width: 767px) 28vw, (max-width: 1199px) 180px, 280px"
                      quality={60}
                      className={styles.triPhoneImage}
                    />
                  </motion.figure>
                ))}
              </div>
            </div>
          </motion.section>

          <motion.section className={styles.finalSection} {...revealProps(0.14, 0.3, 22)}>
            <h2 className={styles.finalTitle}>Ready for Clarity?</h2>
            <p className={styles.finalText}>Join investors who have replaced noise with structure.</p>
            <Link href="https://hushh-webapp-1006304528804.us-central1.run.app/" className={styles.finalButton}>
              Get Started
            </Link>
            <p className={styles.footer}>
              <Link href="/legal/privacypolicy" aria-label="Read privacy policy">
                Privacy
              </Link>{" \u00B7 "}
              <Link href="/legal/termsofuse" aria-label="Read terms of use">
                Terms
              </Link>{" \u00B7 "}
              <Link href="/consent-ai-protocol" aria-label="Read security and consent protocol">
                Security
              </Link>{" \u00B7 "}
              <Link href="/contact-us" aria-label="Get support">
                Support
              </Link>
              <br />
              {"\u00A9 2026 Kai"}
            </p>
          </motion.section>
        </div>
      </div>
    </main>
    {/* <FooterComponent /> */}
    </>
  );
};

export default HushhKai;

