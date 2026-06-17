# TC-IMPORT-010: Products = 2 items (Min+1)

## Requirement ID
FR-IMPORT-01

## Module / Test type / Technique
Import Products / Functional / Boundary Value Analysis

## Preconditions
- Admin có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| products | 2 sản phẩm hợp lệ |

## Test steps
1. Gửi request POST `/api/admin/import-products`
2. Truyền 2 sản phẩm

## Expected result
- inserted = 2
- errors = []
- HTTP Status = 200

## Status / Related bugs
Not Run / None