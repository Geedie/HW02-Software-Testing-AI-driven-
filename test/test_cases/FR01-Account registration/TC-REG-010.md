# TC-REG-010: Empty string password

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
| email | emptypass@test.com |
| password | "" |

## Test steps
1. Gửi request POST `/api/register`
2. Truyền password rỗng

## Expected result
- Hiển thị lỗi password không hợp lệ hoặc bắt buộc
- HTTP Status = 400

## Status / Related bugs
Not Run / None