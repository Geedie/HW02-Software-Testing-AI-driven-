# TC-IMPORT-012: Products array contains null element

## Requirement ID
FR-IMPORT-01

## Module / Test type / Technique
Import Products / Functional / Robustness Testing

## Preconditions
- Admin có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| products | [null] |

## Test steps
1. Gửi request POST `/api/admin/import-products`
2. Truyền phần tử null trong mảng

## Expected result
- Trả lỗi dòng dữ liệu hoặc lỗi hệ thống
- HTTP Status = 200 hoặc 500

## Status / Related bugs
Not Run / None