# TC-IMPORT-020: name = empty string

## Requirement ID
FR-IMPORT-01

## Module / Test type / Technique
Import Products / Functional / Boundary Value Analysis

## Preconditions
- Admin có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| name | "" |
| price | 100 |

## Test steps
1. Gửi request POST `/api/admin/import-products`
2. Import sản phẩm với name rỗng

## Expected result
- inserted = 0
- errors = ["Hàng 1: Thiếu tên sản phẩm"]
- HTTP Status = 200

## Status / Related bugs
Not Run / None