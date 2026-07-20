/**
 * FR-02: Đăng nhập & Khóa tài khoản
 * Feature: Login & Account Lockout
 * MSSV: 23127147
 *
 * [Commit 1 - Initial skeleton] - Setup cơ bản cho login test
 * Tạo test suite FR-02 theo cấu trúc Playwright data-driven
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
  // TODO: Cần xác định đúng selector cho các input fields
  const emailInput = page.locator('input[type="email"]');
  const passwordInput = page.locator('input[type="password"]');
  await emailInput.fill(email);
  await passwordInput.fill(password);
}

async function navigateToLogin(page: Page) {
  await page.goto(`${BASE_URL}/login`);
  await expect(page.locator('form')).toBeVisible();
}

// ── Test Suite ───────────────────────────────────────────────────────────────
test.describe(`[Run by: ${STUDENT_ID}] FR-02 — Đăng nhập & Khóa Tài Khoản`, () => {

  // TC_LOGIN_01: Đăng nhập thành công với user
  test('TC_LOGIN_01 — Đăng nhập thành công với tài khoản user hợp lệ', async ({ page }) => {
    const tc = loginCases.find(c => c.caseId === 'TC_LOGIN_01')!;
    await navigateToLogin(page);
    await fillLoginForm(page, tc.email, tc.password);
    await page.locator('button[type="submit"]').click();
    await expect(page).toHaveURL(`${BASE_URL}/`);
  });

  // TC_LOGIN_02: Đăng nhập thành công với admin
  test('TC_LOGIN_02 — Đăng nhập thành công với tài khoản admin', async ({ page }) => {
    const tc = loginCases.find(c => c.caseId === 'TC_LOGIN_02')!;
    await navigateToLogin(page);
    await fillLoginForm(page, tc.email, tc.password);
    await page.locator('button[type="submit"]').click();
    await expect(page).toHaveURL(`${BASE_URL}/`);
  });

  // TC_LOGIN_03: Đăng nhập thất bại - sai mật khẩu
  test('TC_LOGIN_03 — Đăng nhập thất bại với mật khẩu sai', async ({ page }) => {
    const tc = loginCases.find(c => c.caseId === 'TC_LOGIN_03')!;
    await navigateToLogin(page);
    await fillLoginForm(page, tc.email, tc.password);
    await page.locator('button[type="submit"]').click();
    // TODO: Cần xác định selector cho error message
    const errorMsg = page.locator('.error-message');
    await expect(errorMsg).toBeVisible();
  });
});
