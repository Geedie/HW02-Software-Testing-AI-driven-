# TC-IMPORT-018: name missing — single row

## Requirement ID
FR-IMPORT-01

## Module / Test type / Technique
Import Products / Functional / Equivalence Partitioning

## Preconditions
- Admin có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| products | [{"price":100}] |

## Test steps
1. Gửi request POST `/api/admin/import-products`
2. Import sản phẩm không có trường name

## Expected result
- inserted = 0
- errors = ["Hàng 1: Thiếu tên sản phẩm"]
- HTTP Status = 200

## Status / Related bugs
Not Run / None