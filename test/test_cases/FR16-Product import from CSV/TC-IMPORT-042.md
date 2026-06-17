# TC-IMPORT-042: price missing

## Requirement ID
FR-IMPORT-01

## Module / Test type / Technique
Import Products / Functional / Negative Testing

## Preconditions
- Admin có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| name | SP Test |

## Test steps
1. Gửi request POST `/api/admin/import-products`
2. Import sản phẩm không có trường price

## Expected result
- Có thể lưu NULL hoặc giá trị mặc định
- HTTP Status = 200

## Status / Related bugs
Not Run / None