# TC-IMPORT-033: price = 1 (Min)

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
| price | 1 |

## Test steps
1. Gửi request POST `/api/admin/import-products`
2. Import sản phẩm với price = 1

## Expected result
- Sản phẩm được tạo thành công
- price = 1 được lưu vào DB
- HTTP Status = 200

## Status / Related bugs
Not Run / None