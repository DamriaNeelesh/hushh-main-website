const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const configs = [
    { name: "desktop", width: 1440, height: 1024 },
    { name: "tablet", width: 834, height: 1194 },
    { name: "mobile", width: 390, height: 844 },
  ];

  for (const cfg of configs) {
    const page = await browser.newPage({
      viewport: { width: cfg.width, height: cfg.height },
      deviceScaleFactor: 1,
    });

    await page.goto("http://localhost:3001/products/kai", { waitUntil: "networkidle" });
    await page.screenshot({ path: `/tmp/kai-${cfg.name}-top.png` });

    const hero = await page.locator('section[data-kai-section="hero"]').evaluate((el) => {
      const rect = el.getBoundingClientRect();
      return {
        top: rect.top,
        height: rect.height,
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      };
    });

    const ctaText = await page
      .locator("a")
      .filter({ hasText: "Use Kai on the web" })
      .first()
      .textContent();
    const badgeCount = await page.locator('img[alt="Download on the App Store"]').count();

    await page.locator('section[data-kai-section="discovery"]').scrollIntoViewIfNeeded();
    await page.mouse.wheel(0, 260);
    await page.waitForTimeout(600);
    await page.screenshot({ path: `/tmp/kai-${cfg.name}-discovery.png` });

    const discovery = await page.evaluate(() => {
      const section = document.querySelector('section[data-kai-section="discovery"]');
      const sticky = section?.querySelector('[class*="discoveryPinStage"]');
      const device = section?.querySelector("[data-kai-discovery-visual]");
      const canvas = device?.querySelector("canvas");
      const sectionRect = section?.getBoundingClientRect();
      const stickyRect = sticky?.getBoundingClientRect();
      const deviceRect = device?.getBoundingClientRect();

      return {
        sectionTop: sectionRect?.top,
        sectionHeight: sectionRect?.height,
        stickyTop: stickyRect?.top,
        stickyHeight: stickyRect?.height,
        deviceWidth: deviceRect?.width,
        deviceHeight: deviceRect?.height,
        canvas: Boolean(canvas),
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      };
    });

    console.log(JSON.stringify({ viewport: cfg, hero, ctaText, badgeCount, discovery }, null, 2));
    await page.close();
  }

  await browser.close();
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
