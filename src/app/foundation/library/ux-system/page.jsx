import FoundationUxSystemArtifact from "@/features/foundation/FoundationUxSystemArtifact";
import { buildPageMetadata } from "../../../../lib/seo/pageMetadata";

export const metadata = buildPageMetadata({
  title: "The UX System | Foundation Library | Hushh",
  description: "Rendered Foundation library artifact for the Hushh UX system.",
  pathname: "/foundation/library/ux-system",
  noIndex: true,
  openGraph: {
    siteName: "Hushh",
  },
});

export default function FoundationUxSystemRoute() {
  return <FoundationUxSystemArtifact />;
}
