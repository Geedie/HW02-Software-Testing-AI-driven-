# TC-REG-023: Name = 1 character (Min)

## Requirement ID
FR-REG-01

## Module / Test type / Technique
Registration / Functional / Boundary Value Analysis

## Preconditions
- Email `name1@test.com` chưa tồn tại

## Test data

| Field | Value |
|---------|---------|
| name | A |
| email | name1@test.com |
| password | pass123 |

## Test steps
1. Gửi request POST `/api/register`
2. Nhập name dài 1 ký tự

## Expected result
- User được tạo thành công
- HTTP Status = 201

## Status / Related bugs
Not Run / None