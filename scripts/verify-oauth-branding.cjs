const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

function readFile(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), "utf8");
}

function assertContains(haystack, needle, message) {
  if (!haystack.includes(needle)) {
    throw new Error(`${message} Missing: ${needle}`);
  }
}

function assertNotContains(haystack, needle, message) {
  if (haystack.includes(needle)) {
    throw new Error(`${message} Unexpected: ${needle}`);
  }
}

try {
  const kaiPage = readFile("src/app/products/kai/page.jsx");
  const siteFooter = readFile("src/app/_components/shell/SiteFooter.jsx");
  const privacyPage = readFile("src/app/privacy/page.jsx");
  const termsPage = readFile("src/app/terms/page.jsx");
  const legalShell = readFile("src/app/_components/legal/LegalPageShell.jsx");
  const header = readFile("src/app/_components/header.jsx");
  const serverSitemap = readFile("src/app/server-sitemap.xml/route.js");
  const sitemap = readFile("public/sitemap-0.xml");

  assertContains(
    kaiPage,
    "buildPageMetadata({",
    "Kai page should use the shared metadata helper.",
  );
  assertContains(
    kaiPage,
    'pathname: "/products/kai"',
    "Kai page metadata must resolve to the public branding URL.",
  );

  assertContains(
    privacyPage,
    "https://www.hushh.ai/privacy",
    "Privacy policy metadata must use the public canonical URL.",
  );
  assertContains(
    termsPage,
    "https://www.hushh.ai/terms",
    "Terms metadata must use the public canonical URL.",
  );
  assertNotContains(
    termsPage,
    "https://hushh.ai/terms",
    "Terms metadata must not point at the broken legacy canonical path.",
  );

  assertContains(
    header,
    'name: "Terms of Use"',
    "Desktop/mobile navigation must expose Terms of Use.",
  );
  assertContains(
    header,
    'href: "/terms"',
    "Desktop/mobile navigation must route Terms of Use correctly.",
  );
  assertContains(
    header,
    "aria-expanded={activeDropdown === 'whyHushh'}",
    "Desktop nav should expose accessible Why Hushh state for legal links.",
  );

  assertContains(
    siteFooter,
    'title: "Legal"',
    "Shared footer must expose a visible legal section.",
  );
  assertContains(
    siteFooter,
    'href="/privacy"',
    "Shared footer must link to the privacy policy.",
  );
  assertContains(
    siteFooter,
    'href="/terms"',
    "Shared footer must link to the terms of use page.",
  );

  assertContains(
    legalShell,
    'href: "/products/kai"',
    "Legal pages should provide a clear return path to Agent Kai.",
  );
  assertContains(
    legalShell,
    'href: "/contact-us"',
    "Legal pages should provide a clear return path to contact information.",
  );

  assertContains(
    serverSitemap,
    "'/products/kai'",
    "Server sitemap must include the Kai product page.",
  );

  for (const url of [
    "https://www.hushh.ai/products/kai",
    "https://www.hushh.ai/privacy",
    "https://www.hushh.ai/terms",
  ]) {
    assertContains(
      sitemap,
      url,
      "Generated sitemap must include all branding review URLs.",
    );
  }

  console.log("OAuth branding verification passed.");
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
