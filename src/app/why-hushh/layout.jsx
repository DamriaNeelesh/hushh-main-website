import { buildPageMetadata } from "../../lib/seo/pageMetadata";

export const metadata = buildPageMetadata({
  title: "Why Hushh",
  description:
    "Understand why Hushh is building the internet's trust layer around consent, privacy, and aligned data relationships.",
  pathname: "/why-hushh",
  keywords: [
    "Why Hushh",
    "Consent-first AI",
    "Internet trust layer",
    "Privacy-first data platform",
  ],
});

export default function WhyHushhLayout({ children }) {
  return children;
}
