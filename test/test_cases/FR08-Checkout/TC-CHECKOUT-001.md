# TC-CHECKOUT-001: Happy path — valid full checkout

## Requirement ID
FR-CHECKOUT-01

## Module / Test type / Technique
Checkout / Functional / Positive Testing

## Preconditions
- User `test@eshop.com` đã đăng nhập
- Có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| Authorization | Bearer <valid_token> |
| total_amount | 150000 |
| shipping_address | 123 Nguyen Hue, Quan 1, TPHCM |

## Test steps
1. Gửi request POST `/api/checkout`
2. Đính kèm JWT hợp lệ trong Authorization header
3. Truyền dữ liệu checkout hợp lệ

## Expected result
- Trả về message `Checkout successful`
- Trả về `orderId`
- Order được tạo trong DB
- `status = pending`
- `user_id` trùng với user trong JWT
- HTTP Status = 200

## Status / Related bugs
Not Run / None