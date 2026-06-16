# TC-REG-025: Role omitted to defaults to user

## Requirement ID
FR-REG-01

## Module / Test type / Technique
Registration / Functional / Default Value Testing

## Preconditions
- Email `roledefault@test.com` chưa tồn tại

## Test data

| Field | Value |
|---------|---------|
| name | A |
| email | roledefault@test.com |
| password | pass123 |
| role | Omitted |

## Test steps
1. Gửi request POST `/api/register`
2. Không truyền trường role
3. Kiểm tra dữ liệu trong DB

## Expected result
- role được gán là `user`
- HTTP Status = 201

## Status / Related bugs
Not Run / None