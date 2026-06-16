# TC-REG-012: Password = null

## Requirement ID
FR-REG-01

## Module / Test type / Technique
Registration / Functional / Null Testing

## Preconditions
- Database sạch

## Test data

| Field | Value |
|---------|---------|
| name | A |
| email | nullpass@test.com |
| password | null |

## Test steps
1. Gửi request POST `/api/register`
2. Truyền password = null

## Expected result
- Hiển thị lỗi password bắt buộc
- HTTP Status = 400

## Status / Related bugs
Not Run / None