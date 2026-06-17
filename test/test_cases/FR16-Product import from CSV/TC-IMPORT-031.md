# TC-IMPORT-031: Vietnamese Unicode name

## Requirement ID
FR-IMPORT-01

## Module / Test type / Technique
Import Products / Functional / Localization Testing

## Preconditions
- Admin có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| name | Áo dài truyền thống Việt Nam |
| price | 500000 |

## Test steps
1. Gửi request POST `/api/admin/import-products`
2. Import sản phẩm có tên tiếng Việt Unicode

## Expected result
- Insert thành công
- UTF-8 được lưu chính xác
- HTTP Status = 200

## Status / Related bugs
Not Run / None