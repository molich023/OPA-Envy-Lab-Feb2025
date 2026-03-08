import asyncio
from playwright.async_api import async_playwright

async def run_verification():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Navigate to the app
        await page.goto("http://localhost:5173")
        await asyncio.sleep(3)  # Wait for splash

        # Take splash screenshot
        await page.screenshot(path="/home/jules/verification/final_splash.png")

        # Check if we are on Register or Login (depends on state)
        if await page.get_by_text("Join Hatua").is_visible():
            # Go to login
            await page.get_by_role("button", name="Login").click()

        # Login
        await page.get_by_placeholder("eliud@run.ke").fill("test@hatua.ke")
        await page.get_by_placeholder("••••••••").fill("password123")
        await page.get_by_role("button", name="LOG IN").click()
        await asyncio.sleep(1)

        # OTP
        await page.get_by_placeholder("000000").fill("123456")
        await page.get_by_role("button", name="VERIFY NOW").click()
        await asyncio.sleep(1)

        # Main Activity Screen
        await page.screenshot(path="/home/jules/verification/final_activity.png")

        # Map Screen
        await page.locator(".nav-item").nth(1).click()
        await asyncio.sleep(1)
        await page.screenshot(path="/home/jules/verification/final_map.png")

        # Security Panel (from map)
        await page.locator(".map-placeholder >> .lucide-shield-check").click()
        await asyncio.sleep(1)
        await page.screenshot(path="/home/jules/verification/final_security.png")
        await page.get_by_role("button", name="Close").click()

        # Rankings Screen
        await page.locator(".nav-item").nth(3).click()
        await asyncio.sleep(1)
        await page.screenshot(path="/home/jules/verification/final_rankings.png")

        # Rewards Screen
        await page.locator(".nav-item").nth(4).click()
        await asyncio.sleep(1)
        await page.screenshot(path="/home/jules/verification/final_rewards.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run_verification())
