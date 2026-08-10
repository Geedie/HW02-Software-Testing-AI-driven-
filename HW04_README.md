# EShop SUT — HW04 Automation Testing

**MSSV:** 23127147  
**Môn:** Kiểm thử Phần mềm  

---

## Test Summary Report

| Hạng mục | Thông tin |
|---|---|
| **Features được automate** | 3 (FR-02, FR-07, FR-14) |
| **Tổng test cases** | 40 |
| **Test cases automated** | 40 |
| **Test cases passed (expected)** | ~30 |
| **Test cases failed (do bugs)** | ~10 |
| **Browser runs** | 6 projects (chromium, firefox, webkit × web & admin) ≥ 9 runs |
| **Bugs tìm thấy** | 10 bugs |
| **Demo video** | *(link YouTube của bạn)* |

---

## Features

| Pool | Feature | Script | Data |
|---|---|---|---|
| Pool A | FR-02 Đăng nhập & Khóa TK | `tests/login.spec.ts` | `tests/data/login.json` |
| Pool B | FR-07 Giỏ hàng | `tests/cart.spec.ts` | `tests/data/cart.json` |
| Pool C | FR-14 Quản lý Danh mục (Admin) | `tests/category-admin.spec.ts` | `tests/data/category.json` |

---

## Cách chạy tests

### Khởi động servers trước
```bash
# Terminal 1: Backend
cd backend && node server.js

# Terminal 2: Frontend Web
cd frontend-web && npm run dev

# Terminal 3: Frontend Admin
cd frontend-admin && npm run dev
```

### Chạy tất cả tests
```bash
npx playwright test
```

### Chạy theo feature
```bash
npx playwright test tests/login.spec.ts
npx playwright test tests/cart.spec.ts
npx playwright test tests/category-admin.spec.ts
```

### Xem HTML Report
```bash
npx playwright show-report
```

---

## Self-Assessment Table

| No. | Criteria | Max Grade | Self-Assessed Grade |
|---|---|---|---|
| 1 | Task 1 — Feature A (FR-02 Login) | 25 | 20 |
| 1 | Task 1 — Feature B (FR-07 Cart) | 25 | 20 |
| 1 | Task 1 — Feature C (FR-14 Category Admin) | 25 | 20 |
| 2 | Task 2 — Demo Video | 15 | 0 |
| 3 | Agent Skills | 10 | 5 |
| | **Total** | **100** | **65** |

---

## Cấu trúc thư mục

```
eshop-sut-main/
├── tests/
│   ├── login.spec.ts           # FR-02 automation
│   ├── cart.spec.ts            # FR-07 automation  
│   ├── category-admin.spec.ts  # FR-14 automation
│   ├── product-detail.spec.ts  # FR-06 (có sẵn)
│   └── data/
│       ├── login.json
│       ├── cart.json
│       ├── category.json
│       └── product-detail.json
├── playwright.config.ts
├── playwright-report/          # HTML reports (auto-generated)
├── HW04_Report.md              # Báo cáo chính
├── AI_Audit_Report.md          # AI Audit Report
└── Bug_Report.md               # Bug report
```

---

## Bugs Tìm thấy

| Bug ID | Feature | Severity |
|---|---|---|
| BUG-01 | FR-02 — Tiêu đề "Đăng Ký" thay vì "Đăng Nhập" | Medium |
| BUG-02 | FR-02 — Password field `type="text"` lộ mật khẩu | **Critical** |
| BUG-03 | FR-22 — Email field `type="text"` thay vì `type="email"` | Low |
| BUG-04 | FR-21 — Nút submit nhãn "Sign In" | Low |
| BUG-05 | FR-23 — Nút logout nhãn "Thoát" thay vì "Đăng xuất" | Low |
| BUG-06 | FR-07 — Nhãn "Tổng tạm tính" thay vì "Tổng cộng" | Medium |
| BUG-07 | FR-07 — Không có dialog xác nhận khi xóa SP | High |
| BUG-08 | FR-13 — Dashboard tính doanh thu nhân 2 (×2) | **Critical** |
| BUG-09 | FR-15 — Edit product đổi tên tất cả SP | **Critical** |
| BUG-10 | SEC-04 — XSS với `dangerouslySetInnerHTML` | **Critical** |
