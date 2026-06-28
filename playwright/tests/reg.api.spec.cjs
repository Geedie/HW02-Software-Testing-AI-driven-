/**
 * tests/reg.api.spec.cjs
 *
 * Data-driven Playwright spec for FR01 — Account Registration (POST /api/register).
 * Source of truth for test data: test/repository/all-testcases.json (FR01)
 *
 * Run:
 * npx playwright test --project=api tests/reg.api.spec.cjs
 * (or) npm run test:reg
 */

const { test, expect } = require("@playwright/test");
const loadFeature = require("../fixtures/testcase-loader.cjs");
const { logBug } = require("../fixtures/bug-logger.cjs");

const testCases = loadFeature("FR01");
// Load danh sách testcase phẳng từ Source of Truth duy nhất

const REGISTER_PATH = "/api/register";

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

test.describe("FR01 — Account Registration (BVA/Domain-Testing suite)", () => {
  
  for (const tc of testCases) {
    test(`${tc.id} — ${tc.title}`, async ({ request }) => {
      // Thực hiện gửi request đăng ký tài khoản với test data tương ứng
      const response = await request.post(REGISTER_PATH, {
        data: tc.testData,
        failOnStatusCode: false,
      });

      const status = response.status();
      const bodyText = await response.text().catch(() => "<unreadable body>");

      const isAmbiguous = Array.isArray(tc.expectedStatus);
      const pass = statusIsExpected(status, tc.expectedStatus);

      // Nếu kết quả rơi vào vùng spec gap (mơ hồ / dual outcomes) hoặc assert thất bại, log bug lại
      if (isAmbiguous || !pass) {
        logBug({
          testId: tc.id,
          title: tc.title,
          severity: isAmbiguous ? "MEDIUM" : "CRITICAL",
          expected: tc.expectedStatus,
          actual: status,
          requestPayload: tc.testData,
          responseBody: safeJson(bodyText),
          gapRef: tc.notes || "REG: Registration validation gap",
        });
      }

      // Khớp bổ sung: kiểm tra cơ chế phân quyền mặc định trong Db (nếu có yêu cầu từ testcase)
      if (tc.assertRoleInDb && status === 201) {
        const parsed = safeJson(bodyText);
        const targetNode = parsed && (parsed.user || parsed);
        
        if (targetNode && "role" in targetNode) {
          const actualRole = targetNode.role;
          
          if (actualRole !== tc.assertRoleInDb) {
            logBug({
              testId: tc.id,
              title: `${tc.title} — role mismatch`,
              severity: "CRITICAL",
              expected: tc.assertRoleInDb,
              actual: actualRole,
              requestPayload: tc.testData,
              responseBody: parsed,
              gapRef: "Mass assignment / role-default check",
            });
          }
          expect(
            actualRole,
            `Expected role to default/stay as "${tc.assertRoleInDb}" but API returned "${actualRole}"`
          ).toBe(tc.assertRoleInDb);
        }
      }

      // Xác thực mã HTTP Status trả về
      expect(
        pass,
        `[${tc.id}] Expected status ${JSON.stringify(tc.expectedStatus)} but got ${status}. Body: ${bodyText}`
      ).toBeTruthy();
    });
  }
  
});