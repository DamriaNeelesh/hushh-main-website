import Head from "next/head";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Hushh - Your Data, Your Business</title>
        <meta name="description" content="Hushh - A platform for secure and seamless data management." />
        <meta name="keywords" content="Hushh, UX, Data Privacy, Accessibility, Cloud Computing" />
        <meta property="og:title" content="Hushh - Your Data, Your Business" />
        <meta property="og:description" content="A platform for secure and seamless data management." />
        <meta property="og:image" content="/public/og-image.png" />
        <meta property="og:url" content="https://hushh.ai" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      {children}
    </>
  );
}
