# TC-CHECKOUT-022: shipping_address = empty string

## Requirement ID
FR-CHECKOUT-01

## Module / Test type / Technique
Checkout / Functional / Boundary Value Analysis

## Preconditions
- Có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| total_amount | 100 |
| shipping_address | "" |

## Test steps
1. Gửi request POST `/api/checkout`
2. Truyền địa chỉ rỗng

## Expected result
- Hiển thị lỗi hoặc vẫn cho phép checkout
- HTTP Status = 400 hoặc 200

## Status / Related bugs
Not Run / None