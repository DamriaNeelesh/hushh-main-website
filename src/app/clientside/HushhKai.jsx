"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { FaArrowRight, FaBell, FaSun } from "react-icons/fa";
import styles from "./KaiPage.module.css";

const PortfolioBreakdownIcon = ({ className }) =>
<svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M4.5 18.5H19.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    <path d="M7.5 18.5V11.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    <path d="M12 18.5V6.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    <path d="M16.5 18.5V9.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>;


const SignalAnalysisIcon = ({ className }) =>
<svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4.8L15.3 6.7V10.4L12 12.3L8.7 10.4V6.7L12 4.8Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M7.1 13.2L10.4 15.1V18.8L7.1 20.7L3.8 18.8V15.1L7.1 13.2Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M16.9 13.2L20.2 15.1V18.8L16.9 20.7L13.6 18.8V15.1L16.9 13.2Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8.6 8.7H5.3V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M15.4 8.7H18.7V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 12.3V15.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>;


const ConvictionScoreIcon = ({ className }) =>
<svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path
    d="M12 3.8L18.3 6.2V11.6C18.3 15.4 15.8 18.6 12 19.8C8.2 18.6 5.7 15.4 5.7 11.6V6.2L12 3.8Z"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinejoin="round" />
  
    <path d="M9.3 11.9L11.1 13.7L14.8 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;


const FundamentalSignalIcon = ({ className }) =>
<svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="4.6" y="4.8" width="14.8" height="14.4" rx="2.4" stroke="currentColor" strokeWidth="1.55" />
    <path d="M8.4 9.1H15.6" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" />
    <path d="M8.4 13.1H13.7" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" />
    <circle cx="16.2" cy="14.2" r="1.35" stroke="currentColor" strokeWidth="1.55" />
  </svg>;


const SentimentSignalIcon = ({ className }) =>
<svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="7.2" stroke="currentColor" strokeWidth="1.55" />
    <path d="M9.2 10.5V10.55" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" />
    <path d="M14.8 10.5V10.55" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" />
    <path d="M9 14.2C9.9 15.35 11 16 12 16C13 16 14.1 15.35 15 14.2" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" />
  </svg>;


const TechnicalSignalIcon = ({ className }) =>
<svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M5 17.2H19" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" />
    <path d="M6.3 14.6L10.1 10.9L12.8 12.9L17.7 8.5" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;


const SignalDepthIcon = ({ className }) =>
<svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 5.1L18.1 8.7L12 12.3L5.9 8.7L12 5.1Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M5.9 12.9L12 16.5L18.1 12.9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;


const StructuredReasoningIcon = ({ className }) =>
<svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="4.9" y="5.3" width="5.1" height="5.1" rx="1.2" stroke="currentColor" strokeWidth="1.5" />
    <rect x="14" y="5.3" width="5.1" height="5.1" rx="1.2" stroke="currentColor" strokeWidth="1.5" />
    <rect x="9.45" y="13.6" width="5.1" height="5.1" rx="1.2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 7.85H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 10.45V13.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>;


const ContinuousMonitoringIcon = ({ className }) =>
<svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M14.2 6.2A5.8 5.8 0 0 1 18.6 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M18.6 12L16.3 10.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9.8 17.8A5.8 5.8 0 0 1 5.4 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M5.4 12L7.7 13.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;


const insideKaiCards = [
{
  title: "Portfolio Breakdown",
  body: "Clear allocation, sector exposure, and performance overview in one view.",
  icon: PortfolioBreakdownIcon
},
{
  title: "Signal Analysis",
  body: "Fundamental, sentiment, and technical signals structured clearly.",
  icon: SignalAnalysisIcon
},
{
  title: "Conviction Score",
  body: "A transparent score indicating strength of opportunity or downside risk.",
  icon: ConvictionScoreIcon
}];


const committeeInsightPillars = [
{
  title: "Signal Depth",
  body: "Kai analyzes fundamental performance, market sentiment, and price trends together to form a complete view.",
  icon: SignalDepthIcon
},
{
  title: "Structured Reasoning",
  body: "Every insight is backed by a transparent chain of signals so you can understand why a decision was made.",
  icon: StructuredReasoningIcon
},
{
  title: "Continuous Monitoring",
  body: "Signals update automatically as markets move, helping you stay ahead of new risks and opportunities.",
  icon: ContinuousMonitoringIcon
}];


const confidenceSignalRows = [
{
  title: "Fundamental Analyst",
  value: "+12% Trend",
  tone: "positive",
  icon: FundamentalSignalIcon
},
{
  title: "Sentiment Engine",
  value: "+8% Trend",
  tone: "positive",
  icon: SentimentSignalIcon
},
{
  title: "Technical Chartist",
  value: "Neutral",
  tone: "neutral",
  icon: TechnicalSignalIcon
}];


const transparencyCards = [
{
  title: "Clear Outcome",
  body: "Instant buy/hold/sell recommendation with a confidence percentage."
},
{
  title: "Specialist Insights",
  body: "See exactly why the AI made the decision. Earnings, momentum, and risk all surfaced."
},
{
  title: "Debate Digest",
  body: "Read the internal monologue of the AI committee as it debates pros and cons."
}];


const preMarketDigestItems = [
{
  title: "NVDA Report",
  body: "Earnings beat estimates by 12%.",
  tag: "Hold",
  tagClass: styles.digestHold
},
{
  title: "Kai Pick: MSFT",
  body: "Strong fundamentals.",
  tag: "Buy",
  tagClass: styles.digestBuy
}];


const notificationItems = [
{
  title: "AAPL Sentiment Shift",
  body: "Macro pressure eased pre-open. Committee confidence rose from 82% to 86%.",
  tag: "Recheck",
  tagClass: styles.digestReview,
  time: "5m ago",
  dotClass: styles.noticeBlue
},
{
  title: "TSLA Volatility Alert",
  body: "Risk agent flagged unusually wide swings. Kai suggests tighter position sizing.",
  tag: "Risk",
  tagClass: styles.digestRisk,
  time: "17m ago",
  dotClass: styles.noticeAmber
},
{
  title: "MSFT Order Follow-up",
  body: "Limit buy is still in range before open. Kai recommends keeping the order active.",
  tag: "Keep",
  tagClass: styles.digestKeep,
  time: "29m ago",
  dotClass: styles.noticeGreen
}];


const KAI_APP_URL = "https://apps.apple.com/au/app/hushh-personal-agent-kai/id6757718917";

const _committeeWorkflowCards = [
{
  title: "Fundamental Agent",
  body: "Analyzes filings and financial statements to validate business quality and long-term durability.",
  iconClass: styles.iconGreen
},
{
  title: "Sentiment Agent",
  body: "Tracks news flow and market narrative changes to identify momentum and short-term catalysts.",
  iconClass: styles.iconOrange
},
{
  title: "Valuation Agent",
  body: "Runs deterministic math on valuation and risk so recommendations stay grounded in quant evidence.",
  iconClass: styles.iconBlue
}];


const _committeeFlowSteps = ["Analyze", "Debate", "Reconcile", "Decide"];

const _trustArtifacts = [
"Sources and filing snippets",
"Math-backed evidence",
"Debate digest with dissent",
"Persona-fit reliability signal"];


const _riskPersonaCards = [
{
  title: "Zen",
  subtitle: "Risk-Averse",
  body: "Prioritizes capital preservation, quality balance sheets, and lower volatility paths."
},
{
  title: "Balanced",
  subtitle: "Moderate Risk",
  body: "Targets measured growth with practical guardrails and controlled downside exposure."
},
{
  title: "Alpha",
  subtitle: "Risk-Neutral",
  body: "Pursues higher return potential while accepting wider drawdown and volatility ranges."
}];


const _targetAudiences = [
"Everyday Investor: understandable why behind every recommendation.",
"Advisor / RIA: explainable artifacts for clients and compliance workflows.",
"Advanced Retail: deeper signal intelligence with explicit risk guardrails."];


const _v1Scope = [
"Share-to-Kai from Safari or news to Decision Card",
"Buy/Hold/Reduce with confidence and specialist insights",
"Debate digest, source references, and evidence math",
"Alpha Digest for watchlist and holdings updates",
"Read-only portfolio integration with guardrails"];


const _v11Scope = [
"Model portfolio hooks for Black-Litterman and MVO workflows",
"Compliance notes with exportable artifacts",
"Scenario analysis for earnings shocks, rates, and volatility"];


const investorJourneyStages = [
{
  tag: "Input",
  title: "Signal Intake",
  bullets: [
  "Capture ticker context from Safari, news, or watchlist.",
  "Retrieve filings, market narrative, and valuation baselines."]

},
{
  tag: "Reasoning",
  title: "Committee Debate",
  bullets: [
  "Fundamental, Sentiment, and Valuation agents challenge each other.",
  "Conflicts are reconciled and residual dissent is retained."]

},
{
  tag: "Output",
  title: "Decision Card",
  bullets: [
  "Buy, Hold, or Reduce with confidence and rationale.",
  "Math traces, sources, and persona fit are attached by default."]

},
{
  tag: "Action",
  title: "Investor Next Step",
  bullets: [
  "Take a clearer next action aligned with your risk profile.",
  "Monitor changes through Alpha Digest and focused notifications."]

}];


const appShowcasePhones = [
{
  key: "right",
  src: "/Images/kai/facing_right.png",
  alt: "Kai mobile app screen facing right",
  width: 342,
  height: 734
},
{
  key: "left",
  src: "/Images/kai/facing_left.png",
  alt: "Kai mobile app screen facing left",
  width: 342,
  height: 734
}];


const HushhKai = () => {
  const [alphaView, setAlphaView] = useState("preMarket");
  const isPreMarketView = alphaView === "preMarket";
  const alphaItems = isPreMarketView ? preMarketDigestItems : notificationItems;
  const shouldReduceMotion = useReducedMotion();

  const revealProps = (delay = 0, amount = 0.3, y = 28) => ({
    initial: shouldReduceMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y, scale: 0.98 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    transition: shouldReduceMotion ?
    { duration: 0.01, delay: 0 } :
    { duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] },
    viewport: { once: false, amount, margin: "0px 0px -8% 0px" }
  });

  const phoneReveal = (delay = 0, rotate = 0) => ({
    initial: shouldReduceMotion ?
    { opacity: 1, rotate: 0, y: 0, scale: 1 } :
    { opacity: 0, rotate, y: 32, scale: 0.94 },
    whileInView: { opacity: 1, rotate: 0, y: 0, scale: 1 },
    transition: shouldReduceMotion ?
    { duration: 0.01, delay: 0 } :
    { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
    viewport: { once: false, amount: 0.35, margin: "0px 0px -8% 0px" }
  });

  const heroReveal = (delay = 0, y = 20) => ({
    initial: shouldReduceMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: shouldReduceMotion ?
    { duration: 0.01, delay: 0 } :
    { duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }
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
              <span className={styles.heroBadgeText}>
                Introducing your new financial copilot powered by
              </span>
              <a href="https://hushhtech.com" target="_blank" rel="noopener noreferrer" className={styles.heroBadgeLink}>
                Hushh Tech
              </a>
            </motion.div>

            <motion.h1
                className={styles.heroTitle}
                {...heroReveal(0.1, 20)}>
                
              Your Explainable
              <br />
              Investing Copilot
            </motion.h1>

            <motion.p
                className={styles.heroSubtitle}
                {...heroReveal(0.16, 18)}>
                
              Everything you need to understand the market without the noise.
            </motion.p>

            <motion.div
                className={styles.heroHighlights}
                {...heroReveal(0.22, 16)}>
                
              <span>Calm confidence</span>
              <span>Private advantage</span>
              <span>Everyday edge</span>
            </motion.div>

            <motion.div
                className={styles.heroActions}
                {...heroReveal(0.28, 14)}>
                
              <Link
                  href="https://apps.apple.com/au/app/hushh-personal-agent-kai/id6757718917"
                  className={styles.ctaPrimary}>
                  
                Start with Kai
              </Link>
              <Link href="#kai-analysis" className={styles.ctaSecondary}>
                Watch Demo
              </Link>
            </motion.div>

            {/* <motion.div
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
                </motion.div> */}
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.heroTeslaStage}>
              <span className={styles.heroTeslaGlow} aria-hidden="true" />
              <motion.div className={styles.heroTeslaScreen} {...heroReveal(0.18, 22)}>
                <Image
                    src="/Images/kai/tesla_analysis_animation_transparent.png"
                    alt="Floating Tesla Analysis Screen"
                    width={1216}
                    height={914}
                    className={styles.heroTeslaImage}
                    priority />
                  
              </motion.div>
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
          <motion.section id="kai-analysis" className={`${styles.section} ${styles.kaiInsideSection}`} {...revealProps(0.04, 0.3, 24)}>
            <div className={styles.kaiInsideDesktopView}>
              <h2 className={styles.kaiInsideTitle}>What You See Inside Kai</h2>
              <div className={styles.kaiInsideGrid}>
                {insideKaiCards.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.article key={item.title} className={styles.kaiInsideCard} {...revealProps(index * 0.05, 0.22, 14)}>
                      <span className={styles.kaiInsideIconWrap}>
                        <Icon className={styles.kaiInsideIcon} />
                      </span>
                      <h3 className={styles.kaiInsideCardTitle}>{item.title}</h3>
                      <p className={styles.kaiInsideCardBody}>{item.body}</p>
                    </motion.article>);

                  })}
              </div>
            </div>
          </motion.section>

          <motion.section className={`${styles.splitSection} ${styles.desktopInsightSection}`} {...revealProps(0.06, 0.28, 26)}>
            <div className={styles.desktopInsightOnly}>
              <motion.article className={styles.desktopConfidenceCard} {...revealProps(0.12, 0.22, 18)}>
                <span className={styles.desktopConfidenceGlow} aria-hidden />
                <div className={styles.desktopConfidenceInner}>
                  <header className={styles.desktopConfidenceHeader}>
                    <div className={styles.desktopConfidenceMeta}>
                      <h3>Apple Inc.</h3>
                      <p>AAPL - Technology</p>
                    </div>
                    <div className={styles.desktopConfidenceScore}>
                      <strong>87%</strong>
                      <span>Confidence Score</span>
                    </div>
                  </header>

                  <div className={styles.desktopConfidenceRows}>
                    {confidenceSignalRows.map((item, index) =>
                      <motion.div key={item.title} className={styles.desktopConfidenceRow} {...revealProps(index * 0.04, 0.2, 12)}>
                        <div className={styles.desktopConfidenceRowTitle}>
                          <span className={styles.desktopConfidenceSignalIcon} aria-hidden>
                            <item.icon />
                          </span>
                          <p>{item.title}</p>
                        </div>
                        <span
                          className={`${styles.desktopConfidenceBadge} ${
                          item.tone === "neutral" ? styles.desktopConfidenceBadgeNeutral : styles.desktopConfidenceBadgePositive}`
                          }>
                          
                          {item.value}
                        </span>
                      </motion.div>
                      )}
                  </div>

                  <footer className={styles.desktopConfidenceFooter}>
                    "Strong institutional accumulation paired with robust quarterly guidance signals a high-conviction entry point."
                  </footer>
                </div>
              </motion.article>

              <div className={styles.desktopInsightCopy}>
                <h2 className={styles.desktopInsightTitle}>How Kai Generates Insight</h2>
                <p className={styles.desktopInsightLead}>
                  Every investment is evaluated across multiple signals before a conclusion is made.
                </p>
                <div className={styles.desktopInsightPillars}>
                  {committeeInsightPillars.map((item, index) =>
                    <motion.article key={item.title} className={styles.desktopInsightPillar} {...revealProps(index * 0.05, 0.24, 14)}>
                      <span className={styles.desktopInsightPillarIcon} aria-hidden>
                        <item.icon />
                      </span>
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.body}</p>
                      </div>
                    </motion.article>
                    )}
                </div>
              </div>
            </div>

            <div className={styles.mobileInsightFallback}>
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
                <motion.div className={styles.splitPhoneFrame} {...phoneReveal(0.12, -8)}>
                  <Image
                      src="/Images/kai/screen_1_high_level.png"
                      alt="Kai process high-level flow mobile screen"
                      width={1400}
                      height={2537}
                      className={styles.phoneImage} />
                    
                </motion.div>
              </div>
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
                  {...phoneReveal(0.12, 8)}>
                  
                <Image
                    src="/Images/kai/screen_2_stock_analysis.png"
                    alt="Kai detailed stock analysis mobile screen"
                    width={1536}
                    height={2752}
                    className={styles.phoneImage} />
                  
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
              {transparencyCards.map((item, index) =>
                <motion.article key={item.title} className={styles.transparencyItem} {...revealProps(index * 0.05, 0.22, 14)}>
                  <span className={styles.stepBubble}>{index + 1}</span>
                  <div>
                    <h3 className={styles.transparencyTitle}>{item.title}</h3>
                    <p className={styles.transparencyText}>{item.body}</p>
                  </div>
                </motion.article>
                )}
            </div>
          </motion.section>

          <motion.section className={`${styles.section} ${styles.dailyBriefSection}`} {...revealProps(0.12, 0.3, 24)}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.desktopOnlyText}>Your Daily Market Briefing. Simplified.</span>
              <span className={styles.mobileOnlyText}>Start your day with Alpha</span>
            </h2>
            <p className={styles.sectionSub}>
              <span className={styles.desktopOnlyText}>
                Daily market insights and clear strategies delivered before the market opens.
              </span>
              <span className={styles.mobileOnlyText}>A clean, curated digest of opportunities every morning.</span>
            </p>

            <div className={styles.dailyBriefDesktopGrid}>
              <motion.article className={styles.dailyBriefCard} {...revealProps(0.02, 0.22, 14)}>
                <div className={styles.dailyBriefCardHead}>
                  <span className={styles.dailyBriefTagPrimary}>MORNING DIGEST</span>
                  <span className={styles.dailyBriefDate}>Oct 24, 2023</span>
                </div>
                <div className={styles.dailyBriefContent}>
                  <h3>NVDA Quarterly Outlook</h3>
                  <p>
                    Demand for H100 remains robust. Supply chain constraints easing in Q4. Sentiment remains extremely
                    bullish.
                  </p>
                </div>
                <div className={styles.dailyBriefFooter}>
                  <span className={styles.dailyBriefStrongBuy}>STRONG BUY</span>
                  <button type="button">Read Full Report</button>
                </div>
              </motion.article>

              <motion.article className={`${styles.dailyBriefCard} ${styles.dailyBriefCardDark}`} {...revealProps(0.08, 0.22, 14)}>
                <div className={styles.dailyBriefCardHead}>
                  <span className={styles.dailyBriefTagBlue}>TOP PICK</span>
                  <span className={styles.dailyBriefDateDark}>TODAY</span>
                </div>
                <div className={styles.dailyBriefContent}>
                  <h3>MSFT Momentum Watch</h3>
                  <div className={styles.dailyBriefPriceRow}>
                    <strong>$328.79</strong>
                    <span>+2.4%</span>
                  </div>
                  <p>AI integration within Office 365 is driving higher-than-expected enterprise upgrades.</p>
                </div>
                <button type="button" className={styles.dailyBriefActionDark}>
                  Analyze MSFT
                </button>
              </motion.article>

              <motion.article className={styles.dailyBriefCard} {...revealProps(0.12, 0.22, 14)}>
                <div className={styles.dailyBriefCardHead}>
                  <span className={styles.dailyBriefTagMuted}>PORTFOLIO TACTIC</span>
                  <span className={styles.dailyBriefDate}>ACTIVE</span>
                </div>
                <div className={styles.dailyBriefContent}>
                  <h3>Rates and Cash Positioning</h3>
                  <p>
                    Bond yields are stabilizing. Recommend adjusting cash position to 15% and increasing tech exposure.
                  </p>
                </div>
                <div className={styles.dailyBriefMetric}>
                  <div className={styles.dailyBriefMetricRow}>
                    <span>U.S. 10Y Yield</span>
                    <strong>4.25%</strong>
                  </div>
                  <div className={styles.dailyBriefMetricBar}>
                    <i aria-hidden />
                  </div>
                  <p>
                    Market volatility remains within expected parameters for the current hedge configuration.
                  </p>
                </div>
              </motion.article>
            </div>

            <div className={styles.alphaPanel}>
              <div className={styles.toggle} role="tablist" aria-label="Alpha views">
                <button
                    type="button"
                    role="tab"
                    aria-selected={isPreMarketView}
                    className={`${styles.toggleItem} ${isPreMarketView ? styles.toggleActive : ""}`}
                    onClick={() => setAlphaView("preMarket")}>
                    
                  Pre-market
                </button>
                <button
                    type="button"
                    role="tab"
                    aria-selected={!isPreMarketView}
                    className={`${styles.toggleItem} ${!isPreMarketView ? styles.toggleActive : ""}`}
                    onClick={() => setAlphaView("notifications")}>
                    
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
                {alphaItems.map((item, index) =>
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
                  )}
              </div>
            </div>
          </motion.section>

          {/* <motion.section className={`${styles.section} ${styles.planSection}`} {...revealProps(0.16, 0.28, 24)}>
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
              </motion.section> */

            }

          {/* <motion.section className={`${styles.section} ${styles.planSection}`} {...revealProps(0.18, 0.28, 24)}>
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
              </motion.section> */



            }

          <motion.section
              className={`${styles.section} ${styles.planSection} ${styles.flowFullWidthSection}`}
              {...revealProps(0.2, 0.28, 24)}>
              
            <p className={styles.planEyebrow}>End-to-End Flow</p>
            <h2 className={styles.sectionTitle}>From market signal to explainable investor action.</h2>
            <p className={styles.planLead}>
              This is the exact user journey Kai follows to turn raw market noise into a committee-grade decision.
            </p>
            <div className={styles.journeyDiagram}>
              {investorJourneyStages.map((stage, index) =>
                <React.Fragment key={stage.title}>
                  <motion.article className={styles.journeyStageCard} {...revealProps(index * 0.06, 0.2, 16)}>
                    <span className={styles.journeyStageTag}>{stage.tag}</span>
                    <h3>{stage.title}</h3>
                    <ul>
                      {stage.bullets.map((point) =>
                      <li key={point}>{point}</li>
                      )}
                    </ul>
                  </motion.article>
                  {index < investorJourneyStages.length - 1 ?
                  <motion.span className={styles.journeyConnector} aria-hidden {...revealProps(index * 0.06 + 0.03, 0.2, 10)}>
                      <FaArrowRight />
                    </motion.span> :
                  null}
                </React.Fragment>
                )}
            </div>
          </motion.section>

          <motion.section className={`${styles.section} ${styles.planSection}`} {...revealProps(0.22, 0.3, 24)}>
            <p className={styles.planEyebrow}>Product Experience</p>
            <h2 className={styles.sectionTitle}>Two connected screens define the product experience</h2>
            <p className={styles.planLead}>
              Structured reasoning first, then an evidence-backed
              decision card.
            </p>
            <div className={styles.triPhoneShowcase}>
              <div className={styles.triPhoneRow}>
                {appShowcasePhones.map((phone, index) =>
                  <motion.figure
                    key={phone.key}
                    className={`${styles.triPhoneItem} ${styles[`triPhone${phone.key}`]}`}
                    {...phoneReveal(index * 0.08, index === 0 ? -6 : 6)}>
                    
                    <Image
                      src={phone.src}
                      alt={phone.alt}
                      width={phone.width}
                      height={phone.height}
                      sizes="(max-width: 767px) 28vw, (max-width: 1199px) 180px, 280px"
                      quality={75}
                      className={styles.triPhoneImage} />
                    
                  </motion.figure>
                  )}
              </div>
            </div>
          </motion.section>

          <motion.section className={styles.finalSection} {...revealProps(0.14, 0.3, 22)}>
            <h2 className={styles.finalTitle}>Know Before You Act</h2>
            <p className={styles.finalText}>Start using Kai to understand your portfolio and the market.</p>
            <Link href="https://hushh-webapp-1006304528804.us-central1.run.app/" className={styles.finalButton}>
              Get Started with Kai
            </Link>
            <p className={styles.footer}>
              <Link href="/privacy" aria-label="Read privacy policy">
                Privacy
              </Link>{" \u00B7 "}
              <Link href="/terms" aria-label="Read terms of use">
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
            <p className={styles.paperCredit}>
              AlphaAgents Credit for paper:{" "}
              <a href="https://arxiv.org/pdf/2508.11152v1" target="_blank" rel="noopener noreferrer">
                https://arxiv.org/pdf/2508.11152v1
              </a>
            </p>
          </motion.section>
        </div>
      </div>
    </main>
    </>);

};

export default HushhKai;