# TC-CHECKOUT-034: Malformed JSON body

## Requirement ID
FR-CHECKOUT-01

## Module / Test type / Technique
Checkout / Functional / Negative Testing

## Preconditions
- Có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| Raw Body | {total_amount: 100, shipping_address: X} |

## Test steps
1. Gửi request POST /api/checkout
2. Body chứa JSON sai cú pháp

## Expected result
- JSON parse error
- HTTP Status = 400

## Status / Related bugs
Not Run / None