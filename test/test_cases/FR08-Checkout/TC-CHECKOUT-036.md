# TC-CHECKOUT-036: total_amount as boolean true

## Requirement ID
FR-CHECKOUT-01

## Module / Test type / Technique
Checkout / Functional / Data Type Testing

## Preconditions
- Có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| total_amount | true |
| shipping_address | X |

## Test steps
1. Gửi request POST /api/checkout
2. Truyền total_amount kiểu boolean

## Expected result
- Giá trị bị từ chối hoặc được ép kiểu
- HTTP Status = 400 hoặc 200

## Status / Related bugs
Not Run / None