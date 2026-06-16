# TC-CHECKOUT-021: shipping_address = 1 char (Min)

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
| shipping_address | A |

## Test steps
1. Gửi request POST `/api/checkout`
2. Nhập địa chỉ dài 1 ký tự

## Expected result
- Checkout thành công
- HTTP Status = 200

## Status / Related bugs
Not Run / None