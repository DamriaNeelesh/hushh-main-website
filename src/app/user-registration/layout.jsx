import { buildPageMetadata } from "../../lib/seo/pageMetadata";

export const metadata = buildPageMetadata({
  title: "User Registration",
  description: "Complete your Hushh registration and consent-aware profile setup.",
  pathname: "/user-registration",
  noIndex: true,
});

export default function UserRegistrationLayout({ children }) {
  return children;
}
