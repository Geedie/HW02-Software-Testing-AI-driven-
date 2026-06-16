# TC-CHECKOUT-028: Mass assignment — inject user_id in body

## Requirement ID
FR-CHECKOUT-01

## Module / Test type / Technique
Checkout / Security / Mass Assignment Testing

## Preconditions
- User A đăng nhập bằng JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| total_amount | 100 |
| shipping_address | X |
| user_id | 1 |

## Test steps
1. Gửi request POST `/api/checkout`
2. Truyền thêm user_id trong body
3. Kiểm tra dữ liệu trong DB

## Expected result
- user_id lấy từ JWT
- Giá trị user_id trong body bị bỏ qua
- HTTP Status = 200

## Status / Related bugs
Not Run / None