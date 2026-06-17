# TC-OSM-004: :id = negative (-1)

## Requirement ID
FR-OSM-01

## Module / Test type / Technique
Order State Machine / Functional / Boundary Value Analysis

## Preconditions
- Admin có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| API Path | /api/admin/orders/-1/status |
| status | confirmed |

## Test steps
1. Gửi request PUT `/api/admin/orders/-1/status`
2. Truyền body `{"status":"confirmed"}`
3. Quan sát phản hồi từ hệ thống

## Expected result
- Không tìm thấy đơn hàng hoặc dữ liệu không hợp lệ
- HTTP Status = 404 hoặc 400

## Status / Related bugs
Not Run / None