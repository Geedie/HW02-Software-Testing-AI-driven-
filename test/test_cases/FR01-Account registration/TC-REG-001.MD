# TC-REG-001: Happy path — valid full registration

## Requirement ID
FR-REG-01

## Module / Test type / Technique
Registration / Functional / Positive Testing

## Preconditions
- Email `newuser@test.com` chưa tồn tại trong DB

## Test data

| Field | Value |
|---------|---------|
| name | John Doe |
| email | newuser@test.com |
| password | Password123! |
| phone | 0901234567 |
| shipping_address | 123 Main St |

## Test steps
1. Gửi request POST `/api/register`
2. Truyền đầy đủ dữ liệu hợp lệ

## Expected result
- User được tạo thành công
- Trả về thông tin user hoặc thông báo thành công
- HTTP Status = 201

## Status / Related bugs
Not Run / None