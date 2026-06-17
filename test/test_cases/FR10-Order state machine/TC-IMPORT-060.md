# TC-IMPORT-060: Concurrent import - same product names

## Requirement ID
FR-IMPORT-01

## Module / Test type / Technique
Import Products / Functional / Concurrency Testing

## Preconditions
- Admin có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| Request 1 | {"products":[{"name":"Duplicate SP"}]} |
| Request 2 | {"products":[{"name":"Duplicate SP"}]} |

## Test steps
1. Chuẩn bị hai request import giống nhau
2. Gửi đồng thời hai request POST `/api/admin/import-products`
3. Kiểm tra dữ liệu trong DB

## Expected result
- Hành vi chưa được xác định rõ
- Có khả năng cả hai request đều được insert thành công
- Tạo ra hai bản ghi có cùng tên sản phẩm
- HTTP Status = 200 + 200

## Status / Related bugs
Not Run / None