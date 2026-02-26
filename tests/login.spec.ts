import { test } from "./fixture";
import { expect } from "@playwright/test";

test.describe("All Login Tests", () => {
  test("Login succsessfully", async ({ loginPage }) => {
    await loginPage.Login("customer@practicesoftwaretesting.com", "welcome01");

    const pageTitle = loginPage.page.getByRole("heading", {
      name: "My account",
    });
    await expect(pageTitle).toBeVisible();
    await expect(pageTitle).toHaveText("My account");
  });

  test("Login unsuccsessfully(negative test)", async ({ loginPage }) => {
    await loginPage.Login("wrong@test.com", "wrong123");

    const error = loginPage.page.getByText("Invalid email or password");
    await expect(error).toBeVisible();
  });

  test("Blank Space Control", async ({ loginPage }) => {
    await loginPage.Login("", "");

    const emailError = loginPage.page.getByText("Email is required");
    const passwordError = loginPage.page.getByText("Password is required");

    await expect(emailError).toBeVisible();
    await expect(passwordError).toBeVisible();
  });
});
