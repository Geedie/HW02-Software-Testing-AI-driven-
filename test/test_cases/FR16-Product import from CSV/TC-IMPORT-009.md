# TC-IMPORT-009: Products = 1 item (Min)

## Requirement ID
FR-IMPORT-01

## Module / Test type / Technique
Import Products / Functional / Boundary Value Analysis

## Preconditions
- Admin có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| products | 1 sản phẩm hợp lệ |

## Test steps
1. Gửi request POST `/api/admin/import-products`
2. Truyền 1 sản phẩm

## Expected result
- inserted = 1
- errors = []
- HTTP Status = 200

## Status / Related bugs
Not Run / None