import FoundationPriyaUxArtifact from "@/features/foundation/FoundationPriyaUxArtifact";
import { buildPageMetadata } from "../../../../lib/seo/pageMetadata";

export const metadata = buildPageMetadata({
  title: "Priya UX | Foundation Library | Hushh",
  description: "Rendered Foundation library artifact for the Priya UX flow.",
  pathname: "/foundation/library/priya-ux",
  noIndex: true,
  openGraph: {
    siteName: "Hushh",
  },
});

export default function FoundationPriyaUxRoute() {
  return <FoundationPriyaUxArtifact />;
}
