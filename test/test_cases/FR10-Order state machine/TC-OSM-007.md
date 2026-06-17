# TC-OSM-007: :id = SQL Injection

## Requirement ID
FR-OSM-01

## Module / Test type / Technique
Order State Machine / Security / SQL Injection Testing

## Preconditions
- Admin có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| API Path | /api/admin/orders/1 OR 1=1/status |
| status | confirmed |

## Test steps
1. Gửi request PUT `/api/admin/orders/1 OR 1=1/status`
2. Truyền body `{"status":"confirmed"}`
3. Quan sát phản hồi từ hệ thống

## Expected result
- Router hoặc truy vấn tham số hóa chặn SQL Injection
- Không có dữ liệu nào bị cập nhật trái phép
- HTTP Status = 400 hoặc 404

## Status / Related bugs
Not Run / None