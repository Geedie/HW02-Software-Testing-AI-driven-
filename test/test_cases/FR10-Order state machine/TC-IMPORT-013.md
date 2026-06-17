# TC-IMPORT-013: Products array of primitives

## Requirement ID
FR-IMPORT-01

## Module / Test type / Technique
Import Products / Functional / Data Type Testing

## Preconditions
- Admin có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| products | [1,2] |

## Test steps
1. Gửi request POST `/api/admin/import-products`
2. Truyền mảng số nguyên

## Expected result
- Hiển thị lỗi thiếu tên sản phẩm cho từng dòng
- HTTP Status = 200

## Status / Related bugs
Not Run / None