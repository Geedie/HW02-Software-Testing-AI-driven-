# TC-OSM-003: :id = non-existent integer (99999)

## Requirement ID
FR-OSM-01

## Module / Test type / Technique
Order State Machine / Functional / Equivalence Partitioning

## Preconditions
- Không tồn tại Order #99999 trong DB
- Admin có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| API Path | /api/admin/orders/99999/status |
| status | confirmed |

## Test steps
1. Gửi request PUT `/api/admin/orders/99999/status`
2. Truyền body `{"status":"confirmed"}`
3. Quan sát phản hồi từ hệ thống

## Expected result
- Không tìm thấy đơn hàng
- Response trả về `{"error":"Order not found"}`
- HTTP Status = 404

## Status / Related bugs
Not Run / None