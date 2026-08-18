Title: [BUG][Security/Cart] Lưu trữ nguyên văn mã độc XSS trong Tên sản phẩm khi thêm vào giỏ

## Found by Test Case
TC-API2-021

## Requirement liên quan
SEC-06 (Chống tấn công Stored Cross-Site Scripting - Stored XSS)

## Severity / Priority
Medium / P3

## Environment
- Backend Endpoint: `POST http://localhost:3000/api/cart`
- Header: `Authorization: Bearer <token>`

## Steps to reproduce
1. Đăng nhập người dùng và lấy JWT Token.
2. Gửi request `POST /api/cart` với body chứa thẻ script:
   ```json
   { "id": 1, "name": "<script>alert('XSS')</script>", "price": 100, "quantity": 1 }
   ```
3. Gọi `GET /api/cart` xem danh sách giỏ hàng.

## Expected result
- Server lọc bớt các ký tự đặc biệt (Sanitize HTML) hoặc từ chối input chứa thẻ `<script>`.

## Actual result
- Server lưu nguyên văn chuỗi `<script>alert('XSS')</script>` vào giỏ hàng và trả lại nguyên vẹn ở API GET giỏ hàng.

## Evidence
- Response `GET /api/cart` trả về tên chứa mã độc `<script>alert('XSS')</script>`.
