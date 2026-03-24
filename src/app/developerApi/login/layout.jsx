import { buildPageMetadata } from "../../../lib/seo/pageMetadata";

export const metadata = buildPageMetadata({
  title: "Developer Sign In",
  description: "Authenticate to access the Hushh developer workspace and onboarding tools.",
  pathname: "/developers/login",
  noIndex: true,
});

export default function DeveloperLoginLayout({ children }) {
  return children;
}
