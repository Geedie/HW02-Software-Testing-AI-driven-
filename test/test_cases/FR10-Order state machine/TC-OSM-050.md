# TC-OSM-050: :id = 0 on Cancel Endpoint

## Requirement ID
FR-OSM-02

## Module / Test type / Technique
Order Cancellation / Functional / Boundary Value Analysis

## Preconditions
- User A đã đăng nhập

## Test data

| Field | Value |
|---------|---------|
| Order ID | 0 |

## Test steps
1. Gửi request đến `/api/orders/0/cancel`
2. Quan sát phản hồi

## Expected result
- Response: `{"error":"Order not found"}`
- HTTP Status = 404

## Status / Related bugs
Not Run / None