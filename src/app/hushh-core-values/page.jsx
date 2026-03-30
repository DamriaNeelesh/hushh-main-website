import React from "react";
import CoreValues from "../clientside/hushhCoreValues"
import ContentWrapper from "../_components/layout/ContentWrapper";

export const metadata = {
  title: "Hushh | Core Values",
  description:
    "Explore Hushh's core values, leadership principles, and code of conduct. Learn how we prioritize data privacy, integrity, and innovation.",
  keywords:
    "Hushh, Core Values, Leadership Principles, Code of Conduct, Data Privacy, Integrity, Innovation, Ethical Practices, Business Partnerships",
  canonical: "https://www.hushh.ai/hushh-core-values",
  alternates: {
    canonical: "https://www.hushh.ai/hushh-core-values",
  },
  openGraph: {
    title: "Hushh | Core Values",
    description:
      "Explore Hushh's core values, leadership principles, and code of conduct. Learn how we prioritize data privacy, integrity, and innovation.",
    url: "https://www.hushh.ai/hushh-core-values",
    // images: [
    //   {
    //     url: "/path/to/core-values-og-image.jpg",
    //     width: 800,
    //     height: 600,
    //     alt: "Hushh Core Values Image",
    //   },
    // ],
  },
};

const HushhCoreValues = () => {
  return (
    <>
      <ContentWrapper includeHeaderSpacing={true}>
        <CoreValues/>
      </ContentWrapper>
    </>
  );
};

export default HushhCoreValues;
