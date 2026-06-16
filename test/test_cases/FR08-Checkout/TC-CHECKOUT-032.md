# TC-CHECKOUT-032: Verify user_id binding from token

## Requirement ID
FR-CHECKOUT-01

## Module / Test type / Technique
Checkout / Security / Authorization Testing

## Preconditions
- User A có JWT hợp lệ
- User B tồn tại trong hệ thống

## Test data

| Field | Value |
|---------|---------|
| total_amount | 100 |
| shipping_address | X |

## Test steps
1. Gửi request bằng token của User A
2. Kiểm tra dữ liệu order trong DB

## Expected result
- user_id của order thuộc User A
- Không thuộc User B
- HTTP Status = 200

## Status / Related bugs
Not Run / None