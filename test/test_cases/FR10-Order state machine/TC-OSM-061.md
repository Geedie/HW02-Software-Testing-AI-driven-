# TC-OSM-061: Update After Terminal State

## Requirement ID
FR-OSM-01

## Module / Test type / Technique
Order State Machine / Functional / End-to-End Testing

## Preconditions
- Đơn hàng đã ở trạng thái `delivered`
- Admin có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| status | confirmed |

## Test steps
1. Gửi request chuyển trạng thái từ `delivered` -> `confirmed`
2. Quan sát phản hồi

## Expected result
- Không được phép cập nhật trạng thái sau khi đã hoàn tất vòng đời
- Response: `{"error":"Invalid state transition from delivered to confirmed"}`
- HTTP Status = 400

## Status / Related bugs
Not Run / None