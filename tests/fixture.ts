import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/login";

type MyFixture = {
  loginPage: LoginPage;
};

export const test = base.extend<MyFixture>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await use(loginPage);

    console.log("after test");
  },
});
