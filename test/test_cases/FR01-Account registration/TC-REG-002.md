# TC-REG-002: Happy path — minimal required fields only

## Requirement ID
FR-REG-01

## Module / Test type / Technique
Registration / Functional / Equivalence Partitioning

## Preconditions
- Email `minimal@test.com` chưa tồn tại trong DB

## Test data

| Field | Value |
|---------|---------|
| name | Jane |
| email | minimal@test.com |
| password | pass |

## Test steps
1. Gửi request POST `/api/register`
2. Chỉ truyền các trường bắt buộc

## Expected result
- User được tạo thành công
- role mặc định là `user`
- HTTP Status = 201

## Status / Related bugs
Not Run / None