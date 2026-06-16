# TC-CHECKOUT-020: total_amount as float

## Requirement ID
FR-CHECKOUT-01

## Module / Test type / Technique
Checkout / Functional / Data Type Testing

## Preconditions
- Có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| total_amount | 99.99 |
| shipping_address | 123 Main St |

## Test steps
1. Gửi request POST `/api/checkout`
2. Truyền total_amount dạng số thực

## Expected result
- Được xử lý hoặc trả lỗi tùy theo validation
- HTTP Status = 200 hoặc 400

## Status / Related bugs
Not Run / None