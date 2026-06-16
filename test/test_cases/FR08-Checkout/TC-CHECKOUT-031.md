# TC-CHECKOUT-031: Mass assignment — inject created_at

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
| created_at | 2000-01-01 |

## Test steps
1. Gửi request POST `/api/checkout`
2. Truyền created_at trong body

## Expected result
- created_at sử dụng timestamp của server
- Giá trị body bị bỏ qua
- HTTP Status = 200

## Status / Related bugs
Not Run / None