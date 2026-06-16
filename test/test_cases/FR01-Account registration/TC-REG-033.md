# TC-REG-033: Empty request body {}

## Requirement ID
FR-REG-01

## Module / Test type / Technique
Registration / Functional / Negative Testing

## Preconditions
- Database sạch

## Test data

| Field | Value |
|---------|---------|
| Request Body | {} |

## Test steps
1. Gửi request POST `/api/register`
2. Body là JSON rỗng

## Expected result
- Hiển thị lỗi thiếu trường bắt buộc
- HTTP Status = 400

## Status / Related bugs
Not Run / None