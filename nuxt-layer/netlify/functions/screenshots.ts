import puppeteer from "puppeteer-core";
import chrome from "@sparticuz/chromium";

export default async function handler(event: any, context: any) {
    try {
        const queryParams = new URL(event.rawUrl).searchParams;
        const url =
            queryParams.get("url") || "https://injective-blog.netlify.app/";
        const width = parseInt(queryParams.get("width") || "1200", 10);
        const height = parseInt(queryParams.get("height") || "630", 10);
        const format = queryParams.get("format") || "jpeg"; // Supports jpeg, png, webp

        console.log(`📸 Generating screenshot for: ${url}`);

        // Launch Puppeteer with Chromium
        const browser = await puppeteer.launch({
            args: chrome.args,
            executablePath: await chrome.executablePath(),
            headless: chrome.headless,
            defaultViewport: null,
        });

        const page = await browser.newPage();
        await page.setViewport({ width, height });

        await page.goto(url, { waitUntil: "domcontentloaded" });

        // Generate screenshot
        const screenshot = await page.screenshot({ type: format });

        await browser.close();

        return {
            statusCode: 200,
            headers: {
                "Content-Type": `image/${format}`,
                "Cache-Control":
                    "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
            },
            body: screenshot.toString("base64"),
            isBase64Encoded: true, // Important for Netlify Functions
        };
    } catch (error) {
        console.error("❌ Error generating OG image:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to generate screenshot" }),
        };
    }
}
