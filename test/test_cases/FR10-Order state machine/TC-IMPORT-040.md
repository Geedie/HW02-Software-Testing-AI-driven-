# TC-IMPORT-040: price = "150000" (string)

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
| price | "150000" |

## Test steps
1. Gửi request POST `/api/admin/import-products`
2. Import sản phẩm với price kiểu string

## Expected result
- Có thể được ép kiểu sang số hoặc lưu nguyên dạng string
- HTTP Status = 200

## Status / Related bugs
Not Run / None