const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawn } = require("child_process");
const { chromium } = require("@playwright/test");

const ROOT = path.resolve(__dirname, "..");
const STANDALONE_LAUNCHER = path.join(ROOT, "scripts", "start-standalone-local.cjs");
const STANDALONE_SERVER = path.join(ROOT, ".next", "standalone", "server.js");
const PRERENDER_MANIFEST = path.join(ROOT, ".next", "prerender-manifest.json");
const DEFAULT_PORT = Number(process.env.PORT || 3012);
const DEFAULT_HOST = process.env.LOCAL_HOST || "localhost";
const BASE_URL = process.env.BASE_URL || `http://${DEFAULT_HOST}:${DEFAULT_PORT}`;
const PERFORMANCE_ROOT = path.join(os.tmpdir(), "hushh-ai-website", "performance");
const RUN_ID = new Date().toISOString().replace(/[:.]/g, "-");
const ARTIFACT_DIRECTORY = path.resolve(process.env.PERF_AUDIT_OUTPUT_DIR || path.join(PERFORMANCE_ROOT, RUN_ID));
const SERVER_LOG_PATH = path.join(ARTIFACT_DIRECTORY, "prod-performance-server.log");
const JSON_REPORT_PATH = path.join(ARTIFACT_DIRECTORY, "prod-route-performance.json");
const MARKDOWN_REPORT_PATH = path.join(ARTIFACT_DIRECTORY, "prod-route-performance.md");
const MAX_PERSISTED_RUNS = 10;
const MAX_RUN_AGE_MS = 7 * 24 * 60 * 60 * 1000;

const NON_HTML_ROUTE_PATTERN = /\.(txt|xml|webmanifest)$/i;
const INTERNAL_ROUTE_PREFIX = "/_";

function ensureArtifactsDirectory() {
  fs.mkdirSync(ARTIFACT_DIRECTORY, { recursive: true });
}

function pruneOldRuns() {
  fs.mkdirSync(PERFORMANCE_ROOT, { recursive: true });

  const runDirectories = fs
    .readdirSync(PERFORMANCE_ROOT, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const fullPath = path.join(PERFORMANCE_ROOT, entry.name);
      const stats = fs.statSync(fullPath);

      return {
        fullPath,
        modifiedAtMs: stats.mtimeMs,
      };
    })
    .sort((left, right) => right.modifiedAtMs - left.modifiedAtMs);

  const now = Date.now();
  const staleDirectories = new Set(
    runDirectories
      .filter((entry, index) => index >= MAX_PERSISTED_RUNS || now - entry.modifiedAtMs > MAX_RUN_AGE_MS)
      .map((entry) => entry.fullPath),
  );

  for (const directoryPath of staleDirectories) {
    fs.rmSync(directoryPath, { recursive: true, force: true });
  }
}

function median(values) {
  if (values.length === 0) {
    return null;
  }

  const sorted = [...values].sort((left, right) => left - right);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? Number(((sorted[middle - 1] + sorted[middle]) / 2).toFixed(2))
    : Number(sorted[middle].toFixed(2));
}

function average(values) {
  if (values.length === 0) {
    return null;
  }

  return Number((values.reduce((sum, value) => sum + value, 0) / values.length).toFixed(2));
}

function percentile(values, percentileValue) {
  if (values.length === 0) {
    return null;
  }

  const sorted = [...values].sort((left, right) => left - right);
  const index = Math.min(sorted.length - 1, Math.ceil((percentileValue / 100) * sorted.length) - 1);
  return Number(sorted[index].toFixed(2));
}

function formatMetric(value) {
  return typeof value === "number" ? `${value.toFixed(2)}ms` : "n/a";
}

function loadConcreteRoutes() {
  const manifest = JSON.parse(fs.readFileSync(PRERENDER_MANIFEST, "utf8"));
  return Object.keys(manifest.routes || {})
    .filter((routePath) => !routePath.startsWith(INTERNAL_ROUTE_PREFIX))
    .filter((routePath) => !NON_HTML_ROUTE_PATTERN.test(routePath))
    .sort((left, right) => left.localeCompare(right));
}

async function waitForServer(url, timeoutMs = 20000) {
  const startedAt = Date.now();

  while (Date.now() - startedAt < timeoutMs) {
    try {
      const response = await fetch(url, { redirect: "manual" });
      if (response.status >= 200 && response.status < 500) {
        return;
      }
    } catch {
      // Server not ready yet.
    }

    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  throw new Error(`Timed out waiting for standalone server at ${url}`);
}

function startStandaloneServer() {
  ensureArtifactsDirectory();
  const logStream = fs.createWriteStream(SERVER_LOG_PATH, { flags: "w" });
  const child = spawn(process.execPath, [STANDALONE_LAUNCHER, "--port", String(DEFAULT_PORT), "--host", DEFAULT_HOST], {
    cwd: ROOT,
    env: process.env,
    stdio: ["ignore", "pipe", "pipe"],
  });

  child.stdout.pipe(logStream);
  child.stderr.pipe(logStream);

  return { child, logStream };
}

async function collectRouteMetrics(browser, routePath) {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.addInitScript(() => {
    window.__HUSHH_PERF__ = {
      cls: 0,
      lcp: null,
    };

    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        window.__HUSHH_PERF__.lcp = entry.startTime;
      }
    }).observe({ type: "largest-contentful-paint", buffered: true });

    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          window.__HUSHH_PERF__.cls += entry.value;
        }
      }
    }).observe({ type: "layout-shift", buffered: true });
  });

  const routeUrl = new URL(routePath, BASE_URL).toString();
  const startedAt = Date.now();

  try {
    const response = await page.goto(routeUrl, {
      waitUntil: "load",
      timeout: 30000,
    });

    await page.waitForTimeout(250);

    const metrics = await page.evaluate(() => {
      const navigationEntry = performance.getEntriesByType("navigation")[0];
      const paintEntries = performance.getEntriesByType("paint");
      const firstContentfulPaint = paintEntries.find((entry) => entry.name === "first-contentful-paint");
      const perfState = window.__HUSHH_PERF__ || {};

      return {
        dns: navigationEntry ? navigationEntry.domainLookupEnd - navigationEntry.domainLookupStart : null,
        tcp: navigationEntry ? navigationEntry.connectEnd - navigationEntry.connectStart : null,
        ttfb: navigationEntry ? navigationEntry.responseStart : null,
        response: navigationEntry ? navigationEntry.responseEnd - navigationEntry.responseStart : null,
        domInteractive: navigationEntry ? navigationEntry.domInteractive : null,
        domContentLoaded: navigationEntry ? navigationEntry.domContentLoadedEventEnd : null,
        load: navigationEntry ? navigationEntry.loadEventEnd : null,
        transferSize: navigationEntry ? navigationEntry.transferSize : null,
        encodedBodySize: navigationEntry ? navigationEntry.encodedBodySize : null,
        decodedBodySize: navigationEntry ? navigationEntry.decodedBodySize : null,
        fcp: firstContentfulPaint ? firstContentfulPaint.startTime : null,
        lcp: typeof perfState.lcp === "number" ? perfState.lcp : null,
        cls: typeof perfState.cls === "number" ? Number(perfState.cls.toFixed(4)) : null,
      };
    });

    const result = {
      route: routePath,
      finalUrl: page.url(),
      status: response ? response.status() : null,
      durationMs: Date.now() - startedAt,
      ...metrics,
    };

    await context.close();
    return result;
  } catch (error) {
    await context.close();
    return {
      route: routePath,
      finalUrl: routeUrl,
      status: "error",
      durationMs: Date.now() - startedAt,
      error: error.message,
    };
  }
}

function buildSummary(results) {
  const successfulResults = results.filter((result) => typeof result.status === "number" && result.status < 400);
  const failedResults = results.filter((result) => !successfulResults.includes(result));

  const metrics = {
    ttfb: successfulResults.map((result) => result.ttfb).filter((value) => typeof value === "number"),
    fcp: successfulResults.map((result) => result.fcp).filter((value) => typeof value === "number"),
    lcp: successfulResults.map((result) => result.lcp).filter((value) => typeof value === "number"),
    domContentLoaded: successfulResults
      .map((result) => result.domContentLoaded)
      .filter((value) => typeof value === "number"),
    load: successfulResults.map((result) => result.load).filter((value) => typeof value === "number"),
    cls: successfulResults.map((result) => result.cls).filter((value) => typeof value === "number"),
  };

  const aggregate = Object.fromEntries(
    Object.entries(metrics).map(([metricName, values]) => [
      metricName,
      {
        average: average(values),
        median: median(values),
        p95: percentile(values, 95),
      },
    ]),
  );

  const slowestByLcp = [...successfulResults]
    .filter((result) => typeof result.lcp === "number")
    .sort((left, right) => right.lcp - left.lcp)
    .slice(0, 15);

  return {
    baseUrl: BASE_URL,
    generatedAt: new Date().toISOString(),
    routeCount: results.length,
    successCount: successfulResults.length,
    failureCount: failedResults.length,
    aggregate,
    failedRoutes: failedResults,
    slowestByLcp,
  };
}

function writeMarkdownReport(summary) {
  const lines = [
    "# Production Route Performance Audit",
    "",
    `- Base URL: ${summary.baseUrl}`,
    `- Generated at: ${summary.generatedAt}`,
    `- Routes tested: ${summary.routeCount}`,
    `- Successful: ${summary.successCount}`,
    `- Failed: ${summary.failureCount}`,
    "",
    "## Aggregate",
    "",
    "| Metric | Average | Median | P95 |",
    "| --- | ---: | ---: | ---: |",
    `| TTFB | ${formatMetric(summary.aggregate.ttfb.average)} | ${formatMetric(summary.aggregate.ttfb.median)} | ${formatMetric(summary.aggregate.ttfb.p95)} |`,
    `| FCP | ${formatMetric(summary.aggregate.fcp.average)} | ${formatMetric(summary.aggregate.fcp.median)} | ${formatMetric(summary.aggregate.fcp.p95)} |`,
    `| LCP | ${formatMetric(summary.aggregate.lcp.average)} | ${formatMetric(summary.aggregate.lcp.median)} | ${formatMetric(summary.aggregate.lcp.p95)} |`,
    `| DOMContentLoaded | ${formatMetric(summary.aggregate.domContentLoaded.average)} | ${formatMetric(summary.aggregate.domContentLoaded.median)} | ${formatMetric(summary.aggregate.domContentLoaded.p95)} |`,
    `| Load | ${formatMetric(summary.aggregate.load.average)} | ${formatMetric(summary.aggregate.load.median)} | ${formatMetric(summary.aggregate.load.p95)} |`,
    `| CLS | ${summary.aggregate.cls.average ?? "n/a"} | ${summary.aggregate.cls.median ?? "n/a"} | ${summary.aggregate.cls.p95 ?? "n/a"} |`,
    "",
    "## Slowest LCP Routes",
    "",
    "| Route | Status | LCP | FCP | Load | Final URL |",
    "| --- | ---: | ---: | ---: | ---: | --- |",
    ...summary.slowestByLcp.map(
      (result) =>
        `| ${result.route} | ${result.status} | ${formatMetric(result.lcp)} | ${formatMetric(result.fcp)} | ${formatMetric(result.load)} | ${result.finalUrl} |`,
    ),
  ];

  if (summary.failedRoutes.length > 0) {
    lines.push("", "## Failed Routes", "", "| Route | Error |", "| --- | --- |");
    for (const result of summary.failedRoutes) {
      lines.push(`| ${result.route} | ${result.error || result.status} |`);
    }
  }

  fs.writeFileSync(MARKDOWN_REPORT_PATH, `${lines.join("\n")}\n`);
}

async function main() {
  if (!fs.existsSync(STANDALONE_SERVER)) {
    throw new Error("Standalone production server not found. Run `npm run build` first.");
  }

  if (!fs.existsSync(PRERENDER_MANIFEST)) {
    throw new Error("Prerender manifest not found. Run `npm run build` first.");
  }

  pruneOldRuns();
  const routes = loadConcreteRoutes();
  const { child, logStream } = startStandaloneServer();

  try {
    await waitForServer(BASE_URL);
    const browser = await chromium.launch({ headless: true });
    const results = [];

    for (const routePath of routes) {
      const result = await collectRouteMetrics(browser, routePath);
      results.push(result);
      const label = typeof result.status === "number" ? result.status : "ERR";
      console.log(`[${results.length}/${routes.length}] ${label} ${routePath} lcp=${formatMetric(result.lcp)} load=${formatMetric(result.load)}`);
    }

    await browser.close();

    const summary = buildSummary(results);
    ensureArtifactsDirectory();
    fs.writeFileSync(JSON_REPORT_PATH, JSON.stringify({ summary, results }, null, 2));
    writeMarkdownReport(summary);

    console.log(`\nPerformance report written to ${JSON_REPORT_PATH}`);
    console.log(`Markdown summary written to ${MARKDOWN_REPORT_PATH}`);
    console.log(`Local performance artifacts are stored under ${ARTIFACT_DIRECTORY}`);
    console.log(JSON.stringify(summary, null, 2));

    if (summary.failureCount > 0) {
      process.exitCode = 1;
    }
  } finally {
    child.kill("SIGTERM");
    logStream.end();
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
