# TC-OSM-044: Empty Request Body

## Requirement ID
FR-OSM-01

## Module / Test type / Technique
Order State Machine / Functional / Robustness Testing

## Preconditions
- Đơn hàng tồn tại
- Admin có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| Body | Empty |

## Test steps
1. Gửi request PUT cập nhật trạng thái đơn hàng
2. Không gửi body dữ liệu
3. Quan sát phản hồi

## Expected result
- Hệ thống từ chối request do không có dữ liệu đầu vào
- HTTP Status = 400 / 500

## Status / Related bugs
Not Run / None