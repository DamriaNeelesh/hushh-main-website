import FoundationPage from "@/features/foundation/FoundationPage";
import { buildPageMetadata } from "../../lib/seo/pageMetadata";

export const metadata = buildPageMetadata({
  title: "Foundation | The Hushh Handbook",
  description:
    "Read the Hushh Foundation handbook: philosophy, ownership, consent, brand, and operating principles in a navigable web edition.",
  pathname: "/foundation",
  keywords: [
    "Hushh Foundation",
    "Hushh handbook",
    "privacy",
    "consent",
    "brand system",
    "operating principles",
  ],
  openGraph: {
    siteName: "Hushh",
  },
});

export default function FoundationRoute() {
  return <FoundationPage />;
}
