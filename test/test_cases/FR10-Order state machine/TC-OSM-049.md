# TC-OSM-049: No Authorization Header on Cancel Endpoint

## Requirement ID
FR-OSM-02

## Module / Test type / Technique
Order Cancellation / Security / Authentication Testing

## Preconditions
- Đơn hàng tồn tại

## Test data

| Field | Value |
|---------|---------|
| Authorization | Missing |

## Test steps
1. Gửi request hủy đơn hàng
2. Không gửi Authorization header

## Expected result
- Unauthorized
- HTTP Status = 401

## Status / Related bugs
Not Run / None