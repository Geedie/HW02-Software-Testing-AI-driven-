# TC-CHECKOUT-018: total_amount missing from body

## Requirement ID
FR-CHECKOUT-01

## Module / Test type / Technique
Checkout / Functional / Negative Testing

## Preconditions
- Có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| shipping_address | 123 Main St |

## Test steps
1. Gửi request POST `/api/checkout`
2. Không truyền total_amount

## Expected result
- Hiển thị lỗi thiếu dữ liệu bắt buộc
- HTTP Status = 400 hoặc 500

## Status / Related bugs
Not Run / None