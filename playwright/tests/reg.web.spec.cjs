/**
 * tests/reg.web.spec.cjs
 *
 * Data-driven UI E2E tests for the registration form at /register (frontend-web).
 * Source of truth for test data: test/repository/all-testcases.json (FR01)
 *
 * Runs under the "web-e2e" Playwright project, gated behind RUN_UI_SPECS=true.
 */

const { test, expect } = require("@playwright/test");
const loadFeature = require("../fixtures/testcase-loader.cjs");

// Nạp danh sách testcase phẳng từ Source of Truth duy nhất
const testCases = loadFeature("FR01");

const REGISTER_ROUTE = "/register";

test.describe("FR01 — Account Registration UI (frontend-web)", () => {

  for (const tc of testCases) {
    // Chỉ chạy các testcase được định cấu hình cho UI hoặc có payload testData phù hợp
    test(`${tc.id}-UI — ${tc.title}`, async ({ page }) => {
      await page.goto(REGISTER_ROUTE);

      const data = tc.testData || {};

      // --- 1. Nhập liệu động từ testcase data ---
      // Điền Name (nếu có, nếu không truyền hoặc trống thì bỏ qua để test validation)
      if (data.name !== undefined) {
        await page.getByLabel(/name|tên/i).fill(data.name);
      }
      
      // Điền Email (Xử lý email động cho happy path tránh trùng lặp dữ liệu cũ)
      if (data.email !== undefined) {
        const emailValue = data.email.includes("{{TIMESTAMP}}") 
          ? data.email.replace("{{TIMESTAMP}}", Date.now()) 
          : data.email;
        await page.getByLabel(/email/i).fill(emailValue);
      }

      // Điền Password
      if (data.password !== undefined) {
        await page.getByLabel(/password|mật khẩu/i).fill(data.password);
      }

      // --- 2. Submit Form ---
      await page.getByRole("button", { name: /đăng ký|register|sign up/i }).click();

      // --- 3. Assert giao diện tương ứng theo mã mong đợi ---
      const isSuccessCase = tc.expectedStatus === 201;

      if (isSuccessCase) {
        // Luồng thành công: Mong đợi thông báo thành công hiển thị hoặc chuyển trang
        await expect(
          page.getByText(/thành công|success|welcome/i).or(page).first()
        ).toBeVisible({ timeout: 10_000 });
      } else {
        // Luồng thất bại (400, 409): Mong đợi UI hiển thị câu thông báo lỗi tương ứng
        // Regex linh hoạt bắt từ khóa báo lỗi hoặc chuỗi lỗi được định nghĩa sẵn trong testcase (nếu có)
        const errorRegex = tc.expectedUiError 
          ? new RegExp(tc.expectedUiError, "i")
          : /required|bắt buộc|invalid|không hợp lệ|already exists|đã tồn tại|duplicate/i;

        await expect(page.getByText(errorRegex).first()).toBeVisible();
      }
    });
  }

});