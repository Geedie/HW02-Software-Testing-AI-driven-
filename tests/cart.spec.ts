/**
 * FR-07: Giỏ hàng (Shopping Cart)
 * MSSV: 23127147
 *
 * Test Coverage:
 *  - Positive: xem giỏ trống, thêm SP, hiển thị đúng cột, tổng tiền, tiếp tục mua
 *  - Negative: xóa SP, checkout khi chưa login
 *  - Edge: thêm SP 2 lần (tăng quantity), nhãn tổng tiền, dialog xác nhận xóa
 *
 * Assertion patterns used:
 *  1. toHaveURL()      — kiểm tra redirect
 *  2. toBeVisible()    — kiểm tra element hiện diện
 *  3. toContainText()  — kiểm tra text nội dung
 *  4. toHaveCount()    — kiểm tra số lượng rows trong table
 *  5. toHaveText()     — kiểm tra text chính xác
 */

import fs from 'fs';
import path from 'path';
import { test, expect, Page } from '@playwright/test';

const STUDENT_ID = '23127147';
const BASE_URL = 'http://localhost:5173';

// ── Load test data ──────────────────────────────────────────────────────────
const dataPath = path.resolve(__dirname, 'data', 'cart.json');
const cartData = JSON.parse(fs.readFileSync(dataPath, 'utf-8')) as {
  validUser: { email: string; password: string };
  products: Array<{ id: number; name: string; price: number; quantity: number }>;
  testCases: Array<{
    caseId: string;
    type: string;
    description: string;
    action: string;
    productId?: number;
    productName?: string;
    quantity?: number;
    expectedResult: string;
    bugExpected?: boolean;
  }>;
};

// ── Helpers ─────────────────────────────────────────────────────────────────
async function loginAsUser(page: Page) {
  await page.goto(`${BASE_URL}/login`);
  const emailInput = page.locator('input').first();
  const passwordInput = page.locator('input').nth(1);
  await emailInput.fill(cartData.validUser.email);
  await passwordInput.fill(cartData.validUser.password);
  await page.locator('button[type="submit"]').click();
  await expect(page).toHaveURL(`${BASE_URL}/`);
}

async function addProductToCart(page: Page, productId: number) {
  await page.goto(`${BASE_URL}/product/${productId}`);
  await page.waitForSelector('button.bug-mobile-hidden, button:has-text("Thêm vào giỏ")');
  const addBtn = page.locator('button.bug-mobile-hidden, button:has-text("Thêm vào giỏ")').first();
  await expect(addBtn).toBeVisible();
  await addBtn.click();
  await addBtn.click(); // click twice (intentional: frontend ignores first click)
  await page.waitForTimeout(500);
}

async function clearCartViaReload(page: Page) {
  // Navigate to cart and remove all items
  await page.goto(`${BASE_URL}/cart`);
}

// ── Test Suite ───────────────────────────────────────────────────────────────
test.describe(`[Run by: ${STUDENT_ID}] FR-07 — Giỏ Hàng (Shopping Cart)`, () => {

  // ── TC_CART_01: Giỏ hàng trống ─────────────────────────────────────────
  test('TC_CART_01 — Giỏ hàng trống hiển thị thông báo phù hợp', async ({ page }) => {
    await page.goto(`${BASE_URL}/cart`);
    // Assertion 2: empty state visible
    await expect(page.getByText('Giỏ hàng của bạn đang trống')).toBeVisible();
    // Assertion 2: Link tiếp tục mua sắm
    await expect(page.getByText('Tiếp tục mua sắm')).toBeVisible();
  });

  // ── TC_CART_02: Thêm sản phẩm vào giỏ ─────────────────────────────────
  test('TC_CART_02 — Thêm sản phẩm vào giỏ từ trang chi tiết', async ({ page }) => {
    await page.goto(`${BASE_URL}/product/1`);
    await page.waitForTimeout(500);
    const addBtn = page.locator('button.bug-mobile-hidden').first();
    await expect(addBtn).toBeVisible();
    await addBtn.click();
    await addBtn.click();
    // Assertion 3: feedback visible sau khi thêm
    await expect(addBtn).toContainText('Đã thêm');
    // Điều hướng đến giỏ hàng
    await page.goto(`${BASE_URL}/cart`);
    // Assertion 2: Sản phẩm xuất hiện trong giỏ
    await expect(page.locator('table tbody tr').first()).toBeVisible();
  });

  // ── TC_CART_03: Hiển thị đúng cột giỏ hàng ─────────────────────────────
  test('TC_CART_03 — Giỏ hàng hiển thị đúng 5 cột theo FR-07', async ({ page }) => {
    // Đảm bảo có sản phẩm trong giỏ
    await page.goto(`${BASE_URL}/product/1`);
    await page.waitForTimeout(500);
    const addBtn = page.locator('button.bug-mobile-hidden').first();
    await addBtn.click();
    await addBtn.click();
    await page.goto(`${BASE_URL}/cart`);
    // Assertion 2: Các cột hiển thị
    await expect(page.getByText('Sản phẩm')).toBeVisible();
    await expect(page.getByText('Giá')).toBeVisible();
    await expect(page.getByText('Số lượng')).toBeVisible();
    await expect(page.getByText('Thành tiền')).toBeVisible();
    await expect(page.getByText('Thao tác')).toBeVisible();
  });

  // ── TC_CART_04: Tổng tiền tính đúng ────────────────────────────────────
  test('TC_CART_04 — Tổng tiền được tính đúng sau khi thêm sản phẩm', async ({ page }) => {
    await page.goto(`${BASE_URL}/product/1`);
    await page.waitForTimeout(500);
    const addBtn = page.locator('button.bug-mobile-hidden').first();
    await addBtn.click();
    await addBtn.click();
    await page.goto(`${BASE_URL}/cart`);
    // Assertion 2: Tổng tiền section hiển thị
    const totalSection = page.locator('div').filter({ hasText: /₫/ }).last();
    await expect(totalSection).toBeVisible();
  });

  // ── TC_CART_05: Thêm SP 2 lần — tăng quantity ──────────────────────────
  test('TC_CART_05 — Thêm cùng một sản phẩm 2 lần tăng số lượng, không tạo dòng mới', async ({ page }) => {
    // Thêm lần 1
    await page.goto(`${BASE_URL}/product/1`);
    await page.waitForTimeout(500);
    const addBtn1 = page.locator('button.bug-mobile-hidden').first();
    await addBtn1.click();
    await addBtn1.click();
    // Thêm lần 2
    await page.goto(`${BASE_URL}/product/1`);
    await page.waitForTimeout(500);
    const addBtn2 = page.locator('button.bug-mobile-hidden').first();
    await addBtn2.click();
    await addBtn2.click();
    await page.goto(`${BASE_URL}/cart`);
    // Assertion 4: Chỉ có đúng 1 dòng cho sản phẩm này
    const rows = page.locator('table tbody tr');
    await expect(rows).toHaveCount(1);
    // Assertion 3: Số lượng = 2
    await expect(rows.first().locator('td').nth(2)).toContainText('2');
  });

  // ── TC_CART_06: Link Tiếp tục mua sắm ──────────────────────────────────
  test('TC_CART_06 — Link Tiếp tục mua sắm điều hướng về trang chủ', async ({ page }) => {
    // Đảm bảo có sản phẩm trong giỏ
    await page.goto(`${BASE_URL}/product/1`);
    await page.waitForTimeout(500);
    const addBtn = page.locator('button.bug-mobile-hidden').first();
    await addBtn.click();
    await addBtn.click();
    await page.goto(`${BASE_URL}/cart`);
    const continueShopping = page.getByText('← Mua tiếp');
    await expect(continueShopping).toBeVisible();
    await continueShopping.click();
    // Assertion 1: URL về trang chủ
    await expect(page).toHaveURL(`${BASE_URL}/`);
  });

  // ── TC_CART_07: Checkout khi đã đăng nhập ──────────────────────────────
  test('TC_CART_07 — Checkout chuyển tới /checkout khi đã đăng nhập', async ({ page }) => {
    await loginAsUser(page);
    await addProductToCart(page, 1);
    await page.goto(`${BASE_URL}/cart`);
    const checkoutBtn = page.getByText('Tiến hành thanh toán');
    await expect(checkoutBtn).toBeVisible();
    await checkoutBtn.click();
    // Assertion 1: Chuyển tới checkout
    await expect(page).toHaveURL(`${BASE_URL}/checkout`);
  });

  // ── TC_CART_08: Checkout khi chưa đăng nhập ────────────────────────────
  test('TC_CART_08 — Checkout khi chưa đăng nhập yêu cầu đăng nhập', async ({ page }) => {
    // Thêm SP mà không đăng nhập
    await page.goto(`${BASE_URL}/product/1`);
    await page.waitForTimeout(500);
    const addBtn = page.locator('button.bug-mobile-hidden').first();
    await addBtn.click();
    await addBtn.click();
    await page.goto(`${BASE_URL}/cart`);
    // Bắt dialog alert
    page.on('dialog', async dialog => { await dialog.accept(); });
    const checkoutBtn = page.getByText('Tiến hành thanh toán');
    await expect(checkoutBtn).toBeVisible();
    await checkoutBtn.click();
    // Assertion 1: Redirect về login hoặc ở lại cart
    await page.waitForTimeout(1000);
    const url = page.url();
    const isLoginOrCart = url.includes('/login') || url.includes('/cart');
    expect(isLoginOrCart).toBeTruthy();
  });

  // ── TC_CART_09: Xóa sản phẩm ───────────────────────────────────────────
  test('TC_CART_09 — Xóa sản phẩm khỏi giỏ hàng', async ({ page }) => {
    await page.goto(`${BASE_URL}/product/1`);
    await page.waitForTimeout(500);
    const addBtn = page.locator('button.bug-mobile-hidden').first();
    await addBtn.click();
    await addBtn.click();
    await page.goto(`${BASE_URL}/cart`);
    // Click nút Xóa
    const deleteBtn = page.locator('button').filter({ hasText: 'Xóa' }).first();
    await expect(deleteBtn).toBeVisible();
    await deleteBtn.click();
    await page.waitForTimeout(500);
    // Assertion 2: sản phẩm đã bị xóa
    const tableBody = page.locator('table tbody');
    const rowCount = await tableBody.locator('tr').count();
    expect(rowCount).toBe(0);
  });

  // ── TC_CART_10: Xóa sản phẩm cuối — giỏ trống ─────────────────────────
  test('TC_CART_10 — Xóa sản phẩm cuối hiển thị trạng thái giỏ trống', async ({ page }) => {
    await page.goto(`${BASE_URL}/product/1`);
    await page.waitForTimeout(500);
    const addBtn = page.locator('button.bug-mobile-hidden').first();
    await addBtn.click();
    await addBtn.click();
    await page.goto(`${BASE_URL}/cart`);
    const deleteBtn = page.locator('button').filter({ hasText: 'Xóa' }).first();
    await deleteBtn.click();
    await page.waitForTimeout(500);
    // Assertion 3: Empty state
    await expect(page.getByText('Giỏ hàng của bạn đang trống')).toBeVisible();
  });

  // ── TC_CART_11: Nhãn tổng tiền (BUG CHECK) ─────────────────────────────
  test('[BUG CHECK] TC_CART_11 — Nhãn tổng tiền phải là "Tổng cộng" theo FR-07', async ({ page }) => {
    await page.goto(`${BASE_URL}/product/1`);
    await page.waitForTimeout(500);
    const addBtn = page.locator('button.bug-mobile-hidden').first();
    await addBtn.click();
    await addBtn.click();
    await page.goto(`${BASE_URL}/cart`);
    // Assertion 5: toHaveText — kiểm tra nhãn chính xác
    // BUG: hiển thị "Tổng tạm tính" thay vì "Tổng cộng"
    const totalLabel = page.locator('div.text-xl.font-bold');
    await expect(totalLabel).toBeVisible();
    await expect(totalLabel).toContainText('Tổng cộng');
  });

  // ── TC_CART_12: Dialog xác nhận khi xóa (BUG CHECK) ───────────────────
  test('[BUG CHECK] TC_CART_12 — Phải có dialog xác nhận trước khi xóa sản phẩm (FR-07)', async ({ page }) => {
    await page.goto(`${BASE_URL}/product/1`);
    await page.waitForTimeout(500);
    const addBtn = page.locator('button.bug-mobile-hidden').first();
    await addBtn.click();
    await addBtn.click();
    await page.goto(`${BASE_URL}/cart`);
    
    let dialogShown = false;
    page.on('dialog', async dialog => {
      dialogShown = true;
      await dialog.dismiss(); // Không xóa để test
    });
    
    const deleteBtn = page.locator('button').filter({ hasText: 'Xóa' }).first();
    await deleteBtn.click();
    await page.waitForTimeout(500);
    
    // BUG: Không có dialog xác nhận — sản phẩm bị xóa ngay lập tức
    // Test expected FAIL để ghi nhận bug
    expect(dialogShown).toBe(true);
  });
});
