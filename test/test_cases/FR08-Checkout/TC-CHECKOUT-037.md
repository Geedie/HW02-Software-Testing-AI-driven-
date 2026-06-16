# TC-CHECKOUT-037: Extra unknown fields in body

## Requirement ID
FR-CHECKOUT-01

## Module / Test type / Technique
Checkout / Functional / Robustness Testing

## Preconditions
- Có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| total_amount | 100 |
| shipping_address | X |
| discount | 50 |
| coupon_code | FREE |

## Test steps
1. Gửi request POST /api/checkout
2. Truyền thêm các field không được định nghĩa

## Expected result
- Các field không xác định bị bỏ qua
- Order được tạo bình thường
- HTTP Status = 200

## Status / Related bugs
Not Run / None