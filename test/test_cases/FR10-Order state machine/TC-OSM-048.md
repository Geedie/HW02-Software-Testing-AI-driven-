# TC-OSM-048: Cancel Non-existent Order

## Requirement ID
FR-OSM-02

## Module / Test type / Technique
Order Cancellation / Functional / Boundary Value Analysis

## Preconditions
- User A đã đăng nhập
- Không tồn tại Order #99999

## Test data

| Field | Value |
|---------|---------|
| Endpoint | /api/orders/99999/cancel |

## Test steps
1. Gửi request hủy đơn hàng không tồn tại
2. Quan sát phản hồi

## Expected result
- Response: `{"error":"Order not found"}`
- HTTP Status = 404

## Status / Related bugs
Not Run / None