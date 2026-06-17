# TC-OSM-036: status missing from body

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
| Body | {} |

## Test steps
1. Gửi request PUT cập nhật trạng thái đơn hàng
2. Không truyền trường `status`
3. Quan sát phản hồi từ hệ thống

## Expected result
- Hệ thống từ chối request do thiếu trường bắt buộc
- HTTP Status = 400 / 500

## Status / Related bugs
Not Run / None