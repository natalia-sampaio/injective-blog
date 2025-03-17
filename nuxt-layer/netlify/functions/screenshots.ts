import puppeteer from "puppeteer-core";
import chrome from "@sparticuz/chromium";

export default async function handler(event: any) {
    console.log("🚀 Function started!");

    try {
        // 🔹 Hardcoded URL
        const urlParam = "https://injective-blog.netlify.app";
        console.log("🌍 Using Hardcoded URL:", urlParam);

        const width = 1200;
        const height = 630;
        const format = "jpeg"; // Supports jpeg, png, webp

        console.log(
            `📸 Generating screenshot for: ${urlParam} | ${width}x${height} | ${format}`
        );

        // 🚀 Launch Puppeteer
        const browser = await puppeteer.launch({
            args: chrome.args,
            executablePath: await chrome.executablePath(),
            headless: chrome.headless,
        });

        console.log("✅ Puppeteer Launched!");
        const page = await browser.newPage();
        await page.setViewport({ width, height });

        console.log(`🔄 Navigating to ${urlParam}...`);
        await page.goto(urlParam, { waitUntil: "domcontentloaded" });

        console.log("📷 Taking Screenshot...");
        const screenshot = await page.screenshot({ type: format });

        await browser.close();
        console.log("✅ Screenshot Taken Successfully!");

        return new Response(screenshot, {
            headers: {
                "Content-Type": `image/${format}`,
                "Cache-Control": "public, max-age=3600",
            },
        });
    } catch (error) {
        console.error("❌ ERROR: ", error);

        return new Response(
            JSON.stringify({
                error: `Failed to generate screenshot: ${error.message}`,
            }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}
