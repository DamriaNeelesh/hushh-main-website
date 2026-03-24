import React from "react";
import { buildPageMetadata } from "../../lib/seo/pageMetadata";

export const metadata = buildPageMetadata({
  title: "Social Profile Setup",
  description: "Set up your Hushh social profile to personalize your experience.",
  pathname: "/social-onboarding",
  noIndex: true,
});

export default function SocialOnboardingLayout({ children }) {
  return <div className="min-h-screen bg-white">{children}</div>;
}
