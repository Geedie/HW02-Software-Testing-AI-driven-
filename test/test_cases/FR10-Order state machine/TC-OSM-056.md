# TC-OSM-056: Cancel delivered Order (BLOCKED)

## Requirement ID
FR-OSM-02

## Module / Test type / Technique
Order Cancellation / Functional / State Transition Testing

## Preconditions
- User A sở hữu đơn hàng
- Trạng thái hiện tại = `delivered`
- User A đã đăng nhập và có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| Endpoint | /api/orders/:id/cancel |
| JWT | User A Token |

## Test steps
1. Gửi request PUT đến endpoint cancel
2. Sử dụng JWT của User A
3. Quan sát phản hồi

## Expected result
- Không được phép hủy đơn hàng đã giao
- Response: `{"error":"Cannot cancel this order."}`
- HTTP Status = 400

## Status / Related bugs
Not Run / None