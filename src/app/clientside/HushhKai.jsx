"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaApple, FaBell, FaChartLine, FaLock, FaShieldAlt, FaSun } from "react-icons/fa";
import styles from "./KaiPage.module.css";

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

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <div className={styles.mobileFrame}>
          <section className={styles.hero}>
            <div className={styles.logoWrap}>
              <span className={styles.logoText}>Kai</span>
            </div>

            <h1 className={styles.heroTitle}>
              Your Explainable
              <br />
              Investing Copilot
            </h1>

            <p className={styles.subtitle}>Decide like a committee, carry it in your pocket.</p>

            <Link href="https://hushh-webapp-1006304528804.us-central1.run.app/" className={styles.cta}>
              Start with Kai
            </Link>
          </section>

          <section id="kai-analysis" className={styles.section}>
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
          </section>

          <section className={styles.appSection}>
            <h2 className={styles.sectionTitle}>The Process</h2>
            <p className={styles.sectionSub}>Structured internal debate, zero bias.</p>
            <div className={styles.screenFrame}>
              <Image
                src="/Images/kai/screen_1_high_level.png"
                alt="Kai process high-level flow mobile screen"
                width={1400}
                height={2537}
                className={styles.screenImage}
              />
            </div>
          </section>

          {/* <div className={styles.connector}>
            <span className={styles.connectorLine} aria-hidden="true" />
            <span className={styles.connectorArrow} aria-hidden="true">
              ?
            </span>
          </div> */}

          <section className={styles.appSection}>
            <h2 className={styles.sectionTitle}>
              From Complexity to a
              <br />
              Clear Decision.
            </h2>
            <p className={styles.sectionSub}>Every recommendation is backed by raw data and verifiable citations.</p>
            <div className={styles.screenFrame}>
              <Image
                src="/Images/kai/screen_2_stock_analysis.png"
                alt="Kai detailed stock analysis mobile screen"
                width={1536}
                height={2752}
                className={styles.screenImage}
              />
            </div>
          </section>

          <section className={styles.section}>
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
          </section>

          <section className={styles.section}>
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
          </section>

          <section className={styles.finalSection}>
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
          </section>
        </div>
      </div>
    </main>
  );
};

export default HushhKai;

