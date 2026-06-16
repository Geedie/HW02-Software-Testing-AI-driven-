# TC-CHECKOUT-026: shipping_address = Vietnamese Unicode

## Requirement ID
FR-CHECKOUT-01

## Module / Test type / Technique
Checkout / Functional / Localization Testing

## Preconditions
- Có JWT hợp lệ

## Test data

| Field | Value |
|---------|---------|
| total_amount | 100 |
| shipping_address | 45 Đường Lê Lợi, Quận 1, TP.HCM |

## Test steps
1. Gửi request POST `/api/checkout`
2. Nhập địa chỉ chứa ký tự Unicode tiếng Việt

## Expected result
- Checkout thành công
- Dữ liệu UTF-8 được lưu chính xác
- HTTP Status = 200

## Status / Related bugs
Not Run / None