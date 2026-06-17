# TC-OSM-005: :id = string "abc"

## Requirement ID
FR-OSM-01

## Module / Test type / Technique
Order State Machine / Functional / Data Type Testing

## Preconditions
- Admin có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| API Path | /api/admin/orders/abc/status |
| status | confirmed |

## Test steps
1. Gửi request PUT `/api/admin/orders/abc/status`
2. Truyền body `{"status":"confirmed"}`
3. Quan sát phản hồi từ hệ thống

## Expected result
- Hệ thống từ chối dữ liệu sai kiểu
- HTTP Status = 400 hoặc 404

## Status / Related bugs
Not Run / None