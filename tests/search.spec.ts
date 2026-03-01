import { expect } from "@playwright/test";
import { test } from "./fixture";

test("search", async ({ productPage }) => {
  await productPage.searchProduct("Hammer");

  const names = await productPage.getProductNames();
  expect(names.length).toBeGreaterThan(0);
  console.log(names.length);
  for (const name of names) {
    console.log(`the name of element: ${name}`);
  }
});

test("filter", async ({ productPage }) => {
  const { categoryName, productNames } = await productPage.filter();

  console.log(`Seçilen Kategori: ${categoryName}`);

  expect(productNames.length).toBeGreaterThan(0);

  for (const name of productNames) {
    console.log(`Gelen Ürün: ${name}`);
  }
});
