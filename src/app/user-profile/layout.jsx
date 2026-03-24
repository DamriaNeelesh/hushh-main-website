import { buildPageMetadata } from "../../lib/seo/pageMetadata";

export const metadata = buildPageMetadata({
  title: "User Profile",
  description: "Manage your Hushh profile information and account settings.",
  pathname: "/user-profile",
  noIndex: true,
});

export default function UserProfileLayout({ children }) {
  return children;
}
