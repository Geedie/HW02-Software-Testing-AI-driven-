# TC-IMPORT-017: Malformed JSON body

## Requirement ID
FR-IMPORT-01

## Module / Test type / Technique
Import Products / Functional / Negative Testing

## Preconditions
- Admin có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| Body | {products: [broken json |

## Test steps
1. Gửi request POST `/api/admin/import-products`
2. Gửi JSON sai cú pháp

## Expected result
- JSON parse error
- HTTP Status = 400

## Status / Related bugs
Not Run / None