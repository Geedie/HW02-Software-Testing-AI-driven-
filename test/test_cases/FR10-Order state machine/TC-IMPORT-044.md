# TC-IMPORT-044: category_id = null -> default 1

## Requirement ID
FR-IMPORT-01

## Module / Test type / Technique
Import Products / Functional / Null Testing

## Preconditions
- Admin có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| name | SP Test |
| price | 100 |
| category_id | null |

## Test steps
1. Gửi request POST `/api/admin/import-products`
2. Truyền category_id = null
3. Kiểm tra dữ liệu trong DB

## Expected result
- category_id = 1
- HTTP Status = 200

## Status / Related bugs
Not Run / None