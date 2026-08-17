# Báo Cáo Kiểm Thử Hiệu Năng (HW05 - Performance Testing Report)

**Mã số sinh viên**: 23127147  
**Môn học**: Kiểm thử phần mềm (Software Testing)  
**Ứng dụng kiểm thử (SUT)**: EShop RESTful API Backend Node.js + SQLite  

---

## 1. Thông Tin Cấu Hình Phần Cứng & Môi Trường (Hardware & System Spec)

| Thông số | Giá trị thực tế |
| :--- | :--- |
| **Hệ điều hành (OS)** | Windows 11 64-bit |
| **Bộ xử lý (CPU)** | Intel(R) Core(TM) i7 / AMD Ryzen |
| **Bộ nhớ (RAM)** | 16 GB DDR4 |
| **Môi trường chạy Backend** | Node.js v20+, Express.js, SQLite3 |
| **Công cụ kiểm thử** | Apache JMeter 5.6.3 (Non-GUI / CLI Mode) |
| **Công cụ theo dõi tài nguyên** | Windows Task Manager (Processes & Performance Tab) |

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

Tôi khai báo có sử dụng công cụ AI (Gemini / ChatGPT) hỗ trợ trong các tác vụ sau:

1. **Công cụ AI**: Gemini 1.5 Pro / Claude 3.5 Sonnet
2. **Ngày giờ**: 07/08/2026
3. **Prompt mẫu đã sử dụng**:
   > *"Hãy phân tích file log kết quả JMeter .jtl của kịch bản Stress Test đăng nhập EShop, giải thích nguyên nhân gây ra Error Rate 99.88% và đề xuất giải pháp tối ưu DB SQLite."*
4. **Kết quả AI trả về**: Trả về phân tích tổng quan, gợi ý bật SQLite WAL mode và đề xuất tăng RAM server.

---

## 6. Phụ Lục B — AI Critique (200 – 300 words, Mandatory)

Trong quá trình hợp tác với AI thực hiện bài tập HW05, tôi nhận thấy AI thể hiện khả năng rất tốt trong việc tạo cú pháp kịch bản JMeter `.jmx` và viết các đoạn mã bổ trợ nhanh chóng. Tuy nhiên, AI bộc lộ những điểm yếu cố hữu khi phân tích dữ liệu thực nghiệm thực tế từ các file log `.jtl`. 

Cụ thể, AI thường rơi vào bẫy "nhìn bề ngoài chỉ số" (Surface Metrics Bias). Khi thấy tỷ lệ lỗi Stress Test đạt 99.88%, AI ngay lập tức đưa ra giả định rằng hệ thống bị quá tải hoặc quá trình dịch vụ Node.js bị đứt gãy (crash), mà hoàn toàn không phân tích các thông điệp lỗi HTTP 403 mang tính nghiệp vụ bảo mật (Account Lockout) của ứng dụng SUT. Ngoài ra, AI có xu hướng trung bình hóa dữ liệu, dễ dàng bỏ qua các đỉnh trễ (Latency Spikes) nguy hiểm ở P95/P99 - nơi trực tiếp ảnh hưởng đến trải nghiệm người dùng cuối. AI cũng thường xuyên đưa ra các giải pháp tối ưu "học thuộc lòng" mang tính ảo tưởng như tư vấn hạ tầng Kubernetes cho một ứng dụng SQLite đơn giản.

Bài học quan trọng nhất mà tôi rút ra khi làm việc với AI là: **AI chỉ là công cụ hỗ trợ tốc độ, con người phải giữ vai trò kiểm duyệt và chịu trách nhiệm về tính đúng đắn**. Không bao giờ được chấp nhận trực tiếp các nhận định của AI mà không đối soát với bằng chứng thực nghiệm (Empirical Logs) và hiểu biết sâu sắc về kiến trúc ứng dụng SUT.
