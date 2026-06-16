# TC-CHECKOUT-006: Expired JWT token

## Requirement ID
FR-CHECKOUT-01

## Module / Test type / Technique
Checkout / Security / Authentication Testing

## Preconditions
- Có JWT hết hạn

## Test data

| Field | Value |
|---------|---------|
| Authorization | Bearer <expired_token> |
| total_amount | 100 |
| shipping_address | ABC |

## Test steps
1. Gửi request POST `/api/checkout`
2. Sử dụng JWT đã hết hạn

## Expected result
- Trả về lỗi token expired
- HTTP Status = 401

## Status / Related bugs
Not Run / None