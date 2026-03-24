const { getRouteManifest, HIDDEN_CHROME_ROUTES } = require("../scripts/route-manifest.cjs");

describe("route manifest", () => {
  it("classifies hidden chrome routes consistently", () => {
    const manifest = getRouteManifest();

    for (const route of HIDDEN_CHROME_ROUTES) {
      const entry = manifest.find((item) => item.route === route);
      expect(entry).toBeDefined();
      expect(entry.kind).toBe("hiddenChrome");
    }
  });

  it("provides sample routes for key dynamic public surfaces", () => {
    const manifest = getRouteManifest();
    const blogEntry = manifest.find((item) => item.route === "/blogs/[slug]");
    const categoriesEntry = manifest.find((item) => item.route === "/categories/[slug]");
    const developerDocsEntry = manifest.find((item) => item.route === "/developers/[slug]");

    expect(blogEntry.sampleRoutes.length).toBeGreaterThan(0);
    expect(categoriesEntry.sampleRoutes).toContain("/categories/all");
    expect(developerDocsEntry.sampleRoutes).toContain("/developers/getting-started");
  });
});
