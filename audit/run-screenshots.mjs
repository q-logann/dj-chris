// One-shot Playwright runner that captures full-page screenshots of the live
// site at three viewports and five routes. Output: audit/screenshots/<dir>/<route>-<viewport>.png
//
// Usage:
//   node audit/run-screenshots.mjs                # writes to before/
//   node audit/run-screenshots.mjs --after        # writes to after/
//   node audit/run-screenshots.mjs --base=http://localhost:3000

import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const args = process.argv.slice(2);
const isAfter = args.includes("--after");
const baseArg = args.find((a) => a.startsWith("--base="));
const BASE_URL = baseArg
  ? baseArg.split("=")[1]
  : "https://dj-chris.vercel.app";

const ROUTES = [
  { name: "home", path: "/" },
  { name: "event-types", path: "/event-types" },
  { name: "quote", path: "/quote" },
  { name: "blog", path: "/blog" },
  {
    name: "blog-post",
    path: "/blog/how-to-choose-the-right-dj-for-a-baby-shower",
  },
];

const VIEWPORTS = [
  { name: "375", width: 375, height: 812, isMobile: true },
  { name: "768", width: 768, height: 1024, isMobile: false },
  { name: "1280", width: 1280, height: 800, isMobile: false },
];

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, "screenshots", isAfter ? "after" : "before");

async function main() {
  await mkdir(outDir, { recursive: true });
  const browser = await chromium.launch();
  console.log(`Capturing → ${outDir}`);
  console.log(`Base URL  → ${BASE_URL}`);

  for (const viewport of VIEWPORTS) {
    const ctx = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: 2,
      isMobile: viewport.isMobile,
      hasTouch: viewport.isMobile,
      // Reduce motion so screenshots aren't mid-animation.
      reducedMotion: "reduce",
    });
    const page = await ctx.newPage();
    for (const route of ROUTES) {
      const url = BASE_URL + route.path;
      const file = `${outDir}/${route.name}-${viewport.name}.png`;
      try {
        await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
        // Settle: let any deferred work finish.
        await page.waitForTimeout(800);
        await page.screenshot({ path: file, fullPage: true });
        console.log(`  ✓ ${route.name} @ ${viewport.name}`);
      } catch (err) {
        console.error(`  ✗ ${route.name} @ ${viewport.name}: ${err.message}`);
      }
    }
    await ctx.close();
  }

  await browser.close();
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
