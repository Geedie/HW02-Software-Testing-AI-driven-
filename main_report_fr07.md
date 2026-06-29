# BÁO CÁO KIỂM THỬ CHÍNH (MAIN TEST REPORT) — BÀI TẬP 02 (HW02)
## Đề tài: Áp dụng Kiểm thử Miền và Phân tích Giá trị Biên cho Tính năng FR-07: Giỏ hàng

*   **Học phần:** Kiểm thử phần mềm
*   **Hệ thống kiểm thử (SUT):** EShop (Phiên bản dành cho Kiểm thử Phần mềm)
*   **Đối tượng kiểm thử:** Tính năng `FR-07: Giỏ hàng` (Shopping Cart) và các phần liên quan ở `FR-06` (Thêm vào giỏ)
*   **Phương pháp áp dụng:** Kiểm thử miền (Domain Testing), Phân vùng tương đương (Equivalence Partitioning) & Phân tích giá trị biên (Boundary Value Analysis)

---

## 1. Giới thiệu chung (Introduction)

Báo cáo này được thực hiện nhằm thiết kế các ca kiểm thử (Test Cases) chi tiết cho tính năng giỏ hàng của hệ thống EShop. Giỏ hàng là một trong những thành phần cốt lõi của hệ thống thương mại điện tử, đòi hỏi tính chính xác cao về mặt tính toán số lượng, thành tiền, xử lý sự kiện đồng bộ và giao diện tương tác người dùng (GUI).

### Đặc tả Tính năng liên quan (Trích từ tài liệu yêu cầu):
*   **FR-06 (Thêm vào giỏ):** Có ô nhập số lượng sản phẩm trước khi thêm (chỉ nhận số nguyên dương, tối thiểu là 1). Sau khi bấm thêm thì hiển thị phản hồi trực quan (toast/badge).
*   **FR-07 (Giỏ hàng):** 
    *   Hiển thị danh sách sản phẩm với các cột: **Sản phẩm**, **Đơn giá**, **Số lượng** (có nút +/- để chỉnh), **Thành tiền**, **Thao tác**.
    *   Thêm cùng một sản phẩm vào giỏ sẽ tăng số lượng, không tạo dòng mới.
    *   Nút **Xóa sản phẩm** phải hiển thị dialog xác nhận trước khi thực hiện.
    *   Có nút **Tiếp tục mua sắm** để quay về trang chủ.
    *   Tổng tiền hiển thị nhãn chính xác là **"Tổng cộng"** (không dùng "Tổng tạm tính").
    *   Giỏ hàng trống phải hiển thị hình minh họa và thông báo rõ ràng.

---

## 2. Báo cáo Kiểm thử miền (Domain Testing Report)

Kiểm thử miền giúp chúng ta phân tích các biến đầu vào trực tiếp và các biến trạng thái liên quan đến việc thay đổi số lượng sản phẩm, cập nhật giỏ hàng và xóa sản phẩm.

### 2.1. Xác định các Biến (Variables)
1.  **Biến đầu vào trực tiếp (Direct Input Variables):**
    *   `Add_Quantity`: Số lượng sản phẩm người dùng nhập vào từ trang chi tiết sản phẩm (FR-06) hoặc chỉnh trực tiếp trong giỏ hàng (Kiểu số nguyên).
    *   `Cart_Action`: Thao tác của người dùng trong giỏ hàng (Nhấp nút `+`, Nhấp nút `-`, Nhấp nút `Xóa`).
    *   `Confirm_Delete`: Phản hồi của người dùng trên dialog xác nhận xóa sản phẩm (Kiểu logic/lựa chọn: "Đồng ý" hoặc "Hủy").
2.  **Biến trạng thái hệ thống (System State Variables):**
    *   `Product_Existence_In_Cart`: Trạng thái tồn tại của sản phẩm trong giỏ hàng khi người dùng bấm thêm sản phẩm (Lựa chọn: "Chưa có" hoặc "Đã có sẵn").
    *   `Cart_State`: Trạng thái của giỏ hàng (Lựa chọn: "Giỏ hàng trống" hoặc "Giỏ hàng có sản phẩm").
    *   `Current_Quantity`: Số lượng hiện tại của một mặt hàng cụ thể trong giỏ hàng ($Q \ge 1$).

### 2.2. Phân vùng tương đương (Equivalence Partitioning)
Dựa trên miền giá trị của các biến, ta chia thành các phân vùng tương đương hợp lệ (**EP-V**) và không hợp lệ (**EP-I**):

| Tên biến | Phân vùng | Mô tả phân vùng | Trạng thái mong đợi / Hành vi hệ thống |
| :--- | :--- | :--- | :--- |
| **`Add_Quantity`** | **EP-V1.1** | Số nguyên dương lớn hơn hoặc bằng 1 ($Add\_Quantity \ge 1$). | Cho phép thêm vào giỏ hàng hoặc cập nhật số lượng thành công. |
| | **EP-I1.1** | Số lượng bằng 0 ($Add\_Quantity = 0$). | Bị hệ thống chặn (Báo lỗi hoặc không cho nhập). |
| | **EP-I1.2** | Số nguyên âm ($Add\_Quantity < 0$). | Bị hệ thống chặn (Báo lỗi hoặc tự động chuyển thành dương/không cho nhập). |
| | **EP-I1.3** | Không phải số nguyên (số thập phân, chuỗi ký tự, hoặc để trống). | Bị chặn bởi kiểm thử định dạng ở giao diện (HTML5 validation). |
| **`Cart_Action`** | **EP-V2.1** | Nhấp nút `+` để tăng số lượng sản phẩm. | Tăng số lượng của sản phẩm đó thêm 1 đơn vị, cập nhật thành tiền. |
| | **EP-V2.2** | Nhấp nút `-` để giảm số lượng sản phẩm. | Giảm số lượng của sản phẩm đó đi 1 đơn vị, cập nhật thành tiền. |
| | **EP-V2.3** | Nhấp nút `Xóa` sản phẩm. | Kích hoạt dialog xác nhận xóa sản phẩm khỏi giỏ hàng. |
| **`Confirm_Delete`** | **EP-V3.1** | Chọn "Đồng ý" (Confirm) trên dialog xác nhận xóa. | Xóa hoàn toàn sản phẩm khỏi giỏ hàng, cập nhật lại tổng tiền. |
| | **EP-V3.2** | Chọn "Hủy" (Cancel) trên dialog xác nhận xóa. | Đóng dialog, sản phẩm vẫn được giữ nguyên trong giỏ hàng. |
| **`Product_Existence_In_Cart`** | **EP-V4.1** | Sản phẩm thêm mới chưa từng có trong giỏ hàng. | Tạo một dòng sản phẩm mới trong danh sách giỏ hàng. |
| | **EP-V4.2** | Sản phẩm thêm mới đã có sẵn trong giỏ hàng. | Cộng dồn số lượng thêm mới vào dòng sản phẩm hiện có, không tạo dòng mới. |
| **`Cart_State`** | **EP-V5.1** | Giỏ hàng trống (không có sản phẩm nào). | Hiển thị hình minh họa và thông báo giỏ hàng trống thân thiện. |
| | **EP-V5.2** | Giỏ hàng có sản phẩm. | Hiển thị danh sách sản phẩm, các cột thông tin, nút +/- và nhãn "Tổng cộng". |

---

## 3. Báo cáo Phân tích giá trị biên (Boundary Value Analysis Report)

Phân tích giá trị biên (BVA) cho tính năng giỏ hàng tập trung vào các ngưỡng giới hạn của số lượng sản phẩm khi thêm vào giỏ và khi điều chỉnh số lượng.

### 3.1. Phân tích Biên cho số lượng thêm (`Add_Quantity`)
Ngưỡng tối thiểu của số lượng sản phẩm khi thêm vào giỏ là **1**.
*   **Giá trị kiểm thử tại biên:**
    *   **$Add\_Quantity = 0$ (Dưới biên hợp lệ):** Không cho phép thêm sản phẩm. Ô số lượng tự động chuyển về 1 hoặc báo lỗi đỏ yêu cầu nhập số lớn hơn 0.
    *   **$Add\_Quantity = 1$ (Tại biên hợp lệ - Nhỏ nhất):** Thêm sản phẩm thành công vào giỏ hàng với số lượng là 1.
    *   **$Add\_Quantity = 2$ (Trên biên hợp lệ):** Thêm sản phẩm thành công vào giỏ hàng với số lượng là 2.

### 3.2. Phân tích Biên cho số lượng hiện tại khi giảm (`Current_Quantity`)
Khi người dùng nhấp nút `-` để giảm số lượng sản phẩm trong giỏ hàng, số lượng không được phép nhỏ hơn **1**.
*   **Giá trị kiểm thử tại biên:**
    *   **Khi `Current_Quantity` = 2:** Nhấp nút `-`. Số lượng giảm thành công xuống còn 1.
    *   **Khi `Current_Quantity` = 1 (Tại biên tối thiểu):** 
        *   Nút `-` phải bị vô hiệu hóa (disabled) để ngăn giảm xuống 0.
        *   Hoặc nếu nhấp vào nút `-`, hệ thống không thực hiện giảm mà hiển thị cảnh báo (hoặc kích hoạt dialog xác nhận xóa sản phẩm). Theo đặc tả tiêu chuẩn, số lượng tối thiểu là 1, muốn xóa phải bấm nút "Xóa".

---

## 4. Bộ các Ca kiểm thử (Test Cases) hoàn chỉnh cho FR-07

Dưới đây là bộ các ca kiểm thử hoàn chỉnh kết hợp phân vùng tương đương và giá trị biên để kiểm tra tính năng Giỏ hàng.

| Test Case ID | Tên kịch bản | Phân vùng/Biên áp dụng | Dữ liệu đầu vào (Input Data) | Các bước thực hiện (Steps) | Kết quả mong đợi (Expected Result) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-01** (Positive) | Thêm sản phẩm chưa có trong giỏ với số lượng tối thiểu | EP-V1.1, EP-V4.1, BVA ($Add\_Quantity = 1$) | Chọn sản phẩm A, Số lượng = 1. Giỏ hàng đang trống. | 1. Vào trang chi tiết sản phẩm A.<br>2. Nhập số lượng = 1.<br>3. Bấm "Thêm vào giỏ hàng". | Sản phẩm được thêm thành công. Hiển thị phản hồi trực quan (toast/badge). Giỏ hàng xuất hiện 1 dòng mới cho sản phẩm A với số lượng là 1. |
| **TC-02** (Positive) | Thêm sản phẩm đã có sẵn trong giỏ hàng (cộng dồn) | EP-V1.1, EP-V4.2 | Chọn sản phẩm A (đã có trong giỏ với số lượng 1), Số lượng thêm = 2. | 1. Vào lại trang chi tiết sản phẩm A.<br>2. Nhập số lượng = 2.<br>3. Bấm "Thêm vào giỏ hàng".<br>4. Mở giỏ hàng kiểm tra. | Số lượng sản phẩm A trong giỏ hàng được cộng dồn thành 3 ($1 + 2 = 3$). Không xuất hiện thêm dòng sản phẩm mới. |
| **TC-03** (Negative) | Thêm sản phẩm với số lượng bằng 0 | EP-I1.1, BVA ($Add\_Quantity = 0$) | Chọn sản phẩm A, Số lượng = 0. | 1. Vào trang chi tiết sản phẩm A.<br>2. Nhập số lượng = 0.<br>3. Bấm "Thêm vào giỏ hàng". | Form chặn lại không cho gửi request, hiển thị cảnh báo hoặc tự động sửa số lượng về 1. |
| **TC-04** (Negative) | Thêm sản phẩm với số lượng là số âm | EP-I1.2, BVA ($Add\_Quantity = -1$) | Chọn sản phẩm A, Số lượng = -1. | 1. Vào trang chi tiết sản phẩm A.<br>2. Nhập số lượng = -1.<br>3. Bấm "Thêm vào giỏ hàng". | Form chặn lại không cho gửi request, hiển thị cảnh báo hoặc tự động sửa số lượng về 1. |
| **TC-05** (Negative) | Thêm sản phẩm với định dạng số lượng không hợp lệ | EP-I1.3 | Chọn sản phẩm A, Số lượng = `abc` hoặc `1.5`. | 1. Nhập chữ `abc` hoặc số thập phân `1.5` vào ô số lượng.<br>2. Bấm "Thêm vào giỏ hàng". | Trường input HTML5 chặn lại, hoặc tự động làm tròn/không cho phép nhập ký tự không phải số nguyên dương. |
| **TC-06** (Positive) | Tăng số lượng sản phẩm trong giỏ hàng bằng nút `+` | EP-V2.1 | Giỏ hàng đang có sản phẩm A với số lượng = 1. | 1. Mở trang Giỏ hàng.<br>2. Tìm sản phẩm A và nhấp vào nút `+`. | Số lượng sản phẩm A tăng lên thành 2. Cột "Thành tiền" của sản phẩm A và "Tổng cộng" của giỏ hàng cập nhật tăng theo đúng đơn giá. |
| **TC-07** (Positive) | Giảm số lượng sản phẩm bằng nút `-` khi số lượng lớn hơn 1 | EP-V2.1, BVA ($Current\_Quantity = 2$) | Giỏ hàng đang có sản phẩm A với số lượng = 2. | 1. Tìm sản phẩm A trong giỏ hàng.<br>2. Nhấp vào nút `-`. | Số lượng sản phẩm A giảm xuống thành 1. Cột "Thành tiền" và "Tổng cộng" cập nhật giảm tương ứng. |
| **TC-08** (Negative/Edge) | Bấm nút `-` khi số lượng sản phẩm đang ở biên tối thiểu bằng 1 | EP-V2.2, BVA ($Current\_Quantity = 1$) | Giỏ hàng đang có sản phẩm A với số lượng = 1. | 1. Tìm sản phẩm A trong giỏ hàng.<br>2. Kiểm tra trạng thái nút `-`. Nếu nút sáng, hãy thử nhấp vào. | Nút `-` bị vô hiệu hóa (disabled) không cho bấm. Nếu bấm được, số lượng vẫn giữ nguyên là 1, không giảm xuống 0 hay số âm. |
| **TC-09** (Positive) | Xóa sản phẩm khỏi giỏ nhưng chọn Hủy trên dialog xác nhận | EP-V2.3, EP-V3.2 | Giỏ hàng đang có sản phẩm A. | 1. Tìm sản phẩm A trong giỏ hàng.<br>2. Nhấp nút "Xóa" (icon thùng rác).<br>3. Trên dialog xác nhận hiện lên, chọn "Hủy" (Cancel). | Dialog đóng lại. Sản phẩm A vẫn được giữ nguyên trong giỏ hàng với số lượng và thành tiền không đổi. |
| **TC-10** (Positive) | Xóa sản phẩm khỏi giỏ và chọn Đồng ý trên dialog xác nhận | EP-V2.3, EP-V3.1 | Giỏ hàng đang có sản phẩm A. | 1. Tìm sản phẩm A trong giỏ hàng.<br>2. Nhấp nút "Xóa".<br>3. Trên dialog xác nhận, chọn "Đồng ý" (Confirm/Yes). | Sản phẩm A bị xóa hoàn toàn khỏi giỏ hàng. Cột sản phẩm biến mất, tổng tiền cập nhật giảm đi phần tiền của sản phẩm A. |
| **TC-11** (Positive) | Kiểm tra giao diện hiển thị khi giỏ hàng trống | EP-V5.1 | Giỏ hàng không có sản phẩm nào. | 1. Truy cập vào trang Giỏ hàng khi chưa thêm sản phẩm, hoặc sau khi xóa hết sản phẩm. | Giao diện hiển thị trạng thái trống (Empty State) gồm có hình minh họa thân thiện và thông báo rõ ràng (ví dụ: "Giỏ hàng của bạn đang trống"). |
| **TC-12** (Positive) | Kiểm tra định dạng tiền tệ và nhãn tổng tiền | Quy chuẩn giao diện FR-21 | Giỏ hàng đang có ít nhất 1 sản phẩm. | 1. Xem phần hiển thị tổng tiền ở cuối giỏ hàng. | Nhãn hiển thị chính xác là **"Tổng cộng"** (không phải "Tổng tạm tính"). Tiền được định dạng phân cách hàng nghìn và có ký hiệu `₫` (ví dụ: `150,000 ₫`). |
| **TC-13** (Positive) | Kiểm tra tính năng quay lại mua sắm | Luồng chuyển hướng | Giỏ hàng bất kỳ. | 1. Nhấp vào nút "Tiếp tục mua sắm". | Hệ thống chuyển hướng người dùng quay trở lại trang chủ chứa danh sách sản phẩm. |

---

## 5. Kết luận và Khuyến nghị (Conclusion & Recommendations)

*   **Độ bao phủ:** Bộ ca kiểm thử trên đã bao quát toàn bộ các kịch bản tương tác với giỏ hàng: thêm sản phẩm mới, cộng dồn số lượng, kiểm thử các biên số lượng không hợp lệ ($Quantity \le 0$, ký tự), kiểm thử các nút tăng/giảm số lượng tại biên ($Quantity=1$), kiểm thử quy trình xác nhận xóa sản phẩm qua dialog và kiểm tra tính nhất quán của giao diện (nhãn "Tổng cộng", định dạng tiền tệ `₫`, giao diện trống).
*   **Khuyến nghị kiểm thử thêm:**
    1.  **Kiểm thử tích hợp (Integration Testing):** Kiểm tra tính liên kết giữa giỏ hàng và tính năng thanh toán (FR-08) - đảm bảo giỏ hàng trống không thể nhấn thanh toán, và sau khi thanh toán thành công giỏ hàng tự động được xóa sạch.
    2.  **Kiểm thử hiệu năng giỏ hàng (Performance/Load Testing):** Thử nghiệm thêm một số lượng lớn sản phẩm khác nhau vào giỏ hàng (ví dụ: > 50 sản phẩm) để kiểm tra tốc độ tải trang giỏ hàng và hiệu năng tính tổng tiền ở phía Client/Server.
