# TC-IMPORT-024: name = 1000-character string

## Requirement ID
FR-IMPORT-01

## Module / Test type / Technique
Import Products / Performance / Stress Testing

## Preconditions
- Admin có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| name | <1000 x 'A'> |
| price | 100 |

## Test steps
1. Gửi request POST `/api/admin/import-products`
2. Import sản phẩm với tên dài 1000 ký tự

## Expected result
- Dữ liệu được insert hoặc bị truncate tùy giới hạn DB
- HTTP Status = 200

## Status / Related bugs
Not Run / None