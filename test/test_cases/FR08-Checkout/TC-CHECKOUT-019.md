# TC-CHECKOUT-019: total_amount as string type

## Requirement ID
FR-CHECKOUT-01

## Module / Test type / Technique
Checkout / Functional / Data Type Testing

## Preconditions
- Có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| total_amount | "150000" |
| shipping_address | 123 Main St |

## Test steps
1. Gửi request POST `/api/checkout`
2. Truyền total_amount dạng string

## Expected result
- Được ép kiểu thành công hoặc trả về lỗi kiểu dữ liệu
- HTTP Status = 200 hoặc 400

## Status / Related bugs
Not Run / None