# TC-OSM-063: Admin Cancels Then Attempts canceled -> delivered (DEFECT-01 Path)

## Requirement ID
FR-OSM-01

## Module / Test type / Technique
Order State Machine / Functional / Defect Verification

## Preconditions
- Đơn hàng tồn tại
- Trạng thái ban đầu = `pending`
- Admin có JWT hợp lệ

## Test data

| Step | Status |
|---------|---------|
| 1 | canceled |
| 2 | delivered |

## Test steps
1. Admin chuyển trạng thái sang `canceled`
2. Admin tiếp tục gửi request chuyển từ `canceled` -> `delivered`
3. Kiểm tra phản hồi và dữ liệu DB

## Expected result
- Theo nghiệp vụ, transition này phải bị chặn
- Tuy nhiên code hiện tại cho phép thực hiện
- Bước 2 trả về `{"message":"Order status updated"}`
- Trạng thái cuối cùng là `delivered`
- HTTP Status = 200

## Status / Related bugs
Not Run / DEFECT-01