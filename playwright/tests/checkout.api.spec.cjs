/**
 * tests/checkout.api.spec.cjs
 *
 * Data-driven Playwright spec for Checkout (POST /api/checkout).
 * Source of truth for test data: test/test_cases/Checkout/all-testcases.cjs
 *
 * Run:
 * npx playwright test --project=api tests/checkout.api.spec.cjs
 */

const { test, expect } = require("@playwright/test");

const loadFeature = require("../fixtures/testcase-loader.cjs");

const testCases = loadFeature("FR08");
const { logBug } = require("../fixtures/bug-logger.cjs");

const CHECKOUT_PATH = "/api/checkout";

// Giả định hàm helper sinh Auth Header từ Token của user
function authHeader(userToken) {
  return userToken ? { "Authorization": `Bearer ${userToken}` } : {};
}

function statusIsExpected(actualStatus, expectedStatus) {
  if (Array.isArray(expectedStatus)) return expectedStatus.includes(actualStatus);
  return actualStatus === expectedStatus;
}

function safeJson(text) {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

test.describe("Checkout API Test Suite", () => {
  // Đảm bảo chạy tuần tự để tránh race condition về tồn kho/ví tiền của user giữa các testcases
  test.describe.configure({ mode: "default" });

  for (const tc of testCases) {
    test(`${tc.id} — ${tc.title}`, async ({ request }) => {
      // 1. Chuẩn bị Auth Header dựa trên thông tin user của testcase
      const headers = authHeader(tc.userToken || tc.user?.token);

      // 2. POST /api/checkout với payload và auth headers tương ứng
      const response = await request.post(CHECKOUT_PATH, {
        data: tc.testData,
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
        failOnStatusCode: false,
      });

      const status = response.status();
      const bodyText = await response.text().catch(() => "<unreadable body>");

      const isAmbiguous = Array.isArray(tc.expectedStatus);
      const pass = statusIsExpected(status, tc.expectedStatus);

      // 3. Nếu kết quả là ambiguous (mơ hồ / dual outcomes) -> logBug để theo dõi gap
      if (isAmbiguous) {
        logBug({
          testId: tc.id,
          title: tc.title,
          severity: tc.notes?.includes("CRITICAL") ? "CRITICAL" : "MEDIUM",
          expected: tc.expectedStatus,
          actual: status,
          requestPayload: tc.testData,
          responseBody: safeJson(bodyText),
          gapRef: tc.notes || "Ambiguous checkout outcome",
        });
      }

      // 4. Assert trạng thái response
      expect(
        pass,
        `[${tc.id}] Expected status ${JSON.stringify(tc.expectedStatus)} but got ${status}. Body: ${bodyText}`
      ).toBeTruthy();
    });
  }
});