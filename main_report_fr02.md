# BÁO CÁO KIỂM THỬ CHÍNH (MAIN TEST REPORT) — BÀI TẬP 02 (HW02)
## Đề tài: Áp dụng Kiểm thử Miền và Phân tích Giá trị Biên cho Tính năng FR-02: Đăng nhập & Khóa tài khoản

*   **Học phần:** Kiểm thử phần mềm
*   **Hệ thống kiểm thử (SUT):** EShop (Phiên bản dành cho Kiểm thử Phần mềm)
*   **Đối tượng kiểm thử:** Tính năng `FR-02: Đăng nhập & Khóa tài khoản`
*   **Phương pháp áp dụng:** Kiểm thử miền (Domain Testing), Phân vùng tương đương (Equivalence Partitioning) & Phân tích giá trị biên (Boundary Value Analysis)

---

## 1. Giới thiệu chung (Introduction)

Báo cáo này được thực hiện nhằm mục đích thiết kế các ca kiểm thử (Test Cases) chi tiết cho tính năng đăng nhập và khóa tài khoản của hệ thống EShop. Việc thiết kế tuân thủ các nguyên tắc thiết kế kiểm thử hộp đen chuẩn, đặc biệt tập trung vào các kỹ thuật phân tích miền để đảm bảo kiểm thử toàn diện các điều kiện biên của hệ thống.

### Đặc tả Tính năng FR-02 (Trích từ tài liệu yêu cầu):
*   Người dùng đăng nhập bằng Email và Mật khẩu.
*   Trường Email phải dùng `type="email"` (có validate HTML5).
*   Mỗi lần đăng nhập sai, hệ thống tăng bộ đếm số lần đăng nhập sai lên **đúng 1 đơn vị**.
*   Nếu đăng nhập sai liên tiếp từ **3 lần trở lên**, tài khoản sẽ bị tạm khóa **30 giây** (môi trường demo). Hệ thống hiển thị thông báo lỗi phù hợp và không làm lộ chi tiết nguyên nhân.
*   Đăng nhập thành công trả về JWT Token lưu ở client và đính kèm trong header `Authorization: Bearer <token>` của các API sau đó.

---

## 2. Báo cáo Kiểm thử miền (Domain Testing Report)

Kiểm thử miền giúp chúng ta phân tích các biến đầu vào và biến trạng thái có ảnh hưởng trực tiếp đến kết quả nghiệp vụ của chức năng đăng nhập và cơ chế khóa tài khoản.

### 2.1. Xác định các Biến (Variables)
Trong tính năng FR-02, các biến được phân chia thành hai loại:
1.  **Biến đầu vào trực tiếp từ phía người dùng (Direct Input Variables):**
    *   `Email`: Chuỗi ký tự biểu diễn địa chỉ email của người dùng.
    *   `Password`: Chuỗi ký tự biểu diễn mật khẩu của người dùng.
2.  **Biến trạng thái hệ thống (System State Variables) - ảnh hưởng đến điều kiện khóa:**
    *   `Consecutive_Failed_Attempts` ($N$): Số lần đăng nhập sai liên tiếp của tài khoản ($N \ge 0$).
    *   `Time_Since_Lockout` ($T$): Thời gian (tính bằng giây) trôi qua kể từ khi tài khoản bắt đầu bị khóa ($T \ge 0$, chỉ có ý nghĩa khi $N \ge 3$).

### 2.2. Phân vùng tương đương (Equivalence Partitioning)
Dựa trên miền giá trị của các biến, ta chia chúng thành các phân vùng tương đương hợp lệ (Valid Partitions - viết tắt là **EP-V**) và không hợp lệ (Invalid Partitions - viết tắt là **EP-I**):

| Tên biến | Phân vùng | Mô tả phân vùng | Trạng thái mong đợi / Hành vi hệ thống |
| :--- | :--- | :--- | :--- |
| **`Email`** | **EP-V1.1** | Email đúng định dạng và đã đăng ký (tồn tại trong CSDL). | Được hệ thống chấp nhận để kiểm tra mật khẩu. |
| | **EP-V1.2** | Email đúng định dạng nhưng chưa đăng ký trong CSDL. | Hệ thống từ chối đăng nhập (Báo lỗi chung). |
| | **EP-I1.1** | Email để trống. | Bị chặn bởi kiểm thử phía Frontend (HTML5 Required). |
| | **EP-I1.2** | Email sai định dạng (ví dụ: `abc`, `abc@`, `abc@.com`, `abc@com`). | Bị chặn bởi kiểm thử phía Frontend (HTML5 Email Format). |
| **`Password`** | **EP-V2.1** | Mật khẩu đúng (trùng khớp với mật khẩu đã lưu của email tương ứng). | Đăng nhập thành công (nếu tài khoản không bị khóa). |
| | **EP-V2.2** | Mật khẩu sai (không trùng khớp với mật khẩu đã lưu). | Đăng nhập thất bại, tăng bộ đếm sai $N$ lên 1. |
| | **EP-I2.1** | Mật khẩu để trống. | Bị chặn bởi kiểm thử phía Frontend (Required field). |
| **`Consecutive_Failed_Attempts` (N)** | **EP-V3.1** | Số lần sai liên tiếp từ 0 đến 2 ($0 \le N < 3$). | Tài khoản ở trạng thái bình thường (mở). |
| | **EP-V3.2** | Số lần sai liên tiếp từ 3 trở lên ($N \ge 3$). | Tài khoản chuyển sang trạng thái bị tạm khóa. |
| | **EP-I3.1** | Số lần sai liên tiếp là số âm ($N < 0$). | Không thể xảy ra về mặt nghiệp vụ (Lỗi hệ thống). |
| **`Time_Since_Lockout` (T)** | **EP-V4.1** | Thời gian từ khi bị khóa nhỏ hơn 30 giây ($T < 30s$). | Tài khoản vẫn đang bị khóa, từ chối mọi yêu cầu đăng nhập. |
| | **EP-V4.2** | Thời gian từ khi bị khóa từ 30 giây trở lên ($T \ge 30s$). | Tài khoản tự động được mở khóa khi đăng nhập đúng. |
| | **EP-I4.1** | Thời gian trôi qua là số âm ($T < 0$). | Không thể xảy ra về mặt nghiệp vụ (Lỗi hệ thống). |

---

## 3. Báo cáo Phân tích giá trị biên (Boundary Value Analysis Report)

Phân tích giá trị biên (BVA) tập trung vào các điểm biên nơi hành vi của hệ thống có sự chuyển dịch rõ rệt. Đối với tính năng FR-02, các biên quan trọng nằm ở **số lần đăng nhập sai** và **thời gian khóa**.

### 3.1. Phân tích Biên cho biến `Consecutive_Failed_Attempts` (N)
Ngưỡng chuyển đổi trạng thái của tài khoản là đăng nhập sai **3 lần liên tiếp**.
*   **Giá trị kiểm thử tại biên:**
    *   **$N = 2$ (Dưới biên khóa):** Người dùng đăng nhập sai lần thứ 2 liên tiếp. Tài khoản vẫn mở, hệ thống chỉ báo lỗi thông thường và bộ đếm lưu là 2.
    *   **$N = 3$ (Tại biên khóa - Điểm chuyển đổi):** Người dùng đăng nhập sai lần thứ 3 liên tiếp. Tài khoản ngay lập tức bị khóa 30 giây. Hệ thống thông báo lỗi phù hợp báo tài khoản bị khóa tạm thời.
    *   **$N = 4$ (Trên biên khóa):** Người dùng tiếp tục đăng nhập sai khi tài khoản đã bị khóa. Tài khoản vẫn bị khóa, hệ thống từ chối xử lý và giữ nguyên trạng thái khóa.

### 3.2. Phân tích Biên cho biến `Time_Since_Lockout` (T)
Ngưỡng mở khóa tự động là **30 giây**. Khi tài khoản đã bị khóa ($N \ge 3$), người dùng thực hiện đăng nhập lại bằng mật khẩu ĐÚNG:
*   **Giá trị kiểm thử tại biên:**
    *   **$T = 29$ giây (Dưới biên mở khóa):** Thực hiện đăng nhập đúng mật khẩu tại thời điểm 29 giây kể từ khi bị khóa. Hệ thống từ chối đăng nhập và báo tài khoản vẫn đang bị khóa tạm thời.
    *   **$T = 30$ giây (Tại biên mở khóa - Điểm chuyển đổi):** Thực hiện đăng nhập đúng mật khẩu tại thời điểm đúng 30 giây kể từ khi bị khóa. Đăng nhập thành công, cấp JWT Token và reset bộ đếm $N$ về 0.
    *   **$T = 31$ giây (Trên biên mở khóa):** Thực hiện đăng nhập đúng mật khẩu tại thời điểm 31 giây kể từ khi bị khóa. Đăng nhập thành công và reset bộ đếm $N$ về 0.

---

## 4. Bộ các Ca kiểm thử (Test Cases) hoàn chỉnh cho FR-02

Dưới đây là sự kết hợp giữa Phân vùng tương đương (EP) và Phân tích giá trị biên (BVA) để thiết kế nên một bộ ca kiểm thử hoàn chỉnh, đảm bảo bao phủ cả kịch bản tích cực (Positive) và tiêu cực (Negative).

| Test Case ID | Tên kịch bản | Phân vùng/Biên áp dụng | Dữ liệu đầu vào (Input Data) | Các bước thực hiện (Steps) | Kết quả mong đợi (Expected Result) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-01** (Positive) | Đăng nhập thành công với tài khoản hợp lệ | EP-V1.1, EP-V2.1, EP-V3.1 ($N=0$) | `Email`: `test@eshop.com`<br>`Password`: `Test1234!` | 1. Truy cập trang đăng nhập.<br>2. Nhập đúng Email và Mật khẩu.<br>3. Bấm nút "Đăng nhập". | Đăng nhập thành công, chuyển hướng đến trang chủ, hệ thống trả về JWT Token lưu ở Client. |
| **TC-02** (Negative) | Đăng nhập thất bại do sai mật khẩu lần 1 | EP-V1.1, EP-V2.2, EP-V3.1 ($N=0 \rightarrow 1$) | `Email`: `test@eshop.com`<br>`Password`: `WrongPass1!` | 1. Truy cập trang đăng nhập.<br>2. Nhập Email đúng và Mật khẩu sai.<br>3. Bấm nút "Đăng nhập". | Đăng nhập thất bại. Bộ đếm đăng nhập sai tăng lên 1 đơn vị. Hiển thị thông báo lỗi đăng nhập chung. |
| **TC-03** (Negative) | Đăng nhập thất bại do sai mật khẩu lần 2 liên tiếp | EP-V1.1, EP-V2.2, BVA ($N=1 \rightarrow 2$) | `Email`: `test@eshop.com`<br>`Password`: `WrongPass2!` | 1. Sử dụng tài khoản vừa đăng nhập sai ở TC-02.<br>2. Nhập Email đúng và Mật khẩu sai lần nữa.<br>3. Bấm nút "Đăng nhập". | Đăng nhập thất bại. Bộ đếm đăng nhập sai tăng lên 2. Tài khoản vẫn chưa bị khóa, hiển thị thông báo lỗi. |
| **TC-04** (Negative) | Đăng nhập thất bại lần 3 liên tiếp và tài khoản bị khóa | EP-V1.1, EP-V2.2, BVA ($N=2 \rightarrow 3$), EP-V3.2 | `Email`: `test@eshop.com`<br>`Password`: `WrongPass3!` | 1. Sử dụng tài khoản vừa đăng nhập sai ở TC-03.<br>2. Nhập Email đúng và Mật khẩu sai lần thứ 3.<br>3. Bấm nút "Đăng nhập". | Đăng nhập thất bại. Bộ đếm đạt 3. Tài khoản bị tạm khóa 30 giây. Hiển thị thông báo lỗi tài khoản bị khóa tạm thời. |
| **TC-05** (Negative) | Đăng nhập đúng mật khẩu khi tài khoản đang bị khóa (chưa hết 30s) | EP-V1.1, EP-V2.1, EP-V3.2, EP-V4.1, BVA ($T = 29s$) | `Email`: `test@eshop.com`<br>`Password`: `Test1234!` | 1. Chờ đúng 29 giây kể từ khi tài khoản bị khóa ở TC-04.<br>2. Nhập Email đúng và Mật khẩu đúng.<br>3. Bấm nút "Đăng nhập". | Đăng nhập thất bại. Hệ thống từ chối và báo tài khoản đang bị khóa tạm thời. |
| **TC-06** (Positive) | Đăng nhập thành công bằng mật khẩu đúng ngay khi hết 30s khóa | EP-V1.1, EP-V2.1, EP-V3.2, EP-V4.2, BVA ($T = 30s$) | `Email`: `test@eshop.com`<br>`Password`: `Test1234!` | 1. Chờ đúng 30 giây kể từ khi tài khoản bị khóa ở TC-04.<br>2. Nhập Email đúng và Mật khẩu đúng.<br>3. Bấm nút "Đăng nhập". | Đăng nhập thành công, cấp JWT Token và tự động reset bộ đếm đăng nhập sai về 0. |
| **TC-07** (Negative) | Đăng nhập với email đúng định dạng nhưng chưa đăng ký | EP-V1.2, EP-V2.2 | `Email`: `notfound@eshop.com`<br>`Password`: `AnyPassword123!` | 1. Nhập Email đúng cấu trúc nhưng không tồn tại trong hệ thống.<br>2. Nhập một mật khẩu bất kỳ.<br>3. Bấm nút "Đăng nhập". | Đăng nhập thất bại. Hệ thống hiển thị thông báo lỗi đăng nhập chung (không tiết lộ việc email này chưa đăng ký). |
| **TC-08** (Negative) | Đăng nhập với email sai định dạng (Kiểm tra validate phía Client) | EP-I1.2 | `Email`: `invalid-email-format`<br>`Password`: `Test1234!` | 1. Nhập Email thiếu ký tự `@` hoặc sai định dạng.<br>2. Nhập mật khẩu bất kỳ.<br>3. Bấm nút "Đăng nhập". | HTML5 validation chặn submit form, hiển thị cảnh báo lỗi định dạng email ngay tại form. Không gửi request lên Server. |
| **TC-09** (Negative) | Đăng nhập khi để trống trường Email | EP-I1.1 | `Email`: `(để trống)`<br>`Password`: `Test1234!` | 1. Để trống trường Email.<br>2. Nhập mật khẩu hợp lệ.<br>3. Bấm nút "Đăng nhập". | Form hiển thị lỗi yêu cầu bắt buộc nhập Email (HTML5 required validation). Không gửi request lên Server. |
| **TC-10** (Negative) | Đăng nhập khi để trống trường Mật khẩu | EP-I2.1 | `Email`: `test@eshop.com`<br>`Password`: `(để trống)` | 1. Nhập Email hợp lệ.<br>2. Để trống trường Mật khẩu.<br>3. Bấm nút "Đăng nhập". | Form hiển thị lỗi yêu cầu bắt buộc nhập Mật khẩu (HTML5 required validation). Không gửi request lên Server. |
| **TC-11** (Positive) | Reset bộ đếm số lần đăng nhập sai khi có đăng nhập thành công xen kẽ | Khôi phục trạng thái bộ đếm | `Email`: `test@eshop.com`<br>`Password` 1: `WrongPass!` (Sai)<br>`Password` 2: `Test1234!` (Đúng)<br>`Password` 3: `WrongPass!` (Sai) | 1. Đăng nhập sai mật khẩu lần 1 (N = 1).<br>2. Đăng nhập đúng mật khẩu $\rightarrow$ Đăng nhập thành công và reset bộ đếm $N = 0$.<br>3. Đăng xuất tài khoản.<br>4. Nhập mật khẩu sai lần nữa $\rightarrow$ Đăng nhập. | Ở bước 4, đăng nhập thất bại và bộ đếm sai được tính lại là 1 (không bị cộng dồn thành 2). Tài khoản không bị khóa. |

---

## 5. Kết luận và Khuyến nghị (Conclusion & Recommendations)

*   **Độ bao phủ:** Bộ các ca kiểm thử trên đã bao phủ đầy đủ tất cả các trường hợp biên của bộ đếm số lần sai liên tiếp ($N=2, 3, 4$), biên thời gian khóa ($T=29s, 30s, 31s$), các trường hợp biên của định dạng email/mật khẩu trống và các luồng nghiệp vụ tích cực/tiêu cực đan xen.
*   **Khuyến nghị kiểm thử thêm:**
    1.  **Kiểm thử bảo mật (Security Testing):** Kiểm tra xem API trả về token JWT có sử dụng thuật toán ký an toàn hay không, và thông báo lỗi có thực sự che giấu lý do đăng nhập sai hay không (ví dụ: không được trả về `"Mật khẩu không đúng"` hoặc `"Tài khoản không tồn tại"` riêng biệt mà phải dùng thông báo chung `"Email hoặc Mật khẩu không chính xác"`).
    2.  **Kiểm thử đồng thời (Concurrency Testing):** Đăng nhập đồng thời trên nhiều trình duyệt khác nhau để kiểm tra tính nhất quán của bộ đếm khóa tài khoản ở phía Backend.
