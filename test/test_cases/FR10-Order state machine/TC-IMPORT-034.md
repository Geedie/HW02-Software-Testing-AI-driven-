# TC-IMPORT-034: price = 0 (zero boundary)

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
| price | 0 |

## Test steps
1. Gửi request POST `/api/admin/import-products`
2. Import sản phẩm với price = 0

## Expected result
- Hành vi chưa được định nghĩa rõ
- Có thể lưu với giá trị 0 hoặc bị từ chối
- HTTP Status = 200

## Status / Related bugs
Not Run / None