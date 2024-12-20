import { test, expect } from "@playwright/test";

test.describe("Login Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:8080");
  });

  test("Login success", async ({ page }) => {
    await page.fill("#username", "user");
    await page.fill("#password", "password");

    await page.click('button[type="submit"]');

    const message = await page.locator("#message");
    await expect(message).toHaveText("login success");
    await expect(message).toHaveClass("success");
  });

  test("Login failed when username or password wrong", async ({ page }) => {
    await page.fill("#username", "user");
    await page.fill("#password", "password1");
    await page.click('button[type="submit"]');

    const message = await page.locator("#message");
    await expect(message).toHaveText("login failed1");
    await expect(message).toHaveClass("error");
  });

  test("Login form required fields", async ({ page }) => {
    await expect(page.locator("#username")).toHaveAttribute("required", "");
    await expect(page.locator("#password")).toHaveAttribute("required", "");
  });

  test("Password must be password type", async ({ page }) => {
    await expect(page.locator("#password")).toHaveAttribute("type", "password");
  });
});
