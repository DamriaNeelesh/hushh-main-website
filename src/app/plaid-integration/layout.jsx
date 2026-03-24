import { buildPageMetadata } from "../../lib/seo/pageMetadata";

export const metadata = buildPageMetadata({
  title: "Plaid Integration",
  description: "Operational Plaid integration workspace for Hushh financial data workflows.",
  pathname: "/plaid-integration",
  noIndex: true,
});

export default function PlaidIntegrationLayout({ children }) {
  return children;
}
