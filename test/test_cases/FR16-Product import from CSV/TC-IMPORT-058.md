# TC-IMPORT-058: imageUrl = non-URL string

## Requirement ID
FR-IMPORT-01

## Module / Test type / Technique
Import Products / Functional / Input Validation

## Preconditions
- Admin có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| name | SP Test |
| price | 100 |
| imageUrl | not-a-valid-url |

## Test steps
1. Gửi request POST `/api/admin/import-products`
2. Truyền imageUrl không đúng định dạng URL
3. Kiểm tra dữ liệu trong DB

## Expected result
- Hành vi chưa được xác định rõ
- Có thể được lưu nguyên trạng do không có validation URL
- HTTP Status = 200

## Status / Related bugs
Not Run / None