# TC-CHECKOUT-029: Mass assignment — inject status in body

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
| status | completed |

## Test steps
1. Gửi request POST `/api/checkout`
2. Truyền status trong body
3. Kiểm tra dữ liệu trong DB

## Expected result
- status luôn là pending
- Giá trị body bị bỏ qua
- HTTP Status = 200

## Status / Related bugs
Not Run / None