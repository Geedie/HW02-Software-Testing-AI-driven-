# TC-REG-016: Email at RFC min length (6 chars)

## Requirement ID
FR-REG-01

## Module / Test type / Technique
Registration / Functional / Boundary Value Analysis

## Preconditions
- Database sạch

## Test data

| Field | Value |
|---------|---------|
| name | A |
| email | a@b.co |
| password | pass123 |

## Test steps
1. Gửi request POST `/api/register`
2. Nhập email có độ dài tối thiểu hợp lệ

## Expected result
- User được tạo thành công
- HTTP Status = 201

## Status / Related bugs
Not Run / None