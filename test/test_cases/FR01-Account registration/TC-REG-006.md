# TC-REG-006: Duplicate email — self-registered

## Requirement ID
FR-REG-01

## Module / Test type / Technique
Registration / Functional / Negative Testing

## Preconditions
- Đã đăng ký thành công email `dup@test.com`

## Test data

| Field | Value |
|---------|---------|
| name | Dup |
| email | dup@test.com |
| password | pass123 |

## Test steps
1. Gửi request POST `/api/register`
2. Đăng ký lần thứ hai bằng cùng email

## Expected result
- Hiển thị lỗi email đã tồn tại
- HTTP Status = 400 hoặc 409

## Status / Related bugs
Not Run / None