# TC-IMPORT-001: Happy path — single valid product, all fields

## Requirement ID
FR-IMPORT-01

## Module / Test type / Technique
Import Products / Functional / Positive Testing

## Preconditions
- Admin đã đăng nhập
- Có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| name | Áo thun nam |
| price | 150000 |
| description | Mô tả sản phẩm |
| imageUrl | https://example.com/img.jpg |
| category_id | 1 |

## Test steps
1. Gửi request POST `/api/admin/import-products`
2. Truyền danh sách gồm 1 sản phẩm hợp lệ

## Expected result
- Import thành công
- inserted = 1
- errors = []
- HTTP Status = 200

## Status / Related bugs
Not Run / None