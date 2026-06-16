# TC-REG-014: Email with no domain

## Requirement ID
FR-REG-01

## Module / Test type / Technique
Registration / Functional / Equivalence Partitioning

## Preconditions
- Database sạch

## Test data

| Field | Value |
|---------|---------|
| name | A |
| email | user@ |
| password | pass123 |

## Test steps
1. Gửi request POST `/api/register`
2. Nhập email không có domain

## Expected result
- Hiển thị lỗi định dạng email không hợp lệ (nếu có validation)
- HTTP Status = 400

## Status / Related bugs
Not Run / None