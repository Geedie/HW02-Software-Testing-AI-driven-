# TC-CHECKOUT-002: Happy path — minimum plausible amount

## Requirement ID
FR-CHECKOUT-01

## Module / Test type / Technique
Checkout / Functional / Boundary Value Analysis

## Preconditions
- User có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| Authorization | Bearer <valid_token> |
| total_amount | 1 |
| shipping_address | A |

## Test steps
1. Gửi request POST `/api/checkout`
2. Nhập total_amount = 1

## Expected result
- Checkout thành công
- Trả về orderId
- HTTP Status = 200

## Status / Related bugs
Not Run / None