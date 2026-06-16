# TC-REG-030: Phone = valid nominal

## Requirement ID
FR-REG-01

## Module / Test type / Technique
Registration / Functional / Positive Testing

## Preconditions
- Email `phone@test.com` chưa tồn tại

## Test data

| Field | Value |
|---------|---------|
| name | A |
| email | phone@test.com |
| password | pass123 |
| phone | 0901234567 |

## Test steps
1. Gửi request POST `/api/register`
2. Truyền số điện thoại hợp lệ

## Expected result
- User được tạo thành công
- HTTP Status = 201

## Status / Related bugs
Not Run / None