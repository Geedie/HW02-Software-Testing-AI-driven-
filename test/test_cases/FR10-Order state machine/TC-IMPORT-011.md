# TC-IMPORT-011: Products = 1000 items (stress)

## Requirement ID
FR-IMPORT-01

## Module / Test type / Technique
Import Products / Performance / Stress Testing

## Preconditions
- Admin có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| products | 1000 sản phẩm |

## Test steps
1. Gửi request POST `/api/admin/import-products`
2. Truyền danh sách 1000 sản phẩm

## Expected result
- Tất cả sản phẩm được import hoặc hệ thống trả lỗi giới hạn
- HTTP Status = 200 / 413 / 504

## Status / Related bugs
Not Run / None