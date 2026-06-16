# TC-REG-021: Name = empty string

## Requirement ID
FR-REG-01

## Module / Test type / Technique
Registration / Functional / Boundary Value Analysis

## Preconditions
- Email `emptyname@test.com` chưa tồn tại

## Test data

| Field | Value |
|---------|---------|
| name | "" |
| email | emptyname@test.com |
| password | pass123 |

## Test steps
1. Gửi request POST `/api/register`
2. Nhập name rỗng

## Expected result
- Thành công nếu name không bắt buộc hoặc hiển thị lỗi nếu bắt buộc
- HTTP Status = 201 hoặc 400

## Status / Related bugs
Not Run / None