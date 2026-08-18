Title: [BUG][Security] Chuỗi bí mật ký JWT Token (Secret Key) bị Hardcode trong Mã nguồn Backend

## Found by Test Case
TC-API1-EXT-005

## Requirement liên quan
SEC-03 (Bảo mật cấu hình hệ thống - Khóa bí mật JWT không được lưu trực tiếp trong code)

## Severity / Priority
High / P2

## Environment
- Code Location: `backend/server.js:9`
- Environment Variable: `process.env.JWT_SECRET`

## Steps to reproduce
1. Mở mã nguồn `backend/server.js`.
2. Quan sát dòng 9 khai báo hằng số `SECRET_KEY`.

## Expected result
- Khóa bí mật phải được đọc từ biến môi trường `process.env.JWT_SECRET`.

## Actual result
- Khóa bí mật bị gán cứng: `const SECRET_KEY = "super_secret_key_that_should_not_be_here"`.
- *(Bất kỳ ai có quyền xem mã nguồn đều có thể tự tạo JWT giả dạng Admin)*

## Evidence
- Mở file `backend/server.js:9`.
