# TC-REG-034: Non-JSON content type

## Requirement ID
FR-REG-01

## Module / Test type / Technique
Registration / Functional / Negative Testing

## Preconditions
- Database sạch

## Test data

| Field | Value |
|---------|---------|
| Content-Type | text/plain |
| Body | name=A&email=a@b.co&password=pass |

## Test steps
1. Gửi request POST `/api/register`
2. Sử dụng Content-Type = text/plain

## Expected result
- Hiển thị lỗi Content-Type không hợp lệ
- HTTP Status = 400 hoặc 415

## Status / Related bugs
Not Run / None