# API2 — Shopping Cart (POST /api/cart + GET /api/cart) — Test Cases
## Feature: FR-07 — Shopping Cart
## Student ID: 23127147

---

## AI Generation Process

### Prompt to AI:
> "Given the following API endpoints for Shopping Cart: GET /api/cart and POST /api/cart, generate comprehensive test cases covering: (1) domain partitions on every parameter (product id, name, price, quantity), (2) authentication and authorization, (3) security tests (IDOR, XSS, injection), (4) schema validation of request and response. Target: 35+ test cases."

### AI Tool: Claude Sonnet 4.6
### Date: 2026-08-17

---

## Test Cases Table

| TC ID | Test Case Name | Category | Precondition | Input | Expected Output | Status Code | Audit Label | Auditor Note |
|-------|---------------|----------|--------------|-------|----------------|-------------|-------------|--------------|
| TC-API2-001 | GET cart — authenticated, empty | Happy Path | User logged in, cart empty | `GET /api/cart` with valid token | `[]` (empty array) | 200 | VALID | Correct |
| TC-API2-002 | GET cart — no authentication | Security | - | `GET /api/cart` without token | `{error: "Unauthorized"}` | 401 | VALID | Correct |
| TC-API2-003 | GET cart — invalid token | Security | - | `GET /api/cart` with `Authorization: Bearer invalid` | `{error: "Forbidden"}` | 403 | VALID | Correct |
| TC-API2-004 | GET cart — malformed token | Security | - | `GET /api/cart` with `Authorization: Bearer abc.def` | `{error: "Forbidden"}` | 403 | VALID | Correct |
| TC-API2-005 | POST cart — add valid item | Happy Path | User logged in | `{"id":1,"name":"iPhone 15","price":30000000,"quantity":1}` | `{message: "Added to cart"}` | 200 | VALID | Correct |
| TC-API2-006 | GET cart — after adding item | Happy Path | Item added in TC-API2-005 | `GET /api/cart` | Array with 1 item | 200 | VALID | Correct |
| TC-API2-007 | POST cart — no authentication | Security | - | Add item without token | `{error: "Unauthorized"}` | 401 | VALID | Correct |
| TC-API2-008 | POST cart — invalid token | Security | - | Add item with invalid token | `{error: "Forbidden"}` | 403 | VALID | Correct |
| TC-API2-009 | POST cart — negative quantity | Domain | User logged in | `{"id":1,"name":"iPhone","price":30000000,"quantity":-1}` | Error — invalid quantity | 400 | INVALID | **BUG FOUND**: Server accepts negative quantity without validation. Returns 200. |
| TC-API2-010 | POST cart — zero quantity | Domain | User logged in | `{"id":1,"name":"iPhone","price":30000000,"quantity":0}` | Error — invalid quantity | 400 | INVALID | **BUG FOUND**: Server accepts zero quantity. Returns 200. |
| TC-API2-011 | POST cart — very large quantity | Domain | User logged in | `{"id":1,"name":"iPhone","price":30000000,"quantity":999999}` | Accepted or stock check error | 200 | INCOMPLETE | No stock validation — system allows unrealistic quantities |
| TC-API2-012 | POST cart — negative price | Domain | User logged in | `{"id":1,"name":"iPhone","price":-100,"quantity":1}` | Error — invalid price | 400 | INVALID | **BUG FOUND**: Negative price accepted — could lead to payment bypass |
| TC-API2-013 | POST cart — zero price | Domain | User logged in | `{"id":1,"name":"iPhone","price":0,"quantity":1}` | Error — invalid price | 400 | INCOMPLETE | Zero price accepted — items can be added free of charge |
| TC-API2-014 | POST cart — string price | Domain | User logged in | `{"id":1,"name":"iPhone","price":"abc","quantity":1}` | Error — invalid type | 400 | INCOMPLETE | String price accepted, stored as-is in memory |
| TC-API2-015 | POST cart — missing id | Domain | User logged in | `{"name":"iPhone","price":30000000,"quantity":1}` | Error — id required | 400 | INCOMPLETE | Missing id accepted — no field validation |
| TC-API2-016 | POST cart — missing name | Domain | User logged in | `{"id":1,"price":30000000,"quantity":1}` | Error — name required | 400 | INCOMPLETE | Missing name accepted |
| TC-API2-017 | POST cart — missing price | Domain | User logged in | `{"id":1,"name":"iPhone","quantity":1}` | Error — price required | 400 | INCOMPLETE | Missing price accepted |
| TC-API2-018 | POST cart — missing quantity | Domain | User logged in | `{"id":1,"name":"iPhone","price":30000000}` | Error — quantity required | 400 | INCOMPLETE | Missing quantity accepted |
| TC-API2-019 | POST cart — empty body | Domain | User logged in | `{}` | Error | 400 | INCOMPLETE | Empty body accepted — pushes empty object to cart |
| TC-API2-020 | POST cart — null values | Domain | User logged in | `{"id":null,"name":null,"price":null,"quantity":null}` | Error — null not allowed | 400 | INCOMPLETE | Null values accepted |
| TC-API2-021 | POST cart — XSS in name | Security (SEC-02) | User logged in | `{"id":1,"name":"<script>alert('XSS')</script>","price":100,"quantity":1}` | XSS should be sanitized | 200/400 | INCOMPLETE | XSS stored in memory — dangerous if rendered in frontend without sanitization |
| TC-API2-022 | POST cart — SQL injection in name | Security (SEC-01) | User logged in | `{"id":1,"name":"'; DROP TABLE users;--","price":100,"quantity":1}` | Handled gracefully | 200 | VALID | Cart stored in memory (not DB), no SQL risk here |
| TC-API2-023 | POST cart — add same item twice | Domain | User logged in | Add same product id twice | Two entries in cart | 200 | INCOMPLETE | No deduplication — same product added as separate entries |
| TC-API2-024 | Schema — GET cart returns array | Schema Validation | Items in cart | GET /api/cart | Response is JSON array | 200 | VALID | Correct |
| TC-API2-025 | Schema — cart item has id | Schema Validation | Item added | GET /api/cart | Item has `id` field | 200 | VALID | Correct |
| TC-API2-026 | Schema — cart item has name | Schema Validation | Item added | GET /api/cart | Item has `name` field | 200 | VALID | Correct |
| TC-API2-027 | Schema — cart item has price | Schema Validation | Item added | GET /api/cart | Item has `price` field | 200 | VALID | Correct |
| TC-API2-028 | Schema — cart item has quantity | Schema Validation | Item added | GET /api/cart | Item has `quantity` field | 200 | VALID | Correct |
| TC-API2-029 | IDOR — access another user's cart | Security (SEC-07) | Two users logged in (A and B) | User A adds item; use User A's token to GET /api/cart | Should ONLY return User A's cart | 200 | VALID | Cart is stored in memory per userId — correct isolation |
| TC-API2-030 | Cart isolation between users | Security | User A and B both logged in | A adds iPhone, B adds Samsung; GET both carts | Each user sees only their own items | 200 | VALID | Correct |
| TC-API2-031 | POST cart — float quantity | Domain | User logged in | `{"id":1,"name":"iPhone","price":30000000,"quantity":1.5}` | Error — must be integer | 400 | INCOMPLETE | Float quantity accepted |
| TC-API2-032 | Cart not persisted across server restart | State | Add item, restart server | GET /api/cart | Cart is empty (in-memory only) | 200 | VALID | **Design note**: Cart in memory (userCarts={}) — not persistent. Expected by design but risky. |
| TC-API2-033 | POST cart — extremely long name | Domain | User logged in | name = "A".repeat(10000) | Accepted or truncated | 200 | INCOMPLETE | No max length validation |
| TC-API2-034 | POST cart — product id not in DB | Domain | User logged in | `{"id":9999,"name":"Ghost","price":100,"quantity":1}` | Accepted (no product validation) | 200 | INCOMPLETE | Cart accepts any id without validating against products table |
| TC-API2-035 | Response time GET /api/cart < 2000ms | Performance | - | GET /api/cart | Response under 2s | 200 | VALID | Acceptable |
| TC-API2-036 | Response time POST /api/cart < 2000ms | Performance | - | POST /api/cart | Response under 2s | 200 | VALID | Acceptable |
| TC-API2-037 | POST cart — boolean quantity | Domain | User logged in | `{"id":1,"name":"iPhone","price":100,"quantity":true}` | Error | 400 | INCOMPLETE | Boolean accepted as quantity (JS coerces true=1) |
| TC-API2-038 | Expired token access | Security | Token from previous session | GET /api/cart with old token | Should return 403 (but token never expires) | 403 | INVALID | **BUG**: JWT has no expiry, so old tokens remain valid indefinitely |

---

## Extended Test Cases (Human-added, AI Missed)

| TC ID | Test Case Name | Category | Why AI Missed | Input | Expected Output |
|-------|---------------|----------|--------------|-------|----------------|
| TC-API2-EXT-001 | Cart stores arbitrary body — no schema | Bug Verification | AI tested missing fields but didn't test that ANY JSON object is accepted | `{"attack":"payload","malicious":true}` | BUG: Any JSON accepted and pushed to cart |
| TC-API2-EXT-002 | Cart resets on server restart | Design Risk | AI didn't analyze in-memory storage design | Restart server → GET /api/cart | Cart empty — data loss risk, AI missed this architectural concern |
| TC-API2-EXT-003 | Negative price bypass for checkout | Security Chain | AI tested price alone; didn't chain cart→checkout attack | Add item with price=-100, then checkout | total_amount could be negative — payment bypass |
| TC-API2-EXT-004 | Price from client not verified against DB | Trust Boundary | AI missed that price is client-controlled, not DB-driven | POST cart with price=1 for 30M product, then checkout | Server trusts client price — no server-side price validation |
| TC-API2-EXT-005 | Cart user isolation after token manipulation | Security | AI tested IDOR at API level; didn't check token tampering | Forge JWT with different user_id | Server verifies JWT signature — manipulation blocked (correct) |

---

## Bug Summary for API2

| Bug ID | Description | Severity | Location |
|--------|-------------|----------|----------|
| BUG-006 | No input validation (negative qty, price, missing fields) | Medium | server.js:290-295 |
| BUG-007 | Client-controlled price — no server-side verification | High | server.js:290-295 |
| BUG-008 | XSS stored in cart (no sanitization) | Medium | server.js:293 |
| BUG-009 | Cart not persistent (in-memory only) | Medium | server.js:14 |
| BUG-010 | Cart accepts product IDs not in database | Low | server.js:290-295 |
