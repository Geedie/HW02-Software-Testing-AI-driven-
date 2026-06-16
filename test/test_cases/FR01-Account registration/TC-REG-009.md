# TC-REG-009: Empty string email

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
| email | "" |
| password | pass123 |

## Test steps
1. Gửi request POST `/api/register`
2. Truyền email rỗng

## Expected result
- Hiển thị lỗi email không hợp lệ
- HTTP Status = 400

## Status / Related bugs
Not Run / None