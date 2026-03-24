import { buildPageMetadata } from "../../lib/seo/pageMetadata";

export const metadata = buildPageMetadata({
  title: "Solutions",
  description: "Explore Hushh enterprise and platform solutions built on privacy-first infrastructure.",
  pathname: "/solutions",
});

export default function SolutionsLayout({ children }) {
  return children;
}
