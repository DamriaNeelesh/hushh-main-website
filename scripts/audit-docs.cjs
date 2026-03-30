const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const requiredDirs = [
  "docs/architecture",
  "docs/design-system",
  "docs/features",
  "docs/guides",
  "docs/integrations",
  "docs/operations",
  "docs/runbooks",
  "support/postman",
  "support/prompts",
];

const requiredFiles = [
  "docs/architecture/agent-api-proxy-pattern.md",
  "docs/architecture/nextjs-hardening-baseline-2026-03-27.md",
  "docs/design-system/site-shell.md",
  "docs/features/agent-signin.md",
  "docs/features/site-search.md",
  "docs/guides/hooks.md",
  "docs/integrations/apple-signin-setup.md",
  "docs/integrations/email-api.md",
  "docs/operations/api-verification.md",
  "docs/operations/gcp-website-deploy.md",
  "docs/operations/runtime-timeout.md",
  "docs/runbooks/website-uat-deploy.md",
  "support/postman/hushh-email-integration.postman_collection.json",
  "support/prompts/agent-queries.txt",
  "support/prompts/hushh-and-brand-agent-queries.txt",
  "support/prompts/openai-agent-prompt.txt",
  "README.md",
];

const deletedLegacyDocs = [
  "A2A_Agents_Web_Integration_Guide.md",
  "AGENT_API_ARCHITECTURE.md",
  "AGENT_SIGNIN_CLEANUP.md",
  "AGENT_SIGNIN_FEATURE.md",
  "AGENT_SIGN_IN_FIXED.md",
  "AGENT_URLS_FIXED.md",
  "API_VERIFICATION_TEST.md",
  "EMAIL_API_VERIFICATION.md",
  "PLAID_PRODUCTION_DEMO_RUNBOOK.md",
  "SEARCH_FEATURE_DOCUMENTATION.md",
  "UNDERSTANDING_PROXY_PATTERN.md",
  "VERCEL_TIMEOUT_FIX.md",
  "docs/operations/vercel-timeout.md",
  "WHATSAPP_API_UPDATE.md",
  "theme.config.jsx",
  "pages/_meta.json",
  "pages/developer-Api/_meta.json",
  "src/app/hooks/README.md",
  "src/app/hushh-vani/README.md",
  "src/app/login/APPLE_SETUP.md",
  "src/app/global.css",
  "src/app/_components/Navbar.jsx",
  "src/app/google2684282ddff9aca5 (1).html",
  ".txt",
  "Agent queries.txt",
  "Agents collection.postman_collection.json",
  "Brand Agent.postman_collection.json",
  "Hushh Agent.postman_collection.json",
  "Hushh Email Integration.postman_collection.json",
  "Hushh Public Data Agent.postman_collection.json",
  "Hushh Whatsapp integration.postman_collection.json",
  "Hushh and Brand Agent queries.txt",
  "openAI-agent-prompt.txt",
  "dev-kai.log",
  "test_agent_transparency.html",
  "contentlayer.config.js",
  "mdx-components.js",
  ".eslintrc.json",
  "docs/features/hushh-vani.md",
  "docs/integrations/a2a-website-integration.md",
  "docs/integrations/whatsapp-graph-api.md",
  "docs/runbooks/plaid-production-demo.md",
  "support/postman/agents-collection.postman_collection.json",
  "support/postman/brand-agent.postman_collection.json",
  "support/postman/hushh-agent.postman_collection.json",
  "support/postman/hushh-public-data-agent.postman_collection.json",
  "support/postman/hushh-whatsapp-integration.postman_collection.json",
  "support/prompts/legacy-searchbar-snippet.txt",
  "tmp/capture-kai-frame.cjs",
  "tmp/kai-playwright-verify.cjs",
  "tmp/sample.html",
];

const allowedRootFiles = [
  ".dockerignore",
  ".env.example",
  ".env.prod-remote.local.example",
  ".env.uat-remote.local.example",
  ".gcloudignore",
  ".gitleaks.toml",
  ".gitignore",
  ".nvmrc",
  ".npmrc",
  "Dockerfile",
  "README.md",
  "eslint.config.mjs",
  "jest.config.js",
  "jest.setup.js",
  "jsconfig.json",
  "next-env.d.ts",
  "next.config.js",
  "package-lock.json",
  "package.json",
  "postcss.config.js",
  "proxy.js",
  "tailwind.config.js",
  "tsconfig.json",
  "yarn.lock",
];

const ignoredGeneratedRootFiles = [
  ".env.local",
  ".env.development.local",
  ".env.production.local",
  "LICENSE",
  "gitleaks",
  "tsconfig.tsbuildinfo",
];

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function exists(relativePath) {
  return fs.existsSync(path.join(ROOT, relativePath));
}

function main() {
  for (const dir of requiredDirs) {
    assert(exists(dir), `Missing docs directory: ${dir}`);
  }

  for (const file of requiredFiles) {
    assert(exists(file), `Missing required documentation file: ${file}`);
  }

  const rootMarkdown = fs
    .readdirSync(ROOT)
    .filter((entry) => entry.endsWith(".md"))
    .sort();

  assert(
    JSON.stringify(rootMarkdown) === JSON.stringify(["README.md"]),
    `Root markdown should only contain README.md. Found: ${rootMarkdown.join(", ")}`,
  );

  const unexpectedRootFiles = fs
    .readdirSync(ROOT, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((entry) => !allowedRootFiles.includes(entry))
    .filter((entry) => !ignoredGeneratedRootFiles.includes(entry))
    .sort();

  assert(
    unexpectedRootFiles.length === 0,
    `Unexpected root files found: ${unexpectedRootFiles.join(", ")}`,
  );

  for (const file of deletedLegacyDocs) {
    assert(!exists(file), `Legacy file should have been removed: ${file}`);
  }

  const readme = fs.readFileSync(path.join(ROOT, "README.md"), "utf8");
  for (const dir of requiredDirs) {
    assert(readme.includes(dir.replace("docs/", "")) || readme.includes(dir), `README should reference ${dir}`);
  }

  console.log("Documentation audit passed.");
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
