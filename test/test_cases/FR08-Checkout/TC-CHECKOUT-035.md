# TC-CHECKOUT-035: Concurrent checkouts — same user

## Requirement ID
FR-CHECKOUT-01

## Module / Test type / Technique
Checkout / Functional / Concurrency Testing

## Preconditions
- User có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| total_amount | 100 |
| shipping_address | X |

## Test steps
1. Chuẩn bị 2 request checkout giống nhau
2. Gửi đồng thời

## Expected result
- Tạo 2 order riêng biệt
- Mỗi order có orderId khác nhau
- HTTP Status = 200 cho cả hai request

## Status / Related bugs
Not Run / None