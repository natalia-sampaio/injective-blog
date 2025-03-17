
import {createRequire as ___nfyCreateRequire} from "module";
import {fileURLToPath as ___nfyFileURLToPath} from "url";
import {dirname as ___nfyPathDirname} from "path";
let __filename=___nfyFileURLToPath(import.meta.url);
let __dirname=___nfyPathDirname(___nfyFileURLToPath(import.meta.url));
let require=___nfyCreateRequire(import.meta.url);


// netlify/functions/screenshots.ts
import puppeteer from "puppeteer-core";
import chrome from "@sparticuz/chromium";
async function handler(event, context) {
  try {
    const queryParams = new URL(event.rawUrl).searchParams;
    const url = queryParams.get("url") || "https://injective-blog.netlify.app/";
    const width = parseInt(queryParams.get("width") || "1200", 10);
    const height = parseInt(queryParams.get("height") || "630", 10);
    const format = queryParams.get("format") || "jpeg";
    console.log(`\u{1F4F8} Generating screenshot for: ${url}`);
    const browser = await puppeteer.launch({
      args: chrome.args,
      executablePath: await chrome.executablePath(),
      headless: chrome.headless,
      defaultViewport: null
    });
    const page = await browser.newPage();
    await page.setViewport({ width, height });
    await page.goto(url, { waitUntil: "domcontentloaded" });
    const screenshot = await page.screenshot({ type: format });
    await browser.close();
    return {
      statusCode: 200,
      headers: {
        "Content-Type": `image/${format}`,
        "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400"
      },
      body: screenshot.toString("base64"),
      isBase64Encoded: true
      // Important for Netlify Functions
    };
  } catch (error) {
    console.error("\u274C Error generating OG image:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to generate screenshot" })
    };
  }
}
export {
  handler as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibmV0bGlmeS9mdW5jdGlvbnMvc2NyZWVuc2hvdHMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBwdXBwZXRlZXIgZnJvbSBcInB1cHBldGVlci1jb3JlXCI7XG5pbXBvcnQgY2hyb21lIGZyb20gXCJAc3BhcnRpY3V6L2Nocm9taXVtXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZXIoZXZlbnQ6IGFueSwgY29udGV4dDogYW55KSB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcXVlcnlQYXJhbXMgPSBuZXcgVVJMKGV2ZW50LnJhd1VybCkuc2VhcmNoUGFyYW1zO1xuICAgICAgICBjb25zdCB1cmwgPVxuICAgICAgICAgICAgcXVlcnlQYXJhbXMuZ2V0KFwidXJsXCIpIHx8IFwiaHR0cHM6Ly9pbmplY3RpdmUtYmxvZy5uZXRsaWZ5LmFwcC9cIjtcbiAgICAgICAgY29uc3Qgd2lkdGggPSBwYXJzZUludChxdWVyeVBhcmFtcy5nZXQoXCJ3aWR0aFwiKSB8fCBcIjEyMDBcIiwgMTApO1xuICAgICAgICBjb25zdCBoZWlnaHQgPSBwYXJzZUludChxdWVyeVBhcmFtcy5nZXQoXCJoZWlnaHRcIikgfHwgXCI2MzBcIiwgMTApO1xuICAgICAgICBjb25zdCBmb3JtYXQgPSBxdWVyeVBhcmFtcy5nZXQoXCJmb3JtYXRcIikgfHwgXCJqcGVnXCI7IC8vIFN1cHBvcnRzIGpwZWcsIHBuZywgd2VicFxuXG4gICAgICAgIGNvbnNvbGUubG9nKGBcdUQ4M0RcdURDRjggR2VuZXJhdGluZyBzY3JlZW5zaG90IGZvcjogJHt1cmx9YCk7XG5cbiAgICAgICAgLy8gTGF1bmNoIFB1cHBldGVlciB3aXRoIENocm9taXVtXG4gICAgICAgIGNvbnN0IGJyb3dzZXIgPSBhd2FpdCBwdXBwZXRlZXIubGF1bmNoKHtcbiAgICAgICAgICAgIGFyZ3M6IGNocm9tZS5hcmdzLFxuICAgICAgICAgICAgZXhlY3V0YWJsZVBhdGg6IGF3YWl0IGNocm9tZS5leGVjdXRhYmxlUGF0aCgpLFxuICAgICAgICAgICAgaGVhZGxlc3M6IGNocm9tZS5oZWFkbGVzcyxcbiAgICAgICAgICAgIGRlZmF1bHRWaWV3cG9ydDogbnVsbCxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgcGFnZSA9IGF3YWl0IGJyb3dzZXIubmV3UGFnZSgpO1xuICAgICAgICBhd2FpdCBwYWdlLnNldFZpZXdwb3J0KHsgd2lkdGgsIGhlaWdodCB9KTtcblxuICAgICAgICBhd2FpdCBwYWdlLmdvdG8odXJsLCB7IHdhaXRVbnRpbDogXCJkb21jb250ZW50bG9hZGVkXCIgfSk7XG5cbiAgICAgICAgLy8gR2VuZXJhdGUgc2NyZWVuc2hvdFxuICAgICAgICBjb25zdCBzY3JlZW5zaG90ID0gYXdhaXQgcGFnZS5zY3JlZW5zaG90KHsgdHlwZTogZm9ybWF0IH0pO1xuXG4gICAgICAgIGF3YWl0IGJyb3dzZXIuY2xvc2UoKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IGBpbWFnZS8ke2Zvcm1hdH1gLFxuICAgICAgICAgICAgICAgIFwiQ2FjaGUtQ29udHJvbFwiOlxuICAgICAgICAgICAgICAgICAgICBcInB1YmxpYywgbWF4LWFnZT0zNjAwLCBzLW1heGFnZT0zNjAwLCBzdGFsZS13aGlsZS1yZXZhbGlkYXRlPTg2NDAwXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYm9keTogc2NyZWVuc2hvdC50b1N0cmluZyhcImJhc2U2NFwiKSxcbiAgICAgICAgICAgIGlzQmFzZTY0RW5jb2RlZDogdHJ1ZSwgLy8gSW1wb3J0YW50IGZvciBOZXRsaWZ5IEZ1bmN0aW9uc1xuICAgICAgICB9O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJcdTI3NEMgRXJyb3IgZ2VuZXJhdGluZyBPRyBpbWFnZTpcIiwgZXJyb3IpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3RhdHVzQ29kZTogNTAwLFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBlcnJvcjogXCJGYWlsZWQgdG8gZ2VuZXJhdGUgc2NyZWVuc2hvdFwiIH0pLFxuICAgICAgICB9O1xuICAgIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7QUFBQSxPQUFPLGVBQWU7QUFDdEIsT0FBTyxZQUFZO0FBRW5CLGVBQU8sUUFBK0IsT0FBWSxTQUFjO0FBQzVELE1BQUk7QUFDQSxVQUFNLGNBQWMsSUFBSSxJQUFJLE1BQU0sTUFBTSxFQUFFO0FBQzFDLFVBQU0sTUFDRixZQUFZLElBQUksS0FBSyxLQUFLO0FBQzlCLFVBQU0sUUFBUSxTQUFTLFlBQVksSUFBSSxPQUFPLEtBQUssUUFBUSxFQUFFO0FBQzdELFVBQU0sU0FBUyxTQUFTLFlBQVksSUFBSSxRQUFRLEtBQUssT0FBTyxFQUFFO0FBQzlELFVBQU0sU0FBUyxZQUFZLElBQUksUUFBUSxLQUFLO0FBRTVDLFlBQVEsSUFBSSx3Q0FBaUMsR0FBRyxFQUFFO0FBR2xELFVBQU0sVUFBVSxNQUFNLFVBQVUsT0FBTztBQUFBLE1BQ25DLE1BQU0sT0FBTztBQUFBLE1BQ2IsZ0JBQWdCLE1BQU0sT0FBTyxlQUFlO0FBQUEsTUFDNUMsVUFBVSxPQUFPO0FBQUEsTUFDakIsaUJBQWlCO0FBQUEsSUFDckIsQ0FBQztBQUVELFVBQU0sT0FBTyxNQUFNLFFBQVEsUUFBUTtBQUNuQyxVQUFNLEtBQUssWUFBWSxFQUFFLE9BQU8sT0FBTyxDQUFDO0FBRXhDLFVBQU0sS0FBSyxLQUFLLEtBQUssRUFBRSxXQUFXLG1CQUFtQixDQUFDO0FBR3RELFVBQU0sYUFBYSxNQUFNLEtBQUssV0FBVyxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBRXpELFVBQU0sUUFBUSxNQUFNO0FBRXBCLFdBQU87QUFBQSxNQUNILFlBQVk7QUFBQSxNQUNaLFNBQVM7QUFBQSxRQUNMLGdCQUFnQixTQUFTLE1BQU07QUFBQSxRQUMvQixpQkFDSTtBQUFBLE1BQ1I7QUFBQSxNQUNBLE1BQU0sV0FBVyxTQUFTLFFBQVE7QUFBQSxNQUNsQyxpQkFBaUI7QUFBQTtBQUFBLElBQ3JCO0FBQUEsRUFDSixTQUFTLE9BQU87QUFDWixZQUFRLE1BQU0scUNBQWdDLEtBQUs7QUFDbkQsV0FBTztBQUFBLE1BQ0gsWUFBWTtBQUFBLE1BQ1osTUFBTSxLQUFLLFVBQVUsRUFBRSxPQUFPLGdDQUFnQyxDQUFDO0FBQUEsSUFDbkU7QUFBQSxFQUNKO0FBQ0o7IiwKICAibmFtZXMiOiBbXQp9Cg==
