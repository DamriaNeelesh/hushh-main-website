import HushhV02Page from "@/features/hushh-v02/HushhV02Page";

export const metadata = {
  title: "Hushh V02 | UAT Search Console",
  description:
    "Consent-first UAT search console powered by Hushh Intelligence and grounded public web context.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function HushhV02Route() {
  return <HushhV02Page />;
}
