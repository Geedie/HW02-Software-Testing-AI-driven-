# TC-OSM-042: status = " confirmed" (Leading Space)

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
| status | " confirmed" |

## Test steps
1. Gửi request PUT cập nhật trạng thái đơn hàng
2. Truyền body `{"status":" confirmed"}`
3. Quan sát phản hồi

## Expected result
- Không tìm thấy trạng thái hợp lệ do khoảng trắng đầu chuỗi
- HTTP Status = 400

## Status / Related bugs
Not Run / None