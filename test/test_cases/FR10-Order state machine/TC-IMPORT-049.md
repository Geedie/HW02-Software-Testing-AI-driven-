# TC-IMPORT-049: category_id = -1 (negative)

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
| price | 100 |
| category_id | -1 |

## Test steps
1. Gửi request POST `/api/admin/import-products`
2. Truyền category_id âm
3. Kiểm tra dữ liệu trong DB

## Expected result
- Có thể lưu hoặc phát sinh lỗi tùy DB constraint
- HTTP Status = 200

## Status / Related bugs
Not Run / None