import puppeteer from "puppeteer-core";
import chrome from "@sparticuz/chromium";

export default async function handler(event: any) {
    try {
        const queryParams = new URL(event.rawUrl).searchParams;
        const url =
            queryParams.get("url") || "https://injective-blog.netlify.app";
        const width = parseInt(queryParams.get("width") || "1200", 10);
        const height = parseInt(queryParams.get("height") || "630", 10);
        const format = queryParams.get("format") || "jpeg"; // jpeg, png, webp

        console.log(`📸 Generating screenshot for: ${url}`);

        const browser = await puppeteer.launch({
            args: chrome.args,
            executablePath: await chrome.executablePath(),
            headless: chrome.headless,
        });

        const page = await browser.newPage();
        await page.setViewport({ width, height });

        await page.goto(url, { waitUntil: "domcontentloaded" });

        // Generate screenshot
        const screenshot = await page.screenshot({ type: format });

        await browser.close();

        // ✅ Return a proper Response object (Fix for Netlify)
        return new Response(screenshot, {
            headers: {
                "Content-Type": `image/${format}`,
                "Cache-Control": "public, max-age=3600",
            },
        });
    } catch (error) {
        console.error("❌ Error generating OG image:", error);

        return new Response(
            JSON.stringify({ error: "Failed to generate screenshot" }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}
