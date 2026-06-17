# TC-IMPORT-021: name = "A" (1 char)

## Requirement ID
FR-IMPORT-01

## Module / Test type / Technique
Import Products / Functional / Boundary Value Analysis

## Preconditions
- Admin có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| name | A |
| price | 100 |

## Test steps
1. Gửi request POST `/api/admin/import-products`
2. Import sản phẩm có tên dài 1 ký tự

## Expected result
- inserted = 1
- errors = []
- HTTP Status = 200

## Status / Related bugs
Not Run / None