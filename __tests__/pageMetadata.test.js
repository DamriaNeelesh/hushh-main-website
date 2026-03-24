import { buildPageMetadata, resolveCanonicalUrl } from "../src/lib/seo/pageMetadata";

describe("page metadata helper", () => {
  it("builds canonical metadata on the production host", () => {
    const metadata = buildPageMetadata({
      title: "Developer APIs",
      description: "Build with Hushh.",
      pathname: "/developerApi",
    });

    expect(metadata.alternates.canonical).toBe("https://www.hushh.ai/developerApi");
    expect(metadata.openGraph.url).toBe("https://www.hushh.ai/developerApi");
    expect(metadata.robots).toEqual({ index: true, follow: true });
  });

  it("supports noindex routes", () => {
    const metadata = buildPageMetadata({
      title: "Internal",
      description: "Hidden page",
      pathname: "/internal",
      noIndex: true,
    });

    expect(metadata.robots).toEqual({ index: false, follow: false });
  });

  it("resolves absolute canonical URLs safely", () => {
    expect(resolveCanonicalUrl("https://www.hushh.ai/products/kai")).toBe("https://www.hushh.ai/products/kai");
  });
});
