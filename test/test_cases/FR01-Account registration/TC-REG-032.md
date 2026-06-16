# TC-REG-032: Shipping address optional — omitted

## Requirement ID
FR-REG-01

## Module / Test type / Technique
Registration / Functional / Optional Field Testing

## Preconditions
- Email `noaddr@test.com` chưa tồn tại

## Test data

| Field | Value |
|---------|---------|
| name | A |
| email | noaddr@test.com |
| password | pass123 |

## Test steps
1. Gửi request POST `/api/register`
2. Không truyền shipping_address

## Expected result
- User được tạo thành công
- shipping_address = null
- HTTP Status = 201

## Status / Related bugs
Not Run / None