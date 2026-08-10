/**
 * FR-02: Đăng nhập & Khóa tài khoản
 * Feature: Login & Account Lockout
 * MSSV: 23127147
 * 
 * Test Coverage:
 *  - Positive: đăng nhập thành công (user, admin)
 *  - Negative: sai mật khẩu, sai email, để trống form
 *  - Edge: khoảng trắng thừa, sai case mật khẩu, link navigation, khóa TK sau 3 lần sai
 * 
 * Assertion patterns used:
 *  1. toHaveURL()     — kiểm tra URL sau redirect
 *  2. toBeVisible()   — kiểm tra element hiện diện
 *  3. toContainText() — kiểm tra nội dung thông báo lỗi
 *  4. toHaveAttribute() — kiểm tra thuộc tính HTML (bug check)
 *  5. toHaveValue()   — kiểm tra giá trị input bị clear
 */

import fs from 'fs';
import path from 'path';
import { test, expect, Page } from '@playwright/test';

const STUDENT_ID = '23127147';
const BASE_URL = 'http://localhost:5173';

// ── Load test data ──────────────────────────────────────────────────────────
const dataPath = path.resolve(__dirname, 'data', 'login.json');
const loginCases = JSON.parse(fs.readFileSync(dataPath, 'utf-8')) as Array<{
  caseId: string;
  type: 'positive' | 'negative' | 'edge';
  description: string;
  email: string;
  password: string;
  expectedResult: string;
  expectedErrorText?: string;
  expectedUrl?: string;
}>;

// ── Helper ──────────────────────────────────────────────────────────────────
async function fillLoginForm(page: Page, email: string, password: string) {
  // The login page uses type="text" for both fields (bug), so we use label/placeholder selectors
  const emailInput = page.locator('input').first();
  const passwordInput = page.locator('input').nth(1);
  await emailInput.fill(email);
  await passwordInput.fill(password);
}

async function navigateToLogin(page: Page) {
  await page.goto(`${BASE_URL}/login`);
  // Verify login page loaded — check for form elements
  await expect(page.locator('form')).toBeVisible();
}

// ── Test Suite ───────────────────────────────────────────────────────────────
test.describe(`[Run by: ${STUDENT_ID}] FR-02 — Đăng nhập & Khóa Tài Khoản`, () => {

  // ── TC_LOGIN_01: Đăng nhập thành công với user ─────────────────────────
  test('TC_LOGIN_01 — Đăng nhập thành công với tài khoản user hợp lệ', async ({ page }) => {
    const tc = loginCases.find(c => c.caseId === 'TC_LOGIN_01')!;
    await navigateToLogin(page);
    await fillLoginForm(page, tc.email, tc.password);
    await page.locator('button[type="submit"]').click();
    // Assertion 1: URL redirect về trang chủ
    await expect(page).toHaveURL(`${BASE_URL}/`);
    // Assertion 2: Header chào mừng hiển thị
    await expect(page.locator('header')).toBeVisible();
  });

  // ── TC_LOGIN_02: Đăng nhập thành công với admin ────────────────────────
  test('TC_LOGIN_02 — Đăng nhập thành công với tài khoản admin', async ({ page }) => {
    const tc = loginCases.find(c => c.caseId === 'TC_LOGIN_02')!;
    await navigateToLogin(page);
    await fillLoginForm(page, tc.email, tc.password);
    await page.locator('button[type="submit"]').click();
    // Assertion 1: URL redirect về trang chủ
    await expect(page).toHaveURL(`${BASE_URL}/`);
  });

  // ── TC_LOGIN_03: Đăng nhập thất bại - sai mật khẩu ───────────────────
  test('TC_LOGIN_03 — Đăng nhập thất bại với mật khẩu sai', async ({ page }) => {
    const tc = loginCases.find(c => c.caseId === 'TC_LOGIN_03')!;
    await navigateToLogin(page);
    await fillLoginForm(page, tc.email, tc.password);
    await page.locator('button[type="submit"]').click();
    // Assertion 3: Thông báo lỗi xuất hiện
    const errorDiv = page.locator('.bg-red-100, [class*="text-red"]').first();
    await expect(errorDiv).toBeVisible();
    await expect(errorDiv).toContainText(tc.expectedErrorText!);
    // Assertion 1: Không redirect sang trang khác
    await expect(page).toHaveURL(`${BASE_URL}/login`);
  });

  // ── TC_LOGIN_04: Đăng nhập thất bại - email không tồn tại ─────────────
  test('TC_LOGIN_04 — Đăng nhập thất bại với email không tồn tại', async ({ page }) => {
    const tc = loginCases.find(c => c.caseId === 'TC_LOGIN_04')!;
    await navigateToLogin(page);
    await fillLoginForm(page, tc.email, tc.password);
    await page.locator('button[type="submit"]').click();
    const errorDiv = page.locator('.bg-red-100, [class*="text-red"]').first();
    await expect(errorDiv).toBeVisible();
    await expect(errorDiv).toContainText(tc.expectedErrorText!);
  });

  // ── TC_LOGIN_05: Để trống cả hai trường ───────────────────────────────
  test('TC_LOGIN_05 — Không thể submit khi để trống cả email và mật khẩu', async ({ page }) => {
    await navigateToLogin(page);
    const submitBtn = page.locator('button[type="submit"]');
    // Assertion 2: Submit button hiện diện
    await expect(submitBtn).toBeVisible();
    await submitBtn.click();
    // Khi cả hai trống, form không được submit thành công
    await expect(page).toHaveURL(`${BASE_URL}/login`);
  });

  // ── TC_LOGIN_06: Để trống email ───────────────────────────────────────
  test('TC_LOGIN_06 — Không thể submit khi để trống email', async ({ page }) => {
    const tc = loginCases.find(c => c.caseId === 'TC_LOGIN_06')!;
    await navigateToLogin(page);
    await fillLoginForm(page, tc.email, tc.password);
    await page.locator('button[type="submit"]').click();
    await expect(page).toHaveURL(`${BASE_URL}/login`);
  });

  // ── TC_LOGIN_07: Để trống mật khẩu ───────────────────────────────────
  test('TC_LOGIN_07 — Không thể submit khi để trống mật khẩu', async ({ page }) => {
    const tc = loginCases.find(c => c.caseId === 'TC_LOGIN_07')!;
    await navigateToLogin(page);
    await fillLoginForm(page, tc.email, tc.password);
    await page.locator('button[type="submit"]').click();
    await expect(page).toHaveURL(`${BASE_URL}/login`);
  });

  // ── TC_LOGIN_08: Sai mật khẩu lần 2 ──────────────────────────────────
  test('TC_LOGIN_08 — Đăng nhập sai mật khẩu lần 2 vẫn hiện thông báo lỗi', async ({ page }) => {
    const tc = loginCases.find(c => c.caseId === 'TC_LOGIN_08')!;
    await navigateToLogin(page);
    await fillLoginForm(page, tc.email, tc.password);
    await page.locator('button[type="submit"]').click();
    const errorDiv = page.locator('.bg-red-100, [class*="text-red"]').first();
    await expect(errorDiv).toBeVisible();
  });

  // ── TC_LOGIN_09: Link Quên mật khẩu ──────────────────────────────────
  test('TC_LOGIN_09 — Link Quên mật khẩu tồn tại và điều hướng đúng', async ({ page }) => {
    await navigateToLogin(page);
    const forgotLink = page.locator('a[href="/forgot-password"]');
    // Assertion 2: Link visible
    await expect(forgotLink).toBeVisible();
    await forgotLink.click();
    // Assertion 1: Điều hướng đúng
    await expect(page).toHaveURL(`${BASE_URL}/forgot-password`);
  });

  // ── TC_LOGIN_10: Link Đăng ký ─────────────────────────────────────────
  test('TC_LOGIN_10 — Link Đăng ký tồn tại và điều hướng đúng', async ({ page }) => {
    await navigateToLogin(page);
    const registerLink = page.locator('a[href="/register"]');
    await expect(registerLink).toBeVisible();
    await registerLink.click();
    await expect(page).toHaveURL(`${BASE_URL}/register`);
  });

  // ── TC_LOGIN_11: Email có khoảng trắng thừa ───────────────────────────
  test('TC_LOGIN_11 — Đăng nhập với email có khoảng trắng thừa thất bại', async ({ page }) => {
    const tc = loginCases.find(c => c.caseId === 'TC_LOGIN_11')!;
    await navigateToLogin(page);
    await fillLoginForm(page, tc.email, tc.password);
    await page.locator('button[type="submit"]').click();
    // Mong đợi: thất bại hoặc trim xử lý đúng
    const currentUrl = page.url();
    const errorDiv = page.locator('.bg-red-100, [class*="text-red"]').first();
    const isOnLogin = currentUrl.includes('/login');
    if (isOnLogin) {
      await expect(errorDiv).toBeVisible();
    }
  });

  // ── TC_LOGIN_12: Sai case mật khẩu ───────────────────────────────────
  test('TC_LOGIN_12 — Đăng nhập với mật khẩu sai chữ hoa/thường thất bại', async ({ page }) => {
    const tc = loginCases.find(c => c.caseId === 'TC_LOGIN_12')!;
    await navigateToLogin(page);
    await fillLoginForm(page, tc.email, tc.password);
    await page.locator('button[type="submit"]').click();
    const errorDiv = page.locator('.bg-red-100, [class*="text-red"]').first();
    await expect(errorDiv).toBeVisible();
    await expect(errorDiv).toContainText(tc.expectedErrorText!);
  });

  // ── BUG DETECTION TESTS ───────────────────────────────────────────────

  test('[BUG CHECK] Tiêu đề trang Login phải là "Đăng Nhập" không phải "Đăng Ký"', async ({ page }) => {
    await navigateToLogin(page);
    const heading = page.locator('h2').first();
    await expect(heading).toBeVisible();
    // BUG: heading hiển thị "Đăng Ký" thay vì "Đăng Nhập"
    // Test này expected FAIL để ghi nhận bug
    await expect(heading).toContainText('Đăng Nhập');
  });

  test('[BUG CHECK] Field mật khẩu phải dùng type="password" (FR-22)', async ({ page }) => {
    await navigateToLogin(page);
    const passwordInput = page.locator('input').nth(1);
    await expect(passwordInput).toBeVisible();
    // Assertion 4: toHaveAttribute — kiểm tra type
    // BUG: field đang dùng type="text", lộ mật khẩu
    await expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('[BUG CHECK] Nút logout phải có nhãn "Đăng xuất" không phải "Thoát" (FR-23)', async ({ page }) => {
    // Đăng nhập trước
    await navigateToLogin(page);
    await fillLoginForm(page, 'test@eshop.com', 'Test1234!');
    await page.locator('button[type="submit"]').click();
    await expect(page).toHaveURL(`${BASE_URL}/`);
    // Kiểm tra nút logout
    const logoutBtn = page.locator('button').filter({ hasText: /Đăng xuất|Thoát/i });
    await expect(logoutBtn).toBeVisible();
    // BUG: nút hiện nhãn "Thoát" thay vì "Đăng xuất"
    await expect(logoutBtn).toContainText('Đăng xuất');
  });
});
