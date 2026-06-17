# TC-IMPORT-026: name = "0"

## Requirement ID
FR-IMPORT-01

## Module / Test type / Technique
Import Products / Functional / Equivalence Partitioning

## Preconditions
- Admin có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| name | "0" |
| price | 100 |

## Test steps
1. Gửi request POST `/api/admin/import-products`
2. Import sản phẩm với tên "0"

## Expected result
- inserted = 1
- errors = []
- HTTP Status = 200

## Status / Related bugs
Not Run / None