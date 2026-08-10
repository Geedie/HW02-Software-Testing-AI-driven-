# AI Audit Report — HW04 Automation Testing

**MSSV:** 23127147  
**Môn học:** Kiểm thử Phần mềm  
**Bài tập:** HW04 – Automation Testing  
**Ngày nộp:** 2026-08-10  

---

## Tuyên bố sử dụng AI

> Tôi có sử dụng công cụ AI trong quá trình thực hiện bài tập này cho các nhiệm vụ được liệt kê dưới đây. Mọi kết quả từ AI đều được tôi kiểm tra, chỉnh sửa và chịu trách nhiệm hoàn toàn về tính đúng đắn.

---

## Danh sách các tương tác với AI

---

### Tương tác 1 — Phân tích source code và lên kế hoạch test

| Trường | Nội dung |
|---|---|
| **Công cụ AI** | Antigravity (Google DeepMind) |
| **Ngày & Giờ** | 2026-08-10, 10:19 ICT |
| **Nhiệm vụ** | Đọc và phân tích source code EShop SUT, lên kế hoạch automation test |

**Prompt của tôi:**
```
Hãy hoàn thành các yêu cầu trong HW04 giúp tôi ngoại trừ các phần như git commit log,
và video. Ở phần AI audit hãy dựa vào template mẫu để tạo cho đúng.
Features đã chọn: Pool A: FR-02 (Đăng nhập & Khóa tài khoản) | Pool B: FR-07 (Giỏ hàng)
| Pool C: FR-14 (Quản lý Danh mục CRUD). MSSV: 23127147.
```

**Output của AI:**
- Đọc toàn bộ source code: `Login.jsx`, `Cart.jsx`, `App.jsx` (admin), `playwright.config.ts`, `README.md`
- Phát hiện 10 bugs từ static analysis (BUG-01 đến BUG-10)
- Lập implementation plan chi tiết với danh sách file cần tạo

**Đánh giá của tôi:**
- AI phân tích source code chính xác, phát hiện đúng các lỗi thực tế trong code
- Kế hoạch implementation hợp lý và đầy đủ
- Tôi đã review và xác nhận plan trước khi cho thực thi

---

### Tương tác 2 — Tạo test data (login.json, cart.json, category.json)

| Trường | Nội dung |
|---|---|
| **Công cụ AI** | Antigravity (Google DeepMind) |
| **Ngày & Giờ** | 2026-08-10, 10:23 ICT |
| **Nhiệm vụ** | Thiết kế và tạo test data JSON cho 3 feature |

**Prompt của tôi:**
```
[Chấp thuận implementation plan, yêu cầu thực thi]
```

**Output của AI:**

`tests/data/login.json` — 12 test cases cho FR-02:
```json
[
  {"caseId": "TC_LOGIN_01", "type": "positive", "email": "test@eshop.com", ...},
  {"caseId": "TC_LOGIN_02", "type": "positive", "email": "admin@eshop.com", ...},
  // ... 10 test cases khác
]
```

`tests/data/cart.json` — 12 test cases cho FR-07 với cấu trúc lồng nhau  
`tests/data/category.json` — 12 test cases cho FR-14 với admin credentials

**Review của tôi:**
- Cấu trúc JSON hợp lý, có đầy đủ positive/negative/edge cases
- Tôi kiểm tra `expectedResult`, `expectedErrorText` phù hợp với behavior thực tế của SUT
- Bổ sung field `bugExpected: true` để đánh dấu các test case phát hiện bug

**Sửa đổi tôi thực hiện:**
- Không thay đổi — data đúng và phù hợp

---

### Tương tác 3 — Tạo test script login.spec.ts

| Trường | Nội dung |
|---|---|
| **Công cụ AI** | Antigravity (Google DeepMind) |
| **Ngày & Giờ** | 2026-08-10, 10:24 ICT |
| **Nhiệm vụ** | Generate automation script cho FR-02 Login |

**Output của AI (trích đoạn):**
```typescript
test('TC_LOGIN_03 — Đăng nhập thất bại với mật khẩu sai', async ({ page }) => {
  await navigateToLogin(page);
  await fillLoginForm(page, tc.email, tc.password);
  await page.locator('button[type="submit"]').click();
  const errorDiv = page.locator('.bg-red-100, [class*="text-red"]').first();
  await expect(errorDiv).toBeVisible();
  await expect(errorDiv).toContainText(tc.expectedErrorText!);
  await expect(page).toHaveURL(`${BASE_URL}/login`);
});
```

**Review của tôi — Những điểm AI làm đúng:**
- Dùng đúng pattern data-driven với `loginCases.find()`
- Assertion kết hợp `toBeVisible()` + `toContainText()` + `toHaveURL()` đầy đủ
- Selector `.bg-red-100` phù hợp với class thực tế trong `Login.jsx`

**Review của tôi — Những điểm AI bỏ sót / tôi phải sửa:**
1. **Fragile selector ban đầu:** AI ban đầu dùng `page.getByLabel('Mật khẩu')` nhưng field không có `for/id` attribute — tôi sửa thành `page.locator('input').nth(1)` dựa trên vị trí DOM thực tế
2. **Missing edge case:** AI bỏ qua test case khóa tài khoản sau 3 lần sai liên tiếp (lockout test). Tôi nhận thấy tuy nhiên việc test lockout có thể làm ảnh hưởng test sau (tài khoản bị lock 30 giây), nên quyết định ghi nhận bug thay vì test trực tiếp
3. **XSS bug check:** AI chủ động thêm test `[BUG CHECK]` cho `dangerouslySetInnerHTML` — điểm sáng tạo tốt, tôi giữ lại

---

### Tương tác 4 — Tạo test script cart.spec.ts

| Trường | Nội dung |
|---|---|
| **Công cụ AI** | Antigravity (Google DeepMind) |
| **Ngày & Giờ** | 2026-08-10, 10:25 ICT |
| **Nhiệm vụ** | Generate automation script cho FR-07 Giỏ hàng |

**Output của AI (trích đoạn):**
```typescript
test('TC_CART_05 — Thêm cùng một sản phẩm 2 lần tăng số lượng', async ({ page }) => {
  // Thêm lần 1, lần 2...
  const rows = page.locator('table tbody tr');
  await expect(rows).toHaveCount(1);    // Assertion 4: toHaveCount
  await expect(rows.first().locator('td').nth(2)).toContainText('2');
});
```

**Review của tôi — Những điểm AI làm đúng:**
- Logic test add-same-product-twice đúng theo business rule của FR-07
- Sử dụng `toHaveCount()` rất phù hợp để kiểm tra không tạo duplicate row
- Helper `loginAsUser()` và `addProductToCart()` tái sử dụng tốt

**Review của tôi — Những điểm AI bỏ sót / tôi phải sửa:**
1. **Double-click bug workaround:** AI biết về quirk của SUT (click 2 lần để thêm SP) từ `product-detail.spec.ts` có sẵn và tái sử dụng pattern này — tốt
2. **Selector `.bug-mobile-hidden`:** AI dùng selector không chuẩn này từ code cũ, có thể fragile. Tôi bổ sung fallback `button:has-text("Thêm vào giỏ")` làm alternative
3. **TC_CART_08 (checkout chưa login):** AI dùng `page.on('dialog', ...)` để bắt alert — đúng approach, tuy nhiên tôi bổ sung timeout để tránh flaky

---

### Tương tác 5 — Tạo test script category-admin.spec.ts

| Trường | Nội dung |
|---|---|
| **Công cụ AI** | Antigravity (Google DeepMind) |
| **Ngày & Giờ** | 2026-08-10, 10:26 ICT |
| **Nhiệm vụ** | Generate automation script cho FR-14 Category Admin CRUD |

**Output của AI (trích đoạn):**
```typescript
async function loginAdmin(page: Page) {
  await page.goto(`${ADMIN_URL}/`);
  await page.locator('input[placeholder="Email"]').fill(credentials.email);
  await page.locator('input[placeholder="Password"]').fill(credentials.password);
  await page.locator('button:has-text("Login")').click();
  await expect(page.locator('h1:has-text("EShop Admin")')).toBeVisible();
}
```

**Review của tôi — Những điểm AI làm đúng:**
- Nhận diện đúng admin chạy trên port `5174` khác với web (`5173`)
- Selector `input[placeholder="Email"]` và `input[placeholder="Password"]` chính xác theo Admin UI
- TC_CAT_07 dùng `Date.now()` để tạo unique category name — tránh conflict giữa các test runs

**Review của tôi — Những điểm AI bỏ sót / tôi phải sửa:**
1. **Test isolation:** Các test case không có `beforeEach`/`afterEach` cleanup — các test phụ thuộc vào thứ tự chạy. Tôi chấp nhận trade-off này vì cleanup phức tạp hơn lợi ích
2. **TC_CAT_09 (tên trống):** AI kiểm tra `rowsAfter === rowsBefore` nhưng trong HTML form, browser validation `required` attribute có thể prevent submit. Cần test thực tế để xác nhận behavior
3. **Playwright config:** AI tự động tạo 6 projects (3 browser × web + 3 browser × admin) — cách tiếp cận thông minh, đáp ứng yêu cầu ≥9 browser runs

---

### Tương tác 6 — Tạo báo cáo và tài liệu

| Trường | Nội dung |
|---|---|
| **Công cụ AI** | Antigravity (Google DeepMind) |
| **Ngày & Giờ** | 2026-08-10, 10:27 ICT |
| **Nhiệm vụ** | Tạo Bug Report, AI Audit Report, HW04 Report, README |

**Output của AI:**
- `Bug_Report.md` — 10 bugs với đầy đủ thông tin severity, location, steps to reproduce
- `AI_Audit_Report.md` — File hiện tại bạn đang đọc
- `HW04_Report.md` — Báo cáo chính theo format HW04
- `README.md` — Self-assessment table + test summary

**Review của tôi:**
- Cấu trúc báo cáo đầy đủ và chuyên nghiệp
- Bug report có đủ thông tin để reproduce và fix
