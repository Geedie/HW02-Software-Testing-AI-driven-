# TC-OSM-029: delivered -> delivered (Self-transition INVALID)

## Requirement ID
FR-OSM-01

## Module / Test type / Technique
Order State Machine / Functional / State Transition Testing

## Preconditions
- Đơn hàng tồn tại
- Trạng thái hiện tại = `delivered`
- Admin có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| status | delivered |

## Test steps
1. Gửi request PUT cập nhật trạng thái đơn hàng
2. Truyền body `{"status":"delivered"}`
3. Quan sát phản hồi

## Expected result
- Không cho phép cập nhật cùng trạng thái
- Response: `{"error":"Invalid state transition from delivered to delivered"}`
- HTTP Status = 400

## Status / Related bugs
Not Run / None