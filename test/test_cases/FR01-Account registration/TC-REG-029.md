# TC-REG-029: Phone optional — omitted

## Requirement ID
FR-REG-01

## Module / Test type / Technique
Registration / Functional / Optional Field Testing

## Preconditions
- Email `nophone@test.com` chưa tồn tại

## Test data

| Field | Value |
|---------|---------|
| name | A |
| email | nophone@test.com |
| password | pass123 |

## Test steps
1. Gửi request POST `/api/register`
2. Không truyền phone

## Expected result
- User được tạo thành công
- phone = null
- HTTP Status = 201

## Status / Related bugs
Not Run / None