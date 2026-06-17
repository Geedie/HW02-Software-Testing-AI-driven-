# TC-OSM-001: :id = valid existing order

## Requirement ID
FR-OSM-01

## Module / Test type / Technique
Order State Machine / Functional / Equivalence Partitioning

## Preconditions
- Order #1 tồn tại trong hệ thống
- Trạng thái hiện tại của Order = `pending`
- Admin có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| API Path | /api/admin/orders/1/status |
| status | confirmed |

## Test steps
1. Gửi request PUT `/api/admin/orders/1/status`
2. Truyền body `{"status":"confirmed"}`
3. Quan sát phản hồi từ hệ thống

## Expected result
- Trạng thái đơn hàng được cập nhật thành công
- Response trả về `{"message":"Order status updated"}`
- HTTP Status = 200

## Status / Related bugs
Not Run / None