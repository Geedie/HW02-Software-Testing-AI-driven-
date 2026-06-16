# TC-CHECKOUT-007: Token without Bearer prefix

## Requirement ID
FR-CHECKOUT-01

## Module / Test type / Technique
Checkout / Security / Authentication Testing

## Preconditions
- Có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| Authorization | <valid_token_no_prefix> |
| total_amount | 100 |
| shipping_address | ABC |

## Test steps
1. Gửi request POST `/api/checkout`
2. Không thêm tiền tố Bearer

## Expected result
- Trả về lỗi định dạng Authorization không hợp lệ
- HTTP Status = 401

## Status / Related bugs
Not Run / None