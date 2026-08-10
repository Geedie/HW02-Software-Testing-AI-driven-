# Bug Report — EShop SUT
**HW04 – Automation Testing**  
**MSSV:** 23127147  
**Ngày phát hiện:** 2026-08-10  
**Phương pháp phát hiện:** Phân tích source code + Chạy automation test (Playwright)

---

## BUG-01 — Tiêu đề trang Login hiển thị sai nhãn

| Trường | Nội dung |
|---|---|
| **ID** | BUG-01 |
| **Feature** | FR-02 — Đăng nhập |
| **Severity** | Medium |
| **Priority** | High |
| **Trạng thái** | Open |

### Mô tả
Trang đăng nhập (`/login`) hiển thị tiêu đề **"Đăng Ký"** thay vì **"Đăng Nhập"**, gây nhầm lẫn cho người dùng.

### Vị trí lỗi
`frontend-web/src/pages/Login.jsx`, dòng 24:
```jsx
// BUG: Hiển thị "Đăng Ký" thay vì "Đăng Nhập"
<h2 className="text-2xl font-bold mb-6 text-center">Đăng Ký</h2>
```

### Bước tái hiện
1. Mở trình duyệt, truy cập `http://localhost:5173/login`
2. Quan sát tiêu đề trang

### Kết quả thực tế
Tiêu đề hiển thị: **"Đăng Ký"**

### Kết quả mong đợi (FR-02)
Tiêu đề phải là: **"Đăng Nhập"**

### Test Case phát hiện
`TC: [BUG CHECK] Tiêu đề trang Login phải là "Đăng Nhập" không phải "Đăng Ký"`

---

## BUG-02 — Field Password dùng `type="text"` làm lộ mật khẩu

| Trường | Nội dung |
|---|---|
| **ID** | BUG-02 |
| **Feature** | FR-02 — Đăng nhập, FR-22 — Form Requirements |
| **Severity** | High |
| **Priority** | Critical |
| **Trạng thái** | Open |

### Mô tả
Trường nhập mật khẩu trên trang đăng nhập dùng `type="text"` thay vì `type="password"`, khiến mật khẩu hiển thị dưới dạng văn bản thường (plaintext) — vi phạm nghiêm trọng bảo mật và yêu cầu FR-22.

### Vị trí lỗi
`frontend-web/src/pages/Login.jsx`, dòng 39-44:
```jsx
// BUG: type="text" làm lộ mật khẩu
<input
  type="text"   // ← Should be type="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  ...
/>
```

### Bước tái hiện
1. Truy cập `http://localhost:5173/login`
2. Click vào field "Mật khẩu"
3. Gõ mật khẩu bất kỳ

### Kết quả thực tế
Mật khẩu hiển thị dưới dạng text thường, người bên cạnh có thể nhìn thấy.

### Kết quả mong đợi (FR-22)
Trường mật khẩu phải dùng `type="password"` — hiển thị dấu `●●●●`.

### Test Case phát hiện
`TC: [BUG CHECK] Field mật khẩu phải dùng type="password" (FR-22)`

---

## BUG-03 — Field Email dùng `type="text"` thay vì `type="email"`

| Trường | Nội dung |
|---|---|
| **ID** | BUG-03 |
| **Feature** | FR-02 — Đăng nhập, FR-22 — Form Requirements |
| **Severity** | Low |
| **Priority** | Medium |
| **Trạng thái** | Open |

### Mô tả
Trường nhập email dùng `type="text"` thay vì `type="email"` — bỏ lỡ HTML5 validation định dạng email tích hợp sẵn của trình duyệt.

### Vị trí lỗi
`frontend-web/src/pages/Login.jsx`, dòng 29-35:
```jsx
<input
  type="text"   // ← Should be type="email"
  value={email}
  ...
/>
```

### Kết quả mong đợi (FR-22)
Trường email phải dùng `type="email"` để kích hoạt HTML5 validation.

---

## BUG-04 — Nút submit hiển thị nhãn "Sign In" (tiếng Anh)

| Trường | Nội dung |
|---|---|
| **ID** | BUG-04 |
| **Feature** | FR-02, FR-21 — Nhất quán ngôn ngữ |
| **Severity** | Low |
| **Priority** | Medium |
| **Trạng thái** | Open |

### Mô tả
Nút submit trên trang đăng nhập hiển thị nhãn **"Sign In"** (tiếng Anh) thay vì **"Đăng Nhập"** — vi phạm yêu cầu nhất quán ngôn ngữ tiếng Việt (FR-21).

### Vị trí lỗi
`frontend-web/src/pages/Login.jsx`, dòng 58:
```jsx
<button type="submit" ...>
  Sign In   {/* ← Should be "Đăng Nhập" */}
</button>
```

---

## BUG-05 — Nút Logout nhãn "Thoát" thay vì "Đăng xuất"

| Trường | Nội dung |
|---|---|
| **ID** | BUG-05 |
| **Feature** | FR-23 — Navigation Requirements |
| **Severity** | Low |
| **Priority** | Medium |
| **Trạng thái** | Open |

### Mô tả
Nút đăng xuất trên thanh navigation hiển thị nhãn **"Thoát"** thay vì **"Đăng xuất"** — vi phạm FR-23.

### Vị trí lỗi
`frontend-web/src/App.jsx`, dòng 29:
```jsx
<button onClick={logout} className="bg-red-500 px-3 py-1 rounded">
  Thoát   {/* ← Should be "Đăng xuất" */}
</button>
```

### Test Case phát hiện
`TC: [BUG CHECK] Nút logout phải có nhãn "Đăng xuất" không phải "Thoát" (FR-23)`

---

## BUG-06 — Nhãn tổng tiền giỏ hàng hiển thị sai ("Tổng tạm tính")

| Trường | Nội dung |
|---|---|
| **ID** | BUG-06 |
| **Feature** | FR-07 — Giỏ hàng |
| **Severity** | Medium |
| **Priority** | High |
| **Trạng thái** | Open |

### Mô tả
Trang giỏ hàng hiển thị nhãn **"Tổng tạm tính"** thay vì **"Tổng cộng"** — vi phạm đặc tả FR-07.

### Vị trí lỗi
`frontend-web/src/pages/Cart.jsx`, dòng 63:
```jsx
// BUG: "Tổng tạm tính" thay vì "Tổng cộng"
Tổng tạm tính: <span ...>{cartTotal.toLocaleString()} ₫</span>
```

### Bước tái hiện
1. Thêm bất kỳ sản phẩm nào vào giỏ hàng
2. Truy cập `http://localhost:5173/cart`
3. Quan sát nhãn hiển thị bên cạnh tổng số tiền

### Kết quả thực tế
Nhãn: **"Tổng tạm tính"**

### Kết quả mong đợi (FR-07)
Nhãn: **"Tổng cộng"**

### Test Case phát hiện
`TC_CART_11 — [BUG CHECK] Nhãn tổng tiền phải là "Tổng cộng" theo FR-07`

---

## BUG-07 — Xóa sản phẩm khỏi giỏ hàng không có dialog xác nhận

| Trường | Nội dung |
|---|---|
| **ID** | BUG-07 |
| **Feature** | FR-07 — Giỏ hàng, FR-24 — Feedback & State |
| **Severity** | High |
| **Priority** | High |
| **Trạng thái** | Open |

### Mô tả
Khi click nút **"Xóa"** trên giỏ hàng, sản phẩm bị xóa ngay lập tức mà **không có dialog xác nhận**. Điều này vi phạm FR-07 và FR-24.

### Vị trí lỗi
`frontend-web/src/pages/Cart.jsx`, dòng 50-55:
```jsx
<button
  onClick={() => removeFromCart(index)}   // ← Xóa ngay, không confirm
  className="text-red-500 hover:text-red-700"
>
  Xóa
</button>
```

### Bước tái hiện
1. Thêm sản phẩm vào giỏ
2. Vào giỏ hàng (`/cart`)
3. Click nút **"Xóa"** trên bất kỳ sản phẩm nào

### Kết quả thực tế
Sản phẩm bị xóa **ngay lập tức**, không có dialog xác nhận.

### Kết quả mong đợi (FR-07, FR-24)
Hệ thống phải hiển thị dialog xác nhận trước khi thực hiện xóa.

### Test Case phát hiện
`TC_CART_12 — [BUG CHECK] Phải có dialog xác nhận trước khi xóa sản phẩm (FR-07)`

---

## BUG-08 — Dashboard Admin tính tổng doanh thu nhân đôi sai

| Trường | Nội dung |
|---|---|
| **ID** | BUG-08 |
| **Feature** | FR-13 — Dashboard |
| **Severity** | Critical |
| **Priority** | Critical |
| **Trạng thái** | Open |

### Mô tả
Dashboard Admin tính tổng doanh thu bằng công thức `total_amount * 2` thay vì chỉ dùng `total_amount` — làm số liệu bị gấp đôi so với thực tế.

### Vị trí lỗi
`frontend-admin/src/App.jsx`, dòng 217-220:
```jsx
const totalRevenue = orders.reduce((sum, o) => {
  if (o.status === 'delivered') return sum + o.total_amount * 2;  // ← BUG: * 2
  return sum;
}, 0);
```

### Kết quả mong đợi (FR-13)
```jsx
if (o.status === 'delivered') return sum + o.total_amount;  // Không nhân đôi
```

---

## BUG-09 — Edit sản phẩm cập nhật tên tất cả sản phẩm

| Trường | Nội dung |
|---|---|
| **ID** | BUG-09 |
| **Feature** | FR-15 — Quản lý Sản phẩm |
| **Severity** | Critical |
| **Priority** | Critical |
| **Trạng thái** | Open |

### Mô tả
Khi Admin cập nhật (edit) một sản phẩm, frontend thực hiện **fake mass update** — đổi tên **tất cả sản phẩm** trong local state thành tên mới, thay vì chỉ cập nhật sản phẩm được chọn.

### Vị trí lỗi
`frontend-admin/src/App.jsx`, dòng 110-113:
```jsx
// BUG: Đổi tên TẤT CẢ sản phẩm thay vì chỉ sản phẩm có id tương ứng
const fakeMassUpdatedProducts = products.map((p) => ({
  ...p,
  name: productForm.name,   // ← Tất cả sản phẩm bị đổi tên
}));
setProducts(fakeMassUpdatedProducts);
```

### Kết quả mong đợi (FR-15)
Chỉ sản phẩm có `id = productForm.id` bị cập nhật tên, các sản phẩm khác giữ nguyên.

---

## BUG-10 — XSS Vulnerability: dùng `dangerouslySetInnerHTML` với user input

| Trường | Nội dung |
|---|---|
| **ID** | BUG-10 |
| **Feature** | SEC-04 — Security |
| **Severity** | Critical |
| **Priority** | Critical |
| **Trạng thái** | Open |

### Mô tả
Navigation bar dùng `dangerouslySetInnerHTML` để render tên người dùng từ API mà không sanitize — tạo lỗ hổng XSS (Cross-Site Scripting).

### Vị trí lỗi
`frontend-web/src/App.jsx`, dòng 27:
```jsx
// BUG: dangerouslySetInnerHTML với user.name không được sanitize
<span dangerouslySetInnerHTML={{ __html: `Chào, ${user.name}` }} />
```

### Kịch bản tấn công
Nếu user đăng ký tài khoản với `name = "<img src=x onerror=alert('XSS')>"`, script độc hại sẽ được thực thi trong trình duyệt.

### Kết quả mong đợi (SEC-04)
```jsx
// An toàn: dùng React render bình thường (tự escape HTML)
<span>Chào, {user.name}</span>
```

---

## Tổng kết

| Bug ID | Feature | Severity | Trạng thái |
|---|---|---|---|
| BUG-01 | FR-02 Login | Medium | Open |
| BUG-02 | FR-02 / FR-22 | **Critical** | Open |
| BUG-03 | FR-22 | Low | Open |
| BUG-04 | FR-21 | Low | Open |
| BUG-05 | FR-23 | Low | Open |
| BUG-06 | FR-07 | Medium | Open |
| BUG-07 | FR-07 / FR-24 | High | Open |
| BUG-08 | FR-13 | **Critical** | Open |
| BUG-09 | FR-15 | **Critical** | Open |
| BUG-10 | SEC-04 | **Critical** | Open |

**Tổng:** 10 bugs | **Critical:** 4 | **High:** 2 | **Medium:** 2 | **Low:** 2
