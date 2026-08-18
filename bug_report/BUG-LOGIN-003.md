Title: [BUG][Auth/DB] Mật khẩu người dùng được lưu trữ dạng Text thuần (Plaintext) không mã hóa trong CSDL

## Found by Test Case
TC-API1-EXT-004

## Requirement liên quan
SEC-02 (Lưu trữ mật khẩu an toàn - Phải mã hóa bằng thuật toán băm Bcrypt/Argon2)

## Severity / Priority
Critical / P1

## Environment
- Backend Database: SQLite (`backend/eshop.db`)
- Code Location: `backend/server.js:45`

## Steps to reproduce
1. Đăng ký tài khoản mới qua `POST /api/register` với mật khẩu `"Test1234!"`.
2. Mở file CSDL SQLite `eshop.db` xem bảng `users`.
3. Kiểm tra cột `password`.

## Expected result
- Mật khẩu phải được mã hóa thành chuỗi băm Bcrypt (ví dụ `$2b$10$...`).

## Actual result
- Cột `password` lưu nguyên văn chuỗi `"Test1234!"`.
- *(Rò rỉ toàn bộ mật khẩu người dùng nếu file CSDL bị đánh cắp)*

## Evidence
- Dòng code `server.js:45` ghi trực tiếp `password` vào câu lệnh SQL INSERT mà không qua `bcrypt.hash()`.
