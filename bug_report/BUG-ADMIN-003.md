Title: [BUG][State Machine] Logic chuyển trạng thái đơn hàng cho phép hồi sinh đơn đã Hủy (canceled) thành Đã giao (delivered)

## Found by Test Case
TC-API3-013

## Requirement liên quan
FR-10 & FR-18 (State Machine: Đơn hàng ở trạng thái `canceled` là trạng thái kết thúc, KHÔNG ĐƯỢC CHUYỂN sang `delivered`)

## Severity / Priority
Medium / P3

## Environment
- Backend Endpoint: `PUT http://localhost:3000/api/admin/orders/:id/status`
- Code Location: `backend/server.js:550`

## Steps to reproduce
1. Tạo một đơn hàng có trạng thái là `canceled`.
2. Gửi request `PUT /api/admin/orders/:id/status` với body `{"status": "delivered"}`.

## Expected result
- Server từ chối và trả về lỗi `400 Bad Request` do chuyển trạng thái không hợp lệ.

## Actual result
- Logic trong code `server.js:550` cho phép chuyển trực tiếp từ `canceled` sang `delivered` mà không bị chặn.

## Evidence
- Kiểm tra ma trận chuyển trạng thái trong `server.js:550`.
