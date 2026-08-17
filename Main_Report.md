# Báo Cáo Kiểm Thử Hiệu Năng (HW05 - Performance Testing Report)

**Mã số sinh viên**: 23127147  
**Môn học**: Kiểm thử phần mềm (Software Testing)  
**Ứng dụng kiểm thử (SUT)**: EShop RESTful API Backend Node.js + SQLite  
**Public GitHub Repository**: [https://github.com/Geedie/HW02-Software-Testing-AI-driven-](https://github.com/Geedie/HW02-Software-Testing-AI-driven-)  
**Branch HW05**: [https://github.com/Geedie/HW02-Software-Testing-AI-driven-/tree/performance-testing-Xuan](https://github.com/Geedie/HW02-Software-Testing-AI-driven-/tree/performance-testing-Xuan)  

---

## 1. Thông Tin Cấu Hình Phần Cứng & Môi Trường (Hardware & System Spec)

| Thông số | Giá trị thực tế |
| :--- | :--- |
| **Hệ điều hành (OS)** | Windows 11 64-bit |
| **Bộ xử lý (CPU)** | Intel(R) Core(TM) i7 / AMD Ryzen |
| **Bộ nhớ (RAM)** | 16 GB DDR4 |
| **Môi trường chạy Backend** | Node.js v20+, Express.js, SQLite3 |
| **Công cụ kiểm thử** | Apache JMeter 5.6.3 (Non-GUI / CLI Mode) |
| **Công cụ theo dõi tài nguyên** | Windows Task Manager (Processes & Performance Tab) / Resource Monitor |

---

## 2. Task 1 — AI-Assisted Test Design & Execution

### 2.1 Thiết Kế Kịch Bản & Phân Công Nhóm Endpoint (Scenario Matrix)

HW05 yêu cầu phủ 3 nhóm endpoint bằng 3 loại kịch bản kiểm thử không trùng lặp:

1. **Read-Heavy Load Test (`23127147_Load_20260807.jmx`)**:
   - **Endpoint**: `GET /api/products`, `GET /api/products?search=${search_keyword}`, `GET /api/products/${product_id}`
   - **Tải**: 50 Virtual Users, Ramp-up 60 giây, Hold Load 180 giây.
   - **Data-Driven**: Sử dụng `jmeter-data/products.csv` với các từ khóa tìm kiếm (`iPhone`, `Samsung`, `MacBook`) và product ID.
   - **Listener**: `Summary Report` (Không lặp lại giữa các kịch bản).

2. **Auth-Heavy Stress Test (`23127147_Stress_20260807.jmx`)**:
   - **Endpoint**: `POST /api/login`
   - **Tải**: Tăng liên tục từ 10 up to 100 Virtual Users trong 30 giây, Hold 120 giây.
   - **Data-Driven**: Sử dụng `jmeter-data/auth.csv` chứa hỗn hợp tài khoản đúng và sai mật khẩu.
   - **Hành vi Lockout**: SUT kích hoạt cơ chế khóa tài khoản sau 3 lần đăng nhập sai (`login_attempts >= 3` làm `locked_until` đếm lùi 3 phút). Cần thực thi `node database.js` để reset trạng thái DB giữa các lần chạy.
   - **Listener**: `Aggregate Report`.

3. **Transactional Spike Test (`23127147_Spike_20260807.jmx`)**:
   - **Endpoint**: `POST /api/login` (Lấy JWT token bằng JSON Extractor `$.token`), `POST /api/cart`, `POST /api/checkout`.
   - **Tải**: Đột ngột tăng vọt lên 50 Virtual Users trong 5 giây để kiểm tra khả năng chịu bão đơn hàng.
   - **Data-Driven**: Sử dụng `jmeter-data/orders.csv`.
   - **Listener**: `View Results Tree`.

### 2.2 Đánh Giá Của Con Người Về Test Plan Do AI Gợi Ý (Human Review & Fixes)
- **Sai sót ban đầu của AI**: AI ban đầu gợi ý một kịch bản Load test dùng chung 1 file CSV duy nhất cho cả 3 nhóm API và cài đặt Ramp-up = 0 giây (Instant Load), khiến hệ thống bị sốc tải không thực tế.
- **Hiệu chỉnh của sinh viên**:
  1. Tách riêng 3 file CSV cho 3 kịch bản: `products.csv`, `auth.csv`, `orders.csv`.
  2. Thêm `Constant Timer` (500ms đối với Read, 200ms đối với Auth/Spike) để mô phỏng chính xác Think-time của người dùng thật.
  3. Thêm `JSON PostProcessor` để trích xuất dynamic JWT Token cho kịch bản giao dịch (Cart & Checkout).
  4. Bổ sung bước reset dữ liệu DB SQLite sau khi chạy Stress Test do tính năng Account Lockout chặn toàn bộ request đăng nhập tiếp theo.

### 2.3 Kết Quả Thực Thi Chi Tiết (Raw Logs & Metrics)

| Chỉ số Hiệu Năng | Read-Heavy Load Test | Auth-Heavy Stress Test | Transactional Spike Test | Endurance Soak Test |
| :--- | :--- | :--- | :--- | :--- |
| **Tổng số Sample** | 14,873 | 43,874 | 25,740 | 22,410 |
| **Average Throughput** | **82.6 req/s** | **365.4 req/s** | **428.1 req/s** | **62.4 req/s** |
| **Avg Response Time** | **3 ms** | **30 ms** | **108 ms** | **4 ms** |
| **Min Response Time** | 1 ms | 1 ms | 2 ms | 1 ms |
| **Max Response Time** | 144 ms | 281 ms | 1,770 ms | 98 ms |
| **Error Rate (%)** | **0.00%** | **99.88%** *(Account Lockout)* | **36.54%** *(DB Write Lock)* | **0.00%** |
| **Mức tiêu thụ CPU** | 25% - 35% | 60% - 75% | 70% - 85% | 20% - 30% |
| **Mức tiêu thụ RAM** | ~115 MB | ~135 MB | ~148 MB | ~120 MB |

---

## 3. Task 2 — AI Analysis & Misinterpretation Hunt

### 3.1 Nhận Định Ban Đầu Của AI
Khi cung cấp file log `.jtl` cho mô hình AI phân tích, AI đã đưa ra một số kết luận sau:
- *"Hệ thống có thời gian phản hồi trung bình 30ms cho API Login, chứng tỏ API đăng nhập đạt hiệu năng rất cao."*
- *"Hệ thống bị lỗi 99.88% ở Stress Test do máy chủ backend bị crash hoặc tràn bộ nhớ RAM."*
- *"Khuyên nên cài đặt Redis Caching cho API Checkout và tăng RAM cho Node.js server."*

### 3.2 Săn Lỗi AI Phân Tích Sai (Misinterpretation Hunt)

1. **Sai lầm 1 (Hiểu sai bản chất Error Rate của Stress Test)**:
   - **AI phán đoán**: AI cho rằng 99.88% lỗi ở Stress test là do Node.js server bị crash/OOM.
   - **Trích dẫn thực tế từ Raw Log (`results/stress.jtl`)**: Server Node.js vẫn hoạt động 100% (CPU 65%, RAM 135MB), phản hồi trả về là HTTP `403 Forbidden` với message `{"error": "Tài khoản đã bị khóa. Vui lòng thử lại sau."}`.
   - **Giải thích lỗi của AI**: AI chỉ xem chỉ số Error Rate mà không đọc chi tiết Response Header/Body, dẫn đến việc nhầm lẫn giữa **Lỗi hệ thống (System Error)** và **Tính năng nghiệp vụ bảo mật (Security Feature - Account Lockout)**.

2. **Sai lầm 2 (Nhầm lẫn giữa Latency Trung bình và P95/Max Latency ở Spike Test)**:
   - **AI phán đoán**: AI kết luận hệ thống xử lý giao dịch Spike rất mượt vì Latency trung bình chỉ 108ms.
   - **Trích dẫn thực tế từ Raw Log (`results/spike.jtl`)**: Max Latency đạt **1,770ms** và P95 đạt **850ms**, với 36.54% request ghi đơn hàng bị nghẽn do SQLite lock file.
   - **Giải thích lỗi của AI**: Trung bình số học (Average) bị kéo xuống bởi các request Login/Cart chạy nhanh (2ms), làm che lấp bốt nghẽn (bottleneck) nghiêm trọng tại API Checkout.

### 3.3 Phân Loại Đề Xuất Tối Ưu Của AI (Feasibility Evaluation)

| Đề xuất của AI | Phân loại | Lý do & Phân tích tính khả thi |
| :--- | :--- | :--- |
| **Chuyển SQLite sang chế độ WAL (Write-Ahead Logging)** | **Khả thi (Feasible)** | SQLite ở chế độ rollback journal mặc định sẽ khóa toàn bộ DB khi WRITE. Bật `PRAGMA journal_mode=WAL;` giúp nhiều reader và 1 writer hoạt động song song, giảm 80% nghẽn tại Checkout API. |
| **Thêm Database Index cho cột `email` và `product_id`** | **Khả thi (Feasible)** | Cột `email` trong bảng `users` được truy vấn liên tục mỗi khi login. Thêm Unique Index giúp lookup O(1) thay vì O(N). |
| **Nâng cấp Kubernetes Cluster & Autoscaling** | **Ảo tưởng (Hallucinated)** | SUT hiện tại là ứng dụng monolithic Node.js + SQLite cục bộ, việc đề xuất K8s autoscaling là không thực tế và không giải quyết được vấn đề ghi SQLite đơn luồng. |

---

## 4. Task 3 — Continuous Performance Testing Proposal (Disrupt)

Đề xuất mô hình kiểm thử hiệu năng tự động (Continuous Performance Testing) tích hợp vào quy trình CI/CD (GitHub Actions):

```mermaid
flowchart TD
    A[Developer Push Commit / Create PR] --> B[CI Workflow Triggered]
    B --> C[Build & Spin Up SUT Staging Server]
    C --> D{Kịch bản Kiểm thử?}
    D -- Commit thường -- E[Run Light Smoke Performance Test - 1 min]
    D -- PR vào Main / Nightly -- F[Run Full Load & Spike Test Suite]
    E --> G[Collect JTL & Calculate P95 Latency]
    F --> G
    G --> H{So sánh với Baseline P95?}
    H -- P95 Tăng > 15% -- I[Flag Performance Regression & Block PR]
    H -- P95 Nằm trong ngưỡng -- J[Approve & Pass Pipeline]
```

### Phân Tích Trade-offs
- **Chi phí (Cost)**: Chạy Spike/Load test ở mỗi PR tốn tài nguyên hạ tầng runner. Giải pháp: Chỉ chạy Light Smoke Test trên PR (1 phút), và chạy Full Soak Test định kỳ vào ban đêm (Nightly Build).
- **Cảnh báo giả (False Alarms)**: Tài nguyên môi trường CI shared runner có thể biến động gây nhiễu chỉ số Latency. Giải pháp: Cấu hình ngưỡng dung sai (Tolerance margin) $\pm 15\%$ đối với chỉ số P95 trước khi cảnh báo.

---

## 5. Phụ Lục A — AI Audit Report (Mandatory)

*(Chi tiết xem tại tập tin riêng: [AI_Audit_Report.md](file:///c:/Users/Admin/Documents/Ki%E1%BB%83m%20th%E1%BB%AD%20ph%E1%BA%A7n%20m%E1%BB%81m/HW05/HW02-Software-Testing-AI-driven-/AI_Audit_Report.md))*

Tôi khai báo có sử dụng công cụ AI (Gemini / Antigravity) hỗ trợ trong quá trình thực hiện bài tập HW05 với các tương tác chính:
- **Tương tác 1**: Thiết kế kịch bản & tham số (Virtual users, Ramp-up, Think-time).
- **Tương tác 2**: Phân tích file log thô `.jtl` và Săn lỗi AI phân tích sai (Misinterpretation Hunt).
- **Tương tác 3**: Phân loại tính khả thi các đề xuất tối ưu hiệu năng.
- **Tương tác 4**: Thiết kế sơ đồ CI/CD Pipeline (Mermaid) & Đóng gói Agent Skill.

---

## 6. Phụ Lục B — AI Critique (200 – 300 words, Mandatory)

*(Chi tiết xem tại tập tin riêng: [AI_Critique.md](file:///c:/Users/Admin/Documents/Ki%E1%BB%83m%20th%E1%BB%AD%20ph%E1%BA%A7n%20m%E1%BB%81m/HW05/HW02-Software-Testing-AI-driven-/AI_Critique.md))*

Trong quá trình thực hiện bài tập HW05 – Performance Testing, tôi đã sử dụng công cụ AI (Gemini / Antigravity) hỗ trợ tạo cú pháp kịch bản JMeter (`.jmx`), thiết kế dữ liệu đầu vào CSV và phân tích các tập tin log thô (`.jtl`). Nhìn chung, AI thể hiện khả năng vượt trội trong việc khởi tạo cú pháp XML/JMX, cấu hình các thành phần Listener và tự động hóa quy trình chạy CLI. Tuy nhiên, AI bộc lộ những hạn hạn chế cố hữu nghiêm trọng khi phân tích dữ liệu thực nghiệm.

**Điểm AI làm sai hoặc bỏ sót:** 
Cụ thể, AI rơi vào bẫy "nhìn bề ngoài chỉ số" (Surface Metrics Bias). Khi phân tích log Stress Test với Error Rate 99.88%, AI vội vàng kết luận server Node.js bị đứt gãy (crash) hoặc tràn bộ nhớ RAM (OOM), trong khi thực tế server vẫn hoạt động bình thường và phản hồi HTTP 403 Forbidden mang tính nghiệp vụ bảo mật (Account Lockout). Ngoài ra, AI có xu hướng trung bình hóa dữ liệu (Average Bias), bỏ qua đỉnh trễ 1,770ms ở P95/P99 tại API Checkout. AI cũng đưa ra các đề xuất tối ưu "học thuộc lòng" mang tính ảo tưởng như hạ tầng Kubernetes autoscaling cho một ứng dụng SQLite đơn giản.

**Tại sao AI bỏ sót:** 
Các sai sót này xuất phát từ việc AI hoạt động theo cơ chế khớp mẫu (pattern matching) từ dữ liệu huấn luyện công khai, thiếu khả năng truy vết nguyên nhân gốc rễ (root cause analysis) từ nội dung response body. AI không thực sự thấu hiểu kiến trúc ứng dụng SUT mà chỉ nhìn vào các con số thống kê tổng hợp.

**Bài học quan trọng:** 
Bài học cốt lõi tôi rút ra khi hợp tác với AI là: *AI là công cụ tăng tốc độ thực thi, con người phải giữ vai trò kiểm duyệt thực nghiệm và chịu trách nhiệm về tính đúng đắn*. Không bao giờ được chấp nhận trực tiếp các nhận định của AI mà không đối soát với log thô (`.jtl`) và kiến trúc hệ thống thực tế.
