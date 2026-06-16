# TC-REG-007: Missing email field

## Requirement ID
FR-REG-01

## Module / Test type / Technique
Registration / Functional / Negative Testing

## Preconditions
- Database sạch

## Test data

| Field | Value |
|---------|---------|
| name | NoEmail |
| password | pass123 |

## Test steps
1. Gửi request POST `/api/register`
2. Không truyền trường email

## Expected result
- Hiển thị lỗi email bắt buộc
- HTTP Status = 400

## Status / Related bugs
Not Run / None