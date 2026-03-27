import "./globals.css";
import "./_styles/syntax-highlight.css";
import "./_styles/blog.css";
import { Geist, Geist_Mono, Inter, Playfair_Display } from "next/font/google";
import { Providers } from "./provider";
import ResponsiveSizeProvider from "./context/responsive";
import { AuthProvider } from "./context/AuthContext";
import { BannerHeightProvider } from "./context/BannerHeightContext";
import GlobalSiteChrome from "./_components/features/GlobalSiteChrome";
import { siteMetadata } from "./sitemetadata";

export const revalidate = 3600;

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfairItalic = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-italic",
  display: "swap",
  style: ["italic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  applicationName: "Hushh",
  title: {
    default: "Hushh | Your Data. Your Business.",
    template: "%s | Hushh",
  },
  description: siteMetadata.description,
  keywords: siteMetadata.keywords,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Hushh | Your Data. Your Business.",
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: "Hushh",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: siteMetadata.socialBanner,
        alt: "Hushh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hushh | Your Data. Your Business.",
    description: siteMetadata.description,
    images: [siteMetadata.socialBanner],
    creator: "@hushh_ai",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} ${inter.variable} ${playfairItalic.variable}`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={geist.className}>
        <ResponsiveSizeProvider>
          <AuthProvider>
            <BannerHeightProvider>
              <Providers>
                <GlobalSiteChrome>{children}</GlobalSiteChrome>
              </Providers>
            </BannerHeightProvider>
          </AuthProvider>
        </ResponsiveSizeProvider>
      </body>
    </html>
  );
}
