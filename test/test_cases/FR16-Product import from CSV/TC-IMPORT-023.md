# TC-IMPORT-023: name = 255-character string

## Requirement ID
FR-IMPORT-01

## Module / Test type / Technique
Import Products / Functional / Boundary Value Analysis

## Preconditions
- Admin có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| name | <255 x 'A'> |
| price | 100 |

## Test steps
1. Gửi request POST `/api/admin/import-products`
2. Import sản phẩm với tên dài 255 ký tự

## Expected result
- Insert thành công
- HTTP Status = 200

## Status / Related bugs
Not Run / None