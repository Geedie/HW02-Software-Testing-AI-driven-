# TC-IMPORT-030: All rows missing name

## Requirement ID
FR-IMPORT-01

## Module / Test type / Technique
Import Products / Functional / Error Handling

## Preconditions
- Admin có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| Row 1 | {"price":100} |
| Row 2 | {"price":200} |
| Row 3 | {"price":300} |

## Test steps
1. Gửi request POST `/api/admin/import-products`
2. Import batch mà tất cả các dòng đều thiếu name

## Expected result
- inserted = 0
- errors chứa lỗi cho cả 3 dòng
- HTTP Status = 200

## Status / Related bugs
Not Run / None