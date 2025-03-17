import { chromium } from "playwright";

export default async function handler(event: any) {
    console.log("🚀 Playwright function started!");

    try {
        const url = "https://injective-blog.netlify.app";
        const width = 1200;
        const height = 630;
        const format = "jpeg";

        console.log(`🌍 Capturing screenshot for ${url}`);

        const browser = await chromium.launch({
            executablePath: "/usr/bin/chromium",
            headless: true,
        });

        const page = await browser.newPage();
        await page.setViewportSize({ width, height });

        console.log(`🔄 Navigating to ${url}...`);
        await page.goto(url, { waitUntil: "domcontentloaded" });

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
