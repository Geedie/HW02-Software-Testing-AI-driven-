# TC-OSM-043: status = 1 (Wrong Type)

## Requirement ID
FR-OSM-01

## Module / Test type / Technique
Order State Machine / Functional / Robustness Testing

## Preconditions
- Đơn hàng tồn tại
- Trạng thái hiện tại = `pending`
- Admin có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| status | 1 |

## Test steps
1. Gửi request PUT cập nhật trạng thái đơn hàng
2. Truyền body `{"status":1}`
3. Quan sát phản hồi

## Expected result
- Kiểu dữ liệu không hợp lệ
- HTTP Status = 400 / 500

## Status / Related bugs
Not Run / None