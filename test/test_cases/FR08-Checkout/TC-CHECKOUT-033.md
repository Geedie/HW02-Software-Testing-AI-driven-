# TC-CHECKOUT-033: Non-JSON Content-Type

## Requirement ID
FR-CHECKOUT-01

## Module / Test type / Technique
Checkout / Functional / Negative Testing

## Preconditions
- Có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| Content-Type | text/plain |
| Body | total_amount=100&shipping_address=X |

## Test steps
1. Gửi request POST /api/checkout
2. Sử dụng Content-Type text/plain

## Expected result
- Trả về lỗi Content-Type không hợp lệ
- HTTP Status = 400 hoặc 415

## Status / Related bugs
Not Run / None