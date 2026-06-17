# TC-IMPORT-050: category_id = empty string

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
| price | 100 |
| category_id | "" |

## Test steps
1. Gửi request POST `/api/admin/import-products`
2. Truyền category_id là chuỗi rỗng
3. Kiểm tra dữ liệu trong DB

## Expected result
- category_id = 1 do giá trị falsy
- HTTP Status = 200

## Status / Related bugs
Not Run / None