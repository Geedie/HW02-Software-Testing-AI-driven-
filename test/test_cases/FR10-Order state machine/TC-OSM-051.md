# TC-OSM-051: :id = -1 on Cancel Endpoint

## Requirement ID
FR-OSM-02

## Module / Test type / Technique
Order Cancellation / Functional / Boundary Value Analysis

## Preconditions
- User A đã đăng nhập

## Test data

| Field | Value |
|---------|---------|
| Order ID | -1 |

## Test steps
1. Gửi request đến `/api/orders/-1/cancel`
2. Quan sát phản hồi

## Expected result
- Response: `{"error":"Order not found"}`
- Hoặc lỗi validation
- HTTP Status = 404 / 400

## Status / Related bugs
Not Run / None