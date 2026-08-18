Title: [BUG][Auth] Tài khoản bị khóa sớm sau 2 lần nhập sai mật khẩu (Đặc tả yêu cầu 3 lần)

## Found by Test Case
TC-API1-021

## Requirement liên quan
FR-02 (Đăng nhập & Khóa tài khoản: "Nếu đăng nhập sai từ 3 lần trở lên liên tiếp, tài khoản bị tạm khóa 30 giây")

## Severity / Priority
High / P2

## Environment
- Backend Endpoint: `POST http://localhost:3000/api/login`
- Environment: Node.js Backend API
- OS: Windows 11 / Node v20

## Steps to reproduce
1. Đăng ký tài khoản hợp lệ (ví dụ: `test@eshop.com`).
2. Gửi request `POST /api/login` lần 1 với mật khẩu sai (`WrongPass1`) -> Nhận phản hồi `401 Unauthorized`.
3. Gửi request `POST /api/login` lần 2 với mật khẩu sai (`WrongPass2`).

## Expected result
- Ở lần 2: Nhận phản hồi `401 Unauthorized` và bộ đếm tăng lên 2. Tài khoản chưa bị khóa.

## Actual result
- Ở lần 2: Hệ thống trả về `403 Forbidden` với thông báo `"Tài khoản đã bị khóa do nhập sai nhiều lần"`.
- *(Nguyên nhân do dòng code `server.js:54` tăng bộ đếm `login_attempts += 2` mỗi lần nhập sai thay vì `+1`)*

## Evidence
- Newman CLI Execution Log / HTML Report tab `Failed Tests`.
