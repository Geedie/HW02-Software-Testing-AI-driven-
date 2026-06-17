# TC-OSM-062: User Cancels Pending Order Then Admin Tries Update

## Requirement ID
FR-OSM-01

## Module / Test type / Technique
Order State Machine / Functional / End-to-End Testing

## Preconditions
- Đơn hàng ban đầu ở trạng thái `pending`
- User đã hủy đơn hàng thành công
- Trạng thái hiện tại = `canceled`
- Admin có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| status | confirmed |

## Test steps
1. User hủy đơn hàng
2. Admin gửi request cập nhật sang `confirmed`
3. Quan sát phản hồi

## Expected result
- Không được phép cập nhật từ `canceled` sang `confirmed`
- Response: `{"error":"Invalid state transition from canceled to confirmed"}`
- HTTP Status = 400

## Status / Related bugs
Not Run / None