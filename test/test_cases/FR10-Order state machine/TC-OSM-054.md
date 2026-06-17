# TC-OSM-054: Cancel confirmed Order (ALLOWED)

## Requirement ID
FR-OSM-02

## Module / Test type / Technique
Order Cancellation / Functional / State Transition Testing

## Preconditions
- User A sở hữu đơn hàng
- Trạng thái hiện tại = `confirmed`
- User A đã đăng nhập và có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| Endpoint | /api/orders/:id/cancel |
| JWT | User A Token |

## Test steps
1. Gửi request PUT đến endpoint cancel
2. Sử dụng JWT của User A
3. Kiểm tra phản hồi và dữ liệu DB

## Expected result
- Hủy đơn hàng thành công
- Response: `{"message":"Order canceled successfully"}`
- Trạng thái đơn hàng được cập nhật thành `canceled`
- HTTP Status = 200

## Status / Related bugs
Not Run / None