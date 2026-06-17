# TC-OSM-060: Full Happy Path Lifecycle (pending -> confirmed -> shipping -> delivered)

## Requirement ID
FR-OSM-01

## Module / Test type / Technique
Order State Machine / Functional / End-to-End Testing

## Preconditions
- Đơn hàng mới được tạo
- Trạng thái hiện tại = `pending`
- Admin có JWT hợp lệ

## Test data

| Step | Status |
|---------|---------|
| 1 | confirmed |
| 2 | shipping |
| 3 | delivered |

## Test steps
1. Chuyển trạng thái từ `pending` -> `confirmed`
2. Chuyển trạng thái từ `confirmed` -> `shipping`
3. Chuyển trạng thái từ `shipping` -> `delivered`
4. Kiểm tra dữ liệu DB

## Expected result
- Tất cả các bước đều thành công
- Mỗi request trả về HTTP 200
- Trạng thái cuối cùng trong DB là `delivered`

## Status / Related bugs
Not Run / None