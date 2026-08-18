# API1 — Login (POST /api/login) — Test Cases
## Feature: FR-02 — Login & Account Lockout
## Student ID: 23127147

---

## AI Generation Process

### Prompt to AI:
> "Given the following API spec for POST /api/login and the following security requirements SEC-01 to SEC-07, generate comprehensive test cases covering: (1) domain partitions on every parameter, (2) state transitions for account lockout, (3) security tests including SQL injection, XSS, and IDOR, (4) schema validation. Target: 35+ test cases."

### AI Tool: Claude Sonnet 4.6
### Date: 2026-08-17

---

## Test Cases Table

| TC ID | Test Case Name | Category | Precondition | Input | Expected Output | Status Code | Audit Label | Auditor Note |
|-------|---------------|----------|--------------|-------|----------------|-------------|-------------|--------------|
| TC-API1-001 | Valid login - regular user | Happy Path | User exists: test@eshop.com / Test1234! | `{"email":"test@eshop.com","password":"Test1234!"}` | `{message, token, user}` with role=user | 200 | VALID | Correct |
| TC-API1-002 | Valid login - admin user | Happy Path | Admin exists: admin@eshop.com / Admin123! | `{"email":"admin@eshop.com","password":"Admin123!"}` | `{message, token, user}` with role=admin | 200 | VALID | Correct |
| TC-API1-003 | Wrong password | Domain | User exists | `{"email":"test@eshop.com","password":"WrongPass"}` | `{error: "Invalid email or password"}` | 401 | VALID | Correct |
| TC-API1-004 | Non-existent email | Domain | No user with this email | `{"email":"notexist@eshop.com","password":"Test1234!"}` | `{error: "Invalid email or password"}` | 401 | VALID | Correct |
| TC-API1-005 | Empty email | Domain | - | `{"email":"","password":"Test1234!"}` | Error or 401 | 401 | VALID | API returns 401 for empty email |
| TC-API1-006 | Empty password | Domain | - | `{"email":"test@eshop.com","password":""}` | Error or 401 | 401 | VALID | Correct |
| TC-API1-007 | Missing email field | Domain | - | `{"password":"Test1234!"}` | Error response | 401 | VALID | No validation but returns 401 |
| TC-API1-008 | Missing password field | Domain | - | `{"email":"test@eshop.com"}` | Error response | 401 | VALID | Returns 401 |
| TC-API1-009 | Empty request body | Domain | - | `{}` | Error response | 401 | VALID | Correct |
| TC-API1-010 | Null email | Domain | - | `{"email":null,"password":"Test1234!"}` | Error response | 401 | VALID | Correct |
| TC-API1-011 | Null password | Domain | - | `{"email":"test@eshop.com","password":null}` | Error response | 401 | VALID | Correct |
| TC-API1-012 | Invalid email format - no @ | Domain | - | `{"email":"invalidemail","password":"Test1234!"}` | Error — invalid format | 400/401 | INCOMPLETE | API does not validate email format — returns 401 instead of 400. Should add format validation. |
| TC-API1-013 | Invalid email format - no domain | Domain | - | `{"email":"user@","password":"Test1234!"}` | Error — invalid format | 400/401 | INCOMPLETE | Same issue — no format validation |
| TC-API1-014 | Very long email (500 chars) | Domain | - | `{"email":"a".repeat(500)+"@x.com","password":"Test1234!"}` | Error or 401 | 401 | VALID | Handled gracefully |
| TC-API1-015 | Very long password (500 chars) | Domain | - | `{"email":"test@eshop.com","password":"A".repeat(500)}` | Error or 401 | 401 | VALID | Handled gracefully |
| TC-API1-016 | SQL Injection in email | Security (SEC-01) | - | `{"email":"' OR '1'='1","password":"Test1234!"}` | Error — injection blocked | 401 | VALID | SQLite parameterized queries protect login, but GET /api/products?search= is vulnerable |
| TC-API1-017 | SQL Injection in password | Security (SEC-01) | - | `{"email":"test@eshop.com","password":"' OR '1'='1"}` | Error — injection blocked | 401 | VALID | Correct |
| TC-API1-018 | XSS in email | Security (SEC-02) | - | `{"email":"<script>alert(1)</script>@x.com","password":"Test1234!"}` | Error — sanitized | 401 | VALID | API is stateless here, no XSS risk in response |
| TC-API1-019 | Account lockout — 1st wrong attempt | State Transition | login_attempts=0 | `{"email":"test@eshop.com","password":"wrong"}` | 401 error, attempts incremented | 401 | VALID | BUG: increments by 2 instead of 1 |
| TC-API1-020 | Account lockout — 2nd wrong attempt | State Transition | login_attempts=2 (bug: incremented by 2) | `{"email":"test@eshop.com","password":"wrong"}` | 401 error, account now locked | 401 | INVALID | **BUG FOUND**: `newAttempts = login_attempts + 2` — lock happens after 2nd wrong attempt (attempts=4≥3), should be after 3rd |
| TC-API1-021 | Attempt login on locked account | State Transition | Account locked (locked_until > now) | `{"email":"test@eshop.com","password":"Test1234!"}` | `{error: "Tài khoản đã bị khóa..."}` | 403 | VALID | Correct |
| TC-API1-022 | Login success resets attempts | State Transition | login_attempts > 0 | `{"email":"test@eshop.com","password":"Test1234!"}` | Login success, attempts reset to 0 | 200 | VALID | Correct per code |
| TC-API1-023 | Login after lock expires | State Transition | locked_until < now | Valid credentials | Login success | 200 | VALID | Correct |
| TC-API1-024 | Schema — response has token | Schema Validation | - | Valid credentials | Response body contains `token` field (string) | 200 | VALID | Correct |
| TC-API1-025 | Schema — response has user object | Schema Validation | - | Valid credentials | Response body contains `user` object | 200 | VALID | Correct |
| TC-API1-026 | Schema — user.id is number | Schema Validation | - | Valid credentials | `user.id` is integer | 200 | VALID | Correct |
| TC-API1-027 | Schema — user.role exists | Schema Validation | - | Valid credentials | `user.role` is either "user" or "admin" | 200 | VALID | Correct |
| TC-API1-028 | Schema — token is valid JWT | Schema Validation | - | Valid credentials | `token` matches JWT format (3 base64 segments) | 200 | VALID | Correct |
| TC-API1-029 | Token contains correct user id | Schema Validation | - | Valid credentials | Decoded JWT payload contains correct `id` | 200 | VALID | Correct |
| TC-API1-030 | Case sensitivity — email uppercase | Domain | - | `{"email":"TEST@ESHOP.COM","password":"Test1234!"}` | 401 — email is case sensitive in DB | 401 | INCOMPLETE | API does not normalize email case — potential usability issue |
| TC-API1-031 | Email with leading/trailing spaces | Domain | - | `{"email":" test@eshop.com ","password":"Test1234!"}` | Should trim spaces or return 401 | 401 | INCOMPLETE | No trimming — could cause confusion for users |
| TC-API1-032 | Password with special characters | Domain | - | `{"email":"admin@eshop.com","password":"Admin123!"}` | 200 OK | 200 | VALID | Correct |
| TC-API1-033 | Content-Type is application/json | Schema Validation | - | Valid credentials with correct header | 200 OK | 200 | VALID | Correct |
| TC-API1-034 | Response includes X-Content-Type-Options | Security (SEC-04) | - | Any request | Response header present | 200 | INCOMPLETE | Missing security headers — no X-Content-Type-Options or X-Frame-Options |
| TC-API1-035 | Password stored in plaintext | Security (SEC-03) | Check DB | - | Password should be hashed | N/A | INVALID | **BUG FOUND**: Password stored and compared in plaintext — critical security vulnerability |
| TC-API1-036 | Brute-force — no rate limiting | Security (SEC-05) | - | Send 100 login requests rapidly | Should be rate-limited | 429 | INVALID | **BUG FOUND**: No rate limiting on login endpoint — allows brute force |
| TC-API1-037 | JWT secret hardcoded | Security (SEC-06) | See server.js:9 | - | SECRET_KEY should not be in code | N/A | INVALID | **BUG FOUND**: `SECRET_KEY = "super_secret_key_that_should_not_be_here"` hardcoded |
| TC-API1-038 | IDOR via token — access other user | Security (SEC-07) | Login as user A, get token | Use token A to call GET /api/users/me | Should only return user A's data | 200 | VALID | OK for /users/me, but /orders/:id leaks cross-user |
| TC-API1-039 | No JWT expiry | Security (SEC-06) | Login and get token | Use token after 24h | Token still valid (no exp claim) | 200 | INVALID | **BUG FOUND**: JWT signed without expiry: `jwt.sign({id, role}, SECRET_KEY)` — no expiresIn |
| TC-API1-040 | Response time < 2000ms | Performance | - | Valid credentials | Response in < 2s | 200 | VALID | Acceptable |

---

## Extended Test Cases (Human-added, AI Missed)

| TC ID | Test Case Name | Category | Why AI Missed | Input | Expected Output |
|-------|---------------|----------|--------------|-------|----------------|
| TC-API1-EXT-001 | Login attempts counter increments by 2 | Bug Verification | AI generated generic lockout test; didn't analyze the exact increment logic in code | `{"email":"test2@eshop.com","password":"wrong"}` → check DB attempts | Actual: attempts += 2. Expected: += 1 |
| TC-API1-EXT-002 | JWT has no expiry (no `exp` claim) | Security | AI generated "JWT token format" test but didn't check for missing exp claim | Decode JWT header+payload | Should have `exp` field. BUG: missing |
| TC-API1-EXT-003 | Plaintext password comparison | Security | AI missed source code analysis — didn't look at `user.password === password` | Check /api/login source | Password compared as plain text, not bcrypt hash |
| TC-API1-EXT-004 | lockout_until logic — only 2 wrong attempts needed | Bug Verification | AI prompt didn't analyze the `+2` bug in attempt counter | Login wrong twice with fresh account | Account locked after 2 attempts instead of spec's 3 |
| TC-API1-EXT-005 | Cross-user order access via GET /api/orders/:id | IDOR | AI focused on login endpoint only; didn't trace downstream IDOR | Login as user A, get order ID of user B, GET /api/orders/B_id | BUG: Returns B's order (no ownership check) |

---

## Bug Summary for API1

| Bug ID | Description | Severity | Location |
|--------|-------------|----------|----------|
| BUG-001 | login_attempts increments by 2 instead of 1 | Medium | server.js:54 |
| BUG-002 | Password stored and compared in plaintext | Critical | server.js:46 |
| BUG-003 | JWT signed without expiry (no expiresIn) | High | server.js:51 |
| BUG-004 | No rate limiting on login endpoint | High | server.js:32 |
| BUG-005 | JWT secret key hardcoded in source | High | server.js:9 |
