const { chromium } = require('@playwright/test');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1024 } });
  await page.goto('http://localhost:3001/products/kai', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1800);
  await page.locator('[data-kai-section="discovery"]').scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await page.evaluate(() => {
    const shell = document.querySelector('[class*="discoveryDeviceFrameShell"]');
    const perspective = document.querySelector('[class*="discoveryDevicePerspective"]');
    if (shell) shell.style.background = 'transparent';
    if (perspective) perspective.style.transform = 'perspective(2400px) rotateX(11deg) rotateY(-23deg) rotateZ(-8deg)';
  });
  const locator = page.locator('[class*="discoveryDeviceFrameShell"]');
  await locator.screenshot({ path: path.join('/tmp', 'kai-seq-test.png'), omitBackground: true });
  await browser.close();
})();
