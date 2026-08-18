Title: [BUG][Cart/Checkout] Hệ thống cho phép thêm sản phẩm vào giỏ với Đơn giá âm (price: -100)

## Found by Test Case
TC-API2-012

## Requirement liên quan
FR-07 (Giỏ hàng: Đơn giá sản phẩm phải là số dương > 0)

## Severity / Priority
Critical / P1

## Environment
- Backend Endpoint: `POST http://localhost:3000/api/cart`
- Header: `Authorization: Bearer <token>`
- Content-Type: `application/json`

## Steps to reproduce
1. Đăng nhập người dùng và lấy JWT Token.
2. Gửi request `POST /api/cart` với body:
   ```json
   { "id": 1, "name": "iPhone", "price": -100, "quantity": 1 }
   ```

## Expected result
- Server từ chối và trả về `400 Bad Request`.

## Actual result
- Server chấp nhận và trả về `200 OK` (`{"message": "Added to cart"}`).
- *(Lỗi cực kỳ nghiêm trọng: Kẻ tấn công có thể chèn giá âm để giảm tổng tiền đơn hàng khi thanh toán)*

## Evidence
- Response Postman/Newman: Status 200 OK cho body `price: -100`.
