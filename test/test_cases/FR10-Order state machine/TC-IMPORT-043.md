# TC-IMPORT-043: category_id missing → default 1

## Requirement ID
FR-IMPORT-01

## Module / Test type / Technique
Import Products / Functional / Default Value Testing

## Preconditions
- Admin có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| name | SP Test |
| price | 100 |

## Test steps
1. Gửi request POST `/api/admin/import-products`
2. Không truyền category_id
3. Kiểm tra dữ liệu trong DB

## Expected result
- category_id = 1
- HTTP Status = 200

## Status / Related bugs
Not Run / None