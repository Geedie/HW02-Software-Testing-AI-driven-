# TC-REG-003: Role defaults to 'user' when omitted

## Requirement ID
FR-REG-01

## Module / Test type / Technique
Registration / Functional / Default Value Testing

## Preconditions
- Email `roletest@test.com` chưa tồn tại trong DB

## Test data

| Field | Value |
|---------|---------|
| name | RoleTest |
| email | roletest@test.com |
| password | pass123 |
| role | Omitted |

## Test steps
1. Gửi request POST `/api/register`
2. Không truyền trường role
3. Kiểm tra dữ liệu lưu trong DB

## Expected result
- User được tạo thành công
- role được gán mặc định là `user`
- HTTP Status = 201

## Status / Related bugs
Not Run / None