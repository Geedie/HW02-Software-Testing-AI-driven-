# TC-IMPORT-056: imageUrl = null -> default ""

## Requirement ID
FR-IMPORT-01

## Module / Test type / Technique
Import Products / Functional / Null Testing

## Preconditions
- Admin có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| name | SP Test |
| price | 100 |
| imageUrl | null |

## Test steps
1. Gửi request POST `/api/admin/import-products`
2. Truyền imageUrl = null
3. Kiểm tra dữ liệu trong DB

## Expected result
- imageUrl = ""
- HTTP Status = 200

## Status / Related bugs
Not Run / None