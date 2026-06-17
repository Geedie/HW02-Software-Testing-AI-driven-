# TC-OSM-046: Cancel Own Confirmed Order

## Requirement ID
FR-OSM-02

## Module / Test type / Technique
Order Cancellation / Functional / State Transition Testing

## Preconditions
- User A đã đăng nhập
- Order X thuộc User A
- Trạng thái hiện tại = `confirmed`

## Test data

| Field | Value |
|---------|---------|
| Endpoint | /api/orders/X/cancel |

## Test steps
1. Gửi PUT request hủy đơn hàng
2. Kiểm tra dữ liệu DB

## Expected result
- Hủy đơn hàng thành công
- Response: `{"message":"Order canceled successfully"}`
- HTTP Status = 200

## Status / Related bugs
Not Run / None