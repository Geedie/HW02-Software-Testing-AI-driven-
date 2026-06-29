# BÁO CÁO LỖI (BUG REPORT) — BÀI TẬP 02 (HW02)

Báo cáo này tập trung trình bày các lỗi (bugs) được tìm thấy dựa trên kỹ thuật **Phân tích giá trị biên (Boundary Value Analysis)** cho các biến có giới hạn/ngưỡng quyết định trên 4 chức năng: **FR-02**, **FR-07**, **FR-13**, và **FR-20**.

---

### TỔNG HỢP DANH SÁCH LỖI BIÊN (BOUNDARY BUGS OVERVIEW)

| Bug ID           | Chức năng | Đối tượng kiểm thử biên             | Mô tả lỗi tại điểm biên                                                                                                                    | Mức độ          | File & Dòng Code                           |
| :--------------- | :---------- | :----------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------ | :----------------- | :------------------------------------------ |
| **BUG-01** | FR-02       | Biên bộ đếm sai liên tiếp ($N=3$)  | Hệ thống khóa tài khoản khi số lần đăng nhập sai thực tế mới đạt$2$ (vượt qua biên do bộ đếm tăng sai đơn vị).         | **Major**    | `backend/server.js`: L54                  |
| **BUG-02** | FR-02       | Biên thời gian khóa ($T=30s$)         | Vượt qua mốc biên 30 giây ($T \ge 30s$), tài khoản đúng mật khẩu vẫn tiếp tục bị khóa đến 180 giây.                          | **Major**    | `backend/server.js`: L57                  |
| **BUG-03** | FR-07       | Biên số lượng tối thiểu ($Q=1$)    | Giao diện giỏ hàng thiếu nút tăng/giảm `+/-` khiến người dùng không thể thực hiện kiểm thử biên số lượng tối thiểu.      | **Major**    | `frontend-web/src/pages/Cart.jsx`: L37-50 |
| **BUG-04** | FR-13       | Biên tính doanh thu Dashboard            | Đơn hàng chuyển dịch trái phép từ trạng thái kết thúc `canceled` sang `delivered` và được cộng dồn vào doanh thu ở biên. | **Major**    | `backend/server.js`: L550-551             |
| **BUG-05** | FR-20       | Biên cấm hủy đơn hàng (`shipping`) | Tại biên trạng thái bắt đầu giao hàng (`shipping`), người dùng vẫn có thể hủy đơn hàng thành công qua API.                  | **Critical** | `backend/server.js`: L329                 |

---

### CHI TIẾT CÁC LỖI PHÁT HIỆN QUA GIÁ TRỊ BIÊN (BVA DETAILED REPORTS)

---

#### BUG-01: Tài khoản bị khóa sớm hơn quy định tại biên số lần đăng nhập sai (Khóa ở lần thứ 2 thay vì lần thứ 3)

* **Chức năng ảnh hưởng:** `FR-02: Đăng nhập & Khóa tài khoản`
* **Ngưỡng biên quy định:** Số lần sai liên tiếp đạt mức giới hạn $N = 3$ thì khóa.
* **Hành vi tại biên:**
  * **Thực tế:** Khi người dùng đăng nhập sai lần thứ 2 liên tiếp ($N=2$), bộ đếm trong DB bị cộng thêm 2 đơn vị ($N \rightarrow 4 \ge 3$). Hệ thống lập tức kích hoạt khóa tài khoản tạm thời.
  * **Mong đợi:** Đăng nhập sai lần thứ 2 ($N=2$) tài khoản **phải tiếp tục mở** và cho phép thử lại. Hệ thống chỉ được khóa khi số lần đăng nhập sai thực tế đạt đúng lần thứ 3 liên tiếp ($N=3$).
* **Dòng code gây lỗi:** [server.js:L54](file:///c:/Users/Admin/Documents/Ki%E1%BB%83m%20th%E1%BB%AD%20ph%E1%BA%A7n%20m%E1%BB%81m/HW02/eshop-sut/backend/server.js#L54)
  ```javascript
  const newAttempts = user.login_attempts + 2; // BUG: Tăng 2 thay vì 1
  ```

---

#### BUG-02: Tài khoản tiếp tục bị khóa khi đã vượt quá biên thời gian mở khóa 30 giây

* **Chức năng ảnh hưởng:** `FR-02: Đăng nhập & Khóa tài khoản`
* **Ngưỡng biên quy định:** Thời gian mở khóa tự động là sau 30 giây kể từ khi bị khóa ($T \ge 30s$).
* **Hành vi tại biên:**
  * **Thực tế:** Khi tài khoản đã bị khóa, nếu người dùng chờ đủ 30 giây ($T = 30s$ hoặc $T = 31s$ - điểm biên mở khóa) và thực hiện đăng nhập lại bằng mật khẩu ĐÚNG. Hệ thống **vẫn báo lỗi tài khoản đang bị khóa** vì thời gian khóa thực tế trong code bị đẩy lên 180 giây.
  * **Mong đợi:** Đúng giây thứ 30 trở đi kể từ khi bị khóa, tài khoản **phải tự động mở khóa** và cho phép đăng nhập thành công nếu nhập đúng mật khẩu.
* **Dòng code gây lỗi:** [server.js:L57](file:///c:/Users/Admin/Documents/Ki%E1%BB%83m%20th%E1%BB%AD%20ph%E1%BA%A7n%20m%E1%BB%81m/HW02/eshop-sut/backend/server.js#L57)
  ```javascript
  lockedUntil = new Date(Date.now() + 180000).toISOString(); // BUG: Khóa 180s (3 phút) thay vì 30s
  ```

---

#### BUG-03: Thiếu các nút điều chỉnh số lượng khiến không thể kiểm thử biên số lượng tối thiểu ($Q=1$) trong Giỏ hàng

* **Chức năng ảnh hưởng:** `FR-07: Giỏ hàng`
* **Ngưỡng biên quy định:** Số lượng sản phẩm tối thiểu trong giỏ hàng là $Q=1$. Khi ở số lượng $Q=1$, nút giảm `-` phải bị disabled hoặc không cho phép giảm tiếp xuống $0$.
* **Hành vi tại biên:**
  * **Thực tế:** Trên giao diện giỏ hàng của Frontend Web, hệ thống chỉ hiển thị số lượng ở dạng văn bản tĩnh (Text), hoàn toàn **thiếu các nút tăng/giảm `+` và `-`** để người dùng điều chỉnh. Điều này ngăn cản việc thực hiện hành vi kiểm thử biên tại mốc $Q=1$.
  * **Mong đợi:** Cột số lượng phải hiển thị các nút `+` và `-` để điều chỉnh số lượng. Khi số lượng đang là $1$, nút `-` phải ở trạng thái disabled.
* **File gây lỗi:** [Cart.jsx:L37-L50](file:///c:/Users/Admin/Documents/Ki%E1%BB%83m%20th%E1%BB%AD%20ph%E1%BA%A7n%20m%E1%BB%81m/HW02/eshop-sut/frontend-web/src/pages/Cart.jsx#L37-L50) (Chỉ render `{item.quantity}` mà không có các thẻ `<button>` tăng giảm số lượng).

---

#### BUG-04: Cộng dồn doanh thu sai lệch ở biên do chuyển dịch trạng thái đơn hàng trái phép

* **Chức năng ảnh hưởng:** `FR-13: Dashboard` & `FR-10: Trạng thái đơn hàng`
* **Ngưỡng biên quy định:** Chỉ có các đơn hàng ở trạng thái `delivered` mới được tính vào doanh thu hiển thị trên Dashboard. Trạng thái `canceled` là trạng thái kết thúc (Final State), không thể chuyển dịch sang bất kỳ trạng thái nào khác.
* **Hành vi tại biên:**
  * **Thực tế:** Khi Admin thực hiện thay đổi trạng thái của một đơn hàng đang là `canceled` sang `delivered`, hệ thống Backend chấp nhận yêu cầu này và cộng dồn giá trị đơn hàng đó vào Tổng doanh thu trên Dashboard.
  * **Mong đợi:** Đơn hàng ở trạng thái kết thúc `canceled` phải bị chặn không cho phép đổi trạng thái. Biên doanh thu trên Dashboard chỉ được phép thay đổi khi đơn hàng chuyển từ trạng thái chưa kết thúc (như `shipping`) sang `delivered`.
* **Dòng code gây lỗi:** [server.js:L550-551](file:///c:/Users/Admin/Documents/Ki%E1%BB%83m%20th%E1%BB%AD%20ph%E1%BA%A7n%20m%E1%BB%81m/HW02/eshop-sut/backend/server.js#L550-L551)
  ```javascript
  if (currentStatus === "canceled" && status === "delivered")
    isValidTransition = true; // BUG: Cho phép chuyển đổi từ trạng thái kết thúc
  ```

---

#### BUG-05: Người dùng hủy đơn hàng thành công tại biên cấm hủy `shipping`

* **Chức năng ảnh hưởng:** `FR-20: Tính năng Mobile` & `FR-10: Trạng thái đơn hàng`
* **Ngưỡng biên quy định:** Người dùng thường chỉ được phép hủy đơn hàng ở trạng thái `pending` và `confirmed`. Khi đơn hàng bắt đầu ở trạng thái `shipping` (Đang giao), người dùng bị cấm tự hủy đơn.
* **Hành vi tại biên:**
  * **Thực tế:** Ngay khi đơn hàng được Admin cập nhật sang trạng thái đang giao hàng `shipping` (vượt qua biên được phép hủy), người dùng thường vẫn gửi request API hủy đơn và **hệ thống xử lý hủy đơn hàng thành công**, đổi trạng thái đơn sang `canceled`.
  * **Mong đợi:** Ở trạng thái `shipping`, hệ thống phải chặn hoàn toàn yêu cầu hủy của người dùng thông thường, giữ nguyên trạng thái đơn hàng và báo lỗi.
* **Dòng code gây lỗi:** [server.js:L329](file:///c:/Users/Admin/Documents/Ki%E1%BB%83m%20th%E1%BB%AD%20ph%E1%BA%A7n%20m%E1%BB%81m/HW02/eshop-sut/backend/server.js#L329)
  ```javascript
  if (order.status === "delivered" || order.status === "canceled") { // BUG: Thiếu kiểm tra status === "shipping" để chặn user tự hủy
  ```
