const BRANDING_BASE_URL = process.env.BRANDING_BASE_URL || "https://www.hushh.ai";

const CHECKS = [
  {
    path: "/",
    mustInclude: [
      'href="/privacy"',
      'href="/terms"',
      ">Privacy Manifesto<",
      ">Terms of Use<",
    ],
  },
  {
    path: "/products/kai",
    mustInclude: [
      '<link rel="canonical" href="https://www.hushh.ai/products/kai"',
      'href="/privacy"',
      'href="/terms"',
    ],
  },
  {
    path: "/privacy",
    mustInclude: [
      '<link rel="canonical" href="https://www.hushh.ai/privacy"',
      "Privacy Policy",
      "Agent Kai",
      "Terms of Use",
      "Contact",
    ],
  },
  {
    path: "/terms",
    mustInclude: [
      '<link rel="canonical" href="https://www.hushh.ai/terms"',
      "Terms of Use",
      "Agent Kai",
      "Privacy Policy",
      "Contact",
    ],
  },
  {
    path: "/sitemap-0.xml",
    mustInclude: [
      "https://www.hushh.ai/products/kai",
      "https://www.hushh.ai/privacy",
      "https://www.hushh.ai/terms",
    ],
  },
];

function assertIncludes(body, value, context) {
  if (!body.includes(value)) {
    throw new Error(`${context} Missing: ${value}`);
  }
}

function assertNotIncludes(body, value, context) {
  if (body.includes(value)) {
    throw new Error(`${context} Unexpected: ${value}`);
  }
}

async function fetchText(url) {
  const response = await fetch(url, {
    redirect: "follow",
    headers: {
      "User-Agent": "hushh-oauth-branding-verifier/1.0",
    },
  });

  if (!response.ok) {
    throw new Error(`Expected 200 for ${url}, received ${response.status}`);
  }

  return response.text();
}

async function main() {
  for (const check of CHECKS) {
    const url = new URL(check.path, BRANDING_BASE_URL).toString();
    const body = await fetchText(url);
    const context = `Live branding check failed for ${url}.`;

    for (const expected of check.mustInclude) {
      assertIncludes(body, expected, context);
    }

    assertNotIncludes(body, 'content="noindex"', context);
  }

  console.log(`Live OAuth branding verification passed for ${BRANDING_BASE_URL}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
