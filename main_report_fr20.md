# BÁO CÁO KIỂM THỬ CHÍNH (MAIN TEST REPORT) — BÀI TẬP 02 (HW02)
## Đề tài: Áp dụng Kiểm thử Miền và Phân tích Giá trị Biên cho Tính năng FR-20: Tính năng Mobile (Tập trung: Hủy Đơn Hàng)

*   **Học phần:** Kiểm thử phần mềm
*   **Hệ thống kiểm thử (SUT):** EShop (Phiên bản dành cho Kiểm thử Phần mềm)
*   **Đối tượng kiểm thử:** Tính năng `FR-20: Tính năng Mobile` (Trọng tâm: Hủy đơn hàng tuân thủ State Machine FR-10)
*   **Phương pháp áp dụng:** Kiểm thử miền (Domain Testing), Phân vùng tương đương (Equivalence Partitioning) & Phân tích giá trị biên (Boundary Value Analysis)

---

## 1. Giới thiệu chung (Introduction)

Báo cáo này được thực hiện nhằm thiết kế các ca kiểm thử chi tiết cho phân hệ Mobile App (React Native + Expo). Ứng dụng di động cung cấp đầy đủ các chức năng như trên Web (Đăng ký, Đăng nhập, Đăng xuất, Giỏ hàng, Thanh toán, Hồ sơ, Lịch sử đơn hàng). Trong đó, một yêu cầu nghiệp vụ cực kỳ quan trọng trên Mobile là **chức năng Hủy đơn hàng**, chức năng này phải tuân thủ nghiêm ngặt mô hình chuyển đổi trạng thái đơn hàng (Order State Machine) được quy định tại `FR-10`.

### Đặc tả Tính năng liên quan:
*   **FR-20:** Ứng dụng di động phải có đầy đủ các tính năng cơ bản. Chức năng hủy đơn hàng chỉ được phép thực hiện khi trạng thái đơn hàng hiện tại là `pending` (Chờ xác nhận) hoặc `confirmed` (Đã xác nhận).
*   **FR-10 (Ràng buộc trạng thái kết thúc):**
    *   Trạng thái `delivered` (Đã giao) và `canceled` (Đã hủy) là các trạng thái kết thúc — không được phép chuyển đổi sang bất kỳ trạng thái nào khác.
    *   Khi đơn hàng ở trạng thái `shipping` (Đang giao hàng), **người dùng thông thường (User) không được phép tự hủy** — chỉ có Admin mới có thể thực hiện thao tác chuyển đổi trạng thái này.

---

## 2. Báo cáo Kiểm thử miền (Domain Testing Report)

Kiểm thử miền giúp chúng ta phân tích các biến đầu vào và biến trạng thái có ảnh hưởng trực tiếp đến kết quả của nghiệp vụ hủy đơn hàng trên ứng dụng di động.

### 2.1. Xác định các Biến (Variables)
1.  **Biến đầu vào trực tiếp (Direct Input Variables):**
    *   `Cancel_Request`: Yêu cầu hủy đơn hàng do người dùng kích hoạt (Nhấp nút "Hủy đơn" trên UI Mobile).
2.  **Biến trạng thái hệ thống (System State Variables):**
    *   `Current_Order_Status`: Trạng thái hiện tại của đơn hàng cần hủy trong CSDL (Lấy giá trị từ tập: `pending`, `confirmed`, `shipping`, `delivered`, `canceled`).
    *   `User_Role`: Vai trò của tài khoản đang đăng nhập trên ứng dụng thực hiện yêu cầu hủy (Lựa chọn: `user` - người dùng thường, hoặc `admin` - quản trị viên).

### 2.2. Phân vùng tương đương (Equivalence Partitioning)
Phân hoạch các miền giá trị ảnh hưởng đến chức năng hủy đơn hàng:

| Tên biến | Phân vùng | Mô tả phân vùng | Tác động mong đợi đến chức năng Hủy đơn |
| :--- | :--- | :--- | :--- |
| **`Current_Order_Status`** | **EP-V1.1** | Đơn hàng có trạng thái là `pending`. | Cho phép người dùng thường hủy đơn hàng. |
| | **EP-V1.2** | Đơn hàng có trạng thái là `confirmed`. | Cho phép người dùng thường hủy đơn hàng. |
| | **EP-I1.1** | Đơn hàng có trạng thái là `shipping`. | Người dùng thường **KHÔNG** được tự hủy. Chỉ Admin được phép chuyển đổi/hủy. |
| | **EP-I1.2** | Đơn hàng có trạng thái là `delivered` (Trạng thái kết thúc). | Bị hệ thống chặn (không cho phép hủy đối với cả User và Admin). |
| | **EP-I1.3** | Đơn hàng có trạng thái là `canceled` (Trạng thái kết thúc). | Bị hệ thống chặn (đơn hàng đã hủy từ trước, không thể hủy lại). |
| **`User_Role`** | **EP-V2.1** | Tài khoản có vai trò người dùng thường (`role = 'user'`). | Chỉ hủy được đơn hàng của chính mình khi ở trạng thái `pending` hoặc `confirmed`. |
| | **EP-V2.2** | Tài khoản có vai trò quản trị viên (`role = 'admin'`). | Có quyền hủy đơn hàng kể cả khi đơn hàng đang ở trạng thái `shipping`. |

---

## 3. Báo cáo Phân tích giá trị biên (Boundary Value Analysis Report)

Phân tích giá trị biên cho chức năng Hủy đơn hàng trên Mobile tập trung vào các điểm chuyển đổi trạng thái của vòng đời đơn hàng, đặc biệt là ranh giới giữa được phép hủy và cấm hủy đối với người dùng thường.

### 3.1. Phân tích Biên cho biến `Current_Order_Status` (Đối với User thường)
*   **Tại biên được phép hủy (`confirmed`):** Đơn hàng vừa mới được Admin xác nhận (`status = 'confirmed'`). Người dùng thường bấm nút "Hủy đơn" trên app Mobile. Kết quả mong đợi: **Thành công**, trạng thái đơn hàng chuyển sang `canceled`.
*   **Tại biên cấm hủy (`shipping`):** Ngay sau khi đơn hàng được chuyển sang trạng thái đang giao hàng (`status = 'shipping'`). Người dùng thường bấm nút "Hủy đơn" trên app Mobile. Kết quả mong đợi: **Thất bại**, hệ thống từ chối yêu cầu hủy đơn, ẩn nút "Hủy đơn" trên giao diện hoặc báo lỗi khi cố gửi request lên API. Đơn hàng giữ nguyên trạng thái `shipping`.
*   **Tại biên trạng thái kết thúc (`delivered`):** Đơn hàng đã giao thành công (`status = 'delivered'`). Người dùng hoặc Admin cố gửi API hủy đơn. Kết quả mong đợi: **Thất bại**, hệ thống chặn chuyển đổi từ trạng thái kết thúc.

---

## 4. Bộ các Ca kiểm thử (Test Cases) hoàn chỉnh cho FR-20 (Trọng tâm Hủy Đơn)

Dưới đây là bộ các ca kiểm thử kết hợp EP và BVA cho tính năng hủy đơn hàng trên phân hệ Mobile.

| Test Case ID | Tên kịch bản | Phân vùng/Biên áp dụng | Dữ liệu đầu vào (Input/Trạng thái) | Các bước thực hiện (Steps) | Kết quả mong đợi (Expected Result) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-01** (Positive) | Hủy đơn hàng thành công ở trạng thái `pending` (User thường) | EP-V1.1, EP-V2.1 | - User đăng nhập Mobile.<br>- Đơn hàng `ORD_01` của User đó đang ở trạng thái `pending`. | 1. Mở app Mobile, vào Lịch sử đơn hàng.<br>2. Chọn đơn hàng `ORD_01`.<br>3. Nhấp vào nút "Hủy đơn".<br>4. Xác nhận hủy. | Đơn hàng hủy thành công. Trạng thái đơn hàng chuyển sang `canceled` trên giao diện và trong CSDL. |
| **TC-02** (Positive) | Hủy đơn hàng thành công ở trạng thái `confirmed` (User thường) | EP-V1.2, EP-V2.1, BVA (Biên được phép hủy) | - User đăng nhập Mobile.<br>- Đơn hàng `ORD_02` của User đó đang ở trạng thái `confirmed`. | 1. Vào Lịch sử đơn hàng trên Mobile.<br>2. Chọn đơn hàng `ORD_02`.<br>3. Nhấp vào nút "Hủy đơn".<br>4. Xác nhận hủy. | Đơn hàng hủy thành công. Trạng thái chuyển sang `canceled`. |
| **TC-03** (Negative) | User thường không được hủy đơn hàng ở trạng thái `shipping` | EP-I1.1, EP-V2.1, BVA (Biên cấm hủy) | - User đăng nhập Mobile.<br>- Đơn hàng `ORD_03` của User đang ở trạng thái `shipping`. | 1. Vào Lịch sử đơn hàng trên Mobile.<br>2. Chọn đơn hàng `ORD_03`.<br>3. Kiểm tra xem nút "Hủy đơn" có hiển thị không.<br>4. (Nếu nút hiển thị hoặc test API) Cố gắng gửi request hủy đơn. | - Nút "Hủy đơn" phải bị ẩn hoặc vô hiệu hóa trên giao diện Mobile.<br>- Nếu gửi request qua API, Backend phải từ chối và báo lỗi: `"Không thể hủy đơn hàng đang giao"`. |
| **TC-04** (Negative) | Không thể hủy đơn hàng ở trạng thái đã giao `delivered` (Trạng thái kết thúc) | EP-I1.2, BVA (Biên trạng thái kết thúc) | - User hoặc Admin đăng nhập.<br>- Đơn hàng `ORD_04` đang ở trạng thái `delivered`. | 1. Truy cập đơn hàng `ORD_04`.<br>2. Cố gắng gửi yêu cầu hủy đơn hàng qua API. | Hệ thống từ chối yêu cầu. Báo lỗi không cho phép chuyển trạng thái từ trạng thái kết thúc `delivered` sang `canceled`. |
| **TC-05** (Negative) | Không thể thay đổi trạng thái của đơn hàng đã hủy `canceled` (Trạng thái kết thúc) | EP-I1.3, BVA (Biên trạng thái kết thúc) | - Admin đăng nhập.<br>- Đơn hàng `ORD_05` đang ở trạng thái `canceled`. | 1. Admin vào trang quản lý đơn hàng.<br>2. Cố gắng chuyển trạng thái của `ORD_05` sang `pending` hoặc `confirmed`. | Hệ thống từ chối yêu cầu. Báo lỗi không cho phép khôi phục trạng thái từ đơn hàng đã hủy. |
| **TC-06** (Positive) | Admin hủy đơn hàng thành công khi đơn hàng ở trạng thái `shipping` | EP-I1.1 (đối với user), EP-V2.2 | - Admin đăng nhập trên Web Admin hoặc API.<br>- Đơn hàng `ORD_06` đang ở trạng thái `shipping`. | 1. Admin truy cập trang quản lý đơn hàng.<br>2. Chọn đơn hàng `ORD_06`.<br>3. Thực hiện chuyển trạng thái sang `canceled`. | Đơn hàng hủy thành công. Trạng thái chuyển sang `canceled` (Admin có quyền hủy đơn hàng ở mọi trạng thái chưa hoàn thành). |
| **TC-07** (Negative) | User thường không thể hủy đơn hàng của người khác trên Mobile | Phân quyền bảo mật (SEC-06) | - User A đăng nhập Mobile.<br>- Đơn hàng `ORD_X` là của User B (đang ở trạng thái `pending`). | 1. User A cố gửi request API hủy đơn hàng `ORD_X` của User B. | Hệ thống từ chối. Trả về mã lỗi phân quyền `403 Forbidden` hoặc `404 Not Found`. Đơn hàng `ORD_X` giữ nguyên trạng thái. |

---

## 5. Kết luận và Khuyến nghị (Conclusion & Recommendations)

*   **Độ bao phủ:** Bộ các ca kiểm thử trên đã bao phủ đầy đủ tất cả các trường hợp chuyển đổi trạng thái của Order State Machine theo đúng quy định tại FR-10 và FR-20 đối với nền tảng di động. Đặc biệt là kiểm thử phân quyền và kiểm thử biên cho phép hủy/cấm hủy giữa các trạng thái `confirmed`, `shipping` và các trạng thái kết thúc.
*   **Khuyến nghị kiểm thử thêm:**
    1.  **Kiểm thử sự đồng bộ dữ liệu (Data Synchronization Testing):** Kiểm tra xem khi Admin thay đổi trạng thái đơn hàng trên Web Admin sang `shipping`, giao diện Lịch sử đơn hàng của User trên Mobile App có tự động cập nhật ngay lập tức (hoặc khi kéo để tải lại - Pull to Refresh) để ẩn nút "Hủy đơn" đi hay không, tránh tình trạng User bấm hủy đơn khi dữ liệu trên màn hình bị cũ.
    2.  **Kiểm thử Offline Mode (Offline State Testing):** Thử nghiệm ngắt kết nối mạng trên điện thoại, bấm nút "Hủy đơn", kiểm tra xem ứng dụng có xử lý lỗi mất kết nối mượt mà hay không, đảm bảo không bị crash ứng dụng.
