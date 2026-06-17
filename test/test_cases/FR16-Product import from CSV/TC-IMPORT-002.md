# TC-IMPORT-002: Happy path — 5 valid products

## Requirement ID
FR-IMPORT-01

## Module / Test type / Technique
Import Products / Functional / Positive Testing

## Preconditions
- Admin có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| products | 5 sản phẩm hợp lệ |

## Test steps
1. Gửi request POST `/api/admin/import-products`
2. Truyền danh sách 5 sản phẩm hợp lệ

## Expected result
- inserted = 5
- errors = []
- HTTP Status = 200

## Status / Related bugs
Not Run / None