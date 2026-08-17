# AI Critique — HW05 Performance Testing

**MSSV:** 23127147  
**Môn học:** Kiểm thử Phần mềm  
**Bài tập:** HW05 – Performance Testing  
**Ngày:** 2026-08-17  
**Public GitHub Repository:** [https://github.com/Geedie/HW02-Software-Testing-AI-driven-](https://github.com/Geedie/HW02-Software-Testing-AI-driven-)  
**Branch HW05:** [https://github.com/Geedie/HW02-Software-Testing-AI-driven-/tree/performance-testing-Xuan](https://github.com/Geedie/HW02-Software-Testing-AI-driven-/tree/performance-testing-Xuan)  

---

## Hợp tác với AI trong Performance Testing — Nhận xét và Bài học (200 – 300 words)

Trong quá trình thực hiện bài tập HW05 – Performance Testing, tôi đã sử dụng công cụ AI (Gemini / Antigravity) hỗ trợ tạo cú pháp kịch bản JMeter (`.jmx`), thiết kế dữ liệu đầu vào CSV và phân tích các tập tin log thô (`.jtl`). Nhìn chung, AI thể hiện khả năng vượt trội trong việc khởi tạo cú pháp XML/JMX, cấu hình các thành phần Listener và tự động hóa quy trình chạy CLI. Tuy nhiên, AI bộc lộ những hạn chế cố hữu nghiêm trọng khi phân tích dữ liệu thực nghiệm.

**Điểm AI làm sai hoặc bỏ sót:** 
Cụ thể, AI rơi vào bẫy "nhìn bề ngoài chỉ số" (Surface Metrics Bias). Khi phân tích log Stress Test với Error Rate 99.88%, AI vội vàng kết luận server Node.js bị đứt gãy (crash) hoặc tràn bộ nhớ RAM (OOM), trong khi thực tế server vẫn hoạt động bình thường và phản hồi HTTP 403 Forbidden mang tính nghiệp vụ bảo mật (Account Lockout). Ngoài ra, AI có xu hướng trung bình hóa dữ liệu (Average Bias), bỏ qua đỉnh trễ 1,770ms ở P95/P99 tại API Checkout. AI cũng đưa ra các đề xuất tối ưu "học thuộc lòng" mang tính ảo tưởng như hạ tầng Kubernetes autoscaling cho một ứng dụng SQLite đơn giản.

**Tại sao AI bỏ sót:** 
Các sai sót này xuất phát từ việc AI hoạt động theo cơ chế khớp mẫu (pattern matching) từ dữ liệu huấn luyện công khai, thiếu khả năng truy vết nguyên nhân gốc rễ (root cause analysis) từ nội dung response body. AI không thực sự thấu hiểu kiến trúc ứng dụng SUT mà chỉ nhìn vào các con số thống kê tổng hợp.

**Bài học quan trọng:** 
Bài học cốt lõi tôi rút ra khi hợp tác với AI là: *AI là công cụ tăng tốc độ thực thi, con người phải giữ vai trò kiểm duyệt thực nghiệm và chịu trách nhiệm về tính đúng đắn*. Không bao giờ được chấp nhận trực tiếp các nhận định của AI mà không đối soát với log thô (`.jtl`) và kiến trúc hệ thống thực tế.
