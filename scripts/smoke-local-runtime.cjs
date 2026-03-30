#!/usr/bin/env node

const assert = require("assert");
const { chromium } = require("@playwright/test");

const args = process.argv.slice(2);

function readOption(optionName, fallbackValue) {
  const optionIndex = args.lastIndexOf(optionName);
  if (optionIndex === -1 || optionIndex === args.length - 1) {
    return fallbackValue;
  }

  return args[optionIndex + 1];
}

const mode = readOption("--mode", "both");
const baseUrlOverride = readOption("--base-url", null);

const targets = {
  dev: {
    label: "dev",
    baseUrl: baseUrlOverride || "http://localhost:3002",
  },
  standalone: {
    label: "standalone",
    baseUrl: baseUrlOverride || "http://localhost:3001",
  },
};

const routeExpectations = [
  {
    route: "/",
    titleIncludes: "Hushh | Your Data. Your Business.",
    h1Includes: "Your Data. Your Business.",
  },
  {
    route: "/about",
    titleIncludes: "About Hushh",
    h1Includes: "Building the future of data sovereignty",
  },
  {
    route: "/products/kai",
    titleIncludes: "Kai | Explainable Investing Copilot",
    h1Includes: "Your personal",
  },
  {
    route: "/hushhBlogs",
    titleIncludes: "Hushh Newsroom",
    h1Includes: "Ideas, releases, and privacy-first product stories",
  },
  {
    route: "/developers",
    titleIncludes: "Developers | Hushh",
    h1Includes: "Developer APIs",
  },
  {
    route: "/developers/agent-kai",
    titleIncludes: "Agent Kai API Reference",
    h1Includes: "Agent Kai API Reference",
  },
  {
    route: "/login",
    titleIncludes: "Sign In | Hushh",
  },
  {
    route: "/social-onboarding",
    titleIncludes: "Social Profile Setup | Hushh",
    h1Includes: "Add your best profile photos",
  },
  {
    route: "/job/1",
    titleIncludes: "Hushh Careers",
  },
];

const allowedConsoleErrorPatterns = [
  /Failed to load resource: the server responded with a status of 401 \(Unauthorized\)/i,
  /google\.com\/g\/collect/i,
  /Fetch API cannot load https:\/\/www\.google\.com\/g\/collect/i,
  /violates the following Content Security Policy directive/i,
];

const blockedAssetPatterns = [
  /\/_next\/static\//i,
  /MIME type .* is not a supported stylesheet MIME type/i,
  /MIME type .* is not executable/i,
];

function resolveTargetList(selectedMode) {
  if (selectedMode === "both") {
    return [targets.dev, targets.standalone];
  }

  const target = targets[selectedMode];
  if (!target) {
    throw new Error(`Unknown mode "${selectedMode}". Use dev, standalone, or both.`);
  }

  return [target];
}

function isAllowedConsoleError(message) {
  return allowedConsoleErrorPatterns.some((pattern) => pattern.test(message));
}

function isBlockedAssetFailure(message) {
  return blockedAssetPatterns.some((pattern) => pattern.test(message));
}

async function runSmoke(target) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const failures = [];

  try {
    for (const expectation of routeExpectations) {
      const consoleErrors = [];
      const requestFailures = [];
      const responseFailures = [];
      const pageErrors = [];

      page.removeAllListeners("console");
      page.removeAllListeners("requestfailed");
      page.removeAllListeners("response");
      page.removeAllListeners("pageerror");

      page.on("console", (message) => {
        if (message.type() === "error") {
          consoleErrors.push(message.text());
        }
      });

      page.on("requestfailed", (request) => {
        requestFailures.push(`${request.method()} ${request.url()} ${request.failure()?.errorText || ""}`.trim());
      });

      page.on("response", (response) => {
        if (response.status() >= 400) {
          responseFailures.push(`${response.status()} ${response.url()}`);
        }
      });

      page.on("pageerror", (error) => {
        pageErrors.push(error.message);
      });

      const response = await page.goto(`${target.baseUrl}${expectation.route}`, {
        waitUntil: "load",
        timeout: 30000,
      });

      await page.waitForTimeout(400);

      const title = await page.title();
      const h1Text = (await page.locator("h1").first().textContent().catch(() => null)) || "";
      const sectionOrder =
        expectation.sectionOrder
          ? await page.locator("[data-kai-section]").evaluateAll((elements) =>
              elements.map((element) => element.getAttribute("data-kai-section")),
            )
          : null;

      try {
        assert(response, `No response received for ${expectation.route}`);
        assert.strictEqual(response.status(), 200, `Expected 200 for ${expectation.route}, got ${response.status()}`);
        assert(
          title.includes(expectation.titleIncludes),
          `Title mismatch for ${expectation.route}: expected "${expectation.titleIncludes}" inside "${title}"`,
        );

        if (expectation.h1Includes) {
          assert(
            h1Text.includes(expectation.h1Includes),
            `First h1 mismatch for ${expectation.route}: expected "${expectation.h1Includes}" inside "${h1Text}"`,
          );
        }

        if (expectation.sectionOrder) {
          assert.deepStrictEqual(
            sectionOrder,
            expectation.sectionOrder,
            `Section order mismatch for ${expectation.route}: expected ${expectation.sectionOrder.join(" -> ")}, got ${(sectionOrder || []).join(" -> ")}`,
          );
        }

        const unexpectedConsoleErrors = consoleErrors.filter((message) => !isAllowedConsoleError(message));
        const unexpectedRequestFailures = requestFailures.filter((message) => isBlockedAssetFailure(message));
        const unexpectedResponseFailures = responseFailures.filter((message) => isBlockedAssetFailure(message));
        const unexpectedPageErrors = pageErrors.filter((message) => !isAllowedConsoleError(message));

        assert.strictEqual(
          unexpectedConsoleErrors.length,
          0,
          `Unexpected console errors for ${expectation.route}: ${unexpectedConsoleErrors.join(" | ")}`,
        );
        assert.strictEqual(
          unexpectedRequestFailures.length,
          0,
          `Missing static assets for ${expectation.route}: ${unexpectedRequestFailures.join(" | ")}`,
        );
        assert.strictEqual(
          unexpectedResponseFailures.length,
          0,
          `Broken static responses for ${expectation.route}: ${unexpectedResponseFailures.join(" | ")}`,
        );
        assert.strictEqual(
          unexpectedPageErrors.length,
          0,
          `Unexpected page errors for ${expectation.route}: ${unexpectedPageErrors.join(" | ")}`,
        );

        console.log(`[${target.label}] OK ${expectation.route}`);
      } catch (error) {
        failures.push(error.message);
        console.error(`[${target.label}] FAIL ${expectation.route}: ${error.message}`);
      }
    }
  } finally {
    await browser.close();
  }

  if (failures.length > 0) {
    throw new Error(`${target.label} smoke failed:\n- ${failures.join("\n- ")}`);
  }
}

async function main() {
  for (const target of resolveTargetList(mode)) {
    console.log(`Running local smoke against ${target.label} (${target.baseUrl})`);
    await runSmoke(target);
  }

  console.log("Local runtime smoke passed.");
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
