# TC-OSM-052: :id = "abc" on Cancel Endpoint

## Requirement ID
FR-OSM-02

## Module / Test type / Technique
Order Cancellation / Functional / Equivalence Partitioning

## Preconditions
- User A đã đăng nhập

## Test data

| Field | Value |
|---------|---------|
| Order ID | abc |

## Test steps
1. Gửi request đến `/api/orders/abc/cancel`
2. Quan sát phản hồi

## Expected result
- ID không hợp lệ
- HTTP Status = 400 / 404

## Status / Related bugs
Not Run / None