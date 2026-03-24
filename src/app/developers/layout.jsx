import ClientSideLayout from "./clientSideLayout"

export const metadata = {
  title: "Hushh | Developers",
  description:
    "Build consent-first integrations with Hushh developers tools, dynamic scopes, and live API references.",
  keywords:
    "Developers, Hushh, Consent-driven APIs, Dynamic scopes, PKM integrations, API reference",
  alternates: {
    canonical: "https://www.hushh.ai/developers",
  },
  openGraph: {
    title: "Hushh | Developers",
    description:
      "Build consent-first integrations with Hushh developers tools, dynamic scopes, and live API references.",
    url: "https://www.hushh.ai/developers",
  },
};

export default function RootLayout({
  children
}) {
  return (
    <ClientSideLayout >
      {children}
    </ClientSideLayout>
  )
}
