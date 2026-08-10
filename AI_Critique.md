# AI Critique — HW04 Automation Testing

**MSSV:** 23127147
**Môn học:** Kiểm thử Phần mềm
**Bài tập:** HW04 – Automation Testing
**Ngày:** 2026-08-10

---

## Hợp tác với AI trong Automation Testing — Nhận xét và Bài học

Trong quá trình thực hiện HW04, tôi sử dụng AI (Antigravity/Claude) để hỗ trợ tạo automation test scripts cho EShop SUT. Nhìn chung, AI thực hiện tốt ở cấp độ **cú pháp và cấu trúc** — tạo ra code TypeScript hợp lệ, tổ chức test data JSON rõ ràng, và sử dụng Playwright API đúng cách. Tuy nhiên, AI có một số điểm hạn chế đáng chú ý.

**Điểm AI làm sai hoặc bỏ sót:** AI không chủ động xem xét vấn đề **test isolation** — các test case cho Cart share state (giỏ hàng) mà không có cleanup giữa các test. Điều này xảy ra vì AI ưu tiên tạo nhanh test cases theo danh sách đã cho, thay vì suy nghĩ về lifecycle management. Ngoài ra, AI đề xuất dùng `page.getByLabel()` cho các field không có `label[for]` attribute — một lỗi do AI không kiểm tra thực tế HTML DOM mà chỉ suy đoán từ JSX source code. Điều này dẫn đến các selector fragile, có thể gây lỗi khi chạy trên các phiên bản trình duyệt khác nhau.

**Tại sao AI bỏ sót:** Các vấn đề này xảy ra vì AI hoạt động dựa trên **pattern matching từ training data** — nó biết cách viết Playwright tests "chuẩn" theo documentation, nhưng không thực sự chạy code để verify. AI không có khả năng "cảm nhận" sự không ổn định (flakiness) của test trong môi trường thực tế. Thêm vào đó, AI có xu hướng tối ưu hóa cho tốc độ viết code thay vì tính robust của test suite.

**Bài học quan trọng:** Khi hợp tác với AI trong automation testing, tôi học được rằng: *AI là công cụ tạo khung (scaffolding), không phải người review chất lượng*. Mọi selector, assertion và test flow cần được con người kiểm tra bằng cách đọc source code của SUT và chạy thực tế. Prompt chất lượng cao — cung cấp source code, business requirements, và các ràng buộc cụ thể — giúp AI cho kết quả tốt hơn đáng kể so với prompt chung chung. Tôi cũng nhận ra rằng việc **review từng AI output** trước khi chấp nhận là bước không thể bỏ qua để đảm bảo chất lượng bài tập.
