# BÁO CÁO TỔNG HỢP KIỂM THỬ PHẦN MỀM (MAIN TEST REPORT) — BÀI TẬP 02 (HW02)

## Đề tài: Thiết kế Ca kiểm thử bằng kỹ thuật Kiểm thử Miền (Domain Testing) và Phân tích Giá trị Biên (Boundary Value Analysis) cho Hệ thống EShop

* **Học phần:** Kiểm thử phần mềm
* **Hệ thống kiểm thử (SUT):** EShop (Phiên bản dành cho Kiểm thử Phần mềm)
* **Các tính năng kiểm thử:**
  1. `FR-02: Đăng nhập & Khóa tài khoản`
  2. `FR-07: Giỏ hàng` (Shopping Cart)
  3. `FR-13: Dashboard` (Web Admin)
  4. `FR-20: Tính năng Mobile` (Trọng tâm: Hủy đơn hàng)

---

## PHẦN I: TỔNG QUAN HỆ THỐNG VÀ PHƯƠNG PHÁP KIỂM THỬ

### 1. Tổng quan Hệ thống EShop

EShop là một hệ thống thương mại điện tử đa nền tảng bao gồm Backend API (Node.js + Express + SQLite), Frontend Web (React + Vite), Web Admin dành cho quản trị viên, và Mobile App (React Native + Expo). Hệ thống được thiết kế đặc thù dành cho việc học tập kiểm thử phần mềm, chứa các lỗi cố ý về giao diện (UI/UX), xác thực form (Validation), phân quyền và logic nghiệp vụ.

### 2. Phương pháp Kiểm thử áp dụng

Báo cáo này áp dụng hai kỹ thuật thiết kế kiểm thử hộp đen mạnh mẽ:

* **Phân vùng tương đương (Equivalence Partitioning - EP):** Chia các giá trị đầu vào và trạng thái thành các nhóm (phân vùng) mà hệ thống sẽ xử lý tương tự nhau, giúp giảm thiểu số lượng ca kiểm thử cần chạy nhưng vẫn giữ độ bao phủ cao.
* **Phân tích giá trị biên (Boundary Value Analysis - BVA):** Tập trung kiểm thử tại các điểm biên của các phân vùng tương đương, nơi lỗi logic lập trình thường xảy ra nhất (lỗi sai lệch 1 đơn vị - off-by-one errors).

---

## PHẦN II: BÁO CÁO KIỂM THỬ TÍNH NĂNG FR-02: ĐĂNG NHẬP & KHÓA TÀI KHOẢN

### 1. Xác định các Biến (Variables)

* **Biến đầu vào trực tiếp:**
  * `Email` (Chuỗi ký tự): Email người dùng nhập vào form đăng nhập.
  * `Password` (Chuỗi ký tự): Mật khẩu người dùng nhập vào form đăng nhập.
* **Biến trạng thái hệ thống:**
  * `Consecutive_Failed_Attempts` ($N$): Số lần đăng nhập sai liên tiếp của tài khoản ($N \ge 0$).
  * `Time_Since_Lockout` ($T$): Thời gian trôi qua kể từ khi tài khoản bắt đầu bị khóa ($T \ge 0$, đơn vị giây).

### 2. Phân vùng tương đương (Equivalence Partitioning)

| Tên biến                                    | Phân vùng       | Mô tả phân vùng                                                   | Trạng thái mong đợi / Hành vi hệ thống                     |
| :-------------------------------------------- | :---------------- | :-------------------------------------------------------------------- | :---------------------------------------------------------------- |
| **`Email`**                           | **EP-V1.1** | Email đúng định dạng và đã đăng ký (tồn tại trong CSDL). | Hệ thống chấp nhận để kiểm tra mật khẩu.                 |
|                                               | **EP-V1.2** | Email đúng định dạng nhưng chưa đăng ký trong CSDL.         | Hệ thống từ chối đăng nhập (Báo lỗi chung).              |
|                                               | **EP-I1.1** | Email để trống.                                                    | Bị chặn bởi kiểm thử phía Frontend (HTML5 Required).        |
|                                               | **EP-I1.2** | Email sai định dạng (ví dụ:`abc`, `abc@`, `abc@.com`).     | Bị chặn bởi kiểm thử phía Frontend (HTML5 Email Format).    |
| **`Password`**                        | **EP-V2.1** | Mật khẩu đúng (trùng khớp với mật khẩu đã lưu).           | Đăng nhập thành công (nếu tài khoản không bị khóa).    |
|                                               | **EP-V2.2** | Mật khẩu sai (không trùng khớp với mật khẩu đã lưu).       | Đăng nhập thất bại, tăng bộ đếm sai$N$ lên 1.         |
|                                               | **EP-I2.1** | Mật khẩu để trống.                                               | Bị chặn bởi kiểm thử phía Frontend (Required field).        |
| **`Consecutive_Failed_Attempts` (N)** | **EP-V3.1** | Số lần sai liên tiếp từ 0 đến 2 ($0 \le N < 3$).             | Tài khoản ở trạng thái bình thường (mở).                 |
|                                               | **EP-V3.2** | Số lần sai liên tiếp từ 3 trở lên ($N \ge 3$).               | Tài khoản chuyển sang trạng thái bị tạm khóa.             |
| **`Time_Since_Lockout` (T)**          | **EP-V4.1** | Thời gian từ khi bị khóa nhỏ hơn 30 giây ($T < 30s$).        | Tài khoản vẫn đang bị khóa, từ chối mọi đăng nhập.    |
|                                               | **EP-V4.2** | Thời gian từ khi bị khóa từ 30 giây trở lên ($T \ge 30s$).  | Tài khoản tự động được mở khóa khi đăng nhập đúng. |

### 3. Phân tích giá trị biên (Boundary Value Analysis)

* **Biên bộ đếm sai liên tiếp (N - Ngưỡng khóa là 3):**
  * **$N = 2$ (Dưới biên khóa):** Đăng nhập sai lần thứ 2. Tài khoản chưa bị khóa, bộ đếm lưu là 2.
  * **$N = 3$ (Tại biên khóa):** Đăng nhập sai lần thứ 3. Tài khoản bị tạm khóa 30 giây. Thông báo lỗi phù hợp.
  * **$N = 4$ (Trên biên khóa):** Cố đăng nhập khi tài khoản đã bị khóa. Từ chối yêu cầu và giữ nguyên trạng thái khóa.
* **Biên thời gian khóa (T - Ngưỡng mở khóa là 30 giây):**
  * **$T = 29$ giây (Dưới biên mở khóa):** Nhập mật khẩu đúng tại giây 29. Đăng nhập thất bại, hệ thống báo tài khoản vẫn đang bị khóa.
  * **$T = 30$ giây (Tại biên mở khóa):** Nhập mật khẩu đúng tại giây 30. Đăng nhập thành công, reset bộ đếm $N$ về 0.
  * **$T = 31$ giây (Trên biên mở khóa):** Nhập mật khẩu đúng tại giây 31. Đăng nhập thành công, reset bộ đếm $N$ về 0.

### 4. Các ca kiểm thử cho FR-02

| Test Case ID            | Tên kịch bản                                                                     | Phân vùng/Biên áp dụng                            | Dữ liệu đầu vào (Input Data)                                                                                                                     | Các bước thực hiện (Steps)                                                                                                                                                                                                                                             | Kết quả mong đợi (Expected Result)                                                                                       |
| :---------------------- | :---------------------------------------------------------------------------------- | :----------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------- |
| **TC02-01** (Pos) | Đăng nhập thành công với thông tin hợp lệ                                  | EP-V1.1, EP-V2.1, EP-V3.1 ($N=0$)                    | `Email`: `test@eshop.com<br>``Password`: `Test1234!`                                                                                            | 1. Truy cập trang đăng nhập.`<br>`2. Nhập đúng Email và Mật khẩu.`<br>`3. Bấm nút "Đăng nhập".                                                                                                                                                           | Đăng nhập thành công, chuyển hướng đến trang chủ, hệ thống trả về JWT Token lưu ở Client.                   |
| **TC02-02** (Neg) | Đăng nhập thất bại do sai mật khẩu lần 1                                    | EP-V1.1, EP-V2.2, EP-V3.1 ($N=0 \rightarrow 1$)      | `Email`: `test@eshop.com<br>``Password`: `WrongPass1!`                                                                                          | 1. Nhập Email đúng và Mật khẩu sai.`<br>`2. Bấm nút "Đăng nhập".                                                                                                                                                                                               | Đăng nhập thất bại. Bộ đếm tăng lên 1. Hiển thị thông báo lỗi đăng nhập chung.                             |
| **TC02-03** (Neg) | Đăng nhập thất bại do sai mật khẩu lần 2 liên tiếp                        | EP-V1.1, EP-V2.2, BVA ($N=1 \rightarrow 2$)          | `Email`: `test@eshop.com<br>``Password`: `WrongPass2!`                                                                                          | 1. Sử dụng tài khoản sai ở TC02-02.`<br>`2. Nhập Email đúng và Mật khẩu sai lần nữa.`<br>`3. Bấm nút "Đăng nhập".                                                                                                                                     | Đăng nhập thất bại. Bộ đếm tăng lên 2. Tài khoản vẫn chưa bị khóa.                                           |
| **TC02-04** (Neg) | Đăng nhập sai lần 3 liên tiếp và tài khoản bị khóa                       | EP-V1.1, EP-V2.2, BVA ($N=2 \rightarrow 3$), EP-V3.2 | `Email`: `test@eshop.com<br>``Password`: `WrongPass3!`                                                                                          | 1. Sử dụng tài khoản sai ở TC02-03.`<br>`2. Nhập Email đúng và Mật khẩu sai lần thứ 3.`<br>`3. Bấm nút "Đăng nhập".                                                                                                                                   | Đăng nhập thất bại. Bộ đếm đạt 3. Tài khoản bị tạm khóa 30 giây. Báo lỗi tài khoản bị khóa tạm thời. |
| **TC02-05** (Neg) | Đăng nhập đúng mật khẩu khi tài khoản đang bị khóa (chưa hết 30s)     | EP-V1.1, EP-V2.1, EP-V3.2, EP-V4.1, BVA ($T = 29s$)  | `Email`: `test@eshop.com<br>``Password`: `Test1234!`                                                                                            | 1. Chờ đúng 29 giây kể từ lúc bị khóa ở TC02-04.`<br>`2. Nhập Email đúng và Mật khẩu đúng.`<br>`3. Bấm nút "Đăng nhập".                                                                                                                          | Đăng nhập thất bại. Báo lỗi tài khoản đang bị khóa tạm thời.                                                   |
| **TC02-06** (Pos) | Đăng nhập thành công bằng mật khẩu đúng ngay khi hết 30s khóa           | EP-V1.1, EP-V2.1, EP-V3.2, EP-V4.2, BVA ($T = 30s$)  | `Email`: `test@eshop.com<br>``Password`: `Test1234!`                                                                                            | 1. Chờ đúng 30 giây kể từ lúc bị khóa ở TC02-04.`<br>`2. Nhập Email đúng và Mật khẩu đúng.`<br>`3. Bấm nút "Đăng nhập".                                                                                                                          | Đăng nhập thành công, cấp JWT Token và reset bộ đếm sai về 0.                                                     |
| **TC02-07** (Neg) | Đăng nhập với email đúng định dạng nhưng chưa đăng ký                 | EP-V1.2, EP-V2.2                                       | `Email`: `notfound@eshop.com<br>``Password`: `AnyPassword123!`                                                                                  | 1. Nhập Email chưa đăng ký.`<br>`2. Nhập mật khẩu bất kỳ.`<br>`3. Bấm nút "Đăng nhập".                                                                                                                                                                   | Đăng nhập thất bại. Hiển thị thông báo lỗi đăng nhập chung.                                                     |
| **TC02-08** (Neg) | Đăng nhập với email sai định dạng (validate Client)                          | EP-I1.2                                                | `Email`: `invalid-email-format<br>``Password`: `Test1234!`                                                                                      | 1. Nhập Email thiếu ký tự `@`.`<br>`2. Bấm nút "Đăng nhập".                                                                                                                                                                                                    | HTML5 validation chặn submit form, hiển thị cảnh báo định dạng tại form. Không gửi request lên Server.           |
| **TC02-09** (Neg) | Đăng nhập khi để trống trường Email                                         | EP-I1.1                                                | `Email`: `(để trống)<br>``Password`: `Test1234!`                                                                                             | 1. Để trống Email, nhập mật khẩu.`<br>`2. Bấm nút "Đăng nhập".                                                                                                                                                                                                 | Form hiển thị lỗi yêu cầu bắt buộc nhập Email (HTML5 required).                                                      |
| **TC02-10** (Neg) | Đăng nhập khi để trống trường Mật khẩu                                    | EP-I2.1                                                | `Email`: `test@eshop.com<br>``Password`: `(để trống)`                                                                                        | 1. Nhập Email, để trống mật khẩu.`<br>`2. Bấm nút "Đăng nhập".                                                                                                                                                                                                 | Form hiển thị lỗi yêu cầu bắt buộc nhập Mật khẩu (HTML5 required).                                                 |
| **TC02-11** (Pos) | Reset bộ đếm số lần đăng nhập sai khi có đăng nhập thành công xen kẽ | Khôi phục trạng thái bộ đếm                     | `Email`: `test@eshop.com<br>``Password` 1: `WrongPass!` (Sai)`<br>Password` 2: `Test1234!` (Đúng)`<br>Password` 3: `WrongPass!` (Sai) | 1. Đăng nhập sai mật khẩu lần 1 (N = 1).`<br>`2. Đăng nhập đúng mật khẩu $\rightarrow$ Đăng nhập thành công và reset bộ đếm $N = 0$.`<br>`3. Đăng xuất tài khoản.`<br>`4. Nhập mật khẩu sai lần nữa $\rightarrow$ Đăng nhập. | Ở bước 4, đăng nhập thất bại và bộ đếm sai được tính lại là 1. Tài khoản không bị khóa.               |

---

## PHẦN III: BÁO CÁO KIỂM THỬ TÍNH NĂNG FR-07: GIỎ HÀNG

### 1. Xác định các Biến (Variables)

* **Biến đầu vào trực tiếp:**
  * `Add_Quantity` (Số nguyên): Số lượng sản phẩm người dùng nhập vào từ trang chi tiết để thêm hoặc điều chỉnh.
  * `Cart_Action` (Thao tác): Thao tác trong giỏ hàng (bấm nút `+`, nút `-`, hoặc nút `Xóa`).
  * `Confirm_Delete` (Lựa chọn): Đồng ý ("Đồng ý") hoặc Hủy bỏ ("Hủy") trên dialog xác nhận xóa sản phẩm.
* **Biến trạng thái hệ thống:**
  * `Product_Existence_In_Cart` (Trạng thái): Sản phẩm đã có trong giỏ hàng trước đó chưa ("Chưa có" hoặc "Đã có sẵn").
  * `Cart_State` (Trạng thái): Giỏ hàng trống hoặc giỏ hàng đang có sản phẩm.
  * `Current_Quantity` (Số nguyên): Số lượng hiện tại của sản phẩm trong giỏ hàng ($Current\_Quantity \ge 1$).

### 2. Phân vùng tương đương (Equivalence Partitioning)

* **`Add_Quantity`:**
  * **EP-V1.1**: Số nguyên dương $\ge 1$. (Cho phép thêm thành công).
  * **EP-I1.1**: Bằng 0. (Hệ thống chặn).
  * **EP-I1.2**: Số nguyên âm. (Hệ thống chặn).
  * **EP-I1.3**: Không phải số nguyên (thập phân, chuỗi ký tự, trống). (Hệ thống chặn).
* **`Cart_Action`:**
  * **EP-V2.1**: Bấm `+` (tăng số lượng thêm 1).
  * **EP-V2.2**: Bấm `-` (giảm số lượng đi 1).
  * **EP-V2.3**: Bấm `Xóa` (kích hoạt dialog xác nhận).
* **`Confirm_Delete`:**
  * **EP-V3.1**: Chọn "Đồng ý" (Xóa sản phẩm khỏi giỏ).
  * **EP-V3.2**: Chọn "Hủy" (Giữ lại sản phẩm).
* **`Cart_State`:**
  * **EP-V4.1**: Giỏ hàng trống (Hiển thị hình minh họa và thông báo giỏ hàng trống).
  * **EP-V4.2**: Giỏ hàng có sản phẩm (Hiển thị danh sách sản phẩm và tổng tiền nhãn "Tổng cộng").

### 3. Phân tích giá trị biên (Boundary Value Analysis)

* **Biên số lượng thêm (`Add_Quantity`):**
  * **$Add\_Quantity = 0$ (Dưới biên hợp lệ):** Không cho phép thêm sản phẩm.
  * **$Add\_Quantity = 1$ (Tại biên hợp lệ - Tối thiểu):** Thêm sản phẩm thành công với số lượng là 1.
  * **$Add\_Quantity = 2$ (Trên biên hợp lệ):** Thêm sản phẩm thành công với số lượng là 2.
* **Biên số lượng hiện tại khi giảm (`Current_Quantity`):**
  * **Khi `Current_Quantity` = 2:** Nhấp nút `-`. Số lượng giảm thành công xuống còn 1.
  * **Khi `Current_Quantity` = 1 (Biên tối thiểu):** Nút `-` bị vô hiệu hóa (disabled) hoặc nếu nhấp vào không làm giảm số lượng xuống 0.

### 4. Các ca kiểm thử cho FR-07

| Test Case ID            | Tên kịch bản                                                               | Phân vùng/Biên áp dụng                   | Dữ liệu đầu vào (Input Data)                        | Các bước thực hiện (Steps)                                                                            | Kết quả mong đợi (Expected Result)                                                                                                             |
| :---------------------- | :---------------------------------------------------------------------------- | :-------------------------------------------- | :------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| **TC07-01** (Pos) | Thêm sản phẩm chưa có trong giỏ với số lượng tối thiểu            | EP-V1.1, EP-V4.1, BVA ($Add\_Quantity = 1$) | Chọn sản phẩm A, Số lượng = 1. Giỏ hàng trống.  | 1. Vào chi tiết sản phẩm A.`<br>`2. Nhập số lượng = 1.`<br>`3. Bấm "Thêm vào giỏ hàng".   | Sản phẩm được thêm thành công. Giỏ hàng xuất hiện dòng sản phẩm A với số lượng 1.                                               |
| **TC07-02** (Pos) | Thêm sản phẩm đã có sẵn trong giỏ hàng (cộng dồn)                  | EP-V1.1, EP-V4.2                              | Sản phẩm A đã có trong giỏ (SL = 1). Thêm SL = 2. | 1. Vào chi tiết sản phẩm A.`<br>`2. Nhập số lượng = 2.`<br>`3. Bấm "Thêm vào giỏ hàng".   | Số lượng sản phẩm A trong giỏ cộng dồn thành 3. Không tạo dòng mới.                                                                   |
| **TC07-03** (Neg) | Thêm sản phẩm với số lượng bằng 0                                     | EP-I1.1, BVA ($Add\_Quantity = 0$)          | Chọn sản phẩm A, Số lượng = 0.                     | 1. Nhập số lượng = 0.`<br>`2. Bấm "Thêm vào giỏ hàng".                                          | Form chặn không cho gửi request, hiển thị cảnh báo lỗi số lượng.                                                                        |
| **TC07-04** (Neg) | Thêm sản phẩm với số lượng là số âm                                 | EP-I1.2, BVA ($Add\_Quantity = -1$)         | Chọn sản phẩm A, Số lượng = -1.                    | 1. Nhập số lượng = -1.`<br>`2. Bấm "Thêm vào giỏ hàng".                                         | Form chặn lại không cho gửi request, hiển thị cảnh báo.                                                                                    |
| **TC07-05** (Neg) | Thêm sản phẩm với định dạng số lượng không hợp lệ                | EP-I1.3                                       | Chọn sản phẩm A, Số lượng =`abc` hoặc `1.5`.  | 1. Nhập chuỗi `abc` hoặc số thập phân `1.5`.`<br>`2. Bấm "Thêm vào giỏ hàng".             | Trường input chặn không cho phép nhập ký tự không phải số nguyên dương.                                                              |
| **TC07-06** (Pos) | Tăng số lượng sản phẩm trong giỏ bằng nút `+`                      | EP-V2.1                                       | Giỏ hàng có sản phẩm A (SL = 1).                    | 1. Vào Giỏ hàng.`<br>`2. Nhấp vào nút `+` của sản phẩm A.                                     | Số lượng sản phẩm A tăng lên thành 2. Cập nhật thành tiền và tổng tiền tăng theo đơn giá.                                       |
| **TC07-07** (Pos) | Giảm số lượng sản phẩm bằng nút `-` khi số lượng lớn hơn 1     | EP-V2.1, BVA ($Current\_Quantity = 2$)      | Giỏ hàng có sản phẩm A (SL = 2).                    | 1. Vào Giỏ hàng.`<br>`2. Nhấp vào nút `-` của sản phẩm A.                                     | Số lượng sản phẩm A giảm xuống thành 1. Cập nhật thành tiền và tổng tiền tương ứng.                                              |
| **TC07-08** (Neg) | Bấm nút `-` khi số lượng sản phẩm đang ở biên tối thiểu bằng 1 | EP-V2.2, BVA ($Current\_Quantity = 1$)      | Giỏ hàng có sản phẩm A (SL = 1).                    | 1. Tìm sản phẩm A trong giỏ hàng.`<br>`2. Kiểm tra trạng thái nút `-`. Nhấp thử nút `-`. | Nút `-` bị vô hiệu hóa (disabled) không cho bấm, hoặc bấm vào số lượng vẫn giữ nguyên là 1.                                     |
| **TC07-09** (Pos) | Xóa sản phẩm khỏi giỏ nhưng chọn Hủy trên dialog                     | EP-V2.3, EP-V3.2                              | Giỏ hàng có sản phẩm A.                             | 1. Nhấp nút "Xóa" (thùng rác) của sản phẩm A.`<br>`2. Chọn "Hủy" trên dialog xác nhận.      | Dialog đóng lại. Sản phẩm A giữ nguyên trong giỏ hàng.                                                                                    |
| **TC07-08** (Pos) | Xóa sản phẩm khỏi giỏ và chọn Đồng ý trên dialog                   | EP-V2.3, EP-V3.1                              | Giỏ hàng có sản phẩm A.                             | 1. Nhấp nút "Xóa" của sản phẩm A.`<br>`2. Chọn "Đồng ý" trên dialog xác nhận.               | Sản phẩm A bị xóa khỏi giỏ hàng. Tổng tiền giỏ hàng cập nhật giảm đi.                                                               |
| **TC07-11** (Pos) | Kiểm tra giao diện hiển thị khi giỏ hàng trống                         | EP-V5.1                                       | Giỏ hàng không có sản phẩm.                        | 1. Vào trang Giỏ hàng khi trống.                                                                       | Giao diện hiển thị Empty State với hình minh họa và thông báo giỏ hàng trống rõ ràng.                                                |
| **TC07-12** (Pos) | Kiểm tra định dạng tiền tệ và nhãn tổng tiền                        | Quy chuẩn FR-21                              | Giỏ hàng có sản phẩm.                               | 1. Xem hiển thị tổng tiền cuối giỏ hàng.                                                            | Nhãn hiển thị chính xác là**"Tổng cộng"**. Tiền định dạng phân cách hàng nghìn và có ký hiệu `₫` (ví dụ: `150,000 ₫`). |
| **TC07-13** (Pos) | Kiểm tra tính năng quay lại mua sắm                                      | Luồng chuyển hướng                        | Giỏ hàng bất kỳ.                                     | 1. Nhấp vào nút "Tiếp tục mua sắm".                                                                  | Chuyển hướng người dùng quay trở lại trang chủ.                                                                                           |

---

## PHẦN IV: BÁO CÁO KIỂM THỬ TÍNH NĂNG FR-13: DASHBOARD (WEB ADMIN)

### 1. Xác định các Biến (Variables)

* **Biến trạng thái cơ sở dữ liệu:**
  * `Order_Status` (Trạng thái): Trạng thái của các đơn hàng trong CSDL (`pending`, `confirmed`, `shipping`, `delivered`, `canceled`).
  * `Order_Total_Amount` (Số thực không âm): Số tiền thanh toán của các đơn hàng trong CSDL.
  * `Database_Orders_Count` (Số nguyên không âm): Tổng số bản ghi đơn hàng tồn tại trong CSDL.

### 2. Phân vùng tương đương (Equivalence Partitioning)

* **`Order_Status`:**
  * **EP-V1.1**: Đơn hàng có trạng thái `delivered` $\rightarrow$ Số tiền được cộng vào Tổng doanh thu, đơn hàng được tính vào Tổng số đơn hàng.
  * **EP-V1.2**: Đơn hàng có trạng thái khác `delivered` (`pending`, `confirmed`, `shipping`, `canceled`) $\rightarrow$ Tiền **KHÔNG** được cộng vào doanh thu, đơn hàng vẫn được tính vào Tổng số đơn hàng.
* **`Order_Total_Amount`:**
  * **EP-V2.1**: Số tiền lớn hơn 0 ($Amount > 0$). (Được cộng vào tổng doanh thu nếu đơn `delivered`).
  * **EP-V2.2**: Số tiền bằng 0 ($Amount = 0$). (Không làm thay đổi doanh thu, vẫn tính là 1 đơn).
  * **EP-I2.1**: Số tiền âm ($Amount < 0$). (Lỗi logic dữ liệu).
* **`Database_Orders_Count`:**
  * **EP-V3.1**: CSDL trống ($Count = 0$). (Doanh thu = 0 ₫, tổng số đơn = 0).
  * **EP-V3.2**: CSDL có đơn hàng ($Count \ge 1$). (Hiển thị đúng thống kê số lượng và doanh thu).

### 3. Phân tích giá trị biên (Boundary Value Analysis)

* **Biên số lượng đơn hàng hiển thị (`Database_Orders_Count`):**
  * **$Count = 0$ (Biên cực tiểu):** Hiển thị Tổng số đơn: 0, Doanh thu: 0 ₫.
  * **$Count = 1$ (Sát biên cực tiểu):** Hiển thị Tổng số đơn: 1.
* **Biên trạng thái đơn hàng tính doanh thu:**
  * **Trạng thái `shipping` (Biên trước chuyển đổi):** Đơn hàng trị giá $100,000 ₫$ ở trạng thái `shipping` $\rightarrow$ Doanh thu không tăng.
  * **Trạng thái `delivered` (Biên tính doanh thu):** Đơn hàng chuyển từ `shipping` sang `delivered` $\rightarrow$ Doanh thu lập tức tăng thêm đúng $100,000 ₫$.

### 4. Các ca kiểm thử cho FR-13

| Test Case ID            | Tên kịch bản                                                               | Phân vùng/Biên áp dụng                     | Dữ liệu đầu vào (CSDL & Trạng thái)                                                                                                        | Các bước thực hiện (Steps)                                                                                                                                         | Kết quả mong đợi (Expected Result)                                                                                                                                   |
| :---------------------- | :---------------------------------------------------------------------------- | :---------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **TC13-01** (Pos) | Kiểm tra Dashboard khi cơ sở dữ liệu trống                              | EP-V3.1, BVA ($Count = 0$)                    | CSDL không có đơn hàng nào.                                                                                                                 | 1. Đăng nhập Admin (`admin@eshop.com`).`<br>`2. Truy cập trang Dashboard Admin.                                                                                 | - Tổng số đơn hàng hiển thị:**0**.`<br>`- Tổng doanh thu hiển thị: **0 ₫**.                                                                     |
| **TC13-02** (Pos) | Kiểm tra doanh thu khi có duy nhất 1 đơn hàng `delivered`             | EP-V1.1, EP-V2.1, BVA ($Count = 1$)           | CSDL có 1 đơn hàng:`<br>`- `ORD01`: `delivered`, giá trị `150,000 ₫`.                                                              | 1. Đăng nhập tài khoản Admin.`<br>`2. Xem thông tin hiển thị trên Dashboard.                                                                                 | - Tổng số đơn hàng hiển thị:**1**.`<br>`- Tổng doanh thu hiển thị: **150,000 ₫**.                                                               |
| **TC13-03** (Pos) | Kiểm tra doanh thu không tính đơn hàng `pending`                      | EP-V1.2, EP-V2.1                                | CSDL có:`<br>`- `ORD01`: `delivered`, giá trị `150,000 ₫`.`<br>`- `ORD02`: `pending`, giá trị `200,000 ₫`.                 | 1. Đăng nhập tài khoản Admin.`<br>`2. Truy cập Dashboard Admin.                                                                                                 | - Tổng số đơn hàng hiển thị:**2**.`<br>`- Tổng doanh thu hiển thị: **150,000 ₫** (không cộng đơn `pending`).                              |
| **TC13-04** (Pos) | Kiểm tra doanh thu không tính đơn hàng `confirmed`                    | EP-V1.2, EP-V2.1                                | CSDL có:`<br>`- `ORD01`: `delivered`, giá trị `150,000 ₫`.`<br>`- `ORD02`: `confirmed`, giá trị `300,000 ₫`.               | 1. Đăng nhập tài khoản Admin.`<br>`2. Truy cập Dashboard Admin.                                                                                                 | - Tổng số đơn hàng hiển thị:**2**.`<br>`- Tổng doanh thu hiển thị: **150,000 ₫** (không cộng đơn `confirmed`).                            |
| **TC13-05** (Pos) | Kiểm tra doanh thu không tính đơn hàng `shipping`                     | EP-V1.2, EP-V2.1, BVA                           | CSDL có:`<br>`- `ORD01`: `delivered`, giá trị `150,000 ₫`.`<br>`- `ORD02`: `shipping`, giá trị `500,000 ₫`.                | 1. Đăng nhập tài khoản Admin.`<br>`2. Truy cập Dashboard Admin.                                                                                                 | - Tổng số đơn hàng hiển thị:**2**.`<br>`- Tổng doanh thu hiển thị: **150,000 ₫** (không cộng đơn `shipping`).                             |
| **TC13-06** (Pos) | Cập nhật doanh thu tức thì khi đơn hàng chuyển sang `delivered`     | EP-V1.1, BVA (Biên chuyển đổi trạng thái) | CSDL ban đầu có:`<br>`- `ORD01`: `delivered`, giá trị `150,000 ₫`.`<br>`- `ORD02`: `shipping`, giá trị `500,000 ₫`.      | 1. Xem Dashboard (ghi nhận doanh thu `150,000 ₫`).`<br>`2. Chuyển trạng thái của `ORD02` từ `shipping` sang `delivered`.`<br>`3. Xem lại Dashboard. | - Tổng số đơn hàng hiển thị:**2**.`<br>`- Tổng doanh thu hiển thị: **650,000 ₫** (cập nhật cộng thêm 500,000 ₫ của đơn `ORD02`).      |
| **TC13-07** (Pos) | Kiểm tra doanh thu không tính đơn hàng `canceled`                     | EP-V1.2, EP-V2.1                                | CSDL có:`<br>`- `ORD01`: `delivered`, giá trị `150,000 ₫`.`<br>`- `ORD02`: `canceled`, giá trị `1,000,000 ₫`.              | 1. Đăng nhập tài khoản Admin.`<br>`2. Truy cập Dashboard Admin.                                                                                                 | - Tổng số đơn hàng hiển thị:**2**.`<br>`- Tổng doanh thu hiển thị: **150,000 ₫** (không cộng đơn đã hủy).                                |
| **TC13-08** (Pos) | Kiểm tra tính doanh thu đơn hàng giá trị bằng 0                       | EP-V2.2                                         | CSDL có 2 đơn hàng `delivered`:`<br>`- `ORD01`: giá trị `150,000 ₫`.`<br>`- `ORD02`: giá trị `0 ₫` (mã giảm giá 100%). | 1. Đăng nhập tài khoản Admin.`<br>`2. Truy cập Dashboard Admin.                                                                                                 | - Tổng số đơn hàng hiển thị:**2**.`<br>`- Tổng doanh thu hiển thị: **150,000 ₫** (đơn giá trị 0 ₫ không làm thay đổi tổng doanh thu). |
| **TC13-09** (Neg) | Kiểm tra hệ thống xử lý khi có đơn hàng có giá trị âm trong CSDL | EP-I2.1                                         | CSDL có đơn hàng:`<br>`- `ORD01`: `delivered`, giá trị `-50,000 ₫` (lỗi dữ liệu).                                               | 1. Đăng nhập tài khoản Admin.`<br>`2. Truy cập Dashboard Admin.                                                                                                 | Hệ thống không hiển thị doanh thu âm, hiển thị lỗi dữ liệu hoặc báo lỗi trên console/UI không bị crash.                                                 |

---

## PHẦN V: BÁO CÁO KIỂM THỬ TÍNH NĂNG FR-20: TÍNH NĂNG MOBILE (HỦY ĐƠN HÀNG)

### 1. Xác định các Biến (Variables)

* **Biến đầu vào trực tiếp:**
  * `Cancel_Request` (Thao tác): Yêu cầu hủy đơn hàng (bấm nút "Hủy đơn" trên UI).
* **Biến trạng thái hệ thống:**
  * `Current_Order_Status` (Trạng thái): Trạng thái của đơn hàng cần hủy (`pending`, `confirmed`, `shipping`, `delivered`, `canceled`).
  * `User_Role` (Vai trò): Vai trò tài khoản thực hiện hủy (`user` - người dùng thường hoặc `admin` - quản trị viên).

### 2. Phân vùng tương đương (Equivalence Partitioning)

* **`Current_Order_Status`:**
  * **EP-V1.1**: Đơn hàng có trạng thái `pending` $\rightarrow$ Cho phép người dùng thường hủy đơn.
  * **EP-V1.2**: Đơn hàng có trạng thái `confirmed` $\rightarrow$ Cho phép người dùng thường hủy đơn.
  * **EP-I1.1**: Đơn hàng có trạng thái `shipping` $\rightarrow$ Người dùng thường **KHÔNG** được phép tự hủy. Chỉ Admin được phép chuyển đổi/hủy.
  * **EP-I1.2**: Đơn hàng có trạng thái `delivered` (Trạng thái kết thúc) $\rightarrow$ Bị hệ thống chặn (không cho phép hủy).
  * **EP-I1.3**: Đơn hàng có trạng thái `canceled` (Trạng thái kết thúc) $\rightarrow$ Bị hệ thống chặn (đã hủy từ trước).
* **`User_Role`:**
  * **EP-V2.1**: Vai trò người dùng thường (`role = 'user'`) $\rightarrow$ Chỉ hủy được đơn hàng của chính mình khi ở trạng thái `pending` hoặc `confirmed`.
  * **EP-V2.2**: Vai trò quản trị viên (`role = 'admin'`) $\rightarrow$ Có quyền hủy đơn hàng kể cả khi đơn hàng đang ở trạng thái `shipping`.

### 3. Phân tích giá trị biên (Boundary Value Analysis)

* **Biên cho phép hủy và cấm hủy đối với User thường:**
  * **Tại biên được phép hủy (`confirmed`):** Đơn hàng đang ở trạng thái `confirmed`. User nhấp nút "Hủy đơn" $\rightarrow$ Thành công, chuyển sang `canceled`.
  * **Tại biên cấm hủy (`shipping`):** Ngay sau khi đơn hàng được chuyển sang `shipping`. User nhấp nút "Hủy đơn" $\rightarrow$ Thất bại, nút hủy bị ẩn hoặc Backend từ chối request. Đơn hàng giữ nguyên trạng thái `shipping`.
* **Biên trạng thái kết thúc (`delivered` & `canceled`):**
  * Trạng thái kết thúc `delivered` và `canceled` không cho phép chuyển đổi sang bất kỳ trạng thái nào khác (kể cả yêu cầu hủy lại).

### 4. Các ca kiểm thử cho FR-20 (Hủy đơn hàng)

| Test Case ID            | Tên kịch bản                                                                  | Phân vùng/Biên áp dụng                      | Dữ liệu đầu vào (Input/Trạng thái)                                                                          | Các bước thực hiện (Steps)                                                                                                                                                             | Kết quả mong đợi (Expected Result)                                                                                                                                              |
| :---------------------- | :------------------------------------------------------------------------------- | :----------------------------------------------- | :----------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **TC20-01** (Pos) | Hủy đơn hàng thành công ở trạng thái `pending` (User thường)        | EP-V1.1, EP-V2.1                                 | - User thường đăng nhập Mobile.`<br>`- Đơn hàng `ORD_01` của User đó ở trạng thái `pending`.   | 1. Vào Lịch sử đơn hàng trên Mobile.`<br>`2. Chọn đơn hàng `ORD_01`.`<br>`3. Nhấp vào nút "Hủy đơn".`<br>`4. Xác nhận hủy.                                      | Đơn hàng hủy thành công. Trạng thái đơn hàng chuyển sang `canceled`.                                                                                                  |
| **TC20-02** (Pos) | Hủy đơn hàng thành công ở trạng thái `confirmed` (User thường)      | EP-V1.2, EP-V2.1, BVA (Biên được phép hủy) | - User thường đăng nhập Mobile.`<br>`- Đơn hàng `ORD_02` của User đó ở trạng thái `confirmed`. | 1. Vào Lịch sử đơn hàng trên Mobile.`<br>`2. Chọn đơn hàng `ORD_02`.`<br>`3. Nhấp vào nút "Hủy đơn" và xác nhận.                                                  | Đơn hàng hủy thành công. Trạng thái chuyển sang `canceled`.                                                                                                              |
| **TC20-03** (Neg) | User thường không được hủy đơn hàng ở trạng thái `shipping`       | EP-I1.1, EP-V2.1, BVA (Biên cấm hủy)          | - User thường đăng nhập Mobile.`<br>`- Đơn hàng `ORD_03` của User ở trạng thái `shipping`.       | 1. Vào Lịch sử đơn hàng trên Mobile.`<br>`2. Chọn đơn hàng `ORD_03`.`<br>`3. Kiểm tra sự xuất hiện của nút "Hủy đơn".`<br>`4. Thử gửi request API hủy đơn. | - Nút "Hủy đơn" bị ẩn hoặc vô hiệu hóa trên giao diện Mobile.`<br>`- Request API hủy bị Backend từ chối với lỗi: `"Không thể hủy đơn hàng đang giao"`. |
| **TC20-04** (Neg) | Không thể hủy đơn hàng ở trạng thái đã giao `delivered`             | EP-I1.2, BVA (Biên trạng thái kết thúc)     | - Đơn hàng `ORD_04` ở trạng thái `delivered`.                                                            | 1. Cố gắng gửi yêu cầu hủy đơn hàng `ORD_04` qua API.                                                                                                                            | Hệ thống từ chối yêu cầu, báo lỗi không cho chuyển đổi từ trạng thái kết thúc.                                                                                     |
| **TC20-05** (Neg) | Không thể thay đổi trạng thái của đơn hàng đã hủy `canceled`      | EP-I1.3, BVA (Biên trạng thái kết thúc)     | - Đơn hàng `ORD_05` ở trạng thái `canceled`.                                                             | 1. Admin vào trang quản lý đơn hàng.`<br>`2. Cố gắng chuyển trạng thái của `ORD_05` sang `pending` hoặc `confirmed`.                                                   | Hệ thống từ chối yêu cầu. Không cho phép khôi phục trạng thái từ đơn hàng đã hủy.                                                                                |
| **TC20-06** (Pos) | Admin hủy đơn hàng thành công khi đơn hàng ở trạng thái `shipping` | EP-I1.1, EP-V2.2                                 | - Admin đăng nhập API/Web Admin.`<br>`- Đơn hàng `ORD_06` ở trạng thái `shipping`.                  | 1. Admin truy cập trang quản lý đơn hàng.`<br>`2. Chọn đơn hàng `ORD_06`.`<br>`3. Thực hiện chuyển trạng thái sang `canceled`.                                       | Đơn hàng hủy thành công. Trạng thái chuyển sang `canceled` (Admin có quyền hủy đơn đang giao).                                                                     |
| **TC20-07** (Neg) | User thường không thể hủy đơn hàng của người khác trên Mobile       | Phân quyền bảo mật (SEC-06)                  | - User A đăng nhập Mobile.`<br>`- Đơn hàng `ORD_X` là của User B (đang ở trạng thái `pending`).  | 1. User A cố gửi request API hủy đơn hàng `ORD_X` của User B.                                                                                                                      | Hệ thống từ chối. Trả về mã lỗi phân quyền `403 Forbidden` hoặc `404 Not Found`. Đơn hàng `ORD_X` giữ nguyên trạng thái.                                    |

---
