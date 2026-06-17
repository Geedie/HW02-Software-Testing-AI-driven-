# TC-IMPORT-047: category_id = 2 (valid FK)

## Requirement ID
FR-IMPORT-01

## Module / Test type / Technique
Import Products / Functional / Equivalence Partitioning

## Preconditions
- Admin có JWT hợp lệ
- Category ID = 2 tồn tại trong DB

## Test data

| Field | Value |
|---------|---------|
| name | SP Test |
| price | 100 |
| category_id | 2 |

## Test steps
1. Gửi request POST `/api/admin/import-products`
2. Truyền category_id = 2
3. Kiểm tra dữ liệu trong DB

## Expected result
- category_id = 2
- HTTP Status = 200

## Status / Related bugs
Not Run / None