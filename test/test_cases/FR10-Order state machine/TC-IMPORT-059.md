# TC-IMPORT-059: Minimal row - name only

## Requirement ID
FR-IMPORT-01

## Module / Test type / Technique
Import Products / Functional / Equivalence Partitioning

## Preconditions
- Admin có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| name | Minimal SP |

## Test steps
1. Gửi request POST `/api/admin/import-products`
2. Import sản phẩm chỉ có trường name
3. Kiểm tra dữ liệu trong DB

## Expected result
- Sản phẩm được tạo thành công
- price = NULL
- description = ""
- imageUrl = ""
- category_id = 1
- HTTP Status = 200

## Status / Related bugs
Not Run / None