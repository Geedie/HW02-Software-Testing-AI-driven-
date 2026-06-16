# TC-REG-022: Name = null

## Requirement ID
FR-REG-01

## Module / Test type / Technique
Registration / Functional / Null Testing

## Preconditions
- Email `nullname@test.com` chưa tồn tại

## Test data

| Field | Value |
|---------|---------|
| name | null |
| email | nullname@test.com |
| password | pass123 |

## Test steps
1. Gửi request POST `/api/register`
2. Nhập name = null

## Expected result
- Thành công nếu cho phép null hoặc hiển thị lỗi
- HTTP Status = 201 hoặc 400

## Status / Related bugs
Not Run / None