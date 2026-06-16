# TC-CHECKOUT-027: Empty body {}

## Requirement ID
FR-CHECKOUT-01

## Module / Test type / Technique
Checkout / Functional / Negative Testing

## Preconditions
- Có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| Request Body | {} |

## Test steps
1. Gửi request POST `/api/checkout`
2. Body là JSON rỗng

## Expected result
- Hiển thị lỗi thiếu dữ liệu bắt buộc
- HTTP Status = 400 hoặc 500

## Status / Related bugs
Not Run / None