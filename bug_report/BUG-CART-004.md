Title: [BUG][Cart/Security] Server tin tưởng hoàn toàn Giá do Client gửi lên mà không xác thực lại từ CSDL (Trust Boundary Violation)

## Found by Test Case
TC-API2-EXT-004

## Requirement liên quan
FR-07 & SEC-07 (Phá vỡ ranh giới tin cậy: Đơn giá phải được truy vấn chính xác từ CSDL backend)

## Severity / Priority
Critical / P1

## Environment
- Backend Endpoint: `POST http://localhost:3000/api/cart`
- Database Table: `products` (Sản phẩm iPhone 15 Pro Max có giá gốc là 30,000,000 ₫)

## Steps to reproduce
1. Chọn sản phẩm iPhone 15 Pro Max (ID = 1, giá niêm yết trong CSDL là 30,000,000 ₫).
2. Dùng công cụ (Postman / Fiddler) can thiệp gói tin `POST /api/cart` và tự ý sửa trường `price` thành `1`:
   ```json
   { "id": 1, "name": "iPhone 15 Pro Max", "price": 1, "quantity": 1 }
   ```

## Expected result
- Server từ chối giá do client truyền lên, tự lấy giá gốc 30,000,000 ₫ từ bảng `products` trong CSDL để tính tiền.

## Actual result
- Server tin tưởng tuyệt đối giá `1` đồng do client gửi lên và lưu giá `1` đồng này vào giỏ hàng!

## Evidence
- Dòng code `server.js:290` lấy thẳng `req.body.price` lưu vào object giỏ hàng mà không query lại DB.
