# TC-OSM-059: Admin Updates Status While User Cancels Concurrently

## Requirement ID
FR-OSM-01

## Module / Test type / Technique
Order State Machine / Concurrency / Race Condition Testing

## Preconditions
- Đơn hàng tồn tại
- Trạng thái hiện tại = `pending`
- Admin có JWT hợp lệ
- User sở hữu đơn hàng có JWT hợp lệ

## Test data

| Actor | Action |
|---------|---------|
| Admin | shipping |
| User | cancel |

## Test steps
1. Admin gửi request chuyển trạng thái sang `shipping`
2. User đồng thời gửi request hủy đơn hàng
3. Thực hiện đồng thời hai request
4. Kiểm tra dữ liệu DB

## Expected result
- Một thao tác thành công và thao tác còn lại thất bại
- Nếu hệ thống không có locking có thể cả hai request đều thành công
- Có khả năng xảy ra race condition
- HTTP Status = Race Condition (Both 200 Possible)

## Status / Related bugs
Not Run / Potential Race Condition