# TC-IMPORT-041: price = null

## Requirement ID
FR-IMPORT-01

## Module / Test type / Technique
Import Products / Functional / Null Testing

## Preconditions
- Admin có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| name | SP Test |
| price | null |

## Test steps
1. Gửi request POST `/api/admin/import-products`
2. Import sản phẩm với price = null

## Expected result
- Có thể lưu NULL hoặc giá trị mặc định
- HTTP Status = 200

## Status / Related bugs
Not Run / None