# TC-CHECKOUT-017: total_amount = null

## Requirement ID
FR-CHECKOUT-01

## Module / Test type / Technique
Checkout / Functional / Null Testing

## Preconditions
- Có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| total_amount | null |
| shipping_address | 123 Main St |

## Test steps
1. Gửi request POST `/api/checkout`
2. Truyền total_amount = null

## Expected result
- Hiển thị lỗi thiếu dữ liệu bắt buộc
- HTTP Status = 400 hoặc 500

## Status / Related bugs
Not Run / None