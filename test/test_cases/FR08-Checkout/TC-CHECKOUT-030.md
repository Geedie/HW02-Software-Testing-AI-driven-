# TC-CHECKOUT-030: Mass assignment — inject id in body

## Requirement ID
FR-CHECKOUT-01

## Module / Test type / Technique
Checkout / Security / Mass Assignment Testing

## Preconditions
- Có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| total_amount | 100 |
| shipping_address | X |
| id | 9999 |

## Test steps
1. Gửi request POST `/api/checkout`
2. Truyền id trong body

## Expected result
- id được hệ thống tự sinh
- Giá trị body bị bỏ qua
- HTTP Status = 200

## Status / Related bugs
Not Run / None