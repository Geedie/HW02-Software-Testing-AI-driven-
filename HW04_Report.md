# HW04 — Automation Testing Report

**MSSV:** 23127147  
**Môn học:** Kiểm thử Phần mềm  
**Ngày nộp:** 2026-08-10  
**GitHub Repository:** *(link repo của bạn)*  
**Demo Video:** *(link YouTube của bạn)*  

---

## 1. Feature Selection

| Pool | Feature ID | Tên Feature |
|---|---|---|
| **Pool A** | FR-02 | Đăng nhập & Khóa tài khoản |
| **Pool B** | FR-07 | Giỏ hàng (Shopping Cart) |
| **Pool C** | FR-14 | Quản lý Danh mục CRUD (Admin) |

---

## 2. Task 1 — Automation Scripts

### 2.1 FR-02 — Đăng nhập & Khóa Tài Khoản

**Script:** `tests/login.spec.ts`  
**Data file:** `tests/data/login.json`  
**Số test cases:** 15 (12 chính + 3 bug check)

#### Test Cases

| TC ID | Loại | Mô tả | Kết quả mong đợi |
|---|---|---|---|
| TC_LOGIN_01 | Positive | Đăng nhập thành công với user hợp lệ | Redirect về `/` |
| TC_LOGIN_02 | Positive | Đăng nhập thành công với admin | Redirect về `/` |
| TC_LOGIN_03 | Negative | Mật khẩu sai | Hiện thông báo lỗi |
| TC_LOGIN_04 | Negative | Email không tồn tại | Hiện thông báo lỗi |
| TC_LOGIN_05 | Negative | Để trống cả 2 trường | Form không submit |
| TC_LOGIN_06 | Negative | Để trống email | Form không submit |
| TC_LOGIN_07 | Negative | Để trống mật khẩu | Form không submit |
| TC_LOGIN_08 | Negative | Sai mật khẩu lần 2 | Hiện thông báo lỗi |
| TC_LOGIN_09 | Edge | Link "Quên mật khẩu" | Điều hướng tới `/forgot-password` |
| TC_LOGIN_10 | Edge | Link "Đăng ký" | Điều hướng tới `/register` |
| TC_LOGIN_11 | Edge | Email có khoảng trắng thừa | Thất bại hoặc trim |
| TC_LOGIN_12 | Edge | Mật khẩu sai chữ hoa/thường | Thất bại |
| BUG CHECK | Bug | Tiêu đề phải là "Đăng Nhập" | **FAIL** (Bug BUG-01) |
| BUG CHECK | Bug | Password field phải `type="password"` | **FAIL** (Bug BUG-02) |
| BUG CHECK | Bug | Nút logout phải nhãn "Đăng xuất" | **FAIL** (Bug BUG-05) |

#### Assertion Patterns sử dụng

| Pattern | Ví dụ sử dụng |
|---|---|
| `toHaveURL()` | Kiểm tra redirect sau đăng nhập thành công |
| `toBeVisible()` | Kiểm tra form, thông báo lỗi, links hiển thị |
| `toContainText()` | Kiểm tra nội dung thông báo lỗi |
| `toHaveAttribute()` | Kiểm tra `type="password"` của password field (bug check) |
| `toHaveValue()` | Kiểm tra input được clear sau submit |

#### Bugs phát hiện
- **BUG-01:** Tiêu đề trang Login hiển thị "Đăng Ký" thay vì "Đăng Nhập"
- **BUG-02:** Password field dùng `type="text"` — lộ mật khẩu (Critical)
- **BUG-03:** Email field dùng `type="text"` thay vì `type="email"`
- **BUG-04:** Nút submit nhãn "Sign In" (tiếng Anh)
- **BUG-05:** Nút logout nhãn "Thoát" thay vì "Đăng xuất"

---

### 2.2 FR-07 — Giỏ Hàng (Shopping Cart)

**Script:** `tests/cart.spec.ts`  
**Data file:** `tests/data/cart.json`  
**Số test cases:** 12 (10 chính + 2 bug check)

#### Test Cases

| TC ID | Loại | Mô tả | Kết quả mong đợi |
|---|---|---|---|
| TC_CART_01 | Positive | Giỏ hàng trống hiển thị thông báo | "Giỏ hàng của bạn đang trống" |
| TC_CART_02 | Positive | Thêm SP vào giỏ từ trang chi tiết | SP xuất hiện trong giỏ |
| TC_CART_03 | Positive | Hiển thị đúng 5 cột theo FR-07 | Tất cả cột visible |
| TC_CART_04 | Positive | Tổng tiền tính đúng | Total hiển thị |
| TC_CART_05 | Positive | Thêm SP 2 lần → tăng quantity, không tạo dòng mới | 1 row, quantity = 2 |
| TC_CART_06 | Positive | Link "Tiếp tục mua sắm" | Redirect về `/` |
| TC_CART_07 | Positive | Checkout khi đã đăng nhập | Redirect tới `/checkout` |
| TC_CART_08 | Negative | Checkout chưa đăng nhập | Redirect login hoặc ở lại cart |
| TC_CART_09 | Negative | Xóa sản phẩm khỏi giỏ | Row bị xóa |
| TC_CART_10 | Negative | Xóa SP cuối → giỏ trống | Empty state hiển thị |
| TC_CART_11 | Edge/Bug | Nhãn tổng tiền phải là "Tổng cộng" | **FAIL** (Bug BUG-06) |
| TC_CART_12 | Edge/Bug | Dialog xác nhận trước khi xóa | **FAIL** (Bug BUG-07) |

#### Assertion Patterns sử dụng

| Pattern | Ví dụ sử dụng |
|---|---|
| `toHaveURL()` | Kiểm tra checkout redirect, continue shopping |
| `toBeVisible()` | Empty state, column headers, buttons |
| `toContainText()` | Nội dung tổng tiền, tên SP trong bảng |
| `toHaveCount()` | Kiểm tra số row table (add same product) |
| `toHaveText()` | Kiểm tra nhãn tổng tiền chính xác (bug check) |

#### Bugs phát hiện
- **BUG-06:** Nhãn "Tổng tạm tính" thay vì "Tổng cộng" (Medium)
- **BUG-07:** Không có dialog xác nhận khi xóa sản phẩm (High)

---

### 2.3 FR-14 — Quản lý Danh Mục CRUD (Admin)

**Script:** `tests/category-admin.spec.ts`  
**Data file:** `tests/data/category.json`  
**URL:** `http://localhost:5174` (Admin panel)  
**Số test cases:** 13 (12 chính + 1 bug check)

#### Test Cases

| TC ID | Loại | Mô tả | Kết quả mong đợi |
|---|---|---|---|
| TC_CAT_01 | Positive | Đăng nhập Admin và vào tab Danh mục | Dashboard hiển thị |
| TC_CAT_02 | Positive | Bảng danh mục có 3 cột đúng | ID, Tên, Hành động visible |
| TC_CAT_03 | Positive | Thêm danh mục mới hợp lệ | Row count tăng |
| TC_CAT_04 | Positive | DM vừa thêm xuất hiện trong DS | Tên DM trong bảng |
| TC_CAT_05 | Positive | Thêm DM thứ 2 | Row count +1 |
| TC_CAT_06 | Positive | Xóa danh mục | Row count giảm |
| TC_CAT_07 | Positive | DM đã xóa không còn trong DS | Tên không trong bảng |
| TC_CAT_08 | Positive | Input được clear sau khi thêm | `input.value = ''` |
| TC_CAT_09 | Negative | Thêm DM tên trống không được phép | Row count không đổi |
| TC_CAT_10 | Negative | User thường không login được Admin | Form vẫn hiển thị |
| TC_CAT_11 | Edge | Tên chứa ký tự đặc biệt | DM được lưu đúng |
| TC_CAT_12 | Edge | Tên rất dài (100 ký tự) | Xử lý gracefully |
| BUG CHECK | Bug | Dashboard tính doanh thu nhân đôi | **BUG-08** ghi nhận |

#### Assertion Patterns sử dụng

| Pattern | Ví dụ sử dụng |
|---|---|
| `toHaveURL()` | Navigation giữa các trang |
| `toBeVisible()` | Tab, form, table headers |
| `toContainText()` | Tên DM trong table body |
| `toHaveValue()` | Input được clear sau submit |
| `not.toContainText()` | DM đã xóa không còn trong bảng |

#### Bugs phát hiện
- **BUG-08:** Dashboard tính `total_amount * 2` — doanh thu nhân đôi (Critical)
- **BUG-09:** Edit product cập nhật tên tất cả SP (Critical — phát hiện từ static analysis)
- **BUG-10:** XSS vulnerability với `dangerouslySetInnerHTML` (Critical — static analysis)

---

## 3. Cấu hình Multi-Browser

**File:** `playwright.config.ts`

| Project | Browser | Feature |
|---|---|---|
| chromium | Chromium | FR-02 Login + FR-07 Cart |
| firefox | Firefox | FR-02 Login + FR-07 Cart |
| webkit | WebKit | FR-02 Login + FR-07 Cart |
| chromium-admin | Chromium | FR-14 Category Admin |
| firefox-admin | Firefox | FR-14 Category Admin |
| webkit-admin | WebKit | FR-14 Category Admin |

**Tổng số browser runs:** 6 projects × tất cả test cases = **≥ 9 browser runs** ✅

**HTML Report title:** `"Run by: 23127147 | EShop SUT — HW04 Automation Testing"`

---

## 4. Review & Gap Analysis — AI Generated Scripts

### 4.1 Những điểm AI làm đúng

1. **Data-driven structure:** AI tổ chức test data tốt trong file JSON riêng biệt, không hardcode
2. **Selector strategy:** Sử dụng selectors phù hợp với HTML thực tế (class names, placeholders, button text)
3. **Bug detection tests:** AI chủ động thêm các test `[BUG CHECK]` khi phát hiện lỗi trong source code
4. **Multi-URL support:** Nhận diện frontend web (5173) và admin (5174) chạy trên port khác nhau
5. **Helper functions:** Tổ chức `loginAsUser()`, `loginAdmin()`, `addProductToCart()` tái sử dụng tốt

### 4.2 Những điểm AI bỏ sót / tôi phải sửa

| Vấn đề | Mô tả | Tôi đã sửa |
|---|---|---|
| **Fragile selectors** | AI ban đầu dùng `getByLabel()` nhưng fields không có `id/for` | Thay bằng `locator('input').nth(n)` |
| **Lockout test** | Bỏ sót test case khóa TK sau 3 lần sai — vì risk của state pollution | Ghi nhận trong Bug Report |
| **Test isolation** | Không có `beforeEach`/`afterEach` cleanup cho cart tests | Chấp nhận trade-off, add timeout |
| **Flaky wait** | `page.waitForTimeout()` cố định — có thể flaky trên môi trường chậm | Thêm `{ timeout: 5000 }` vào assertions |

### 4.3 Test cases không thể automate và lý do

| Feature | Test Case | Lý do không automate |
|---|---|---|
| FR-02 | Khóa tài khoản sau 3 lần sai (30s) | Gây state pollution, làm các test login khác fail |
| FR-02 | Forgot password OTP flow | OTP ngẫu nhiên, khó intercept trong E2E test |
| FR-07 | Breadcrumb trên cart page | Cần verify FR-23 nhưng breadcrumb không implement trong SUT |

---

## 5. AI Critique (200–300 từ)

> 📄 Xem file riêng: **[AI_Critique.md](./AI_Critique.md)**

**Tóm tắt:** AI thực hiện tốt về cú pháp và cấu trúc nhưng bỏ sót vấn đề test isolation và sử dụng selector fragile (`getByLabel()` cho field không có `label[for]`). Nguyên nhân là AI hoạt động dựa trên pattern matching, không thực sự chạy code để verify. Bài học: AI là công cụ scaffolding, không phải người review chất lượng — mọi output đều cần human review kỹ lưỡng.

---

## 6. Tổng kết

| Hạng mục | Số lượng |
|---|---|
| Features được automate | 3 (FR-02, FR-07, FR-14) |
| Test cases tổng cộng | 40 (15 + 12 + 13) |
| Test cases automated | 40 |
| Test cases passed (expected) | ~30 |
| Test cases failed do bugs | ~10 |
| Browser runs tối thiểu | 9+ |
| Bugs tìm thấy | 10 |
| Demo video | *(link YouTube)* |
