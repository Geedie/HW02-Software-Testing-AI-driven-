# TC-IMPORT-003: Products = empty array []

## Requirement ID
FR-IMPORT-01

## Module / Test type / Technique
Import Products / Functional / Boundary Value Analysis

## Preconditions
- Admin có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| products | [] |

## Test steps
1. Gửi request POST `/api/admin/import-products`
2. Truyền mảng products rỗng

## Expected result
- Hiển thị lỗi "Không có dữ liệu để import"
- HTTP Status = 400

## Status / Related bugs
Not Run / None