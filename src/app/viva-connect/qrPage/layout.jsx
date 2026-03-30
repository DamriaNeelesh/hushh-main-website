import { buildPageMetadata } from "../../../lib/seo/pageMetadata";

export const metadata = buildPageMetadata({
  title: "Viva Connect QR",
  description: "Utility QR page for Viva Connect.",
  pathname: "/viva-connect/qrPage",
  noIndex: true,
});

export default function VivaConnectQrLayout({ children }) {
  return children;
}
