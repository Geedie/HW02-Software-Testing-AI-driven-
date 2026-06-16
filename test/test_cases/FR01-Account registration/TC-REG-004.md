# TC-REG-004: Duplicate email — seeded admin

## Requirement ID
FR-REG-01

## Module / Test type / Technique
Registration / Functional / Negative Testing

## Preconditions
- DB đã tồn tại email `admin@eshop.com`

## Test data

| Field | Value |
|---------|---------|
| name | Test |
| email | admin@eshop.com |
| password | pass123 |

## Test steps
1. Gửi request POST `/api/register`
2. Sử dụng email đã tồn tại

## Expected result
- Hiển thị lỗi email đã tồn tại
- HTTP Status = 400 hoặc 409

## Status / Related bugs
Not Run / None