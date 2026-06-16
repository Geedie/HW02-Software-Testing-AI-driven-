# TC-REG-008: Missing password field

## Requirement ID
FR-REG-01

## Module / Test type / Technique
Registration / Functional / Negative Testing

## Preconditions
- Database sạch

## Test data

| Field | Value |
|---------|---------|
| name | NoPass |
| email | nopass@test.com |

## Test steps
1. Gửi request POST `/api/register`
2. Không truyền trường password

## Expected result
- Hiển thị lỗi password bắt buộc
- HTTP Status = 400

## Status / Related bugs
Not Run / None