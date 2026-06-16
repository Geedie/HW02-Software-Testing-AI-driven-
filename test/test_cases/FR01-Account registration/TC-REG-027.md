# TC-REG-027: Mass assignment — role = admin

## Requirement ID
FR-REG-01

## Module / Test type / Technique
Registration / Security / Authorization Testing

## Preconditions
- Email `roleadmin@test.com` chưa tồn tại

## Test data

| Field | Value |
|---------|---------|
| name | A |
| email | roleadmin@test.com |
| password | pass123 |
| role | admin |

## Test steps
1. Gửi request POST `/api/register`
2. Truyền role = admin

## Expected result
- role bị bỏ qua và lưu là user hoặc trả về lỗi
- HTTP Status = 201 hoặc 400

## Status / Related bugs
Not Run / None