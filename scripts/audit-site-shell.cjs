const { getRouteManifest } = require("./route-manifest.cjs");

const BASE_URL = process.env.BASE_URL || "http://localhost:3001";

const REDIRECTS = [
  { from: "/legal/privacypolicy", to: "/privacy" },
  { from: "/legal/termsofuse", to: "/terms" },
];

const MARKERS = [
  "data-site-header",
  "data-site-footer",
  "data-site-shell-spacer",
];

function countOccurrences(body, needle) {
  const matches = body.match(new RegExp(needle, "g"));
  return matches ? matches.length : 0;
}

async function fetchHtml(pathname) {
  const url = new URL(pathname, BASE_URL).toString();
  const response = await fetch(url, {
    redirect: "follow",
    headers: { "User-Agent": "hushh-site-shell-audit/1.0" },
  });

  if (!response.ok) {
    throw new Error(`Expected 200 for ${url}, received ${response.status}`);
  }

  return { url, body: await response.text() };
}

async function fetchRedirect(pathname) {
  const url = new URL(pathname, BASE_URL).toString();
  const response = await fetch(url, {
    redirect: "manual",
    headers: { "User-Agent": "hushh-site-shell-audit/1.0" },
  });

  return { url, response };
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function main() {
  const results = [];
  const routeManifest = getRouteManifest();
  const routesToAudit = [];
  const unresolvedDynamicRoutes = [];

  for (const entry of routeManifest) {
    if (entry.kind === "standard" || entry.kind === "hiddenChrome") {
      routesToAudit.push({
        path: entry.route,
        hiddenChrome: entry.kind === "hiddenChrome",
        file: entry.file,
        pattern: entry.route,
      });
      continue;
    }

    if (entry.kind === "dynamic" && entry.sampleRoutes.length > 0) {
      entry.sampleRoutes.forEach((sampleRoute) => {
        routesToAudit.push({
          path: sampleRoute,
          hiddenChrome: false,
          file: entry.file,
          pattern: entry.route,
        });
      });
      continue;
    }

    if (entry.kind === "dynamic") {
      unresolvedDynamicRoutes.push(entry.route);
    }
  }

  for (const route of routesToAudit) {
    const { url, body } = await fetchHtml(route.path);

    if (route.hiddenChrome) {
      for (const marker of MARKERS) {
        assert(
          countOccurrences(body, marker) === 0,
          `${url} should not render ${marker} on hidden-chrome routes.`,
        );
      }
    } else {
      for (const marker of MARKERS) {
        assert(
          countOccurrences(body, marker) === 1,
          `${url} should render exactly one ${marker}.`,
        );
      }

      assert(
        body.includes('href="/privacy"') || body.includes("href=\"/privacy\""),
        `${url} must expose the privacy policy link.`,
      );
      assert(
        body.includes('href="/terms"') || body.includes("href=\"/terms\""),
        `${url} must expose the terms link.`,
      );
    }

    if (route.path === "/") {
      assert(!body.includes("BEGIN: Footer"), "Home route should not ship the legacy footer block.");
      assert(!body.includes("BEGIN: Floating Navigation"), "Home route should not ship the legacy floating nav block.");
    }

    if (route.path === "/developers") {
      assert(
        body.includes('href="/developers/agent-kai"') ||
          body.includes("href=\"/developers/agent-kai\""),
        `${url} must expose the Agent Kai API track.`,
      );
      assert(
        body.includes('href="/developers/agentic-apis"') ||
          body.includes("href=\"/developers/agentic-apis\""),
        `${url} must expose the Agentic APIs track.`,
      );
      assert(
        body.includes('href="/developers/on-boarding"') ||
          body.includes("href=\"/developers/on-boarding\"") ||
          body.includes('href="/developers/login"') ||
          body.includes("href=\"/developers/login\""),
        `${url} must expose the canonical developer setup flow.`,
      );
    }

    results.push({
      route: route.path,
      pattern: route.pattern,
      hiddenChrome: route.hiddenChrome ? "yes" : "no",
      file: route.file,
    });
  }

  for (const redirectRule of REDIRECTS) {
    const { url, response } = await fetchRedirect(redirectRule.from);
    assert(
      response.status === 307 || response.status === 308,
      `${url} should redirect, received ${response.status}.`,
    );
    assert(
      response.headers.get("location") === redirectRule.to,
      `${url} should redirect to ${redirectRule.to}, received ${response.headers.get("location")}.`,
    );
  }

  console.table(results);
  console.log(
    `Audited ${routesToAudit.length} route entries (${routeManifest.filter((entry) => entry.kind === "dynamic").length} dynamic patterns, ${unresolvedDynamicRoutes.length} unresolved dynamic patterns).`,
  );
  if (unresolvedDynamicRoutes.length > 0) {
    console.log(`Dynamic patterns without safe fixtures: ${unresolvedDynamicRoutes.join(", ")}`);
  }
  console.log(`Site shell audit passed for ${BASE_URL}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
