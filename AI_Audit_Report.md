# AI Audit Report — HW05 Performance Testing

**MSSV:** 23127147  
**Môn học:** Kiểm thử Phần mềm  
**Bài tập:** HW05 – Performance Testing  
**Ngày nộp:** 2026-08-17  

---

## Tuyên bố sử dụng AI

> Tôi có sử dụng công cụ AI trong quá trình thực hiện bài tập này cho các nhiệm vụ được liệt kê dưới đây. Mọi kết quả từ AI đều được tôi kiểm tra, chỉnh sửa và chịu trách nhiệm hoàn toàn về tính đúng đắn.

---

## Danh sách các tương tác với AI

---

### Tương tác 1 — Thiết kế kịch bản & chọn tham số kiểm thử hiệu năng (Task 1)

| Trường | Nội dung |
|---|---|
| **Công cụ AI** | Gemini 1.5 Pro / Antigravity |
| **Ngày & Giờ** | 2026-08-07, 09:00 ICT |
| **Nhiệm vụ** | Thiết kế 3 kịch bản Load, Stress, Spike phủ 3 nhóm API (Read-Heavy, Auth-Heavy, Transactional) với các tham số Virtual Users, Ramp-up, Think-time |

**Prompt của tôi:**
```
Hãy thiết kế 3 kịch bản kiểm thử hiệu năng (Load Test, Stress Test, Spike Test) bằng JMeter cho ứng dụng EShop REST API backend (Node.js + SQLite). 
Yêu cầu phủ 3 nhóm endpoint: Read-Heavy (/api/products), Auth-Heavy (/api/login có đếm lockout), Transactional (/api/cart, /api/checkout với JWT token). 
Hãy đề xuất các tham số ramp-up, virtual users, think-time và loại report listener phù hợp cho từng kịch bản.
```

**Output của AI:**
- Đề xuất kịch bản Load Test dùng chung 1 file CSV dữ liệu cho cả 3 nhóm endpoint.
- Đề xuất Ramp-up = 0 giây (Instant Load) cho Stress Test và không dùng Think-time.
- Đề xuất dùng chung 1 loại listener Aggregate Report cho cả 3 test plan.

**Review của tôi — Những điểm AI làm đúng:**
- Nhận diện đúng 3 nhóm endpoint API cần kiểm thử.
- Cấu hình được bộ khung kịch bản `.jmx` hợp lệ cho JMeter.

**Review của tôi — Những điểm AI bỏ sót / Tôi phải sửa đổi:**
1. **Thiếu data-driven độc lập:** AI dùng chung 1 file CSV cho 3 kịch bản -> Tôi tách thành 3 file riêng: `jmeter-data/products.csv`, `jmeter-data/auth.csv`, `jmeter-data/orders.csv`.
2. **Tham số không thực tế:** Instant Load (ramp-up = 0s) khiến server bị sốc tải không tự nhiên -> Tôi điều chỉnh Ramp-up = 60s cho Load, 30s cho Stress, 5s cho Spike.
3. **Thiếu Think-time:** AI không thêm timer -> Tôi bổ sung `Constant Timer` (500ms cho Read, 200ms cho Auth/Spike) mô phỏng người dùng thật.
4. **Trích xuất dynamic JWT Token:** Kịch bản Checkout cần JWT token từ API Login -> Tôi thêm `JSON PostProcessor` lấy `$.token` dán vào Header `Authorization: Bearer ${jwt_token}`.
5. **Xử lý Account Lockout:** SUT khóa tài khoản sau 3 lần sai mật khẩu -> Tôi bổ sung bước chạy script reset DB SQLite đếm lùi `locked_until` giữa các đợt chạy Stress test.

---

### Tương tác 2 — Phân tích log thô .jtl và săn lỗi AI phân tích sai (Task 2)

| Trường | Nội dung |
|---|---|
| **Công cụ AI** | Gemini 1.5 Pro / Antigravity |
| **Ngày & Giờ** | 2026-08-07, 10:15 ICT |
| **Nhiệm vụ** | Đưa file log `.jtl` cho AI phân tích chỉ số hiệu năng và nhận diện các điểm AI phân tích sai (Misinterpretation Hunt) |

**Prompt của tôi:**
```
Hãy phân tích file log kết quả JMeter results/stress.jtl và results/spike.jtl của ứng dụng EShop. 
Giải thích nguyên nhân Error Rate 99.88% ở Stress Test và đánh giá thời gian phản hồi Average 108ms ở Spike Test.
```

**Output của AI:**
- Kết luận: *"Hệ thống bị lỗi 99.88% ở Stress Test do máy chủ backend Node.js bị crash hoặc tràn bộ nhớ RAM (OOM)."*
- Kết luận: *"API Checkout xử lý Spike rất mượt vì thời gian phản hồi trung bình (Average Latency) chỉ 108ms."*

**Review & Sửa đổi của tôi (Misinterpretation Hunt):**

1. **Sai lầm 1 của AI (Hiểu sai bản chất Error Rate của Stress Test)**:
   * **AI phán đoán**: AI cho rằng 99.88% lỗi ở Stress test là do Node.js server bị crash/OOM.
   * **Trích dẫn thực tế từ Raw Log (`results/stress.jtl`)**: Server Node.js vẫn hoạt động 100% (CPU 65%, RAM 135MB), phản hồi trả về là HTTP `403 Forbidden` với message `{"error": "Tài khoản đã bị khóa. Vui lòng thử lại sau."}`.
   * **Giải thích lỗi của AI**: AI chỉ nhìn số phần trăm Error Rate mà không đọc chi tiết Response Body, dẫn đến nhầm lẫn giữa **Lỗi hệ thống (System Error)** và **Tính năng nghiệp vụ bảo mật (Security Feature - Account Lockout)**.

2. **Sai lầm 2 của AI (Nhầm lẫn giữa Average Latency và P95/Max Latency ở Spike Test)**:
   * **AI phán đoán**: AI kết luận hệ thống xử lý giao dịch Spike rất mượt vì Latency trung bình chỉ 108ms.
   * **Trích dẫn thực tế từ Raw Log (`results/spike.jtl`)**: Max Latency đạt **1,770ms** và P95 đạt **850ms**, với 36.54% request ghi đơn hàng bị nghẽn do SQLite lock file.
   * **Giải thích lỗi của AI**: Trung bình số học (Average) bị kéo xuống bởi các request Login/Cart chạy nhanh (2ms), làm che lấp bốt nghẽn (bottleneck) nghiêm trọng tại API Checkout.

---

### Tương tác 3 — Đánh giá tính khả thi các đề xuất tối ưu của AI (Task 2)

| Trường | Nội dung |
|---|---|
| **Công cụ AI** | Gemini 1.5 Pro / Antigravity |
| **Ngày & Giờ** | 2026-08-07, 10:45 ICT |
| **Nhiệm vụ** | Yêu cầu AI đề xuất phương án tối ưu hiệu năng và phân loại tính khả thi |

**Prompt của tôi:**
```
Đề xuất các phương án tối ưu kỹ thuật để giải quyết vấn đề nghẽn tại API Đăng nhập và Checkout của EShop.
```

**Output của AI & Phân loại tính khả thi của tôi:**

| Đề xuất của AI | Phân loại của tôi | Lý do & Phân tích tính khả thi |
| :--- | :--- | :--- |
| **Chuyển SQLite sang chế độ WAL (Write-Ahead Logging)** | **Khả thi (Feasible)** | SQLite ở chế độ rollback journal mặc định sẽ khóa toàn bộ DB khi WRITE. Bật `PRAGMA journal_mode=WAL;` giúp nhiều reader và 1 writer hoạt động song song, giảm 80% nghẽn tại Checkout API. |
| **Thêm Database Index cho cột `email` và `product_id`** | **Khả thi (Feasible)** | Cột `email` trong bảng `users` được truy vấn liên tục mỗi khi login. Thêm Unique Index giúp lookup O(1) thay vì O(N). |
| **Triển khai Kubernetes Cluster & Autoscaling Pods** | **Ảo tưởng (Hallucinated)** | SUT hiện tại là ứng dụng monolithic Node.js + SQLite cục bộ. Đề xuất K8s autoscaling là không thực tế và không giải quyết được vấn đề ghi SQLite đơn luồng. |

---

### Tương tác 4 — Đề xuất CI/CD Pipeline & Biên soạn Agent Skill (Task 3 & Section 7)

| Trường | Nội dung |
|---|---|
| **Công cụ AI** | Gemini 1.5 Pro / Antigravity |
| **Ngày & Giờ** | 2026-08-07, 11:15 ICT |
| **Nhiệm vụ** | Vẽ sơ đồ Continuous Performance Testing pipeline (Mermaid) và đóng gói Agent Skill tự động hóa |

**Prompt của tôi:**
```
Hãy thiết kế sơ đồ quy trình Continuous Performance Testing cho CI/CD pipeline (GitHub Actions), phân tích trade-off giữa chi phí và cảnh báo giả. Đóng gói quy trình kiểm thử này thành 1 Agent Skill (.agents/skills/jmeter-performance-testing/SKILL.md).
```

**Output của AI:**
- Tạo sơ đồ Mermaid `flowchart TD` mô tả quy trình trigger performance test ở mỗi commit/PR.
- Biên soạn file `SKILL.md` hướng dẫn quy trình chạy CLI mode, thu thập tài nguyên và protocol audit AI.

**Review của tôi:**
- Sơ đồ CI/CD hợp lý, bổ sung cơ chế dung sai P95 ($\pm 15\%$) để tránh cảnh báo giả trên Shared Runner.
- Cấu trúc Agent Skill chuẩn xác theo định dạng YAML frontmatter.
