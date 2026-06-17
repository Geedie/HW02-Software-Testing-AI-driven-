# TC-IMPORT-025: name = spaces only

## Requirement ID
FR-IMPORT-01

## Module / Test type / Technique
Import Products / Functional / Input Validation

## Preconditions
- Admin có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| name | "   " |
| price | 100 |

## Test steps
1. Gửi request POST `/api/admin/import-products`
2. Import sản phẩm có tên chỉ chứa khoảng trắng

## Expected result
- Có thể được insert do không có trim validation
- HTTP Status = 200

## Status / Related bugs
Not Run / None