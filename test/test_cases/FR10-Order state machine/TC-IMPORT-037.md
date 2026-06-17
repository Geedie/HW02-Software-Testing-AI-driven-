# TC-IMPORT-037: price = 2147483647 (INT32 Max)

## Requirement ID
FR-IMPORT-01

## Module / Test type / Technique
Import Products / Functional / Boundary Value Analysis

## Preconditions
- Admin có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| name | SP Test |
| price | 2147483647 |

## Test steps
1. Gửi request POST `/api/admin/import-products`
2. Import sản phẩm với giá trị INT32 lớn nhất

## Expected result
- Sản phẩm được tạo thành công
- price = 2147483647 được lưu vào DB
- HTTP Status = 200

## Status / Related bugs
Not Run / None