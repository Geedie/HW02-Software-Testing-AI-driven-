# AI Critique — HW06 API Testing
## Student ID: 23127147
## Word Count: ~280 words

---

Trong quá trình thực hiện HW06, tôi đã cộng tác chặt chẽ với AI (Claude Sonnet 4.6) để sinh test case và thiết kế pipeline kiểm thử API. Tuy nhiên, AI đã bộc lộ một số điểm yếu đáng chú ý khi làm việc với các bài toán kiểm thử phần mềm thực tế.

**Điểm AI mắc lỗi hoặc bỏ sót:** Đáng kể nhất là AI không phát hiện được các bug ẩn trong source code mà chỉ phân tích từ API specification. Cụ thể, AI giả định rằng tất cả các route có prefix `/api/admin/` đều có kiểm tra quyền admin — nhưng thực tế server.js không có bất kỳ middleware kiểm tra `role === 'admin'` nào (BUG-012, BUG-013). AI cũng tạo test case "account lockout sau 3 lần sai" đúng theo spec, nhưng bỏ qua bug logic `newAttempts = user.login_attempts + 2` (cộng 2 thay vì 1), dẫn đến account bị lock sau chỉ 2 lần sai. Ngoài ra, AI không nhận ra rằng cart lưu trữ trong bộ nhớ (`const userCarts = {}`), tức là dữ liệu mất khi server restart — một rủi ro thiết kế quan trọng.

**Tại sao AI thất bại:** AI hoạt động dựa trên API specification (black-box), không có khả năng đọc hiểu và phân tích logic source code trừ khi được cung cấp trực tiếp. Khi prompt chỉ hỏi "sinh test case từ spec", AI thiếu ngữ cảnh về implementation details. Hơn nữa, AI có xu hướng giả định các best practices (role checks, input validation) đã được implement, trong khi code thực tế có thể không làm vậy.

**Bài học thu được:** Để cộng tác hiệu quả với AI trong kiểm thử phần mềm, người kiểm thử phải cung cấp cả source code lẫn specification, không chỉ spec. Việc guide AI từng bước (step-by-step) và thực hiện human review kỹ lưỡng sau mỗi output là bắt buộc. AI là công cụ tăng tốc, không thể thay thế tư duy phân tích của con người — đặc biệt trong các tình huống đòi hỏi đọc code và suy luận về security.
