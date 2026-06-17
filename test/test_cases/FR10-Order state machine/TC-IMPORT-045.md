# TC-IMPORT-045: category_id = 0 -> default 1 (falsy bug)

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
| price | 100 |
| category_id | 0 |

## Test steps
1. Gửi request POST `/api/admin/import-products`
2. Truyền category_id = 0
3. Kiểm tra dữ liệu trong DB

## Expected result
- category_id được lưu thành 1 thay vì 0
- Xác nhận lỗi xử lý giá trị falsy
- HTTP Status = 200

## Status / Related bugs
Not Run / None