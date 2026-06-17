# TC-OSM-035: status = null

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
| status | null |

## Test steps
1. Gửi request PUT cập nhật trạng thái đơn hàng
2. Truyền body `{"status": null}`
3. Quan sát phản hồi từ hệ thống

## Expected result
- Không chấp nhận giá trị null
- Hệ thống trả lỗi validation hoặc lỗi xử lý
- HTTP Status = 400 / 500

## Status / Related bugs
Not Run / None