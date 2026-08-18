Title: [BUG][Cart] Hệ thống cho phép thêm sản phẩm vào giỏ hàng với Số lượng âm (quantity: -1)

## Found by Test Case
TC-API2-009

## Requirement liên quan
FR-07 (Giỏ hàng & Kiểm tra dữ liệu đầu vào: Số lượng sản phẩm phải là số nguyên dương > 0)

## Severity / Priority
High / P2

## Environment
- Backend Endpoint: `POST http://localhost:3000/api/cart`
- Header: `Authorization: Bearer <token>`
- Content-Type: `application/json`

## Steps to reproduce
1. Đăng nhập người dùng hợp lệ và lấy JWT Token.
2. Gửi request `POST /api/cart` với body:
   ```json
   { "id": 1, "name": "iPhone", "price": 30000000, "quantity": -1 }
   ```

## Expected result
- Server từ chối request và trả về lỗi `400 Bad Request` với thông báo số lượng không hợp lệ.

## Actual result
- Server chấp nhận và trả về `200 OK` (`{"message": "Added to cart"}`).
- Số lượng âm bị trừ thẳng vào tổng sản phẩm trong giỏ hàng.

## Evidence
- Response Postman/Newman: Status 200 OK cho body `quantity: -1`.
