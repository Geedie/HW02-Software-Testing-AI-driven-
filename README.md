# HW05 - Performance Testing Report (EShop SUT)

**Sinh viên thực hiện**: 23127147
**Môn học**: Kiểm thử phần mềm
**Hệ thống được kiểm thử (SUT)**: EShop RESTful API Backend (`http://localhost:3000`)

---

## 1. Bảng Tự Đánh Giá (Self-Assessment Table)

|       STT       | Tiêu chí                                                                                                                         | Thăng điểm | Điểm tự đánh giá |
| :-------------: | :--------------------------------------------------------------------------------------------------------------------------------- | :-----------: | :--------------------: |
|        1        | Task 1 — Load testing (Read-Heavy Group, CSV data, Summary Report)                                                                |      20      |           20           |
|        2        | Task 1 — Stress testing (Auth-Heavy Group, Lockout handling, Aggregate Report)                                                    |      20      |           20           |
|        3        | Task 1 — Spike testing (Transactional Group, Token extraction, View Results Tree / Graph)                                         |      20      |           20           |
|        4        | Task 2 — AI analysis + misinterpretation hunt (Phân tích .jtl, trích dẫn giá trị đúng từ raw logs, đánh giá tối ưu) |      10      |           10           |
|        5        | Task 3 — Continuous Performance Testing proposal (Sơ đồ CI/CD, P95 regression, trade-offs)                                     |      10      |           10           |
|        6        | Agent Skills (Kịch bản kiểm thử tự động, cấu trúc skill & tài liệu hướng dẫn)                                        |      10      |           10           |
| **Tổng** | **Tổng điểm đề nghị**                                                                                                  | **100** |     **100**     |

---

## 2. Tóm Tắt Kết Quả Kiểm Thử (Test Summary Report)

### 2.1 Các Kịch Bản & Nhóm Endpoint Được Kiểm Thử

1. **Read-Heavy Load Test (`23127147_Load_20260807.jmx`)**:

   - Endpoint: `GET /api/products`, `GET /api/products?search=`, `GET /api/products/:id`
   - Data File: `jmeter-data/products.csv`
   - Kết quả: **14,873 requests**, Throughput **82.6 req/s**, Latency **3ms**, Error Rate **0.00%**.
   - Báo cáo HTML: `html-reports/load/index.html`
2. **Auth-Heavy Stress Test (`23127147_Stress_20260807.jmx`)**:

   - Endpoint: `POST /api/login` (Xử lý kịch bản khóa tài khoản sau 3 lần thất bại)
   - Data File: `jmeter-data/auth.csv`
   - Kết quả: **43,874 requests**, Throughput **365.4 req/s**, Latency **30ms**. Ghi nhận Account Lockout kích hoạt làm Error Rate đạt ~99.8% như kỳ vọng.
   - Báo cáo HTML: `html-reports/stress/index.html`
3. **Transactional Spike Test (`23127147_Spike_20260807.jmx`)**:

   - Endpoint: `POST /api/cart`, `POST /api/checkout` (Xác thực JWT token tự động)
   - Data File: `jmeter-data/orders.csv`
   - Kết quả: **25,740 requests**, Peak Throughput **566.7 req/s**, Latency đỉnh **1,770ms**.
   - Báo cáo HTML: `html-reports/spike/index.html`

### 2.2 Ngưỡng Chịu Tải Endurance (Endurance / Soak Threshold)

- **Tải ổn định tối đa (Maximum Stable RPS)**: ~60 - 80 RPS đối với luồng đọc dữ liệu.
- **Giới hạn bộ nhớ (Memory Ceiling)**: Tiến trình Node.js backend duy trì mức RAM ~120 MB - 145 MB.
- **Tải CPU**: Dao động từ 40% - 65% trên CPU hệ thống thử nghiệm.

### 2.3 Sự Cố & Lỗi Hiệu Năng Ghi Nhận (Bugs & Bottlenecks)

- **ISSUE-01 (Database Locking under Concurrency)**: SQLite bị nghẽn (write lock) khi dồn tải giao dịch `POST /api/checkout` liên tục với tần suất cao (>400 req/s), dẫn đến HTTP 500 error và latency tăng vọt đến 1,770ms.
- **ISSUE-02 (Cascading Lockout in Authentication)**: Tính năng khóa tài khoản dựa trên IP/User gây nghẽn dây chuyền làm toàn bộ request đăng nhập hợp lệ bị vô hiệu hóa trong 3 phút khi bị Stress Test.

### 2.4 Links & Tài Liệu Nộp Bài

- **Public GitHub Repository**: [https://github.com/Geedie/HW02-Software-Testing-AI-driven-](https://github.com/Geedie/HW02-Software-Testing-AI-driven-)
- **Branch HW05**: [https://github.com/Geedie/HW02-Software-Testing-AI-driven-/tree/performance-testing-Xuan](https://github.com/Geedie/HW02-Software-Testing-AI-driven-/tree/performance-testing-Xuan)
- **Demo Video (YouTube Unlisted)**: [https://youtu.be/MOwQ-KHwVm0](https://youtu.be/MOwQ-KHwVm0)
- **Báo cáo chính**: `Main_Report.md`.
- **Git commit log**: `git_commit_log.txt`
