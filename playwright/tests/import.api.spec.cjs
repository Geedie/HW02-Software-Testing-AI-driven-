/**
 * tests/import.api.spec.cjs
 *
 * Data-driven Playwright spec for Data Import (POST /api/import).
 * Source of truth for test data: test/test_cases/Import/all-testcases.cjs
 *
 * Run:
 * npx playwright test --project=api tests/import.api.spec.cjs
 */

const { test, expect } = require("@playwright/test");

const loadFeature = require("../fixtures/testcase-loader.cjs");

const testCases = loadFeature("FR16");

const { logBug } = require("../fixtures/bug-logger.cjs");

const IMPORT_PATH = "/api/import";

// Helper sinh Auth Header từ Token của Admin
function authHeader(adminToken) {
  return adminToken ? { "Authorization": `Bearer ${adminToken}` } : {};
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

test.describe("Import API Test Suite", () => {
  // Chạy tuần tự vì import dữ liệu thường gây thay đổi trạng thái database hàng loạt
  test.describe.configure({ mode: "default" });

  for (const tc of testCases) {
    test(`${tc.id} — ${tc.title}`, async ({ request }) => {
      // 1. loginAs(admin) thông qua Auth Header
      const headers = authHeader(tc.adminToken || tc.admin?.token);

      // Chuẩn bị buffer dữ liệu CSV từ testcase (chuỗi string CSV hoặc Buffer thực tế)
      const fileBuffer = Buffer.isBuffer(tc.fileData) 
        ? tc.fileData 
        : Buffer.from(tc.fileData || "");

      // 2. POST /api/import với định dạng multipart/form-data
      const response = await request.post(IMPORT_PATH, {
        headers: headers,
        multipart: {
          file: {
            name: tc.fileName || "import_data.csv",
            mimeType: "text/csv",
            buffer: fileBuffer,
          }
        },
        failOnStatusCode: false,
      });

      const status = response.status();
      const bodyText = await response.text().catch(() => "<unreadable body>");

      const isAmbiguous = Array.isArray(tc.expectedStatus);
      const pass = statusIsExpected(status, tc.expectedStatus);

      // 3. Nếu kết quả ambiguous (mơ hồ / bất định) -> logBug()
      if (isAmbiguous) {
        logBug({
          testId: tc.id,
          title: tc.title,
          severity: tc.notes?.includes("CRITICAL") ? "CRITICAL" : "MEDIUM",
          expected: tc.expectedStatus,
          actual: status,
          requestPayload: { fileName: tc.fileName, rawContent: tc.fileData },
          responseBody: safeJson(bodyText),
          gapRef: tc.notes || "Ambiguous import outcome",
        });
      }

      // 4. Assert response status
      expect(
        pass,
        `[${tc.id}] Expected status ${JSON.stringify(tc.expectedStatus)} but got ${status}. Body: ${bodyText}`
      ).toBeTruthy();
    });
  }
});