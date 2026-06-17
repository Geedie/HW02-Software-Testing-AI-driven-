# TC-OSM-045: Happy Path - Cancel Own Pending Order

## Requirement ID
FR-OSM-02

## Module / Test type / Technique
Order Cancellation / Functional / State Transition Testing

## Preconditions
- User A đã đăng nhập
- Order X thuộc User A
- Trạng thái hiện tại = `pending`

## Test data

| Field | Value |
|---------|---------|
| Endpoint | /api/orders/X/cancel |
| JWT | User A Token |

## Test steps
1. Gửi PUT request đến endpoint cancel
2. Sử dụng JWT của User A
3. Kiểm tra dữ liệu DB

## Expected result
- Hủy đơn hàng thành công
- Response: `{"message":"Order canceled successfully"}`
- Trạng thái DB = `canceled`
- HTTP Status = 200

## Status / Related bugs
Not Run / None