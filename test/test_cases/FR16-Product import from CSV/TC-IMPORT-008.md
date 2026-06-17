# TC-IMPORT-008: Products = integer 1

## Requirement ID
FR-IMPORT-01

## Module / Test type / Technique
Import Products / Functional / Data Type Testing

## Preconditions
- Admin có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| products | 1 |

## Test steps
1. Gửi request POST `/api/admin/import-products`
2. Truyền products dạng integer

## Expected result
- Hiển thị lỗi "Không có dữ liệu để import"
- HTTP Status = 400

## Status / Related bugs
Not Run / None