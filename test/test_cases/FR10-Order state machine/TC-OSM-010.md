# TC-OSM-010: pending -> confirmed (VALID)

## Requirement ID
FR-OSM-01

## Module / Test type / Technique
Order State Machine / Functional / State Transition Testing

## Preconditions
- Đơn hàng tồn tại
- Trạng thái hiện tại = `pending`
- Admin có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| status | confirmed |

## Test steps
1. Gửi request PUT cập nhật trạng thái đơn hàng
2. Truyền body `{"status":"confirmed"}`
3. Kiểm tra phản hồi và dữ liệu trong DB

## Expected result
- Trạng thái đơn hàng được cập nhật thành `confirmed`
- Response trả về `{"message":"Order status updated"}`
- HTTP Status = 200

## Status / Related bugs
Not Run / None