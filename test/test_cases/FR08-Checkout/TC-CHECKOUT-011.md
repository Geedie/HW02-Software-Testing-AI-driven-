# TC-CHECKOUT-011: total_amount = 2 (Min+1)

## Requirement ID
FR-CHECKOUT-01

## Module / Test type / Technique
Checkout / Functional / Boundary Value Analysis

## Preconditions
- Có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| total_amount | 2 |
| shipping_address | 123 Main St |

## Test steps
1. Gửi request POST `/api/checkout`
2. Nhập total_amount = 2

## Expected result
- Checkout thành công
- HTTP Status = 200

## Status / Related bugs
Not Run / None