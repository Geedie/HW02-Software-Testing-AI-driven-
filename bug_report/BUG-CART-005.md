Title: [BUG][Architecture/Cart] Giỏ hàng được lưu trữ tạm thời trên bộ nhớ RAM, bị mất sạch dữ liệu mỗi khi khởi động lại Server

## Found by Test Case
TC-API2-EXT-007

## Requirement liên quan
FR-07 (Giỏ hàng & Kiến trúc lưu trữ: Giỏ hàng phải được lưu trữ bền vững trong CSDL)

## Severity / Priority
Medium / P3

## Environment
- Backend Server: `backend/server.js:292` (`const userCarts = {}`)

## Steps to reproduce
1. Đăng nhập và thêm 3 sản phẩm vào giỏ hàng qua `POST /api/cart`.
2. Kiểm tra `GET /api/cart` thấy giỏ hàng có 3 sản phẩm.
3. Khởi động lại Server Node.js (`server.js`).
4. Gọi lại `GET /api/cart`.

## Expected result
- Các sản phẩm trong giỏ hàng vẫn tồn tại sau khi server restart.

## Actual result
- Giỏ hàng bị trống hoàn toàn (`[]`) vì dữ liệu chỉ lưu trong biến object `userCarts` trên bộ nhớ RAM tạm thời.

## Evidence
- Khai báo biến `const userCarts = {}` tại dòng 292 của `server.js`.
