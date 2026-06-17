# TC-IMPORT-014: No Authorization header

## Requirement ID
FR-IMPORT-01

## Module / Test type / Technique
Import Products / Security / Authentication Testing

## Preconditions
- N/A

## Test data

| Field | Value |
|---------|---------|
| Authorization | Omitted |

## Test steps
1. Gửi request POST `/api/admin/import-products`
2. Không gửi Authorization header

## Expected result
- Unauthorized
- HTTP Status = 401

## Status / Related bugs
Not Run / None