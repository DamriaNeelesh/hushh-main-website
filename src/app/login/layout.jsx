import { buildPageMetadata } from "../../lib/seo/pageMetadata";

export const metadata = buildPageMetadata({
  title: "Sign In",
  description: "Securely sign in to access your Hushh account and consent-first experiences.",
  pathname: "/login",
  noIndex: true,
});

export default function LoginLayout({ children }) {
  return children;
}
