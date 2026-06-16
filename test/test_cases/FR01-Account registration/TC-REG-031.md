# TC-REG-031: Phone = non-numeric string

## Requirement ID
FR-REG-01

## Module / Test type / Technique
Registration / Functional / Negative Testing

## Preconditions
- Email `phonestr@test.com` chưa tồn tại

## Test data

| Field | Value |
|---------|---------|
| name | A |
| email | phonestr@test.com |
| password | pass123 |
| phone | not-a-phone |

## Test steps
1. Gửi request POST `/api/register`
2. Truyền phone dạng chuỗi

## Expected result
- User được tạo thành công nếu không có validation định dạng
- HTTP Status = 201

## Status / Related bugs
Not Run / None