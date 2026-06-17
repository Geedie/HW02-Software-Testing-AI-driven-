# TC-IMPORT-027: name = integer type 12345

## Requirement ID
FR-IMPORT-01

## Module / Test type / Technique
Import Products / Functional / Data Type Testing

## Preconditions
- Admin có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| name | 12345 |
| price | 100 |

## Test steps
1. Gửi request POST `/api/admin/import-products`
2. Import sản phẩm với name kiểu integer

## Expected result
- Có thể insert thành công do giá trị truthy
- HTTP Status = 200

## Status / Related bugs
Not Run / None