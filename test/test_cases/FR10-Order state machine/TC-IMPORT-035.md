# TC-IMPORT-035: price = -1 (negative)

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
| price | -1 |

## Test steps
1. Gửi request POST `/api/admin/import-products`
2. Import sản phẩm với giá âm

## Expected result
- Hành vi chưa được xác định
- Có thể lưu giá âm hoặc từ chối dữ liệu
- HTTP Status = 200

## Status / Related bugs
Not Run / None