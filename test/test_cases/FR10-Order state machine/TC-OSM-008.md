# TC-OSM-008: No Authorization header

## Requirement ID
FR-OSM-01

## Module / Test type / Technique
Order State Machine / Security / Authentication Testing

## Preconditions
- Đơn hàng hợp lệ tồn tại trong hệ thống

## Test data

| Field | Value |
|---------|---------|
| Authorization | None |
| status | confirmed |

## Test steps
1. Gửi request PUT tới endpoint cập nhật trạng thái đơn hàng
2. Không gửi Authorization header
3. Quan sát phản hồi từ hệ thống

## Expected result
- Hệ thống từ chối truy cập
- Trả về Unauthorized
- HTTP Status = 401

## Status / Related bugs
Not Run / None