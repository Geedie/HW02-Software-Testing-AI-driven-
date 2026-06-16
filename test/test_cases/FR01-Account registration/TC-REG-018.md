# TC-REG-018: Email at 255 chars (RFC max + 1)

## Requirement ID
FR-REG-01

## Module / Test type / Technique
Registration / Functional / Boundary Value Analysis

## Preconditions
- Database sạch

## Test data

| Field | Value |
|---------|---------|
| name | A |
| email | <255-character email> |
| password | pass123 |

## Test steps
1. Gửi request POST `/api/register`
2. Nhập email vượt giới hạn RFC

## Expected result
- Hiển thị lỗi email quá dài
- HTTP Status = 400

## Status / Related bugs
Not Run / None