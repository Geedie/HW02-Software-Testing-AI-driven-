# TC-REG-019: Password = 1 character (Min)

## Requirement ID
FR-REG-01

## Module / Test type / Technique
Registration / Functional / Boundary Value Analysis

## Preconditions
- Email `pw1@test.com` chưa tồn tại

## Test data

| Field | Value |
|---------|---------|
| name | A |
| email | pw1@test.com |
| password | a |

## Test steps
1. Gửi request POST `/api/register`
2. Nhập password dài 1 ký tự

## Expected result
- User được tạo thành công hoặc hiển thị lỗi độ dài tối thiểu
- HTTP Status = 201 hoặc 400

## Status / Related bugs
Not Run / None