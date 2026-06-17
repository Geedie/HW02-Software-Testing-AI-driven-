# TC-IMPORT-036: price = -99999 (large negative)

## Requirement ID
FR-IMPORT-01

## Module / Test type / Technique
Import Products / Functional / Robustness Testing

## Preconditions
- Admin có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| name | SP Test |
| price | -99999 |

## Test steps
1. Gửi request POST `/api/admin/import-products`
2. Import sản phẩm với giá âm lớn

## Expected result
- Hành vi chưa được xác định
- Có thể lưu dữ liệu hoặc từ chối
- HTTP Status = 200

## Status / Related bugs
Not Run / None