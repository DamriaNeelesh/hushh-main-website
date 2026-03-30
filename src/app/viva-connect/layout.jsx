import { buildPageMetadata } from "../../lib/seo/pageMetadata";

export const metadata = buildPageMetadata({
  title: "Viva Connect",
  description:
    "Explore Viva Connect, Hushh's product showcase for connected privacy-first consumer experiences.",
  pathname: "/viva-connect",
  keywords: [
    "Viva Connect",
    "Hushh product showcase",
    "Connected privacy-first experiences",
  ],
});

export default function VivaConnectLayout({ children }) {
  return children;
}
