import { buildPageMetadata } from "../../lib/seo/pageMetadata";

export const metadata = buildPageMetadata({
  title: "Plaid Balance Portal",
  description: "Internal Plaid balance portal for validating connectivity and balance workflows.",
  pathname: "/plaid-balance",
  noIndex: true,
});

export default function PlaidBalanceLayout({ children }) {
  return children;
}
