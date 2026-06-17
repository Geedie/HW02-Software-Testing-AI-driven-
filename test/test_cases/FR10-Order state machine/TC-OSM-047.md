# TC-OSM-047: Cancel Another User's Order (BOLA / IDOR)

## Requirement ID
FR-OSM-02

## Module / Test type / Technique
Order Cancellation / Security / Authorization Testing

## Preconditions
- User A tồn tại
- User B tồn tại
- Order Y thuộc User B
- Trạng thái đơn hàng = `pending`

## Test data

| Field | Value |
|---------|---------|
| Endpoint | /api/orders/Y/cancel |
| JWT | User A Token |

## Test steps
1. User A gửi request hủy Order Y
2. Quan sát phản hồi

## Expected result
- Không được phép thao tác trên đơn hàng của người khác
- Response: `{"error":"Order not found"}`
- HTTP Status = 404

## Status / Related bugs
Not Run / None