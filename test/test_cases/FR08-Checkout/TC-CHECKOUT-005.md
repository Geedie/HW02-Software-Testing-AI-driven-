# TC-CHECKOUT-005: Invalid JWT token

## Requirement ID
FR-CHECKOUT-01

## Module / Test type / Technique
Checkout / Security / Authentication Testing

## Preconditions
- N/A

## Test data

| Field | Value |
|---------|---------|
| Authorization | Bearer invalid.jwt.xyz |
| total_amount | 100 |
| shipping_address | ABC |

## Test steps
1. Gửi request POST `/api/checkout`
2. Sử dụng JWT không hợp lệ

## Expected result
- Trả về lỗi invalid token
- HTTP Status = 401

## Status / Related bugs
Not Run / None