import React from "react";
import ContentWrapper from "src/app/_components/layout/ContentWrapper";
import HushhKai from "../../clientside/HushhKai";

export const metadata = {
  title: "Kai | Explainable Investing Copilot",
  description:
    "Kai brings an investment committee in silicon to every iPhone. Three specialist agents debate every stock or ETF decision with sources, math, and transparent confidence.",
  keywords: [
    "Kai",
    "Explainable investing",
    "AI investing copilot",
    "Multi-agent debate",
    "Decision card",
    "Risk personas",
    "Investment transparency",
  ],
  alternates: {
    canonical: "https://www.hushh.ai/products/kai",
  },
  openGraph: {
    title: "Kai | Your Explainable Investing Copilot",
    description:
      "Decide like a committee, carry it in your pocket. Kai delivers Buy, Hold, or Reduce decisions with evidence, debate traces, and risk-persona alignment.",
    url: "https://www.hushh.ai/products/kai",
    type: "website",
  },
};

const KaiPage = () => {
  return (
    <ContentWrapper>
      <HushhKai />
    </ContentWrapper>
  );
};

export default KaiPage;
