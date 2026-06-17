# TC-IMPORT-038: price = 2147483648 (INT32 Max+1)

## Requirement ID
FR-IMPORT-01

## Module / Test type / Technique
Import Products / Functional / Boundary Value Analysis

## Preconditions
- Admin có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| name | SP Test |
| price | 2147483648 |

## Test steps
1. Gửi request POST `/api/admin/import-products`
2. Import sản phẩm với giá trị vượt INT32

## Expected result
- Có thể phát sinh lỗi DB hoặc overflow
- HTTP Status = 200 hoặc 500

## Status / Related bugs
Not Run / None