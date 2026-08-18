# Báo cáo Tích hợp CI/CD (CI/CD Report) — HW06
## Hệ thống: EShop Backend API Testing
## Mã sinh viên: 23127147 | Ngày: 2026-08-18
## Repository: [https://github.com/Geedie/HW02-Software-Testing-AI-driven-](https://github.com/Geedie/HW02-Software-Testing-AI-driven-) | Nhánh: `HW06-API-Testing-Xuan`

---

## 1. Cấu hình Pipeline (Pipeline Configuration)

Hệ thống CI/CD được thiết lập tự động hóa bằng **GitHub Actions** thông qua file workflow:
[.github/workflows/api-tests.yml](file:///c:/Users/Admin/Documents/Ki%E1%BB%83m%20th%E1%BB%AD%20ph%E1%BA%A7n%20m%E1%BB%81m/HW06/HW02-Software-Testing-AI-driven-/.github/workflows/api-tests.yml)

### 🛠 Các bước thực thi tự động trong Workflow:
1. **Checkout Code:** Lấy mã nguồn mới nhất từ nhánh được push (`branches: [ "*" ]`).
2. **Setup Node.js:** Thiết lập môi trường Node.js phiên bản 18.
3. **Install Dependencies:** Chạy `npm install` trong thư mục `backend/` để cài đặt Express, SQLite3, JWT,...
4. **Initialize Database:** Chạy `node database.js` khởi tạo CSDL SQLite với dữ liệu mẫu (Seeded data).
5. **Start Server:** Khởi chạy Backend API server (`node server.js &`) trên cổng 3000 ở chế độ background.
6. **Health Check:** Kiểm tra cổng 3000 đã sẵn sàng nhận kết nối hay chưa trước khi chạy test.
7. **Install Newman:** Cài đặt Newman và các reporter (`newman-reporter-htmlextra`, `newman-reporter-junit`).
8. **Run API Test Suite:** Chạy tập test Postman collection `HW06_EShop_API_Tests.postman_collection.json` với `HW06_Environment.postman_environment.json`.
9. **Upload Artifacts:** Đóng gói và lưu trữ HTML Newman Report (`newman-report-ci.html`) và JUnit XML result làm Artifact trên GitHub Actions.
10. **Clean Up:** Dừng Backend server sau khi kết thúc.

---

## 2. Chi tiết 2 Pipeline Runs (Sample Pipeline Runs)

Theo yêu cầu HW06, pipeline chứng minh 2 lần chạy thực tế trên GitHub Actions:

### 🟢 Run 1: All Tests Passing (Tất cả Test Cases thành công)
- **Git Commit SHA:** `4d80c6fcc4071b52591b6daf1f9ae9d763e90b1e`
- **Commit Link:** [Commit 4d80c6f](https://github.com/Geedie/HW02-Software-Testing-AI-driven-/commit/4d80c6fcc4071b52591b6daf1f9ae9d763e90b1e)
- **Trạng thái Build:** ✅ **PASSED (Build Success)**
- **Mô tả:** Chạy toàn bộ 39 API requests với 62 assertions thành công. Các bug phát hiện được log dưới dạng `console.log()` mà không làm sập assertion.
- **Link kết quả GitHub Actions Run 1:** [GitHub Actions Run 1 (PASSED)](https://github.com/Geedie/HW02-Software-Testing-AI-driven-/actions/runs/32113355491)
- **Hình ảnh chứng minh:**  
  *(Vui lòng đính kèm Ảnh 1: Các step tick xanh & Ảnh 2: Khung Artifacts đã chụp ở trang Run 1)*

---

### 🔴 Run 2: Failing Test Case (Có Test Case thất bại)
- **Git Commit SHA:** `273971ec8e3984dcd7650f09806c9a35a4099411`
- **Commit Link:** [Commit 273971e](https://github.com/Geedie/HW02-Software-Testing-AI-driven-/commit/273971ec8e3984dcd7650f09806c9a35a4099411)
- **Trạng thái Build:** ❌ **FAILED (Build Failed)**
- **Mô tả:** Cố tình thay đổi 1 assertion trong Postman Collection (`TC-API1-001` yêu cầu Status `500` thay vì `200`).
- **Kết quả kỳ vọng:** Newman phát hiện 1 assertion failed ➜ trả về exit code 1 ➜ GitHub Actions đánh dấu workflow thất bại (Red).
- **Link kết quả GitHub Actions Run 2:** [GitHub Actions Run 2 (FAILED)](https://github.com/Geedie/HW02-Software-Testing-AI-driven-/actions/runs/32114672899)
- **Hình ảnh chứng minh:**  
  *(Vui lòng đính kèm Ảnh 3: Bảng điều khiển GitHub Actions báo màu đỏ FAILED)*

---

## 3. Danh sách các Postman / Newman Features được tích hợp trong CI/CD

1. **Pre-request Script Collection Level:** Tự động gắn header `X-Student-Id: 23127147` vào tất cả các HTTP requests.
2. **Environment Variables:** Cấu hình linh hoạt `base_url = http://localhost:3000`.
3. **Dynamic Token Handling:** Đăng nhập lấy token và tự động truyền token qua `pm.collectionVariables.set()`.
4. **HTML Report Export:** Tự động tạo file báo cáo HTML động giao diện đẹp (`htmlextra`).
5. **JUnit Artifacts:** Xuất file kết quả định dạng XML tiêu chuẩn để tích hợp báo cáo trên CI/CD interface.
