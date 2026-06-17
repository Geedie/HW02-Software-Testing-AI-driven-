# TC-IMPORT-051: category_id = "1" (string)

## Requirement ID
FR-IMPORT-01

## Module / Test type / Technique
Import Products / Functional / Data Type Testing

## Preconditions
- Admin có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| name | SP Test |
| price | 100 |
| category_id | "1" |

## Test steps
1. Gửi request POST `/api/admin/import-products`
2. Truyền category_id kiểu string
3. Kiểm tra dữ liệu trong DB

## Expected result
- Có thể được ép kiểu thành số 1 hoặc lưu nguyên dạng string
- HTTP Status = 200

## Status / Related bugs
Not Run / None