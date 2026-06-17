# TC-IMPORT-015: Regular user token (non-admin)

## Requirement ID
FR-IMPORT-01

## Module / Test type / Technique
Import Products / Security / Authorization Testing

## Preconditions
- User thường có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| Authorization | Bearer <user_token> |

## Test steps
1. Gửi request POST `/api/admin/import-products`
2. Sử dụng token của user thường

## Expected result
- Forbidden nếu có kiểm tra role
- Hoặc import thành công nếu thiếu kiểm tra phân quyền
- HTTP Status = 403 hoặc 200

## Status / Related bugs
Not Run / None