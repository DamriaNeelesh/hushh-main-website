import React from "react";
import ContentWrapper from "src/app/_components/layout/ContentWrapper";
import HushhKai from "../../clientside/HushhKai";

export const metadata = {
  title: "Kai | Hushh",
  description:
    "Kai is your explainable investing copilot. Structured multi-agent analysis with transparent confidence scoring.",
  alternates: {
    canonical: "https://www.hushh.ai/products/kai",
  },
  openGraph: {
    title: "Kai | Hushh",
    description:
      "Decide like a committee, carry it in your pocket. Explore Kai's transparent confidence-first stock decisions.",
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
