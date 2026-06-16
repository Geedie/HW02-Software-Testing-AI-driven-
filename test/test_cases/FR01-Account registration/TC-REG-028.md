# TC-REG-028: Role = invalid enum value

## Requirement ID
FR-REG-01

## Module / Test type / Technique
Registration / Functional / Negative Testing

## Preconditions
- Email `roleinvalid@test.com` chưa tồn tại

## Test data

| Field | Value |
|---------|---------|
| name | A |
| email | roleinvalid@test.com |
| password | pass123 |
| role | superuser |

## Test steps
1. Gửi request POST `/api/register`
2. Truyền role không hợp lệ

## Expected result
- Trả về lỗi hoặc vẫn lưu dữ liệu tùy theo validation hiện tại
- HTTP Status = 400 hoặc 201

## Status / Related bugs
Not Run / None