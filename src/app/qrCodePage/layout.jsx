import { buildPageMetadata } from "../../lib/seo/pageMetadata";

export const metadata = buildPageMetadata({
  title: "Hushh QR Code",
  description: "Utility QR code page for Hushh profile sharing.",
  pathname: "/qrCodePage",
  noIndex: true,
});

export default function QrCodePageLayout({ children }) {
  return children;
}
