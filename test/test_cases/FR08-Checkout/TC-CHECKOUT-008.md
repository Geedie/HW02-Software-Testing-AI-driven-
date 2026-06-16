# TC-CHECKOUT-008: Tampered JWT (modified payload)

## Requirement ID
FR-CHECKOUT-01

## Module / Test type / Technique
Checkout / Security / Authentication Testing

## Preconditions
- N/A

## Test data

| Field | Value |
|---------|---------|
| Authorization | Bearer <modified_token> |
| total_amount | 100 |
| shipping_address | ABC |

## Test steps
1. Gửi request POST `/api/checkout`
2. Sử dụng JWT đã bị chỉnh sửa payload

## Expected result
- Trả về lỗi invalid token signature
- HTTP Status = 401

## Status / Related bugs
Not Run / None