import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { ProductPage } from "../pages/ProductPage";

type MyFixture = {
  loginPage: LoginPage;
  productPage: ProductPage;
};

export const test = base.extend<MyFixture>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await use(loginPage);

    console.log("after test");
  },

  productPage: async ({ page }, use) => {
    const productPage = new ProductPage(page);
    productPage.goto();

    await use(productPage);

    productPage.deleteSearchInput;
  },
});
