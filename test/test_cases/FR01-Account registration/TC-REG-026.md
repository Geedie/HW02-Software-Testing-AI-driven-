# TC-REG-026: Role = user explicitly

## Requirement ID
FR-REG-01

## Module / Test type / Technique
Registration / Functional / Positive Testing

## Preconditions
- Email `roleuser@test.com` chưa tồn tại

## Test data

| Field | Value |
|---------|---------|
| name | A |
| email | roleuser@test.com |
| password | pass123 |
| role | user |

## Test steps
1. Gửi request POST `/api/register`
2. Truyền role = user

## Expected result
- User được tạo thành công
- role = user
- HTTP Status = 201

## Status / Related bugs
Not Run / None