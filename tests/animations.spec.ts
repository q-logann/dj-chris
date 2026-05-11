import { test, expect } from "@playwright/test";

/**
 * Animation + interaction flow tests for dj-christina.
 *
 * Verifies:
 *   - Buttons declare transitions / motion-safe scale hover
 *   - EventTypeCard / BlogCard lift on hover (translateY changes)
 *   - Mobile menu opens, animates, and closes
 *   - QuoteForm success renders QuoteResultCard via a stubbed /api/inquiry
 */

test.describe("buttons have transitions and scale on hover", () => {
  test("hero CTA declares transition + motion-safe scale", async ({ page }) => {
    await page.goto("/");
    const cta = page.getByRole("link", { name: /get a quick quote/i }).first();
    await expect(cta).toBeVisible();
    const klass = await cta.getAttribute("class");
    expect(klass).toMatch(/transition/);
    expect(klass).toMatch(/motion-safe:hover:scale-\[1\.02\]/);
    expect(klass).toMatch(/motion-safe:active:scale-\[0\.98\]/);
  });

  test("header desktop Get-a-Quote pill has transition + scale", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    // The CTA pill is the only header link with href=/quote that contains
    // an SVG icon — the nav-pill version with the same text doesn't.
    const headerCta = page
      .locator('header a[href="/quote"]:has(svg)')
      .first();
    await expect(headerCta).toBeVisible();
    const klass = await headerCta.getAttribute("class");
    expect(klass).toMatch(/transition/);
    expect(klass).toMatch(/motion-safe:hover:scale-\[1\.02\]/);
  });

  test("quote form submit declares transition + scale", async ({ page }) => {
    await page.goto("/quote");
    const submit = page.getByRole("button", {
      name: /get my approximate quote/i,
    });
    await expect(submit).toBeVisible();
    const klass = await submit.getAttribute("class");
    expect(klass).toMatch(/transition-all/);
    expect(klass).toMatch(/motion-safe:hover:scale-\[1\.02\]/);
  });
});

test("event-type card lifts on hover", async ({ page }) => {
  await page.goto("/event-types");
  const card = page.locator("article.liquid-glass").first();
  await expect(card).toBeVisible();

  // Read the resting transform, then hover and read again.
  const before = await card.evaluate((el) => getComputedStyle(el).transform);
  await card.hover();
  // Allow the 250ms transition to complete.
  await page.waitForTimeout(350);
  const after = await card.evaluate((el) => getComputedStyle(el).transform);

  // Resting transform is `none` or identity; hover state has a non-zero
  // negative translateY (we use -translate-y-0.5).
  expect(after).not.toBe(before);
  expect(after).toMatch(/matrix/);
});

test("blog card lifts on hover", async ({ page }) => {
  await page.goto("/blog");
  const card = page.locator("article.liquid-glass").first();
  await expect(card).toBeVisible();
  const before = await card.evaluate((el) => getComputedStyle(el).transform);
  await card.hover();
  await page.waitForTimeout(350);
  const after = await card.evaluate((el) => getComputedStyle(el).transform);
  expect(after).not.toBe(before);
});

test.describe("mobile menu", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("opens on tap, closes via item click, declares slide-in animation", async ({
    page,
  }) => {
    await page.goto("/");
    // Use aria-controls (stable across open/closed states) — the button's
    // aria-label switches between "Open menu" and "Close menu".
    const trigger = page.locator('header button[aria-controls="mobile-nav"]');
    await expect(trigger).toBeVisible();
    await expect(trigger).toHaveAttribute("aria-expanded", "false");

    await trigger.click();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");

    const drawer = page.locator("#mobile-nav");
    await expect(drawer).toBeVisible();

    const drawerClass = await drawer.getAttribute("class");
    expect(drawerClass).toMatch(/animate-\[mobile-menu-in/);

    // Tapping a nav item should close it (and navigate away).
    await drawer.getByRole("link", { name: /event types/i }).click();
    await page.waitForURL(/\/event-types$/);
    // After navigation, no #mobile-nav should be open on the new page.
    await expect(page.locator("#mobile-nav")).toHaveCount(0);
  });
});

test("quote form success renders QuoteResultCard via stubbed API", async ({
  page,
}) => {
  // Stub the inquiry endpoint so we don't need Resend creds.
  await page.route("**/api/inquiry", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        success: true,
        quote: {
          lowEstimate: 350,
          highEstimate: 450,
          breakdown: ["Base — Restaurant", "Guests — small group"],
          disclaimer: "This is an approximate quote.",
        },
      }),
    });
  });

  await page.goto("/quote");

  // Fill the minimum required fields.
  await page.getByLabel(/full name/i).fill("Test User");
  await page.getByLabel(/email/i).fill("test@example.com");
  await page.getByLabel(/phone number/i).fill("(770) 555-0123");
  await page.getByLabel(/event location \/ city/i).fill("Lawrenceville, GA");
  await page.getByLabel(/event type/i).selectOption("restaurant");
  await page.getByLabel(/venue type/i).selectOption("Restaurant");
  await page.getByLabel(/event date/i).fill("2026-12-15");
  await page.getByLabel(/start time/i).fill("18:30");
  await page.getByLabel(/estimated guest count/i).fill("50");

  await page
    .getByRole("button", { name: /get my approximate quote/i })
    .click();

  // QuoteResult renders with the // Estimated quote kicker + price range.
  const result = page.getByRole("status");
  await expect(result).toBeVisible({ timeout: 5000 });
  await expect(result).toContainText("Estimated quote");
  await expect(result).toContainText("$350");
  await expect(result).toContainText("$450");
});
