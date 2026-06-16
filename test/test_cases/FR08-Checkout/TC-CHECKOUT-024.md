# TC-CHECKOUT-024: shipping_address missing from body

## Requirement ID
FR-CHECKOUT-01

## Module / Test type / Technique
Checkout / Functional / Negative Testing

## Preconditions
- Có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| total_amount | 100 |

## Test steps
1. Gửi request POST `/api/checkout`
2. Không truyền shipping_address

## Expected result
- Hiển thị lỗi hoặc lưu giá trị NULL
- HTTP Status = 400 hoặc 200

## Status / Related bugs
Not Run / None