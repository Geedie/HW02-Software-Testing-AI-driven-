# TC-IMPORT-054: description = "Valid description"

## Requirement ID
FR-IMPORT-01

## Module / Test type / Technique
Import Products / Functional / Equivalence Partitioning

## Preconditions
- Admin có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| name | SP Test |
| price | 100 |
| description | Mô tả chi tiết sản phẩm |

## Test steps
1. Gửi request POST `/api/admin/import-products`
2. Truyền description hợp lệ
3. Kiểm tra dữ liệu trong DB

## Expected result
- description được lưu đúng giá trị đã truyền
- HTTP Status = 200

## Status / Related bugs
Not Run / None