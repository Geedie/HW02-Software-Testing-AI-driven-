# TC-OSM-030: canceled -> delivered (DEFECT-01 - Anomalous VALID)

## Requirement ID
FR-OSM-01

## Module / Test type / Technique
Order State Machine / Functional / Defect Verification

## Preconditions
- Đơn hàng tồn tại
- Trạng thái hiện tại = `canceled`
- Admin có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| status | delivered |

## Test steps
1. Gửi request PUT cập nhật trạng thái đơn hàng
2. Truyền body `{"status":"delivered"}`
3. Kiểm tra phản hồi và dữ liệu DB

## Expected result
- Theo logic nghiệp vụ, transition này phải bị từ chối
- Tuy nhiên theo code hiện tại hệ thống cho phép cập nhật
- Response: `{"message":"Order status updated"}`
- Trạng thái được đổi thành `delivered`
- HTTP Status = 200

## Status / Related bugs
Not Run / DEFECT-01