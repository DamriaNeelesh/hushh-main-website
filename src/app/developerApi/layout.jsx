export const metadata = {
  title: "Hushh | Developers Redirect",
  description: "Legacy developer routes redirect to the canonical /developers surface.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://www.hushh.ai/developers",
  },
  openGraph: {
    title: "Hushh | Developers Redirect",
    description: "Legacy developer routes redirect to the canonical /developers surface.",
    url: "https://www.hushh.ai/developers",
  },
};

export default function LegacyDeveloperLayout({ children }) {
  return children;
}
