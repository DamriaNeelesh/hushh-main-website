import "./globals.css";
import "./_styles/syntax-highlight.css";
import { Providers } from "./provider";
import ResponsiveSizeProvider from "./context/responsive";
import { AuthProvider } from "./context/AuthContext";
import { BannerHeightProvider } from "./context/BannerHeightContext";
import GlobalSiteChrome from "./_components/features/GlobalSiteChrome";
import { siteMetadata } from "./sitemetadata";

export const revalidate = 3600;

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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
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
