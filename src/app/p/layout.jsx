import { buildPageMetadata } from "../../lib/seo/pageMetadata";

export const metadata = buildPageMetadata({
  title: "Hushh Share Link",
  description: "Shared Hushh deep link.",
  pathname: "/p",
  noIndex: true,
});

export default function ShareLinkLayout({ children }) {
  return children;
}
