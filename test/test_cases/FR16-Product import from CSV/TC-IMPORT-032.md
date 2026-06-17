# TC-IMPORT-032: Emoji in name

## Requirement ID
FR-IMPORT-01

## Module / Test type / Technique
Import Products / Functional / Localization Testing

## Preconditions
- Admin có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| name | 👜 Túi xách cao cấp |
| price | 300000 |

## Test steps
1. Gửi request POST `/api/admin/import-products`
2. Import sản phẩm có emoji trong tên

## Expected result
- Dữ liệu được insert hoặc emoji bị loại bỏ tùy DB encoding
- HTTP Status = 200

## Status / Related bugs
Not Run / None