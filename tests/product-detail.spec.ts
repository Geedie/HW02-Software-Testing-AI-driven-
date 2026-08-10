import fs from 'fs';
import path from 'path';
import { test, expect } from '@playwright/test';

// 1. Khai báo thông tin sinh viên
const STUDENT_ID = "23127147"; // Thay bằng MSSV thực tế của bạn

type ProductDetailCase = {
  caseId?: string; // Có thể thêm ID nếu trong JSON có
  query: string;
  expectedName: string;
  expectedId: number;
};

const dataPath = path.resolve(__dirname, 'data', 'product-detail.json');
const productCases = JSON.parse(fs.readFileSync(dataPath, 'utf-8')) as ProductDetailCase[];

// 2. Đưa MSSV vào tên describe block
test.describe(`[Run by: ${STUDENT_ID}] EShop product search and detail`, () => {
  
  for (const [index, item] of productCases.entries()) {
    const caseTitle = item.caseId || `TC0${index + 1}`;
    
    test(`${caseTitle} - searches for ${item.query} and opens detail for ${item.expectedName}`, async ({ page }) => {
      // Step 1: Nav & UI Initial check
      await page.goto('/');
      await expect(page.getByRole('heading', { name: 'Danh sách sản phẩm' })).toBeVisible();
      await expect(page.getByPlaceholder('Tìm kiếm...')).toBeVisible();

      // Step 2: Search action
      await page.getByPlaceholder('Tìm kiếm...').fill(item.query);
      await page.getByRole('button', { name: 'Tìm' }).click();

      // Step 3: Assert search result
      await expect(page.getByText('Kết quả tìm kiếm cho:', { exact: false })).toContainText(item.query);

      // Ensure the expected product name is visible in results
      await expect(page.getByText(item.expectedName, { exact: false })).toBeVisible();

      // Open product detail directly (more stable than clicking the card link)
      await page.goto(`/product/${item.expectedId}`);

      // Step 4: Detail page assertions
      await expect(page).toHaveURL(new RegExp(`/product/${item.expectedId}$`));
      await expect(page.getByRole('heading', { name: item.expectedName })).toBeVisible();

      const quantityInput = page.locator('input[type="number"]');
      await expect(quantityInput).toBeVisible();
      await expect(quantityInput).toHaveValue('1');

      // Step 5: Add to cart assertion (use stable class selector on detail page)
      const addButton = page.locator('button.bug-mobile-hidden').first();
      await expect(addButton).toBeVisible();

      // The frontend intentionally ignores the first click; click twice
      await addButton.click();
      await addButton.click();
      await expect(addButton).toHaveText('Đã thêm', { timeout: 5000 });
    });
  }
});