const fs = require("fs");
const path = require("path");
const AxeBuilder = require("@axe-core/playwright").default;
const { chromium } = require("@playwright/test");
const { getRouteManifest, HIDDEN_CHROME_ROUTES } = require("./route-manifest.cjs");

const ROOT = process.cwd();
const ARTIFACT_ROOT = path.join(ROOT, ".artifacts", "visual");
const BLOG_CONTENT_DIR = path.join(ROOT, "content");
const DEFAULT_BASE_URL = process.env.BASE_URL || "http://127.0.0.1:3001";
const VIEWPORTS = [
  { key: "desktop", width: 1440, height: 1024 },
  { key: "tablet", width: 834, height: 1194 },
  { key: "mobile", width: 390, height: 844 },
];
const MAX_ROUTE_COUNT = Number(process.env.VISUAL_AUDIT_MAX_ROUTES || "250");

function sanitizeRoute(route) {
  if (!route || route === "/") {
    return "home";
  }

  return route
    .replace(/^\/+/, "")
    .replace(/[/?#&=]+/g, "__")
    .replace(/[^a-zA-Z0-9_-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/__+/g, "__");
}

function normalizeRoute(route) {
  if (!route) {
    return "/";
  }

  const normalized = route.replace(/\/+$/, "");
  return normalized === "" ? "/" : normalized;
}

function getAllBlogRoutes() {
  if (!fs.existsSync(BLOG_CONTENT_DIR)) {
    return [];
  }

  return fs
    .readdirSync(BLOG_CONTENT_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && fs.existsSync(path.join(BLOG_CONTENT_DIR, entry.name, "index.tsx")))
    .map((entry) => `/blogs/${entry.name}`)
    .sort();
}

function getSeedRoutes() {
  const manifest = getRouteManifest();
  const seeds = new Set(["/"]);

  for (const entry of manifest) {
    if (entry.kind === "standard" || entry.kind === "hiddenChrome") {
      seeds.add(entry.route);
      continue;
    }

    for (const sampleRoute of entry.sampleRoutes || []) {
      seeds.add(sampleRoute);
    }
  }

  for (const blogRoute of getAllBlogRoutes()) {
    seeds.add(blogRoute);
  }

  return [...seeds].map(normalizeRoute).sort();
}

function collectSameOriginLinks(hrefs, baseUrl) {
  const routes = new Set();
  const origin = new URL(baseUrl).origin;

  for (const href of hrefs) {
    if (!href || href.startsWith("mailto:") || href.startsWith("tel:")) {
      continue;
    }

    try {
      const url = new URL(href, origin);
      if (url.origin !== origin) {
        continue;
      }

      const normalizedPath = normalizeRoute(url.pathname);
      if (normalizedPath.startsWith("/_next") || normalizedPath.startsWith("/api/")) {
        continue;
      }

      routes.add(normalizedPath);
    } catch (_error) {
      // Ignore invalid URLs collected from malformed hrefs.
    }
  }

  return [...routes];
}

async function autoScroll(page) {
  await page.evaluate(async () => {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const totalHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
    );

    let current = 0;
    while (current + window.innerHeight < totalHeight) {
      current += Math.max(320, Math.floor(window.innerHeight * 0.72));
      window.scrollTo({ top: current, behavior: "instant" });
      await delay(80);
    }

    window.scrollTo({ top: totalHeight, behavior: "instant" });
    await delay(120);
    window.scrollTo({ top: 0, behavior: "instant" });
    await delay(120);
  });
}

async function getOverflowIssues(page) {
  return page.evaluate(() => {
    const issues = [];
    const selector = "body *";
    const nodes = Array.from(document.querySelectorAll(selector));

    for (const node of nodes) {
      if (!(node instanceof HTMLElement)) {
        continue;
      }

      const style = window.getComputedStyle(node);
      const rect = node.getBoundingClientRect();

      if (style.display === "none" || style.visibility === "hidden" || rect.width < 2 || rect.height < 2) {
        continue;
      }

      if (node.scrollWidth > node.clientWidth + 4) {
        if (
          node.matches(".rfm-marquee-container, .rfm-marquee, .rfm-initial-child-container") ||
          (node.tagName.toLowerCase() === "button" && rect.width <= 48) ||
          (style.overflow === "hidden" &&
            style.borderRadius === "9999px" &&
            rect.width <= 96 &&
            (node.innerText || "").trim().length <= 2) ||
          /search\s*⌘?k/i.test(node.innerText || "")
        ) {
          continue;
        }

        issues.push({
          type: "horizontal-overflow",
          tag: node.tagName.toLowerCase(),
          text: node.innerText?.trim().slice(0, 120) || "",
          selector:
            node.id
              ? `#${node.id}`
              : node.className
                ? `.${String(node.className).trim().split(/\s+/).join(".")}`
                : node.tagName.toLowerCase(),
        });
      }

      if (issues.length >= 12) {
        break;
      }
    }

    return issues;
  });
}

async function getDeveloperStickyIssue(page, route, viewport) {
  if (!route.startsWith("/developers/") || viewport.key !== "desktop") {
    return null;
  }

  return page.evaluate(() => {
    const sidebar = document.querySelector(".developer-workspace-rail--left");
    const toc = document.querySelector(".developer-workspace-rail--right");
    const article = document.querySelector(".developer-workspace-main-scroll");

    if (!(sidebar instanceof HTMLElement) || !(toc instanceof HTMLElement) || !(article instanceof HTMLElement)) {
      return { type: "missing-developer-workspace" };
    }

    const articleStyle = window.getComputedStyle(article);
    if (articleStyle.overflowY !== "auto") {
      return {
        type: "article-not-scrollable",
        overflowY: articleStyle.overflowY,
      };
    }

    if (article.scrollHeight <= article.clientHeight + 20) {
      return {
        type: "article-missing-scroll-budget",
        clientHeight: article.clientHeight,
        scrollHeight: article.scrollHeight,
      };
    }

    const before = {
      sidebarTop: sidebar.getBoundingClientRect().top,
      tocTop: toc.getBoundingClientRect().top,
    };

    article.scrollTop = Math.min(1200, article.scrollHeight - article.clientHeight);

    const after = {
      sidebarTop: sidebar.getBoundingClientRect().top,
      tocTop: toc.getBoundingClientRect().top,
      articleScrollTop: article.scrollTop,
    };

    if (after.articleScrollTop < 100) {
      return {
        type: "article-did-not-scroll",
        articleScrollTop: after.articleScrollTop,
      };
    }

    if (
      Math.abs(before.sidebarTop - after.sidebarTop) > 8 ||
      Math.abs(before.tocTop - after.tocTop) > 8
    ) {
      return {
        type: "developer-rail-drift",
        before,
        after,
      };
    }

    return null;
  });
}

function createConsoleCollector() {
  const messages = [];

  return {
    handler: (message) => {
      const text = message.text();
      const type = message.type();

      if (/401 \(Unauthorized\)/i.test(text)) {
        return;
      }

      if (type === "error") {
        messages.push(`[console:error] ${text}`);
        return;
      }

      if (/hydration|did not match|Text content does not match|Warning:/i.test(text)) {
        messages.push(`[console:${type}] ${text}`);
      }
    },
    messages,
  };
}

async function analyzeRoute({
  browser,
  baseUrl,
  route,
  viewport,
  artifactDir,
}) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: 1,
    colorScheme: "light",
  });
  const page = await context.newPage();
  const consoleCollector = createConsoleCollector();
  const routeKey = sanitizeRoute(route);
  const routeDir = path.join(artifactDir, viewport.key, routeKey);
  fs.mkdirSync(routeDir, { recursive: true });

  page.on("console", consoleCollector.handler);

  const issues = [];
  let finalUrl = null;

  try {
    const response = await page.goto(new URL(route, baseUrl).toString(), {
      waitUntil: "load",
      timeout: 45000,
    });

    finalUrl = page.url();

    if (!response) {
      issues.push({ type: "no-response" });
    } else if (!response.ok()) {
      issues.push({ type: "http-error", status: response.status() });
    }

    if (new URL(finalUrl).origin !== new URL(baseUrl).origin) {
      return {
        route,
        viewport: viewport.key,
        finalUrl,
        issues,
        links: [],
        externalRedirect: true,
      };
    }

    await page.evaluate(async () => {
      if (document.fonts?.ready) {
        await document.fonts.ready;
      }
    });
    await page.waitForTimeout(350);
    await page.screenshot({ path: path.join(routeDir, "top.png"), fullPage: false });
    await autoScroll(page);
    await page.screenshot({ path: path.join(routeDir, "full.png"), fullPage: true });

    const axeViolations = await new AxeBuilder({ page }).analyze();
    const importantViolations = axeViolations.violations.filter((violation) => (
      violation.id === "color-contrast" ||
      violation.id.startsWith("landmark") ||
      violation.impact === "critical" ||
      violation.impact === "serious"
    ));

    if (importantViolations.length > 0) {
      issues.push({
        type: "axe-violations",
        count: importantViolations.length,
        ids: importantViolations.map((violation) => violation.id),
      });
    }

    const overflowIssues = await getOverflowIssues(page);
    if (overflowIssues.length > 0) {
      issues.push({ type: "overflow", items: overflowIssues });
    }

    const stickyIssue = await getDeveloperStickyIssue(page, route, viewport);
    if (stickyIssue) {
      issues.push(stickyIssue);
    }

    if (consoleCollector.messages.length > 0) {
      issues.push({
        type: "console",
        messages: consoleCollector.messages,
      });
    }

    const links = collectSameOriginLinks(
      await page.$$eval("a[href]", (anchors) => anchors.map((anchor) => anchor.getAttribute("href"))),
      baseUrl,
    );

    fs.writeFileSync(
      path.join(routeDir, "report.json"),
      JSON.stringify(
        {
          route,
          viewport: viewport.key,
          finalUrl,
          issues,
          console: consoleCollector.messages,
        },
        null,
        2,
      ),
    );

    return {
      route,
      viewport: viewport.key,
      finalUrl,
      issues,
      links,
      externalRedirect: false,
    };
  } finally {
    await page.close();
    await context.close();
  }
}

function parseArgs() {
  const args = process.argv.slice(2);
  const parsed = {
    baseUrl: DEFAULT_BASE_URL,
    label: process.env.VISUAL_AUDIT_LABEL || "manual",
  };

  for (let index = 0; index < args.length; index += 1) {
    const value = args[index];

    if (value === "--base-url" && args[index + 1]) {
      parsed.baseUrl = args[index + 1];
      index += 1;
      continue;
    }

    if (value === "--label" && args[index + 1]) {
      parsed.label = args[index + 1];
      index += 1;
    }
  }

  return parsed;
}

async function main() {
  const { baseUrl, label } = parseArgs();
  const browser = await chromium.launch({ headless: true });
  const artifactDir = path.join(ARTIFACT_ROOT, label);
  fs.mkdirSync(artifactDir, { recursive: true });

  try {
    const discovered = new Set(getSeedRoutes());
    const visited = new Set();
    const results = [];

    for (const viewport of VIEWPORTS) {
      const queue = [...discovered];

      while (queue.length > 0) {
        const route = queue.shift();
        const key = `${viewport.key}:${route}`;
        if (visited.has(key)) {
          continue;
        }

        visited.add(key);
        const result = await analyzeRoute({
          browser,
          baseUrl,
          route,
          viewport,
          artifactDir,
        });
        results.push(result);

        if (viewport.key === "desktop" && !result.externalRedirect) {
          for (const link of result.links) {
            if (!discovered.has(link) && discovered.size < MAX_ROUTE_COUNT) {
              discovered.add(link);
              queue.push(link);
            }
          }
        }
      }
    }

    const failing = results.filter((result) => result.issues.length > 0);
    const report = {
      baseUrl,
      label,
      routes: [...discovered].sort(),
      results,
      failingCount: failing.length,
      hiddenChromeRoutes: [...HIDDEN_CHROME_ROUTES],
    };

    fs.writeFileSync(path.join(artifactDir, "summary.json"), JSON.stringify(report, null, 2));

    if (failing.length > 0) {
      console.error(`Visual audit failed for ${failing.length} route/viewport combinations.`);
      for (const result of failing.slice(0, 40)) {
        console.error(`- ${result.viewport} ${result.route}`);
        for (const issue of result.issues) {
          console.error(`  • ${issue.type}`);
        }
      }
      process.exit(1);
    }

    console.log(
      `Visual audit passed for ${report.routes.length} routes across ${VIEWPORTS.length} viewports.`,
    );
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
