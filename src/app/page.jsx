import HushhHomepage from "./_components/home/HushhHomepage";

export const metadata = {
  title: "Hushh | Your Personal Intelligence Agent",
  description:
    "Your personal intelligence agent. Anchored to you — your phone number, email, and legal name. Nothing leaves your device without your say-so.",
  alternates: {
    canonical: "https://www.hushh.ai/",
  },
  openGraph: {
    title: "Hushh | Your Personal Intelligence Agent",
    description:
      "Your personal intelligence agent. Anchored to you — your phone number, email, and legal name. Nothing leaves your device without your say-so.",
    url: "https://www.hushh.ai/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hushh | Your Personal Intelligence Agent",
    description:
      "Your personal intelligence agent. Anchored to you — your phone number, email, and legal name. Nothing leaves your device without your say-so.",
  },
};
export default function Home() {
  return <HushhHomepage />;
}
