# TC-OSM-009: Regular user token on admin endpoint

## Requirement ID
FR-OSM-01

## Module / Test type / Technique
Order State Machine / Security / Authorization Testing

## Preconditions
- Tồn tại đơn hàng hợp lệ
- User thường có JWT hợp lệ (`test@eshop.com`)
- User không có quyền Admin

## Test data

| Field | Value |
|---------|---------|
| JWT Token | User Token |
| status | confirmed |

## Test steps
1. Gửi request PUT tới endpoint Admin
2. Sử dụng JWT của user thường
3. Truyền body `{"status":"confirmed"}`
4. Quan sát phản hồi từ hệ thống

## Expected result
- Nếu có kiểm tra phân quyền: trả về Forbidden
- Nếu không có kiểm tra phân quyền: đơn hàng vẫn được cập nhật (**Defect tiềm ẩn**)
- HTTP Status = 403 hoặc 200

## Status / Related bugs
Not Run / Potential Authorization Defect