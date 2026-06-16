# TC-REG-011: Email = null

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
| email | null |
| password | pass123 |

## Test steps
1. Gửi request POST `/api/register`
2. Truyền email = null

## Expected result
- Hiển thị lỗi email bắt buộc
- HTTP Status = 400

## Status / Related bugs
Not Run / None