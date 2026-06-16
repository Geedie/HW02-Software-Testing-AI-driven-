# TC-CHECKOUT-003: Happy path — large valid address string

## Requirement ID
FR-CHECKOUT-01

## Module / Test type / Technique
Checkout / Functional / Stress Testing

## Preconditions
- User có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| Authorization | Bearer <valid_token> |
| total_amount | 50000 |
| shipping_address | <500 ký tự A> |

## Test steps
1. Gửi request POST `/api/checkout`
2. Nhập địa chỉ dài 500 ký tự

## Expected result
- Checkout thành công
- HTTP Status = 200

## Status / Related bugs
Not Run / None