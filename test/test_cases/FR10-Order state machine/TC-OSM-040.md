# TC-OSM-040: status = "refunded" (Out of Enum)

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
| status | refunded |

## Test steps
1. Gửi request PUT cập nhật trạng thái đơn hàng
2. Truyền body `{"status":"refunded"}`
3. Quan sát phản hồi

## Expected result
- Trạng thái ngoài tập giá trị cho phép
- HTTP Status = 400

## Status / Related bugs
Not Run / None