# TC-IMPORT-029: Mixed batch - first row missing name

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
| Row 2 | {"name":"Valid SP","price":200} |

## Test steps
1. Gửi request POST `/api/admin/import-products`
2. Import batch có dòng đầu tiên thiếu name

## Expected result
- inserted = 1
- errors = ["Hàng 1: Thiếu tên sản phẩm"]
- Đánh số dòng bắt đầu từ 1
- HTTP Status = 200

## Status / Related bugs
Not Run / None