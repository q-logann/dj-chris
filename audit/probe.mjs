// Inspects computed styles + dimensions at 375 and 1280.
// Surfaces things screenshots can't easily show: font-size in pixels,
// overflowing elements, contrast-relevant colors.

import { chromium } from "@playwright/test";

const baseArg = process.argv.find((a) => a.startsWith("--base="));
const BASE_URL = baseArg ? baseArg.split("=")[1] : "https://dj-chris.vercel.app";
const ROUTES = ["/", "/event-types", "/quote", "/blog"];
const VIEWPORTS = [
  { name: "375", width: 375, height: 812, isMobile: true },
  { name: "1280", width: 1280, height: 800, isMobile: false },
];

async function main() {
  const browser = await chromium.launch();
  const out = {};

  for (const v of VIEWPORTS) {
    out[v.name] = {};
    const ctx = await browser.newContext({
      viewport: { width: v.width, height: v.height },
      isMobile: v.isMobile,
      hasTouch: v.isMobile,
    });
    const page = await ctx.newPage();

    for (const route of ROUTES) {
      await page.goto(BASE_URL + route, { waitUntil: "networkidle" });
      await page.waitForTimeout(500);

      const data = await page.evaluate((vw) => {
        const docOverflow = {
          docScrollWidth: document.documentElement.scrollWidth,
          viewportWidth: vw,
          overflows: document.documentElement.scrollWidth > vw + 1,
        };

        const ALL = document.querySelectorAll(
          "p, li, dd, dt, span, label, button, a, input, textarea, select, h1, h2, h3, h4, h5, h6",
        );
        const small = [];
        for (const el of ALL) {
          if (!el.textContent?.trim()) continue;
          const cs = getComputedStyle(el);
          const fs = parseFloat(cs.fontSize);
          if (fs > 0 && fs < 15) {
            if (el.getAttribute("aria-hidden") === "true") continue;
            small.push({
              tag: el.tagName.toLowerCase(),
              text: el.textContent.trim().slice(0, 50).replace(/\s+/g, " "),
              fontSize: cs.fontSize,
              color: cs.color,
            });
            if (small.length > 30) break;
          }
        }

        return { docOverflow, small };
      }, v.width);

      out[v.name][route] = data;
    }
    await ctx.close();
  }

  await browser.close();
  console.log(JSON.stringify(out, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
