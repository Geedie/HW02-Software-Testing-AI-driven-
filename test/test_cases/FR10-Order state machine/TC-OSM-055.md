# TC-OSM-055: Cancel shipping Order (DEFECT-02 - Currently ALLOWED, Should Be BLOCKED)

## Requirement ID
FR-OSM-02

## Module / Test type / Technique
Order Cancellation / Functional / Defect Verification

## Preconditions
- User A sở hữu đơn hàng
- Trạng thái hiện tại = `shipping`
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
- Theo nghiệp vụ, đơn hàng đang giao không được phép hủy
- Tuy nhiên code hiện tại vẫn cho phép hủy
- Response: `{"message":"Order canceled successfully"}`
- Trạng thái đơn hàng chuyển thành `canceled`
- HTTP Status = 200

## Status / Related bugs
Not Run / DEFECT-02