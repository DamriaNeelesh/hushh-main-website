const { getRouteManifest } = require("./route-manifest.cjs");

const BASE_URL = process.env.BASE_URL || "http://localhost:3001";

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function normalizeUrlForComparison(value) {
  const url = new URL(value);
  if (url.pathname === "/") {
    url.pathname = "/";
  } else {
    url.pathname = url.pathname.replace(/\/+$/, "");
  }
  url.hash = "";
  return url.toString();
}

async function fetchHtml(pathname) {
  const url = new URL(pathname, BASE_URL).toString();
  const response = await fetch(url, {
    redirect: "follow",
    headers: { "User-Agent": "hushh-site-seo-audit/1.0" },
  });

  if (!response.ok) {
    throw new Error(`Expected 200 for ${url}, received ${response.status}`);
  }

  return { url, body: await response.text() };
}

function getRepresentativeRoutes() {
  const manifest = getRouteManifest();
  const routes = new Set([
    "/",
    "/products/kai",
    "/privacy",
    "/terms",
    "/developers",
  ]);

  manifest.forEach((entry) => {
    if (entry.route === "/blogs/[slug]" || entry.route === "/categories/[slug]" || entry.route === "/developers/[slug]") {
      entry.sampleRoutes.forEach((route) => routes.add(route));
    }
  });

  return [...routes];
}

async function main() {
  const routes = getRepresentativeRoutes();
  const results = [];

  for (const route of routes) {
    const { url, body } = await fetchHtml(route);
    const canonicalUrl = new URL(route, "https://www.hushh.ai").toString();
    const canonicalMatch = body.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);

    assert(canonicalMatch, `${url} must expose a canonical link.`);
    assert(
      normalizeUrlForComparison(canonicalMatch[1]) === normalizeUrlForComparison(canonicalUrl),
      `${url} must expose canonical ${canonicalUrl}.`,
    );
    assert(body.includes('property="og:title"') || body.includes("property='og:title'"), `${url} must expose og:title.`);
    assert(body.includes('property="og:description"') || body.includes("property='og:description'"), `${url} must expose og:description.`);
    assert(body.includes('name="twitter:card"') || body.includes("name='twitter:card'"), `${url} must expose twitter:card.`);

    results.push({ route, canonical: canonicalUrl });
  }

  console.table(results);
  console.log(`SEO audit passed for ${BASE_URL}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
