# TC-OSM-039: status = "CONFIRMED" (Uppercase)

## Requirement ID
FR-OSM-01

## Module / Test type / Technique
Order State Machine / Functional / Equivalence Partitioning

## Preconditions
- Đơn hàng tồn tại
- Trạng thái hiện tại = `pending`
- Admin có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| status | CONFIRMED |

## Test steps
1. Gửi request PUT cập nhật trạng thái đơn hàng
2. Truyền body `{"status":"CONFIRMED"}`
3. Quan sát phản hồi

## Expected result
- Giá trị trạng thái không hợp lệ
- HTTP Status = 400

## Status / Related bugs
Not Run / None