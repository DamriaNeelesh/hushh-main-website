import { buildPageMetadata } from "../../lib/seo/pageMetadata";

export const metadata = buildPageMetadata({
  title: "Hushh Voice",
  description:
    "Access Hushh Voice, the consent-first AI copilot experience.",
  pathname: "/voice",
  keywords: [
    "Hushh Voice",
    "AI copilot",
    "Private AI",
    "Consent-first AI",
  ],
  noIndex: true,
});

export default function VoiceLayout({ children }) {
  return children;
}
