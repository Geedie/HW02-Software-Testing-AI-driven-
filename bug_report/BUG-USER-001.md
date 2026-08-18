Title: [BUG][Security/User] Người dùng thông thường có thể tự leo quyền thành Quản trị viên (Admin) qua API Cập nhật hồ sơ

## Found by Test Case
TC-API2-EXT-005

## Requirement liên quan
FR-04 & SEC-04 (Quản lý hồ sơ: "Người dùng không thể tự thay đổi thuộc tính role của chính mình")

## Severity / Priority
High / P2

## Environment
- Backend Endpoint: `PUT http://localhost:3000/api/users/me`
- Header: `Authorization: Bearer <cart_user_token>` (Token của user thường)

## Steps to reproduce
1. Đăng nhập tài khoản người dùng thông thường.
2. Gửi request `PUT /api/users/me` kèm trường `role: "admin"` trong body:
   ```json
   { "name": "HW06 Tester", "role": "admin" }
   ```
3. Đăng xuất và đăng nhập lại, giải mã JWT token mới.

## Expected result
- Server bỏ qua hoặc từ chối thuộc tính `role` truyền lên từ client.

## Actual result
- Server thực thi câu lệnh SQL UPDATE `role = 'admin'` cho tài khoản này và thăng cấp người dùng thường thành Admin!

## Evidence
- Dòng code `server.js:124`: `if (role) { query += "role = ?" }` ghép thẳng trường `role` vào câu UPDATE mà không kiểm tra quyền.
