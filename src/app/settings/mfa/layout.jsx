import { buildPageMetadata } from "../../../lib/seo/pageMetadata";

export const metadata = buildPageMetadata({
  title: "MFA Settings",
  description: "Manage multi-factor authentication and account security settings.",
  pathname: "/settings/mfa",
  noIndex: true,
});

export default function MfaSettingsLayout({ children }) {
  return children;
}
