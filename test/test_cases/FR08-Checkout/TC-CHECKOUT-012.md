# TC-CHECKOUT-012: total_amount = -1 (negative)

## Requirement ID
FR-CHECKOUT-01

## Module / Test type / Technique
Checkout / Functional / Boundary Value Analysis

## Preconditions
- Có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| total_amount | -1 |
| shipping_address | 123 Main St |

## Test steps
1. Gửi request POST `/api/checkout`
2. Nhập total_amount âm

## Expected result
- Lý tưởng: hiển thị lỗi giá trị không hợp lệ
- HTTP Status = 400 hoặc 200 tùy implementation

## Status / Related bugs
Not Run / None