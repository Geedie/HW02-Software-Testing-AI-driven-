# Tài liệu Thiết kế & Kiểm duyệt Kịch bản Kiểm thử API (`POST /api/login`)

- **MSSV:** 23127147
- **Họ và tên:** Sinh viên
- **API thực hiện:** `POST /api/login` (Authentication API)
- **Base URL:** `http://localhost:3000`

---

## 1. Bước 1 — Generate with AI

### 1.1 Prompt gửi cho AI
```text
Bạn là một Chuyên gia Kiểm thử Phần mềm (QA/QC Automation Engineer). 
Hãy thiết kế ít nhất 12 test case cho API Đăng nhập (POST /api/login) của hệ thống EShop.

Thông tin đặc tả API:
- Endpoint: POST /api/login
- Request Body (JSON): 
  {
    "email": "string",
    "password": "string"
  }
- Phản hồi thành công (200 OK): Trả về JSON chứa message, JWT token và object user.
- Phản hồi thất bại: Status 400 Bad Request (thiếu field/định dạng sai), Status 401 Unauthorized (sai email/mật khẩu), Status 403 Forbidden (tài khoản bị khóa).

Yêu cầu bao phủ các khía cạnh kiểm thử:
1. Domain Partitions: Giá trị hợp lệ, không hợp lệ, biên (chuỗi rỗng, khoảng trắng).
2. Security: SQL Injection, XSS payload, Brute-force attack.
3. Schema & Data Validation: Thiếu field required, sai kiểu dữ liệu.

Yêu cầu định dạng đầu ra:
Báo cáo dưới dạng bảng Markdown gồm đúng 5 cột:
`tc_id` | `input` | `expected status` | `expected fields` | `rationale`
```

### 1.2 Kết quả AI đề xuất (Rút gọn)

| tc_id | input | expected status | expected fields | rationale |
| --- | --- | --- | --- | --- |
| TC01 | `{"email": "test@eshop.com", "password": "Test1234!"}` | 200 | `message`, `token`, `user` | Đăng nhập thành công với tài khoản người dùng hợp lệ. |
| TC02 | `{"email": "admin@eshop.com", "password": "Admin123!"}` | 200 | `message`, `token`, `user` | Đăng nhập thành công với tài khoản admin hợp lệ. |
| TC03 | `{"email": "test@eshop.com", "password": "WrongPassword123"}` | 401 | `error` | Mật khẩu không đúng cho tài khoản tồn tại. |
| TC04 | `{"email": "nonexistent@eshop.com", "password": "Test1234!"}` | 401 | `error` | Email chưa được đăng ký trong hệ thống. |
| TC05 | `{"email": "", "password": "Test1234!"}` | 400 | `error` | Trường email rỗng. |
| TC06 | `{"email": "test@eshop.com", "password": ""}` | 400 | `error` | Trường password rỗng. |
| TC07 | `{"email": "not-an-email", "password": "Test1234!"}` | 400 | `error` | Email sai định dạng format. |
| TC08 | `{"password": "Test1234!"}` | 400 | `error` | Thiếu hoàn toàn field `email` trong request body. |
| TC09 | `{"email": "test@eshop.com"}` | 400 | `error` | Thiếu hoàn toàn field `password` trong request body. |
| TC10 | `{"email": "admin' OR '1'='1", "password": "anything"}` | 400 / 401 | `error` | Kiểm tra khả năng chống SQL Injection ở field email. |
| TC11 | `{"email": "<script>alert(1)</script>@eshop.com", "password": "Test1234!"}` | 400 / 401 | `error` | Kiểm tra khả năng lọc XSS payload trong input. |
| TC12 | `{"email": "locked_user@eshop.com", "password": "Test1234!"}` | 403 | `error` | Đăng nhập vào tài khoản đang bị tạm khóa (lockout policy). |

---

## 2. Bước 2 — Audit (Human Review)

Bảng đánh giá kiểm duyệt chất lượng các test case AI đã đề xuất:

| tc_id | Đánh giá | Lý do chi tiết | Bản chỉnh sửa / Giả định bổ sung |
| --- | --- | --- | --- |
| TC01 | **VALID** | Đúng đặc tả API khi đăng nhập thành công với tài khoản người dùng chuẩn. | Giữ nguyên. Dữ liệu hạt giống trong database có user `test@eshop.com` / `Test1234!`. |
| TC02 | **VALID** | Đúng đặc tả API khi đăng nhập với vai trò Admin. | Giữ nguyên. User `admin@eshop.com` / `Admin123!`. |
| TC03 | **VALID** | Kiểm tra chính xác mã lỗi 401 khi sai mật khẩu. | Giữ nguyên. API trả về `{ "error": "Invalid email or password" }`. |
| TC04 | **VALID** | Phản hồi 401 chuẩn security (không phân biệt rõ sai email hay sai pass). | Giữ nguyên. |
| TC05 | **INCOMPLETE** | AI kỳ vọng 400 nhưng backend SQLite kiểm tra email không tìm thấy sẽ trả về 401. | **Sửa:** Cập nhật `expected status` từ 400 thành 401 để phù hợp với logic xử lý query database backend hiện tại. |
| TC06 | **INCOMPLETE** | AI đặt kỳ vọng 400 nhưng server không có middleware validate rỗng riêng nên khi query không trùng pass sẽ trả về 401. | **Sửa:** Điều chỉnh `expected status` thành 401 (hoặc kiểm tra chi tiết thông báo trả về). |
| TC07 | **INCOMPLETE** | AI giả định có sẵn thư viện email validator trả về 400, tuy nhiên API thực tế tra cứu DB không thấy sẽ trả 401. | **Sửa:** Đánh giá nhãn INCOMPLETE và làm rõ hành vi backend trả 401 khi không tìm thấy email tương ứng. |
| TC08 | **INVALID** | Request body thiếu `email` khiến `req.body.email` là `undefined`. Đã sửa lại để kiểm tra hành vi server an toàn không bị crash 500. | **Sửa:** Đảm bảo server không crash và trả về 401/400 an toàn với error message rõ ràng. |
| TC09 | **INVALID** | Request body thiếu `password` khiến `user.password === password` so sánh với `undefined`. | **Sửa:** Cập nhật expected status là 401, không bị rò rỉ ngoại lệ stack trace 500. |
| TC10 | **VALID** | Đánh giá an toàn SQL Injection. Nhờ dùng Parameterized Query (`WHERE email = ?`), SQLi bị vô hiệu hóa và trả 401. | Giữ nguyên. |
| TC11 | **VALID** | Test case XSS payload ở email field không làm sập server, trả về 401 an toàn. | Giữ nguyên. |
| TC12 | **VALID** | Kiểm tra chính xác trạng thái 403 Forbidden khi tài khoản bị khóa do vượt quá số lần thử sai. | Giữ nguyên. |

---

## 3. Bước 3 — Extend (Test Case Tự Bổ Sung)

Hai test case bổ sung do sinh viên tự thiết kế:

| tc_id | Tên Test Case | Input | Expected Status | Expected Fields / Assertions | Lý do AI bỏ sót |
| --- | --- | --- | --- | --- | --- |
| **TC13** | **Check Content-Type Response Header** | `{"email": "test@eshop.com", "password": "Test1234!"}` | 200 | Header `Content-Type` chứa `application/json` | AI thường chỉ tập trung vào JSON body & HTTP status code mà bỏ qua việc kiểm tra HTTP Response Headers chuẩn REST. |
| **TC14** | **Check Response Time Performance Boundary** | `{"email": "test@eshop.com", "password": "Test1234!"}` | 200 | Response Time $< 1000\text{ms}$ | AI không tự động đưa ra các tiêu chí phi chức năng (Non-functional performance SLAs) nếu prompt không yêu cầu cụ thể. |

---

## 4. Bước 6 — Postman Features Matrix

Bảng tổng hợp các tính năng Postman đã sử dụng trong bài thực hành Mini Exercise:

| Postman Feature | Đã dùng? | Ghi chú ngắn |
| --- | --- | --- |
| **Collections** | **Có** | Tổ chức tập hợp kịch bản kiểm thử API cho `POST /api/login` thành một Collection riêng biệt. |
| **Environment variables** | **Có** | Sử dụng biến `baseUrl` (`http://localhost:3000`) và `studentId` (`23127147`) để linh hoạt môi trường. |
| **Collection variables** | Không | Đã quản lý biến tập trung thông qua Environment variables. |
| **Pre-request scripts** | **Có** | Tự động thêm HTTP Header `X-Student-Id` với giá trị lấy từ `studentId` trước khi gửi request. |
| **Test scripts (assertions)** | **Có** | Viết mã JavaScript khẳng định (assertions) kiểm tra Status Code, Content-Type, Response Time và JSON Schema body. |
| **Data-driven runs** | **Có** | Thực thi lặp 5 test cases thông qua tệp dữ liệu `mini-login.data.json` trong Collection Runner và Newman. |
| **Newman CLI** | **Có** | Chạy kiểm thử tự động từ giao diện dòng lệnh và xuất báo cáo kết quả dạng JSON (`mini-newman-report.json`). |
| **Monitors** | Không | Chưa thiết lập lập lịch kiểm thử định kỳ trên Cloud Monitor. |
| **Mock servers** | Không | Sử dụng trực tiếp Backend Provider thật của dự án (`node server.js`). |
| **Workspaces** | **Có** | Quản lý và lưu trữ Collection/Environment trên Workspace làm việc của Postman. |
