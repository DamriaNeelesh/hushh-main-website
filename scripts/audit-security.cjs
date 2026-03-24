const fs = require("fs");
const path = require("path");

const repoRoot = process.cwd();
const scanRoots = [path.join(repoRoot, "src"), path.join(repoRoot, "next.config.js")];
const findings = [];

const ignoredPathFragments = [
  `${path.sep}node_modules${path.sep}`,
  `${path.sep}.next${path.sep}`,
  `${path.sep}content${path.sep}`,
  `${path.sep}src${path.sep}content${path.sep}`,
];

const rules = [
  {
    name: "hardcoded-whatsapp-bearer-token",
    regex: /\bEAAT[0-9A-Za-z]+/g,
    message: "Found a hardcoded bearer token literal.",
  },
  {
    name: "hardcoded-secret-literal",
    regex:
      /(?:Authorization\s*:\s*["'`]Bearer (?!\$\{)[A-Za-z0-9._-]{20,}["'`]|(?:guestModeAccessToken|access[_-]?token|client[_-]?secret)\s*[:=]\s*["'`](?![^"'`\n]*\$\{)(?![^"'`\n]*\.\.\.)[A-Za-z0-9._-]{20,}["'`])/gi,
    message: "Found a likely hardcoded secret literal.",
  },
  {
    name: "hardcoded-password-literal",
    regex: /\b(?:password|test_password|testPassword)\s*[:=]\s*["'`](?!changeme|example|sample|placeholder)[^"'`\n]{8,}["'`]/gi,
    message: "Found a likely hardcoded password literal.",
  },
  {
    name: "client-api-key-query-string",
    regex: /sessiontoken\?[^"'`\n]*api_key=/g,
    message: "Found API key transport in a client-visible query string.",
    onlyInClientCode: true,
  },
  {
    name: "client-token-query-string",
    regex: /validatetoken\?[^"'`\n]*token=/g,
    message: "Found session token transport in a client-visible query string.",
    onlyInClientCode: true,
  },
  {
    name: "direct-generate-api-key-upstream-call",
    regex: /generateapikey\?mail=/g,
    message: "Found a direct client call to the upstream API-key endpoint.",
    onlyInClientCode: true,
  },
];

function shouldIgnore(filePath) {
  return ignoredPathFragments.some((fragment) => filePath.includes(fragment));
}

function isClientCode(filePath, contents) {
  return (
    (filePath.includes(`${path.sep}src${path.sep}app${path.sep}`) &&
      !filePath.includes(`${path.sep}api${path.sep}`)) ||
    /^\s*["']use client["'];/m.test(contents)
  );
}

function walk(target) {
  const stat = fs.statSync(target);
  if (stat.isDirectory()) {
    for (const entry of fs.readdirSync(target)) {
      walk(path.join(target, entry));
    }
    return;
  }

  if (!/\.(js|jsx|ts|tsx|mjs|cjs)$/.test(target) || shouldIgnore(target)) {
    return;
  }

  const contents = fs.readFileSync(target, "utf8");
  const clientCode = isClientCode(target, contents);

  for (const rule of rules) {
    if (rule.onlyInClientCode && !clientCode) continue;

    const matches = [...contents.matchAll(rule.regex)];
    for (const match of matches) {
      const line = contents.slice(0, match.index).split("\n").length;
      findings.push({
        file: path.relative(repoRoot, target),
        line,
        rule: rule.name,
        message: rule.message,
      });
    }
  }
}

for (const root of scanRoots) {
  if (fs.existsSync(root)) {
    walk(root);
  }
}

if (findings.length > 0) {
  console.error("Security audit failed with the following findings:");
  for (const finding of findings) {
    console.error(`- ${finding.file}:${finding.line} [${finding.rule}] ${finding.message}`);
  }
  process.exit(1);
}

console.log("Security audit passed: no hardcoded bearer secrets or client-side secret query strings were detected.");
