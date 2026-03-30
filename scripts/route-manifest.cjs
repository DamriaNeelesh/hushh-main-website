const fs = require("fs");
const path = require("path");

const APP_DIR = path.join(process.cwd(), "src", "app");
const BLOG_CONTENT_DIR = path.join(process.cwd(), "content");
const ROUTE_PAGE_PATTERN = /^page\.(js|jsx|ts|tsx)$/;
const EXCLUDED_ROUTE_DIRS = new Set(["_components", "api", "__tests__", "developerApi"]);
const HIDDEN_CHROME_ROUTES = new Set([
  "/viva-connect",
  "/viva-connect/qrPage",
  "/qrCodePage",
]);
const STATIC_DYNAMIC_ROUTE_FIXTURES = {
  "/categories/[slug]": ["/categories/all"],
  "/developers/[slug]": ["/developers/getting-started"],
};

function walk(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolutePath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      if (entry.name.startsWith("_") || EXCLUDED_ROUTE_DIRS.has(entry.name)) {
        continue;
      }

      files.push(...walk(absolutePath));
      continue;
    }

    if (ROUTE_PAGE_PATTERN.test(entry.name)) {
      files.push(absolutePath);
    }
  }

  return files;
}

function filePathToRoute(filePath) {
  const relativePath = path.relative(APP_DIR, filePath);
  const routePath = relativePath.replace(/\/page\.(js|jsx|ts|tsx)$/, "").replace(/\\/g, "/");

  if (!routePath || routePath === "page.jsx" || routePath === "page.js" || routePath === "page.tsx" || routePath === "page.ts") {
    return "/";
  }

  return `/${routePath}`;
}

function classifyRoute(route) {
  if (HIDDEN_CHROME_ROUTES.has(route)) {
    return "hiddenChrome";
  }

  if (route.includes("[")) {
    return "dynamic";
  }

  if (route.startsWith("/login/callback")) {
    return "utility";
  }

  return "standard";
}

function getBlogFixtures() {
  if (!fs.existsSync(BLOG_CONTENT_DIR)) {
    return [];
  }

  return fs
    .readdirSync(BLOG_CONTENT_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && fs.existsSync(path.join(BLOG_CONTENT_DIR, entry.name, "index.tsx")))
    .map((entry) => `/blogs/${entry.name}`)
    .sort()
    .slice(0, 3);
}

function getSampleRoutes(route) {
  if (route === "/blogs/[slug]") {
    return getBlogFixtures();
  }

  return STATIC_DYNAMIC_ROUTE_FIXTURES[route] || [];
}

function getRouteManifest() {
  return walk(APP_DIR)
    .map((filePath) => {
      const route = filePathToRoute(filePath);
      return {
        route,
        kind: classifyRoute(route),
        file: path.relative(process.cwd(), filePath),
        sampleRoutes: getSampleRoutes(route),
      };
    })
    .sort((left, right) => left.route.localeCompare(right.route));
}

function printManifest() {
  const manifest = getRouteManifest();
  console.table(
    manifest.map((entry) => ({
      route: entry.route,
      kind: entry.kind,
      file: entry.file,
      samples: entry.sampleRoutes.join(", "),
    })),
  );

  const counts = manifest.reduce((accumulator, entry) => {
    accumulator[entry.kind] = (accumulator[entry.kind] || 0) + 1;
    return accumulator;
  }, {});

  console.log("Route counts:", counts);
}

if (require.main === module) {
  if (process.argv.includes("--json")) {
    console.log(JSON.stringify(getRouteManifest(), null, 2));
  } else {
    printManifest();
  }
}

module.exports = {
  APP_DIR,
  HIDDEN_CHROME_ROUTES,
  getRouteManifest,
};
