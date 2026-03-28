import HomePage from "./_components/home/HomePage";

export const metadata = {
  title: "Hushh | Your Data. Your Business.",
  description:
    "Meet the world's first personal data agent platform built with trust, privacy, and power at the core.",
  alternates: {
    canonical: "https://www.hushh.ai/",
  },
  openGraph: {
    title: "Hushh | Your Data. Your Business.",
    description:
      "Meet the world's first personal data agent platform built with trust, privacy, and power at the core.",
    url: "https://www.hushh.ai/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hushh | Your Data. Your Business.",
    description:
      "Meet the world's first personal data agent platform built with trust, privacy, and power at the core.",
  },
};
export default function Home() {
  return <HomePage />;
}
