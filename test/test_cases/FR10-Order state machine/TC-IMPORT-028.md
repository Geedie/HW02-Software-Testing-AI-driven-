# TC-IMPORT-028: Mixed batch — 1 valid + 1 missing name

## Requirement ID
FR-IMPORT-01

## Module / Test type / Technique
Import Products / Functional / Error Handling

## Preconditions
- Admin có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| Row 1 | {"name":"Valid SP","price":100} |
| Row 2 | {"price":200} |

## Test steps
1. Gửi request POST `/api/admin/import-products`
2. Import batch gồm 1 dòng hợp lệ và 1 dòng lỗi

## Expected result
- inserted = 1
- errors = ["Hàng 2: Thiếu tên sản phẩm"]
- HTTP Status = 200

## Status / Related bugs
Not Run / None