# TC-IMPORT-039: price = 99.99 (float)

## Requirement ID
FR-IMPORT-01

## Module / Test type / Technique
Import Products / Functional / Data Type Testing

## Preconditions
- Admin có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| name | SP Test |
| price | 99.99 |

## Test steps
1. Gửi request POST `/api/admin/import-products`
2. Import sản phẩm với giá trị float

## Expected result
- Có thể lưu dưới dạng float hoặc bị ép kiểu
- HTTP Status = 200

## Status / Related bugs
Not Run / None