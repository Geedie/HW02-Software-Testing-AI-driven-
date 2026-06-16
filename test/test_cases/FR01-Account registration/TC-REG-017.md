# TC-REG-017: Email at 254 chars (RFC max)

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
| email | <254-character email> |
| password | pass123 |

## Test steps
1. Gửi request POST `/api/register`
2. Nhập email có độ dài 254 ký tự

## Expected result
- User được tạo thành công hoặc hiển thị lỗi vượt giới hạn
- HTTP Status = 201 hoặc 400

## Status / Related bugs
Not Run / None