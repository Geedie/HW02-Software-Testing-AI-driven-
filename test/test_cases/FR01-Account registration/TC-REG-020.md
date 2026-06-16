# TC-REG-020: Password = 1000 chars (stress Max)

## Requirement ID
FR-REG-01

## Module / Test type / Technique
Registration / Functional / Stress Testing

## Preconditions
- Email `pw1000@test.com` chưa tồn tại

## Test data

| Field | Value |
|---------|---------|
| name | A |
| email | pw1000@test.com |
| password | <1000 x 'a'> |

## Test steps
1. Gửi request POST `/api/register`
2. Nhập password dài 1000 ký tự

## Expected result
- User được tạo thành công
- HTTP Status = 201

## Status / Related bugs
Not Run / None