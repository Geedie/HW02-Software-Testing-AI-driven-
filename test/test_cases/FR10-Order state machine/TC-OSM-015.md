# TC-OSM-015: confirmed -> shipping (VALID)

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
| status | shipping |

## Test steps
1. Gửi request PUT cập nhật trạng thái đơn hàng
2. Truyền body `{"status":"shipping"}`
3. Kiểm tra DB

## Expected result
- Trạng thái được cập nhật thành `shipping`
- Response trả về `{"message":"Order status updated"}`
- HTTP Status = 200

## Status / Related bugs
Not Run / None