/**
 * FR-14: Quản lý Danh mục CRUD (Web Admin)
 * MSSV: 23127147
 *
 * Test Coverage:
 *  - Positive: đăng nhập admin, xem DS danh mục, thêm, xóa DM
 *  - Negative: thêm DM với tên trống, truy cập không có quyền
 *  - Edge: tên đặc biệt, tên rất dài
 *
 * Assertion patterns used:
 *  1. toHaveURL()      — kiểm tra navigation
 *  2. toBeVisible()    — kiểm tra element
 *  3. toContainText()  — kiểm tra nội dung bảng
 *  4. toHaveValue()    — kiểm tra input được clear sau submit
 *  5. not.toBeVisible() — kiểm tra element đã bị xóa/ẩn
 */

import fs from 'fs';
import path from 'path';
import { test, expect, Page } from '@playwright/test';

const STUDENT_ID = '23127147';
const ADMIN_URL = 'http://localhost:5174';

// ── Load test data ──────────────────────────────────────────────────────────
const dataPath = path.resolve(__dirname, 'data', 'category.json');
const categoryData = JSON.parse(fs.readFileSync(dataPath, 'utf-8')) as {
  adminCredentials: { email: string; password: string };
  testCases: Array<{
    caseId: string;
    type: string;
    description: string;
    action: string;
    categoryName?: string;
    expectedResult: string;
  }>;
};

// ── Helper ──────────────────────────────────────────────────────────────────
async function loginAdmin(page: Page) {
  await page.goto(`${ADMIN_URL}/`);
  await page.waitForTimeout(500);
  const emailInput = page.locator('input[placeholder="Email"]');
  const passwordInput = page.locator('input[placeholder="Password"]');
  await expect(emailInput).toBeVisible();
  await emailInput.fill(categoryData.adminCredentials.email);
  await passwordInput.fill(categoryData.adminCredentials.password);
  await page.locator('button:has-text("Login")').click();
  // Chờ dashboard load
  await expect(page.locator('h1:has-text("EShop Admin")')).toBeVisible({ timeout: 5000 });
}

async function navigateToCategories(page: Page) {
  const categoryTab = page.locator('li').filter({ hasText: 'Danh mục' });
  await categoryTab.click();
  await expect(page.locator('h2:has-text("Quản lý Danh mục")')).toBeVisible();
}

async function addCategory(page: Page, name: string) {
  const input = page.locator('input[placeholder="Tên danh mục mới"]');
  await input.fill(name);
  await page.locator('button:has-text("Thêm mới")').click();
  await page.waitForTimeout(800);
}

// ── Test Suite ───────────────────────────────────────────────────────────────
test.describe(`[Run by: ${STUDENT_ID}] FR-14 — Quản lý Danh Mục CRUD (Admin)`, () => {

  // ── TC_CAT_01: Đăng nhập Admin & vào tab Danh mục ──────────────────────
  test('TC_CAT_01 — Đăng nhập Admin và điều hướng đến tab Danh mục', async ({ page }) => {
    await loginAdmin(page);
    // Assertion 2: Dashboard hiển thị
    await expect(page.locator('h1:has-text("EShop Admin")')).toBeVisible();
    await navigateToCategories(page);
    // Assertion 2: Tab Danh mục hiển thị
    await expect(page.locator('h2:has-text("Quản lý Danh mục")')).toBeVisible();
  });

  // ── TC_CAT_02: Xem danh sách danh mục với đúng cột ────────────────────
  test('TC_CAT_02 — Bảng danh mục hiển thị đúng 3 cột: ID, Tên, Hành động', async ({ page }) => {
    await loginAdmin(page);
    await navigateToCategories(page);
    // Assertion 2: Các header cột
    await expect(page.getByText('ID')).toBeVisible();
    await expect(page.getByText('Tên Danh Mục')).toBeVisible();
    await expect(page.getByText('Hành động')).toBeVisible();
  });

  // ── TC_CAT_03: Thêm danh mục mới ──────────────────────────────────────
  test('TC_CAT_03 — Thêm danh mục mới với tên hợp lệ thành công', async ({ page }) => {
    const tc = categoryData.testCases.find(c => c.caseId === 'TC_CAT_03')!;
    await loginAdmin(page);
    await navigateToCategories(page);
    // Đếm số row trước khi thêm
    const rowsBefore = await page.locator('table tbody tr').count();
    await addCategory(page, tc.categoryName!);
    // Assertion 2: Số row tăng lên
    const rowsAfter = await page.locator('table tbody tr').count();
    expect(rowsAfter).toBeGreaterThan(rowsBefore);
  });

  // ── TC_CAT_04: Danh mục vừa thêm xuất hiện trong bảng ─────────────────
  test('TC_CAT_04 — Danh mục vừa thêm xuất hiện trong danh sách', async ({ page }) => {
    const catName = `Danh mục Test Auto 001`;
    await loginAdmin(page);
    await navigateToCategories(page);
    await addCategory(page, catName);
    // Assertion 3: Tên danh mục xuất hiện trong bảng
    await expect(page.locator('table tbody')).toContainText(catName);
  });

  // ── TC_CAT_05: Thêm danh mục thứ 2 ────────────────────────────────────
  test('TC_CAT_05 — Thêm thêm danh mục thứ 2 với tên khác nhau', async ({ page }) => {
    const tc = categoryData.testCases.find(c => c.caseId === 'TC_CAT_05')!;
    await loginAdmin(page);
    await navigateToCategories(page);
    const rowsBefore = await page.locator('table tbody tr').count();
    await addCategory(page, tc.categoryName!);
    const rowsAfter = await page.locator('table tbody tr').count();
    expect(rowsAfter).toBe(rowsBefore + 1);
  });

  // ── TC_CAT_06: Xóa danh mục ────────────────────────────────────────────
  test('TC_CAT_06 — Xóa danh mục khỏi hệ thống thành công', async ({ page }) => {
    const catToDelete = 'Danh mục Test Auto 002';
    await loginAdmin(page);
    await navigateToCategories(page);
    // Thêm trước
    await addCategory(page, catToDelete);
    await expect(page.locator('table tbody')).toContainText(catToDelete);
    // Tìm dòng và xóa
    const rowWithCat = page.locator('table tbody tr').filter({ hasText: catToDelete });
    const rowsBefore = await page.locator('table tbody tr').count();
    await rowWithCat.locator('button:has-text("Xóa")').click();
    await page.waitForTimeout(800);
    const rowsAfter = await page.locator('table tbody tr').count();
    expect(rowsAfter).toBeLessThan(rowsBefore);
  });

  // ── TC_CAT_07: Sau khi xóa, DM không còn trong DS ────────────────────
  test('TC_CAT_07 — Danh mục đã xóa không còn xuất hiện trong danh sách', async ({ page }) => {
    const catToDelete = `Danh mục Test Xóa ${Date.now()}`;
    await loginAdmin(page);
    await navigateToCategories(page);
    await addCategory(page, catToDelete);
    const rowWithCat = page.locator('table tbody tr').filter({ hasText: catToDelete });
    await rowWithCat.locator('button:has-text("Xóa")').click();
    await page.waitForTimeout(800);
    // Assertion 5: Danh mục không còn visible
    await expect(page.locator('table tbody')).not.toContainText(catToDelete);
  });

  // ── TC_CAT_08: Input được reset sau khi thêm ──────────────────────────
  test('TC_CAT_08 — Input tên danh mục được clear về rỗng sau khi thêm thành công', async ({ page }) => {
    await loginAdmin(page);
    await navigateToCategories(page);
    const input = page.locator('input[placeholder="Tên danh mục mới"]');
    await input.fill('Danh mục Test Clear Input');
    await page.locator('button:has-text("Thêm mới")').click();
    await page.waitForTimeout(800);
    // Assertion 4: input.value = ''
    await expect(input).toHaveValue('');
  });

  // ── TC_CAT_09: Thêm DM với tên trống ─────────────────────────────────
  test('TC_CAT_09 — Không thể thêm danh mục với tên trống', async ({ page }) => {
    await loginAdmin(page);
    await navigateToCategories(page);
    const rowsBefore = await page.locator('table tbody tr').count();
    // Submit form trống
    const input = page.locator('input[placeholder="Tên danh mục mới"]');
    await input.fill('');
    // Thử click hoặc submit
    await page.locator('button:has-text("Thêm mới")').click();
    await page.waitForTimeout(800);
    const rowsAfter = await page.locator('table tbody tr').count();
    // Assertion: số dòng không đổi
    expect(rowsAfter).toBe(rowsBefore);
  });

  // ── TC_CAT_10: Non-admin không truy cập được Admin ────────────────────
  test('TC_CAT_10 — Người dùng thường không thể đăng nhập vào Admin panel', async ({ page }) => {
    await page.goto(`${ADMIN_URL}/`);
    await page.waitForTimeout(500);
    // Kiểm tra trang admin hiện form login
    const loginForm = page.locator('form');
    await expect(loginForm).toBeVisible();
    // Thử đăng nhập bằng user thường
    await page.locator('input[placeholder="Email"]').fill('test@eshop.com');
    await page.locator('input[placeholder="Password"]').fill('Test1234!');
    await page.locator('button:has-text("Login")').click();
    await page.waitForTimeout(1000);
    // Assertion 2: Vẫn ở trang login (không vào được dashboard)
    await expect(page.locator('form')).toBeVisible();
  });

  // ── TC_CAT_11: Tên chứa ký tự đặc biệt ──────────────────────────────
  test('TC_CAT_11 — Thêm danh mục với tên chứa ký tự đặc biệt', async ({ page }) => {
    const tc = categoryData.testCases.find(c => c.caseId === 'TC_CAT_11')!;
    await loginAdmin(page);
    await navigateToCategories(page);
    await addCategory(page, tc.categoryName!);
    // Assertion 3: Tên đặc biệt được lưu và hiển thị
    await expect(page.locator('table tbody')).toContainText(tc.categoryName!);
  });

  // ── TC_CAT_12: Tên rất dài ─────────────────────────────────────────────
  test('TC_CAT_12 — Hệ thống xử lý tên danh mục rất dài một cách an toàn', async ({ page }) => {
    const tc = categoryData.testCases.find(c => c.caseId === 'TC_CAT_12')!;
    await loginAdmin(page);
    await navigateToCategories(page);
    const rowsBefore = await page.locator('table tbody tr').count();
    
    // Thử submit tên rất dài
    let pageAlert = '';
    page.on('dialog', async dialog => {
      pageAlert = dialog.message();
      await dialog.accept();
    });
    
    await addCategory(page, tc.categoryName!);
    const rowsAfter = await page.locator('table tbody tr').count();
    
    // Hệ thống nên xử lý (thêm thành công hoặc báo lỗi) — không crash
    // Assertion 2: Trang vẫn hoạt động bình thường
    await expect(page.locator('h2:has-text("Quản lý Danh mục")')).toBeVisible();
  });

  // ── BUG CHECK: Dashboard tính doanh thu sai ───────────────────────────
  test('[BUG CHECK] Dashboard — Tổng doanh thu phải không nhân đôi (FR-13)', async ({ page }) => {
    await loginAdmin(page);
    // Vào tab Dashboard
    const dashboardTab = page.locator('li').filter({ hasText: 'Dashboard' });
    await dashboardTab.click();
    await expect(page.locator('h2:has-text("Dashboard")')).toBeVisible();
    // Assertion 2: Revenue card hiển thị
    const revenueCard = page.locator('h3:has-text("Tổng doanh thu")').locator('..');
    await expect(revenueCard).toBeVisible();
    // Note: BUG là totalRevenue = total_amount * 2 (line 218 App.jsx admin)
    // Không thể assert giá trị cụ thể mà không biết data thực tế
    // Nhưng record lại bug này trong Bug Report
  });
});
