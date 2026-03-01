import { Locator, Page } from "@playwright/test";

export class ProductPage {
  private readonly page: Page;
  private readonly input: Locator;
  private readonly searchButton: Locator;
  private readonly productHeading: Locator;
  private readonly deleteInput: Locator;
  private readonly filterCheckbox: Locator;

  constructor(page: Page) {
    this.page = page;
    this.input = page.getByPlaceholder("Search");
    this.searchButton = page.getByRole("button", { name: "Search" });
    this.productHeading = page.locator('h5[data-test="product-name"]');
    this.deleteInput = page.getByRole("button", { name: "X" });
    this.filterCheckbox = page.getByRole("checkbox");
  }

  async goto(): Promise<void> {
    await this.page.goto("https://practicesoftwaretesting.com/");
  }

  async searchProduct(productName: string) {
    await this.input.fill(productName);
    await this.searchButton.click();
  }

  async getProductNames(): Promise<string[]> {
    await this.productHeading.first().waitFor({ state: "visible" });
    const names = await this.productHeading.allInnerTexts();
    return names;
  }

  async deleteSearchInput() {
    await this.deleteInput.click();
  }

  async filter(): Promise<{ categoryName: string; productNames: string[] }> {
    const count = await this.filterCheckbox.count();
    const randomIndex = Math.floor(Math.random() * count);
    const selectedCheckbox = this.filterCheckbox.nth(randomIndex);

    const categoryName = (await selectedCheckbox.textContent()) || "";

    await selectedCheckbox.check();

    await this.productHeading.first().waitFor({ state: "visible" });
    const productNames = await this.productHeading.allInnerTexts();

    return { categoryName, productNames };
  }
}
