# TC-IMPORT-055: imageUrl missing -> default ""

## Requirement ID
FR-IMPORT-01

## Module / Test type / Technique
Import Products / Functional / Default Value Testing

## Preconditions
- Admin có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| name | SP Test |
| price | 100 |

## Test steps
1. Gửi request POST `/api/admin/import-products`
2. Không truyền imageUrl
3. Kiểm tra dữ liệu trong DB

## Expected result
- imageUrl = ""
- HTTP Status = 200

## Status / Related bugs
Not Run / None