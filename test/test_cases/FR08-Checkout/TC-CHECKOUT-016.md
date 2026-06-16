# TC-CHECKOUT-016: total_amount = 2147483648 (INT32 Max+1)

## Requirement ID
FR-CHECKOUT-01

## Module / Test type / Technique
Checkout / Functional / Boundary Value Analysis

## Preconditions
- Có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| total_amount | 2147483648 |
| shipping_address | 123 Main St |

## Test steps
1. Gửi request POST `/api/checkout`
2. Nhập total_amount vượt giới hạn INT32

## Expected result
- Hệ thống xử lý lỗi phù hợp
- HTTP Status = 400 hoặc 500

## Status / Related bugs
Not Run / None