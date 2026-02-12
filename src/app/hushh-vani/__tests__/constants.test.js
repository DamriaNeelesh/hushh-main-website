/**
 * Hushh Vani — Constants & Design Tokens Tests
 */
import {
  DESIGN_TOKENS,
  FEATURES,
  STATS,
  NAV_ITEMS,
} from "../lib/constants";

describe("DESIGN_TOKENS", () => {
  it("has all required color tokens", () => {
    expect(DESIGN_TOKENS.colors.primary).toBe("#7C3AED");
    expect(DESIGN_TOKENS.colors.secondary).toBe("#A78BFA");
    expect(DESIGN_TOKENS.colors.accent).toBe("#F59E0B");
    expect(DESIGN_TOKENS.colors.cta).toBe("#06B6D4");
    expect(DESIGN_TOKENS.colors.background).toBe("#FAFAFA");
    expect(DESIGN_TOKENS.colors.surface).toBe("#FFFFFF");
  });

  it("has text color sub-tokens", () => {
    expect(DESIGN_TOKENS.colors.text).toHaveProperty("primary");
    expect(DESIGN_TOKENS.colors.text).toHaveProperty("secondary");
    expect(DESIGN_TOKENS.colors.text).toHaveProperty("muted");
    expect(DESIGN_TOKENS.colors.text).toHaveProperty("inverse");
  });

  it("has typography settings", () => {
    expect(DESIGN_TOKENS.typography.fontFamily).toContain("Plus Jakarta Sans");
    expect(DESIGN_TOKENS.typography.sizes).toHaveProperty("hero");
    expect(DESIGN_TOKENS.typography.sizes).toHaveProperty("body");
  });

  it("has spacing tokens", () => {
    expect(DESIGN_TOKENS.spacing).toHaveProperty("section");
    expect(DESIGN_TOKENS.spacing).toHaveProperty("container");
  });

  it("has transition values", () => {
    expect(DESIGN_TOKENS.transitions).toHaveProperty("fast");
    expect(DESIGN_TOKENS.transitions).toHaveProperty("normal");
    expect(DESIGN_TOKENS.transitions).toHaveProperty("slow");
  });
});

describe("FEATURES", () => {
  it("contains exactly 5 features", () => {
    expect(FEATURES).toHaveLength(5);
  });

  it("each feature has required fields", () => {
    FEATURES.forEach((feature) => {
      expect(feature).toHaveProperty("id");
      expect(feature).toHaveProperty("title");
      expect(feature).toHaveProperty("hindiTitle");
      expect(feature).toHaveProperty("tagline");
      expect(feature).toHaveProperty("description");
      expect(feature).toHaveProperty("capabilities");
      expect(feature).toHaveProperty("icon");
      expect(Array.isArray(feature.capabilities)).toBe(true);
      expect(feature.capabilities.length).toBeGreaterThan(0);
    });
  });

  it("has unique IDs", () => {
    const ids = FEATURES.map((f) => f.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("includes vernacular-ai feature", () => {
    const vernacular = FEATURES.find((f) => f.id === "vernacular-ai");
    expect(vernacular).toBeDefined();
    expect(vernacular.title).toBe("Vernacular AI");
  });

  it("includes bharat-optimized feature", () => {
    const bharat = FEATURES.find((f) => f.id === "bharat-optimized");
    expect(bharat).toBeDefined();
    expect(bharat.icon).toBe("Smartphone");
  });
});

describe("STATS", () => {
  it("contains exactly 4 stats", () => {
    expect(STATS).toHaveLength(4);
  });

  it("each stat has value and label", () => {
    STATS.forEach((stat) => {
      expect(stat).toHaveProperty("value");
      expect(stat).toHaveProperty("label");
      expect(typeof stat.value).toBe("string");
      expect(typeof stat.label).toBe("string");
    });
  });
});

describe("NAV_ITEMS", () => {
  it("contains navigation items", () => {
    expect(NAV_ITEMS.length).toBeGreaterThan(0);
  });

  it("each item has label and href", () => {
    NAV_ITEMS.forEach((item) => {
      expect(item).toHaveProperty("label");
      expect(item).toHaveProperty("href");
      expect(item.href).toMatch(/^#/);
    });
  });

  it("includes features link", () => {
    const featuresLink = NAV_ITEMS.find((i) => i.href === "#features");
    expect(featuresLink).toBeDefined();
  });
});
