# TC-IMPORT-016: Empty request body

## Requirement ID
FR-IMPORT-01

## Module / Test type / Technique
Import Products / Functional / Negative Testing

## Preconditions
- Admin có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| Request Body | Empty (No Body) |

## Test steps
1. Gửi request POST `/api/admin/import-products`
2. Không gửi request body

## Expected result
- Hiển thị lỗi "Không có dữ liệu để import"
- HTTP Status = 400

## Status / Related bugs
Not Run / None