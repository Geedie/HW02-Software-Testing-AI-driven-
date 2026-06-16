# TC-CHECKOUT-023: shipping_address = null

## Requirement ID
FR-CHECKOUT-01

## Module / Test type / Technique
Checkout / Functional / Null Testing

## Preconditions
- Có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| total_amount | 100 |
| shipping_address | null |

## Test steps
1. Gửi request POST `/api/checkout`
2. Truyền shipping_address = null

## Expected result
- Hiển thị lỗi hoặc lưu NULL
- HTTP Status = 400 hoặc 200

## Status / Related bugs
Not Run / None