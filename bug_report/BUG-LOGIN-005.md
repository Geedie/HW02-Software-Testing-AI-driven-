Title: [BUG][Auth/Security] Thiếu cơ chế giới hạn tần suất gọi API (Rate Limiting) trên API Đăng nhập

## Found by Test Case
TC-API1-EXT-006

## Requirement liên quan
SEC-05 (Chống tấn công dò mật khẩu tự động Brute Force / Denial of Service)

## Severity / Priority
Medium / P3

## Environment
- Backend Endpoint: `POST http://localhost:3000/api/login`
- Tool: Postman / Newman / JS Script Loop

## Steps to reproduce
1. Viết kịch bản tự động gửi 100 requests liên tiếp trong 1 giây đến `POST /api/login` với các mật khẩu khác nhau.
2. Kiểm tra phản hồi từ Server.

## Expected result
- Server phải chặn và trả về `429 Too Many Requests` sau khoảng 5-10 lần thử liên tiếp.

## Actual result
- Server xử lý toàn bộ 100 requests mà không hề có cơ chế rate-limit (`express-rate-limit`).

## Evidence
- Kiểm tra `backend/server.js` không import hoặc dùng middleware giới hạn request rate.
