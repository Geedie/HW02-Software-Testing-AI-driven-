# TC-REG-035: Concurrent duplicate registration

## Requirement ID
FR-REG-01

## Module / Test type / Technique
Registration / Functional / Concurrency Testing

## Preconditions
- Email `race@test.com` chưa tồn tại

## Test data

| Field | Value |
|---------|---------|
| name | Race User |
| email | race@test.com |
| password | pass123 |

## Test steps
1. Chuẩn bị 2 request POST `/api/register`
2. Cả hai request sử dụng cùng email `race@test.com`
3. Gửi đồng thời hai request

## Expected result
- Chỉ một user được tạo thành công
- Request thứ hai nhận lỗi email đã tồn tại
- HTTP Status = 201 và 400/409

## Status / Related bugs
Not Run / None