# TC-OSM-017: confirmed -> pending (INVALID)

## Requirement ID
FR-OSM-01

## Module / Test type / Technique
Order State Machine / Functional / State Transition Testing

## Preconditions
- Đơn hàng tồn tại
- Trạng thái hiện tại = `confirmed`
- Admin có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| status | pending |

## Test steps
1. Gửi request PUT cập nhật trạng thái đơn hàng
2. Truyền body `{"status":"pending"}`
3. Quan sát phản hồi

## Expected result
- Chuyển trạng thái bị từ chối
- Response: `{"error":"Invalid state transition from confirmed to pending"}`
- HTTP Status = 400

## Status / Related bugs
Not Run / None