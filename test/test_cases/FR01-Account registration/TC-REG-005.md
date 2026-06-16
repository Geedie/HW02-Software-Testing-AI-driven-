# TC-REG-005: Duplicate email — seeded user

## Requirement ID
FR-REG-01

## Module / Test type / Technique
Registration / Functional / Negative Testing

## Preconditions
- DB đã tồn tại email `test@eshop.com`

## Test data

| Field | Value |
|---------|---------|
| name | Test |
| email | test@eshop.com |
| password | pass123 |

## Test steps
1. Gửi request POST `/api/register`
2. Sử dụng email đã tồn tại

## Expected result
- Hiển thị lỗi email đã tồn tại
- HTTP Status = 400 hoặc 409

## Status / Related bugs
Not Run / None