# TC-REG-024: Name = 500 chars (stress)

## Requirement ID
FR-REG-01

## Module / Test type / Technique
Registration / Functional / Stress Testing

## Preconditions
- Email `namelong@test.com` chưa tồn tại

## Test data

| Field | Value |
|---------|---------|
| name | <500 x 'A'> |
| email | namelong@test.com |
| password | pass123 |

## Test steps
1. Gửi request POST `/api/register`
2. Nhập name dài 500 ký tự

## Expected result
- User được tạo thành công
- HTTP Status = 201

## Status / Related bugs
Not Run / None