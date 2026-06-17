# TC-IMPORT-048: category_id = 9999 (non-existent FK)

## Requirement ID
FR-IMPORT-01

## Module / Test type / Technique
Import Products / Functional / Negative Testing

## Preconditions
- Admin có JWT hợp lệ
- Category ID = 9999 không tồn tại

## Test data

| Field | Value |
|---------|---------|
| name | SP Test |
| price | 100 |
| category_id | 9999 |

## Test steps
1. Gửi request POST `/api/admin/import-products`
2. Truyền category_id không tồn tại

## Expected result
- Có thể lưu thành công nếu không kiểm tra FK
- Hoặc trả lỗi nếu FK được enforce
- HTTP Status = 200

## Status / Related bugs
Not Run / None