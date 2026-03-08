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
        await page.screenshot(path="/home/jules/verification/v4_splash.png")

        # Register a new user
        if await page.get_by_text("Join Hatua").is_visible():
            await page.get_by_placeholder("e.g. Eliud Kipchoge").fill("Eliud Test")
            await page.get_by_placeholder("eliud@run.ke").fill("eliud_v4@test.ke")
            await page.get_by_placeholder("0712 345 678").fill("0712345678")
            await page.get_by_placeholder("Min 8 characters").fill("Password123!")
            await page.get_by_role("button", name="REGISTER").click()
            await asyncio.sleep(1)

        # Login
        await page.get_by_placeholder("eliud@run.ke").fill("eliud_v4@test.ke")
        await page.get_by_placeholder("••••••••").fill("Password123!")
        await page.get_by_role("button", name="LOG IN").click()
        await asyncio.sleep(1)

        # OTP
        await page.get_by_placeholder("000000").fill("123456")
        await page.get_by_role("button", name="VERIFY NOW").click()
        await asyncio.sleep(1)

        # Activity Screen - Start Tracking
        await page.get_by_role("button", name="START TRACKING").click()
        await asyncio.sleep(5) # "Walk" for 5 seconds
        await page.get_by_role("button", name="STOP").click()
        await page.screenshot(path="/home/jules/verification/v4_activity_after_sync.png")

        # Map Screen (Leaflet)
        await page.locator(".nav-item").nth(1).click()
        await asyncio.sleep(2) # Wait for Leaflet to load tiles
        await page.screenshot(path="/home/jules/verification/v4_map_leaflet.png")

        # Rankings Screen (from backend)
        await page.locator(".nav-item").nth(3).click()
        await asyncio.sleep(1)
        await page.screenshot(path="/home/jules/verification/v4_leaderboard_from_backend.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run_verification())
