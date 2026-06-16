# TC-CHECKOUT-004: No Authorization header

## Requirement ID
FR-CHECKOUT-01

## Module / Test type / Technique
Checkout / Security / Authentication Testing

## Preconditions
- Tồn tại user hợp lệ

## Test data

| Field | Value |
|---------|---------|
| Authorization | Omitted |
| total_amount | 100 |
| shipping_address | ABC |

## Test steps
1. Gửi request POST `/api/checkout`
2. Không gửi Authorization header

## Expected result
- Trả về lỗi unauthorized hoặc token missing
- HTTP Status = 401

## Status / Related bugs
Not Run / None