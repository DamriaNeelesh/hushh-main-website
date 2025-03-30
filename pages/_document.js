import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Hushh - Your Data, Your Business" />
        <meta name="keywords" content="Hushh, AI, Automation, OpenAI, GPT-4" />
        <meta name="author" content="Hushh Labs" />
        <meta property="og:title" content="Hushh - Your Data, Your Business" />
        <meta property="og:description" content="Hushh - Your Data, Your Business" />
        <meta property="og:image" content="/public/blogs/blog2o.png" />
        <meta property="og:url" content="https://www.hushh.ai/" />
        <meta name="twitter:card" content="summary_large_image" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Hushh",
              url: "https://www.hushh.ai/",
              logo: "https://www.hushh.ai/logo.png",
            }),
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
