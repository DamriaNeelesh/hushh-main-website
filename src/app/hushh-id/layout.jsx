import { buildPageMetadata } from "../../lib/seo/pageMetadata";

export const metadata = buildPageMetadata({
  title: "Hushh ID",
  description: "Shared Hushh ID profile surface.",
  pathname: "/hushh-id",
  noIndex: true,
});

export default function HushhIdLayout({ children }) {
  return children;
}
