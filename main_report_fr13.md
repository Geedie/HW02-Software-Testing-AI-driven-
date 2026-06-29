# BÁO CÁO KIỂM THỬ CHÍNH (MAIN TEST REPORT) — BÀI TẬP 02 (HW02)
## Đề tài: Áp dụng Kiểm thử Miền và Phân tích Giá trị Biên cho Tính năng FR-13: Dashboard (Web Admin)

*   **Học phần:** Kiểm thử phần mềm
*   **Hệ thống kiểm thử (SUT):** EShop (Phiên bản dành cho Kiểm thử Phần mềm)
*   **Đối tượng kiểm thử:** Tính năng `FR-13: Dashboard` (Phân hệ Web Admin)
*   **Phương pháp áp dụng:** Kiểm thử miền (Domain Testing), Phân vùng tương đương (Equivalence Partitioning) & Phân tích giá trị biên (Boundary Value Analysis)

---

## 1. Giới thiệu chung (Introduction)

Báo cáo này được thực hiện nhằm thiết kế các ca kiểm thử chi tiết cho trang Dashboard thuộc phân hệ Web Admin. Dashboard là nơi cung cấp thông tin tổng quan quan trọng cho quản trị viên, đòi hỏi độ chính xác tuyệt đối về mặt số liệu thống kê doanh thu và số lượng đơn hàng từ cơ sở dữ liệu.

### Đặc tả Tính năng FR-13:
*   Hiển thị **Tổng doanh thu**: Chỉ tính tổng `total_amount` của tất cả các đơn hàng có trạng thái là `delivered` (Đã giao hàng).
*   Hiển thị **Tổng số đơn hàng**: Tính tổng số lượng đơn hàng có trong hệ thống (không phân biệt trạng thái).

---

## 2. Báo cáo Kiểm thử miền (Domain Testing Report)

Vì Dashboard là một tính năng thống kê dữ liệu (Read-only từ CSDL), các biến tác động trực tiếp đến kết quả hiển thị của Dashboard nằm ở trạng thái của cơ sở dữ liệu đơn hàng.

### 2.1. Xác định các Biến (Variables)
1.  **Biến trạng thái đơn hàng (`Order_Status`):** Trạng thái của từng đơn hàng trong CSDL (Lấy giá trị từ tập trạng thái định nghĩa ở FR-10: `pending`, `confirmed`, `shipping`, `delivered`, `canceled`).
2.  **Biến giá trị đơn hàng (`Order_Total_Amount`):** Số tiền thanh toán của từng đơn hàng trong CSDL (Kiểu số thực không âm).
3.  **Số lượng đơn hàng tồn tại (`Database_Orders_Count`):** Tổng số bản ghi đơn hàng đang lưu trữ trong cơ sở dữ liệu (Kiểu số nguyên không âm).

### 2.2. Phân vùng tương đương (Equivalence Partitioning)
Phân hoạch các miền giá trị dữ liệu trong CSDL ảnh hưởng đến Dashboard:

| Tên biến | Phân vùng | Mô tả phân vùng | Tác động mong đợi đến Dashboard |
| :--- | :--- | :--- | :--- |
| **`Order_Status`** | **EP-V1.1** | Đơn hàng có trạng thái `delivered`. | Giá trị `total_amount` được cộng vào Tổng doanh thu. Đơn hàng được đếm vào Tổng số đơn hàng. |
| | **EP-V1.2** | Đơn hàng có trạng thái thuộc nhóm: `pending`, `confirmed`, `shipping`, `canceled`. | Giá trị `total_amount` **KHÔNG** được cộng vào Tổng doanh thu. Đơn hàng vẫn được đếm vào Tổng số đơn hàng. |
| | **EP-I1.1** | Đơn hàng có trạng thái không hợp lệ (ví dụ: rỗng, hoặc chuỗi ký tự khác 5 trạng thái trên). | Hệ thống bỏ qua hoặc báo lỗi tính toán (Lỗi dữ liệu CSDL). |
| **`Order_Total_Amount`** | **EP-V2.1** | Đơn hàng có số tiền lớn hơn 0 ($Amount > 0$). | Giá trị tiền được cộng bình thường vào tổng doanh thu (nếu đơn hàng là `delivered`). |
| | **EP-V2.2** | Đơn hàng có số tiền bằng 0 ($Amount = 0$ - Khuyến mãi 100% hoặc thử nghiệm). | Không làm thay đổi tổng doanh thu, vẫn đếm là 1 đơn hàng. |
| | **EP-I2.1** | Đơn hàng có số tiền âm ($Amount < 0$). | Bị từ chối hoặc lỗi tính toán doanh thu (Lỗi logic dữ liệu). |
| **`Database_Orders_Count`** | **EP-V3.1** | Cơ sở dữ liệu trống ($Count = 0$). | Hiển thị Tổng số đơn hàng = 0, Tổng doanh thu = 0 ₫. |
| | **EP-V3.2** | Cơ sở dữ liệu có chứa đơn hàng ($Count \ge 1$). | Hiển thị đúng số lượng đơn hàng và tổng doanh thu tương ứng. |
| | **EP-I3.1** | Số lượng đơn hàng nhỏ hơn 0 ($Count < 0$). | Lỗi logic hệ thống. |

---

## 3. Báo cáo Phân tích giá trị biên (Boundary Value Analysis Report)

Phân tích giá trị biên cho Dashboard tập trung vào các điểm cực tiểu của số lượng đơn hàng và giá trị tiền của đơn hàng `delivered`.

### 3.1. Phân tích Biên cho Tổng số đơn hàng (`Database_Orders_Count`)
*   **$Count = 0$ (Biên cực tiểu):** Hệ thống vừa khởi tạo, CSDL chưa có đơn hàng nào. Kết quả mong đợi: Dashboard hiển thị `Tổng số đơn hàng: 0` và `Tổng doanh thu: 0 ₫`.
*   **$Count = 1$ (Trên biên cực tiểu):** CSDL có đúng 1 đơn hàng. Kết quả: Dashboard hiển thị `Tổng số đơn hàng: 1`.
*   **$Count = 2$:** CSDL có 2 đơn hàng. Kết quả hiển thị `Tổng số đơn hàng: 2`.

### 3.2. Phân tích Biên cho Tổng doanh thu theo trạng thái đơn hàng
*   **Đơn hàng sát biên chuyển đổi trạng thái:**
    *   **Trạng thái `shipping` (Sát biên `delivered`):** Một đơn hàng có giá trị $100,000 ₫$ đang ở trạng thái `shipping`. Tổng doanh thu hiển thị **không thay đổi** (không cộng đơn này).
    *   **Trạng thái `delivered` (Biên tính doanh thu):** Ngay khi đơn hàng trên được Admin xác nhận chuyển sang `delivered`. Tổng doanh thu hiển thị **phải tăng lập tức thêm đúng $100,000 ₫$**.
    *   **Trạng thái `canceled` (Bị hủy):** Đơn hàng có giá trị $100,000 ₫$ bị hủy (`status = 'canceled'`). Doanh thu hiển thị **không thay đổi**.

---

## 4. Bộ các Ca kiểm thử (Test Cases) hoàn chỉnh cho FR-13

Dưới đây là bộ các ca kiểm thử kết hợp EP và BVA để xác minh độ chính xác của số liệu hiển thị trên Dashboard.

| Test Case ID | Tên kịch bản | Phân vùng/Biên áp dụng | Dữ liệu đầu vào (CSDL & Trạng thái) | Các bước thực hiện (Steps) | Kết quả mong đợi (Expected Result) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-01** (Positive) | Kiểm tra Dashboard khi cơ sở dữ liệu trống | EP-V3.1, BVA ($Count = 0$) | CSDL không có đơn hàng nào. | 1. Đăng nhập tài khoản Admin (`admin@eshop.com`).<br>2. Truy cập vào trang Dashboard Admin. | - Tổng số đơn hàng hiển thị: **0**.<br>- Tổng doanh thu hiển thị: **0 ₫**. |
| **TC-02** (Positive) | Kiểm tra doanh thu khi có duy nhất 1 đơn hàng `delivered` | EP-V1.1, EP-V2.1, BVA ($Count = 1$) | CSDL có 1 đơn hàng duy nhất:<br>- Mã: `ORD01`, Trạng thái: `delivered`<br>- Giá trị: `150,000 ₫`. | 1. Đăng nhập tài khoản Admin.<br>2. Truy cập vào trang Dashboard Admin. | - Tổng số đơn hàng hiển thị: **1**.<br>- Tổng doanh thu hiển thị: **150,000 ₫**. |
| **TC-03** (Positive) | Kiểm tra doanh thu không tính đơn hàng `pending` | EP-V1.2, EP-V2.1 | CSDL có 2 đơn hàng:<br>- `ORD01`: `delivered`, giá trị `150,000 ₫`.<br>- `ORD02`: `pending`, giá trị `200,000 ₫`. | 1. Đăng nhập tài khoản Admin.<br>2. Truy cập vào trang Dashboard Admin. | - Tổng số đơn hàng hiển thị: **2**.<br>- Tổng doanh thu hiển thị: **150,000 ₫** (không cộng 200,000 ₫ của đơn `pending`). |
| **TC-04** (Positive) | Kiểm tra doanh thu không tính đơn hàng `confirmed` | EP-V1.2, EP-V2.1 | CSDL có 2 đơn hàng:<br>- `ORD01`: `delivered`, giá trị `150,000 ₫`.<br>- `ORD02`: `confirmed`, giá trị `300,000 ₫`. | 1. Đăng nhập tài khoản Admin.<br>2. Truy cập vào trang Dashboard Admin. | - Tổng số đơn hàng hiển thị: **2**.<br>- Tổng doanh thu hiển thị: **150,000 ₫** (không cộng đơn `confirmed`). |
| **TC-05** (Positive) | Kiểm tra doanh thu không tính đơn hàng `shipping` | EP-V1.2, EP-V2.1, BVA (Biên trước chuyển đổi) | CSDL có 2 đơn hàng:<br>- `ORD01`: `delivered`, giá trị `150,000 ₫`.<br>- `ORD02`: `shipping`, giá trị `500,000 ₫`. | 1. Đăng nhập tài khoản Admin.<br>2. Truy cập vào trang Dashboard Admin. | - Tổng số đơn hàng hiển thị: **2**.<br>- Tổng doanh thu hiển thị: **150,000 ₫** (không cộng đơn `shipping`). |
| **TC-06** (Positive) | Cập nhật doanh thu tức thì khi đơn hàng chuyển sang `delivered` | EP-V1.1, BVA (Biên chuyển đổi trạng thái) | Ban đầu CSDL có:<br>- `ORD01`: `delivered`, giá trị `150,000 ₫`.<br>- `ORD02`: `shipping`, giá trị `500,000 ₫`. | 1. Đăng nhập Admin, xem Dashboard (ghi nhận doanh thu `150,000 ₫`).<br>2. Vào trang Quản lý đơn hàng, chuyển trạng thái của `ORD02` từ `shipping` sang `delivered`.<br>3. Quay lại Dashboard kiểm tra. | - Tổng số đơn hàng hiển thị: **2**.<br>- Tổng doanh thu hiển thị: **650,000 ₫** (doanh thu cập nhật cộng thêm 500,000 ₫ của đơn `ORD02`). |
| **TC-07** (Positive) | Kiểm tra doanh thu không tính đơn hàng `canceled` | EP-V1.2, EP-V2.1 | CSDL có 2 đơn hàng:<br>- `ORD01`: `delivered`, giá trị `150,000 ₫`.<br>- `ORD02`: `canceled`, giá trị `1,000,000 ₫`. | 1. Đăng nhập tài khoản Admin.<br>2. Truy cập vào trang Dashboard Admin. | - Tổng số đơn hàng hiển thị: **2**.<br>- Tổng doanh thu hiển thị: **150,000 ₫** (không cộng đơn đã hủy). |
| **TC-08** (Positive) | Kiểm tra tính doanh thu đơn hàng giá trị bằng 0 | EP-V2.2 | CSDL có 2 đơn hàng `delivered`:<br>- `ORD01`: giá trị `150,000 ₫`.<br>- `ORD02`: giá trị `0 ₫` (mã giảm giá 100%). | 1. Đăng nhập tài khoản Admin.<br>2. Truy cập Dashboard Admin. | - Tổng số đơn hàng hiển thị: **2**.<br>- Tổng doanh thu hiển thị: **150,000 ₫** (đơn giá trị 0 ₫ không làm thay đổi tổng doanh thu). |
| **TC-09** (Negative) | Kiểm tra hệ thống xử lý khi có đơn hàng có giá trị âm trong CSDL | EP-I2.1 | CSDL có đơn hàng:<br>- `ORD01`: `delivered`, giá trị `-50,000 ₫` (lỗi ghi dữ liệu). | 1. Đăng nhập tài khoản Admin.<br>2. Truy cập Dashboard Admin. | Hệ thống không hiển thị doanh thu âm, hiển thị lỗi dữ liệu hoặc báo lỗi trên console/UI không bị crash (tùy cơ chế chịu lỗi của hệ thống). |

---

## 5. Kết luận và Khuyến nghị (Conclusion & Recommendations)

*   **Độ bao phủ:** Bộ các ca kiểm thử trên đã bao phủ đầy đủ tất cả các trường hợp biên của Dashboard đối với cả hai chỉ số: Tổng số đơn hàng (từ CSDL trống đến có dữ liệu) và Tổng doanh thu (bao phủ tất cả 5 trạng thái đơn hàng để đảm bảo chỉ có trạng thái `delivered` được cộng doanh thu).
*   **Khuyến nghị kiểm thử thêm:**
    1.  **Kiểm thử hiệu năng CSDL (Database Performance Testing):** Kiểm tra tốc độ load của Dashboard khi số lượng đơn hàng trong cơ sở dữ liệu cực kỳ lớn (ví dụ: > 100,000 đơn hàng), đảm bảo câu lệnh SQL query sử dụng `SUM` và `COUNT` có index tối ưu.
    2.  **Kiểm thử cập nhật thời gian thực (Real-time update Testing):** Đảm bảo Dashboard hiển thị số liệu đồng bộ ngay lập tức khi có thay đổi trạng thái đơn hàng ở các phiên làm việc của Admin khác mà không cần người dùng phải bấm F5 reload thủ công (nếu hệ thống hỗ trợ WebSocket/Live Update).
