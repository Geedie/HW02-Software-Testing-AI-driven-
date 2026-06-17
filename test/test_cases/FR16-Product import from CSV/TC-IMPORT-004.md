# TC-IMPORT-004: Products = null

## Requirement ID
FR-IMPORT-01

## Module / Test type / Technique
Import Products / Functional / Null Testing

## Preconditions
- Admin có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| products | null |

## Test steps
1. Gửi request POST `/api/admin/import-products`
2. Truyền products = null

## Expected result
- Hiển thị lỗi "Không có dữ liệu để import"
- HTTP Status = 400

## Status / Related bugs
Not Run / None