import { buildPageMetadata } from "../../lib/seo/pageMetadata";

export const metadata = buildPageMetadata({
  title: "Hushh Public Profile",
  description: "Shared Hushh public profile surface.",
  pathname: "/u",
  noIndex: true,
});

export default function PublicProfileLayout({ children }) {
  return children;
}
