# TC-OSM-006: :id = float "1.5"

## Requirement ID
FR-OSM-01

## Module / Test type / Technique
Order State Machine / Functional / Data Type Testing

## Preconditions
- Admin có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| API Path | /api/admin/orders/1.5/status |
| status | confirmed |

## Test steps
1. Gửi request PUT `/api/admin/orders/1.5/status`
2. Truyền body `{"status":"confirmed"}`
3. Quan sát phản hồi từ hệ thống

## Expected result
- Hệ thống từ chối dữ liệu sai kiểu
- HTTP Status = 400 hoặc 404

## Status / Related bugs
Not Run / None