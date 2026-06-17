# TC-OSM-058: Concurrent Admin Status Update on Same Order

## Requirement ID
FR-OSM-01

## Module / Test type / Technique
Order State Machine / Concurrency / Race Condition Testing

## Preconditions
- Đơn hàng tồn tại
- Trạng thái hiện tại = `pending`
- Admin có JWT hợp lệ

## Test data

| Request | Status |
|----------|----------|
| Request A | confirmed |
| Request B | canceled |

## Test steps
1. Gửi đồng thời 2 request PUT cập nhật trạng thái
2. Request A chuyển sang `confirmed`
3. Request B chuyển sang `canceled`
4. Kiểm tra phản hồi và dữ liệu DB

## Expected result
- Một request thành công
- Request còn lại có thể bị từ chối do trạng thái đã thay đổi
- Có khả năng xảy ra race condition nếu không có locking
- HTTP Status = 200 + 400 hoặc 200 + 200

## Status / Related bugs
Not Run / Potential Race Condition