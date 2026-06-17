# TC-IMPORT-019: name = null

## Requirement ID
FR-IMPORT-01

## Module / Test type / Technique
Import Products / Functional / Null Testing

## Preconditions
- Admin có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| name | null |
| price | 100 |

## Test steps
1. Gửi request POST `/api/admin/import-products`
2. Import sản phẩm với name = null

## Expected result
- inserted = 0
- errors = ["Hàng 1: Thiếu tên sản phẩm"]
- HTTP Status = 200

## Status / Related bugs
Not Run / None