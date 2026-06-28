/**
 * tests/osm.api.spec.cjs
 *
 * Data-driven State Machine Testing for Orders (OSM).
 * Source of truth for test data: test/repository/all-testcases.json (FR10)
 *
 * Run:
 * npx playwright test --project=api tests/osm.api.spec.cjs
 */

const { test, expect } = require("@playwright/test");
const { prepareOrder, transition, getOrder } = require("../fixtures/orders.cjs");
const { loginAs } = require("../fixtures/auth.cjs"); 
const { logBug } = require("../fixtures/bug-logger.cjs");
const loadFeature = require("../fixtures/testcase-loader.cjs");

// 1. Chuẩn hóa Source of Truth - Chỉ một schema duy nhất
const testCases = loadFeature("FR10");

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

test.describe("Order State Machine (OSM) API Specification", () => {
  // Chạy tuần tự để đảm bảo tính toàn vẹn của vòng đời trạng thái đơn hàng
  test.describe.configure({ mode: "default" });

  const tokens = {
    userToken: null,
    adminToken: null,
  };

  // ==========================================
  // BEFOREALL: LOGIN QUA HELPER CHUẨN (CHỈ 1 LẦN)
  // ==========================================
  test.beforeAll(async ({ request }) => {
    // Sử dụng bộ account seed chuẩn từ backend thông qua loginAs
    tokens.userToken = await loginAs(request, "user");
    tokens.adminToken = await loginAs(request, "admin");

    if (!tokens.userToken || !tokens.adminToken) {
      throw new Error("[OSM Setup Error] Không thể khởi tạo Token hệ thống.");
    }
  });

  // ==========================================
  // DYNAMIC TEST CASES GENERATOR
  // ==========================================
  for (const tc of testCases) {
    test(`${tc.id} — ${tc.title}`, async ({ request }) => {
      
      // --- 1. Arrange ---
      // Seed đơn hàng về trạng thái gốc bằng cấu trúc phẳng tc.currentStatus & tc.payload
      const order = await prepareOrder(
        request, 
        tc.currentStatus, 
        tokens, 
        tc.payload || {}
      );

      // --- 2. Act ---
      // Không dùng try/catch, để transition xử lý tự nhiên (yêu cầu failOnStatusCode: false trong fixture)
      const response = await transition(
        request, 
        tokens.adminToken, 
        order.id, 
        tc.targetStatus
      );

      // --- 3. Assert HTTP Status ---
      const status = response.status();
      const bodyText = await response.text().catch(() => "<unreadable body>");
      
      const isAmbiguous = Array.isArray(tc.expectedStatus);
      const pass = statusIsExpected(status, tc.expectedStatus);

      // --- 4. Bug Logging (Đồng bộ với REG) ---
      // Ghi nhận bug nếu spec bị mập mờ (ambiguous) hoặc khi assert thất bại
      if (isAmbiguous || !pass) {
        logBug({
          testId: tc.id,
          title: tc.title,
          severity: isAmbiguous ? "MEDIUM" : "CRITICAL",
          expected: tc.expectedStatus,
          actual: status,
          requestPayload: { currentStatus: tc.currentStatus, targetStatus: tc.targetStatus, payload: tc.payload },
          responseBody: safeJson(bodyText),
          gapRef: isAmbiguous ? "GAP-OSM: Ambiguous transition" : "OSM: State transition failure",
        });
      }

      // Assert HTTP status kết quả
      expect(
        pass, 
        `[${tc.id}] Expected ${JSON.stringify(tc.expectedStatus)} but got ${status}. Body: ${bodyText}`
      ).toBeTruthy();

      // --- 5. Assert Final State ---
      // Kiểm tra trạng thái thực tế cuối cùng trong DB dựa theo kỳ vọng linh hoạt của testcase
      if (status === 200 && tc.expectedFinalStatus) {
        const updatedOrder = await getOrder(request, tokens.userToken, order.id);
        
        expect(
          updatedOrder.status,
          `[${tc.id}] Trạng thái trong DB không khớp! Kỳ vọng: "${tc.expectedFinalStatus}" nhưng API trả về: "${updatedOrder.status}"`
        ).toBe(tc.expectedFinalStatus);
      }
    });
  }
});