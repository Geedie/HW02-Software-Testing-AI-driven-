# TC-OSM-041: status = "processing" (Out of Enum)

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
| status | processing |

## Test steps
1. Gửi request PUT cập nhật trạng thái đơn hàng
2. Truyền body `{"status":"processing"}`
3. Quan sát phản hồi

## Expected result
- Trạng thái ngoài enum được hỗ trợ
- HTTP Status = 400

## Status / Related bugs
Not Run / None