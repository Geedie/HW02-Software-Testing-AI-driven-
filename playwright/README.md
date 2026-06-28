# BVA/Domain-Testing Playwright Suite — E-Shop

Tự động hóa các test case sinh ra từ skill `bva-domain-testing` (BVA + Domain
Testing) cho 4 feature: **FR01 Registration**, **FR08 Checkout**, **FR16 Import
CSV**, **FR10 Order State Machine**.

Lần triển khai này hoàn thiện đầy đủ pipeline cho **TC-REG (FR01)** — 35 test
case + 2 special-case (non-JSON content-type, concurrent duplicate) — và để
sẵn khung (config, fixtures, reporter) để bạn cắm CHECKOUT / IMPORT / OSM vào
mà **không cần sửa `playwright.config.cjs`**.

---

## 1. Cấu trúc thư mục

```
.
├── playwright.config.cjs       # Config chính: 4 project (api, web-e2e, admin-e2e, mobile-e2e)
├── .env.example                 # Copy → .env, điền port/credentials thật
├── fixtures/
│   ├── auth.cjs                 # loginAs(request, 'user'|'admin') → JWT
│   └── bug-logger.cjs           # logBug() — ghi gap/ambiguous-outcome vào NDJSON
├── reporters/
│   └── bug-reporter.cjs         # Custom reporter → tổng hợp bugs-<run>.json/.md
├── tests/
│   ├── reg.api.spec.cjs         # ✅ TC-REG-001..035, chạy qua API (project "api")
│   └── reg.web.spec.cjs         # ✅ mẫu UI E2E cho /register (project "web-e2e")
└── test/
    ├── test_cases/
    │   └── FR01-Account-registration/all-testcases.cjs   # Data nguồn cho reg.api.spec.cjs
    ├── test_runs/                # HTML report, results.json, traces (auto-generated, gitignored)
    └── test_summary/             # bugs-<run>.json / .md — báo cáo bug cuối (auto-generated)
```

**Quy ước file test:** `*.api.spec.cjs` chạy trong project `api` (chỉ HTTP, không
cần browser). `*.web.spec.cjs` / `*.admin.spec.cjs` / `*.mobile.spec.cjs` chạy
trong project tương ứng với baseURL riêng. Đây là cách Playwright biết file nào
thuộc port nào — bạn không cần sửa config khi thêm feature mới, chỉ cần đặt tên
file đúng quy ước.

---

## 2. Cài đặt

```bash
npm install
npx playwright install        # cài browser binaries (cần cho web/admin/mobile-e2e)
cp .env.example .env
```

Mở `.env` và điền:

```env
API_BASE_URL=http://localhost:3000
WEB_BASE_URL=http://localhost:5173
ADMIN_BASE_URL=http://localhost:5174
MOBILE_BASE_URL=http://localhost:5175

ADMIN_EMAIL=admin@eshop.com
ADMIN_PASSWORD=Admin123!
USER_EMAIL=test@eshop.com
USER_PASSWORD=Test1234!

LOGIN_PATH=/api/login
RUN_UI_SPECS=false   # đặt true khi muốn chạy luôn web/admin/mobile-e2e cùng api
```

> ⚠️ `frontend-admin` / `frontend-mobile` port hiện đang là giá trị mặc định
> giả định (5174/5175) — **cập nhật đúng port thật của bạn** trong `.env`
> trước khi chạy `web-e2e`/`admin-e2e`/`mobile-e2e`.

---

## 3. Chạy test

```bash
# Chỉ API (project "api") — không cần backend chạy thật, nhưng cần để test pass
npm run test:reg
# tương đương: npx playwright test --project=api tests/reg.api.spec.cjs

# Toàn bộ project "api" (sau khi thêm checkout/import/osm specs)
npm test

# UI E2E cho /register (cần RUN_UI_SPECS=true hoặc chỉ định --project)
npm run test:reg:web

# Xem report HTML cuối cùng
npm run report
```

Sau mỗi lần chạy, `reporters/bug-reporter.cjs` tự sinh:

- `test/test_summary/bugs-<timestamp>.json` — machine-readable
- `test/test_summary/bugs-<timestamp>.md` — human-readable, có 2 phần:
  - **Flagged Gaps / Ambiguous Outcomes**: các case mà phân tích BVA gốc đã
    đánh dấu "Unknown" / 2 status khả dĩ (vd `[201, 400]`) — report ghi rõ
    server **thực tế** trả gì, để bạn so với spec gốc và quyết định đó là bug
    hay hành vi chấp nhận được.
  - **Hard Test Failures**: assertion fail thật (server trả status hoàn toàn
    sai so với kỳ vọng) — đây là bug rõ ràng cần fix ngay.
- `bugs-latest.json` / `bugs-latest.md` — pointer luôn trỏ tới lần chạy gần nhất.

---

## 4. Cách hoạt động của `tests/reg.api.spec.cjs`

- Đọc trực tiếp từ `test/test_cases/FR01-Account-registration/all-testcases.cjs`
  (đúng schema bạn đang dùng: `id, title, requirementId, testData,
  expectedStatus, sourceFile`).
- Với mỗi test case, gửi `POST /api/register` với `testData`, so sánh status
  thực tế với `expectedStatus`.
- `expectedStatus` có thể là **số đơn** (rõ ràng) hoặc **mảng** (vd
  `[201, 400]`) cho các case mà phân tích gốc đánh dấu "Unknown"/gap — khi đó
  test **không fail cứng** nếu rơi vào 1 trong các giá trị đó, nhưng vẫn ghi
  vào bug report để bạn review thủ công (vì một trong 2 nhánh đó thường là bug
  thật, vd TC-REG-019 password 1 ký tự được accept = lỗ hổng bảo mật).
- 2 case đặc biệt (`TC-REG-034` non-JSON content-type, `TC-REG-035` concurrent
  duplicate) được xử lý riêng trong spec vì không khớp schema JSON-body phẳng.

### ⚠️ Việc bạn cần làm: thay data thật

File `all-testcases.cjs` trong repo này được tôi **tái tạo từ nội dung phân
tích BVA gốc** (`prompt_log_01.txt`) theo đúng schema bạn mô tả — vì bạn chưa
upload file `all-testcases.cjs` thật. **Hãy dán đè file thật của bạn vào:**

```
test/test_cases/FR01-Account-registration/all-testcases.cjs
```

giữ đúng `module.exports = [...]` (array) + `module.exports.SPECIAL_CASES`
nếu bạn muốn giữ 2 case đặc biệt, hoặc xóa phần `SPECIAL_CASES` trong
`reg.api.spec.cjs` nếu file thật của bạn không có 2 case đó.

---

## 5. Mở rộng sang CHECKOUT / IMPORT / OSM

Khung đã sẵn sàng — các bước lặp lại cho mỗi feature:

1. Tạo `test/test_cases/<FEATURE>/all-testcases.cjs` theo đúng schema (tôi đã
   đọc kỹ `prompt_log_02/03/04.txt` và có thể tái tạo tương tự nếu bạn muốn).
2. Tạo `tests/<feature>.api.spec.cjs`:
   - **CHECKOUT** & **IMPORT**: cần JWT → dùng `fixtures/auth.cjs`:
     ```js
     const { loginAs, authHeader } = require('../fixtures/auth.cjs');
     test.beforeAll(async ({ request }) => {
       userToken = await loginAs(request, 'user');
       adminToken = await loginAs(request, 'admin'); // IMPORT cần admin
     });
     // ...
     const res = await request.post('/api/checkout', {
       headers: authHeader(userToken),
       data: tc.testData,
     });
     ```
   - **OSM**: cần test theo **ma trận chuyển trạng thái** (state machine) —
     mỗi test case cần set up order ở status hiện tại trước, rồi PUT status
     mới, nên sẽ cần thêm 1 helper `fixtures/orders.cjs` (tạo order test qua
     API/DB trước mỗi case) — tôi đề xuất viết riêng khi bạn xác nhận cách
     seed/reset order status giữa các test (DB trực tiếp hay qua API?).
3. Đặt tên file theo đúng hậu tố (`.api.spec.cjs`) — Playwright tự nhận vào
   project `api`, không cần sửa `playwright.config.cjs`.
4. (Tuỳ chọn) Thêm `tests/<feature>.admin.spec.cjs` cho UI E2E phía
   frontend-admin (vd OSM cập nhật trạng thái đơn từ trang admin).

---

## 6. Trích xuất bug — đầu ra cuối cùng

Sau khi backend thật chạy và bạn `npm test`, mở:

```
test/test_summary/bugs-latest.md
```

File này là **đầu ra "bugs" bạn yêu cầu** — gộp:
- Mọi case BVA có 2 khả năng (status ambiguous) kèm kết quả thực tế server trả,
- Mọi assertion fail cứng (status hoàn toàn sai khác kỳ vọng).

Từ đây bạn có thể copy thẳng vào báo cáo QA hoặc tạo ticket cho từng GAP/SEC
tương ứng đã liệt kê trong các `prompt_log_*.txt` gốc (GAP-001 → GAP-010,
SEC-001 → SEC-010, v.v).

---

## 7. Việc cần bạn xác nhận tiếp (để tôi hoàn thiện CHECKOUT/IMPORT/OSM)

- [ ] Port thật của `frontend-admin` và `frontend-mobile`.
- [ ] Field tên JWT trong response của `/api/login` (`token`? `accessToken`?
      `jwt`?) — `fixtures/auth.cjs` đang thử cả 3 tên, nhưng tốt nhất xác nhận
      để tránh lỗi `[auth.cjs] Login succeeded but no token field found`.
- [ ] Với OSM: cách bạn muốn seed order ở từng trạng thái trước test (gọi API
      checkout rồi admin update tới đúng trạng thái trước khi test transition,
      hay có endpoint/test-helper riêng để set status trực tiếp?).
- [ ] File `all-testcases.cjs` **thật** của bạn (4 feature) — để tôi đối chiếu
      và đảm bảo schema khớp 100% với data tôi đã tái tạo cho REG.
