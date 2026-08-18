# API3 — Admin Order Status (PUT /api/admin/orders/:id/status) — Test Cases
## Feature: FR-18 — Order Management (Admin)
## Student ID: 23127147

---

## AI Generation Process

### Prompt to AI:
> "Given the API PUT /api/admin/orders/:id/status which updates order status through a state machine (pending → confirmed → shipping → delivered, with cancel rules), generate comprehensive test cases covering: (1) all valid and invalid state transitions, (2) domain partitions on status parameter and order id, (3) security tests (role-based access control, IDOR), (4) schema validation. Target: 35+ test cases."

### AI Tool: Claude Sonnet 4.6
### Date: 2026-08-17

---

## Order State Machine

```
                ┌─────────────┐
                │   pending   │──────────────┐
                └──────┬──────┘              │
                       │ confirmed           │ canceled
                       ▼                     ▼
                ┌─────────────┐      ┌─────────────┐
                │  confirmed  │─────▶│  canceled   │
                └──────┬──────┘      └─────────────┘
                       │ shipping
                       ▼
                ┌─────────────┐
                │  shipping   │
                └──────┬──────┘
                       │ delivered
                       ▼
                ┌─────────────┐
                │  delivered  │
                └─────────────┘
```

**Note (BUG):** Code also allows `canceled → delivered` (invalid per business logic)

---

## Test Cases Table

| TC ID | Test Case Name | Category | Precondition | Input | Expected Output | Status Code | Audit Label | Auditor Note |
|-------|---------------|----------|--------------|-------|----------------|-------------|-------------|--------------|
| TC-API3-001 | pending → confirmed (valid) | State Transition | Order in `pending` state, admin token | `PUT /api/admin/orders/1/status {"status":"confirmed"}` | `{message: "Order status updated"}` | 200 | VALID | Correct |
| TC-API3-002 | confirmed → shipping (valid) | State Transition | Order in `confirmed` state, admin token | `{"status":"shipping"}` | `{message: "Order status updated"}` | 200 | VALID | Correct |
| TC-API3-003 | shipping → delivered (valid) | State Transition | Order in `shipping` state, admin token | `{"status":"delivered"}` | `{message: "Order status updated"}` | 200 | VALID | Correct |
| TC-API3-004 | pending → canceled (valid) | State Transition | Order in `pending` state, admin token | `{"status":"canceled"}` | `{message: "Order status updated"}` | 200 | VALID | Correct |
| TC-API3-005 | confirmed → canceled (valid) | State Transition | Order in `confirmed` state, admin token | `{"status":"canceled"}` | `{message: "Order status updated"}` | 200 | VALID | Correct |
| TC-API3-006 | pending → shipping (invalid) | State Transition | Order in `pending` state | `{"status":"shipping"}` | `{error: "Invalid state transition..."}` | 400 | VALID | Correct — code blocks this |
| TC-API3-007 | pending → delivered (invalid) | State Transition | Order in `pending` state | `{"status":"delivered"}` | `{error: "Invalid state transition..."}` | 400 | VALID | Correct |
| TC-API3-008 | confirmed → delivered (invalid) | State Transition | Order in `confirmed` state | `{"status":"delivered"}` | `{error: "Invalid state transition..."}` | 400 | VALID | Correct |
| TC-API3-009 | shipping → pending (invalid) | State Transition | Order in `shipping` state | `{"status":"pending"}` | `{error: "Invalid state transition..."}` | 400 | VALID | Correct |
| TC-API3-010 | shipping → confirmed (invalid) | State Transition | Order in `shipping` state | `{"status":"confirmed"}` | `{error: "Invalid state transition..."}` | 400 | VALID | Correct |
| TC-API3-011 | shipping → canceled (invalid per spec) | State Transition | Order in `shipping` state | `{"status":"canceled"}` | Should return 400 | 400 | VALID | Correct — shipping cannot be canceled |
| TC-API3-012 | delivered → any status (invalid) | State Transition | Order in `delivered` state | `{"status":"pending"}` | `{error: "Invalid state transition..."}` | 400 | VALID | Correct — delivered is terminal |
| TC-API3-013 | canceled → delivered (BUG!) | State Transition | Order in `canceled` state, admin token | `{"status":"delivered"}` | Should return 400 | 400 | INVALID | **BUG FOUND**: Code at line 550: `if (currentStatus === "canceled" && status === "delivered") isValidTransition = true;` — canceled order can be "delivered"! |
| TC-API3-014 | canceled → pending (invalid) | State Transition | Order in `canceled` state | `{"status":"pending"}` | `{error: "Invalid state transition..."}` | 400 | VALID | Correct |
| TC-API3-015 | canceled → confirmed (invalid) | State Transition | Order in `canceled` state | `{"status":"confirmed"}` | `{error: "Invalid state transition..."}` | 400 | VALID | Correct |
| TC-API3-016 | delivered → canceled (invalid) | State Transition | Order in `delivered` state | `{"status":"canceled"}` | `{error: "Invalid state transition..."}` | 400 | VALID | Correct |
| TC-API3-017 | Non-admin user tries to update | Security (SEC-07/RBAC) | Regular user token | User token + `{"status":"confirmed"}` | Should return 403 | 403 | INVALID | **BUG FOUND**: No role check in `PUT /api/admin/orders/:id/status` — any authenticated user can update order status! |
| TC-API3-018 | No authentication token | Security | - | No Authorization header | `{error: "Unauthorized"}` | 401 | VALID | Correct — authenticateToken middleware |
| TC-API3-019 | Invalid/expired token | Security | - | `Authorization: Bearer invalid_token` | `{error: "Forbidden"}` | 403 | VALID | Correct |
| TC-API3-020 | Non-existent order ID | Domain | - | `PUT /api/admin/orders/99999/status {"status":"confirmed"}` | `{error: "Order not found"}` | 404 | VALID | Correct |
| TC-API3-021 | String order ID | Domain | - | `PUT /api/admin/orders/abc/status {"status":"confirmed"}` | Error or 404 | 404 | VALID | SQLite returns nothing for non-numeric id |
| TC-API3-022 | Negative order ID | Domain | - | `PUT /api/admin/orders/-1/status {"status":"confirmed"}` | Error or 404 | 404 | VALID | No such order |
| TC-API3-023 | Zero order ID | Domain | - | `PUT /api/admin/orders/0/status {"status":"confirmed"}` | Error or 404 | 404 | VALID | No such order |
| TC-API3-024 | Float order ID | Domain | - | `PUT /api/admin/orders/1.5/status {"status":"confirmed"}` | 404 or error | 404 | VALID | Express treats 1.5 as string in route |
| TC-API3-025 | Invalid status value | Domain | - | `{"status":"unknown_status"}` | `{error: "Invalid state transition..."}` | 400 | VALID | No transition defined for unknown status |
| TC-API3-026 | Empty status | Domain | - | `{"status":""}` | Error — empty not allowed | 400 | INCOMPLETE | Empty string not validated before DB query |
| TC-API3-027 | Null status | Domain | - | `{"status":null}` | Error | 400 | INCOMPLETE | Null status not validated |
| TC-API3-028 | Missing status field | Domain | - | `{}` | Error | 400 | INCOMPLETE | Missing field returns invalid transition |
| TC-API3-029 | SQL injection in status | Security (SEC-01) | Admin token | `{"status":"' OR '1'='1"}` | 400 — invalid transition | 400 | VALID | Status is checked against allowed values before DB query |
| TC-API3-030 | Schema — success response | Schema Validation | Valid transition | Valid request | `{message: "Order status updated"}` | 200 | VALID | Correct |
| TC-API3-031 | Schema — error response | Schema Validation | Invalid transition | Invalid transition | `{error: "Invalid state transition..."}` | 400 | VALID | Correct |
| TC-API3-032 | Schema — 404 response | Schema Validation | Non-existent order | Order id=99999 | `{error: "Order not found"}` | 404 | VALID | Correct |
| TC-API3-033 | Status not changed to same value | Domain | Order in `confirmed` state | `{"status":"confirmed"}` | Error — no self-transition | 400 | VALID | isValidTransition stays false for same status |
| TC-API3-034 | Case sensitivity of status | Domain | Admin token | `{"status":"Confirmed"}` (uppercase C) | Error — status is case-sensitive | 400 | VALID | Only lowercase accepted |
| TC-API3-035 | IDOR — access another admin's order | Security (SEC-07) | Admin A updates order of Admin B's namespace | Cross-admin order update | Admin A should not update B's orders | 400/403 | INCOMPLETE | No per-admin scoping of orders — any admin can update any order |
| TC-API3-036 | Response time < 2000ms | Performance | - | Valid state transition | Response under 2s | 200 | VALID | Acceptable |
| TC-API3-037 | Admin can GET all orders | Schema Validation | Admin token | `GET /api/admin/orders` | Array of all orders with user_name | 200 | VALID | Correct — LEFT JOIN with users |
| TC-API3-038 | Non-admin GET admin orders | Security | Regular user token | `GET /api/admin/orders` | Should return 403 | 403 | INVALID | **BUG FOUND**: GET /api/admin/orders has no role check — any authenticated user can list all orders |

---

## Extended Test Cases (Human-added, AI Missed)

| TC ID | Test Case Name | Category | Why AI Missed | Input | Expected Output |
|-------|---------------|----------|--------------|-------|----------------|
| TC-API3-EXT-001 | canceled → delivered allowed (BUG) | Bug Verification | AI generated "canceled is terminal" but didn't find the specific code bug on line 550 | Cancel order → PUT status=delivered | BUG: Returns 200 "Order status updated" |
| TC-API3-EXT-002 | Regular user can update any order status | RBAC Bug | AI assumed admin routes have role checks; didn't verify source code | Regular user token + PUT admin/orders/1/status | BUG: Returns 200 — no role validation |
| TC-API3-EXT-003 | Non-admin can GET /api/admin/orders | RBAC Bug | AI tested admin endpoints with no-auth but not with regular-user token | Regular user token + GET /api/admin/orders | BUG: Returns all orders (no role check) |
| TC-API3-EXT-004 | Order status history not tracked | Design Gap | AI focused on current-state transitions; didn't think about audit trail | Multiple status updates on same order | No audit log of who changed status, when |
| TC-API3-EXT-005 | shipping → canceled not allowed but user cancel API allows it | Spec Inconsistency | AI analyzed APIs separately; didn't cross-check cancel behavior | User calls PUT /orders/:id/cancel when order is "shipping" | BUG: User cancel API allows canceling shipping orders (should only block delivered/canceled) |

---

## Bug Summary for API3

| Bug ID | Description | Severity | Location |
|--------|-------------|----------|----------|
| BUG-011 | canceled → delivered transition allowed (invalid state machine) | High | server.js:550-551 |
| BUG-012 | No role check on PUT /api/admin/orders/:id/status | Critical | server.js:525 |
| BUG-013 | No role check on GET /api/admin/orders | High | server.js:510 |
| BUG-014 | User cancel API allows canceling "shipping" orders | Medium | server.js:329 |
