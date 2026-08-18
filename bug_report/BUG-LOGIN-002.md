Title: [BUG][Auth] Mã thông báo JWT sinh ra thiếu thuộc tính thời hạn hết hạn (exp claim)

## Found by Test Case
TC-API1-EXT-002

## Requirement liên quan
SEC-01 & FR-02 (Xác thực JWT Token phải có thời hạn hết hạn an toàn)

## Severity / Priority
High / P2

## Environment
- Backend Endpoint: `POST http://localhost:3000/api/login`
- Environment: Node.js Backend API
- OS: Windows 11 / Node v20

## Steps to reproduce
1. Đăng nhập thành công qua `POST /api/login`.
2. Trích xuất chuỗi JWT Token từ Response.
3. Giải mã phần Payload (base64 decode phần thứ 2 của Token).
4. Kiểm tra các thuộc tính (claims) có trong Payload.

## Expected result
- Payload của JWT phải chứa trường `exp` quy định thời gian hết hạn của token.

## Actual result
- Payload chỉ chứa `{"id": 1, "role": "admin"}` và hoàn toàn KHÔNG CÓ trường `exp`.
- *(Token sẽ có hiệu lực vĩnh viễn, rủi ro bảo mật nghiêm trọng nếu bị lộ token)*

## Evidence
- Decode JWT Payload trong Postman console & Newman Assertion Failure.
