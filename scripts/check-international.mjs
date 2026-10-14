import assert from "node:assert/strict";
import path from "node:path";
import fs from "node:fs/promises";
import { pathToFileURL } from "node:url";

const moduleFlag = process.argv.indexOf("--playwright");
const channelFlag = process.argv.indexOf("--channel");
const { chromium } = await import(moduleFlag >= 0 ? pathToFileURL(path.join(process.argv[moduleFlag + 1], "index.mjs")).href : "playwright");
const baseUrl = process.env.TEST_BASE_URL || "http://127.0.0.1:3100";
const screenshotDir = path.join(process.cwd(), ".next", "international-qa");
const locales = { "/en": "en", "/ja": "ja", "/zh-tw": "zh-Hant" };
const errors = [];

async function checkOverflow(page) {
  const result = await page.evaluate(() => ({ width: window.innerWidth, content: document.documentElement.scrollWidth }));
  assert(result.content <= result.width, `Horizontal overflow: ${JSON.stringify(result)} at ${page.url()}`);
}

async function run() {
  await fs.mkdir(screenshotDir, { recursive: true });
  const browser = await chromium.launch({ headless: true, channel: channelFlag >= 0 ? process.argv[channelFlag + 1] : undefined });
  try {
    for (const width of [320, 390, 1280]) {
      const context = await browser.newContext({ viewport: { width, height: 900 } });
      const page = await context.newPage();
      page.on("pageerror", (error) => errors.push(`${page.url()}: ${error.message}`));
      for (const [pathname, lang] of Object.entries(locales)) {
        const response = await page.goto(`${baseUrl}${pathname}`);
        assert.equal(response.status(), 200);
        await page.waitForFunction((expected) => document.documentElement.lang === expected, lang);
        assert.equal(await page.locator("header nav a").count(), 4);
        assert.equal(await page.locator('a[href^="tel:"], a[href^="sms:"]').count(), 0);
        assert.equal(await page.locator('a[href="/admin"], a[href="/reviews"], a[href="/long-distance-taxi"]').count(), 0);
        for (const href of ["https://wa.me/821090907112", "https://line.me/ti/p/g4hynDPjMs", "https://www.facebook.com/profile.php?id=61576034524144", "https://www.instagram.com/aivisions77/", "https://www.threads.com/@aivisions77"]) {
          assert(await page.locator(`a[href="${href}"]`).count() > 0, `Missing contact ${href}`);
        }
        assert((await page.locator('link[rel="canonical"]').getAttribute("href")).endsWith(pathname));
        assert.equal(await page.locator('link[rel="alternate"][hreflang]').count(), 5);
        await checkOverflow(page);
        await page.screenshot({ path: path.join(screenshotDir, `${pathname.slice(1)}-${width}.png`), fullPage: true });
        await page.locator("header button").click();
        await checkOverflow(page);
        await page.screenshot({ path: path.join(screenshotDir, `${pathname.slice(1)}-${width}-theme.png`) });
        console.log(`PASS ${pathname} ${width}px: locale, contacts, navigation, metadata, layout, theme`);
      }
      await context.close();
    }

    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, permissions: ["clipboard-read", "clipboard-write"] });
    const page = await context.newPage();
    page.on("pageerror", (error) => errors.push(`${page.url()}: ${error.message}`));
    await page.goto(baseUrl);
    await page.locator("dialog[open]").waitFor();
    assert.equal(await page.locator("dialog button").count(), 4);
    await checkOverflow(page);
    await page.screenshot({ path: path.join(screenshotDir, "first-visit.png") });
    await page.getByRole("button", { name: "日本 · 日本語", exact: true }).click();
    await page.waitForURL("**/ja");
    await page.goto(baseUrl);
    await page.waitForURL("**/ja");
    assert.equal(await page.locator("dialog[open]").count(), 0);
    await page.locator('header select').selectOption("ko");
    await page.waitForURL(`${baseUrl}/`);
    assert.equal(await page.locator('a[href="tel:050713337114"]').count() > 0, true);
    assert.equal(await page.locator("dialog[open]").count(), 0);
    await checkOverflow(page);
    await page.screenshot({ path: path.join(screenshotDir, "korean-home.png") });
    await page.goto(`${baseUrl}/admin`);
    assert.equal(await page.locator("dialog[open]").count(), 0);
    console.log("PASS first visit, saved preference, Korean return, admin access");

    await page.goto(`${baseUrl}/en`);
    await page.locator('[data-channel="line"]').click();
    assert.equal(await page.locator('textarea[readonly]').count(), 0, "Incomplete form should not generate a message");
    await page.locator('input[name="name"]').fill("Traveller & family");
    await page.locator('select[name="service"]').selectOption({ index: 2 });
    await page.locator('input[name="date"]').fill("2027-01-20");
    await page.locator('input[name="time"]').fill("07:30");
    await page.locator('input[name="passengers"]').fill("3");
    await page.locator('input[name="from"]').fill("Haeundae hotel");
    await page.locator('input[name="to"]').fill("Gimhae Airport international terminal");
    await page.locator('input[name="luggage"]').fill("2 suitcases");
    await page.locator('[data-channel="line"]').click();
    const prepared = await page.locator('textarea[readonly]').inputValue();
    assert(prepared.includes("Gimhae Airport drop-off") && prepared.includes("2027-01-20") && prepared.includes("07:30") && prepared.includes("Traveller & family"));
    assert.equal((await page.evaluate(() => navigator.clipboard.readText())).replace(/\r\n/g, "\n"), prepared);
    let outgoing = "";
    await page.route("https://wa.me/**", async (route) => {
      outgoing = route.request().url();
      await route.fulfill({ status: 200, contentType: "text/html", body: "Message handoff verified; nothing sent." });
    });
    await page.locator('[data-channel="whatsapp"]').click();
    await page.waitForURL("https://wa.me/**");
    assert.equal(new URL(outgoing).searchParams.get("text"), prepared);
    console.log("PASS required fields, localized request, LINE clipboard, WhatsApp message handoff");
    const sitemap = await context.request.get(`${baseUrl}/sitemap.xml`);
    assert.equal(sitemap.status(), 200);
    const xml = await sitemap.text();
    for (const pathname of Object.keys(locales)) assert(xml.includes(`${pathname}</loc>`));
    const background = await context.request.get(`${baseUrl}/busan-international.webp`);
    assert.equal(background.status(), 200);
    assert(background.headers()["content-type"].includes("image/webp"));
    const missing = await context.request.get(`${baseUrl}/fr`);
    assert.equal(missing.status(), 404);
    assert.deepEqual(errors, [], "Browser runtime errors");
    console.log("PASS sitemap, local background image, unsupported locale 404, no runtime errors");
    await context.close();
  } finally {
    await browser.close();
  }
}

run().catch((error) => { console.error(error); process.exitCode = 1; });
