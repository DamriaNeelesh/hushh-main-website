"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaApple, FaBell, FaChartLine, FaLock, FaShieldAlt, FaSun } from "react-icons/fa";
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

const HushhKai = () => {
  const [alphaView, setAlphaView] = useState("preMarket");
  const isPreMarketView = alphaView === "preMarket";
  const alphaItems = isPreMarketView ? preMarketDigestItems : notificationItems;
  const revealProps = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: "easeOut" },
    viewport: { once: true, amount: 0.3 },
  };
  const phoneReveal = {
    initial: { opacity: 0, rotate: -10, y: 28, scale: 0.96 },
    whileInView: { opacity: 1, rotate: 0, y: 0, scale: 1 },
    transition: { duration: 0.8, ease: "easeOut" },
    viewport: { once: true, amount: 0.45 },
  };

  return (
    <>
    <main className={styles.page}>
      <section className={styles.heroStage}>
        <div className={styles.heroBackdrop} aria-hidden="true">
          <span className={styles.backdropGlow} />
          <span className={styles.backdropGlowSecondary} />
          <span className={styles.backdropGrid} />
          <span className={styles.backdropOrbit} />
        </div>

        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <div className={styles.heroBadge}>
              <span className={styles.heroBadgeLogo} aria-hidden="true">
                Kai
              </span>
              Introducing your new financial copilot
            </div>

            <motion.h1
              className={styles.heroTitle}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              Your Personal Agent
              <br />
              for Market Confidence
            </motion.h1>

            <motion.p
              className={styles.heroSubtitle}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            >
              Personal Agent Kai helps you cut through noise and make clear, confident decisions with calm, private guidance.
            </motion.p>

            <motion.div
              className={styles.heroHighlights}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            >
              <span>Calm confidence</span>
              <span>Private advantage</span>
              <span>Everyday edge</span>
            </motion.div>

            <motion.div
              className={styles.heroActions}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
            >
              <Link
                href="https://hushh-webapp-1006304528804.us-central1.run.app/"
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
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
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
                      <span className={styles.desktopStock}>Apple · AAPL</span>
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
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.35 }}
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

              <div className={styles.heroSignalGrid}>
                {[
                  { label: "Attention", value: "Aligned" },
                  { label: "Tradeoffs", value: "Clear" },
                  { label: "Next step", value: "Ready" },
                ].map((item) => (
                  <div key={item.label} className={styles.heroSignalCard}>
                    <p className={styles.heroSignalLabel}>{item.label}</p>
                    <p className={styles.heroSignalValue}>{item.value}</p>
                  </div>
                ))}
              </div>

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
      </section>

      <div className={styles.shell}>
        <div className={styles.mobileFrame}>
          <motion.section id="kai-analysis" className={styles.section} {...revealProps}>
            <h2 className={styles.sectionTitle}>
              A Committee Decision on
              <br />
              Every Stock.
            </h2>

            <div className={styles.cardWrap}>
              <article className={styles.card}>
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
                  {signals.map((signal) => {
                    const Icon = signal.icon;
                    return (
                      <div key={signal.title} className={styles.row}>
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
                      </div>
                    );
                  })}
                </div>
              </article>
            </div>
          </motion.section>

          <motion.section className={styles.splitSection} {...revealProps}>
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
                {...phoneReveal}
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

          <motion.section className={`${styles.splitSection} ${styles.splitReverse}`} {...revealProps}>
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
                {...phoneReveal}
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

          <motion.section className={styles.section} {...revealProps}>
            <h2 className={styles.sectionTitle}>
              Transparency built into
              <br />
              every card.
            </h2>

            <div className={styles.transparencyList}>
              {transparencyCards.map((item, index) => (
                <article key={item.title} className={styles.transparencyItem}>
                  <span className={styles.stepBubble}>{index + 1}</span>
                  <div>
                    <h3 className={styles.transparencyTitle}>{item.title}</h3>
                    <p className={styles.transparencyText}>{item.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </motion.section>

          <motion.section className={styles.section} {...revealProps}>
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
                {alphaItems.map((item) => (
                  <div key={item.title} className={styles.digestRow}>
                    <div className={styles.digestMain}>
                      <div className={styles.digestTitleRow}>
                        {!isPreMarketView ? <span className={`${styles.noticeDot} ${item.dotClass}`} aria-hidden /> : null}
                        <h3 className={styles.digestTitle}>{item.title}</h3>
                      </div>
                      <p className={styles.digestBody}>{item.body}</p>
                      {!isPreMarketView ? <p className={styles.notificationTime}>{item.time}</p> : null}
                    </div>
                    <span className={`${styles.digestTag} ${item.tagClass}`}>{item.tag}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          <motion.section className={styles.finalSection} {...revealProps}>
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
    <FooterComponent />
    </>
  );
};

export default HushhKai;
