const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const TARGETS = [
  "src/app",
  "src/lib",
  "tailwind.config.js",
];

const FILE_PATTERN = /\.(js|jsx|ts|tsx|css)$/;
const EXCLUDED_DIRS = new Set(["node_modules", ".next", ".git", "public", "support"]);
const EXCLUDED_FILES = new Set([
  "src/app/theme.jsx",
]);

const BANNED_PATTERNS = [
  {
    label: "legacy magenta/blue gradient",
    pattern: /#e0055f|#2020ed|#c20e54|#4c1775/gi,
  },
  {
    label: "legacy vivid purple",
    pattern: /#7b00d3|#a342ff|#8b5cf6|#7c3aed|#4c1d95/gi,
  },
  {
    label: "legacy product blue",
    pattern: /#007aff|#0071e3|rgba\(59,\s*130,\s*246|rgba\(14,\s*165,\s*233/gi,
  },
  {
    label: "tailwind pink/purple utility",
    pattern: /\b(?:bg|text|from|to|via|border)-(?:pink|purple|violet|indigo)-/g,
  },
  {
    label: "blue-indigo marketing gradient",
    pattern: /bg-gradient-to-br\s+from-blue-\d+\s+to-indigo-\d+/g,
  },
];

function walk(entryPath, files = []) {
  const stat = fs.statSync(entryPath);

  if (stat.isDirectory()) {
    for (const entry of fs.readdirSync(entryPath, { withFileTypes: true })) {
      if (entry.name.startsWith(".") || EXCLUDED_DIRS.has(entry.name)) {
        continue;
      }
      walk(path.join(entryPath, entry.name), files);
    }
    return files;
  }

  if (FILE_PATTERN.test(entryPath)) {
    const relativePath = path.relative(ROOT, entryPath);
    if (!EXCLUDED_FILES.has(relativePath)) {
      files.push(entryPath);
    }
  }

  return files;
}

function findLineNumber(source, index) {
  return source.slice(0, index).split("\n").length;
}

function main() {
  const files = TARGETS.flatMap((target) => walk(path.join(ROOT, target)));
  const findings = [];

  for (const absolutePath of files) {
    const relativePath = path.relative(ROOT, absolutePath);
    const source = fs.readFileSync(absolutePath, "utf8");

    for (const { label, pattern } of BANNED_PATTERNS) {
      pattern.lastIndex = 0;
      let match;
      while ((match = pattern.exec(source)) !== null) {
        findings.push({
          file: relativePath,
          line: findLineNumber(source, match.index),
          label,
          snippet: match[0],
        });
      }
    }
  }

  if (findings.length > 0) {
    console.error("Brand audit failed. Remove off-brand palette usage from the following files:\n");
    for (const finding of findings) {
      console.error(`- ${finding.file}:${finding.line} — ${finding.label} (${finding.snippet})`);
    }
    process.exit(1);
  }

  console.log("Brand audit passed.");
}

main();
